"use client";

import Link from "next/link";
import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useApp } from "@/lib/state";
import { Star } from "@/components/art";
import { IconInfo } from "@/components/icons";

function LoginInner() {
  const { t, login } = useApp();
  const router = useRouter();
  const next = useSearchParams().get("next") || "/dashboard";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);

  return (
    <div className="container-site flex justify-center py-16">
      <form
        className="card w-full max-w-md p-6 sm:p-8"
        onSubmit={async (e) => {
          e.preventDefault();
          setBusy(true);
          const ok = await login(email, password);
          setBusy(false);
          if (!ok) return setErr(t.auth.errors.invalid);
          router.push(next);
        }}
      >
        <Star size={24} className="text-gold" />
        <h1 className="mt-4 text-2xl font-semibold">{t.auth.loginTitle}</h1>
        <p className="mt-1 text-ink-soft">{t.auth.loginText}</p>
        <div className="mt-6 space-y-4">
          <label className="block"><span className="label">{t.auth.email}</span><input className="input" type="email" autoComplete="email" required value={email} onChange={(e) => setEmail(e.target.value)} /></label>
          <label className="block"><span className="label">{t.auth.password}</span><input className="input" type="password" autoComplete="current-password" required value={password} onChange={(e) => setPassword(e.target.value)} /></label>
          {err && <p className="text-sm text-raspberry" role="alert">{err}</p>}
          <button className="btn-primary w-full" disabled={busy}>{t.auth.loginButton}</button>
        </div>
        <p className="mt-6 text-center text-sm text-ink-soft">{t.auth.noAccount} <Link href={`/register?next=${encodeURIComponent(next)}`} className="font-semibold text-raspberry">{t.nav.register}</Link></p>
        <p className="mt-6 flex gap-2 border-t border-burgundy/10 pt-4 text-xs text-ink-muted"><IconInfo className="h-4 w-4 shrink-0" />{t.common.demoStorage}</p>
      </form>
    </div>
  );
}

export default function LoginPage() {
  return <Suspense><LoginInner /></Suspense>;
}
