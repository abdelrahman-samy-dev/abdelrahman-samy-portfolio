"use client";

import { useEffect, useRef, useState } from "react";

type ScrollDirection = "up" | "down" | null;

/**
 * Detect scroll direction for auto-hiding navigation.
 * Returns "up" or "down" based on the last scroll delta.
 */
export function useScrollDirection(threshold = 10): {
  direction: ScrollDirection;
  scrollY: number;
  isAtTop: boolean;
} {
  const [direction, setDirection] = useState<ScrollDirection>(null);
  const [scrollY, setScrollY] = useState(0);
  const lastScrollY = useRef(0);
  const ticking = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!ticking.current) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          const delta = currentScrollY - lastScrollY.current;

          if (Math.abs(delta) > threshold) {
            setDirection(delta > 0 ? "down" : "up");
          }

          setScrollY(currentScrollY);
          lastScrollY.current = currentScrollY;
          ticking.current = false;
        });
        ticking.current = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [threshold]);

  return {
    direction,
    scrollY,
    isAtTop: scrollY < 10,
  };
}
