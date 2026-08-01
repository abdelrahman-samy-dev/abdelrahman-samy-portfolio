"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Terminal, Cpu, Monitor, Zap } from "lucide-react";

export default function DeveloperMode() {
  const [devMode, setDevMode] = useState(false);
  const [fps, setFps] = useState(0);
  const [stats, setStats] = useState({ width: 0, height: 0, scrollY: 0 });
  const framesRef = useRef(0);
  const requestRef = useRef<number>(0);
  const lastTimeRef = useRef(performance.now());

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      // Toggle on Shift + D (to avoid triggering when typing in inputs)
      if (e.key === "D" && e.shiftKey) {
        setDevMode((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  useEffect(() => {
    if (devMode) {
      document.body.classList.add("dev-mode-active");
      
      const updateStats = () => {
        setStats({
          width: window.innerWidth,
          height: window.innerHeight,
          scrollY: Math.round(window.scrollY),
        });
      };
      
      const calcFPS = () => {
        framesRef.current++;
        const now = performance.now();
        if (now - lastTimeRef.current >= 1000) {
          setFps(framesRef.current);
          framesRef.current = 0;
          lastTimeRef.current = now;
        }
        requestRef.current = requestAnimationFrame(calcFPS);
      };

      window.addEventListener("scroll", updateStats, { passive: true });
      window.addEventListener("resize", updateStats);
      updateStats();
      requestRef.current = requestAnimationFrame(calcFPS);

      return () => {
        document.body.classList.remove("dev-mode-active");
        window.removeEventListener("scroll", updateStats);
        window.removeEventListener("resize", updateStats);
        cancelAnimationFrame(requestRef.current);
      };
    }
  }, [devMode]);

  return (
    <AnimatePresence>
      {devMode && (
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="fixed top-6 left-6 z-[999] pointer-events-none"
        >
          <div
            className="flex flex-col gap-3 p-4 rounded-xl backdrop-blur-md font-mono text-[11px]"
            style={{
              background: "rgba(12, 12, 16, 0.8)",
              border: "1px solid var(--success)",
              color: "var(--success)",
              boxShadow: "0 0 20px rgba(52,211,153,0.15)",
            }}
          >
            <div className="flex items-center gap-2 border-b pb-2 mb-1" style={{ borderColor: "rgba(52,211,153,0.2)" }}>
              <Terminal size={14} />
              <span className="font-bold tracking-widest uppercase">Developer Mode</span>
            </div>

            <div className="flex items-center gap-3">
              <Zap size={14} className="opacity-70" />
              <div className="flex flex-col">
                <span className="opacity-50">Performance</span>
                <span>{fps} FPS</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Monitor size={14} className="opacity-70" />
              <div className="flex flex-col">
                <span className="opacity-50">Viewport</span>
                <span>{stats.width} x {stats.height}</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Cpu size={14} className="opacity-70" />
              <div className="flex flex-col">
                <span className="opacity-50">Scroll Position</span>
                <span>{stats.scrollY}px</span>
              </div>
            </div>
            
            <div className="mt-2 pt-2 border-t text-[9px] opacity-50" style={{ borderColor: "rgba(52,211,153,0.2)" }}>
              Press Shift + D to exit
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
