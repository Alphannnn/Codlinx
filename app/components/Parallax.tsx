"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Translates its child along Y as the viewport scrolls past it.
 * Speed > 0 moves opposite to scroll (back), < 0 with scroll (forward).
 */
export default function Parallax({
  children,
  speed = 0.15,
  className,
}: {
  children: ReactNode;
  speed?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduceMotion =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    let target = 0;
    let current = 0;

    const compute = () => {
      const rect = el.getBoundingClientRect();
      const viewport = window.innerHeight;
      const middle = rect.top + rect.height / 2;
      const distance = middle - viewport / 2;
      target = -distance * speed;
    };

    const tick = () => {
      current += (target - current) * 0.12;
      el.style.transform = `translate3d(0, ${current.toFixed(2)}px, 0)`;
      raf = requestAnimationFrame(tick);
    };

    compute();
    window.addEventListener("scroll", compute, { passive: true });
    window.addEventListener("resize", compute);
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", compute);
      window.removeEventListener("resize", compute);
    };
  }, [speed]);

  return (
    <div
      ref={ref}
      className={className}
      style={{ willChange: "transform" }}
    >
      {children}
    </div>
  );
}
