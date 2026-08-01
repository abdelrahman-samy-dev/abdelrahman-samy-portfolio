"use client";

import { useCallback, useEffect, useState } from "react";
import { motion } from "motion/react";
import { navItems } from "@/constants/navigation";

export default function Navigation() {
  const [active, setActive] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
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
  }, []);

  const go = useCallback((href: string) => {
    document.getElementById(href.replace("#", ""))?.scrollIntoView({ behavior: "smooth" });
  }, []);

  if (!mounted) return null;

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 1, ease: [0.16, 1, 0.3, 1] }}
      className="fixed bottom-6 md:bottom-8 inset-x-0 z-50 px-4 pointer-events-none hidden md:flex justify-center"
    >
      <nav
        className="pointer-events-auto flex items-center gap-0.5 md:gap-2 rounded-full p-1 md:p-2 max-w-[95vw] overflow-x-auto no-scrollbar"
        style={{
          background: "rgba(18, 18, 22, 0.65)",
          backdropFilter: "blur(24px) saturate(1.5)",
          WebkitBackdropFilter: "blur(24px) saturate(1.5)",
          border: "1px solid rgba(255,255,255,0.08)",
          boxShadow: "0 12px 40px rgba(0,0,0,0.4)",
        }}
      >
        {navItems.map((item) => {
          const isActive = active === item.href;
          return (
            <button
              key={item.href}
              onClick={() => go(item.href)}
              className="group relative px-3 md:px-4 py-2 text-[11px] md:text-[13px] font-medium rounded-full transition-colors whitespace-nowrap"
              style={{ color: isActive ? "var(--text-primary)" : "var(--text-secondary)" }}
            >
              {isActive && (
                <motion.span
                  layoutId="dock-pill"
                  className="absolute inset-0 rounded-full"
                  style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.05)" }}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <span className="relative z-10 group-hover:text-[var(--text-primary)] transition-colors">
                {item.label}
              </span>
            </button>
          );
        })}
      </nav>
    </motion.div>
  );
}
