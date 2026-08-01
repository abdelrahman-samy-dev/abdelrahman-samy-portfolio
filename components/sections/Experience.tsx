"use client";

import { useRef, useState } from "react";
import { motion } from "motion/react";
import { experiences } from "@/constants/experience";
import type { Experience } from "@/types";
import { ArrowUpRight } from "lucide-react";
import SectionHeader from "@/components/shared/SectionHeader";

function ExperienceRow({ exp, index }: { exp: Experience; index: number }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative border-t py-12 md:py-16 px-8 flex flex-col md:flex-row md:items-start gap-8 md:gap-16 cursor-pointer overflow-hidden"
      style={{ borderColor: "var(--border-subtle)" }}
    >
      {/* Background Hover Reveal Effect */}
      <div
        className="absolute inset-0 -mx-6 md:-mx-12 px-6 md:px-12 pointer-events-none transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] scale-y-0 origin-bottom group-hover:scale-y-100 group-hover:origin-top"
        style={{ background: "rgba(255,255,255,0.02)" }}
      />

      {/* Year */}
      <div className="w-full md:w-1/4 shrink-0 relative z-10">
        <p
          className="text-xs font-mono tracking-widest uppercase transition-colors duration-500"
          style={{ color: isHovered ? "var(--text-primary)" : "var(--text-tertiary)" }}
        >
          {exp.startDate} — {exp.endDate || "Present"}
        </p>
      </div>

      {/* Content */}
      <div className="w-full relative z-10 flex flex-col items-start">
        <h3
          className="text-3xl md:text-5xl font-display font-bold tracking-tighter mb-2 flex items-center gap-4 transition-colors duration-500"
          style={{ color: isHovered ? "var(--accent)" : "var(--text-primary)" }}
        >
          {exp.role}
          <ArrowUpRight
            size={36}
            className="opacity-0 -translate-x-8 translate-y-8 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] hidden md:block"
          />
        </h3>

        <div className="flex items-center gap-3 mb-6">
          <p className="text-lg md:text-xl font-medium tracking-wide" style={{ color: "var(--text-secondary)" }}>
            {exp.company}
          </p>
          <span className="w-1 h-1 rounded-full bg-neutral-600" />
          <p className="text-sm font-mono tracking-widest uppercase" style={{ color: "var(--text-tertiary)" }}>
            {exp.location}
          </p>
        </div>

        {/* Accordion Expand for Achievements */}
        <div
          className="grid transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
          style={{ gridTemplateRows: isHovered ? "1fr" : "0fr" }}
        >
          <div className="overflow-hidden">
            <ul className="flex flex-col gap-4 mb-8 pt-4">
              {exp.achievements.map((ach: string, i: number) => (
                <li key={i} className="text-sm md:text-base leading-relaxed flex items-start gap-4" style={{ color: "var(--text-secondary)" }}>
                  <span
                    className="mt-2 w-1.5 h-1.5 rounded-full shrink-0 transition-colors duration-500"
                    style={{ background: isHovered ? "var(--accent)" : "var(--border-subtle)" }}
                  />
                  {ach}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-2 mt-2">
          {exp.techStack.map((tech: string) => (
            <span
              key={tech}
              className="px-4 py-1.5 text-[10px] font-mono uppercase tracking-widest rounded-full border transition-colors duration-500"
              style={{
                borderColor: isHovered ? "rgba(255,255,255,0.15)" : "var(--border-subtle)",
                color: isHovered ? "var(--text-primary)" : "var(--text-tertiary)",
                background: isHovered ? "rgba(255,255,255,0.03)" : "transparent"
              }}
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

    </motion.div>
  );
}

export default function Experience() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section id="experience" ref={containerRef} className="py-24 md:py-32 relative bg-[var(--bg-primary)]">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">

        <div className="flex flex-col lg:flex-row gap-16 lg:gap-32">

          {/* Sticky Left Column */}
          <div className="w-full lg:w-1/4">
            <div className="sticky top-32">
              <SectionHeader title="Career Path" index="02" />
              <h2 className="text-4xl md:text-6xl font-display font-bold tracking-tighter leading-tight mb-8" style={{ color: "var(--text-primary)" }}>
                Experience
              </h2>

              <p className="text-sm leading-relaxed max-w-sm" style={{ color: "var(--text-secondary)" }}>
                A track record of building performant, scalable, and beautifully crafted web applications for global audiences.
              </p>
            </div>
          </div>

          {/* Scrolling Right Column */}
          <div className="w-full lg:w-3/4 flex flex-col">
            {experiences.map((exp, i) => (
              <ExperienceRow key={exp.id} exp={exp} index={i} />
            ))}
            {/* Final Bottom Border */}
            <div className="border-t w-full" style={{ borderColor: "var(--border-subtle)" }} />
          </div>

        </div>
      </div>
    </section>
  );
}
