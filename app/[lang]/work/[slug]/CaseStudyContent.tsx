"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { ArrowLeft, FolderGit2, ExternalLink } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import MagneticButton from "@/components/shared/MagneticButton";
import type { Project } from "@/types";
import { useLocale } from "@/providers/LocaleProvider";
import PhoneMockup from "@/components/shared/PhoneMockup";

interface CaseStudyContentProps {
  project: Project;
}

export default function CaseStudyContent({ project }: CaseStudyContentProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });
  const { t, href } = useLocale();
  const c = t.caseStudy;

  const sections = [
    { title: c.overview, content: project.overview },
    { title: c.challenge, content: project.challenge },
    { title: c.solution, content: project.solution },
    { title: c.architecture, content: project.architecture },
  ];

  return (
    <div ref={ref} className="min-h-screen pt-32 pb-20">
      <div className="max-w-3xl mx-auto px-5 md:px-8">
        {/* Back */}
        <Link
          href={`${href("/")}#work`}
          className="inline-flex items-center gap-2 text-sm transition-colors mb-12 group"
          style={{ color: "var(--text-tertiary)" }}
        >
          <ArrowLeft size={16} className="flip-rtl group-hover:-translate-x-1 rtl:group-hover:translate-x-1 transition-transform" />
          {c.back}
        </Link>

        {/* Header */}
        <motion.div
          initial={{ y: 20 }}
          animate={inView ? { y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <span className="text-xs font-medium tracking-[0.1em] uppercase mb-4 block" style={{ color: "var(--accent)" }}>
            {c.label} · {project.year}
            {project.status === "in-development" && ` · ${c.inDevelopment}`}
          </span>
          <h1 className="font-bold tracking-tight mb-4" style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", color: "var(--text-primary)" }}>
            {project.title}
          </h1>
          <p className="text-base md:text-lg leading-relaxed" style={{ color: "var(--text-secondary)" }}>
            {project.description}
          </p>
          {project.role && (
            <p className="text-sm mt-4" style={{ color: "var(--text-tertiary)" }}>
              <span style={{ color: "var(--text-secondary)" }}>{c.myRole}</span> {project.role}
            </p>
          )}

          <div className="flex flex-wrap items-center gap-4 mt-6">
            {project.github && (
              <MagneticButton href={project.github} variant="secondary" size="sm" external>
                <FolderGit2 size={16} /> {c.source}
              </MagneticButton>
            )}
            {project.liveUrl && (
              <MagneticButton href={project.liveUrl} variant="primary" size="sm" external>
                <ExternalLink size={16} /> {c.live}
              </MagneticButton>
            )}
          </div>
        </motion.div>

        {/* Screenshot */}
        <motion.div
          initial={{ y: 15 }}
          animate={inView ? { y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.05 }}
          className={`relative w-full rounded-2xl mb-14 ${project.mobileShot ? "mb-20" : ""}`}
          style={{ aspectRatio: "16/10", border: "1px solid var(--border-subtle)", background: "rgb(var(--ink-rgb) / 0.02)" }}
        >
          <div className="absolute inset-0 rounded-2xl overflow-hidden">
            <Image
              src={project.thumbnail}
              alt={`${project.title} — ${t.work.screenshot}`}
              fill
              loading="eager"
              fetchPriority="high"
              className={`object-cover object-top ${project.thumbnailLight ? "theme-dark-only" : ""}`}
              sizes="(max-width: 768px) 100vw, 768px"
            />
            {project.thumbnailLight && (
              <Image
                src={project.thumbnailLight}
                alt={`${project.title} — ${t.work.screenshot}`}
                fill
                className="theme-light-only object-cover object-top"
                sizes="(max-width: 768px) 100vw, 768px"
              />
            )}
          </div>
          {project.mobileShot && (
            <PhoneMockup
              src={project.mobileShot}
              alt={`${project.title} — ${t.work.mobileScreenshot}`}
              className="absolute -bottom-12 end-3 md:end-[-28px] w-[24%] max-w-[170px]"
            />
          )}
        </motion.div>

        {/* Tech Stack */}
        <motion.div
          initial={{ y: 15, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="mb-14"
        >
          <h2 className="text-xs font-medium tracking-[0.1em] uppercase mb-4" style={{ color: "var(--text-tertiary)" }}>{c.stack}</h2>
          <div className="flex flex-wrap gap-2">
            {project.techStack.map((tech) => (
              <span key={tech} className="px-3 py-1.5 text-sm rounded-lg font-medium" style={{ background: "var(--accent-subtle)", color: "var(--accent)", border: "1px solid var(--accent-border)" }}>
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
            <h2 className="text-xl font-semibold mb-4" style={{ color: "var(--text-primary)" }}>{c.highlights}</h2>
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
            <h2 className="text-xl font-semibold mb-4" style={{ color: "var(--text-primary)" }}>{c.decisions}</h2>
            <ul className="space-y-3">
              {project.engineeringDecisions.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-[15px]" style={{ color: "var(--text-secondary)" }}>
                  <span style={{ color: "var(--accent)" }} className="mt-0.5 shrink-0 flip-rtl">▸</span>{item}
                </li>
              ))}
            </ul>
          </motion.div>
        )}

        {/* Lessons */}
        {project.lessonsLearned.length > 0 && (
          <motion.div initial={{ y: 15, opacity: 0 }} animate={inView ? { y: 0, opacity: 1 } : {}} transition={{ duration: 0.4, delay: 0.6 }} className="mb-12">
            <h2 className="text-xl font-semibold mb-4" style={{ color: "var(--text-primary)" }}>{c.lessons}</h2>
            <ul className="space-y-3">
              {project.lessonsLearned.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-[15px]" style={{ color: "var(--text-secondary)" }}>
                  <span style={{ color: "var(--accent-secondary)" }} className="mt-0.5 shrink-0">◆</span>{item}
                </li>
              ))}
            </ul>
          </motion.div>
        )}

        {/* Product screens — phone captures get a device frame */}
        {project.screenshots.length > 0 && (
          <div className="mb-14">
            <h2 className="text-xl font-semibold mb-6" style={{ color: "var(--text-primary)" }}>{c.screens}</h2>
            {/* Web screens full width, phone screens side by side underneath */}
            <div className="flex flex-col gap-6">
              {project.screenshots.filter((src) => !src.includes("mobile")).map((src) => (
                <div
                  key={src}
                  className="relative w-full rounded-2xl overflow-hidden"
                  style={{ aspectRatio: "1440/1000", border: "1px solid var(--border-subtle)", background: "var(--surface)" }}
                >
                  <Image src={src} alt={`${project.title} — ${t.work.screenshot}`} fill className="object-cover object-top" sizes="(max-width: 768px) 100vw, 768px" />
                </div>
              ))}
              <div className="flex justify-center gap-6">
                {project.screenshots.filter((src) => src.includes("mobile")).map((src) => (
                  <PhoneMockup key={src} src={src} alt={`${project.title} — ${t.work.mobileScreenshot}`} className="relative w-[46%] sm:w-[34%] max-w-[240px] shrink-0" />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Bottom CTA */}
        <div className="pt-12 text-center" style={{ borderTop: "1px solid var(--border-subtle)" }}>
          <p className="text-sm mb-6" style={{ color: "var(--text-secondary)" }}>{c.cta}</p>
          <MagneticButton variant="primary" size="lg" href={`${href("/")}#contact`}>{c.ctaButton}</MagneticButton>
        </div>
      </div>
    </div>
  );
}
