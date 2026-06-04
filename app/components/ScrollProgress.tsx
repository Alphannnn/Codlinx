"use client";

import { useEffect, useRef } from "react";

const ACCENT = "#3FC9B4";

export default function ScrollProgress({
  color = ACCENT,
  height = 2,
  showPercent = false,
}: {
  color?: string;
  height?: number;
  showPercent?: boolean;
}) {
  const barRef = useRef<HTMLDivElement>(null);
  const percentRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const reduceMotion =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

    let raf = 0;
    let target = 0;
    let current = 0;

    const compute = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      target = docHeight > 0 ? Math.min(1, Math.max(0, scrollTop / docHeight)) : 0;
    };

    const tick = () => {
      current += (target - current) * (reduceMotion ? 1 : 0.18);
      if (barRef.current) {
        barRef.current.style.transform = `scaleX(${current})`;
      }
      if (percentRef.current) {
        percentRef.current.textContent = `${Math.round(current * 100)}%`;
      }
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
  }, []);

  return (
    <>
      <div
        aria-hidden
        className="fixed inset-x-0 top-16 z-40 origin-left lg:top-[72px]"
        style={{ height }}
      >
        <div
          ref={barRef}
          className="h-full origin-left"
          style={{
            background: `linear-gradient(90deg, transparent, ${color} 50%, ${color})`,
            transform: "scaleX(0)",
            boxShadow: `0 0 12px ${color}`,
            willChange: "transform",
          }}
        />
      </div>
      {showPercent && (
        <span
          ref={percentRef}
          className="fixed bottom-6 right-6 z-40 hidden rounded-full border border-white/15 bg-black/70 px-3 py-1 text-[11px] font-semibold tracking-wider text-white backdrop-blur-md md:inline-block"
        >
          0%
        </span>
      )}
    </>
  );
}
