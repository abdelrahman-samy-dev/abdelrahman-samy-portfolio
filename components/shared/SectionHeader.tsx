"use client";

import { motion } from "motion/react";

interface SectionHeaderProps {
  title: string;
  index?: string;
}

export default function SectionHeader({ title, index = "01" }: SectionHeaderProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="flex items-center gap-4 mb-12"
    >
      <span className="text-[10px] font-mono tracking-widest opacity-40">
        {index} /
      </span>
      <h2 className="text-[11px] font-medium tracking-[0.3em] uppercase" style={{ color: "var(--text-primary)" }}>
        {title}
      </h2>
      <div className="flex-1 h-[1px] ml-2 max-w-[80px]" style={{ background: "var(--border-subtle)" }} />
    </motion.div>
  );
}
