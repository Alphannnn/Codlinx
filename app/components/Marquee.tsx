"use client";

import type { ReactNode } from "react";

export default function Marquee({
  children,
  className,
  pauseOnHover = true,
  gapClass = "gap-12 sm:gap-16",
  fadeEdges = true,
}: {
  children: ReactNode;
  className?: string;
  pauseOnHover?: boolean;
  gapClass?: string;
  fadeEdges?: boolean;
}) {
  return (
    <div
      className={[
        "codlinx-marquee relative overflow-hidden",
        className ?? "",
      ].join(" ")}
      style={
        fadeEdges
          ? {
              maskImage:
                "linear-gradient(90deg, transparent, black 10%, black 90%, transparent)",
              WebkitMaskImage:
                "linear-gradient(90deg, transparent, black 10%, black 90%, transparent)",
            }
          : undefined
      }
      onMouseEnter={pauseOnHover ? undefined : undefined}
    >
      <div className={`codlinx-marquee-track flex w-max ${gapClass}`}>
        <div className={`flex shrink-0 items-center ${gapClass}`}>
          {children}
        </div>
        <div aria-hidden className={`flex shrink-0 items-center ${gapClass}`}>
          {children}
        </div>
      </div>
    </div>
  );
}
