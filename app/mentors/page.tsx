"use client";

import Link from "next/link";
import { useApp } from "@/lib/state";
import { mentors } from "@/lib/data/mentors";
import { courses } from "@/lib/data/courses";
import PageHeader from "@/components/PageHeader";
import { Avatar, Star } from "@/components/art";
import { IconInfo, IconArrow } from "@/components/icons";

export default function MentorsPage() {
  const { t, lang } = useApp();
  return (
    <>
      <PageHeader eyebrow={t.mentors.eyebrow} title={t.mentors.title} text={t.mentors.text}>
        <p className="mt-6 inline-flex items-start gap-2 rounded-2xl bg-gold/10 px-4 py-3 text-sm text-[#7A5C2C]"><IconInfo className="mt-0.5 h-4 w-4 shrink-0" />{t.mentors.sampleNote}</p>
      </PageHeader>
      <div className="container-site grid gap-6 py-12 md:grid-cols-2">
        {mentors.map((m) => {
          const taught = courses.filter((c) => c.mentorId === m.id);
          return (
            <article key={m.id} className="card flex flex-col p-7">
              <div className="flex items-start gap-5">
                <Avatar initials={m.initials} size="lg" />
                <div>
                  {m.sample && <span className="sample-badge">{t.common.sampleProfile}</span>}
                  <h2 className="mt-2 text-xl font-semibold">{m.name}</h2>
                  <p className="text-sm font-medium text-raspberry">{m.role[lang]}</p>
                </div>
              </div>
              <p className="mt-5 leading-relaxed text-ink-soft">{m.bio[lang]}</p>
              <h3 className="mt-6 font-sans text-xs font-semibold uppercase tracking-wider text-ink-muted">{t.mentors.experience}</h3>
              <ul className="mt-2 space-y-1.5 text-sm text-ink">
                {m.experience.map((e, i) => <li key={i} className="flex gap-2"><Star size={10} className="mt-1.5 shrink-0 text-gold" />{e[lang]}</li>)}
              </ul>
              <h3 className="mt-6 font-sans text-xs font-semibold uppercase tracking-wider text-ink-muted">{t.mentors.teaches}</h3>
              <div className="mt-2 flex flex-wrap gap-2">
                {taught.map((c) => <Link key={c.slug} href={`/courses/${c.slug}`} className="chip hover:border-raspberry hover:text-raspberry">{c.title[lang]}</Link>)}
              </div>
            </article>
          );
        })}
      </div>
      <div className="container-site">
        <div className="flex flex-col items-start justify-between gap-6 rounded-4xl bg-blush/60 p-8 md:flex-row md:items-center md:p-10">
          <div className="max-w-2xl">
            <h2 className="text-2xl font-semibold">{t.mentors.becomeTitle}</h2>
            <p className="mt-2 text-ink-soft">{t.mentors.becomeText}</p>
          </div>
          <Link href="/about#partner" className="btn-primary shrink-0">{t.mentors.becomeCta} <IconArrow className="h-4 w-4" /></Link>
        </div>
      </div>
    </>
  );
}
