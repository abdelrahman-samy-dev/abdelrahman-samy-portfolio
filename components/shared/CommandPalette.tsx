"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Search, FileText, FolderGit2, Link as LinkIcon, Mail, ArrowRight } from "lucide-react";
import { commandItems } from "@/constants/navigation";

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  // Filter items
  const filtered = search
    ? commandItems.filter((i) =>
        i.label.toLowerCase().includes(search.toLowerCase()) ||
        (i.description && i.description.toLowerCase().includes(search.toLowerCase()))
      )
    : commandItems;

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((o) => !o);
      }
      if (e.key === "Escape") setOpen(false);

      if (open) {
        if (e.key === "ArrowDown") {
          e.preventDefault();
          setSelectedIndex((s) => (s + 1) % filtered.length);
        }
        if (e.key === "ArrowUp") {
          e.preventDefault();
          setSelectedIndex((s) => (s - 1 + filtered.length) % filtered.length);
        }
        if (e.key === "Enter" && filtered[selectedIndex]) {
          e.preventDefault();
          executeCommand(filtered[selectedIndex]);
        }
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [open, filtered, selectedIndex]);

  useEffect(() => {
    if (open) {
      setSearch("");
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  useEffect(() => {
    setSelectedIndex(0); // Reset index on search change
  }, [search]);

  const executeCommand = (item: typeof commandItems[0]) => {
    setOpen(false);
    if (item.category === "navigation") {
      document.getElementById(item.action.replace("#", ""))?.scrollIntoView({ behavior: "smooth" });
    } else if (item.category === "external" || item.category === "action") {
      window.open(item.action, item.category === "external" ? "_blank" : "_self");
    }
  };

  const getIcon = (id: string, category: string) => {
    if (category === "external") {
      if (id === "github") return <FolderGit2 size={16} />;
      if (id === "linkedin") return <LinkIcon size={16} />;
      if (id === "resume") return <FileText size={16} />;
    }
    if (category === "action" && id === "email") return <Mail size={16} />;
    return <ArrowRight size={16} />;
  };

  return (
    <>
      {/* Modal */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-md"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.15 }}
              className="fixed inset-0 z-[101] flex items-start justify-center pt-[15vh] md:pt-[20vh] px-4 pointer-events-none"
            >
              <div
                className="w-full max-w-xl rounded-2xl overflow-hidden pointer-events-auto flex flex-col"
                style={{
                  background: "var(--bg-secondary)",
                  border: "1px solid var(--border)",
                  boxShadow: "0 24px 60px rgba(0,0,0,0.4)",
                }}
              >
                {/* Search Input */}
                <div className="flex items-center gap-3 px-4 py-4 border-b" style={{ borderColor: "var(--border-subtle)" }}>
                  <Search size={18} style={{ color: "var(--text-tertiary)" }} />
                  <input
                    ref={inputRef}
                    type="text"
                    placeholder="Search projects, sections, or actions..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="flex-1 bg-transparent text-[15px] outline-none"
                    style={{ color: "var(--text-primary)" }}
                  />
                  <kbd className="px-1.5 py-0.5 rounded text-[10px] font-mono hidden sm:block" style={{ background: "rgba(255,255,255,0.05)", color: "var(--text-tertiary)" }}>
                    ESC
                  </kbd>
                </div>

                {/* Results List */}
                <div className="max-h-[300px] overflow-y-auto p-2 scrollbar-none">
                  {filtered.length === 0 ? (
                    <div className="px-4 py-8 text-center text-[13px]" style={{ color: "var(--text-tertiary)" }}>
                      No results found for "{search}"
                    </div>
                  ) : (
                    filtered.map((item, i) => {
                      const isSelected = i === selectedIndex;
                      return (
                        <button
                          key={item.id}
                          onClick={() => executeCommand(item)}
                          onMouseEnter={() => setSelectedIndex(i)}
                          className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-left transition-colors"
                          style={{
                            background: isSelected ? "var(--accent-subtle)" : "transparent",
                          }}
                        >
                          <div className="flex items-center gap-3">
                            <div
                              className="p-1.5 rounded-lg transition-colors"
                              style={{
                                background: isSelected ? "var(--accent)" : "rgba(255,255,255,0.03)",
                                color: isSelected ? "var(--bg-primary)" : "var(--text-secondary)",
                              }}
                            >
                              {getIcon(item.id, item.category)}
                            </div>
                            <div className="flex flex-col">
                              <span className="text-[14px] font-medium transition-colors" style={{ color: isSelected ? "var(--text-primary)" : "var(--text-secondary)" }}>
                                {item.label}
                              </span>
                              {item.description && (
                                <span className="text-[12px]" style={{ color: "var(--text-tertiary)" }}>
                                  {item.description}
                                </span>
                              )}
                            </div>
                          </div>
                          {item.shortcut && (
                            <kbd className="px-1.5 py-0.5 rounded text-[10px] font-mono hidden sm:block" style={{ background: "rgba(255,255,255,0.05)", color: "var(--text-tertiary)" }}>
                              {item.shortcut}
                            </kbd>
                          )}
                        </button>
                      );
                    })
                  )}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
