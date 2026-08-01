"use client";

import { useCallback, useRef } from "react";
import { lerp } from "@/lib/utils";

interface MagneticOptions {
  /** How far the element can be pulled (in pixels). Default: 0.4 of element size */
  strength?: number;
  /** Lerp factor for smoothness. Default: 0.1 */
  ease?: number;
}

/**
 * Magnetic pull effect for buttons and interactive elements.
 * Attach the returned ref to a container div and spread the event handlers.
 *
 * @example
 * const { ref, onMouseMove, onMouseLeave } = useMagneticEffect();
 * <div ref={ref} onMouseMove={onMouseMove} onMouseLeave={onMouseLeave}>
 *   <button>Click me</button>
 * </div>
 */
export function useMagneticEffect({ strength = 0.4, ease = 0.1 }: MagneticOptions = {}) {
  const ref = useRef<HTMLDivElement>(null);
  const positionRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number | null>(null);

  const onMouseMove = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      if (!ref.current) return;

      const rect = ref.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const distX = event.clientX - centerX;
      const distY = event.clientY - centerY;

      const targetX = distX * strength;
      const targetY = distY * strength;

      const animate = () => {
        positionRef.current.x = lerp(positionRef.current.x, targetX, ease);
        positionRef.current.y = lerp(positionRef.current.y, targetY, ease);

        if (ref.current) {
          ref.current.style.transform = `translate(${positionRef.current.x}px, ${positionRef.current.y}px)`;
        }

        if (
          Math.abs(positionRef.current.x - targetX) > 0.1 ||
          Math.abs(positionRef.current.y - targetY) > 0.1
        ) {
          rafRef.current = requestAnimationFrame(animate);
        }
      };

      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(animate);
    },
    [strength, ease]
  );

  const onMouseLeave = useCallback(() => {
    const animate = () => {
      positionRef.current.x = lerp(positionRef.current.x, 0, ease);
      positionRef.current.y = lerp(positionRef.current.y, 0, ease);

      if (ref.current) {
        ref.current.style.transform = `translate(${positionRef.current.x}px, ${positionRef.current.y}px)`;
      }

      if (
        Math.abs(positionRef.current.x) > 0.1 ||
        Math.abs(positionRef.current.y) > 0.1
      ) {
        rafRef.current = requestAnimationFrame(animate);
      } else if (ref.current) {
        ref.current.style.transform = "translate(0px, 0px)";
      }
    };

    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(animate);
  }, [ease]);

  return { ref, onMouseMove, onMouseLeave };
}
