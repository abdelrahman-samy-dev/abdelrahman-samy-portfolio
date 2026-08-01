"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { skills } from "@/constants/skills";
import type { Skill } from "@/types";

function SkillCard({ skill }: { skill: Skill }) {
  return (
    <div className="skillCard">
      <div className="skillLogo">
        <img
          src={skill.logo}
          alt={skill.name}
          width={32}
          height={32}
          className="skillImage"
          loading="lazy"
          style={{ filter: skill.invert ? "invert(1) brightness(2)" : "none" }}
        />
      </div>
      <span className="skillName">{skill.name}</span>
    </div>
  );
}

export default function TechStack() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });

  const half = Math.ceil(skills.length / 2);
  const row1 = skills.slice(0, half);
  const row2 = skills.slice(half);

  return (
    <section id="tech-stack" ref={ref} className="py-28 md:py-36 overflow-hidden">
      <div className="max-w-[1100px] mx-auto px-6 md:px-10 mb-16">
        <motion.p
          initial={{ y: 12, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
          className="text-[11px] font-medium tracking-[0.15em] uppercase mb-6"
          style={{ color: "var(--text-tertiary)" }}
        >
          05 / TECH STACK
        </motion.p>
        <motion.h2
          initial={{ y: 16, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.05 }}
          className="text-5xl md:text-7xl font-display font-bold tracking-tighter leading-[0.95] mb-6"
          style={{ color: "var(--text-primary)" }}
        >
          My Tech Arsenal
        </motion.h2>
        <motion.p
          initial={{ y: 12, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-base leading-relaxed max-w-xl"
          style={{ color: "var(--text-secondary)" }}
        >
          The core technologies and tools I rely on to ship fast, scalable, and visually polished web experiences.
        </motion.p>
      </div>

      {/* Marquee Row 1 — scrolls left */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="marqueeWrapper"
      >
        <div className="marqueeTrack">
          {[...row1, ...row1, ...row1].map((skill, i) => (
            <SkillCard key={`r1-${i}`} skill={skill} />
          ))}
        </div>
      </motion.div>

      {/* Marquee Row 2 — scrolls right */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.35 }}
        className="marqueeWrapper"
        style={{ marginTop: "1.25rem" }}
      >
        <div className="marqueeTrack reverse">
          {[...row2, ...row2, ...row2].map((skill, i) => (
            <SkillCard key={`r2-${i}`} skill={skill} />
          ))}
        </div>
      </motion.div>
    </section>
  );
}
