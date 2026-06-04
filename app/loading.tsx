const ACCENT = "#3FC9B4";

export default function Loading() {
  return (
    <div
      aria-busy="true"
      aria-live="polite"
      role="status"
      className="relative isolate flex flex-1 flex-col items-center justify-center overflow-hidden bg-black px-5 py-24 text-white sm:px-8"
    >
      <div
        aria-hidden
        className="absolute inset-0 -z-10 opacity-[0.10]"
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
        className="absolute left-1/2 top-[-180px] -z-10 h-[420px] w-[820px] -translate-x-1/2 rounded-full opacity-25 blur-[120px]"
        style={{
          background: `radial-gradient(circle, ${ACCENT} 0%, transparent 70%)`,
        }}
      />

      <div className="relative flex items-center gap-3">
        <span
          className="inline-block h-3 w-3 rounded-full"
          style={{
            backgroundColor: ACCENT,
            animation: "codlinx-pulse-ring 1.6s ease-out infinite",
          }}
        />
        <span className="inline-block h-3 w-3 rounded-full bg-white/40">
          <span className="sr-only">Loading</span>
        </span>
        <span className="inline-block h-3 w-3 rounded-full bg-white/20" />
      </div>
      <p className="mt-6 text-[11px] font-semibold uppercase tracking-[0.32em] text-white/55">
        Loading…
      </p>
    </div>
  );
}
