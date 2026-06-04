"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Wraps a card with a mouse-tracking radial spotlight & subtle border highlight.
 * The light follows the cursor across the card surface.
 */
export default function SpotlightCard({
  children,
  color = "rgba(63,201,180,0.18)",
  borderColor = "rgba(63,201,180,0.45)",
  className,
  radius = 320,
}: {
  children: ReactNode;
  color?: string;
  borderColor?: string;
  className?: string;
  radius?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduceMotion =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    const isTouch =
      typeof window !== "undefined" &&
      (window.matchMedia?.("(hover: none)").matches ||
        "ontouchstart" in window);
    if (reduceMotion || isTouch) return;

    const el = ref.current;
    if (!el) return;

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      el.style.setProperty("--mx", `${x}px`);
      el.style.setProperty("--my", `${y}px`);
      el.style.setProperty("--opacity", "1");
    };
    const onLeave = () => {
      el.style.setProperty("--opacity", "0");
    };
    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <div
      ref={ref}
      className={`group relative ${className ?? ""}`}
      style={
        {
          "--mx": "50%",
          "--my": "50%",
          "--opacity": "0",
          "--spot-color": color,
          "--spot-border": borderColor,
          "--spot-radius": `${radius}px`,
        } as React.CSSProperties
      }
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-[inherit] transition-opacity duration-300"
        style={{
          opacity: "var(--opacity)",
          background:
            "radial-gradient(var(--spot-radius) circle at var(--mx) var(--my), var(--spot-color), transparent 60%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-[inherit] transition-opacity duration-300"
        style={{
          opacity: "var(--opacity)",
          background:
            "radial-gradient(var(--spot-radius) circle at var(--mx) var(--my), var(--spot-border), transparent 50%)",
          mask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
          WebkitMask:
            "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
          maskComposite: "exclude",
          WebkitMaskComposite: "xor",
          padding: "1px",
        }}
      />
      {children}
    </div>
  );
}
