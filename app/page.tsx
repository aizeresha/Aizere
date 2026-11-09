"use client";

import Link from "next/link";
import { useApp } from "@/lib/state";
import { courses } from "@/lib/data/courses";
import { mentors } from "@/lib/data/mentors";
import CourseCard from "@/components/CourseCard";
import { HeroArt, Star, Avatar } from "@/components/art";
import { IconArrow, IconGift, IconClock, IconUsers, IconPlay, IconTool, IconLayers, IconUsers as IconFeedback, IconAward } from "@/components/icons";

export default function Home() {
  const { t, lang } = useApp();
  const h = t.home;
  const benefitIcons = [IconGift, IconClock, IconUsers];
  const stepIcons = [IconPlay, IconTool, IconLayers, IconFeedback, IconAward];

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="container-site grid items-center gap-10 py-14 lg:grid-cols-[1.15fr_1fr] lg:py-24">
          <div>
            <span className="eyebrow"><Star size={12} className="text-gold" />{h.heroEyebrow}</span>
            <h1 className="mt-5 text-4xl font-semibold leading-[1.08] sm:text-5xl lg:text-6xl">{h.heroTitle}</h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-soft">{h.heroText}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/courses" className="btn-primary px-6 py-3.5 text-base">{h.heroPrimary} <IconArrow className="h-4 w-4" /></Link>
              <a href="#how" className="btn-secondary px-6 py-3.5 text-base">{h.heroSecondary}</a>
            </div>
            <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-2 text-sm font-medium text-burgundy">
              {h.heroFacts.map((f) => (
                <li key={f} className="inline-flex items-center gap-2"><Star size={10} className="text-raspberry" />{f}</li>
              ))}
            </ul>
          </div>
          <div className="mx-auto w-full max-w-md lg:max-w-none"><HeroArt /></div>
        </div>
      </section>

      {/* INTRO + BENEFITS */}
      <section className="border-y border-burgundy/10 bg-white">
        <div className="container-site py-16 lg:py-24">
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-16">
            <div>
              <span className="eyebrow">{h.introEyebrow}</span>
              <h2 className="mt-4 text-3xl font-semibold leading-tight sm:text-4xl">{h.introTitle}</h2>
            </div>
            <p className="text-lg leading-relaxed text-ink-soft lg:pt-10">{h.introText}</p>
          </div>
          <div className="mt-14 grid gap-5 md:grid-cols-3">
            {h.benefits.map((b, i) => {
              const Icon = benefitIcons[i];
              return (
                <div key={b.title} className="rounded-3xl border border-burgundy/10 bg-cream p-7">
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-burgundy text-cream"><Icon className="h-6 w-6" /></span>
                  <h3 className="mt-5 text-xl font-semibold">{b.title}</h3>
                  <p className="mt-2 leading-relaxed text-ink-soft">{b.text}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FEATURED COURSES */}
      <section className="container-site py-16 lg:py-24">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <span className="eyebrow">{h.featuredEyebrow}</span>
            <h2 className="mt-4 max-w-2xl text-3xl font-semibold leading-tight sm:text-4xl">{h.featuredTitle}</h2>
          </div>
          <Link href="/courses" className="btn-secondary self-start sm:self-auto">{h.featuredAll} <IconArrow className="h-4 w-4" /></Link>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {courses.map((c) => <CourseCard key={c.slug} course={c} />)}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how" className="scroll-mt-20 bg-burgundy text-cream">
        <div className="container-site relative overflow-hidden py-16 lg:py-24">
          <svg className="pointer-events-none absolute -right-40 -top-40 h-[520px] w-[520px] opacity-20" viewBox="0 0 200 200" aria-hidden="true">
            <circle cx="100" cy="100" r="98" fill="none" stroke="#C39A60" strokeDasharray="1 4" />
            <ellipse cx="100" cy="100" rx="98" ry="38" fill="none" stroke="#F8F5F0" transform="rotate(-25 100 100)" />
          </svg>
          <span className="eyebrow text-gold-light">{h.howEyebrow}</span>
          <h2 className="mt-4 max-w-3xl text-3xl font-semibold leading-tight text-cream sm:text-4xl">{h.howTitle}</h2>
          <p className="mt-4 max-w-2xl text-lg text-cream/75">{h.howText}</p>
          <ol className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {h.howSteps.map((s, i) => {
              const Icon = stepIcons[i];
              return (
                <li key={s.title} className="relative rounded-3xl border border-cream/15 bg-cream/[0.06] p-6">
                  <div className="flex items-center justify-between">
                    <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-raspberry"><Icon className="h-5 w-5" /></span>
                    <span className="font-display text-sm text-gold">0{i + 1}</span>
                  </div>
                  <h3 className="mt-5 text-lg font-semibold text-cream">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-cream/75">{s.text}</p>
                </li>
              );
            })}
          </ol>
          <p className="mt-8 inline-flex items-start gap-2 rounded-2xl border border-gold/40 px-4 py-3 text-sm text-cream/85">
            <Star size={14} className="mt-0.5 shrink-0 text-gold" />{h.howLive}
          </p>
        </div>
      </section>

      {/* MENTORS */}
      <section className="container-site py-16 lg:py-24">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
          <div>
            <span className="eyebrow">{h.mentorsEyebrow}</span>
            <h2 className="mt-4 text-3xl font-semibold leading-tight sm:text-4xl">{h.mentorsTitle}</h2>
            <p className="mt-4 text-lg leading-relaxed text-ink-soft">{h.mentorsText}</p>
            <Link href="/mentors" className="btn-secondary mt-8">{h.mentorsAll} <IconArrow className="h-4 w-4" /></Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {mentors.map((m) => (
              <div key={m.id} className="card flex items-center gap-4 p-5">
                <Avatar initials={m.initials} />
                <div className="min-w-0">
                  <p className="font-display font-semibold text-burgundy">{m.name}</p>
                  <p className="text-sm text-ink-soft">{m.role[lang]}</p>
                  {m.sample && <span className="sample-badge mt-2">{t.common.sampleProfile}</span>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MISSION */}
      <section className="bg-blush/60">
        <div className="container-site grid gap-12 py-16 lg:grid-cols-2 lg:py-24">
          <div>
            <span className="eyebrow">{h.missionEyebrow}</span>
            <h2 className="mt-4 text-3xl font-semibold leading-tight sm:text-4xl">{h.missionTitle}</h2>
            <p className="mt-5 text-lg leading-relaxed text-ink-soft">{h.missionText}</p>
          </div>
          <div className="rounded-4xl bg-white p-8">
            <p className="font-display text-lg font-semibold text-burgundy">{h.missionGoalsTitle}</p>
            <p className="mt-1 text-sm text-ink-muted">{h.missionGoalsNote}</p>
            <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-8">
              {h.missionGoals.map((g) => (
                <div key={g.label} className="border-l-2 border-gold pl-4">
                  <dt className="font-display text-4xl font-semibold text-raspberry">{g.value}</dt>
                  <dd className="mt-1 text-sm text-ink-soft">{g.label}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container-site pt-16 lg:pt-24">
        <div className="relative overflow-hidden rounded-4xl bg-gradient-to-br from-burgundy via-burgundy to-raspberry px-6 py-14 text-center sm:px-12 lg:py-20">
          <svg className="pointer-events-none absolute inset-0 h-full w-full opacity-25" viewBox="0 0 800 300" preserveAspectRatio="none" aria-hidden="true">
            <ellipse cx="400" cy="150" rx="380" ry="110" fill="none" stroke="#C39A60" strokeDasharray="2 6" />
            <ellipse cx="400" cy="150" rx="260" ry="70" fill="none" stroke="#F8F5F0" />
          </svg>
          <Star size={28} className="relative mx-auto text-gold" />
          <h2 className="relative mt-5 text-3xl font-semibold text-cream sm:text-5xl">{h.ctaTitle}</h2>
          <p className="relative mx-auto mt-4 max-w-xl text-lg text-cream/80">{h.ctaText}</p>
          <div className="relative mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/register" className="btn bg-cream px-6 py-3.5 text-base text-burgundy hover:bg-white">{h.ctaPrimary}</Link>
            <Link href="/courses" className="btn border border-cream/40 px-6 py-3.5 text-base text-cream hover:bg-cream/10">{h.ctaSecondary}</Link>
          </div>
        </div>
      </section>
    </>
  );
}
