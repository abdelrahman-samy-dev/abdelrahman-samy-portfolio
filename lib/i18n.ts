export const locales = ["en", "ar"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

export const dirOf = (locale: Locale) => (locale === "ar" ? "rtl" : "ltr");

/**
 * Public URL for a path in a locale. English lives at the root ("/", "/work/x" —
 * rewritten to /en internally, see next.config.ts); Arabic lives under "/ar".
 */
export function localePath(locale: Locale, path = "/"): string {
  if (locale === defaultLocale) return path;
  return path === "/" ? `/${locale}` : `/${locale}${path}`;
}
