"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const ACCENT = "#3FC9B4";

function useInView<T extends HTMLElement>(threshold = 0.2) {
  const [visible, setVisible] = useState(false);
  const [node, setNode] = useState<T | null>(null);

  useEffect(() => {
    if (!node) return;
    const io = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setVisible(true),
      { threshold }
    );
    io.observe(node);
    return () => io.disconnect();
  }, [node, threshold]);

  return { attach: setNode, visible };
}

export default function Capabilities() {
  const { attach: headerAttach, visible: headerVisible } =
    useInView<HTMLDivElement>(0.3);
  return (
    <section className="relative isolate overflow-hidden bg-black py-24 text-white sm:py-32">
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 -z-10 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"
      />
      <div
        aria-hidden
        className="absolute left-[10%] top-1/3 -z-10 h-[420px] w-[420px] rounded-full opacity-[0.12] blur-[120px]"
        style={{ backgroundColor: ACCENT }}
      />

      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div
          ref={headerAttach}
          className={`flex flex-col items-center text-center transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            headerVisible
              ? "translate-y-0 opacity-100"
              : "translate-y-10 opacity-0"
          }`}
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] text-white/70 backdrop-blur-md">
            <span
              className="h-1 w-1 rounded-full"
              style={{
                backgroundColor: ACCENT,
                boxShadow: `0 0 12px ${ACCENT}`,
                animation: "codlinx-pulse-soft 2s ease-in-out infinite",
              }}
            />
            Capabilities
          </span>
          <h2 className="mt-5 max-w-3xl text-balance text-4xl font-semibold leading-[1.1] tracking-tight sm:text-5xl lg:text-[56px]">
            One studio.{" "}
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage: `linear-gradient(120deg, ${ACCENT}, #ffffff, ${ACCENT})`,
                backgroundSize: "200% 100%",
                animation: "codlinx-gradient-pan 8s ease-in-out infinite",
              }}
            >
              Every layer of the stack.
            </span>
          </h2>
          <p className="mt-5 max-w-2xl text-pretty text-base leading-relaxed text-white/60 sm:text-lg">
            From the first whiteboard sketch to the millionth user, our teams
            cover product strategy, design, engineering, and infrastructure —
            without handoffs.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-4 md:grid-cols-3 md:grid-rows-[280px_280px] lg:gap-5">
          <BentoCard
            className="md:col-span-2"
            title="Engineering"
            description="Production-grade web and mobile apps in Next.js, React Native, and TypeScript. Tested, observable, and built to scale."
            href="/services/web"
          >
            <CodeAnimation />
          </BentoCard>

          <BentoCard
            title="AI & ML"
            description="LLM agents, RAG pipelines, and ML models embedded into your product surface."
            href="/services/ai"
          >
            <OrbitAnimation />
          </BentoCard>

          <BentoCard
            title="Cloud & DevOps"
            description="AWS, GCP, multi-region, zero-downtime deploys."
            href="/services/cloud"
          >
            <GlobeAnimation />
          </BentoCard>

          <BentoCard
            title="Design"
            description="Brand systems and conversion-led interfaces that feel inevitable."
            href="/services/design"
          >
            <DesignAnimation />
          </BentoCard>

          <BentoCard
            title="Product Strategy"
            description="Discovery, roadmaps, KPIs, and go-to-market — anchored in user research."
            href="/services/strategy"
          >
            <StrategyAnimation />
          </BentoCard>
        </div>

        <Marquee />
      </div>

      <style jsx global>{`
        @keyframes codlinx-orbit {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes codlinx-orbit-reverse {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
        @keyframes codlinx-pulse-soft {
          0%, 100% { opacity: 0.6; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.04); }
        }
        @keyframes codlinx-marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        @keyframes codlinx-bar {
          0%, 100% { transform: scaleY(0.4); }
          50% { transform: scaleY(1); }
        }
        @keyframes codlinx-spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes codlinx-shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
      `}</style>
    </section>
  );
}

function BentoCard({
  title,
  description,
  href,
  className = "",
  children,
}: {
  title: string;
  description: string;
  href: string;
  className?: string;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

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

  const handleMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    setTilt({ x: (py - 0.5) * -6, y: (px - 0.5) * 6 });
    el.style.setProperty("--mx", `${px * 100}%`);
    el.style.setProperty("--my", `${py * 100}%`);
    if (wrapRef.current) {
      wrapRef.current.style.transform = `translate3d(${(px - 0.5) * -10}px, ${(py - 0.5) * -10}px, 0)`;
    }
  };
  const reset = () => {
    setTilt({ x: 0, y: 0 });
    if (wrapRef.current)
      wrapRef.current.style.transform = "translate3d(0, 0, 0)";
  };

  return (
    <Link
      ref={ref}
      href={href}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      className={`group relative flex h-[280px] flex-col overflow-hidden rounded-2xl border border-white/[0.08] bg-gradient-to-b from-white/[0.04] to-white/[0.01] p-6 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] hover:border-white/20 ${className} ${
        visible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
      }`}
      style={{
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transition:
          "transform 0.3s ease-out, border-color 0.3s, opacity 0.7s, translate 0.7s",
      }}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-px -z-10 rounded-[15px] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: `radial-gradient(120px circle at var(--mx, 50%) var(--my, 50%), rgba(63,201,180,0.55), transparent 70%)`,
          filter: "blur(40px)",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: `radial-gradient(400px circle at var(--mx, 50%) var(--my, 50%), rgba(63,201,180,0.14), transparent 60%)`,
        }}
      />
      <div
        ref={wrapRef}
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
        style={{ transition: "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)" }}
      >
        {children}
      </div>

      <div className="mt-auto">
        <h3 className="flex items-center gap-2 text-lg font-semibold tracking-tight text-white">
          {title}
          <svg
            viewBox="0 0 16 16"
            className="h-3.5 w-3.5 -translate-x-1 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100"
            style={{ color: ACCENT }}
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
          >
            <path d="M5 3l5 5-5 5" />
          </svg>
        </h3>
        <p className="mt-1.5 text-sm leading-relaxed text-white/55">
          {description}
        </p>
      </div>
    </Link>
  );
}

function CodeAnimation() {
  const lines = [
    { c: "text-white/40", t: "// codlinx/api/checkout.ts" },
    { c: "text-pink-300", t: "export async function" },
    { c: "text-sky-300", t: "  handle(req, res) {" },
    { c: "text-white/70", t: "    const session = await stripe" },
    { c: "text-emerald-300", t: "      .checkout.sessions.create({" },
    { c: "text-white/70", t: '        mode: "subscription",' },
    { c: "text-white/70", t: "        line_items: [...]," },
    { c: "text-emerald-300", t: "      });" },
    { c: "text-pink-300", t: "    return" },
    { c: "text-white/70", t: "    res.json(session);" },
    { c: "text-sky-300", t: "  }" },
  ];

  return (
    <div className="absolute inset-0 flex items-start">
      <div className="absolute right-6 top-6 w-[62%] max-w-[420px] overflow-hidden rounded-xl border border-white/10 bg-[#0a0a0b]/95 shadow-2xl">
        <div className="flex items-center gap-1.5 border-b border-white/[0.06] px-3 py-2">
          <span className="h-2 w-2 rounded-full bg-red-400/70" />
          <span className="h-2 w-2 rounded-full bg-yellow-400/70" />
          <span className="h-2 w-2 rounded-full bg-green-400/70" />
          <span className="ml-2 text-[10px] text-white/40">checkout.ts</span>
        </div>
        <pre className="px-4 py-3 font-mono text-[11px] leading-[1.7]">
          {lines.map((l, i) => (
            <div
              key={i}
              className={`${l.c}`}
              style={{
                opacity: 0,
                animation: `codlinx-typein 0.4s ease-out ${i * 0.12}s forwards, codlinx-fadeout 1s ease-in ${4 + i * 0.05}s forwards`,
              }}
            >
              {l.t}
            </div>
          ))}
        </pre>
      </div>
      <div
        className="absolute -left-10 top-0 h-full w-32 opacity-60"
        style={{
          background:
            "linear-gradient(180deg, rgba(63,201,180,0.18), transparent)",
          filter: "blur(40px)",
        }}
      />
      <style jsx>{`
        @keyframes codlinx-typein {
          from { opacity: 0; transform: translateX(-6px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes codlinx-fadeout {
          0%, 70% { opacity: 1; }
          100% { opacity: 0; transform: translateY(-4px); }
        }
      `}</style>
    </div>
  );
}

function OrbitAnimation() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="relative h-[200px] w-[200px]">
        <div
          className="absolute inset-0 rounded-full border border-white/10"
          style={{ animation: "codlinx-spin-slow 22s linear infinite" }}
        >
          <span
            className="absolute -top-1.5 left-1/2 h-3 w-3 -translate-x-1/2 rounded-full"
            style={{
              backgroundColor: ACCENT,
              boxShadow: `0 0 16px ${ACCENT}`,
            }}
          />
        </div>
        <div
          className="absolute inset-4 rounded-full border border-white/10"
          style={{ animation: "codlinx-orbit-reverse 16s linear infinite" }}
        >
          <span className="absolute -top-1 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-white" />
        </div>
        <div
          className="absolute inset-10 rounded-full border border-white/10"
          style={{ animation: "codlinx-spin-slow 10s linear infinite" }}
        >
          <span className="absolute -top-1 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-purple-400" />
        </div>
        <div
          className="absolute left-1/2 top-1/2 grid h-14 w-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-2xl border border-white/15 bg-black/70 backdrop-blur-sm"
          style={{ animation: "codlinx-pulse-soft 3s ease-in-out infinite" }}
        >
          <span
            className="text-xs font-bold tracking-wider"
            style={{ color: ACCENT }}
          >
            AI
          </span>
        </div>
      </div>
    </div>
  );
}

function GlobeAnimation() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="relative h-[200px] w-[200px]">
        <svg viewBox="0 0 200 200" className="absolute inset-0 h-full w-full">
          <defs>
            <radialGradient id="globeGrad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor={ACCENT} stopOpacity="0.18" />
              <stop offset="70%" stopColor={ACCENT} stopOpacity="0.04" />
              <stop offset="100%" stopColor="transparent" />
            </radialGradient>
          </defs>
          <circle cx="100" cy="100" r="80" fill="url(#globeGrad)" />
          <circle
            cx="100"
            cy="100"
            r="80"
            fill="none"
            stroke="rgba(255,255,255,0.12)"
            strokeWidth="1"
          />
          <ellipse
            cx="100"
            cy="100"
            rx="80"
            ry="30"
            fill="none"
            stroke="rgba(255,255,255,0.1)"
            strokeWidth="1"
          />
          <ellipse
            cx="100"
            cy="100"
            rx="80"
            ry="55"
            fill="none"
            stroke="rgba(255,255,255,0.08)"
            strokeWidth="1"
          />
          <ellipse
            cx="100"
            cy="100"
            rx="55"
            ry="80"
            fill="none"
            stroke="rgba(255,255,255,0.08)"
            strokeWidth="1"
          />
          <ellipse
            cx="100"
            cy="100"
            rx="30"
            ry="80"
            fill="none"
            stroke="rgba(255,255,255,0.08)"
            strokeWidth="1"
          />
        </svg>
        <div
          className="absolute inset-0"
          style={{ animation: "codlinx-spin-slow 25s linear infinite" }}
        >
          {[
            { top: "22%", left: "30%" },
            { top: "60%", left: "70%" },
            { top: "40%", left: "78%" },
            { top: "72%", left: "32%" },
          ].map((p, i) => (
            <span
              key={i}
              className="absolute h-1.5 w-1.5 rounded-full"
              style={{
                top: p.top,
                left: p.left,
                backgroundColor: ACCENT,
                boxShadow: `0 0 8px ${ACCENT}`,
                animation: `codlinx-pulse-soft 2.4s ease-in-out ${i * 0.4}s infinite`,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function DesignAnimation() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="relative h-[180px] w-[200px]">
        <div
          className="absolute left-4 top-6 h-16 w-16 rounded-2xl"
          style={{
            background: `linear-gradient(135deg, ${ACCENT}, transparent)`,
            animation: "codlinx-pulse-soft 4s ease-in-out infinite",
          }}
        />
        <div
          className="absolute right-2 top-2 h-12 w-12 rounded-full"
          style={{
            background: "linear-gradient(135deg, #a78bfa, #ec4899)",
            animation: "codlinx-pulse-soft 5s ease-in-out 0.5s infinite",
          }}
        />
        <div
          className="absolute bottom-6 right-8 h-14 w-14 rotate-12"
          style={{
            background:
              "conic-gradient(from 0deg, #fbbf24, #f472b6, #60a5fa, #fbbf24)",
            borderRadius: "30% 70% 70% 30% / 30% 30% 70% 70%",
            animation: "codlinx-spin-slow 14s linear infinite",
          }}
        />
        <div className="absolute bottom-4 left-2 flex h-9 w-24 items-center gap-1.5 rounded-full border border-white/15 bg-white/[0.04] px-2 backdrop-blur-md">
          <span className="h-3.5 w-3.5 rounded-full" style={{ backgroundColor: ACCENT }} />
          <span className="h-3.5 w-3.5 rounded-full bg-pink-400" />
          <span className="h-3.5 w-3.5 rounded-full bg-violet-400" />
          <span className="h-3.5 w-3.5 rounded-full bg-amber-300" />
        </div>
      </div>
    </div>
  );
}

function StrategyAnimation() {
  const bars = [0.45, 0.7, 0.55, 0.9, 0.65, 0.85, 0.5];
  return (
    <div className="absolute inset-0 flex items-end justify-center px-6 pb-20">
      <div className="flex h-[120px] w-full items-end gap-2">
        {bars.map((h, i) => (
          <div
            key={i}
            className="flex-1 origin-bottom rounded-md"
            style={{
              height: `${h * 100}%`,
              background: `linear-gradient(180deg, ${ACCENT}, rgba(63,201,180,0.15))`,
              animation: `codlinx-bar 2.4s ease-in-out ${i * 0.15}s infinite`,
            }}
          />
        ))}
      </div>
    </div>
  );
}

function Marquee() {
  const tech = [
    "TypeScript",
    "Next.js",
    "React",
    "Node.js",
    "Postgres",
    "Kubernetes",
    "AWS",
    "GCP",
    "Terraform",
    "Python",
    "Go",
    "Swift",
    "Kotlin",
    "GraphQL",
    "Redis",
    "Kafka",
    "OpenAI",
    "LangChain",
  ];
  const row = [...tech, ...tech];

  return (
    <div className="relative mt-20">
      <div className="mb-5 flex items-center justify-center gap-3 text-xs uppercase tracking-[0.24em] text-white/40">
        <span className="h-px w-10 bg-white/15" />
        The stack we ship with
        <span className="h-px w-10 bg-white/15" />
      </div>
      <div
        className="relative overflow-hidden"
        style={{
          maskImage:
            "linear-gradient(90deg, transparent, black 12%, black 88%, transparent)",
          WebkitMaskImage:
            "linear-gradient(90deg, transparent, black 12%, black 88%, transparent)",
        }}
      >
        <div
          className="flex w-max gap-3"
          style={{ animation: "codlinx-marquee 40s linear infinite" }}
        >
          {row.map((t, i) => (
            <span
              key={i}
              className="flex h-10 items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 text-sm font-medium text-white/70 backdrop-blur-sm transition-colors hover:border-white/20 hover:text-white"
            >
              <span
                className="h-1.5 w-1.5 rounded-full"
                style={{ backgroundColor: ACCENT }}
              />
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
