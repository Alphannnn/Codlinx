"use client";

import Link from "next/link";
import { useEffect } from "react";

const ACCENT = "#3FC9B4";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    if (typeof window !== "undefined") {
      console.error("[codlinx:error]", error);
    }
  }, [error]);

  return (
    <section className="relative isolate flex flex-1 flex-col items-center justify-center overflow-hidden bg-black px-5 py-24 text-white sm:px-8 sm:py-32">
      <div
        aria-hidden
        className="absolute inset-0 -z-10 opacity-[0.16]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage:
            "radial-gradient(ellipse 70% 60% at 50% 40%, black 30%, transparent 75%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 70% 60% at 50% 40%, black 30%, transparent 75%)",
        }}
      />
      <div
        aria-hidden
        className="absolute left-1/2 top-[-200px] -z-10 h-[460px] w-[900px] -translate-x-1/2 rounded-full opacity-30 blur-[120px]"
        style={{
          background: `radial-gradient(circle, ${ACCENT} 0%, transparent 70%)`,
        }}
      />

      <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] text-white/70 backdrop-blur-md">
        <span
          className="h-1 w-1 rounded-full"
          style={{ backgroundColor: ACCENT }}
        />
        Something broke
      </span>

      <h1
        className="mt-6 max-w-3xl text-balance text-center text-5xl font-semibold leading-[1.05] tracking-tight sm:text-6xl"
        style={{
          backgroundImage: `linear-gradient(120deg, #ffffff 0%, ${ACCENT} 100%)`,
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
          color: "transparent",
        }}
      >
        That didn&apos;t go to plan.
      </h1>

      <p className="mt-6 max-w-xl text-pretty text-center text-base leading-relaxed text-white/65 sm:text-lg">
        We&apos;ve logged this and we&apos;re looking into it. Try again in a moment, or head back home.
      </p>

      {error?.digest && (
        <p className="mt-3 font-mono text-xs text-white/40">
          Ref: {error.digest}
        </p>
      )}

      <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row">
        <button
          type="button"
          onClick={reset}
          className="group relative inline-flex h-12 items-center gap-2 overflow-hidden rounded-full bg-white px-6 text-sm font-semibold text-black transition-transform duration-300 hover:scale-[1.03]"
        >
          <span
            aria-hidden
            className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 group-hover:translate-x-full"
          />
          <span className="relative">Try again</span>
        </button>
        <Link
          href="/"
          className="inline-flex h-12 items-center gap-2 rounded-full border border-white/15 bg-white/[0.03] px-6 text-sm font-medium text-white backdrop-blur-md transition-colors duration-200 hover:border-white/25 hover:bg-white/[0.06]"
        >
          Back to home
        </Link>
      </div>
    </section>
  );
}
