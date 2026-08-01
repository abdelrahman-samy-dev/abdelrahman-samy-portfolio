"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "motion/react";
import SectionHeader from "@/components/shared/SectionHeader";

const ABOUT_TEXT =
  "I am Abdelrahman, a Frontend Developer obsessed with crafting digital experiences that feel alive. I don't just build websites; I engineer interactive journeys. By blending clean architecture with cutting-edge motion design, I transform complex problems into intuitive, high-performance interfaces that leave a lasting impression.".split(" ");

function Word({ children, progress, range }: { children: React.ReactNode; progress: MotionValue<number>; range: [number, number] }) {
  const opacity = useTransform(progress, range, [0.15, 1]);
  const y = useTransform(progress, range, [10, 0]);
  return (
    <motion.span style={{ opacity, y }} className="inline-block">
      {children}
    </motion.span>
  );
}

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 75%", "end 50%"],
  });

  return (
    <section id="about" className="relative bg-[var(--bg-primary)] overflow-hidden pb-32">
      {/* Massive Scrubbed Text Sequence */}
      <div ref={containerRef} className="max-w-[1400px] mx-auto px-6 md:px-12 pt-32 md:pt-48 pb-20">
        <SectionHeader title="The Philosophy" />
        
        <h2 className="text-3xl md:text-5xl lg:text-[5.5rem] font-display font-bold tracking-tighter leading-[1.1] md:leading-[1.05] flex flex-wrap gap-x-2 md:gap-x-4 lg:gap-x-6 gap-y-2 md:gap-y-4">
          {ABOUT_TEXT.map((word, i) => {
            const start = i / ABOUT_TEXT.length;
            const end = start + 1 / ABOUT_TEXT.length;
            return (
              <Word key={i} progress={scrollYProgress} range={[start, end]}>
                {word}
              </Word>
            );
          })}
        </h2>
      </div>

      {/* Asymmetric Stats Bento */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 mt-16 md:mt-32">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6">
          
          {/* Technical Arsenal Box */}
          <div 
            className="md:col-span-7 lg:col-span-8 rounded-[2rem] p-10 md:p-14 flex flex-col justify-between group relative overflow-hidden transition-colors duration-700" 
            style={{ 
              background: "linear-gradient(180deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)", 
              border: "1px solid var(--border-subtle)",
              boxShadow: "inset 0 1px 1px rgba(255,255,255,0.05)"
            }}
          >
            {/* Subtle Hover Glow */}
            <div className="absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" style={{ background: "radial-gradient(800px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(255,51,51,0.08), transparent 40%)" }} />
            
            <p className="text-[10px] font-mono tracking-widest uppercase mb-16 relative z-10 flex items-center gap-3" style={{ color: "var(--text-tertiary)" }}>
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--accent)" }} />
              Core Competencies
            </p>
            
            <div className="relative z-10">
              <h3 className="text-3xl md:text-5xl font-display font-bold tracking-tight mb-8 leading-[1.1]" style={{ color: "var(--text-primary)" }}>
                React.js, Next.js,<br />TypeScript & GSAP.
              </h3>
              
              <div className="flex flex-wrap gap-2">
                {["SSR / ISR", "TanStack Query", "Redux", "Zustand", "WebGL", "Figma to Code"].map((tech) => (
                  <span 
                    key={tech} 
                    className="px-4 py-2 text-[11px] font-medium tracking-wide rounded-full border transition-colors duration-500 hover:border-[var(--accent)] hover:text-[var(--text-primary)]" 
                    style={{ borderColor: "var(--border-subtle)", color: "var(--text-secondary)", background: "rgba(255,255,255,0.01)" }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Vertical Stats Column */}
          <div className="md:col-span-5 lg:col-span-4 flex flex-col gap-4 md:gap-6">
            
            {/* Experience Card */}
            <div 
              className="flex-1 rounded-[2rem] p-10 flex flex-col justify-center relative overflow-hidden group" 
              style={{ background: "rgba(255,255,255,0.02)", border: "1px solid var(--border-subtle)" }}
            >
              <div className="absolute top-0 right-0 p-8 opacity-20">
                <div className="w-16 h-16 rounded-full border border-dashed animate-spin-slow" style={{ borderColor: "var(--text-tertiary)" }} />
              </div>
              <p className="text-[10px] font-mono tracking-widest uppercase mb-4" style={{ color: "var(--text-tertiary)" }}>Experience</p>
              <div className="font-display font-bold tracking-tighter flex items-start" style={{ fontSize: "clamp(4rem, 8vw, 6rem)", lineHeight: 0.9, color: "var(--accent)" }}>
                02<span className="text-3xl md:text-5xl mt-2 ml-1">+</span>
              </div>
              <p className="text-sm font-medium tracking-wide mt-4" style={{ color: "var(--text-secondary)" }}>Years shaping the web.</p>
            </div>

            {/* Impact Card */}
            <div 
              className="flex-1 rounded-[2rem] p-10 flex flex-col justify-center relative overflow-hidden" 
              style={{ background: "rgba(255,255,255,0.02)", border: "1px solid var(--border-subtle)" }}
            >
              <p className="text-[10px] font-mono tracking-widest uppercase mb-4" style={{ color: "var(--text-tertiary)" }}>Impact</p>
              <div className="font-display font-bold tracking-tighter flex items-start" style={{ fontSize: "clamp(4rem, 8vw, 6rem)", lineHeight: 0.9, color: "var(--text-primary)" }}>
                1K<span className="text-3xl md:text-5xl mt-2 ml-1" style={{ color: "var(--accent)" }}>+</span>
              </div>
              <p className="text-sm font-medium tracking-wide mt-4" style={{ color: "var(--text-secondary)" }}>Active users served.</p>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
