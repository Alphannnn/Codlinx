"use client";

import { useEffect, useRef, useState } from "react";

export type PulseDay = {
  label: string;          // e.g. "Mon"
  shortDate: string;      // e.g. "20"
  iso: string;
  value: number;
  isToday?: boolean;
};

/**
 * Dramatic 7-day "studio pulse" visualization. Each day is a glowing pillar
 * that rises from the baseline with a stagger. Today gets a pulsing ring.
 * Hover scrubs a thin glow line under the column. Clean, calm, and alive.
 */
export default function StudioPulse({ days }: { days: PulseDay[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const [hover, setHover] = useState<number | null>(null);
  const [armed, setArmed] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setArmed(true);
          io.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    io.observe(node);
    return () => io.disconnect();
  }, []);

  const max = Math.max(1, ...days.map((d) => d.value));
  const total = days.reduce((a, d) => a + d.value, 0);

  return (
    <div
      ref={ref}
      className="relative overflow-hidden rounded-3xl border border-white/[0.06] bg-white/[0.02] p-6 backdrop-blur-xl sm:p-8"
      style={{ animation: "admin-fade-up 0.7s 0.18s ease-out both" }}
    >
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-white/55">
            <span
              className="h-1.5 w-1.5 rounded-full"
              style={{
                backgroundColor: "#3FC9B4",
                boxShadow: "0 0 6px #3FC9B4",
                animation: "admin-active-pulse 1.4s ease-in-out infinite",
              }}
            />
            Studio pulse — last 7 days
          </div>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
            <span className="tabular-nums">{total}</span>{" "}
            <span className="text-white/55">
              {total === 1 ? "booking" : "bookings"} this week
            </span>
          </h2>
        </div>
        <div className="flex items-center gap-2 text-[11px]">
          <Legend tone="low" label="Quiet" />
          <Legend tone="mid" label="Steady" />
          <Legend tone="high" label="Busy" />
        </div>
      </div>

      <div
        className="relative mt-8 grid grid-cols-7 gap-2 sm:gap-4"
        onMouseLeave={() => setHover(null)}
      >
        {days.map((d, i) => {
          const ratio = d.value / max;
          const heightPct = Math.max(d.value > 0 ? 18 : 8, ratio * 100);
          const tone = d.value === 0 ? "empty" : ratio > 0.66 ? "high" : ratio > 0.33 ? "mid" : "low";
          const isHover = hover === i;
          return (
            <button
              key={d.iso}
              type="button"
              onMouseEnter={() => setHover(i)}
              onFocus={() => setHover(i)}
              className="group relative flex flex-col items-center gap-3"
              aria-label={`${d.label} ${d.shortDate}: ${d.value} bookings`}
            >
              {/* Pillar */}
              <div
                className="relative w-full overflow-hidden rounded-2xl border transition-all duration-300"
                style={{
                  height: 220,
                  borderColor:
                    tone === "empty"
                      ? "rgba(255,255,255,0.05)"
                      : isHover
                        ? "rgba(63,201,180,0.45)"
                        : "rgba(255,255,255,0.08)",
                  backgroundColor: "rgba(255,255,255,0.015)",
                  transform: isHover ? "translateY(-4px)" : "translateY(0)",
                }}
              >
                {/* Filled portion */}
                <div
                  className="absolute inset-x-0 bottom-0 transition-all duration-700"
                  style={{
                    height: armed ? `${heightPct}%` : "0%",
                    transitionDelay: `${i * 80}ms`,
                    background:
                      tone === "empty"
                        ? "transparent"
                        : tone === "high"
                          ? "linear-gradient(180deg, #3FC9B4 0%, rgba(63,201,180,0.05) 100%)"
                          : tone === "mid"
                            ? "linear-gradient(180deg, rgba(63,201,180,0.7) 0%, rgba(63,201,180,0.04) 100%)"
                            : "linear-gradient(180deg, rgba(63,201,180,0.4) 0%, rgba(63,201,180,0.02) 100%)",
                  }}
                />
                {/* Cap glow */}
                {tone !== "empty" && (
                  <div
                    className="absolute inset-x-2 transition-all duration-700"
                    style={{
                      bottom: armed ? `${heightPct}%` : "0%",
                      transitionDelay: `${i * 80}ms`,
                      height: 1,
                      background: "#3FC9B4",
                      boxShadow: "0 0 8px #3FC9B4, 0 0 16px rgba(63,201,180,0.5)",
                      opacity: isHover ? 1 : 0.7,
                    }}
                  />
                )}
                {/* Today ring */}
                {d.isToday && (
                  <span
                    aria-hidden
                    className="absolute inset-1 rounded-xl border"
                    style={{
                      borderColor: "rgba(63,201,180,0.45)",
                      boxShadow: "inset 0 0 12px rgba(63,201,180,0.18)",
                      animation: "pulse-ring 2.4s ease-in-out infinite",
                    }}
                  />
                )}
                {/* Value label inside pillar */}
                {d.value > 0 && (
                  <span
                    className="absolute inset-x-0 bottom-3 text-center font-semibold tabular-nums transition-all duration-300"
                    style={{
                      color: tone === "high" ? "#0a0a0e" : "#fff",
                      fontSize: isHover ? 18 : 14,
                      textShadow: tone === "high" ? "none" : "0 0 6px rgba(63,201,180,0.6)",
                    }}
                  >
                    {d.value}
                  </span>
                )}
                {d.value === 0 && (
                  <span
                    aria-hidden
                    className="absolute inset-0 grid place-items-center text-[10px] font-medium uppercase tracking-[0.18em] text-white/25"
                  >
                    ·
                  </span>
                )}
              </div>

              {/* Date label */}
              <div className="flex flex-col items-center gap-0.5">
                <span
                  className="font-mono text-[10px] uppercase tracking-[0.18em] transition-colors"
                  style={{
                    color: d.isToday ? "#3FC9B4" : isHover ? "rgba(255,255,255,0.85)" : "rgba(255,255,255,0.45)",
                  }}
                >
                  {d.label}
                </span>
                <span
                  className="text-sm font-semibold tabular-nums transition-colors"
                  style={{
                    color: d.isToday ? "#3FC9B4" : isHover ? "#fff" : "rgba(255,255,255,0.75)",
                  }}
                >
                  {d.shortDate}
                </span>
                {d.isToday && (
                  <span className="mt-0.5 text-[9px] font-bold uppercase tracking-[0.22em] text-[#3FC9B4]">
                    today
                  </span>
                )}
              </div>
            </button>
          );
        })}
      </div>

      <style jsx>{`
        @keyframes pulse-ring {
          0%, 100% { opacity: 0.5; transform: scale(1); }
          50%      { opacity: 1;   transform: scale(1.02); }
        }
      `}</style>
    </div>
  );
}

function Legend({ tone, label }: { tone: "low" | "mid" | "high"; label: string }) {
  const color =
    tone === "high" ? "#3FC9B4" : tone === "mid" ? "rgba(63,201,180,0.6)" : "rgba(63,201,180,0.3)";
  return (
    <span className="inline-flex items-center gap-1.5 text-white/45">
      <span
        className="h-2 w-2 rounded-sm"
        style={{ backgroundColor: color, boxShadow: tone === "high" ? "0 0 6px #3FC9B4" : undefined }}
      />
      {label}
    </span>
  );
}
