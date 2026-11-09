import { Star } from "./art";

export default function PageHeader({ eyebrow, title, text, children }: { eyebrow?: string; title: string; text?: string; children?: React.ReactNode }) {
  return (
    <section className="relative overflow-hidden border-b border-burgundy/10">
      <svg className="pointer-events-none absolute -right-24 -top-32 h-96 w-96 opacity-40" viewBox="0 0 200 200" aria-hidden="true">
        <circle cx="100" cy="100" r="96" fill="none" stroke="#C39A60" strokeDasharray="1 5" />
        <ellipse cx="100" cy="100" rx="96" ry="36" fill="none" stroke="#A71950" strokeOpacity=".4" transform="rotate(-25 100 100)" />
      </svg>
      <div className="container-site relative py-12 lg:py-16">
        {eyebrow && <span className="eyebrow"><Star size={11} className="text-gold" />{eyebrow}</span>}
        <h1 className="mt-4 max-w-3xl text-3xl font-semibold leading-tight sm:text-5xl">{title}</h1>
        {text && <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink-soft">{text}</p>}
        {children}
      </div>
    </section>
  );
}
