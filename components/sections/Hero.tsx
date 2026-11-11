"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { ArrowDown } from "lucide-react";
import { useLocale } from "@/providers/LocaleProvider";
import { profile } from "@/constants/profile";

const nameStyle = { fontSize: "clamp(3rem, 11vw, 12rem)", color: "var(--text-primary)" };

export default function Hero() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const { t } = useLocale();
  const h = t.hero;

  return (
    <section
      ref={ref}
      id="hero"
      className="absolute top-0 inset-x-0 h-svh flex flex-col justify-between z-10 pointer-events-none pb-10 md:pb-12 pt-24 md:pt-28 px-5 md:px-10 overflow-hidden"
    >
      {/* Top Header / Role */}
      <div className="flex justify-between items-start w-full gap-6">
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-col gap-1"
        >
          <span className="text-[9px] uppercase tracking-[0.25em]" style={{ color: "var(--text-tertiary)" }}>{h.roleLabel}</span>
          <span className="text-[11px] font-medium tracking-widest uppercase" style={{ color: "var(--text-primary)" }}>{h.role}</span>
          <span className="text-[10px] tracking-widest uppercase" style={{ color: "var(--text-secondary)" }}>{h.focus}</span>
          <span className="text-[10px] tracking-widest uppercase mt-1" style={{ color: "var(--text-secondary)" }}>{h.location}</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-end pointer-events-auto"
        >
          <button
            onClick={() => document.getElementById("work")?.scrollIntoView({ behavior: "smooth" })}
            className="group flex flex-col items-end gap-1.5 cursor-pointer"
          >
            <span className="flex items-center gap-2 text-[9px] uppercase tracking-[0.3em] transition-colors duration-500" style={{ color: "var(--text-tertiary)" }}>
              <span className="relative flex w-1.5 h-1.5">
                <span className="absolute inline-flex h-full w-full rounded-full animate-ping opacity-60" style={{ background: "var(--accent)" }} />
                <span className="relative inline-flex w-1.5 h-1.5 rounded-full" style={{ background: "var(--accent)" }} />
              </span>
              {h.nowLabel}
            </span>
            <span className="text-[11px] font-medium tracking-widest uppercase transition-colors duration-500 group-hover:text-[var(--text-primary)] relative" style={{ color: "var(--text-secondary)" }}>
              {h.now}
              <span className="absolute -bottom-1 end-0 w-full h-[1px] bg-[rgb(var(--ink-rgb)/0.2)] group-hover:bg-[var(--accent)] transition-colors duration-500" />
            </span>
          </button>
        </motion.div>
      </div>

      {/* Main Name - Massive Typography */}
      <div className="w-full flex flex-col pointer-events-auto">
        <motion.h1
          initial={{ y: 40 }}
          animate={inView ? { y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="font-display font-bold leading-[0.85] tracking-tighter"
          style={nameStyle}
        >
          {h.firstName}
        </motion.h1>

        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mt-4 md:mt-2 gap-6 md:gap-6">
          <motion.p
            initial={{ y: 40 }}
            animate={inView ? { y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="order-1 md:order-2 font-display font-bold leading-[0.85] tracking-tighter md:text-end"
            style={nameStyle}
            aria-hidden="true"
          >
            {h.lastName}
          </motion.p>

          <motion.div
            initial={{ y: 16 }}
            animate={inView ? { y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="order-2 md:order-1 flex flex-col gap-5 max-w-[300px]"
          >
            <p className="text-[13px] md:text-[14px] leading-relaxed" style={{ color: "var(--text-secondary)" }}>
              {h.intro}
            </p>
            <div className="flex flex-wrap gap-x-6 gap-y-3">
              <button
                onClick={() => document.getElementById("work")?.scrollIntoView({ behavior: "smooth" })}
                className="w-fit text-[11px] font-mono tracking-widest uppercase transition-colors hover:text-[var(--text-primary)]"
                style={{ color: "var(--accent)" }}
              >
                {h.viewWork}
              </button>
              <a
                href={profile.cv.visual}
                target="_blank"
                rel="noopener noreferrer"
                className="w-fit text-[11px] font-mono tracking-widest uppercase transition-colors hover:text-[var(--accent)]"
                style={{ color: "var(--text-secondary)" }}
              >
                {h.downloadCv}
              </a>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: 1.2, duration: 0.5 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-1.5"
      >
        <ArrowDown size={14} className="animate-bounce" style={{ color: "var(--text-tertiary)" }} />
      </motion.div>
    </section>
  );
}
