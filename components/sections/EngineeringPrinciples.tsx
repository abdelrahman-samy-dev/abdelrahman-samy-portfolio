"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { MoveHorizontal } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionHeader from "@/components/shared/SectionHeader";
import { useLocale } from "@/providers/LocaleProvider";

gsap.registerPlugin(ScrollTrigger);

/**
 * Desktop: the section pins and the cards travel sideways with the scroll
 * (right-to-left in English, left-to-right in Arabic), each card easing in
 * and lighting up as it reaches the middle.
 * Mobile: a plain swipeable row with snap points — no pinning, no hijacked scroll.
 */
export default function EngineeringPrinciples() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const rowRef = useRef<HTMLDivElement>(null);
  // Phone carousel: which card is centred (drives the dots and the highlight)
  const [active, setActive] = useState(0);

  const onRowScroll = useCallback(() => {
    const row = rowRef.current;
    if (!row) return;
    const mid = row.getBoundingClientRect().left + row.clientWidth / 2;
    let best = 0;
    let bestDist = Infinity;
    row.querySelectorAll<HTMLElement>(".principle-card").forEach((card, i) => {
      const r = card.getBoundingClientRect();
      const d = Math.abs(r.left + r.width / 2 - mid);
      if (d < bestDist) {
        bestDist = d;
        best = i;
      }
    });
    setActive(best);
  }, []);

  const goTo = (i: number) => {
    rowRef.current
      ?.querySelectorAll<HTMLElement>(".principle-card")
      [i]?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  };
  const { t, dir } = useLocale();
  const p = t.principles;
  const principles = p.items.map((item, i) => ({ ...item, num: String(i + 1).padStart(2, "0") }));
  const total = String(principles.length).padStart(2, "0");

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;
    const rtl = dir === "rtl";
    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
      // Measured on every refresh so resizing stays correct
      const distance = () => Math.max(0, track.scrollWidth - window.innerWidth);

      const tween = gsap.to(track, {
        x: () => (rtl ? distance() : -distance()),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 0.6,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            if (barRef.current) barRef.current.style.transform = `scaleX(${self.progress})`;
          },
        },
      });

      gsap.utils.toArray<HTMLElement>(".principle-card", track).forEach((card) => {
        // Ease in from the side the card enters on
        gsap.fromTo(
          card,
          { opacity: 0.3, scale: 0.9, rotateY: rtl ? -16 : 16 },
          {
            opacity: 1,
            scale: 1,
            rotateY: 0,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              containerAnimation: tween,
              start: rtl ? "right 0%" : "left 100%",
              end: rtl ? "center 45%" : "center 55%",
              scrub: true,
            },
          }
        );
        // Highlight the one card crossing the middle of the screen
        ScrollTrigger.create({
          trigger: card,
          containerAnimation: tween,
          start: rtl ? "right 50%" : "left 50%",
          end: rtl ? "left 50%" : "right 50%",
          toggleClass: "is-active",
        });
      });
    });

    return () => mm.revert();
  }, [dir]);

  return (
    <section
      id="principles"
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{ background: "var(--bg-primary)" }}
    >
      {/* Track */}
      <div ref={trackRef} className="flex flex-col md:flex-row md:items-center md:h-svh md:w-max">
        {/* Intro panel */}
        <div className="shrink-0 flex flex-col justify-center px-6 pt-24 pb-10 md:p-0 md:px-16 md:w-[42vw] md:min-w-[420px] md:h-svh">
          <SectionHeader title={p.eyebrow} index="03" />
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold tracking-tighter leading-[0.95] mb-6">
            {p.title[0]}<br />
            <span style={{ color: "var(--text-tertiary)" }}>{p.title[1]}</span>
          </h2>
          <p className="text-sm md:text-base max-w-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
            {p.intro}
          </p>
        </div>

        {/* Cards — a swipe row on phones, the moving track on desktop */}
        <div
          ref={rowRef}
          onScroll={onRowScroll}
          className="flex gap-4 md:gap-8 overflow-x-auto md:overflow-visible snap-x snap-mandatory md:snap-none no-scrollbar px-[10vw] md:px-0 pb-6 md:pb-0 shrink-0"
          style={{ perspective: 1400 }}
        >
          {principles.map((item, i) => (
            <article
              key={item.num}
              data-active={i === active}
              className="principle-card group relative shrink-0 snap-center w-[80vw] max-w-[340px] md:w-[340px] md:max-w-none h-[420px] md:h-[min(500px,68vh)] rounded-[1.5rem] p-7 md:p-9 flex flex-col justify-between overflow-hidden"
            >
              {/* Accent line */}
              <div className="card-line absolute top-0 inset-x-0 h-[2px]" style={{ background: "linear-gradient(90deg, transparent, var(--accent), transparent)" }} />

              <span
                className="text-7xl md:text-8xl font-display font-bold leading-none tracking-tighter"
                style={{ color: "var(--accent)" }}
                aria-hidden="true"
              >
                <span className="card-num">{item.num}</span>
              </span>

              <div>
                <h3
                  className="text-[1.7rem] md:text-4xl font-display font-bold tracking-tight mb-4 whitespace-pre-line leading-[1.1]"
                  style={{ color: "var(--text-primary)" }}
                >
                  {item.title}
                </h3>
                <p className="text-sm leading-[1.8]" style={{ color: "var(--text-secondary)" }}>
                  {item.desc}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <div className="card-bar w-8 h-[2px] rounded-full" style={{ background: "var(--accent)" }} />
                <span className="text-[10px] font-mono tracking-widest" style={{ color: "var(--text-tertiary)" }}>
                  {p.card} {item.num} / {total}
                </span>
              </div>
            </article>
          ))}
        </div>

        {/* Phone: swipe hint + position dots */}
        <div className="md:hidden flex items-center justify-center gap-4 pb-20">
          <span className="flex items-center gap-1.5 text-[10px] font-mono tracking-widest uppercase" style={{ color: "var(--text-tertiary)" }}>
            <MoveHorizontal size={14} style={{ color: "var(--accent)" }} />
            {p.swipe}
          </span>
          <div className="flex items-center">
            {principles.map((item, i) => (
              <button
                key={item.num}
                type="button"
                onClick={() => goTo(i)}
                aria-label={`${p.card} ${item.num}`}
                aria-current={i === active ? "true" : undefined}
                className="h-6 min-w-6 px-1 flex items-center justify-center"
              >
                <span
                  className="block h-1.5 rounded-full transition-all duration-300"
                  style={{ width: i === active ? 22 : 6, background: i === active ? "var(--accent)" : "rgba(255,255,255,0.18)" }}
                />
              </button>
            ))}
          </div>
        </div>

        {/* Outro panel (desktop) */}
        <div className="hidden md:flex shrink-0 flex-col justify-center px-24 w-[40vw] min-w-[320px] h-svh">
          <h2 className="text-3xl md:text-5xl font-display font-bold tracking-tighter leading-[1.1] mb-6" style={{ color: "var(--text-tertiary)" }}>
            {p.outro[0]}<br />
            <span style={{ color: "var(--text-primary)" }}>{p.outro[1]}</span>
          </h2>
          <div className="w-12 h-[2px] rounded-full" style={{ background: "var(--accent)" }} />
        </div>
      </div>

      {/* Progress (desktop) */}
      <div className="hidden md:block absolute bottom-[12vh] inset-x-16 h-[2px] rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.06)" }} aria-hidden="true">
        <div
          ref={barRef}
          className="h-full w-full rounded-full"
          style={{ background: "var(--accent)", transform: "scaleX(0)", transformOrigin: dir === "rtl" ? "right" : "left" }}
        />
      </div>
    </section>
  );
}
