"use client";

import Link from "next/link";
import { useApp, fmt } from "@/lib/state";
import { courses, getCourse, allLessons } from "@/lib/data/courses";
import { CourseThumb, Star } from "@/components/art";
import { IconArrow, IconAward, IconCheck, IconClock, IconInfo, IconPlay, IconUsers, lessonIcon } from "@/components/icons";

export default function Dashboard() {
  const { t, lang, ready, user, progress, courseProgress, isComplete, review, hasCertificate } = useApp();
  const d = t.dashboard;

  if (!ready) return <div className="container-site py-24 text-center text-ink-muted">{t.common.loading}</div>;
  if (!user)
    return (
      <div className="container-site flex flex-col items-center py-24 text-center">
        <Star size={32} className="text-gold" />
        <h1 className="mt-5 text-3xl font-semibold">{t.lesson.loginRequired}</h1>
        <p className="mt-2 max-w-md text-ink-soft">{t.lesson.loginRequiredText}</p>
        <div className="mt-6 flex gap-3">
          <Link href="/register?next=/dashboard" className="btn-primary">{t.nav.register}</Link>
          <Link href="/login?next=/dashboard" className="btn-secondary">{t.nav.login}</Link>
        </div>
      </div>
    );

  const enrolled = progress.enrolled.map(getCourse).filter((c): c is NonNullable<typeof c> => !!c);
  const totalDone = Object.values(progress.completed).reduce((s, a) => s + a.length, 0);
  const certs = enrolled.filter((c) => hasCertificate(c.slug));
  const recommended = enrolled
    .map((c) => ({ c, next: allLessons(c).find((x) => !isComplete(c.slug, x.id)) }))
    .filter((x) => x.next)
    .slice(0, 3);
  const suggestions = courses.filter((c) => !progress.enrolled.includes(c.slug)).slice(0, 2);

  return (
    <>
      <section className="border-b border-burgundy/10 bg-white">
        <div className="container-site py-10">
          <span className="eyebrow"><Star size={11} className="text-gold" />{t.nav.dashboard}</span>
          <h1 className="mt-3 text-3xl font-semibold sm:text-4xl">{fmt(d.welcome, { name: user.firstName })}</h1>
          <p className="mt-2 text-ink-soft">{d.subtitle}</p>
          <dl className="mt-8 grid max-w-xl grid-cols-3 gap-4">
            {[[d.stats.courses, enrolled.length], [d.stats.lessons, totalDone], [d.stats.certs, certs.length]].map(([k, v]) => (
              <div key={k as string} className="rounded-2xl bg-cream p-4">
                <dt className="text-xs text-ink-muted">{k}</dt>
                <dd className="mt-1 font-display text-2xl font-semibold text-burgundy">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <div className="container-site grid gap-10 py-10 lg:grid-cols-[1.5fr_1fr]">
        <div className="space-y-10">
          {/* Enrolled courses */}
          <section>
            <h2 className="text-xl font-semibold">{d.enrolled}</h2>
            {enrolled.length ? (
              <div className="mt-4 space-y-4">
                {enrolled.map((c) => {
                  const p = courseProgress(c.slug);
                  const next = allLessons(c).find((x) => !isComplete(c.slug, x.id)) ?? allLessons(c)[0];
                  return (
                    <article key={c.slug} className="card flex flex-col overflow-hidden sm:flex-row">
                      <div className="sm:w-48 sm:shrink-0"><CourseThumb course={c} className="h-full object-cover" /></div>
                      <div className="flex flex-1 flex-col p-5">
                        <h3 className="font-semibold"><Link href={`/courses/${c.slug}`} className="hover:text-raspberry">{c.title[lang]}</Link></h3>
                        <div className="mt-3 flex justify-between text-xs text-ink-muted"><span>{fmt(d.lessonsDone, { d: p.done, t: p.total })}</span><span className="font-semibold text-burgundy">{p.pct}%</span></div>
                        <div className="mt-1.5 h-2 rounded-full bg-blush"><div className="h-full rounded-full bg-raspberry" style={{ width: `${p.pct}%` }} /></div>
                        <div className="mt-4 flex flex-wrap gap-2">
                          <Link href={`/courses/${c.slug}/learn/${next.id}`} className="btn-primary py-2.5">{p.done ? t.common.continue : t.common.startCourse} <IconArrow className="h-4 w-4" /></Link>
                          {hasCertificate(c.slug) && <Link href={`/certificate/${c.slug}`} className="btn-secondary py-2.5"><IconAward className="h-4 w-4" />{d.viewCertificate}</Link>}
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            ) : (
              <div className="mt-4 rounded-3xl border border-dashed border-burgundy/25 bg-white p-8 text-center">
                <p className="text-ink-soft">{d.noCourses}</p>
                <Link href="/courses" className="btn-primary mt-5">{d.browse}</Link>
              </div>
            )}
            {suggestions.length > 0 && enrolled.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2">
                {suggestions.map((c) => <Link key={c.slug} href={`/courses/${c.slug}`} className="chip hover:border-raspberry hover:text-raspberry">+ {c.title[lang]}</Link>)}
              </div>
            )}
          </section>

          {/* Assignments */}
          <section>
            <h2 className="text-xl font-semibold">{d.assignments}</h2>
            {progress.submissions.length ? (
              <ul className="mt-4 space-y-3">
                {progress.submissions.map((s) => {
                  const c = getCourse(s.courseSlug);
                  const ls = c && allLessons(c).find((x) => x.id === s.lessonId);
                  if (!c || !ls) return null;
                  return (
                    <li key={s.courseSlug + s.lessonId} className="card p-5">
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <div className="min-w-0">
                          <Link href={`/courses/${c.slug}/learn/${ls.id}`} className="font-semibold text-burgundy hover:text-raspberry">{ls.title[lang]}</Link>
                          <p className="text-xs text-ink-muted">{c.title[lang]} · {new Date(s.submittedAt).toLocaleDateString(t.meta.htmlLang)}</p>
                        </div>
                        <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${s.status === "reviewed" ? "bg-emerald-50 text-emerald-700" : "bg-gold/15 text-[#7A5C2C]"}`}>
                          {s.status === "reviewed" ? <IconCheck className="h-3.5 w-3.5" /> : <IconClock className="h-3.5 w-3.5" />}{d.status[s.status]}
                        </span>
                      </div>
                      {s.feedback && <p className="mt-3 rounded-xl bg-blush/50 p-3 text-sm text-ink"><span className="font-semibold text-burgundy">{t.lesson.feedback}: </span>{s.feedback}</p>}
                      {s.status === "submitted" && (
                        <div className="mt-3 flex flex-wrap items-center gap-3 border-t border-dashed border-burgundy/15 pt-3">
                          <button className="btn-ghost px-0 text-xs underline" onClick={() => review(s.courseSlug, s.lessonId, d.demoFeedback)}>{d.demoReview}</button>
                          <span className="inline-flex items-center gap-1 text-xs text-ink-muted"><IconInfo className="h-3.5 w-3.5" />{d.demoReviewNote}</span>
                        </div>
                      )}
                    </li>
                  );
                })}
              </ul>
            ) : (
              <p className="mt-4 rounded-2xl bg-white p-5 text-sm text-ink-muted ring-1 ring-burgundy/10">{d.noAssignments}</p>
            )}
          </section>

          {/* Certificates */}
          <section>
            <h2 className="text-xl font-semibold">{d.certificates}</h2>
            {certs.length ? (
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                {certs.map((c) => (
                  <Link key={c.slug} href={`/certificate/${c.slug}`} className="card flex items-center gap-4 p-5 hover:border-raspberry/40">
                    <IconAward className="h-10 w-10 shrink-0 text-gold" />
                    <span><span className="block font-semibold text-burgundy">{c.title[lang]}</span><span className="text-xs text-raspberry">{d.viewCertificate} →</span></span>
                  </Link>
                ))}
              </div>
            ) : (
              <p className="mt-4 flex items-start gap-3 rounded-2xl bg-white p-5 text-sm text-ink-muted ring-1 ring-burgundy/10"><IconAward className="h-6 w-6 shrink-0 text-gold" />{d.noCertificates}</p>
            )}
          </section>
        </div>

        <aside className="space-y-6">
          <section className="card p-6">
            <h2 className="text-lg font-semibold">{d.recommended}</h2>
            {recommended.length ? (
              <ul className="mt-4 space-y-3">
                {recommended.map(({ c, next }) => {
                  const I = lessonIcon[next!.type];
                  return (
                    <li key={c.slug}>
                      <Link href={`/courses/${c.slug}/learn/${next!.id}`} className="flex items-center gap-3 rounded-2xl bg-cream p-3 hover:bg-blush/50">
                        <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-burgundy text-cream"><I className="h-4 w-4" /></span>
                        <span className="min-w-0"><span className="block truncate text-sm font-medium text-ink">{next!.title[lang]}</span><span className="block truncate text-xs text-ink-muted">{c.title[lang]} · {next!.duration} {t.common.min}</span></span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            ) : (
              <p className="mt-3 text-sm text-ink-muted">{enrolled.length ? d.recommendedEmpty : d.noCourses}</p>
            )}
          </section>

          <section className="card p-6">
            <h2 className="text-lg font-semibold">{d.recent}</h2>
            {progress.recent.length ? (
              <ul className="mt-4 space-y-2">
                {progress.recent.slice(0, 5).map((r) => {
                  const c = getCourse(r.courseSlug);
                  const ls = c && allLessons(c).find((x) => x.id === r.lessonId);
                  if (!c || !ls) return null;
                  return (
                    <li key={r.courseSlug + r.lessonId}>
                      <Link href={`/courses/${c.slug}/learn/${ls.id}`} className="flex items-center gap-3 rounded-xl p-2 hover:bg-cream">
                        <IconPlay className="h-4 w-4 shrink-0 text-raspberry" />
                        <span className="min-w-0 truncate text-sm text-ink">{ls.title[lang]}</span>
                        {isComplete(c.slug, ls.id) && <IconCheck className="ml-auto h-4 w-4 shrink-0 text-emerald-600" />}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            ) : (
              <p className="mt-3 text-sm text-ink-muted">{d.nothingRecent}</p>
            )}
          </section>

          <section className="rounded-3xl bg-burgundy p-6 text-cream">
            <IconUsers className="h-6 w-6 text-gold" />
            <h2 className="mt-3 text-lg font-semibold text-cream">{d.qaTitle}</h2>
            <p className="mt-2 text-sm text-cream/80">{d.qaText}</p>
            <p className="mt-4 inline-flex rounded-full bg-cream/10 px-3 py-1 text-xs">{d.qaSoon}</p>
          </section>

          <p className="flex gap-2 text-xs text-ink-muted"><IconInfo className="h-4 w-4 shrink-0" />{t.common.demoStorage}</p>
        </aside>
      </div>
    </>
  );
}
