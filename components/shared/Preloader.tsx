"use client";

import { createContext, useContext, useEffect, useMemo, useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Monogram from "@/components/shared/Monogram";
import { useLocale } from "@/providers/LocaleProvider";

export const TOTAL_FRAMES = 96;
const FRAME_PATH = "/images/hero/frame-";
/** Keep the intro on screen long enough for the mark to finish drawing */
const MIN_SHOW_MS = 1100;
/** Reveal the page after this long even if some frames are still downloading */
const MAX_WAIT_MS = 2600;
const EASE = [0.76, 0, 0.24, 1] as const;

/** The intro plays once per visit — coming back to the home page skips it */
let introPlayed = false;

function getFrameSrc(index: number): string {
  const num = String(Math.min(Math.max(index, 1), TOTAL_FRAMES)).padStart(3, "0");
  return `${FRAME_PATH}${num}.webp`;
}

/* ── Context ── */
interface PreloaderContextType {
  images: HTMLImageElement[];
  loaded: boolean;
}

const PreloaderContext = createContext<PreloaderContextType>({
  images: [],
  loaded: false,
});

export function usePreloadedImages() {
  return useContext(PreloaderContext);
}

/* ── Preloader Component ── */
export default function Preloader({ children }: { children: React.ReactNode }) {
  const { t } = useLocale();
  const [loaded, setLoaded] = useState(() => introPlayed);
  const [progress, setProgress] = useState(0);
  const [revealed, setRevealed] = useState(() => introPlayed);
  // Frames are handed out once the first one has arrived (set from its onload)
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const firstFrameReady = useRef(false);

  // Load the hero frames. The intro lifts when every frame is in (but not before
  // MIN_SHOW_MS), or at MAX_WAIT_MS once the first frame is ready — the rest keep
  // streaming in and CinematicScroll draws the nearest frame that has arrived.
  useEffect(() => {
    const start = performance.now();
    let loadedCount = 0;
    let allIn = false;
    let timedOut = false;
    let revealTimer: ReturnType<typeof setTimeout> | undefined;
    const reveal = () => {
      clearTimeout(revealTimer);
      const wait = Math.max(0, MIN_SHOW_MS - (performance.now() - start));
      revealTimer = setTimeout(() => {
        introPlayed = true;
        setLoaded(true);
      }, wait);
    };

    const frames: HTMLImageElement[] = [];
    const onSettled = (index: number) => {
      loadedCount++;
      setProgress(Math.floor((loadedCount / TOTAL_FRAMES) * 100));
      if (index === 0) {
        firstFrameReady.current = true;
        setImages(frames);
        if (timedOut) reveal();
      }
      if (loadedCount === TOTAL_FRAMES && !allIn) {
        allIn = true;
        reveal();
      }
    };

    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      img.decoding = "async";
      img.onload = img.onerror = () => onSettled(i - 1);
      img.src = getFrameSrc(i);
      frames.push(img);
    }

    const maxWait = setTimeout(() => {
      timedOut = true;
      if (firstFrameReady.current) reveal();
    }, MAX_WAIT_MS);

    return () => {
      clearTimeout(maxWait);
      clearTimeout(revealTimer);
    };
  }, []);

  // Stable value so progress ticks don't re-render every consumer.
  // "loaded" for consumers means: page revealed AND a frame is ready to draw.
  const contextValue = useMemo(
    () => ({ images, loaded: loaded && images.length > 0 }),
    [images, loaded]
  );

  // After exit animation completes, mark as fully revealed
  const handleExitComplete = useCallback(() => {
    setRevealed(true);
    // The page was scroll-locked while loading — re-measure pinned sections
    ScrollTrigger.refresh();
  }, []);

  const ringLength = 2 * Math.PI * 46;

  return (
    <PreloaderContext.Provider value={contextValue}>
      {/* Loading Screen — a curtain that lifts off the page */}
      <AnimatePresence onExitComplete={handleExitComplete}>
        {!loaded && (
          <motion.div
            key="preloader"
            exit={{ y: "-100%" }}
            transition={{ duration: 0.8, ease: EASE }}
            className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden"
            style={{ background: "var(--bg-primary)" }}
            role="status"
            aria-live="polite"
            aria-label={t.preloader.label}
          >
            {/* Warm glow */}
            <div
              aria-hidden="true"
              className="absolute w-[60vmax] h-[60vmax] rounded-full blur-3xl opacity-60"
              style={{ background: "radial-gradient(circle, rgb(var(--accent-rgb) / 0.12), transparent 60%)" }}
            />

            <motion.div
              exit={{ opacity: 0, y: -40 }}
              transition={{ duration: 0.5, ease: EASE }}
              className="relative flex flex-col items-center gap-8"
            >
              {/* Mark + progress ring */}
              <div className="relative w-[120px] h-[120px] flex items-center justify-center">
                <svg viewBox="0 0 100 100" className="absolute inset-0 -rotate-90" aria-hidden="true">
                  <circle cx="50" cy="50" r="46" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="1.5" />
                  <circle
                    cx="50"
                    cy="50"
                    r="46"
                    fill="none"
                    stroke="var(--accent)"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeDasharray={ringLength}
                    strokeDashoffset={ringLength * (1 - progress / 100)}
                    style={{ transition: "stroke-dashoffset 0.25s linear" }}
                  />
                </svg>
                <Monogram size={58} draw />
              </div>

              {/* Name & role */}
              <div className="flex flex-col items-center gap-2 text-center">
                <motion.p
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  className="font-display font-bold text-xl md:text-2xl tracking-tight"
                  style={{ color: "var(--text-primary)" }}
                >
                  {t.preloader.name}
                </motion.p>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6, duration: 0.6 }}
                  className="text-[10px] font-mono tracking-[0.3em] uppercase"
                  style={{ color: "var(--text-tertiary)" }}
                >
                  {t.preloader.role}
                  <span className="mx-2" style={{ color: "var(--accent)" }}>·</span>
                  <span className="tabular-nums" dir="ltr">{String(progress).padStart(2, "0")}%</span>
                </motion.p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Lock scroll during loading */}
      {!revealed && !loaded && (
        <style>{`html, body { overflow: hidden !important; height: 100vh !important; }`}</style>
      )}

      {/* Page content — always mounted so it starts hydrating */}
      <div style={{ visibility: loaded || revealed ? "visible" : "hidden" }}>
        {children}
      </div>
    </PreloaderContext.Provider>
  );
}
