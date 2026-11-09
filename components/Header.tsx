"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useApp } from "@/lib/state";
import { LANGS } from "@/lib/types";
import { Logo } from "./art";
import { IconMenu, IconX } from "./icons";

export function LangSwitch({ className = "" }: { className?: string }) {
  const { lang, setLang, t } = useApp();
  return (
    <div role="group" aria-label={t.nav.language} className={`inline-flex rounded-full border border-burgundy/15 bg-white p-0.5 ${className}`}>
      {LANGS.map((l) => (
        <button
          key={l}
          type="button"
          onClick={() => setLang(l)}
          aria-pressed={lang === l}
          className={`rounded-full px-2.5 py-1 text-xs font-semibold transition-colors ${
            lang === l ? "bg-burgundy text-white" : "text-ink-soft hover:text-burgundy"
          }`}
        >
          {l.toUpperCase()}
        </button>
      ))}
    </div>
  );
}

export default function Header() {
  const { t, user, logout } = useApp();
  const path = usePathname();
  const [open, setOpen] = useState(false);
  useEffect(() => setOpen(false), [path]);

  const links = [
    { href: "/courses", label: t.nav.courses },
    { href: "/mentors", label: t.nav.mentors },
    { href: "/about", label: t.nav.about },
    ...(user ? [{ href: "/dashboard", label: t.nav.dashboard }] : []),
  ];
  const active = (h: string) => path === h || path.startsWith(h + "/");

  return (
    <header className="sticky top-0 z-40 border-b border-burgundy/10 bg-cream/90 backdrop-blur">
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-2 focus:z-50 focus:rounded focus:bg-white focus:px-3 focus:py-2">
        {t.nav.skip}
      </a>
      <div className="container-site flex h-16 items-center justify-between gap-4">
        <Link href="/" aria-label="RoboSpark Academy — home">
          <Logo />
        </Link>
        <nav className="hidden items-center gap-1 lg:flex" aria-label="Main">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                active(l.href) ? "bg-blush text-burgundy" : "text-ink-soft hover:text-burgundy"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="hidden items-center gap-3 lg:flex">
          <LangSwitch />
          {user ? (
            <button onClick={logout} className="btn-ghost">
              {t.nav.logout}
            </button>
          ) : (
            <>
              <Link href="/login" className="btn-ghost">
                {t.nav.login}
              </Link>
              <Link href="/register" className="btn-primary py-2.5">
                {t.nav.register}
              </Link>
            </>
          )}
        </div>
        <div className="flex items-center gap-2 lg:hidden">
          <LangSwitch />
          <button
            className="rounded-full p-2 text-burgundy hover:bg-blush"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-label={open ? t.nav.close : t.nav.menu}
          >
            {open ? <IconX className="h-6 w-6" /> : <IconMenu className="h-6 w-6" />}
          </button>
        </div>
      </div>
      {open && (
        <div className="border-t border-burgundy/10 bg-cream lg:hidden">
          <nav className="container-site flex flex-col gap-1 py-4" aria-label="Mobile">
            {[{ href: "/", label: t.nav.home }, ...links].map((l) => (
              <Link key={l.href} href={l.href} className={`rounded-xl px-4 py-3 text-base font-medium ${active(l.href) && l.href !== "/" ? "bg-blush text-burgundy" : "text-ink"}`}>
                {l.label}
              </Link>
            ))}
            <div className="mt-3 flex gap-2 border-t border-burgundy/10 pt-4">
              {user ? (
                <button onClick={logout} className="btn-secondary flex-1">
                  {t.nav.logout}
                </button>
              ) : (
                <>
                  <Link href="/login" className="btn-secondary flex-1">
                    {t.nav.login}
                  </Link>
                  <Link href="/register" className="btn-primary flex-1">
                    {t.nav.register}
                  </Link>
                </>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
