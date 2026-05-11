import type { ReactNode } from "react";

export const ACCENT = "#3FC9B4";

export type Project = {
  slug: string;
  client: string;
  industry: string;
  year: string;
  title: string;
  blurb: string;
  metric: { value: string; label: string };
  tags: string[];
  hue: string;
  swatch: string;
  visual: ReactNode;
  challenge: string;
  approach: string[];
  outcome: { value: string; label: string }[];
};

export const PROJECTS: Project[] = [
  {
    slug: "nimbus-health",
    client: "Nimbus Health",
    industry: "HealthTech",
    year: "2025",
    title: "A patient OS for a 50-clinic network.",
    blurb:
      "We rebuilt their fragmented patient records into a single, HIPAA-compliant platform — and shipped a clinician app that cut chart time by half.",
    metric: { value: "−42%", label: "Time per chart" },
    tags: ["Next.js", "FHIR", "AWS", "HIPAA"],
    hue: "rgba(63,201,180,0.20)",
    swatch: "#3FC9B4",
    visual: <HealthVisual />,
    challenge:
      "Nimbus operated 50 clinics on four legacy EMR systems. Clinicians were copying notes between tabs, lab data lived in faxes, and the average chart took 14 minutes.",
    approach: [
      "Audited workflows across 12 clinic types over four weeks.",
      "Designed a unified patient record powered by FHIR + Postgres.",
      "Rebuilt the clinician app in Next.js with offline-first sync.",
      "Migrated 4.2M historical records with zero data loss.",
    ],
    outcome: [
      { value: "−42%", label: "Time per chart" },
      { value: "100%", label: "HIPAA compliance" },
      { value: "4.2M", label: "Records migrated" },
    ],
  },
  {
    slug: "atlas-trade",
    client: "Atlas Trade",
    industry: "Fintech",
    year: "2024",
    title: "A trading floor in the browser.",
    blurb:
      "Real-time portfolio analytics for a $2B AUM hedge fund, with sub-100ms market data and a custom strategy DSL.",
    metric: { value: "$2B+", label: "Assets under analytics" },
    tags: ["WebSockets", "Rust", "TimescaleDB", "React"],
    hue: "rgba(139,92,246,0.25)",
    swatch: "#8B5CF6",
    visual: <FintechVisual />,
    challenge:
      "Atlas's quants were running strategies in spreadsheets with stale prices. They needed a real-time platform without giving up the expressiveness of a notebook.",
    approach: [
      "Built a Rust market-data ingester pulling from 8 venues.",
      "Designed a strategy DSL that compiles to safe Rust at runtime.",
      "Shipped a React dashboard with WebSocket-driven order books.",
      "Stress-tested at 1.4M ticks/sec with p99 latency under 90ms.",
    ],
    outcome: [
      { value: "$2B+", label: "AUM analyzed live" },
      { value: "<90ms", label: "Tick → screen p99" },
      { value: "47", label: "Live strategies" },
    ],
  },
  {
    slug: "lumen-labs",
    client: "Lumen Labs",
    industry: "AI",
    year: "2025",
    title: "RAG-powered research, at enterprise scale.",
    blurb:
      "We built a private knowledge engine that ingests 12 file formats, cites sources, and answers across 200K internal documents.",
    metric: { value: "3M / mo", label: "Queries answered" },
    tags: ["LangChain", "pgvector", "OpenAI", "Python"],
    hue: "rgba(244,114,182,0.22)",
    swatch: "#F472B6",
    visual: <AIVisual />,
    challenge:
      "Lumen's analysts spent hours hunting through Confluence, SharePoint, and Slack to answer the same research questions. Hallucination-prone consumer tools were a non-starter.",
    approach: [
      "Designed an ingestion pipeline for 12 file formats with provenance.",
      "Built a hybrid retrieval stack (BM25 + pgvector) tuned per domain.",
      "Wrapped responses in a citation contract — every claim links to a source.",
      "Rolled out behind SSO with row-level access controls.",
    ],
    outcome: [
      { value: "3M / mo", label: "Queries answered" },
      { value: "200K", label: "Documents indexed" },
      { value: "94%", label: "Citation accuracy" },
    ],
  },
  {
    slug: "helios-energy",
    client: "Helios Energy",
    industry: "IoT",
    year: "2024",
    title: "Mission control for 50K solar sites.",
    blurb:
      "A live operations dashboard ingesting 1M events/min, with anomaly detection and one-click failover across regions.",
    metric: { value: "50K", label: "Connected devices" },
    tags: ["Kafka", "Go", "Kubernetes", "Grafana"],
    hue: "rgba(251,191,36,0.22)",
    swatch: "#FBBF24",
    visual: <IoTVisual />,
    challenge:
      "Helios was flying blind across 50K sites. Outages were detected by customers calling in. The team needed real-time visibility and automated remediation.",
    approach: [
      "Architected a Kafka pipeline for 1.2M events/min with replay.",
      "Trained anomaly models on 18 months of historical telemetry.",
      "Built a control plane in Go for one-click region failover.",
      "Shipped operator dashboards with role-based runbooks.",
    ],
    outcome: [
      { value: "50K", label: "Devices online" },
      { value: "99.97%", label: "Fleet uptime" },
      { value: "−68%", label: "Mean time to detect" },
    ],
  },
];

export function HealthVisual() {
  const w = 600;
  const h = 360;
  const path =
    "M0 200 L80 200 L100 200 L115 140 L130 260 L150 100 L170 200 L260 200 L280 200 L295 150 L310 250 L330 200 L600 200";
  return (
    <div className="absolute inset-0 flex flex-col gap-3 p-6">
      <div className="flex items-center gap-3">
        <div
          className="grid h-10 w-10 place-items-center rounded-xl"
          style={{ backgroundColor: ACCENT }}
        >
          <svg
            viewBox="0 0 24 24"
            className="h-5 w-5"
            fill="white"
            aria-hidden
            style={{
              animation: "codlinx-heartbeat 1.4s ease-in-out infinite",
              transformOrigin: "center",
            }}
          >
            <path d="M12 21s-7-4.5-7-11a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 6.5-7 11-7 11z" />
          </svg>
        </div>
        <div>
          <div className="text-xs uppercase tracking-wider text-white/50">
            Patient · Demo, J.
          </div>
          <div className="text-sm font-semibold text-white">
            Heart rate · stable
          </div>
        </div>
        <div className="ml-auto rounded-full border border-white/10 bg-white/[0.03] px-2 py-0.5 text-[10px] uppercase tracking-wider text-white/60">
          live
        </div>
      </div>
      <div className="relative flex-1 overflow-hidden rounded-xl border border-white/[0.06] bg-black/40">
        <svg
          viewBox={`0 0 ${w} ${h}`}
          preserveAspectRatio="none"
          className="absolute inset-0 h-full w-full"
        >
          {Array.from({ length: 8 }).map((_, i) => (
            <line
              key={i}
              x1="0"
              x2={w}
              y1={(h / 8) * (i + 1)}
              y2={(h / 8) * (i + 1)}
              stroke="rgba(255,255,255,0.04)"
            />
          ))}
          <path
            d={path}
            fill="none"
            stroke={ACCENT}
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray="900"
            style={{ animation: "codlinx-stream-line 3s linear infinite" }}
          />
        </svg>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {[
          { l: "BPM", v: "72" },
          { l: "SpO₂", v: "98%" },
          { l: "Temp", v: "36.7°" },
        ].map((s) => (
          <div
            key={s.l}
            className="rounded-lg border border-white/[0.06] bg-white/[0.02] px-3 py-2"
          >
            <div className="text-[10px] uppercase tracking-wider text-white/40">
              {s.l}
            </div>
            <div className="text-sm font-semibold text-white">{s.v}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function FintechVisual() {
  const candles = [
    { o: 60, c: 80, h: 90, l: 50, up: true },
    { o: 80, c: 70, h: 85, l: 60, up: false },
    { o: 70, c: 100, h: 110, l: 65, up: true },
    { o: 100, c: 90, h: 105, l: 80, up: false },
    { o: 90, c: 130, h: 140, l: 85, up: true },
    { o: 130, c: 120, h: 135, l: 105, up: false },
    { o: 120, c: 160, h: 170, l: 115, up: true },
    { o: 160, c: 150, h: 165, l: 140, up: false },
    { o: 150, c: 185, h: 195, l: 145, up: true },
    { o: 185, c: 200, h: 215, l: 175, up: true },
  ];
  const max = 220;
  return (
    <div className="absolute inset-0 flex flex-col p-6">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-xs uppercase tracking-wider text-white/40">
            ATLAS · ETH/USD
          </div>
          <div className="mt-1 flex items-baseline gap-2">
            <span className="text-2xl font-semibold text-white">$3,418.20</span>
            <span
              className="rounded-full px-2 py-0.5 text-xs font-medium"
              style={{
                backgroundColor: "rgba(63,201,180,0.18)",
                color: ACCENT,
              }}
            >
              +4.82%
            </span>
          </div>
        </div>
        <div className="flex gap-1 text-[10px]">
          {["1H", "1D", "1W", "1M"].map((t, i) => (
            <span
              key={t}
              className={`rounded-md px-2 py-1 ${
                i === 1 ? "bg-white/10 text-white" : "text-white/40"
              }`}
            >
              {t}
            </span>
          ))}
        </div>
      </div>
      <div className="relative mt-4 flex-1">
        <div className="absolute inset-0 flex items-end gap-1.5">
          {candles.map((c, i) => (
            <div
              key={i}
              className="relative flex-1"
              style={{
                animation: `codlinx-candle 1.6s ease-out ${i * 0.1}s both`,
                transformOrigin: "bottom",
              }}
            >
              <div
                className="absolute left-1/2 w-px -translate-x-1/2"
                style={{
                  bottom: `${(c.l / max) * 100}%`,
                  height: `${((c.h - c.l) / max) * 100}%`,
                  backgroundColor: c.up ? ACCENT : "#f472b6",
                  opacity: 0.6,
                }}
              />
              <div
                className="absolute left-0 right-0 rounded-sm"
                style={{
                  bottom: `${(Math.min(c.o, c.c) / max) * 100}%`,
                  height: `${(Math.abs(c.c - c.o) / max) * 100}%`,
                  backgroundColor: c.up ? ACCENT : "#f472b6",
                }}
              />
            </div>
          ))}
        </div>
      </div>
      <div className="mt-3 grid grid-cols-3 gap-2 text-[11px]">
        {[
          { l: "BTC", v: "$67,420", up: true },
          { l: "SOL", v: "$184.12", up: true },
          { l: "AVAX", v: "$38.04", up: false },
        ].map((t) => (
          <div
            key={t.l}
            className="flex items-center justify-between rounded-lg border border-white/[0.06] bg-white/[0.02] px-3 py-1.5"
          >
            <span className="font-semibold text-white/80">{t.l}</span>
            <span style={{ color: t.up ? ACCENT : "#f472b6" }}>{t.v}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function AIVisual() {
  return (
    <div className="absolute inset-0 flex flex-col gap-3 p-6">
      <div className="flex items-center gap-2">
        <div
          className="grid h-7 w-7 place-items-center rounded-lg text-[11px] font-bold text-black"
          style={{ backgroundColor: ACCENT }}
        >
          L
        </div>
        <span className="text-sm font-semibold text-white">Lumen Research</span>
        <span className="ml-auto rounded-full border border-white/10 bg-white/[0.03] px-2 py-0.5 text-[10px] uppercase tracking-wider text-white/60">
          model · v4
        </span>
      </div>
      <div className="self-end max-w-[80%] rounded-2xl rounded-tr-sm bg-white/[0.08] px-3 py-2 text-sm text-white">
        Summarize Q3 risks across all internal memos.
      </div>
      <div className="max-w-[90%] rounded-2xl rounded-tl-sm border border-white/[0.06] bg-black/40 px-3 py-2 backdrop-blur-sm">
        <div className="text-[13px] leading-relaxed text-white/85">
          {[
            "Across",
            "47",
            "memos,",
            "Q3",
            "risk",
            "concentrates",
            "in:",
            "supply-chain",
            "(38%),",
            "regulatory",
            "(22%),",
            "and",
            "FX",
            "(18%).",
          ].map((w, i) => (
            <span
              key={i}
              className="inline-block"
              style={{
                animation: `codlinx-token 4s ease-out ${i * 0.18}s infinite`,
              }}
            >
              {w}&nbsp;
            </span>
          ))}
        </div>
        <div className="mt-2 flex flex-wrap gap-1">
          {["memo-0142.pdf", "q3-strategy.md", "ops-review.docx"].map((s) => (
            <span
              key={s}
              className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/[0.04] px-2 py-0.5 text-[10px] text-white/60"
            >
              <svg
                viewBox="0 0 16 16"
                className="h-2.5 w-2.5"
                style={{ color: ACCENT }}
                fill="currentColor"
                aria-hidden
              >
                <path d="M4 1h6l4 4v10H4z" opacity=".6" />
              </svg>
              {s}
            </span>
          ))}
        </div>
      </div>
      <div className="mt-auto flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-2 backdrop-blur-md">
        <span
          className="h-1.5 w-1.5 rounded-full"
          style={{
            backgroundColor: ACCENT,
            animation: "codlinx-grid-pulse 1.4s ease-in-out infinite",
          }}
        />
        <span className="text-xs text-white/40">
          Ask anything across 200K docs…
        </span>
      </div>
    </div>
  );
}

export function IoTVisual() {
  const cells = Array.from({ length: 35 }).map((_, i) => i);
  return (
    <div className="absolute inset-0 flex flex-col p-6">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-xs uppercase tracking-wider text-white/40">
            Helios · Fleet
          </div>
          <div className="mt-1 text-2xl font-semibold text-white">
            50,124{" "}
            <span className="text-sm font-medium text-white/40">
              devices online
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1 text-[10px] uppercase tracking-wider text-white/60">
          <span
            className="h-1.5 w-1.5 rounded-full"
            style={{
              backgroundColor: ACCENT,
              animation: "codlinx-grid-pulse 1.2s ease-in-out infinite",
            }}
          />
          1.2M evt/min
        </div>
      </div>
      <div className="mt-4 grid flex-1 grid-cols-7 gap-1.5">
        {cells.map((i) => {
          const fail = i % 13 === 7;
          const warn = i % 11 === 4;
          return (
            <div
              key={i}
              className="aspect-square rounded-md border border-white/[0.06]"
              style={{
                backgroundColor: fail
                  ? "rgba(244,114,182,0.5)"
                  : warn
                  ? "rgba(251,191,36,0.5)"
                  : "rgba(63,201,180,0.18)",
                animation: `codlinx-grid-pulse ${1.8 + (i % 5) * 0.3}s ease-in-out ${(i % 7) * 0.1}s infinite`,
              }}
            />
          );
        })}
      </div>
      <div className="mt-3 flex items-center gap-4 text-[11px]">
        <span className="flex items-center gap-1.5">
          <span
            className="h-2 w-2 rounded-full"
            style={{ backgroundColor: ACCENT }}
          />
          <span className="text-white/60">Healthy 99.2%</span>
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-amber-300" />
          <span className="text-white/60">Warn 0.6%</span>
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-pink-400" />
          <span className="text-white/60">Down 0.2%</span>
        </span>
      </div>
    </div>
  );
}
