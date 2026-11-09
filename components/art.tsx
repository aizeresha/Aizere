import type { Course } from "@/lib/types";

export function Star({ className = "", size = 16 }: { className?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path d="M12 0c.6 6.6 5.4 11.4 12 12-6.6.6-11.4 5.4-12 12-.6-6.6-5.4-11.4-12-12C6.6 11.4 11.4 6.6 12 0Z" fill="currentColor" />
    </svg>
  );
}

export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <svg width="34" height="34" viewBox="0 0 40 40" aria-hidden="true">
        <circle cx="20" cy="20" r="19" fill="#701637" />
        <ellipse cx="20" cy="20" rx="14" ry="6" fill="none" stroke="#C39A60" strokeWidth="1.4" transform="rotate(-28 20 20)" />
        <path d="M20 9c.4 4.6 3.4 7.6 8 8-4.6.4-7.6 3.4-8 8-.4-4.6-3.4-7.6-8-8 4.6-.4 7.6-3.4 8-8Z" fill="#F8F5F0" />
        <circle cx="31.5" cy="14" r="1.8" fill="#A71950" stroke="#F8F5F0" strokeWidth="0.8" />
      </svg>
      <span className="font-display text-[15px] font-semibold leading-none tracking-tight text-burgundy">
        RoboSpark<span className="block text-[10px] font-medium uppercase tracking-[0.3em] text-raspberry">Academy</span>
      </span>
    </span>
  );
}

/** Hero illustration: orbital paths, a stylised robot arm and stars. */
export function HeroArt() {
  return (
    <svg viewBox="0 0 520 520" className="h-auto w-full" role="img" aria-label="Orbits around a robotic arm">
      <defs>
        <radialGradient id="glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#F1DDE5" />
          <stop offset="100%" stopColor="#F8F5F0" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="260" cy="260" r="250" fill="url(#glow)" />
      <g className="orbit-slower">
        <circle cx="260" cy="260" r="235" fill="none" stroke="#C39A60" strokeOpacity=".45" strokeDasharray="2 7" />
        <circle cx="25" cy="260" r="5" fill="#C39A60" />
      </g>
      <g className="orbit-slow">
        <ellipse cx="260" cy="260" rx="215" ry="88" fill="none" stroke="#A71950" strokeOpacity=".35" transform="rotate(-24 260 260)" />
        <circle cx="455" cy="175" r="8" fill="#A71950" />
      </g>
      <ellipse cx="260" cy="260" rx="190" ry="70" fill="none" stroke="#701637" strokeOpacity=".2" transform="rotate(32 260 260)" />
      {/* planet base */}
      <circle cx="260" cy="300" r="118" fill="#701637" />
      <path d="M148 330a118 118 0 0 0 224 0" fill="#4A0E25" opacity=".5" />
      <ellipse cx="260" cy="300" rx="170" ry="34" fill="none" stroke="#C39A60" strokeWidth="2" transform="rotate(-10 260 300)" />
      {/* robot arm */}
      <g stroke="#F8F5F0" strokeLinecap="round" strokeLinejoin="round">
        <rect x="222" y="262" width="76" height="30" rx="10" fill="#A71950" strokeWidth="3" />
        <path d="M260 262 L232 188" strokeWidth="16" stroke="#C39A60" />
        <path d="M232 188 L304 142" strokeWidth="13" stroke="#C39A60" />
        <circle cx="260" cy="262" r="12" fill="#F8F5F0" stroke="none" />
        <circle cx="232" cy="188" r="11" fill="#701637" stroke="#C39A60" strokeWidth="4" />
        <circle cx="304" cy="142" r="8" fill="#701637" stroke="none" />
        <path d="M304 142 L330 128 M304 142 L322 162" strokeWidth="6" stroke="#701637" />
      </g>
      {/* spark */}
      <g transform="translate(340 92)">
        <path d="M14 0c.7 7.7 6.3 13.3 14 14-7.7.7-13.3 6.3-14 14-.7-7.7-6.3-13.3-14-14C7.7 13.3 13.3 7.7 14 0Z" fill="#C39A60" />
      </g>
      <g fill="#A71950">
        <path transform="translate(96 120) scale(.6)" d="M12 0c.6 6.6 5.4 11.4 12 12-6.6.6-11.4 5.4-12 12-.6-6.6-5.4-11.4-12-12C6.6 11.4 11.4 6.6 12 0Z" />
        <path transform="translate(420 380) scale(.8)" d="M12 0c.6 6.6 5.4 11.4 12 12-6.6.6-11.4 5.4-12 12-.6-6.6-5.4-11.4-12-12C6.6 11.4 11.4 6.6 12 0Z" />
      </g>
      <g fill="#701637" opacity=".5">
        <circle cx="140" cy="430" r="3" />
        <circle cx="400" cy="70" r="2.5" />
        <circle cx="70" cy="330" r="2" />
        <circle cx="470" cy="290" r="2" />
      </g>
    </svg>
  );
}

const motifs: Record<Course["motif"], React.ReactNode> = {
  gear: (
    <g fill="none" stroke="#F8F5F0" strokeWidth="5">
      <circle cx="160" cy="100" r="30" />
      <circle cx="160" cy="100" r="9" fill="#F8F5F0" />
      {Array.from({ length: 8 }).map((_, i) => (
        <rect key={i} x="154" y="56" width="12" height="14" rx="2" fill="#F8F5F0" stroke="none" transform={`rotate(${i * 45} 160 100)`} />
      ))}
    </g>
  ),
  cube: (
    <g fill="none" stroke="#F8F5F0" strokeWidth="4" strokeLinejoin="round">
      <path d="M160 52 L204 76 L204 124 L160 148 L116 124 L116 76 Z" />
      <path d="M116 76 L160 100 L204 76 M160 100 L160 148" />
      <path d="M160 52 L160 100" strokeDasharray="4 6" opacity=".6" />
    </g>
  ),
  code: (
    <g fill="none" stroke="#F8F5F0" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M128 72 L100 100 L128 128" />
      <path d="M192 72 L220 100 L192 128" />
      <path d="M172 62 L148 138" />
    </g>
  ),
  trophy: (
    <g fill="none" stroke="#F8F5F0" strokeWidth="5" strokeLinejoin="round" strokeLinecap="round">
      <path d="M132 60 H188 V92 a28 28 0 0 1 -56 0 Z" />
      <path d="M132 70 H114 a16 16 0 0 0 20 26 M188 70 H206 a16 16 0 0 1 -20 26" />
      <path d="M160 120 V136 M140 142 H180" />
    </g>
  ),
};

const bgs: Record<Course["motif"], [string, string]> = {
  gear: ["#701637", "#A71950"],
  cube: ["#A71950", "#C7457A"],
  code: ["#4A0E25", "#701637"],
  trophy: ["#8C1443", "#C39A60"],
};

/** Generated course thumbnail — replace with real photography when available. */
export function CourseThumb({ course, className = "" }: { course: Course; className?: string }) {
  const [a, b] = bgs[course.motif];
  const id = `g-${course.slug}`;
  return (
    <svg viewBox="0 0 320 200" className={`block h-auto w-full ${className}`} aria-hidden="true">
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={a} />
          <stop offset="1" stopColor={b} />
        </linearGradient>
      </defs>
      <rect width="320" height="200" fill={`url(#${id})`} />
      <ellipse cx="160" cy="100" rx="140" ry="48" fill="none" stroke="#F8F5F0" strokeOpacity=".22" transform="rotate(-16 160 100)" />
      <ellipse cx="160" cy="100" rx="96" ry="96" fill="none" stroke="#C39A60" strokeOpacity=".5" strokeDasharray="2 6" />
      <circle cx="286" cy="56" r="5" fill="#C39A60" />
      <path transform="translate(40 140) scale(.7)" d="M12 0c.6 6.6 5.4 11.4 12 12-6.6.6-11.4 5.4-12 12-.6-6.6-5.4-11.4-12-12C6.6 11.4 11.4 6.6 12 0Z" fill="#F8F5F0" opacity=".7" />
      {motifs[course.motif]}
    </svg>
  );
}

export function Avatar({ initials, size = "md" }: { initials: string; size?: "sm" | "md" | "lg" }) {
  const s = size === "lg" ? "h-24 w-24 text-2xl" : size === "sm" ? "h-10 w-10 text-sm" : "h-16 w-16 text-lg";
  return (
    <span className={`relative inline-flex shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-burgundy to-raspberry font-display font-semibold text-cream ${s}`}>
      {initials}
      <span className="absolute -right-0.5 -top-0.5 text-gold">
        <Star size={size === "lg" ? 18 : 12} />
      </span>
    </span>
  );
}
