"use client";

import { useApp } from "@/lib/state";
import PageHeader from "@/components/PageHeader";
import { Star } from "@/components/art";
import { IconInfo } from "@/components/icons";

export default function PrivacyPage() {
  const { t } = useApp();
  const p = t.privacy;
  const List = ({ items }: { items: string[] }) => (
    <ul className="mt-4 space-y-3">{items.map((x) => <li key={x} className="flex gap-3 text-ink"><Star size={10} className="mt-1.5 shrink-0 text-raspberry" />{x}</li>)}</ul>
  );
  return (
    <>
      <PageHeader title={p.title} text={p.intro} />
      <div className="container-site max-w-3xl space-y-10 py-12">
        <section><h2 className="text-xl font-semibold">{p.collectTitle}</h2><List items={p.collect} /></section>
        <section><h2 className="text-xl font-semibold">{p.notTitle}</h2><List items={p.not} /></section>
        <section><h2 className="text-xl font-semibold">{p.rulesTitle}</h2><List items={t.auth.rules} /></section>
        <section className="rounded-3xl bg-gold/10 p-6">
          <h2 className="flex items-center gap-2 text-lg font-semibold"><IconInfo className="h-5 w-5" />{p.prototypeTitle}</h2>
          <p className="mt-2 text-sm text-ink-soft">{p.prototypeText}</p>
        </section>
      </div>
    </>
  );
}
