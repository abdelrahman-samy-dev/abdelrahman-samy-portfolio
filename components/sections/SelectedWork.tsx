"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, FolderGit2 } from "lucide-react";
import { projects } from "@/constants/projects";

gsap.registerPlugin(ScrollTrigger);

export default function SelectedWork() {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const projects = gsap.utils.toArray(".project-row");
      projects.forEach((proj: any) => {
        gsap.fromTo(proj, 
          { opacity: 0, y: 40 },
          {
            opacity: 1, 
            y: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: proj,
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
        <div className="mb-32 md:mb-48">
          <p className="text-[10px] font-mono tracking-[0.2em] uppercase mb-8" style={{ color: "var(--text-tertiary)" }}>
            04 / Featured Projects
          </p>
          <h2 
            className="text-5xl md:text-7xl lg:text-[7rem] font-display font-bold tracking-tighter leading-[0.95] max-w-5xl" 
            style={{ color: "var(--text-primary)" }}
          >
            Six products.<br />
            Six problems.<br />
            <span style={{ color: "var(--text-tertiary)" }}>One craftsman.</span>
          </h2>
        </div>

        {/* Projects Loop */}
        <div className="flex flex-col gap-32 md:gap-48">
          {projects.filter(p => p.featured).map((project, i) => (
            <div key={project.slug} className="project-row flex flex-col gap-12 md:gap-16 relative">
              
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-16 items-start">
                
                {/* ─── Left Side: Title & Meta (Sticky) ─── */}
                <div className="lg:col-span-4 lg:sticky lg:top-32">
                  <p className="text-[10px] font-mono tracking-widest uppercase mb-4" style={{ color: "var(--text-tertiary)" }}>
                    Case {(i + 1).toString().padStart(2, '0')}
                  </p>
                  <h3 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold tracking-tighter mb-4 leading-none" style={{ color: "var(--text-primary)" }}>
                    {project.title}
                  </h3>
                  <p className="text-[11px] font-mono tracking-widest uppercase mb-12" style={{ color: "var(--text-tertiary)" }}>
                    {project.category === "web" ? "Web Application" : project.category}
                  </p>
                  
                  <div className="flex flex-col gap-4">
                    {project.liveUrl && (
                      <a 
                        href={project.liveUrl} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="flex items-center gap-3 text-[11px] font-mono tracking-widest uppercase transition-colors duration-300 hover:text-[var(--accent)]" 
                        style={{ color: "var(--text-secondary)" }}
                      >
                        <ArrowUpRight size={14} /> View Live Demo
                      </a>
                    )}
                    {project.github && (
                      <a 
                        href={project.github} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="flex items-center gap-3 text-[11px] font-mono tracking-widest uppercase transition-colors duration-300 hover:text-[var(--accent)]" 
                        style={{ color: "var(--text-secondary)" }}
                      >
                        <FolderGit2 size={14} /> Source Code
                      </a>
                    )}
                  </div>
                </div>

                {/* ─── Right Side: Image, Problem, Solution ─── */}
                <div className="lg:col-span-8 flex flex-col gap-12 md:gap-16">
                  
                  {/* Image */}
                  <div 
                    className="relative w-full rounded-[2rem] overflow-hidden group" 
                    style={{ 
                      aspectRatio: "16/10", 
                      background: "rgba(255,255,255,0.02)",
                      border: "1px solid var(--border-subtle)" 
                    }}
                  >
                    <Image 
                      src={project.thumbnail} 
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-1000 group-hover:scale-[1.03]"
                      sizes="(max-width: 768px) 100vw, 66vw"
                      quality={100}
                    />
                    {/* Subtle Overlay Glow */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
                  </div>

                  {/* Details Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                    <div>
                      <p className="text-[10px] font-mono tracking-widest uppercase mb-4" style={{ color: "var(--text-tertiary)" }}>The Challenge</p>
                      <p className="text-sm md:text-base leading-[1.8]" style={{ color: "var(--text-secondary)" }}>
                        {project.challenge}
                      </p>
                    </div>
                    <div>
                      <p className="text-[10px] font-mono tracking-widest uppercase mb-4" style={{ color: "var(--text-tertiary)" }}>The Solution</p>
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

      </div>
    </section>
  );
}
