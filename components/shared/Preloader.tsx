"use client";

import { createContext, useContext, useEffect, useMemo, useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Monogram from "@/components/shared/Monogram";
import { useLocale } from "@/providers/LocaleProvider";

export const TOTAL_FRAMES = 96;
const FRAME_PATH = "/images/hero/frame-";
/** Keep the intro on screen just long enough for the mark to draw */
const MIN_SHOW_MS = 800;
/** Lift the intro after this long even if the first frame hasn't arrived */
const MAX_WAIT_MS = 1600;
/** Frames downloaded at once after the page has loaded */
const BATCH = 6;
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

  // The intro lifts as soon as the first hero frame is in (but not before
  // MIN_SHOW_MS, and never later than MAX_WAIT_MS). The page underneath is
  // already rendered, so nothing waits on the full sequence: the remaining
  // frames download in small batches after the window has loaded, and
  // CinematicScroll draws the nearest frame that has arrived.
  useEffect(() => {
    const start = performance.now();
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // Phones get every second frame: half the bytes, same motion
    const step = window.innerWidth < 768 ? 2 : 1;
    const indexes = Array.from({ length: Math.ceil(TOTAL_FRAMES / step) }, (_, i) => i * step + 1);

    let revealTimer: ReturnType<typeof setTimeout> | undefined;
    const reveal = (immediate = false) => {
      clearTimeout(revealTimer);
      const wait = immediate ? 0 : Math.max(0, MIN_SHOW_MS - (performance.now() - start));
      revealTimer = setTimeout(() => {
        introPlayed = true;
        setLoaded(true);
      }, wait);
    };

    const frames = indexes.map(() => {
      const img = new Image();
      img.decoding = "async";
      return img;
    });
    let settled = 0;
    const onSettled = () => {
      settled++;
      setProgress(Math.floor((settled / frames.length) * 100));
    };

    // First frame now, at high priority
    frames[0].fetchPriority = "high";
    frames[0].onload = frames[0].onerror = () => {
      onSettled();
      firstFrameReady.current = true;
      setImages(frames);
      reveal(reducedMotion);
    };
    frames[0].src = getFrameSrc(indexes[0]);

    // The rest after load, a few at a time, so they never compete with the page itself
    let next = 1;
    let cancelled = false;
    const pump = () => {
      if (cancelled || next >= frames.length) return;
      const img = frames[next];
      const src = getFrameSrc(indexes[next]);
      next++;
      img.onload = img.onerror = () => {
        onSettled();
        pump();
      };
      img.src = src;
    };
    const startRest = () => {
      for (let i = 0; i < BATCH; i++) pump();
    };
    if (document.readyState === "complete") startRest();
    else window.addEventListener("load", startRest, { once: true });

    const maxWait = setTimeout(() => reveal(true), reducedMotion ? 0 : MAX_WAIT_MS);

    return () => {
      cancelled = true;
      clearTimeout(maxWait);
      clearTimeout(revealTimer);
      window.removeEventListener("load", startRest);
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

      {/* Lock scroll during the (short) intro */}
      {!revealed && !loaded && (
        <style>{`html, body { overflow: hidden !important; height: 100vh !important; }`}</style>
      )}

      {/* Page content — rendered and painted under the intro, so it's ready the moment the curtain lifts */}
      {children}
    </PreloaderContext.Provider>
  );
}
