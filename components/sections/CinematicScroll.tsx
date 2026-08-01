"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";

const TOTAL_FRAMES = 96;
const FRAME_PATH = "/images/hero-sequence/ezgif-frame-";

function getFrameSrc(index: number): string {
  const num = String(Math.min(Math.max(index, 1), TOTAL_FRAMES)).padStart(3, "0");
  return `${FRAME_PATH}${num}.png`;
}

export default function CinematicScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef(0);
  const [loaded, setLoaded] = useState(false);
  const [progress, setProgress] = useState(0);

  // Preload all frames
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
          setLoaded(true);
          // Draw first frame
          drawFrame(0, images);
        }
      };
      img.onerror = () => {
        loadedCount++;
        if (loadedCount === TOTAL_FRAMES) {
          imagesRef.current = images;
          setLoaded(true);
        }
      };
      images.push(img);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const drawFrame = useCallback((index: number, imgs?: HTMLImageElement[]) => {
    const canvas = canvasRef.current;
    const images = imgs || imagesRef.current;
    if (!canvas || !images[index]) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = images[index];
    if (!img.complete || img.naturalWidth === 0) return;

    // Set canvas size to match window (retina)
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = window.innerWidth;
    const h = window.innerHeight;

    if (canvas.width !== w * dpr || canvas.height !== h * dpr) {
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.scale(dpr, dpr);
    }

    // Cover fit the image
    const imgRatio = img.naturalWidth / img.naturalHeight;
    const canvasRatio = w / h;
    let drawW: number, drawH: number, drawX: number, drawY: number;

    if (imgRatio > canvasRatio) {
      // Cover logic: fit to height, center width
      drawH = h;
      drawW = h * imgRatio;
      drawX = (w - drawW) / 2;
      drawY = 0;
    } else {
      // Cover logic: fit to width, center height
      drawW = w;
      drawH = w / imgRatio;
      drawX = 0;
      drawY = (h - drawH) / 2;
    }

    ctx.clearRect(0, 0, w, h);
    ctx.drawImage(img, drawX, drawY, drawW, drawH);
  }, []);

  // Scroll handler — map scroll position to frame index
  useEffect(() => {
    if (!loaded) return;

    const handleScroll = () => {
      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const containerTop = rect.top;
      const containerHeight = rect.height - window.innerHeight;

      // progress: 0 at top, 1 at bottom
      const scrollProgress = Math.min(Math.max(-containerTop / containerHeight, 0), 1);
      const frameIndex = Math.min(
        Math.floor(scrollProgress * (TOTAL_FRAMES - 1)),
        TOTAL_FRAMES - 1
      );

      if (frameIndex !== currentFrameRef.current) {
        currentFrameRef.current = frameIndex;
        requestAnimationFrame(() => drawFrame(frameIndex));
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial draw
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loaded, drawFrame]);

  // Resize handler
  useEffect(() => {
    const handleResize = () => {
      if (loaded) drawFrame(currentFrameRef.current);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [loaded, drawFrame]);

  return (
    <div
      ref={containerRef}
      className="relative"
      style={{ height: "300vh" }} /* Scroll distance = 3x viewport */
    >
      {/* Sticky canvas */}
      <div className="sticky top-0 w-full h-screen overflow-hidden">
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full"
        />

        {/* Dark overlay to blend image edges into background and improve text readability */}
        <div
          className="absolute inset-0"
          style={{
            background: "radial-gradient(circle, transparent 20%, rgba(12,12,16,0.5) 60%, rgba(12,12,16,1) 100%)",
          }}
        />

        {/* Breathtaking Loading Sequence */}
        <AnimatePresence>
          {!loaded && (
            <motion.div
              exit={{ opacity: 0, filter: "blur(20px)" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0 flex flex-col items-center justify-center z-50"
              style={{ background: "var(--bg-primary)" }}
            >
              <div className="flex flex-col items-center gap-6">
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  className="text-[9px] font-mono tracking-[0.3em] uppercase"
                  style={{ color: "var(--text-tertiary)" }}
                >
                  Loading Experience
                </motion.div>
                
                <div className="font-display font-bold tracking-tighter" style={{ fontSize: "clamp(4rem, 10vw, 8rem)", lineHeight: 1, color: "var(--text-primary)" }}>
                  {progress}
                  <span className="text-2xl md:text-4xl text-neutral-600 align-top ml-2">%</span>
                </div>

                <div className="w-[180px] md:w-[240px] h-[1px] relative overflow-hidden mt-2" style={{ background: "rgba(255,255,255,0.05)" }}>
                  <motion.div
                    className="absolute inset-y-0 left-0"
                    style={{ width: `${progress}%`, background: "var(--text-primary)" }}
                    transition={{ type: "tween", ease: "linear", duration: 0.1 }}
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
