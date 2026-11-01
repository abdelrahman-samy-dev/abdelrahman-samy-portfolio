"use client";

import { useCallback, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { motion } from "motion/react";
import { navItems } from "@/constants/navigation";
import { useLocale } from "@/providers/LocaleProvider";
import { stripLocale } from "@/components/layout/LanguageSwitch";

const labelKey: Record<string, keyof ReturnType<typeof useLocale>["t"]["nav"]> = {
  "#about": "about",
  "#experience": "experience",
  "#work": "work",
  "#tech-stack": "tech",
  "#contact": "contact",
};

export default function Navigation() {
  const [active, setActive] = useState("");
  const [mounted, setMounted] = useState(false);
  const { t, href } = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const onHome = stripLocale(pathname) === "/";

  useEffect(() => {
    setMounted(true);
    if (!onHome) return;
    const observers: IntersectionObserver[] = [];

    // We observe sections to highlight the active dock item
    navItems.forEach((item) => {
      const el = document.getElementById(item.href.replace("#", ""));
      if (!el) return;
      const obs = new IntersectionObserver(
        ([e]) => { if (e.isIntersecting) setActive(item.href); },
        { rootMargin: "-40% 0px -60% 0px" }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, [onHome]);

  const go = useCallback((hash: string) => {
    if (!onHome) {
      router.push(`${href("/")}${hash}`);
      return;
    }
    document.getElementById(hash.replace("#", ""))?.scrollIntoView({ behavior: "smooth" });
  }, [onHome, router, href]);

  if (!mounted) return null;

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 1, ease: [0.16, 1, 0.3, 1] }}
      className="fixed bottom-4 md:bottom-8 inset-x-0 z-50 px-3 pointer-events-none flex justify-center"
    >
      <nav
        aria-label="Primary"
        className="pointer-events-auto flex items-center gap-0.5 md:gap-2 rounded-full p-1 md:p-2 max-w-full overflow-x-auto no-scrollbar"
        style={{
          background: "rgba(16, 16, 16, 0.72)",
          backdropFilter: "blur(24px) saturate(1.4)",
          WebkitBackdropFilter: "blur(24px) saturate(1.4)",
          border: "1px solid rgba(255,255,255,0.08)",
          boxShadow: "0 12px 40px rgba(0,0,0,0.45)",
        }}
      >
        {navItems.map((item) => {
          const isActive = active === item.href;
          return (
            <button
              key={item.href}
              onClick={() => go(item.href)}
              aria-current={isActive ? "true" : undefined}
              className="group relative px-2.5 md:px-4 py-2 text-[12px] md:text-[13px] font-medium rounded-full transition-colors whitespace-nowrap"
              style={{ color: isActive ? "var(--text-primary)" : "var(--text-secondary)" }}
            >
              {isActive && (
                <motion.span
                  layoutId="dock-pill"
                  className="absolute inset-0 rounded-full"
                  style={{ background: "rgb(var(--accent-rgb) / 0.14)", border: "1px solid var(--accent-border)" }}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <span className="relative z-10 group-hover:text-[var(--text-primary)] transition-colors">
                {t.nav[labelKey[item.href]]}
              </span>
            </button>
          );
        })}
      </nav>
    </motion.div>
  );
}
