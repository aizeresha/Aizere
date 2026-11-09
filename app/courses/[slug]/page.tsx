"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useApp, fmt } from "@/lib/state";
import { getCourse, allLessons, lessonCount } from "@/lib/data/courses";
import { getMentor } from "@/lib/data/mentors";
import { CourseThumb, Avatar, Star } from "@/components/art";
import { LevelChips } from "@/components/CourseCard";
import { IconCheck, IconClock, IconGlobe, IconLayers, IconPlay, IconArrow, IconInfo, IconAward, lessonIcon } from "@/components/icons";
import NotFoundBlock from "@/components/NotFoundBlock";

export default function CoursePage() {
  const { slug } = useParams<{ slug: string }>();
  const course = getCourse(slug);
  const { t, lang, user, isEnrolled, enrol, isComplete, courseProgress } = useApp();
  const router = useRouter();
  if (!course) return <NotFoundBlock title={t.course.notFound} />;

  const mentor = getMentor(course.mentorId);
  const lessons = allLessons(course);
  const preview = lessons.find((x) => x.preview) ?? lessons[0];
  const enrolled = !!user && isEnrolled(course.slug);
  const prog = courseProgress(course.slug);
  const next = lessons.find((x) => !isComplete(course.slug, x.id)) ?? lessons[0];
  const assignments = lessons.filter((x) => x.type === "assignment" || x.type === "project");
  const lessonHref = (id: string) => `/courses/${course.slug}/learn/${id}`;

  const onEnrol = () => {
    if (!user) return router.push(`/register?next=/courses/${course.slug}`);
    enrol(course.slug);
    router.push(lessonHref(lessons[0].id));
  };

  return (
    <>
      <section className="border-b border-burgundy/10 bg-white">
        <div className="container-site grid gap-10 py-10 lg:grid-cols-[1.4fr_1fr] lg:py-14">
          <div>
            <nav className="text-sm text-ink-muted" aria-label="Breadcrumb">
              <Link href="/courses" className="hover:text-burgundy">{t.nav.courses}</Link> <span aria-hidden>/</span> {t.common.categories[course.category]}
            </nav>
            <div className="mt-4 flex flex-wrap gap-1.5"><LevelChips course={course} />{course.sample && <span className="sample-badge">{t.common.sampleContent}</span>}</div>
            <h1 className="mt-4 text-3xl font-semibold leading-tight sm:text-5xl">{course.title[lang]}</h1>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink-soft">{course.short[lang]}</p>
            <dl className="mt-6 flex flex-wrap gap-x-6 gap-y-3 text-sm text-ink-soft">
              <div className="flex items-center gap-2"><IconClock className="h-4 w-4 text-raspberry" /><dt className="sr-only">{t.common.duration}</dt><dd>{fmt(t.common.hours, { n: course.hours })}</dd></div>
              <div className="flex items-center gap-2"><IconLayers className="h-4 w-4 text-raspberry" /><dt className="sr-only">{t.common.lessons}</dt><dd>{fmt(t.common.modules, { n: course.modules.length })} · {fmt(t.common.lessons, { n: lessonCount(course) })}</dd></div>
              <div className="flex items-center gap-2"><IconGlobe className="h-4 w-4 text-raspberry" /><dt className="sr-only">{t.common.languages}</dt><dd>{course.languages.map((x) => t.common.langNames[x]).join(", ")}</dd></div>
            </dl>
            {course.sample && (
              <p className="mt-6 flex max-w-2xl items-start gap-2 rounded-2xl bg-gold/10 px-4 py-3 text-sm text-[#7A5C2C]"><IconInfo className="mt-0.5 h-4 w-4 shrink-0" />{t.common.sampleCourseNote}</p>
            )}
          </div>

          {/* Enrol card */}
          <aside className="card overflow-hidden lg:sticky lg:top-24 lg:self-start">
            <Link href={lessonHref(preview.id)} className="group relative block">
              <CourseThumb course={course} />
              <span className="absolute inset-0 flex items-center justify-center">
                <span className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-cream/95 text-raspberry shadow-lg transition-transform group-hover:scale-110"><IconPlay className="h-7 w-7" /></span>
              </span>
            </Link>
            <div className="p-6">
              <p className="font-display text-2xl font-semibold text-burgundy">{t.common.free}</p>
              <p className="mt-1 text-sm text-ink-muted">{t.course.selfPaced}</p>
              {enrolled ? (
                <>
                  <div className="mt-5">
                    <div className="flex justify-between text-sm font-medium text-burgundy"><span>{t.course.enrolled}</span><span>{prog.pct}%</span></div>
                    <div className="mt-2 h-2 rounded-full bg-blush"><div className="h-full rounded-full bg-raspberry" style={{ width: `${prog.pct}%` }} /></div>
                  </div>
                  <Link href={lessonHref(next.id)} className="btn-primary mt-5 w-full">{t.course.goToCourse} <IconArrow className="h-4 w-4" /></Link>
                </>
              ) : (
                <>
                  <button onClick={onEnrol} className="btn-primary mt-5 w-full">{user ? t.course.enrol : t.course.loginToEnrol}</button>
                  <Link href={lessonHref(preview.id)} className="btn-secondary mt-3 w-full"><IconPlay className="h-4 w-4" /> {t.course.preview}</Link>
                </>
              )}
              <p className="mt-6 text-xs font-semibold uppercase tracking-wider text-ink-muted">{t.course.includes}</p>
              <ul className="mt-3 space-y-2 text-sm text-ink-soft">
                {t.course.includesItems.map((x) => <li key={x} className="flex gap-2"><IconCheck className="h-4 w-4 shrink-0 text-raspberry" />{x}</li>)}
              </ul>
            </div>
          </aside>
        </div>
      </section>

      <div className="container-site grid gap-12 py-12 lg:grid-cols-[1.4fr_1fr]">
        <div className="space-y-12">
          <section>
            <h2 className="text-2xl font-semibold">{t.course.about}</h2>
            <p className="mt-4 text-lg leading-relaxed text-ink-soft">{course.description[lang]}</p>
          </section>
          <section>
            <h2 className="text-2xl font-semibold">{t.course.outcomes}</h2>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2">
              {course.outcomes.map((o, i) => (
                <li key={i} className="flex gap-3 rounded-2xl border border-burgundy/10 bg-white p-4 text-ink"><Star size={14} className="mt-1 shrink-0 text-raspberry" />{o[lang]}</li>
              ))}
            </ul>
          </section>
          <section>
            <h2 className="text-2xl font-semibold">{t.course.curriculum}</h2>
            <div className="mt-5 space-y-4">
              {course.modules.map((m) => (
                <details key={m.id} open className="card group overflow-hidden">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5">
                    <span className="font-display font-semibold text-burgundy">{m.title[lang]}</span>
                    <span className="shrink-0 text-xs text-ink-muted">{fmt(t.common.lessons, { n: m.lessons.length })}</span>
                  </summary>
                  <ul className="border-t border-burgundy/10">
                    {m.lessons.map((ls) => {
                      const Icon = lessonIcon[ls.type];
                      const done = enrolled && isComplete(course.slug, ls.id);
                      const open = enrolled || ls.preview;
                      return (
                        <li key={ls.id} className="border-b border-burgundy/5 last:border-0">
                          <Link href={lessonHref(ls.id)} className="flex items-center gap-3 px-5 py-3.5 text-sm hover:bg-cream">
                            <span className={`inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${done ? "bg-raspberry text-white" : "bg-blush text-burgundy"}`}>
                              {done ? <IconCheck className="h-4 w-4" /> : <Icon className="h-4 w-4" />}
                            </span>
                            <span className="min-w-0 flex-1">
                              <span className="block font-medium text-ink">{ls.title[lang]}</span>
                              <span className="text-xs text-ink-muted">{t.common.lessonTypes[ls.type]} · {ls.duration} {t.common.min}</span>
                            </span>
                            {ls.preview && !enrolled && <span className="chip border-raspberry/30 text-raspberry">{t.course.previewLabel}</span>}
                            {!open && <span className="sr-only">locked</span>}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </details>
              ))}
            </div>
          </section>
          <section>
            <h2 className="text-2xl font-semibold">{t.course.assignments}</h2>
            <p className="mt-2 text-ink-soft">{t.course.assignmentsText}</p>
            <ul className="mt-5 space-y-3">
              {assignments.map((a) => (
                <li key={a.id} className="card p-5">
                  <p className="flex items-center gap-2 font-semibold text-burgundy">{a.type === "project" ? <IconAward className="h-5 w-5 text-raspberry" /> : <lessonIcon.assignment className="h-5 w-5 text-raspberry" />}{a.title[lang]}</p>
                  <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">{a.description[lang]}</p>
                </li>
              ))}
            </ul>
          </section>
        </div>

        <aside className="space-y-6">
          {mentor && (
            <section className="card p-6">
              <p className="text-xs font-semibold uppercase tracking-wider text-ink-muted">{t.common.instructor}</p>
              <div className="mt-4 flex items-center gap-4">
                <Avatar initials={mentor.initials} />
                <div>
                  <p className="font-display text-lg font-semibold text-burgundy">{mentor.name}</p>
                  <p className="text-sm text-ink-soft">{mentor.role[lang]}</p>
                </div>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-ink-soft">{mentor.bio[lang]}</p>
              {mentor.sample && <span className="sample-badge mt-4">{t.common.sampleProfile}</span>}
            </section>
          )}
          <section className="card p-6">
            <p className="flex items-center gap-2 font-semibold text-burgundy"><IconGlobe className="h-5 w-5 text-raspberry" />{t.common.languages}</p>
            <div className="mt-3 flex flex-wrap gap-2">{course.languages.map((x) => <span key={x} className="chip">{t.common.langNames[x]}</span>)}</div>
            <p className="mt-3 text-xs leading-relaxed text-ink-muted">{t.course.languagesNote}</p>
          </section>
          <section className="card flex items-center gap-4 p-6">
            <IconAward className="h-10 w-10 shrink-0 text-gold" />
            <p className="font-medium text-burgundy">{t.course.certificate}</p>
          </section>
        </aside>
      </div>
    </>
  );
}
