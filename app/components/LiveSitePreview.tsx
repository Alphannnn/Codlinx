"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  url: string;
  swatch: string;
  hue: string;
  label?: string;
};

export default function LiveSitePreview({ url, swatch, hue, label }: Props) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);
  const loadTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const domain = (() => {
    try {
      return new URL(url).host.replace(/^www\./, "");
    } catch {
      return url;
    }
  })();

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          io.disconnect();
        }
      },
      { rootMargin: "200px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!shouldLoad || loaded) return;
    loadTimerRef.current = setTimeout(() => {
      if (!loaded) setFailed(true);
    }, 6500);
    return () => {
      if (loadTimerRef.current) clearTimeout(loadTimerRef.current);
    };
  }, [shouldLoad, loaded]);

  return (
    <div
      ref={wrapRef}
      className="group/preview absolute inset-0 overflow-hidden"
      style={{
        background: `radial-gradient(circle at 30% 20%, ${hue}, transparent 65%), linear-gradient(135deg, #0a0a0b 0%, #111114 100%)`,
      }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-40 mix-blend-screen transition-opacity duration-700 group-hover/preview:opacity-60"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="absolute inset-0 flex items-center justify-center p-6">
        <div
          className="codlinx-preview-frame relative w-full overflow-hidden rounded-xl border border-white/10 bg-black shadow-[0_30px_80px_-40px_rgba(0,0,0,0.7)] transition-transform duration-700 ease-out group-hover/preview:scale-[1.03]"
          style={{ aspectRatio: "16 / 10" }}
        >
          <div className="flex items-center gap-1.5 border-b border-white/[0.06] bg-black/70 px-3 py-2 backdrop-blur">
            <span className="h-2 w-2 rounded-full bg-red-400/70" />
            <span className="h-2 w-2 rounded-full bg-yellow-400/70" />
            <span className="h-2 w-2 rounded-full bg-green-400/70" />
            <span className="ml-2 truncate text-[10px] font-medium text-white/55">
              {domain}
            </span>
            <span
              className="ml-auto inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/[0.04] px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-[0.18em] text-white/65"
            >
              <span
                className="h-1 w-1 rounded-full"
                style={{
                  backgroundColor: swatch,
                  animation: "codlinx-grid-pulse 1.4s ease-in-out infinite",
                }}
              />
              live
            </span>
          </div>

          <div className="relative h-[calc(100%-30px)] bg-white">
            {shouldLoad && !failed && (
              <iframe
                src={url}
                title={`${domain} live preview`}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                sandbox="allow-scripts allow-same-origin"
                onLoad={() => {
                  setLoaded(true);
                  if (loadTimerRef.current) clearTimeout(loadTimerRef.current);
                }}
                className="pointer-events-none absolute left-0 top-0 origin-top-left border-0"
                style={{
                  width: "166.66%",
                  height: "166.66%",
                  transform: "scale(0.6)",
                  opacity: loaded ? 1 : 0,
                  transition: "opacity 0.6s ease-out",
                }}
              />
            )}

            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 flex items-center justify-center transition-opacity duration-500"
              style={{
                background: `linear-gradient(135deg, ${hue}, transparent 70%), #0a0a0b`,
                opacity: loaded ? 0 : 1,
              }}
            >
              <div className="flex flex-col items-center gap-3 text-center">
                <span
                  className="grid h-12 w-12 place-items-center rounded-2xl text-base font-bold text-black"
                  style={{ backgroundColor: swatch }}
                >
                  {(label || domain).charAt(0).toUpperCase()}
                </span>
                <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/70">
                  {failed ? "Live · embed blocked" : "Loading live preview…"}
                </div>
                <div className="text-xs text-white/45">{domain}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="codlinx-preview-cta absolute bottom-4 right-4 inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-black/70 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/90 backdrop-blur-md transition-all duration-300 hover:border-white/35 hover:bg-black/90"
        onClick={(e) => e.stopPropagation()}
      >
        <span
          className="h-1.5 w-1.5 rounded-full"
          style={{ backgroundColor: swatch }}
        />
        Open live
        <svg
          viewBox="0 0 16 16"
          className="h-2.5 w-2.5"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
        >
          <path d="M6 3h7v7M13 3L4 12" />
        </svg>
      </a>
    </div>
  );
}
