"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Wraps a child and gives it a magnetic hover effect: cursor pulls the element
 * (and a nested .magnetic-inner if present) toward it, with smooth easing.
 * Disabled on touch + reduced-motion.
 */
export default function Magnetic({
  children,
  strength = 0.35,
  innerStrength = 0.45,
  radius = 90,
  className,
}: {
  children: ReactNode;
  strength?: number;
  innerStrength?: number;
  radius?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const isTouch =
      typeof window !== "undefined" &&
      (window.matchMedia?.("(hover: none)").matches ||
        "ontouchstart" in window);
    const reduceMotion =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (isTouch || reduceMotion) return;

    const el = ref.current;
    if (!el) return;
    const inner = el.querySelector<HTMLElement>(".magnetic-inner");

    let tx = 0,
      ty = 0,
      cx = 0,
      cy = 0,
      raf = 0,
      active = false,
      ix = 0,
      iy = 0,
      icx = 0,
      icy = 0;

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - (rect.left + rect.width / 2);
      const y = e.clientY - (rect.top + rect.height / 2);
      const dist = Math.hypot(x, y);
      const maxDist =
        Math.max(rect.width, rect.height) / 2 + radius;
      if (dist > maxDist) {
        if (active) {
          tx = 0;
          ty = 0;
          ix = 0;
          iy = 0;
          active = false;
        }
        return;
      }
      active = true;
      tx = x * strength;
      ty = y * strength;
      ix = x * innerStrength;
      iy = y * innerStrength;
    };

    const onLeave = () => {
      tx = 0;
      ty = 0;
      ix = 0;
      iy = 0;
      active = false;
    };

    const tick = () => {
      cx += (tx - cx) * 0.18;
      cy += (ty - cy) * 0.18;
      icx += (ix - icx) * 0.22;
      icy += (iy - icy) * 0.22;
      el.style.transform = `translate3d(${cx}px, ${cy}px, 0)`;
      if (inner) {
        inner.style.transform = `translate3d(${icx}px, ${icy}px, 0)`;
      }
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    el.addEventListener("mouseleave", onLeave);
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, [strength, innerStrength, radius]);

  return (
    <span
      ref={ref}
      className={className}
      style={{ display: "inline-block", willChange: "transform" }}
    >
      {children}
    </span>
  );
}
