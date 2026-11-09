"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useApp } from "@/lib/state";
import { LANGS, type Lang } from "@/lib/types";
import { Star } from "@/components/art";
import { IconCheck, IconInfo, IconShield } from "@/components/icons";

const REGIONS = [
  "Astana", "Almaty", "Shymkent", "Abai", "Akmola", "Aktobe", "Almaty Region", "Atyrau", "East Kazakhstan", "Jambyl",
  "Jetisu", "Karaganda", "Kostanay", "Kyzylorda", "Mangystau", "North Kazakhstan", "Pavlodar", "Turkistan", "Ulytau", "West Kazakhstan",
];

function RegisterInner() {
  const { t, lang, register } = useApp();
  const a = t.auth;
  const router = useRouter();
  const next = useSearchParams().get("next") || "/dashboard";
  const [step, setStep] = useState(0);
  const [f, setF] = useState({ firstName: "", email: "", password: "", birthYear: "", region: "", lang: lang as Lang, guardianName: "", guardianEmail: "", consent: false, rules: false });
  const [err, setErr] = useState<Record<string, string>>({});
  const [busy, setBusy] = useState(false);
  const set = (k: keyof typeof f, v: string | boolean) => setF((p) => ({ ...p, [k]: v }));
  const year = new Date().getFullYear();
  const age = f.birthYear ? year - Number(f.birthYear) : 0;
  const minor = age < 18;
  const steps = minor ? [a.stepAccount, a.stepGuardian, a.stepRules] : [a.stepAccount, a.stepRules];
  const emailOk = (s: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);

  const validate = () => {
    const e: Record<string, string> = {};
    const kind = steps[step];
    if (kind === a.stepAccount) {
      if (!f.firstName.trim()) e.firstName = a.errors.required;
      if (!emailOk(f.email)) e.email = a.errors.email;
      if (f.password.length < 8) e.password = a.errors.password;
      const y = Number(f.birthYear);
      if (!y || y < 1950 || y > year) e.birthYear = a.errors.year;
      else if (year - y < 10) e.birthYear = a.errors.age;
    } else if (kind === a.stepGuardian) {
      if (!f.guardianName.trim()) e.guardianName = a.errors.required;
      if (!emailOk(f.guardianEmail)) e.guardianEmail = a.errors.email;
      if (!f.consent) e.consent = a.errors.consent;
    } else if (!f.rules) e.rules = a.errors.rules;
    setErr(e);
    return !Object.keys(e).length;
  };

  const onSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate()) return;
    if (step < steps.length - 1) return setStep(step + 1);
    setBusy(true);
    const r = await register(
      {
        firstName: f.firstName.trim(),
        email: f.email,
        birthYear: Number(f.birthYear),
        region: f.region || undefined,
        lang: f.lang,
        ...(minor ? { guardianName: f.guardianName.trim(), guardianEmail: f.guardianEmail.trim(), consentAt: new Date().toISOString() } : {}),
      },
      f.password
    );
    setBusy(false);
    if (r === "exists") { setStep(0); setErr({ email: a.errors.exists }); return; }
    router.push(next);
  };

  const Field = ({ k, label, type = "text", hint, ...rest }: { k: keyof typeof f; label: string; type?: string; hint?: string } & React.InputHTMLAttributes<HTMLInputElement>) => (
    <label className="block">
      <span className="label">{label}</span>
      <input className="input" type={type} value={f[k] as string} onChange={(e) => set(k, e.target.value)} aria-invalid={!!err[k]} {...rest} />
      {err[k] ? <span className="mt-1 block text-xs text-raspberry">{err[k]}</span> : hint ? <span className="mt-1 block text-xs text-ink-muted">{hint}</span> : null}
    </label>
  );
  const kind = steps[step];

  return (
    <div className="container-site grid gap-10 py-12 lg:grid-cols-[1fr_1.1fr] lg:py-16">
      <div className="hidden lg:block">
        <span className="eyebrow"><Star size={11} className="text-gold" />{t.common.free}</span>
        <h1 className="mt-4 text-4xl font-semibold leading-tight">{a.registerTitle}</h1>
        <p className="mt-4 text-lg text-ink-soft">{a.registerText}</p>
        <ul className="mt-8 space-y-3">
          {t.course.includesItems.map((x) => <li key={x} className="flex gap-3 text-ink"><IconCheck className="h-5 w-5 shrink-0 text-raspberry" />{x}</li>)}
        </ul>
        <p className="mt-10 flex max-w-md gap-2 rounded-2xl bg-white p-4 text-sm text-ink-soft ring-1 ring-burgundy/10"><IconShield className="h-5 w-5 shrink-0 text-raspberry" />{t.about.safetyText}</p>
      </div>

      <form onSubmit={onSubmit} noValidate className="card p-6 sm:p-8">
        <h1 className="text-2xl font-semibold lg:hidden">{a.registerTitle}</h1>
        <ol className="mt-4 flex gap-2 lg:mt-0" aria-label="Steps">
          {steps.map((s, i) => (
            <li key={s} className="flex-1">
              <div className={`h-1.5 rounded-full ${i <= step ? "bg-raspberry" : "bg-blush"}`} />
              <span className={`mt-2 block text-xs ${i === step ? "font-semibold text-burgundy" : "text-ink-muted"}`}>{i + 1}. {s}</span>
            </li>
          ))}
        </ol>

        <div className="mt-8 space-y-5">
          {kind === a.stepAccount && (
            <>
              {Field({ k: "firstName", label: a.firstName, hint: a.firstNameHint, autoComplete: "given-name" })}
              {Field({ k: "email", label: a.email, type: "email", autoComplete: "email" })}
              {Field({ k: "password", label: a.password, type: "password", hint: a.passwordHint, autoComplete: "new-password" })}
              <div className="grid gap-5 sm:grid-cols-2">
                {Field({ k: "birthYear", label: a.birthYear, type: "number", inputMode: "numeric", min: 1950, max: year })}
                <label className="block">
                  <span className="label">{a.region}</span>
                  <select className="input" value={f.region} onChange={(e) => set("region", e.target.value)}>
                    <option value="">{a.regionPh}</option>
                    {REGIONS.map((r) => <option key={r} value={r}>{r}</option>)}
                  </select>
                </label>
              </div>
              <fieldset>
                <legend className="label">{a.language}</legend>
                <div className="grid grid-cols-3 gap-2">
                  {LANGS.map((l) => (
                    <label key={l} className={`cursor-pointer rounded-xl border px-3 py-2.5 text-center text-sm font-medium ${f.lang === l ? "border-burgundy bg-blush/50 text-burgundy" : "border-burgundy/15 text-ink-soft"}`}>
                      <input type="radio" name="lang" className="sr-only" checked={f.lang === l} onChange={() => set("lang", l)} />
                      {t.common.langNames[l]}
                    </label>
                  ))}
                </div>
              </fieldset>
            </>
          )}

          {kind === a.stepGuardian && (
            <>
              <p className="flex gap-2 rounded-2xl bg-blush/50 p-4 text-sm text-ink"><IconShield className="h-5 w-5 shrink-0 text-raspberry" />{a.guardianText}</p>
              {Field({ k: "guardianName", label: a.guardianName })}
              {Field({ k: "guardianEmail", label: a.guardianEmail, type: "email" })}
              <label className="flex gap-3 text-sm text-ink">
                <input type="checkbox" className="mt-0.5 h-4 w-4 accent-raspberry" checked={f.consent} onChange={(e) => set("consent", e.target.checked)} />
                {a.guardianConsent}
              </label>
              {err.consent && <p className="text-xs text-raspberry">{err.consent}</p>}
            </>
          )}

          {kind === a.stepRules && (
            <>
              <p className="text-sm text-ink-soft">{a.rulesIntro}</p>
              <ul className="space-y-2 rounded-2xl bg-cream p-5 text-sm text-ink">
                {a.rules.map((r) => <li key={r} className="flex gap-2"><Star size={10} className="mt-1.5 shrink-0 text-raspberry" />{r}</li>)}
              </ul>
              <Link href="/privacy" target="_blank" className="inline-block text-sm font-medium text-raspberry underline">{t.footer.privacy}</Link>
              <label className="flex gap-3 text-sm text-ink">
                <input type="checkbox" className="mt-0.5 h-4 w-4 accent-raspberry" checked={f.rules} onChange={(e) => set("rules", e.target.checked)} />
                {a.acceptPrivacy}
              </label>
              {err.rules && <p className="text-xs text-raspberry">{err.rules}</p>}
            </>
          )}
        </div>

        <div className="mt-8 flex gap-3">
          {step > 0 && <button type="button" className="btn-secondary" onClick={() => setStep(step - 1)}>{a.back}</button>}
          <button type="submit" className="btn-primary flex-1" disabled={busy}>{step === steps.length - 1 ? a.create : a.next}</button>
        </div>
        <p className="mt-6 text-center text-sm text-ink-soft">{a.haveAccount} <Link href={`/login?next=${encodeURIComponent(next)}`} className="font-semibold text-raspberry">{a.loginButton}</Link></p>
        <p className="mt-6 flex gap-2 border-t border-burgundy/10 pt-4 text-xs text-ink-muted"><IconInfo className="h-4 w-4 shrink-0" />{t.common.demoStorage}</p>
      </form>
    </div>
  );
}

export default function RegisterPage() {
  return <Suspense><RegisterInner /></Suspense>;
}
