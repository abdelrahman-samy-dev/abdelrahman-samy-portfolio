"use client";

import { useRef, useEffect, useCallback } from "react";
import { usePreloadedImages } from "@/components/shared/Preloader";

const TOTAL_FRAMES = 96;

export default function CinematicScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const currentFrameRef = useRef(0);
  const { images, loaded } = usePreloadedImages();

  const drawFrame = useCallback((index: number, imgs?: HTMLImageElement[]) => {
    const canvas = canvasRef.current;
    const sourceImages = imgs || images;
    if (!canvas || !sourceImages[index]) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = sourceImages[index];
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
      drawH = h;
      drawW = h * imgRatio;
      drawX = (w - drawW) / 2;
      drawY = 0;
    } else {
      drawW = w;
      drawH = w / imgRatio;
      drawX = 0;
      drawY = (h - drawH) / 2;
    }

    ctx.clearRect(0, 0, w, h);
    ctx.drawImage(img, drawX, drawY, drawW, drawH);
  }, [images]);

  // Draw first frame when loaded
  useEffect(() => {
    if (loaded && images.length > 0) {
      drawFrame(0, images);
    }
  }, [loaded, images, drawFrame]);

  // Scroll handler — map scroll position to frame index
  useEffect(() => {
    if (!loaded) return;

    const handleScroll = () => {
      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const containerTop = rect.top;
      const containerHeight = rect.height - window.innerHeight;

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
    handleScroll();
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
      style={{ height: "300vh" }}
    >
      {/* Sticky canvas */}
      <div className="sticky top-0 w-full h-screen overflow-hidden">
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full"
        />

        {/* Dark overlay to blend image edges into background */}
        <div
          className="absolute inset-0"
          style={{
            background: "radial-gradient(circle, transparent 20%, rgba(12,12,16,0.5) 60%, rgba(12,12,16,1) 100%)",
          }}
        />
      </div>
    </div>
  );
}

