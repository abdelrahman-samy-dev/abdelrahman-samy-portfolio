"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { ArrowDown } from "lucide-react";

export default function Hero() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section
      ref={ref}
      id="hero"
      className="absolute top-0 inset-x-0 h-screen flex flex-col justify-between z-10 pointer-events-none pb-10 pt-28 px-5 md:px-10 overflow-hidden"
    >
      {/* Top Header / Role */}
      <div className="flex justify-between items-start w-full">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-col gap-1"
        >
          <span className="text-[9px] uppercase tracking-[0.25em]" style={{ color: "var(--text-tertiary)" }}>Role</span>
          <span className="text-[11px] font-medium tracking-widest uppercase" style={{ color: "var(--text-primary)" }}>Creative Developer</span>
          <span className="text-[10px] tracking-widest uppercase mt-1" style={{ color: "var(--text-secondary)" }}>Cairo, EG</span>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-right pointer-events-auto"
        >
          <button
            onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
            className="group flex flex-col items-end gap-1.5 cursor-pointer"
          >
            <span className="text-[9px] uppercase tracking-[0.3em] transition-colors duration-500" style={{ color: "var(--text-tertiary)" }}>
              Status
            </span>
            <span className="text-[11px] font-medium tracking-widest uppercase transition-all duration-500 group-hover:text-white relative" style={{ color: "var(--text-secondary)" }}>
              Accepting New Projects
              <span className="absolute -bottom-1 right-0 w-full h-[1px] bg-white/20 group-hover:bg-white transition-colors duration-500" />
            </span>
          </button>
        </motion.div>
      </div>

      {/* Main Name - Massive Typography */}
      <div className="w-full flex flex-col pointer-events-auto mb-10 md:mb-0">
        <motion.h1
          initial={{ y: 40, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.9, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="font-display font-bold leading-[0.85] tracking-tighter"
          style={{ fontSize: "clamp(3rem, 11vw, 12rem)", color: "var(--text-primary)" }}
        >
          ABDELRAHMAN
        </motion.h1>
        
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mt-4 md:mt-2 gap-8 md:gap-6">
          <motion.h1
            initial={{ y: 40, opacity: 0 }}
            animate={inView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.9, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="order-1 md:order-2 font-display font-bold leading-[0.85] tracking-tighter md:text-right"
            style={{ fontSize: "clamp(3rem, 11vw, 12rem)", color: "var(--text-primary)" }}
          >
            SAMY ALI
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="order-2 md:order-1 flex flex-col gap-5 max-w-[280px]"
          >
            <p className="text-[13px] md:text-[14px] leading-relaxed" style={{ color: "var(--text-secondary)" }}>
              Building performant, accessible, and beautifully crafted web
              experiences with React, Next.js &amp; TypeScript.
            </p>
            <button
              onClick={() => document.getElementById("work")?.scrollIntoView({ behavior: "smooth" })}
              className="w-fit text-[11px] font-mono tracking-widest uppercase transition-colors hover:text-[var(--text-primary)]"
              style={{ color: "var(--accent)" }}
            >
              [ View Selected Work ]
            </button>
          </motion.div>
        </div>
      </div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: 1.2, duration: 0.5 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5"
      >
        <ArrowDown size={14} className="animate-bounce" style={{ color: "var(--text-tertiary)" }} />
      </motion.div>
    </section>
  );
}
