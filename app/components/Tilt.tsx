"use client";

import { useEffect, useRef, type ReactNode } from "react";

export default function Tilt({
  children,
  max = 8,
  scale = 1.02,
  glare = true,
  className,
}: {
  children: ReactNode;
  max?: number;
  scale?: number;
  glare?: boolean;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

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
    const glareEl = el.querySelector<HTMLElement>(".codlinx-tilt-glare");

    let raf = 0;
    let tx = 0;
    let ty = 0;
    let cx = 0;
    let cy = 0;
    let gx = 50;
    let gy = 50;
    let cgx = 50;
    let cgy = 50;
    let scl = 1;
    let tScl = 1;

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      tx = (y - 0.5) * -2 * max;
      ty = (x - 0.5) * 2 * max;
      gx = x * 100;
      gy = y * 100;
      tScl = scale;
    };

    const onLeave = () => {
      tx = 0;
      ty = 0;
      tScl = 1;
    };

    const tick = () => {
      cx += (tx - cx) * 0.12;
      cy += (ty - cy) * 0.12;
      scl += (tScl - scl) * 0.12;
      cgx += (gx - cgx) * 0.18;
      cgy += (gy - cgy) * 0.18;
      el.style.transform = `perspective(900px) rotateX(${cx.toFixed(2)}deg) rotateY(${cy.toFixed(2)}deg) scale(${scl.toFixed(3)})`;
      if (glareEl) {
        glareEl.style.background = `radial-gradient(circle at ${cgx.toFixed(1)}% ${cgy.toFixed(1)}%, rgba(255,255,255,0.22), transparent 55%)`;
      }
      raf = requestAnimationFrame(tick);
    };

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, [max, scale]);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        transformStyle: "preserve-3d",
        willChange: "transform",
        transition: "transform 220ms cubic-bezier(0.2,0.7,0.2,1)",
      }}
    >
      {children}
      {glare && (
        <span
          aria-hidden
          className="codlinx-tilt-glare pointer-events-none absolute inset-0 rounded-[inherit] mix-blend-overlay opacity-0 transition-opacity duration-300"
          style={{ opacity: 1 }}
        />
      )}
    </div>
  );
}
