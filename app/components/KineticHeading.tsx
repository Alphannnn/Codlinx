"use client";

import { useEffect, useRef, type CSSProperties } from "react";

/**
 * Renders a heading where each word animates in on intersection.
 * Optionally highlights specific words with a gradient.
 */
export default function KineticHeading({
  text,
  highlight,
  as = "h1",
  className,
  highlightClassName,
  delayStep = 60,
  style,
}: {
  text: string;
  highlight?: string;
  as?: "h1" | "h2" | "h3";
  className?: string;
  highlightClassName?: string;
  delayStep?: number;
  style?: CSSProperties;
}) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const reduceMotion =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    const node = ref.current;
    if (!node) return;

    const words = node.querySelectorAll<HTMLElement>(".khw");
    if (reduceMotion) {
      words.forEach((w) => {
        w.style.transform = "none";
        w.style.opacity = "1";
      });
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            words.forEach((w, i) => {
              w.style.transitionDelay = `${i * delayStep}ms`;
              w.style.transform = "translate3d(0,0,0)";
              w.style.opacity = "1";
            });
            io.disconnect();
          }
        });
      },
      { threshold: 0.2 }
    );
    io.observe(node);
    return () => io.disconnect();
  }, [delayStep, text, highlight]);

  const parts = (highlight ? text.split(highlight) : [text]).flatMap(
    (part, i, arr) =>
      i < arr.length - 1
        ? [{ t: part, h: false }, { t: highlight!, h: true }]
        : [{ t: part, h: false }]
  );

  const Tag = as;
  return (
    <Tag
      ref={ref as React.RefObject<HTMLHeadingElement>}
      className={className}
      style={style}
    >
      {parts.map((p, i) => {
        const words = p.t.split(/(\s+)/);
        return (
          <span key={i} className={p.h ? highlightClassName : undefined}>
            {words.map((w, j) =>
              w.trim() === "" ? (
                <span key={j}>{w}</span>
              ) : (
                <span key={j} className="inline-block overflow-hidden align-baseline">
                  <span
                    className="khw inline-block will-change-transform"
                    style={{
                      opacity: 0,
                      transform: "translate3d(0,110%,0)",
                      transition:
                        "transform 760ms cubic-bezier(0.22,1,0.36,1), opacity 600ms ease-out",
                    }}
                  >
                    {w}
                  </span>
                </span>
              )
            )}
          </span>
        );
      })}
    </Tag>
  );
}
