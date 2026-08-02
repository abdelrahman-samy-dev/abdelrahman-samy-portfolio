"use client";

import { createContext, useContext, useEffect, useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";

const TOTAL_FRAMES = 96;
const FRAME_PATH = "/images/hero-sequence/ezgif-frame-";

function getFrameSrc(index: number): string {
  const num = String(Math.min(Math.max(index, 1), TOTAL_FRAMES)).padStart(3, "0");
  return `${FRAME_PATH}${num}.png`;
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
  const [loaded, setLoaded] = useState(false);
  const [progress, setProgress] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const imagesRef = useRef<HTMLImageElement[]>([]);

  // Preload all hero frames
  useEffect(() => {
    let loadedCount = 0;
    const images: HTMLImageElement[] = [];

    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = getFrameSrc(i);
      img.onload = () => {
        loadedCount++;
        setProgress(Math.floor((loadedCount / TOTAL_FRAMES) * 100));
        if (loadedCount === TOTAL_FRAMES) {
          imagesRef.current = images;
          // Small delay after 100% for visual satisfaction
          setTimeout(() => setLoaded(true), 400);
        }
      };
      img.onerror = () => {
        loadedCount++;
        setProgress(Math.floor((loadedCount / TOTAL_FRAMES) * 100));
        if (loadedCount === TOTAL_FRAMES) {
          imagesRef.current = images;
          setTimeout(() => setLoaded(true), 400);
        }
      };
      images.push(img);
    }
  }, []);

  // After exit animation completes, mark as fully revealed
  const handleExitComplete = useCallback(() => {
    setRevealed(true);
  }, []);

  return (
    <PreloaderContext.Provider value={{ images: imagesRef.current, loaded }}>
      {/* Loading Screen */}
      <AnimatePresence onExitComplete={handleExitComplete}>
        {!loaded && (
          <motion.div
            key="preloader"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
            style={{ background: "var(--bg-primary)" }}
          >
            {/* Decorative top line */}
            <motion.div
              className="absolute top-0 left-0 right-0 h-[2px]"
              initial={{ scaleX: 0, transformOrigin: "left" }}
              animate={{ scaleX: progress / 100 }}
              transition={{ type: "tween", ease: "linear", duration: 0.15 }}
              style={{ background: "linear-gradient(90deg, var(--accent), var(--accent-secondary))" }}
            />

            <div className="flex flex-col items-center gap-8">
              {/* Logo / Initials */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="w-14 h-14 rounded-2xl border flex items-center justify-center"
                style={{
                  borderColor: "var(--border-subtle)",
                  background: "rgba(255,255,255,0.02)",
                }}
              >
                <span
                  className="font-display font-bold text-xl tracking-tight"
                  style={{ color: "var(--text-primary)" }}
                >
                  A
                </span>
              </motion.div>

              {/* Percentage */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="flex items-baseline gap-1"
              >
                <span
                  className="font-display font-bold tracking-tighter tabular-nums"
                  style={{
                    fontSize: "clamp(3.5rem, 8vw, 6rem)",
                    lineHeight: 1,
                    color: "var(--text-primary)",
                  }}
                >
                  {progress}
                </span>
                <span
                  className="text-lg md:text-2xl font-display font-bold"
                  style={{ color: "var(--text-tertiary)" }}
                >
                  %
                </span>
              </motion.div>

              {/* Progress bar */}
              <div className="relative w-[200px] md:w-[280px]">
                <div
                  className="w-full h-[1px] rounded-full"
                  style={{ background: "rgba(255,255,255,0.06)" }}
                />
                <motion.div
                  className="absolute top-0 left-0 h-[1px] rounded-full"
                  style={{
                    width: `${progress}%`,
                    background: "var(--text-primary)",
                  }}
                  transition={{ type: "tween", ease: "linear", duration: 0.1 }}
                />
              </div>

              {/* Label */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="text-[10px] font-mono tracking-[0.25em] uppercase"
                style={{ color: "var(--text-tertiary)" }}
              >
                Loading Experience
              </motion.p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Lock scroll during loading */}
      {!revealed && loaded === false && (
        <style>{`html, body { overflow: hidden !important; height: 100vh !important; }`}</style>
      )}

      {/* Page content — always mounted so it starts hydrating */}
      <div style={{ visibility: loaded || revealed ? "visible" : "hidden" }}>
        {children}
      </div>
    </PreloaderContext.Provider>
  );
}
