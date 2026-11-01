"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Languages } from "lucide-react";
import { localePath } from "@/lib/i18n";
import { useLocale } from "@/providers/LocaleProvider";

/** Path of the current page without its locale prefix ("/ar/work/x" → "/work/x") */
export function stripLocale(pathname: string) {
  const stripped = pathname.replace(/^\/(ar|en)(?=\/|$)/, "");
  return stripped === "" ? "/" : stripped;
}

export default function LanguageSwitch() {
  const pathname = usePathname();
  const { locale, t } = useLocale();
  const other = locale === "ar" ? "en" : "ar";

  return (
    <Link
      href={localePath(other, stripLocale(pathname))}
      hrefLang={other}
      lang={other}
      aria-label={t.switchLanguageLabel}
      className="fixed top-5 end-5 md:top-6 md:end-8 z-[70] flex items-center gap-2 h-10 px-4 rounded-full text-[13px] font-medium transition-colors duration-300 hover:text-[var(--text-primary)] hover:border-[var(--accent-border)]"
      style={{
        color: "var(--text-secondary)",
        background: "rgba(16,16,16,0.7)",
        border: "1px solid var(--border)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        fontFamily: other === "ar" ? "var(--font-alexandria), sans-serif" : "var(--font-inter), sans-serif",
      }}
    >
      <Languages size={15} style={{ color: "var(--accent)" }} />
      {t.switchLanguage}
    </Link>
  );
}
