"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";

// three.js is only downloaded when the orb is about to scroll into view
const OrbScene = dynamic(() => import("./OrbScene"), { ssr: false });

export default function ContactOrb({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);
  const [still, setStill] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStill(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
          setShow(true);
          io.disconnect();
        }
      },
      { rootMargin: "600px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className={className} aria-hidden="true">
      {/* Soft glow behind the orb — also the fallback before three.js loads */}
      <div
        className="absolute inset-[18%] rounded-full blur-3xl"
        style={{ background: "radial-gradient(circle, rgb(var(--accent-rgb) / 0.22), transparent 70%)" }}
      />
      {show && <OrbScene still={still} />}
    </div>
  );
}
