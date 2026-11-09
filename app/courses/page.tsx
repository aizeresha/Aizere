"use client";

import { useMemo, useState } from "react";
import { useApp, fmt } from "@/lib/state";
import { courses } from "@/lib/data/courses";
import type { Category, Lang, Level } from "@/lib/types";
import CourseCard from "@/components/CourseCard";
import PageHeader from "@/components/PageHeader";

type Dur = "short" | "medium" | "long";

function Select<T extends string>({ label, value, onChange, options }: { label: string; value: T | "all"; onChange: (v: T | "all") => void; options: { value: T | "all"; label: string }[] }) {
  return (
    <label className="block">
      <span className="label text-xs uppercase tracking-wider text-ink-muted">{label}</span>
      <select className="input py-2.5" value={value} onChange={(e) => onChange(e.target.value as T | "all")}>
        {options.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
    </label>
  );
}

export default function CoursesPage() {
  const { t } = useApp();
  const [cat, setCat] = useState<Category | "all">("all");
  const [lvl, setLvl] = useState<Level | "all">("all");
  const [lng, setLng] = useState<Lang | "all">("all");
  const [dur, setDur] = useState<Dur | "all">("all");

  const list = useMemo(
    () =>
      courses.filter(
        (c) =>
          (cat === "all" || c.category === cat) &&
          (lvl === "all" || c.levels.includes(lvl)) &&
          (lng === "all" || c.languages.includes(lng)) &&
          (dur === "all" || (dur === "short" ? c.hours < 8 : dur === "medium" ? c.hours >= 8 && c.hours <= 12 : c.hours > 12))
      ),
    [cat, lvl, lng, dur]
  );
  const all = { value: "all" as const, label: t.courses.all };
  const reset = () => { setCat("all"); setLvl("all"); setLng("all"); setDur("all"); };
  const dirty = cat !== "all" || lvl !== "all" || lng !== "all" || dur !== "all";

  return (
    <>
      <PageHeader eyebrow={t.courses.eyebrow} title={t.courses.title} text={t.courses.text} />
      <div className="container-site py-10">
        <section aria-label={t.courses.filters} className="card grid gap-4 p-5 sm:grid-cols-2 lg:grid-cols-[repeat(4,1fr)_auto] lg:items-end">
          <Select label={t.common.category} value={cat} onChange={setCat} options={[all, ...(["robotics", "cad", "programming", "ftc"] as Category[]).map((v) => ({ value: v, label: t.common.categories[v] }))]} />
          <Select label={t.common.level} value={lvl} onChange={setLvl} options={[all, ...(["beginner", "intermediate"] as Level[]).map((v) => ({ value: v, label: t.common.levels[v] }))]} />
          <Select label={t.common.languages} value={lng} onChange={setLng} options={[all, ...(["en", "kz", "ru"] as Lang[]).map((v) => ({ value: v, label: t.common.langNames[v] }))]} />
          <Select label={t.common.duration} value={dur} onChange={setDur} options={[all, { value: "short", label: t.courses.durationShort }, { value: "medium", label: t.courses.durationMedium }, { value: "long", label: t.courses.durationLong }]} />
          <button onClick={reset} disabled={!dirty} className="btn-ghost justify-self-start">{t.courses.reset}</button>
        </section>
        <p className="mt-8 text-sm font-medium text-ink-soft" aria-live="polite">
          {list.length === 1 ? t.courses.resultsOne : fmt(t.courses.results, { n: list.length })}
        </p>
        {list.length ? (
          <div className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {list.map((c) => <CourseCard key={c.slug} course={c} />)}
          </div>
        ) : (
          <div className="mt-4 rounded-3xl border border-dashed border-burgundy/25 bg-white px-6 py-16 text-center">
            <h2 className="text-xl font-semibold">{t.courses.emptyTitle}</h2>
            <p className="mt-2 text-ink-soft">{t.courses.emptyText}</p>
            <button onClick={reset} className="btn-primary mt-6">{t.courses.reset}</button>
          </div>
        )}
      </div>
    </>
  );
}
