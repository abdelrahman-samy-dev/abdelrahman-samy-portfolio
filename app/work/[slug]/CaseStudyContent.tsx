"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { ArrowLeft, FolderGit2, ExternalLink } from "lucide-react";
import Link from "next/link";
import MagneticButton from "@/components/shared/MagneticButton";
import type { Project } from "@/types";

interface CaseStudyContentProps {
  project: Project;
}

export default function CaseStudyContent({ project }: CaseStudyContentProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });

  const sections = [
    { title: "Overview", content: project.overview },
    { title: "The Challenge", content: project.challenge },
    { title: "The Solution", content: project.solution },
    { title: "Architecture", content: project.architecture },
  ];

  return (
    <div ref={ref} className="min-h-screen pt-32 pb-20">
      <div className="max-w-3xl mx-auto px-5 md:px-8">
        {/* Back */}
        <Link
          href="/#work"
          className="inline-flex items-center gap-2 text-sm transition-colors mb-12 group"
          style={{ color: "var(--text-tertiary)" }}
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          Back to Selected Work
        </Link>

        {/* Header */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <span className="text-xs font-medium tracking-[0.1em] uppercase mb-4 block" style={{ color: "var(--accent)" }}>
            Case Study · {project.year}
          </span>
          <h1 className="font-bold tracking-tight mb-4" style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", color: "var(--text-primary)" }}>
            {project.title}
          </h1>
          <p className="text-base md:text-lg leading-relaxed" style={{ color: "var(--text-secondary)" }}>
            {project.description}
          </p>

          <div className="flex items-center gap-4 mt-6">
            {project.github && (
              <MagneticButton href={project.github} variant="secondary" size="sm" external>
                <FolderGit2 size={16} /> Source Code
              </MagneticButton>
            )}
            {project.liveUrl && (
              <MagneticButton href={project.liveUrl} variant="primary" size="sm" external>
                <ExternalLink size={16} /> Live Demo
              </MagneticButton>
            )}
          </div>
        </motion.div>

        {/* Tech Stack */}
        <motion.div
          initial={{ y: 15, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="mb-14"
        >
          <h2 className="text-xs font-medium tracking-[0.1em] uppercase mb-4" style={{ color: "var(--text-tertiary)" }}>Tech Stack</h2>
          <div className="flex flex-wrap gap-2">
            {project.techStack.map((tech) => (
              <span key={tech} className="px-3 py-1.5 text-sm rounded-lg font-medium" style={{ background: "var(--accent-subtle)", color: "var(--accent)", border: "1px solid rgba(108,138,236,0.1)" }}>
                {tech}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Sections */}
        {sections.map((section, i) => (
          <motion.div
            key={section.title}
            initial={{ y: 20, opacity: 0 }}
            animate={inView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.15 + i * 0.08 }}
            className="mb-12"
          >
            <h2 className="text-xl md:text-2xl font-semibold mb-4" style={{ color: "var(--text-primary)" }}>
              {section.title}
            </h2>
            <p className="text-[15px] leading-relaxed" style={{ color: "var(--text-secondary)" }}>
              {section.content}
            </p>
          </motion.div>
        ))}

        {/* Performance */}
        {project.performance.length > 0 && (
          <motion.div initial={{ y: 15, opacity: 0 }} animate={inView ? { y: 0, opacity: 1 } : {}} transition={{ duration: 0.4, delay: 0.5 }} className="mb-12">
            <h2 className="text-xl font-semibold mb-4" style={{ color: "var(--text-primary)" }}>Performance</h2>
            <ul className="space-y-3">
              {project.performance.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-[15px]" style={{ color: "var(--text-secondary)" }}>
                  <span style={{ color: "var(--success)" }} className="mt-0.5 shrink-0">✓</span>{item}
                </li>
              ))}
            </ul>
          </motion.div>
        )}

        {/* Engineering Decisions */}
        {project.engineeringDecisions.length > 0 && (
          <motion.div initial={{ y: 15, opacity: 0 }} animate={inView ? { y: 0, opacity: 1 } : {}} transition={{ duration: 0.4, delay: 0.55 }} className="mb-12">
            <h2 className="text-xl font-semibold mb-4" style={{ color: "var(--text-primary)" }}>Engineering Decisions</h2>
            <ul className="space-y-3">
              {project.engineeringDecisions.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-[15px]" style={{ color: "var(--text-secondary)" }}>
                  <span style={{ color: "var(--accent)" }} className="mt-0.5 shrink-0">▸</span>{item}
                </li>
              ))}
            </ul>
          </motion.div>
        )}

        {/* Lessons */}
        {project.lessonsLearned.length > 0 && (
          <motion.div initial={{ y: 15, opacity: 0 }} animate={inView ? { y: 0, opacity: 1 } : {}} transition={{ duration: 0.4, delay: 0.6 }} className="mb-12">
            <h2 className="text-xl font-semibold mb-4" style={{ color: "var(--text-primary)" }}>Lessons Learned</h2>
            <ul className="space-y-3">
              {project.lessonsLearned.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-[15px]" style={{ color: "var(--text-secondary)" }}>
                  <span style={{ color: "var(--accent-secondary)" }} className="mt-0.5 shrink-0">◆</span>{item}
                </li>
              ))}
            </ul>
          </motion.div>
        )}

        {/* Bottom CTA */}
        <div className="pt-12 text-center" style={{ borderTop: "1px solid var(--border-subtle)" }}>
          <p className="text-sm mb-6" style={{ color: "var(--text-secondary)" }}>Interested in working together?</p>
          <MagneticButton variant="primary" size="lg" href="/#contact">Get in Touch</MagneticButton>
        </div>
      </div>
    </div>
  );
}
