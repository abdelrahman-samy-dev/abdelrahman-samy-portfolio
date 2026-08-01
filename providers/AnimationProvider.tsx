"use client";

import { createContext, useContext, useEffect, useState } from "react";

interface AnimationContextType {
  /** Whether the user has requested reduced motion */
  prefersReducedMotion: boolean;
  /** Whether animations have been loaded / ready */
  isReady: boolean;
  /** Mark animations as ready (called after loading screen) */
  setReady: () => void;
}

const AnimationContext = createContext<AnimationContextType>({
  prefersReducedMotion: false,
  isReady: false,
  setReady: () => {},
});

export function useAnimation() {
  return useContext(AnimationContext);
}

interface AnimationProviderProps {
  children: React.ReactNode;
}

/**
 * AnimationProvider
 *
 * Provides global animation state:
 * - Detects `prefers-reduced-motion` media query
 * - Tracks whether animations are ready (after loading screen completes)
 * - Used by all animation components to respect accessibility
 */
export default function AnimationProvider({ children }: AnimationProviderProps) {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handler = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
    };

    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  return (
    <AnimationContext.Provider
      value={{
        prefersReducedMotion,
        isReady,
        setReady: () => setIsReady(true),
      }}
    >
      {children}
    </AnimationContext.Provider>
  );
}
