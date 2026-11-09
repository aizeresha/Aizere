"use client";

import Link from "next/link";
import type { Course } from "@/lib/types";
import { useApp, fmt } from "@/lib/state";
import { getMentor } from "@/lib/data/mentors";
import { lessonCount } from "@/lib/data/courses";
import { CourseThumb } from "./art";
import { IconClock, IconGlobe, IconArrow } from "./icons";

export function LevelChips({ course }: { course: Course }) {
  const { t } = useApp();
  return (
    <>
      {course.levels.map((lv) => (
        <span key={lv} className="chip">{t.common.levels[lv]}</span>
      ))}
    </>
  );
}

export default function CourseCard({ course }: { course: Course }) {
  const { t, lang, user, isEnrolled, courseProgress } = useApp();
  const mentor = getMentor(course.mentorId);
  const prog = user && isEnrolled(course.slug) ? courseProgress(course.slug) : null;
  return (
    <article className="card group flex flex-col overflow-hidden transition-shadow hover:shadow-[0_20px_50px_-25px_rgba(112,22,55,0.45)]">
      <Link href={`/courses/${course.slug}`} className="relative block overflow-hidden" tabIndex={-1} aria-hidden="true">
        <CourseThumb course={course} className="transition-transform duration-500 group-hover:scale-[1.03]" />
        <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-burgundy">
          {t.common.categories[course.category]}
        </span>
        {course.sample && <span className="sample-badge absolute right-3 top-3 bg-white/90">{t.common.sample}</span>}
      </Link>
      <div className="flex flex-1 flex-col p-6">
        <div className="flex flex-wrap gap-1.5"><LevelChips course={course} /></div>
        <h3 className="mt-3 text-lg font-semibold leading-snug">
          <Link href={`/courses/${course.slug}`} className="hover:text-raspberry">{course.title[lang]}</Link>
        </h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-soft">{course.short[lang]}</p>
        <dl className="mt-5 grid grid-cols-2 gap-3 text-xs text-ink-soft">
          <div className="flex items-center gap-1.5"><IconClock className="h-4 w-4 text-raspberry" /><dt className="sr-only">{t.common.duration}</dt><dd>{fmt(t.common.hours, { n: course.hours })} · {fmt(t.common.lessons, { n: lessonCount(course) })}</dd></div>
          <div className="flex items-center gap-1.5"><IconGlobe className="h-4 w-4 text-raspberry" /><dt className="sr-only">{t.common.languages}</dt><dd>{course.languages.map((x) => x.toUpperCase()).join(" · ")}</dd></div>
        </dl>
        {prog ? (
          <div className="mt-5">
            <div className="flex justify-between text-xs font-medium text-burgundy"><span>{fmt(t.course.progress, { p: prog.pct })}</span></div>
            <div className="mt-1.5 h-1.5 rounded-full bg-blush"><div className="h-full rounded-full bg-raspberry" style={{ width: `${prog.pct}%` }} /></div>
          </div>
        ) : null}
        <div className="mt-5 flex items-center justify-between border-t border-burgundy/10 pt-4">
          <span className="text-xs text-ink-muted">{t.common.instructor}: <span className="font-medium text-ink">{mentor?.name}</span></span>
          <Link href={`/courses/${course.slug}`} className="inline-flex items-center gap-1 text-sm font-semibold text-raspberry hover:text-burgundy">
            {t.common.viewCourse} <IconArrow className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </article>
  );
}
