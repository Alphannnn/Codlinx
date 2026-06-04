"use client";

import { useEffect, useRef, useState } from "react";

const ACCENT = "#3FC9B4";

type Phase = {
  num: string;
  duration: string;
  title: string;
  description: string;
  chips: string[];
  visual: React.ReactNode;
};

const PHASES: Phase[] = [
  {
    num: "01",
    duration: "Week 1–2",
    title: "Discover",
    description:
      "We start by listening. Stakeholder interviews, user research, and competitive teardown lead to a sharp problem definition — and the only roadmap that matters.",
    chips: ["User Research", "Workshops", "Tech Audit", "Roadmap"],
    visual: <DiscoverVisual />,
  },
  {
    num: "02",
    duration: "Week 2–4",
    title: "Design",
    description:
      "From low-fi flows to a production-ready design system. Every screen is tested in Figma with real users before a single line of code is written.",
    chips: ["UX Flows", "Design System", "Prototyping", "Usability Tests"],
    visual: <DesignVisual />,
  },
  {
    num: "03",
    duration: "Sprints",
    title: "Engineer",
    description:
      "Two-week sprints, demos every Friday, and a green CI pipeline. You see real, deployable software from week one — not a slide deck.",
    chips: ["TypeScript", "Trunk-based", "CI/CD", "Test Coverage"],
    visual: <EngineerVisual />,
  },
  {
    num: "04",
    duration: "Ongoing",
    title: "Scale",
    description:
      "Launch is the starting line. We instrument, observe, A/B test, and tune — turning the product into a compounding growth engine.",
    chips: ["Observability", "A/B Testing", "SRE", "Growth Loops"],
    visual: <ScaleVisual />,
  },
];

export default function Process() {
  const railRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const el = railRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const total = rect.height + vh * 0.4;
      const seen = Math.min(Math.max(vh * 0.6 - rect.top, 0), total);
      setProgress(Math.min(1, seen / total));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <section
      id="process"
      className="relative isolate overflow-hidden bg-black py-24 text-white sm:py-32"
    >
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 -z-10 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"
      />
      <div
        aria-hidden
        className="absolute right-[10%] top-1/4 -z-10 h-[400px] w-[400px] rounded-full opacity-[0.10] blur-[120px]"
        style={{ backgroundColor: ACCENT }}
      />
      <div
        aria-hidden
        className="absolute left-[5%] bottom-[10%] -z-10 h-[360px] w-[360px] rounded-full opacity-[0.08] blur-[120px]"
        style={{
          background:
            "radial-gradient(circle, rgba(120,80,255,0.6), transparent 70%)",
        }}
      />

      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-col items-center text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] text-white/70 backdrop-blur-md">
            <span
              className="h-1 w-1 rounded-full"
              style={{ backgroundColor: ACCENT }}
            />
            Process
          </span>
          <h2 className="mt-5 max-w-3xl text-balance text-4xl font-semibold leading-[1.1] tracking-tight sm:text-5xl lg:text-[56px]">
            How we ship —{" "}
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage: `linear-gradient(120deg, ${ACCENT}, #ffffff)`,
              }}
            >
              from idea to scale.
            </span>
          </h2>
          <p className="mt-5 max-w-2xl text-pretty text-base leading-relaxed text-white/60 sm:text-lg">
            A predictable, transparent system honed over 120+ launches. No
            handoff theatre. No surprise invoices. Just shipped software.
          </p>
        </div>

        <div ref={railRef} className="relative mt-20">
          <div
            aria-hidden
            className="pointer-events-none absolute left-0 right-0 top-[18px] hidden h-px bg-white/[0.08] lg:block"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute left-0 top-[18px] hidden h-px lg:block"
            style={{
              width: `${progress * 100}%`,
              background: `linear-gradient(90deg, ${ACCENT}, ${ACCENT} 70%, transparent)`,
              boxShadow: `0 0 12px ${ACCENT}`,
              transition: "width 0.3s ease-out",
            }}
          />

          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 sm:gap-8 lg:grid-cols-4 lg:gap-6">
            {PHASES.map((p, i) => (
              <PhaseCard key={p.num} phase={p} index={i} />
            ))}
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes codlinx-rise { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-6px); } }
        @keyframes codlinx-grow-line {
          0% { stroke-dashoffset: 400; }
          100% { stroke-dashoffset: 0; }
        }
        @keyframes codlinx-blink { 0%, 60% { opacity: 1; } 80%, 100% { opacity: 0; } }
        @keyframes codlinx-slide-up {
          0% { transform: translateY(8px); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }
        @keyframes codlinx-graph-rise {
          from { transform: scaleY(0); }
          to { transform: scaleY(1); }
        }
        @keyframes codlinx-dot-trail {
          0% { transform: translate(0, 0); opacity: 0; }
          10% { opacity: 1; }
          100% { transform: translate(180px, -90px); opacity: 0; }
        }
      `}</style>
    </section>
  );
}

function PhaseCard({ phase, index }: { phase: Phase; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setVisible(true),
      { threshold: 0.2 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`relative flex flex-col transition-all duration-700 ${
        visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
      }`}
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      <div
        aria-hidden
        className="relative z-10 mx-auto grid h-9 w-9 place-items-center rounded-full border border-white/15 bg-black text-[11px] font-semibold tracking-wider lg:mx-0"
        style={{
          boxShadow: visible
            ? `0 0 0 4px rgba(63,201,180,0.12), 0 0 24px ${ACCENT}`
            : "none",
          transition: "box-shadow 0.6s ease-out",
        }}
      >
        <span style={{ color: visible ? ACCENT : "white" }}>{phase.num}</span>
      </div>

      <div className="mt-5 text-center lg:text-left">
        <div className="text-[11px] uppercase tracking-[0.2em] text-white/40">
          {phase.duration}
        </div>
        <h3 className="mt-1.5 text-2xl font-semibold tracking-tight">
          {phase.title}
        </h3>
        <p className="mt-2.5 text-sm leading-relaxed text-white/60">
          {phase.description}
        </p>
        <div className="mt-4 flex flex-wrap justify-center gap-1.5 lg:justify-start">
          {phase.chips.map((c) => (
            <span
              key={c}
              className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1 text-[11px] font-medium text-white/70 backdrop-blur-sm"
            >
              <span
                className="h-1 w-1 rounded-full"
                style={{ backgroundColor: ACCENT }}
              />
              {c}
            </span>
          ))}
        </div>
      </div>

      <div className="relative mt-6 h-[220px] overflow-hidden rounded-2xl border border-white/[0.08] bg-gradient-to-br from-white/[0.04] to-white/[0.01] p-4">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-12 right-0 h-40 w-40 rounded-full opacity-30 blur-3xl"
          style={{ backgroundColor: ACCENT }}
        />
        {phase.visual}
      </div>
    </div>
  );
}

function DiscoverVisual() {
  const notes = [
    { t: "Goal: cut onboarding to <60s", c: "border-l-[#3FC9B4]" },
    { t: "Power users want bulk-edit", c: "border-l-pink-400" },
    { t: "Drop-off spikes at step 3", c: "border-l-amber-300" },
    { t: "Mobile-first segment +38%", c: "border-l-violet-400" },
  ];
  return (
    <div className="absolute inset-4 flex flex-col gap-2">
      {notes.map((n, i) => (
        <div
          key={i}
          className={`relative rounded-lg border border-white/[0.06] bg-white/[0.03] px-3 py-2.5 backdrop-blur-sm border-l-2 ${n.c}`}
          style={{
            animation: `codlinx-slide-up 0.6s ease-out ${i * 0.15}s both`,
          }}
        >
          <div className="flex items-center gap-2">
            <div className="flex gap-0.5">
              <span className="h-1 w-1 rounded-full bg-white/30" />
              <span className="h-1 w-1 rounded-full bg-white/30" />
              <span className="h-1 w-1 rounded-full bg-white/30" />
            </div>
            <span className="text-[11px] uppercase tracking-wider text-white/35">
              insight · {String(i + 1).padStart(2, "0")}
            </span>
          </div>
          <div className="mt-1 text-sm text-white/85">{n.t}</div>
        </div>
      ))}
    </div>
  );
}

function DesignVisual() {
  return (
    <div className="absolute inset-4 flex items-center justify-center">
      <div className="grid h-full w-full grid-cols-3 gap-2">
        <div className="col-span-1 flex flex-col gap-2">
          <div className="flex-1 rounded-lg border border-white/[0.08] bg-white/[0.03] p-2">
            <div className="mb-1.5 h-1.5 w-3/4 rounded-full bg-white/15" />
            <div className="h-1 w-1/2 rounded-full bg-white/10" />
            <div className="mt-2 h-10 rounded-md border border-dashed border-white/15" />
          </div>
          <div className="flex-1 rounded-lg border border-white/[0.08] bg-white/[0.03] p-2">
            <div
              className="h-full rounded-md"
              style={{
                background: `linear-gradient(135deg, ${ACCENT}, transparent)`,
              }}
            />
          </div>
        </div>
        <div className="col-span-2 relative overflow-hidden rounded-lg border border-white/[0.08] bg-[#0a0a0b]/80 p-3">
          <div className="mb-2 flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-red-400/70" />
            <span className="h-2 w-2 rounded-full bg-yellow-400/70" />
            <span className="h-2 w-2 rounded-full bg-green-400/70" />
            <span className="ml-2 text-[10px] text-white/40">checkout · v2</span>
          </div>
          <div className="space-y-1.5">
            <div className="h-2 w-3/4 rounded-full bg-white/15" />
            <div className="h-2 w-1/2 rounded-full bg-white/10" />
          </div>
          <div className="mt-3 grid grid-cols-2 gap-1.5">
            <div className="h-8 rounded-md bg-white/[0.04]" />
            <div className="h-8 rounded-md bg-white/[0.04]" />
          </div>
          <div
            className="mt-2 h-8 rounded-md"
            style={{ backgroundColor: ACCENT }}
          />
          <div
            aria-hidden
            className="absolute right-3 top-3 h-3 w-3 rounded-full border-2 border-black"
            style={{
              backgroundColor: ACCENT,
              animation: "codlinx-rise 2.4s ease-in-out infinite",
            }}
          />
        </div>
      </div>
    </div>
  );
}

function EngineerVisual() {
  const commits = [
    { msg: "feat(api): add idempotent checkout", user: "amir", tag: "main" },
    { msg: "fix(ui): align CTA on mobile", user: "lia", tag: "release" },
    { msg: "perf: stream LLM tokens", user: "raza", tag: "main" },
    { msg: "test: cover retry edge case", user: "noor", tag: "pr-481" },
  ];
  return (
    <div className="absolute inset-4 flex flex-col gap-2 font-mono">
      <div className="mb-1 flex items-center justify-between text-[10px] uppercase tracking-wider text-white/40">
        <span className="flex items-center gap-1.5">
          <span
            className="h-1.5 w-1.5 rounded-full"
            style={{
              backgroundColor: ACCENT,
              animation: "codlinx-blink 1.4s ease-in-out infinite",
            }}
          />
          CI · passing
        </span>
        <span>main</span>
      </div>
      {commits.map((c, i) => (
        <div
          key={i}
          className="flex items-center gap-2 rounded-lg border border-white/[0.06] bg-white/[0.02] px-3 py-2"
          style={{
            animation: `codlinx-slide-up 0.5s ease-out ${i * 0.12}s both`,
          }}
        >
          <span
            className="grid h-5 w-5 place-items-center rounded-full text-[9px] font-bold text-black"
            style={{ backgroundColor: ACCENT }}
          >
            ✓
          </span>
          <span className="truncate text-[12px] text-white/85">{c.msg}</span>
          <span className="ml-auto rounded-full bg-white/[0.06] px-2 py-0.5 text-[10px] text-white/50">
            {c.tag}
          </span>
        </div>
      ))}
    </div>
  );
}

function ScaleVisual() {
  const points = [60, 80, 75, 110, 130, 120, 165, 190, 175, 220, 250, 240];
  const max = Math.max(...points);
  const w = 360;
  const h = 180;
  const step = w / (points.length - 1);
  const toY = (v: number) => h - (v / max) * (h - 20) - 10;

  const linePath = points
    .map((v, i) => `${i === 0 ? "M" : "L"} ${i * step} ${toY(v)}`)
    .join(" ");
  const areaPath = `${linePath} L ${w} ${h} L 0 ${h} Z`;

  return (
    <div className="absolute inset-4 flex flex-col">
      <div className="mb-2 flex items-end justify-between">
        <div>
          <div className="text-[10px] uppercase tracking-wider text-white/40">
            MRR · last 12 months
          </div>
          <div className="mt-0.5 flex items-baseline gap-2">
            <span className="text-2xl font-semibold text-white">$248K</span>
            <span
              className="text-xs font-medium"
              style={{ color: ACCENT }}
            >
              ↑ 42%
            </span>
          </div>
        </div>
        <div className="flex gap-1">
          {["1M", "3M", "1Y"].map((t, i) => (
            <span
              key={t}
              className={`rounded-md px-1.5 py-0.5 text-[10px] ${
                i === 2
                  ? "bg-white/10 text-white"
                  : "text-white/40"
              }`}
            >
              {t}
            </span>
          ))}
        </div>
      </div>
      <div className="relative flex-1">
        <svg
          viewBox={`0 0 ${w} ${h}`}
          preserveAspectRatio="none"
          className="h-full w-full"
        >
          <defs>
            <linearGradient id="areaFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={ACCENT} stopOpacity="0.35" />
              <stop offset="100%" stopColor={ACCENT} stopOpacity="0" />
            </linearGradient>
          </defs>
          {[0.25, 0.5, 0.75].map((y) => (
            <line
              key={y}
              x1="0"
              x2={w}
              y1={h * y}
              y2={h * y}
              stroke="rgba(255,255,255,0.05)"
            />
          ))}
          <path d={areaPath} fill="url(#areaFill)" />
          <path
            d={linePath}
            fill="none"
            stroke={ACCENT}
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray="400"
            style={{
              animation: "codlinx-grow-line 2.4s ease-out forwards",
            }}
          />
          <circle
            cx={(points.length - 1) * step}
            cy={toY(points[points.length - 1])}
            r="4"
            fill={ACCENT}
          />
          <circle
            cx={(points.length - 1) * step}
            cy={toY(points[points.length - 1])}
            r="8"
            fill={ACCENT}
            opacity="0.3"
            style={{
              animation: "codlinx-blink 1.6s ease-in-out infinite",
            }}
          />
        </svg>
      </div>
    </div>
  );
}
