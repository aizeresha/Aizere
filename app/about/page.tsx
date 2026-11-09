"use client";

import Link from "next/link";
import { useState } from "react";
import { useApp } from "@/lib/state";
import PageHeader from "@/components/PageHeader";
import { Star } from "@/components/art";
import { IconShield, IconCheck, IconInfo } from "@/components/icons";

export default function AboutPage() {
  const { t } = useApp();
  const a = t.about;
  const [sent, setSent] = useState(false);

  return (
    <>
      <PageHeader eyebrow={a.eyebrow} title={a.title} text={a.text} />
      <div className="container-site space-y-16 py-14">
        <div className="grid gap-6 md:grid-cols-3">
          {[[a.missionTitle, a.missionText], [a.whyTitle, a.whyText], [a.whoTitle, a.whoText]].map(([h, p], i) => (
            <section key={h} className={`rounded-3xl p-7 ${i === 0 ? "bg-burgundy text-cream" : "card"}`}>
              <Star size={18} className={i === 0 ? "text-gold" : "text-raspberry"} />
              <h2 className={`mt-4 text-xl font-semibold ${i === 0 ? "text-cream" : ""}`}>{h}</h2>
              <p className={`mt-3 leading-relaxed ${i === 0 ? "text-cream/85" : "text-ink-soft"}`}>{p}</p>
            </section>
          ))}
        </div>

        <section className="grid gap-10 lg:grid-cols-2">
          <div>
            <h2 className="text-3xl font-semibold leading-tight">{a.howTitle}</h2>
            <ul className="mt-6 space-y-4">
              {a.howItems.map((x) => <li key={x} className="flex gap-3 text-ink"><span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blush text-raspberry"><IconCheck className="h-3.5 w-3.5" /></span>{x}</li>)}
            </ul>
          </div>
          <div className="rounded-3xl bg-blush/60 p-7">
            <IconShield className="h-8 w-8 text-raspberry" />
            <h2 className="mt-4 text-2xl font-semibold">{a.safetyTitle}</h2>
            <p className="mt-3 leading-relaxed text-ink-soft">{a.safetyText}</p>
            <Link href="/privacy" className="btn-secondary mt-6">{a.safetyLink}</Link>
          </div>
        </section>

        <section id="partner" className="scroll-mt-24 grid gap-10 rounded-4xl border border-burgundy/10 bg-white p-6 sm:p-10 lg:grid-cols-[1fr_1.3fr]">
          <div>
            <span className="eyebrow">{t.footer.partner}</span>
            <h2 className="mt-3 text-3xl font-semibold">{a.partnerTitle}</h2>
            <p className="mt-3 leading-relaxed text-ink-soft">{a.partnerText}</p>
          </div>
          {sent ? (
            <div className="flex flex-col items-start justify-center rounded-3xl bg-cream p-8" role="status">
              <Star size={28} className="text-gold" />
              <h3 className="mt-4 text-2xl font-semibold">{a.partnerSentTitle}</h3>
              <p className="mt-2 flex gap-2 text-sm text-ink-soft"><IconInfo className="h-4 w-4 shrink-0" />{a.partnerSentText}</p>
            </div>
          ) : (
            <form className="grid gap-4 sm:grid-cols-2" onSubmit={(e) => { e.preventDefault(); setSent(true); }}>
              <label className="block"><span className="label">{a.partnerName}</span><input required className="input" autoComplete="name" /></label>
              <label className="block"><span className="label">{a.partnerOrg}</span><input className="input" autoComplete="organization" /></label>
              <label className="block sm:col-span-2"><span className="label">{a.partnerEmail}</span><input required type="email" className="input" autoComplete="email" /></label>
              <label className="block sm:col-span-2"><span className="label">{a.partnerType}</span>
                <select className="input">{a.partnerTypes.map((x) => <option key={x}>{x}</option>)}</select></label>
              <label className="block sm:col-span-2"><span className="label">{a.partnerMessage}</span><textarea required className="input min-h-28" /></label>
              <button className="btn-primary sm:col-span-2 sm:justify-self-start">{a.partnerSend}</button>
            </form>
          )}
        </section>
      </div>
    </>
  );
}
