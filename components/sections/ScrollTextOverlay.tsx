"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";

function FadeText({ children, top }: { children: React.ReactNode; top: string }) {
  const ref = useRef(null);
  // Re-animate when it comes into view while scrolling
  const inView = useInView(ref, { once: false, amount: 0.5, margin: "-10% 0px -10% 0px" });
  
  return (
    <div ref={ref} className={`absolute ${top} inset-x-0 pointer-events-none flex justify-center px-6 z-20`}>
       <motion.h2
         initial={{ opacity: 0, y: 40, filter: "blur(12px)" }}
         animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : { opacity: 0, y: -40, filter: "blur(12px)" }}
         transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
         className="font-display font-bold text-center leading-[0.9] tracking-tighter uppercase"
         style={{ fontSize: "clamp(2.5rem, 8vw, 7rem)", color: "var(--text-primary)" }}
       >
         {children}
       </motion.h2>
    </div>
  );
}

/**
 * Renders large typography statements over the CinematicScroll canvas
 * to fill the empty space while the user is scrolling down.
 */
export default function ScrollTextOverlay() {
  return (
    <>
      <FadeText top="top-[130vh]">
        Crafting <span style={{ color: "var(--text-secondary)" }}>Digital</span><br/>Experiences
      </FadeText>
      
      <FadeText top="top-[215vh]">
        Where <span style={{ color: "var(--text-secondary)" }}>Design</span><br/>Meets Performance
      </FadeText>
    </>
  );
}
