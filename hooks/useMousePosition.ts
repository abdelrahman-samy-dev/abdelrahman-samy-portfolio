"use client";

import { useEffect, useState } from "react";

interface MousePosition {
  x: number;
  y: number;
  /** Normalized 0-1 range */
  normalizedX: number;
  /** Normalized 0-1 range */
  normalizedY: number;
}

/**
 * Track mouse position with optional normalization.
 * Used for cursor effects, mouse glow, and 3D camera parallax.
 */
export function useMousePosition(): MousePosition {
  const [position, setPosition] = useState<MousePosition>({
    x: 0,
    y: 0,
    normalizedX: 0.5,
    normalizedY: 0.5,
  });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setPosition({
        x: event.clientX,
        y: event.clientY,
        normalizedX: event.clientX / window.innerWidth,
        normalizedY: event.clientY / window.innerHeight,
      });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return position;
}
