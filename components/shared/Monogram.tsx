"use client";

import { motion } from "motion/react";

/** Line paths of the "AS" mark, drawn on a 64×64 grid (also used by app/icon.svg) */
export const MONOGRAM = {
  a: "M7 50 L19 14 L31 50",
  aBar: "M11.7 37 H26.3",
  s: "M56 20.5 C55 16 51.5 14 46.5 14 C41 14 37.5 17 37.5 22 C37.5 27.5 42 29 47 30.6 C52.5 32.3 57 34.3 57 40.6 C57 46.6 52.5 50 46.5 50 C41.5 50 37.6 47.8 36.6 43.4",
};

interface MonogramProps {
  size?: number;
  /** Animate the strokes drawing in */
  draw?: boolean;
  className?: string;
}

export default function Monogram({ size = 64, draw = false, className = "" }: MonogramProps) {
  const stroke = { strokeWidth: 4.2, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, fill: "none" };
  const anim = (delay: number) =>
    draw
      ? {
          initial: { pathLength: 0, opacity: 0 },
          animate: { pathLength: 1, opacity: 1 },
          transition: { pathLength: { duration: 0.9, delay, ease: [0.65, 0, 0.35, 1] as const }, opacity: { duration: 0.2, delay } },
        }
      : {};

  return (
    <svg width={size} height={size} viewBox="0 0 64 64" className={className} role="img" aria-label="AS">
      <motion.path d={MONOGRAM.a} stroke="var(--text-primary)" {...stroke} {...anim(0.05)} />
      <motion.path d={MONOGRAM.aBar} stroke="var(--text-primary)" {...stroke} {...anim(0.55)} />
      <motion.path d={MONOGRAM.s} stroke="var(--accent)" {...stroke} {...anim(0.3)} />
    </svg>
  );
}
