"use client";

import { useEffect, useRef } from "react";

/**
 * Autoplaying, muted, looping ad clip. Sets `muted` as a property (some
 * browsers ignore the attribute and then block autoplay) and only plays once
 * the frame scrolls into view — so off-screen clips don't burn bandwidth.
 * Honors prefers-reduced-motion by leaving the first frame paused.
 */
export default function AdVideo({
  src,
  poster,
  className,
}: {
  src: string;
  poster?: string;
  className?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    v.muted = true;

    const reduceMotion =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          void v.play().catch(() => {});
        } else {
          v.pause();
        }
      },
      { threshold: 0.25 }
    );
    io.observe(v);
    return () => io.disconnect();
  }, []);

  return (
    <video
      ref={ref}
      className={className}
      src={src}
      poster={poster}
      muted
      loop
      playsInline
      preload="metadata"
      autoPlay
    />
  );
}
