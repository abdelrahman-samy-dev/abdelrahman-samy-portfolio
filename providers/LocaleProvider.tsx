"use client";

import { createContext, useContext, useMemo } from "react";
import { dirOf, localePath, type Locale } from "@/lib/i18n";
import { getDictionary, type Dictionary } from "@/lib/dictionaries";

interface LocaleContextType {
  locale: Locale;
  dir: "ltr" | "rtl";
  t: Dictionary;
  /** Public URL of a path in the current locale */
  href: (path?: string) => string;
}

const LocaleContext = createContext<LocaleContextType | null>(null);

export function useLocale() {
  const ctx = useContext(LocaleContext);
  if (!ctx) throw new Error("useLocale must be used inside LocaleProvider");
  return ctx;
}

export default function LocaleProvider({ locale, children }: { locale: Locale; children: React.ReactNode }) {
  const value = useMemo<LocaleContextType>(
    () => ({
      locale,
      dir: dirOf(locale),
      t: getDictionary(locale),
      href: (path = "/") => localePath(locale, path),
    }),
    [locale]
  );
  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}
