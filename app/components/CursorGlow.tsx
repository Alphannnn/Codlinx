"use client";

import { useEffect, useRef } from "react";

/**
 * A premium mouse-following spotlight blob.
 * Uses smooth lerp interpolation on requestAnimationFrame.
 * Auto-disables on touch devices, on `prefers-reduced-motion`, and when window is hidden.
 */
export default function CursorGlow({
  size = 520,
  color = "rgba(63, 201, 180, 0.18)",
  trailColor = "rgba(255, 255, 255, 0.06)",
}: {
  size?: number;
  color?: string;
  trailColor?: string;
}) {
  const blobRef = useRef<HTMLDivElement>(null);
  const trailRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isTouch =
      typeof window !== "undefined" &&
      (window.matchMedia?.("(hover: none)").matches ||
        "ontouchstart" in window);
    const reduceMotion =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

    if (isTouch || reduceMotion) return;

    const blob = blobRef.current;
    const trail = trailRef.current;
    const dot = dotRef.current;
    if (!blob || !trail || !dot) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let blobX = mouseX;
    let blobY = mouseY;
    let trailX = mouseX;
    let trailY = mouseY;
    let raf = 0;
    let visible = false;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!visible) {
        visible = true;
        blob.style.opacity = "1";
        trail.style.opacity = "1";
        dot.style.opacity = "1";
      }
    };

    const onLeave = () => {
      visible = false;
      blob.style.opacity = "0";
      trail.style.opacity = "0";
      dot.style.opacity = "0";
    };

    const tick = () => {
      // Fast-following crisp dot
      dot.style.transform = `translate3d(${mouseX - 3}px, ${mouseY - 3}px, 0)`;
      // Medium-eased trail
      trailX += (mouseX - trailX) * 0.22;
      trailY += (mouseY - trailY) * 0.22;
      trail.style.transform = `translate3d(${trailX - 16}px, ${trailY - 16}px, 0)`;
      // Slow large blob
      blobX += (mouseX - blobX) * 0.085;
      blobY += (mouseY - blobY) * 0.085;
      blob.style.transform = `translate3d(${blobX - size / 2}px, ${blobY - size / 2}px, 0)`;
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseleave", onLeave);
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
    };
  }, [size]);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[60] mix-blend-screen">
      <div
        ref={blobRef}
        style={{
          width: size,
          height: size,
          background: `radial-gradient(circle, ${color} 0%, transparent 60%)`,
          opacity: 0,
          willChange: "transform, opacity",
          transition: "opacity 400ms ease-out",
        }}
        className="absolute left-0 top-0 rounded-full blur-2xl"
      />
      <div
        ref={trailRef}
        style={{
          width: 32,
          height: 32,
          background: `radial-gradient(circle, ${trailColor}, transparent 70%)`,
          opacity: 0,
          willChange: "transform, opacity",
          transition: "opacity 400ms ease-out",
        }}
        className="absolute left-0 top-0 rounded-full"
      />
      <div
        ref={dotRef}
        style={{
          width: 6,
          height: 6,
          background: "rgba(63, 201, 180, 0.9)",
          boxShadow: "0 0 12px rgba(63, 201, 180, 0.8)",
          opacity: 0,
          willChange: "transform, opacity",
          transition: "opacity 400ms ease-out",
        }}
        className="absolute left-0 top-0 rounded-full"
      />
    </div>
  );
}
