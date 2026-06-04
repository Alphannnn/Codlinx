"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Animated number counter. Parses a value like "120+", "4.9/5", "$2B+", "−42%" and
 * counts up the numeric portion when the element scrolls into view.
 * Preserves the original prefix/suffix exactly.
 */
export default function Counter({
  value,
  duration = 1600,
  delay = 0,
  className,
  style,
}: {
  value: string;
  duration?: number;
  delay?: number;
  className?: string;
  style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(() => initialFor(value));
  const playedRef = useRef(false);

  useEffect(() => {
    const reduceMotion =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

    const node = ref.current;
    if (!node) return;
    const match = value.match(/-?\d+(?:\.\d+)?/);

    if (reduceMotion || !match) {
      // Directly mutate DOM — avoid triggering a re-render from inside the effect.
      node.textContent = value;
      return;
    }
    const target = parseFloat(match[0]);
    const numericText = match[0];
    const startIndex = match.index ?? 0;
    const prefix = value.slice(0, startIndex);
    const suffix = value.slice(startIndex + numericText.length);
    const decimals = numericText.includes(".")
      ? numericText.split(".")[1].length
      : 0;

    const animate = () => {
      if (playedRef.current) return;
      playedRef.current = true;
      const start = performance.now() + delay;
      const from = 0;

      const easeOutExpo = (t: number) =>
        t === 1 ? 1 : 1 - Math.pow(2, -10 * t);

      const tick = (now: number) => {
        const t = Math.min(1, Math.max(0, (now - start) / duration));
        const eased = easeOutExpo(t);
        const current = from + (target - from) * eased;
        setDisplay(prefix + current.toFixed(decimals) + suffix);
        if (t < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          animate();
          io.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    io.observe(node);
    return () => io.disconnect();
  }, [value, duration, delay]);

  return (
    <span ref={ref} className={className} style={style}>
      {display}
    </span>
  );
}

function initialFor(value: string): string {
  const match = value.match(/-?\d+(?:\.\d+)?/);
  if (!match) return value;
  const numericText = match[0];
  const startIndex = match.index ?? 0;
  const prefix = value.slice(0, startIndex);
  const suffix = value.slice(startIndex + numericText.length);
  const decimals = numericText.includes(".")
    ? numericText.split(".")[1].length
    : 0;
  return prefix + (0).toFixed(decimals) + suffix;
}
