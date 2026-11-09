import type { L } from "../types";

/** Shorthand for a translated string: l(english, kazakh, russian). */
export const l = (en: string, kz: string, ru: string): L => ({ en, kz, ru });
