"use client";

import Link from "next/link";
import { useApp } from "@/lib/state";
import { Logo, Star } from "./art";

export default function Footer() {
  const { t } = useApp();
  return (
    <footer className="mt-24 border-t border-burgundy/10 bg-white">
      <div className="container-site grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div className="lg:col-span-2">
          <Logo />
          <p className="mt-4 max-w-sm font-display text-lg text-burgundy">{t.footer.tagline}</p>
        </div>
        <div>
          <h3 className="font-sans text-xs font-semibold uppercase tracking-[0.18em] text-raspberry">{t.footer.learn}</h3>
          <ul className="mt-4 space-y-2 text-sm text-ink-soft">
            <li><Link className="hover:text-burgundy" href="/courses">{t.nav.courses}</Link></li>
            <li><Link className="hover:text-burgundy" href="/dashboard">{t.nav.dashboard}</Link></li>
            <li><Link className="hover:text-burgundy" href="/register">{t.nav.register}</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="font-sans text-xs font-semibold uppercase tracking-[0.18em] text-raspberry">{t.footer.academy}</h3>
          <ul className="mt-4 space-y-2 text-sm text-ink-soft">
            <li><Link className="hover:text-burgundy" href="/about">{t.nav.about}</Link></li>
            <li><Link className="hover:text-burgundy" href="/mentors">{t.nav.mentors}</Link></li>
            <li><Link className="hover:text-burgundy" href="/about#partner">{t.footer.partner}</Link></li>
            <li><Link className="hover:text-burgundy" href="/privacy">{t.footer.privacy}</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-burgundy/10">
        <div className="container-site flex flex-col gap-2 py-6 text-xs text-ink-muted sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} {t.footer.rights}</span>
          <span className="inline-flex items-center gap-1.5"><Star size={10} className="text-gold" /> {t.footer.prototype}</span>
        </div>
      </div>
    </footer>
  );
}
