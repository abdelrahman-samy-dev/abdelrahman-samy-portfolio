"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  /** Max rotation in degrees */
  max?: number;
}

/**
 * 3D perspective tilt that follows the pointer, with a soft glare.
 * Mouse only — touch devices and reduced-motion users get a flat card.
 */
export default function TiltCard({ children, className = "", style, max = 6 }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const spring = { stiffness: 150, damping: 18, mass: 0.4 };
  const rotateX = useSpring(useTransform(py, [0, 1], [max, -max]), spring);
  const rotateY = useSpring(useTransform(px, [0, 1], [-max, max]), spring);
  const glareX = useTransform(px, (v) => `${v * 100}%`);
  const glareY = useTransform(py, (v) => `${v * 100}%`);
  const glare = useTransform(
    [glareX, glareY],
    ([x, y]) => `radial-gradient(500px circle at ${x} ${y}, rgba(255,255,255,0.09), transparent 45%)`
  );

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse" || !ref.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const r = ref.current.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width);
    py.set((e.clientY - r.top) / r.height);
  };
  const onLeave = () => {
    px.set(0.5);
    py.set(0.5);
  };

  return (
    <div style={{ perspective: 1200 }} className="w-full">
      <motion.div
        ref={ref}
        onPointerMove={onMove}
        onPointerLeave={onLeave}
        style={{ ...style, rotateX, rotateY, transformStyle: "preserve-3d" }}
        className={`relative group ${className}`}
      >
        {children}
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{ background: glare }}
        />
      </motion.div>
    </div>
  );
}
