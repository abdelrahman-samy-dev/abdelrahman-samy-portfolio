"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionHeader from "@/components/shared/SectionHeader";

gsap.registerPlugin(ScrollTrigger);

const principles = [
  {
    num: "01",
    title: "Performance\nFirst",
    desc: "Every millisecond matters. I optimize for Core Web Vitals, minimize bundle sizes, and use lazy loading, code splitting, and GPU-accelerated animations.",
  },
  {
    num: "02",
    title: "Clean\nArchitecture",
    desc: "Code should be a pleasure to read and maintain. I follow SOLID principles, separate concerns clearly, and design systems that scale.",
  },
  {
    num: "03",
    title: "Type\nSafety",
    desc: "TypeScript is not optional. Strong typing catches bugs at compile time, serves as living documentation, and makes refactoring fearless.",
  },
  {
    num: "04",
    title: "Accessible\nby Default",
    desc: "The web is for everyone. I build with semantic HTML, proper ARIA attributes, keyboard navigation, and screen reader compatibility.",
  },
  {
    num: "05",
    title: "Responsive\nEverywhere",
    desc: "Mobile is not an afterthought. I design and build mobile-first, ensuring every interface feels native across all devices.",
  },
  {
    num: "06",
    title: "Pixel\nPerfect",
    desc: "From Figma to production. I obsess over every detail — spacing, color, transitions — to deliver interfaces that are indistinguishable from the design.",
  },
];

export default function EngineeringPrinciples() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const cards = gsap.utils.toArray<HTMLElement>(".principle-card");
    const totalScroll = track.scrollWidth - window.innerWidth;

    const ctx = gsap.context(() => {
      // Horizontal scroll with pin
      const horizontalTween = gsap.to(track, {
        x: () => -totalScroll,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${totalScroll}`,
          pin: true,
          scrub: 0.8,
          invalidateOnRefresh: true,
        },
      });

      // Flip each card individually tied to horizontal scroll
      cards.forEach((card) => {
        const inner = card.querySelector<HTMLElement>(".card-inner");
        if (!inner) return;

        gsap.to(inner, {
          rotateY: 180,
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: card,
            containerAnimation: horizontalTween,
            start: "left 45%",
            end: "left 15%",
            scrub: true,
          },
        });
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="principles"
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{ background: "var(--bg-primary)" }}
    >
      {/* Track */}
      <div
        ref={trackRef}
        className="flex items-center h-screen"
        style={{ width: "fit-content" }}
      >
        {/* Intro Panel — half-screen so first cards peek in */}
        <div className="shrink-0 flex flex-col justify-center px-8 md:px-16 w-[100vw] md:w-[50vw] md:min-w-[420px] h-[100vh]">
          <SectionHeader title="Principles" index="03" />
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold tracking-tighter leading-[0.95] mb-6">
            The Code<br />
            <span style={{ color: "var(--text-tertiary)" }}>Behind The Craft.</span>
          </h2>
          <p className="text-sm md:text-base max-w-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
            The principles that shape every line of code I write.
          </p>
        </div>

        {/* Cards */}
        <div className="flex items-center gap-8 md:gap-10 shrink-0 pl-8">
          {principles.map((p) => (
            <div
              key={p.num}
              className="principle-card shrink-0"
              style={{
                width: "min(360px, 80vw)",
                height: "min(520px, 70vh)",
                perspective: "1200px",
              }}
            >
              <div
                className="card-inner relative w-full h-full"
                style={{ transformStyle: "preserve-3d" }}
              >
                {/* ─── BACK (visible first) ─── */}
                <div
                  className="absolute inset-0 rounded-[1.5rem] overflow-hidden flex flex-col items-center justify-center"
                  style={{
                    backfaceVisibility: "hidden",
                    background: "var(--bg-secondary)",
                    border: "1px solid var(--border-subtle)",
                  }}
                >
                  {/* Minimal geometric back */}
                  <div className="absolute inset-4 rounded-2xl border border-dashed pointer-events-none" style={{ borderColor: "rgba(255,255,255,0.04)" }} />
                  <div className="absolute inset-8 rounded-xl border pointer-events-none" style={{ borderColor: "rgba(255,255,255,0.03)" }} />

                  {/* Center diamond */}
                  <div className="relative w-20 h-20 flex items-center justify-center">
                    <div className="absolute inset-0 rotate-45 rounded-lg border" style={{ borderColor: "var(--accent)", opacity: 0.4 }} />
                    <span className="text-lg font-display font-bold" style={{ color: "var(--accent)" }}>{p.num}</span>
                  </div>

                  {/* Top & Bottom labels */}
                  <span className="absolute top-8 text-[9px] font-mono tracking-[0.4em] uppercase" style={{ color: "var(--text-tertiary)" }}>
                    Principle
                  </span>
                  <span className="absolute bottom-8 text-[9px] font-mono tracking-[0.4em] uppercase" style={{ color: "var(--text-tertiary)" }}>
                    {p.num} / 06
                  </span>

                  {/* Corner crosses */}
                  {["top-5 left-5", "top-5 right-5", "bottom-5 left-5", "bottom-5 right-5"].map((pos) => (
                    <span key={pos} className={`absolute ${pos} text-[10px] font-mono`} style={{ color: "rgba(255,255,255,0.08)" }}>+</span>
                  ))}
                </div>

                {/* ─── FRONT (content, starts hidden) ─── */}
                <div
                  className="absolute inset-0 rounded-[1.5rem] p-10 flex flex-col justify-between group overflow-hidden"
                  style={{
                    backfaceVisibility: "hidden",
                    transform: "rotateY(180deg)",
                    background: "linear-gradient(180deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    boxShadow: "inset 0 1px 1px rgba(255,255,255,0.05), 0 20px 40px rgba(0,0,0,0.4)"
                  }}
                >
                  {/* Hover Accent Glow */}
                  <div className="absolute top-0 left-0 w-full h-[2px]" style={{ background: "linear-gradient(90deg, transparent, var(--accent), transparent)", opacity: 0.5 }} />

                  {/* Number */}
                  <div className="flex justify-between items-start">
                    <span
                      className="text-7xl md:text-8xl font-display font-bold leading-none tracking-tighter"
                      style={{ color: "var(--accent)", opacity: 0.15 }}
                    >
                      {p.num}
                    </span>
                  </div>

                  {/* Content */}
                  <div>
                    <h3
                      className="text-3xl md:text-4xl font-display font-bold tracking-tight mb-5 whitespace-pre-line leading-[1.1]"
                      style={{ color: "var(--text-primary)" }}
                    >
                      {p.title}
                    </h3>
                    <p className="text-sm leading-[1.8]" style={{ color: "var(--text-secondary)" }}>
                      {p.desc}
                    </p>
                  </div>

                  {/* Bottom accent line */}
                  <div className="flex items-center gap-3 mt-4">
                    <div className="w-8 h-[2px] rounded-full" style={{ background: "var(--accent)" }} />
                    <span className="text-[10px] font-mono tracking-widest" style={{ color: "var(--text-tertiary)" }}>
                      {p.num} / 06
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Spacer to allow the last card to travel far enough left to trigger its flip (needs to reach 15vw) */}
        <div className="shrink-0" style={{ width: "15vw" }} />

        {/* Outro Panel — elegant way to consume trailing scroll space instead of empty padding */}
        <div className="shrink-0 flex flex-col justify-center px-12 md:px-24 w-[100vw] md:w-[45vw] md:min-w-[320px] h-[100vh]">
          <h2 className="text-3xl md:text-5xl font-display font-bold tracking-tighter leading-[1.1] mb-6" style={{ color: "var(--text-tertiary)" }}>
            Ready to see<br />
            <span style={{ color: "var(--text-primary)" }}>these in action?</span>
          </h2>
          <div className="w-12 h-[2px] rounded-full" style={{ background: "var(--accent)" }} />
        </div>
      </div>
    </section>
  );
}
