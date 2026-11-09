"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useApp, fmt } from "@/lib/state";
import { getCourse, allLessons } from "@/lib/data/courses";
import type { Course, Lesson } from "@/lib/types";
import { Star } from "@/components/art";
import NotFoundBlock from "@/components/NotFoundBlock";
import { IconArrow, IconArrowLeft, IconCheck, IconClock, IconLock, IconPlay, IconBook, lessonIcon } from "@/components/icons";

function VideoArea({ lesson }: { lesson: Lesson }) {
  const { t } = useApp();
  if (lesson.videoUrl) {
    return (
      <div className="aspect-video overflow-hidden rounded-3xl bg-ink">
        <iframe src={lesson.videoUrl} title={lesson.title.en} className="h-full w-full" allow="accelerometer; encrypted-media; gyroscope; picture-in-picture; fullscreen" allowFullScreen />
      </div>
    );
  }
  return (
    <div className="relative flex aspect-video flex-col items-center justify-center overflow-hidden rounded-3xl bg-gradient-to-br from-burgundy-deep via-burgundy to-raspberry px-6 text-center text-cream">
      <svg className="absolute inset-0 h-full w-full opacity-25" viewBox="0 0 400 225" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <ellipse cx="200" cy="112" rx="180" ry="60" fill="none" stroke="#C39A60" strokeDasharray="2 5" transform="rotate(-12 200 112)" />
        <circle cx="200" cy="112" r="80" fill="none" stroke="#F8F5F0" strokeOpacity=".5" />
      </svg>
      <span className="relative inline-flex h-16 w-16 items-center justify-center rounded-full bg-cream/15 ring-1 ring-cream/40"><IconPlay className="h-7 w-7" /></span>
      <p className="relative mt-4 font-display text-lg font-semibold">{t.lesson.videoPlaceholderTitle}</p>
      <p className="relative mt-1 max-w-md text-sm text-cream/75">{t.lesson.videoPlaceholderText}</p>
    </div>
  );
}

function Quiz({ lesson, onPass }: { lesson: Lesson; onPass: () => void }) {
  const { t, lang } = useApp();
  const qs = lesson.quiz ?? [];
  const [ans, setAns] = useState<(number | null)[]>(() => qs.map(() => null));
  const [checked, setChecked] = useState(false);
  const score = qs.reduce((s, q, i) => s + (ans[i] === q.answer ? 1 : 0), 0);
  const passed = checked && score === qs.length;
  const passRef = useRef(onPass);
  passRef.current = onPass;
  useEffect(() => { if (passed) passRef.current(); }, [passed]);

  return (
    <div className="space-y-5">
      {qs.map((q, i) => (
        <fieldset key={i} className="card p-5">
          <legend className="sr-only">{q.q[lang]}</legend>
          <p className="font-semibold text-burgundy">{i + 1}. {q.q[lang]}</p>
          <div className="mt-3 grid gap-2">
            {q.options.map((o, oi) => {
              const sel = ans[i] === oi;
              const state = checked && sel ? (oi === q.answer ? "border-emerald-600 bg-emerald-50" : "border-raspberry bg-blush/60") : sel ? "border-burgundy bg-blush/40" : "border-burgundy/15 bg-white hover:border-burgundy/40";
              return (
                <label key={oi} className={`flex cursor-pointer items-center gap-3 rounded-xl border px-4 py-3 text-sm transition-colors ${state}`}>
                  <input type="radio" name={`q${i}`} className="accent-raspberry" checked={sel} onChange={() => { setChecked(false); setAns((a) => a.map((v, vi) => (vi === i ? oi : v))); }} />
                  {o[lang]}
                </label>
              );
            })}
          </div>
        </fieldset>
      ))}
      <div className="flex flex-wrap items-center gap-4">
        <button className="btn-primary" disabled={ans.some((a) => a === null)} onClick={() => setChecked(true)}>{t.lesson.quizCheck}</button>
        {checked && (
          <p className={`text-sm font-medium ${passed ? "text-emerald-700" : "text-raspberry"}`} role="status">
            {fmt(t.lesson.quizScore, { s: score, t: qs.length })} — {passed ? t.lesson.quizPassed : t.lesson.quizHint}
          </p>
        )}
      </div>
    </div>
  );
}

function SubmitBox({ course, lesson }: { course: Course; lesson: Lesson }) {
  const { t, submit, getSubmission } = useApp();
  const existing = getSubmission(course.slug, lesson.id);
  const [editing, setEditing] = useState(!existing);
  const [text, setText] = useState(existing?.text ?? "");
  const [link, setLink] = useState(existing?.link ?? "");
  const [err, setErr] = useState("");

  if (existing && !editing) {
    return (
      <div className="card p-6">
        <p className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm font-semibold ${existing.status === "reviewed" ? "bg-emerald-50 text-emerald-700" : "bg-gold/15 text-[#7A5C2C]"}`}>
          {existing.status === "reviewed" ? <IconCheck className="h-4 w-4" /> : <IconClock className="h-4 w-4" />}
          {existing.status === "reviewed" ? t.lesson.reviewed : t.lesson.submitted}
        </p>
        <p className="mt-4 whitespace-pre-wrap text-sm text-ink">{existing.text}</p>
        {existing.link && <a href={existing.link} target="_blank" rel="noopener noreferrer" className="mt-2 block break-all text-sm text-raspberry underline">{existing.link}</a>}
        {existing.feedback && (
          <div className="mt-5 rounded-2xl bg-blush/60 p-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-burgundy">{t.lesson.feedback}</p>
            <p className="mt-1 text-sm text-ink">{existing.feedback}</p>
          </div>
        )}
        <button className="btn-secondary mt-5" onClick={() => setEditing(true)}>{t.lesson.resubmit}</button>
      </div>
    );
  }

  return (
    <form
      className="card space-y-4 p-6"
      onSubmit={(e) => {
        e.preventDefault();
        if (!text.trim()) return setErr(t.auth.errors.required);
        if (link && !/^https?:\/\/\S+$/i.test(link)) return setErr("URL: https://…");
        submit({ courseSlug: course.slug, lessonId: lesson.id, text: text.trim(), link: link.trim() });
        setEditing(false);
        setErr("");
      }}
    >
      <div>
        <h3 className="text-lg font-semibold">{t.lesson.submitTitle}</h3>
        <p className="mt-1 text-sm text-ink-soft">{t.lesson.submitText}</p>
      </div>
      <label className="block"><span className="label">{t.lesson.submitDescription}</span>
        <textarea className="input min-h-28" value={text} onChange={(e) => setText(e.target.value)} placeholder={t.lesson.submitDescriptionPh} /></label>
      <label className="block"><span className="label">{t.lesson.submitLink}</span>
        <input className="input" type="url" inputMode="url" value={link} onChange={(e) => setLink(e.target.value)} placeholder={t.lesson.submitLinkPh} /></label>
      {err && <p className="text-sm text-raspberry" role="alert">{err}</p>}
      <button className="btn-primary" type="submit">{t.lesson.submitButton}</button>
    </form>
  );
}

export default function LessonPage() {
  const { slug, lessonId } = useParams<{ slug: string; lessonId: string }>();
  const course = getCourse(slug);
  const { t, lang, ready, user, isEnrolled, enrol, isComplete, toggleComplete, courseProgress, visit } = useApp();
  const lessons = course ? allLessons(course) : [];
  const idx = lessons.findIndex((x) => x.id === lessonId);
  const lesson = lessons[idx];
  const enrolled = !!user && !!course && isEnrolled(course.slug);
  const canView = !!lesson && (lesson.preview || enrolled);

  useEffect(() => {
    if (course && lesson && user && enrolled) visit(course.slug, lesson.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [course?.slug, lesson?.id, enrolled]);

  if (!course || !lesson) return <NotFoundBlock />;
  if (!ready) return <div className="container-site py-24 text-center text-ink-muted">{t.common.loading}</div>;

  const prev = lessons[idx - 1];
  const next = lessons[idx + 1];
  const done = enrolled && isComplete(course.slug, lesson.id);
  const prog = courseProgress(course.slug);
  const mod = course.modules.findIndex((m) => m.lessons.some((x) => x.id === lesson.id));
  const href = (id: string) => `/courses/${course.slug}/learn/${id}`;
  const Icon = lessonIcon[lesson.type];

  return (
    <div className="container-site grid gap-8 py-8 lg:grid-cols-[1fr_340px]">
      <div className="min-w-0">
        <Link href={`/courses/${course.slug}`} className="inline-flex items-center gap-1.5 text-sm font-medium text-ink-soft hover:text-burgundy">
          <IconArrowLeft className="h-4 w-4" /> {course.title[lang]}
        </Link>

        {!canView ? (
          <div className="mt-6 rounded-3xl border border-burgundy/10 bg-white px-6 py-16 text-center">
            <span className="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-full bg-blush text-burgundy"><IconLock className="h-6 w-6" /></span>
            <h1 className="mt-5 text-2xl font-semibold">{user ? t.lesson.locked : t.lesson.loginRequired}</h1>
            <p className="mx-auto mt-2 max-w-md text-ink-soft">{user ? t.lesson.lockedText : t.lesson.loginRequiredText}</p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              {user ? (
                <button className="btn-primary" onClick={() => enrol(course.slug)}>{t.course.enrol}</button>
              ) : (
                <>
                  <Link href={`/register?next=${href(lesson.id)}`} className="btn-primary">{t.nav.register}</Link>
                  <Link href={`/login?next=${href(lesson.id)}`} className="btn-secondary">{t.nav.login}</Link>
                </>
              )}
            </div>
          </div>
        ) : (
          <>
            <div className="mt-5">
              {lesson.type === "video" ? <VideoArea lesson={lesson} /> : null}
            </div>
            <div className="mt-6 flex flex-wrap items-center gap-2 text-xs font-medium text-ink-muted">
              <span className="eyebrow">{fmt(t.lesson.module, { n: mod + 1 })}</span>
              <span className="chip"><Icon className="mr-1 h-3.5 w-3.5" />{t.common.lessonTypes[lesson.type]}</span>
              <span className="chip"><IconClock className="mr-1 h-3.5 w-3.5" />{lesson.duration} {t.common.min}</span>
              {lesson.type === "video" && lesson.videoLang && <span className="chip">{fmt(t.lesson.videoLang, { lang: t.common.langNames[lesson.videoLang] })}</span>}
              {course.sample && <span className="sample-badge">{t.common.sampleContent}</span>}
            </div>
            <h1 className="mt-3 text-2xl font-semibold leading-tight sm:text-3xl">{lesson.title[lang]}</h1>
            <p className="mt-3 text-lg leading-relaxed text-ink-soft">{lesson.description[lang]}</p>

            {lesson.notes && (
              <section className="mt-8 rounded-3xl bg-white p-6 ring-1 ring-burgundy/10">
                <h2 className="flex items-center gap-2 text-lg font-semibold"><IconBook className="h-5 w-5 text-raspberry" />{t.lesson.notes}</h2>
                <ul className="mt-4 space-y-3">
                  {lesson.notes.map((n, i) => <li key={i} className="flex gap-3 text-ink"><Star size={12} className="mt-1.5 shrink-0 text-gold" />{n[lang]}</li>)}
                </ul>
              </section>
            )}

            {lesson.type === "quiz" && (
              <section className="mt-8"><Quiz key={lesson.id} lesson={lesson} onPass={() => enrolled && toggleComplete(course.slug, lesson.id, true)} /></section>
            )}
            {(lesson.type === "assignment" || lesson.type === "project") && enrolled && (
              <section className="mt-8"><SubmitBox key={lesson.id} course={course} lesson={lesson} /></section>
            )}

            {/* Completion + navigation */}
            <div className="mt-10 flex flex-col gap-4 border-t border-burgundy/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
              {enrolled ? (
                <button
                  onClick={() => toggleComplete(course.slug, lesson.id)}
                  className={done ? "btn border border-emerald-600/30 bg-emerald-50 text-emerald-700 hover:bg-emerald-100" : "btn-accent"}
                  aria-pressed={done}
                  title={done ? t.lesson.undo : undefined}
                >
                  <IconCheck className="h-4 w-4" />{done ? t.lesson.completed : t.lesson.markComplete}
                </button>
              ) : (
                <Link href={`/courses/${course.slug}`} className="btn-accent">{t.course.enrol}</Link>
              )}
              <div className="flex gap-2">
                {prev && <Link href={href(prev.id)} className="btn-secondary"><IconArrowLeft className="h-4 w-4" />{t.lesson.prev}</Link>}
                {next ? (
                  <Link href={href(next.id)} className="btn-primary">{t.lesson.next}<IconArrow className="h-4 w-4" /></Link>
                ) : (
                  <Link href="/dashboard" className="btn-primary">{t.lesson.finish}<IconArrow className="h-4 w-4" /></Link>
                )}
              </div>
            </div>
          </>
        )}
      </div>

      {/* Sidebar */}
      <aside className="lg:sticky lg:top-24 lg:self-start">
        <div className="card overflow-hidden">
          <div className="border-b border-burgundy/10 p-5">
            <p className="text-xs font-semibold uppercase tracking-wider text-ink-muted">{t.lesson.courseProgress}</p>
            <div className="mt-2 flex items-baseline justify-between">
              <span className="font-display text-2xl font-semibold text-burgundy">{enrolled ? prog.pct : 0}%</span>
              <span className="text-xs text-ink-muted">{fmt(t.dashboard.lessonsDone, { d: enrolled ? prog.done : 0, t: prog.total })}</span>
            </div>
            <div className="mt-2 h-2 rounded-full bg-blush"><div className="h-full rounded-full bg-raspberry transition-all" style={{ width: `${enrolled ? prog.pct : 0}%` }} /></div>
          </div>
          <nav aria-label={t.lesson.inThisModule} className="max-h-[60vh] overflow-y-auto">
            {course.modules.map((m) => (
              <div key={m.id}>
                <p className="bg-cream px-5 py-2.5 text-xs font-semibold text-burgundy">{m.title[lang]}</p>
                <ul>
                  {m.lessons.map((ls) => {
                    const LIcon = lessonIcon[ls.type];
                    const cur = ls.id === lesson.id;
                    const c = enrolled && isComplete(course.slug, ls.id);
                    const locked = !enrolled && !ls.preview;
                    return (
                      <li key={ls.id}>
                        <Link href={href(ls.id)} aria-current={cur ? "page" : undefined} className={`flex items-center gap-3 border-l-[3px] px-5 py-3 text-sm ${cur ? "border-raspberry bg-blush/50" : "border-transparent hover:bg-cream"}`}>
                          <span className={`inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${c ? "bg-raspberry text-white" : "bg-blush text-burgundy"}`}>
                            {c ? <IconCheck className="h-3.5 w-3.5" /> : locked ? <IconLock className="h-3.5 w-3.5" /> : <LIcon className="h-3.5 w-3.5" />}
                          </span>
                          <span className="min-w-0 flex-1">
                            <span className={`block truncate ${cur ? "font-semibold text-burgundy" : "text-ink"}`}>{ls.title[lang]}</span>
                            <span className="text-xs text-ink-muted">{ls.duration} {t.common.min}</span>
                          </span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </nav>
        </div>
      </aside>
    </div>
  );
}
