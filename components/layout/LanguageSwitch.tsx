"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Languages } from "lucide-react";
import { localePath } from "@/lib/i18n";
import { useLocale } from "@/providers/LocaleProvider";
import { useTheme } from "@/hooks/useTheme";
import SkyToggle from "@/components/ui/sky-toggle";

/** Path of the current page without its locale prefix ("/ar/work/x" → "/work/x") */
export function stripLocale(pathname: string) {
  const stripped = pathname.replace(/^\/(ar|en)(?=\/|$)/, "");
  return stripped === "" ? "/" : stripped;
}

/** Top-end controls: day/night sky toggle + language switch */
export default function LanguageSwitch() {
  const pathname = usePathname();
  const { locale, t } = useLocale();
  const { theme, setTheme } = useTheme();
  const other = locale === "ar" ? "en" : "ar";

  return (
    <div className="fixed top-5 end-5 md:top-6 md:end-8 z-[70] flex items-center gap-2.5">
    <SkyToggle
      checked={theme === "dark"}
      onChange={(dark) => setTheme(dark ? "dark" : "light")}
      label={t.themeLabel}
      className="drop-shadow-[0_6px_16px_rgba(0,0,0,0.25)]"
    />
    <Link
      href={localePath(other, stripLocale(pathname))}
      hrefLang={other}
      lang={other}
      title={t.switchLanguageLabel}
      className="flex items-center gap-2 h-10 px-4 rounded-full text-[13px] font-medium transition-colors duration-300 hover:text-[var(--text-primary)] hover:border-[var(--accent-border)]"
      style={{
        color: "var(--text-secondary)",
        background: "var(--glass-bg)",
        border: "1px solid var(--border)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        // The one Arabic word on English pages uses the system Arabic face, so no Arabic web font downloads there
        fontFamily: other === "ar" ? "system-ui, 'Segoe UI', Tahoma, sans-serif" : "var(--font-inter), sans-serif",
      }}
    >
      <Languages size={15} style={{ color: "var(--accent)" }} />
      {t.switchLanguage}
    </Link>
    </div>
  );
}
