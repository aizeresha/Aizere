"use client";

/**
 * Client-side app state: interface language, demo auth and learning progress.
 *
 * INTEGRATION POINT: everything here persists to localStorage only. To go live,
 * replace the bodies of register/login/logout/enrol/toggleComplete/submit/review
 * with Supabase calls (auth.signUp, auth.signInWithPassword, and inserts into
 * `enrolments`, `lesson_progress`, `submissions`). The component API can stay the same.
 */
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { Lang } from "./types";
import en, { type Dict } from "./i18n/en";
import ru from "./i18n/ru";
import kz from "./i18n/kz";
import { courses, allLessons } from "./data/courses";
import { SPARKS } from "./game/rooms";

const dicts: Record<Lang, Dict> = { en, kz, ru };

export interface User {
  firstName: string;
  email: string;
  passwordHash: string;
  birthYear: number;
  region?: string;
  lang: Lang;
  guardianName?: string;
  guardianEmail?: string;
  consentAt?: string;
  createdAt: string;
}

export interface Submission {
  courseSlug: string;
  lessonId: string;
  text: string;
  link: string;
  /** submitted = waiting for a mentor; reviewed = accepted; needs_work = checked, not accepted yet */
  status: "submitted" | "reviewed" | "needs_work";
  feedback?: string;
  checkedBy?: "ai" | "mentor";
  submittedAt: string;
}

interface Progress {
  enrolled: string[];
  completed: Record<string, string[]>; // courseSlug -> lessonIds
  recent: { courseSlug: string; lessonId: string; at: string }[];
  submissions: Submission[];
}

const emptyProgress: Progress = { enrolled: [], completed: {}, recent: [], submissions: [] };

const K = { lang: "rs.lang", users: "rs.users", session: "rs.session", progress: (e: string) => `rs.progress.${e}` };

function read<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}
function write(key: string, value: unknown) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* storage unavailable */
  }
}

export async function hash(s: string) {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(s));
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

interface Ctx {
  ready: boolean;
  lang: Lang;
  setLang: (l: Lang) => void;
  t: Dict;
  user: User | null;
  progress: Progress;
  register: (u: Omit<User, "passwordHash" | "createdAt">, password: string) => Promise<"ok" | "exists">;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  enrol: (slug: string) => void;
  isEnrolled: (slug: string) => boolean;
  isComplete: (slug: string, lessonId: string) => boolean;
  toggleComplete: (slug: string, lessonId: string, value?: boolean) => void;
  courseProgress: (slug: string) => { done: number; total: number; pct: number };
  visit: (slug: string, lessonId: string) => void;
  submit: (s: Omit<Submission, "status" | "submittedAt"> & Partial<Pick<Submission, "status" | "feedback" | "checkedBy">>) => void;
  getSubmission: (slug: string, lessonId: string) => Submission | undefined;
  review: (slug: string, lessonId: string, feedback: string) => void;
  hasCertificate: (slug: string) => boolean;
  /** Game currency: sparks earned for finished lessons (derived from progress). */
  sparks: number;
}

const AppContext = createContext<Ctx | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false);
  const [lang, setLangState] = useState<Lang>("en");
  const [user, setUser] = useState<User | null>(null);
  const [progress, setProgress] = useState<Progress>(emptyProgress);

  useEffect(() => {
    let initial = read<Lang | null>(K.lang, null);
    if (!initial) {
      const nav = navigator.language.toLowerCase();
      initial = nav.startsWith("kk") ? "kz" : nav.startsWith("ru") ? "ru" : "en";
    }
    setLangState(initial);
    const email = read<string | null>(K.session, null);
    if (email) {
      const u = read<User[]>(K.users, []).find((x) => x.email === email);
      if (u) {
        setUser(u);
        setProgress(read(K.progress(u.email), emptyProgress));
      }
    }
    setReady(true);
  }, []);

  useEffect(() => {
    document.documentElement.lang = dicts[lang].meta.htmlLang;
  }, [lang]);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    write(K.lang, l);
  }, []);

  const save = useCallback(
    (fn: (p: Progress) => Progress) => {
      setProgress((prev) => {
        const next = fn(prev);
        if (user) write(K.progress(user.email), next);
        return next;
      });
    },
    [user]
  );

  const register: Ctx["register"] = async (u, password) => {
    const users = read<User[]>(K.users, []);
    const email = u.email.trim().toLowerCase();
    if (users.some((x) => x.email === email)) return "exists";
    const full: User = { ...u, email, passwordHash: await hash(password), createdAt: new Date().toISOString() };
    write(K.users, [...users, full]);
    write(K.session, email);
    setUser(full);
    setProgress(emptyProgress);
    setLang(u.lang);
    return "ok";
  };

  const login: Ctx["login"] = async (email, password) => {
    const e = email.trim().toLowerCase();
    const h = await hash(password);
    const u = read<User[]>(K.users, []).find((x) => x.email === e && x.passwordHash === h);
    if (!u) return false;
    write(K.session, e);
    setUser(u);
    setProgress(read(K.progress(e), emptyProgress));
    return true;
  };

  const logout = () => {
    try {
      localStorage.removeItem(K.session);
    } catch {}
    setUser(null);
    setProgress(emptyProgress);
  };

  const courseProgress = useCallback(
    (slug: string) => {
      const c = courses.find((x) => x.slug === slug);
      const total = c ? allLessons(c).length : 0;
      const done = (progress.completed[slug] ?? []).length;
      return { done, total, pct: total ? Math.round((done / total) * 100) : 0 };
    },
    [progress]
  );

  const sparks = useMemo(
    () =>
      courses.reduce((sum, c) => {
        const done = progress.completed[c.slug] ?? [];
        return sum + allLessons(c).reduce((s2, ls) => s2 + (done.includes(ls.id) ? SPARKS[ls.type] : 0), 0);
      }, 0),
    [progress]
  );

  const value: Ctx = useMemo(
    () => ({
      ready,
      lang,
      setLang,
      t: dicts[lang],
      user,
      progress,
      register,
      login,
      logout,
      enrol: (slug) => save((p) => (p.enrolled.includes(slug) ? p : { ...p, enrolled: [...p.enrolled, slug] })),
      isEnrolled: (slug) => progress.enrolled.includes(slug),
      isComplete: (slug, id) => (progress.completed[slug] ?? []).includes(id),
      toggleComplete: (slug, id, v) =>
        save((p) => {
          const cur = p.completed[slug] ?? [];
          const on = v ?? !cur.includes(id);
          const next = on ? Array.from(new Set([...cur, id])) : cur.filter((x) => x !== id);
          return { ...p, completed: { ...p.completed, [slug]: next } };
        }),
      courseProgress,
      visit: (slug, id) =>
        save((p) => ({
          ...p,
          recent: [{ courseSlug: slug, lessonId: id, at: new Date().toISOString() }, ...p.recent.filter((r) => !(r.courseSlug === slug && r.lessonId === id))].slice(0, 8),
        })),
      submit: (s) =>
        save((p) => ({
          ...p,
          submissions: [
            { status: "submitted", ...s, submittedAt: new Date().toISOString() },
            ...p.submissions.filter((x) => !(x.courseSlug === s.courseSlug && x.lessonId === s.lessonId)),
          ],
        })),
      getSubmission: (slug, id) => progress.submissions.find((s) => s.courseSlug === slug && s.lessonId === id),
      review: (slug, id, feedback) =>
        save((p) => ({
          ...p,
          submissions: p.submissions.map((s) => (s.courseSlug === slug && s.lessonId === id ? { ...s, status: "reviewed", feedback, checkedBy: "mentor" } : s)),
        })),
      sparks,
      hasCertificate: (slug) => {
        const c = courses.find((x) => x.slug === slug);
        if (!c) return false;
        const lessons = allLessons(c);
        const done = progress.completed[slug] ?? [];
        const finals = lessons.filter((x) => x.type === "project");
        return (
          lessons.every((x) => done.includes(x.id)) &&
          finals.every((f) => progress.submissions.some((s) => s.courseSlug === slug && s.lessonId === f.id && s.status === "reviewed"))
        );
      },
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [ready, lang, user, progress, save, courseProgress, setLang, sparks]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used inside AppProvider");
  return ctx;
}

/** Replace {key} placeholders. */
export function fmt(s: string, vars: Record<string, string | number>) {
  return s.replace(/\{(\w+)\}/g, (_, k) => String(vars[k] ?? ""));
}
