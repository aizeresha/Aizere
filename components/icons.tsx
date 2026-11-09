type P = { className?: string };
const base = (d: React.ReactNode, { className = "h-5 w-5" }: P) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
    {d}
  </svg>
);

export const IconPlay = (p: P) => base(<path d="M7 5v14l11-7z" fill="currentColor" stroke="none" />, p);
export const IconCheck = (p: P) => base(<path d="M5 12.5l4.5 4.5L19 7.5" />, p);
export const IconClock = (p: P) => base(<><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>, p);
export const IconGlobe = (p: P) => base(<><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c2.5 3 2.5 15 0 18M12 3c-2.5 3-2.5 15 0 18" /></>, p);
export const IconArrow = (p: P) => base(<path d="M5 12h14M13 6l6 6-6 6" />, p);
export const IconArrowLeft = (p: P) => base(<path d="M19 12H5M11 6l-6 6 6 6" />, p);
export const IconBook = (p: P) => base(<><path d="M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2z" /><path d="M4 19V5" /></>, p);
export const IconQuiz = (p: P) => base(<><circle cx="12" cy="12" r="9" /><path d="M9.5 9.5a2.5 2.5 0 1 1 3.5 2.3c-.7.3-1 .9-1 1.6M12 17h.01" /></>, p);
export const IconTool = (p: P) => base(<path d="M14.5 6.5a4 4 0 0 0 5 5L12 19a2.1 2.1 0 0 1-3-3l7.5-7.5a4 4 0 0 0-2-2z" />, p);
export const IconFlag = (p: P) => base(<><path d="M5 21V4" /><path d="M5 4h11l-2 4 2 4H5" /></>, p);
export const IconLock = (p: P) => base(<><rect x="5" y="11" width="14" height="10" rx="2" /><path d="M8 11V8a4 4 0 0 1 8 0v3" /></>, p);
export const IconMenu = (p: P) => base(<path d="M4 7h16M4 12h16M4 17h16" />, p);
export const IconX = (p: P) => base(<path d="M6 6l12 12M18 6L6 18" />, p);
export const IconGift = (p: P) => base(<><rect x="4" y="9" width="16" height="11" rx="1.5" /><path d="M3 9h18M12 9v11M12 9c-2-4-6-4-6-1.5S10 9 12 9c2 0 6 0 6-1.5S14 5 12 9" /></>, p);
export const IconUsers = (p: P) => base(<><circle cx="9" cy="8" r="3.5" /><path d="M2.5 20a6.5 6.5 0 0 1 13 0M16 4.5a3.5 3.5 0 0 1 0 7M18 14a6 6 0 0 1 3.5 6" /></>, p);
export const IconAward = (p: P) => base(<><circle cx="12" cy="9" r="6" /><path d="M8.5 14 7 22l5-3 5 3-1.5-8" /></>, p);
export const IconLayers = (p: P) => base(<><path d="M12 3 2 8l10 5 10-5z" /><path d="m2 13 10 5 10-5" /></>, p);
export const IconInfo = (p: P) => base(<><circle cx="12" cy="12" r="9" /><path d="M12 11v5M12 8h.01" /></>, p);
export const IconShield = (p: P) => base(<><path d="M12 3 4 6v6c0 4.5 3.4 8.3 8 9 4.6-.7 8-4.5 8-9V6z" /><path d="m9 12 2 2 4-4" /></>, p);

export const lessonIcon = { video: IconPlay, quiz: IconQuiz, assignment: IconTool, project: IconFlag };
