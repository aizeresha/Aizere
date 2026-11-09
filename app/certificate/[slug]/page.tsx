"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useApp } from "@/lib/state";
import { getCourse } from "@/lib/data/courses";
import { getMentor } from "@/lib/data/mentors";
import { Logo, Star } from "@/components/art";
import NotFoundBlock from "@/components/NotFoundBlock";

export default function CertificatePage() {
  const { slug } = useParams<{ slug: string }>();
  const course = getCourse(slug);
  const { t, lang, ready, user, hasCertificate, progress } = useApp();
  if (!course) return <NotFoundBlock />;
  if (!ready) return <div className="container-site py-24 text-center text-ink-muted">{t.common.loading}</div>;
  if (!user || !hasCertificate(course.slug))
    return (
      <div className="container-site py-24 text-center">
        <p className="text-lg text-ink-soft">{t.certificate.notEarned}</p>
        <Link href={`/courses/${course.slug}`} className="btn-primary mt-6">{t.common.backToCourse}</Link>
      </div>
    );
  const mentor = getMentor(course.mentorId);
  const final = progress.submissions.find((s) => s.courseSlug === course.slug && s.status === "reviewed");
  const date = new Date(final?.submittedAt ?? Date.now()).toLocaleDateString(t.meta.htmlLang, { year: "numeric", month: "long", day: "numeric" });

  return (
    <div className="container-site py-10">
      <div className="no-print mb-6 flex justify-between gap-3">
        <Link href="/dashboard" className="btn-secondary">← {t.nav.dashboard}</Link>
        <button onClick={() => window.print()} className="btn-primary">{t.certificate.print}</button>
      </div>
      <div className="relative mx-auto aspect-[1.414] max-w-4xl overflow-hidden rounded-3xl border-[10px] border-burgundy bg-white p-6 text-center shadow-xl sm:p-12">
        <svg className="pointer-events-none absolute inset-0 h-full w-full" viewBox="0 0 1000 707" preserveAspectRatio="none" aria-hidden="true">
          <rect x="18" y="18" width="964" height="671" fill="none" stroke="#C39A60" strokeWidth="2" />
          <ellipse cx="500" cy="353" rx="470" ry="150" fill="none" stroke="#F1DDE5" strokeWidth="2" transform="rotate(-8 500 353)" />
        </svg>
        <div className="relative flex h-full flex-col items-center justify-between">
          <Logo />
          <div>
            <p className="font-display text-xl font-semibold text-burgundy sm:text-4xl">{t.certificate.title}</p>
            <p className="mt-2 text-xs text-ink-muted sm:mt-6 sm:text-base">{t.certificate.awarded}</p>
            <p className="mt-1 font-display text-2xl font-semibold text-raspberry sm:mt-3 sm:text-5xl">{user.firstName}</p>
            <p className="mt-1 text-xs text-ink-muted sm:mt-4 sm:text-base">{t.certificate.completed}</p>
            <p className="mt-1 font-display text-sm font-semibold text-burgundy sm:mt-2 sm:text-2xl">{course.title[lang]}</p>
          </div>
          <div className="flex w-full items-end justify-between text-left text-[10px] sm:text-sm">
            <div><p className="text-ink-muted">{t.certificate.mentor}</p><p className="font-semibold text-burgundy">{mentor?.name}</p></div>
            <Star size={36} className="text-gold" />
            <div className="text-right"><p className="text-ink-muted">{t.certificate.date}</p><p className="font-semibold text-burgundy">{date}</p></div>
          </div>
        </div>
      </div>
      <p className="mt-4 text-center text-xs text-ink-muted">{t.certificate.demo}</p>
    </div>
  );
}
