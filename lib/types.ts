export type Lang = "en" | "kz" | "ru";
export const LANGS: Lang[] = ["en", "kz", "ru"];

/** A string translated into every interface language. */
export type L = Record<Lang, string>;

export type Category = "robotics" | "cad" | "programming" | "ftc";
export type Level = "beginner" | "intermediate";
export type LessonType = "video" | "quiz" | "assignment" | "project";

export interface QuizQuestion {
  q: L;
  options: L[];
  answer: number;
}

export interface Resource {
  label: L;
  url: string;
  /** Short source name shown next to the link, e.g. "goBILDA". */
  source?: string;
}

export interface Lesson {
  id: string;
  type: LessonType;
  title: L;
  description: L;
  /** Minutes. */
  duration: number;
  /**
   * Embed URL for the recorded lesson (YouTube / Vimeo / Bunny / Supabase Storage).
   * Leave undefined to show the "video not uploaded yet" placeholder.
   * Example: "https://www.youtube-nocookie.com/embed/VIDEO_ID"
   */
  videoUrl?: string;
  /** Language the video is recorded in (videos may exist in one language only). */
  videoLang?: Lang;
  /** Who made the video, when it isn't ours (e.g. "goBILDA", "REV Robotics"). Shown under the player. */
  videoCredit?: string;
  /** Links to build guides, CAD, example code and other free materials. */
  resources?: Resource[];
  notes?: L[];
  quiz?: QuizQuestion[];
  /** Free preview — visible without enrolment. */
  preview?: boolean;
}

export interface Module {
  id: string;
  title: L;
  lessons: Lesson[];
}

export interface Course {
  slug: string;
  category: Category;
  levels: Level[];
  /** Estimated total hours. */
  hours: number;
  /** Languages the course materials are actually available in. */
  languages: Lang[];
  mentorId: string;
  title: L;
  short: L;
  description: L;
  outcomes: L[];
  modules: Module[];
  /** Decorative motif used to draw the course thumbnail. */
  motif: "gear" | "cube" | "code" | "trophy";
  /** True while the course uses sample (non-final) content. */
  sample: boolean;
}

export interface Mentor {
  id: string;
  name: string;
  initials: string;
  role: L;
  bio: L;
  experience: L[];
  sample: boolean;
}
