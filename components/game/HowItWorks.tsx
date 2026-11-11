"use client";

import { useApp } from "@/lib/state";
import { IconBolt } from "@/components/icons";

/** Three-step strip that explains the game. */
export default function HowItWorks() {
  const { t } = useApp();
  const steps = [t.game.how1, t.game.how2, t.game.how3];
  return (
    <ol className="grid gap-3 sm:grid-cols-3" aria-label={t.game.howTitle}>
      {steps.map((s, i) => (
        <li key={i} className="flex items-center gap-3 rounded-2xl bg-white px-4 py-3 ring-1 ring-burgundy/10">
          <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-burgundy font-display text-sm font-semibold text-cream">
            {i === 2 ? <IconBolt className="h-4 w-4 text-gold" /> : i + 1}
          </span>
          <span className="text-sm text-ink">{s}</span>
        </li>
      ))}
    </ol>
  );
}
