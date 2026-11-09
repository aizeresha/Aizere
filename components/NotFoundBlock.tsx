"use client";

import Link from "next/link";
import { useApp } from "@/lib/state";
import { Star } from "./art";

export default function NotFoundBlock({ title }: { title?: string }) {
  const { t } = useApp();
  return (
    <div className="container-site flex flex-col items-center py-28 text-center">
      <Star size={36} className="text-gold" />
      <h1 className="mt-6 text-3xl font-semibold">{title ?? t.common.notFoundTitle}</h1>
      <p className="mt-3 text-ink-soft">{t.common.notFoundText}</p>
      <Link href="/" className="btn-primary mt-8">{t.common.goHome}</Link>
    </div>
  );
}
