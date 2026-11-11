"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "motion/react";
import SectionHeader from "@/components/shared/SectionHeader";
import { useLocale } from "@/providers/LocaleProvider";

function Word({ children, progress, range }: { children: React.ReactNode; progress: MotionValue<number>; range: [number, number] }) {
  const opacity = useTransform(progress, range, [0.5, 1]);
  const y = useTransform(progress, range, [10, 0]);
  return (
    <motion.span style={{ opacity, y }} className="inline-block">
      {children}
    </motion.span>
  );
}

const cardStyle = { background: "var(--surface)", border: "1px solid var(--border-subtle)" };

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { t } = useLocale();
  const a = t.about;
  const words = a.text.split(" ");

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 75%", "end 50%"],
  });

  return (
    <section id="about" className="relative bg-[var(--bg-primary)] overflow-hidden pb-24 md:pb-32">
      {/* Massive Scrubbed Text Sequence */}
      <div ref={containerRef} className="max-w-[1400px] mx-auto px-6 md:px-12 pt-28 md:pt-48 pb-16 md:pb-20">
        <SectionHeader title={a.eyebrow} />

        <h2 className="text-[1.75rem] sm:text-4xl md:text-5xl lg:text-[5rem] font-display font-bold tracking-tighter leading-[1.15] md:leading-[1.05] flex flex-wrap gap-x-2 md:gap-x-4 lg:gap-x-5 gap-y-1 md:gap-y-3">
          {words.map((word, i) => {
            const start = i / words.length;
            const end = start + 1 / words.length;
            return (
              <Word key={i} progress={scrollYProgress} range={[start, end]}>
                {word}
              </Word>
            );
          })}
        </h2>
      </div>

      {/* Asymmetric Stats Bento */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 mt-8 md:mt-24">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6">

          {/* Technical Arsenal Box */}
          <div
            className="md:col-span-7 lg:col-span-8 rounded-[var(--radius-xl)] p-8 md:p-14 flex flex-col justify-between group relative overflow-hidden transition-colors duration-700"
            style={{
              background: "linear-gradient(180deg, rgb(var(--ink-rgb) / 0.03) 0%, rgb(var(--ink-rgb) / 0.01) 100%)",
              border: "1px solid var(--border-subtle)",
              boxShadow: "inset 0 1px 1px rgb(var(--ink-rgb) / 0.05)"
            }}
            onMouseMove={(e) => {
              const r = e.currentTarget.getBoundingClientRect();
              e.currentTarget.style.setProperty("--mouse-x", `${e.clientX - r.left}px`);
              e.currentTarget.style.setProperty("--mouse-y", `${e.clientY - r.top}px`);
            }}
          >
            {/* Subtle Hover Glow — follows the pointer */}
            <div className="absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" style={{ background: "radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgb(var(--accent-rgb) / 0.1), transparent 40%)" }} />

            <p className="text-[10px] font-mono tracking-widest uppercase mb-12 md:mb-16 relative z-10 flex items-center gap-3" style={{ color: "var(--text-tertiary)" }}>
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--accent)" }} />
              {a.competencies}
            </p>

            <div className="relative z-10">
              <h3 className="text-3xl md:text-5xl font-display font-bold tracking-tight mb-8 leading-[1.1]" style={{ color: "var(--text-primary)" }}>
                {a.headline[0]}<br />{a.headline[1]}
              </h3>

              <div className="flex flex-wrap gap-2">
                {a.pills.map((tech) => (
                  <span
                    key={tech}
                    className="px-4 py-2 text-[11px] font-medium tracking-wide rounded-full border transition-colors duration-500 hover:border-[var(--accent)] hover:text-[var(--text-primary)]"
                    style={{ borderColor: "var(--border-subtle)", color: "var(--text-secondary)", background: "rgb(var(--ink-rgb) / 0.01)" }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Vertical Stats Column */}
          <div className="md:col-span-5 lg:col-span-4 grid grid-cols-2 md:grid-cols-1 gap-4 md:gap-6">

            {/* Experience Card */}
            <div
              className="rounded-[var(--radius-xl)] p-6 md:p-10 flex flex-col justify-center relative overflow-hidden group"
              style={cardStyle}
            >
              <div className="absolute top-0 end-0 p-6 md:p-8 opacity-20 hidden sm:block">
                <div className="w-16 h-16 rounded-full border border-dashed animate-spin-slow" style={{ borderColor: "var(--text-tertiary)" }} />
              </div>
              <p className="text-[10px] font-mono tracking-widest uppercase mb-4" style={{ color: "var(--text-tertiary)" }}>{a.yearsLabel}</p>
              <div className="font-display font-bold tracking-tighter flex items-start" style={{ fontSize: "clamp(3rem, 8vw, 6rem)", lineHeight: 0.9, color: "var(--accent)" }}>
                03<span className="text-2xl md:text-5xl mt-1 md:mt-2 ms-1">+</span>
              </div>
              <p className="text-xs md:text-sm font-medium tracking-wide mt-4" style={{ color: "var(--text-secondary)" }}>{a.years}</p>
            </div>

            {/* Products Card */}
            <div
              className="rounded-[var(--radius-xl)] p-6 md:p-10 flex flex-col justify-center relative overflow-hidden"
              style={cardStyle}
            >
              <p className="text-[10px] font-mono tracking-widest uppercase mb-4" style={{ color: "var(--text-tertiary)" }}>{a.productsLabel}</p>
              <div className="font-display font-bold tracking-tighter flex items-start" style={{ fontSize: "clamp(3rem, 8vw, 6rem)", lineHeight: 0.9, color: "var(--text-primary)" }}>
                02
              </div>
              <p className="text-xs md:text-sm font-medium tracking-wide mt-4" style={{ color: "var(--text-secondary)" }}>{a.products}</p>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
