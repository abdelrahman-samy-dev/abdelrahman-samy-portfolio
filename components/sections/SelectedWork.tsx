"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, FolderGit2, BookOpen } from "lucide-react";
import { getProjects } from "@/constants/content";
import { useLocale } from "@/providers/LocaleProvider";
import TiltCard from "@/components/shared/TiltCard";
import PhoneMockup from "@/components/shared/PhoneMockup";

gsap.registerPlugin(ScrollTrigger);

const linkClass =
  "flex items-center gap-3 text-[11px] font-mono tracking-widest uppercase transition-colors duration-300 hover:text-[var(--accent)]";

export default function SelectedWork() {
  const containerRef = useRef<HTMLElement>(null);
  const { locale, t, href } = useLocale();
  const w = t.work;
  const projects = getProjects(locale);
  const featured = projects.filter((p) => p.featured);
  const more = projects.filter((p) => !p.featured);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const rows = gsap.utils.toArray<HTMLElement>(".project-row");
      rows.forEach((row) => {
        gsap.fromTo(row,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: row,
              start: "top 80%",
            }
          }
        );
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="work" ref={containerRef} className="py-24 md:py-32" style={{ background: "var(--bg-primary)" }}>
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">

        {/* Intro */}
        <div className="mb-20 md:mb-48">
          <p className="text-[10px] font-mono tracking-[0.2em] uppercase mb-8" style={{ color: "var(--text-tertiary)" }}>
            {w.eyebrow}
          </p>
          <h2
            className="text-[2.6rem] sm:text-5xl md:text-7xl lg:text-[7rem] font-display font-bold tracking-tighter leading-[0.95] max-w-5xl"
            style={{ color: "var(--text-primary)" }}
          >
            {w.title[0]}<br />
            {w.title[1]}<br />
            <span style={{ color: "var(--text-tertiary)" }}>{w.title[2]}</span>
          </h2>
        </div>

        {/* Projects Loop */}
        <div className="flex flex-col gap-24 md:gap-48">
          {featured.map((project, i) => (
            <div key={project.slug} className="project-row flex flex-col gap-12 md:gap-16 relative">

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-16 items-start">

                {/* ─── Left Side: Title & Meta (Sticky) ─── */}
                <div className="lg:col-span-4 lg:sticky lg:top-32">
                  <div className="flex items-center gap-3 mb-4">
                    <p className="text-[10px] font-mono tracking-widest uppercase" style={{ color: "var(--text-tertiary)" }}>
                      {w.case} {(i + 1).toString().padStart(2, "0")} · {project.year}
                    </p>
                    {project.status === "in-development" && (
                      <span
                        className="px-2.5 py-1 rounded-full text-[9px] font-mono tracking-widest uppercase border"
                        style={{ borderColor: "var(--accent-border)", color: "var(--accent)", background: "var(--accent-subtle)" }}
                      >
                        {w.inDevelopment}
                      </span>
                    )}
                  </div>
                  <h3 className="text-[2.75rem] md:text-6xl lg:text-7xl font-display font-bold tracking-tighter mb-4 leading-none" style={{ color: "var(--text-primary)" }}>
                    {project.title}
                  </h3>
                  <p className="text-[11px] font-mono tracking-widest uppercase mb-6" style={{ color: "var(--text-tertiary)" }}>
                    {project.label ?? w.webApp}
                  </p>
                  {project.role && (
                    <p className="text-sm leading-relaxed mb-10 max-w-sm" style={{ color: "var(--text-secondary)" }}>
                      {project.role}
                    </p>
                  )}

                  <div className={`flex flex-col gap-4 ${project.role ? "" : "mt-6"}`}>
                    {project.liveUrl && (
                      <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className={linkClass} style={{ color: "var(--text-secondary)" }}>
                        <ArrowUpRight size={14} className="flip-rtl" /> {project.liveUrl.includes("gloofloo.com") ? `${w.visit} gloofloo.com` : w.liveDemo}
                      </a>
                    )}
                    {project.github && (
                      <a href={project.github} target="_blank" rel="noopener noreferrer" className={linkClass} style={{ color: "var(--text-secondary)" }}>
                        <FolderGit2 size={14} /> {w.source}
                      </a>
                    )}
                    <Link href={href(`/work/${project.slug}`)} className={linkClass} style={{ color: "var(--text-secondary)" }}>
                      <BookOpen size={14} /> {w.caseStudy}
                    </Link>
                  </div>
                </div>

                {/* ─── Right Side: Image, Problem, Solution ─── */}
                <div className="lg:col-span-8 flex flex-col gap-12 md:gap-16">

                  {/* Image — 3D tilt, with the phone app beside it when there is one */}
                  <div className={`relative ${project.mobileShot ? "pb-10 md:pb-0 md:pe-16 lg:pe-20" : ""}`}>
                    <TiltCard
                      className="w-full rounded-[var(--radius-xl)] overflow-hidden"
                      style={{
                        aspectRatio: "16/10",
                        background: "var(--surface)",
                        border: "1px solid var(--border-subtle)",
                        boxShadow: "0 30px 80px rgba(0,0,0,0.35)",
                      }}
                    >
                      <Image
                        src={project.thumbnail}
                        alt={`${project.title} — ${w.screenshot}`}
                        fill
                        className="object-cover object-top transition-transform duration-1000 group-hover:scale-[1.03]"
                        sizes="(max-width: 1024px) 100vw, 66vw"
                      />
                      {/* Subtle Overlay Glow */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/25 to-transparent pointer-events-none" />
                    </TiltCard>
                    {project.mobileShot && (
                      <PhoneMockup
                        src={project.mobileShot}
                        alt={`${project.title} — ${w.mobileScreenshot}`}
                        className="absolute bottom-0 end-3 md:-bottom-10 md:end-0 w-[26%] md:w-[22%] max-w-[190px]"
                      />
                    )}
                  </div>

                  {/* Details Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                    <div>
                      <p className="text-[10px] font-mono tracking-widest uppercase mb-4" style={{ color: "var(--text-tertiary)" }}>{w.challenge}</p>
                      <p className="text-sm md:text-base leading-[1.8]" style={{ color: "var(--text-secondary)" }}>
                        {project.challenge}
                      </p>
                    </div>
                    <div>
                      <p className="text-[10px] font-mono tracking-widest uppercase mb-4" style={{ color: "var(--text-tertiary)" }}>{w.solution}</p>
                      <p className="text-sm md:text-base leading-[1.8]" style={{ color: "var(--text-secondary)" }}>
                        {project.solution}
                      </p>
                    </div>
                  </div>

                  {/* Tech Stack Pills */}
                  <div className="flex flex-wrap gap-2 pt-8 border-t" style={{ borderColor: "var(--border-subtle)" }}>
                    {project.techStack.map(tech => (
                      <span
                        key={tech}
                        className="px-4 py-2 text-[10px] font-mono tracking-widest uppercase rounded-full border transition-colors hover:border-[var(--accent)] hover:text-[var(--text-primary)]"
                        style={{ borderColor: "var(--border-subtle)", color: "var(--text-tertiary)", background: "rgba(255,255,255,0.01)" }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                </div>
              </div>

            </div>
          ))}
        </div>

        {/* More Projects — compact list */}
        {more.length > 0 && (
          <div className="mt-32 md:mt-48">
            <p className="text-[10px] font-mono tracking-[0.2em] uppercase mb-8" style={{ color: "var(--text-tertiary)" }}>
              {w.more}
            </p>
            <div className="flex flex-col border-b" style={{ borderColor: "var(--border-subtle)" }}>
              {more.map((project) => (
                <Link
                  key={project.slug}
                  href={href(`/work/${project.slug}`)}
                  className="group flex flex-col md:flex-row md:items-center justify-between gap-2 md:gap-8 py-6 border-t transition-colors"
                  style={{ borderColor: "var(--border-subtle)" }}
                >
                  <div className="flex items-baseline gap-4">
                    <span className="text-[10px] font-mono tracking-widest" style={{ color: "var(--text-tertiary)" }}>{project.year}</span>
                    <span className="text-2xl md:text-3xl font-display font-bold tracking-tight transition-colors group-hover:text-[var(--accent)]" style={{ color: "var(--text-primary)" }}>
                      {project.title}
                    </span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-[10px] font-mono tracking-widest uppercase" style={{ color: "var(--text-tertiary)" }}>
                      {project.tags.slice(0, 3).join(" · ")}
                    </span>
                    <ArrowUpRight size={18} className="flip-rtl shrink-0 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" style={{ color: "var(--text-secondary)" }} />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
