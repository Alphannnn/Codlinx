"use client";

import { useEffect, useState } from "react";

/**
 * Full-bleed hero background slideshow: each image holds for `interval` ms,
 * then slides horizontally to the next. Decorative (aria-hidden), with a dark
 * gradient overlay so the hero copy stays readable.
 */
export default function HeroBackgroundSlideshow({
  images,
  interval = 5000,
}: {
  images: string[];
  interval?: number;
}) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;
    const id = setInterval(
      () => setIndex((p) => (p + 1) % images.length),
      interval
    );
    return () => clearInterval(id);
  }, [images.length, interval]);

  if (!images.length) return null;

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
    >
      <div
        className="flex h-full"
        style={{
          width: `${images.length * 100}%`,
          transform: `translateX(-${index * (100 / images.length)}%)`,
          transition: "transform 1200ms cubic-bezier(0.65, 0, 0.35, 1)",
        }}
      >
        {images.map((src, i) => (
          <div
            key={src}
            className="relative h-full"
            style={{ width: `${100 / images.length}%` }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={src}
              alt=""
              loading={i === 0 ? "eager" : "lazy"}
              className="absolute inset-0 h-full w-full object-cover object-center"
            />
          </div>
        ))}
      </div>

      {/* Readability overlays — keep the left (where the copy sits) dark. */}
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-black/35" />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-black/55" />
    </div>
  );
}
