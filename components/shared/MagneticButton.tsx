"use client";

import { useMagneticEffect } from "@/hooks/useMagneticEffect";

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  external?: boolean;
  disabled?: boolean;
}

export default function MagneticButton({
  children, className = "", href, onClick,
  variant = "primary", size = "md",
  external = false, disabled = false,
}: MagneticButtonProps) {
  const { ref, onMouseMove, onMouseLeave } = useMagneticEffect({ strength: 0.3, ease: 0.15 });

  const base = "inline-flex items-center justify-center gap-2 font-medium rounded-full transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2";
  const disabled_s = disabled ? "opacity-50 cursor-not-allowed pointer-events-none" : "";
  
  const sizes: Record<string, string> = {
    sm: "text-sm px-4 py-2",
    md: "text-sm px-6 py-3",
    lg: "text-base px-8 py-3.5",
  };

  const variantStyles: Record<string, React.CSSProperties> = {
    primary: {
      background: "var(--text-primary)", color: "var(--bg-primary)",
      boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
    },
    secondary: {
      background: "transparent", color: "var(--text-primary)",
      border: "1px solid var(--border)",
    },
    ghost: {
      background: "transparent", color: "var(--text-secondary)",
    },
  };

  const content = (
    <span className={`${base} ${sizes[size]} ${disabled_s} ${className}`} style={variantStyles[variant]}>
      {children}
    </span>
  );

  return (
    <div ref={ref} onMouseMove={onMouseMove} onMouseLeave={onMouseLeave} className="inline-block">
      {href ? (
        <a href={href} target={external ? "_blank" : undefined} rel={external ? "noopener noreferrer" : undefined} onClick={onClick}>
          {content}
        </a>
      ) : (
        <button onClick={onClick} disabled={disabled}>{content}</button>
      )}
    </div>
  );
}
