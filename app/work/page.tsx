import Link from "next/link";
import { PROJECTS, ACCENT } from "../lib/projects";

const INDUSTRIES = ["All", "HealthTech", "Fintech", "AI", "IoT"];

export const metadata = {
  title: "Case Studies — Codlinx",
  description:
    "Selected work from Codlinx. Real products, shipped to real users.",
};

export default function CaseStudiesPage() {
  const featured = PROJECTS[0];
  const rest = PROJECTS.slice(1);

  return (
    <div className="bg-[#FAFAF7] text-zinc-900">
      <section className="relative isolate overflow-hidden bg-black text-white">
        <div
          aria-hidden
          className="absolute inset-0 -z-10 opacity-[0.15]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)",
            backgroundSize: "56px 56px",
            maskImage:
              "radial-gradient(ellipse 70% 80% at 50% 30%, black 30%, transparent 80%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 70% 80% at 50% 30%, black 30%, transparent 80%)",
          }}
        />
        <div
          aria-hidden
          className="absolute left-1/2 top-[-160px] -z-10 h-[460px] w-[900px] -translate-x-1/2 rounded-full opacity-30 blur-[120px]"
          style={{
            background: `radial-gradient(circle, ${ACCENT} 0%, transparent 70%)`,
          }}
        />

        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20 lg:py-24">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.2em] text-white/50 transition-colors hover:text-white"
          >
            <svg
              viewBox="0 0 16 16"
              className="h-3 w-3"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden
            >
              <path d="M11 13L6 8l5-5" />
            </svg>
            Back to home
          </Link>

          <div className="mt-6 flex flex-col items-start gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] text-white/70 backdrop-blur-md">
                <span className="h-1 w-1 rounded-full" style={{ backgroundColor: ACCENT }} />
                Case Studies
              </span>
              <h1 className="mt-5 max-w-3xl text-balance text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl lg:text-[64px]">
                Work we&apos;re{" "}
                <span className="bg-clip-text text-transparent" style={{ backgroundImage: `linear-gradient(120deg, ${ACCENT}, #ffffff)` }}>
                  proud to put our name on.
                </span>
              </h1>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-white/60">
                Forty engagements, four industries, one constant: software that shipped, ran in production, and moved a real number.
              </p>
            </div>
            <div className="flex items-center gap-6 text-sm text-white/60">
              <div>
                <div className="text-2xl font-semibold text-white">120+</div>
                <div className="text-xs uppercase tracking-wider text-white/40">Products shipped</div>
              </div>
              <div className="h-8 w-px bg-white/10" />
              <div>
                <div className="text-2xl font-semibold text-white">4.9</div>
                <div className="text-xs uppercase tracking-wider text-white/40">Client rating</div>
              </div>
            </div>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-2">
            {INDUSTRIES.map((i) => (
              <button
                key={i}
                type="button"
                className={
                  i === "All"
                    ? "rounded-full bg-white px-4 py-1.5 text-xs font-semibold text-black"
                    : "rounded-full border border-white/10 bg-white/[0.03] px-4 py-1.5 text-xs font-medium text-white/70 transition-colors hover:border-white/25 hover:text-white"
                }
              >
                {i}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-24">
        <FeaturedCard project={featured} />
        <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:gap-10">
          {rest.map((p) => <CaseCard key={p.slug} project={p} />)}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-24 sm:px-8 sm:pb-32">
        <div className="relative overflow-hidden rounded-3xl border border-zinc-900/[0.06] bg-white p-10 shadow-[0_24px_60px_-30px_rgba(0,0,0,0.18)] sm:p-14">
          <div aria-hidden className="absolute -right-20 -top-20 h-72 w-72 rounded-full opacity-20 blur-3xl" style={{ backgroundColor: ACCENT }} />
          <div className="relative flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
            <div>
              <span className="text-xs uppercase tracking-[0.22em] text-zinc-500">Have something in mind?</span>
              <h2 className="mt-3 max-w-xl text-balance text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
                Your case study could be next.
              </h2>
              <p className="mt-3 max-w-md text-sm leading-relaxed text-zinc-600">
                Tell us what you&apos;re building. We&apos;ll come back within 24 hours with a plan, a team, and a price.
              </p>
            </div>
            <Link href="/contact" className="group inline-flex h-12 items-center gap-2 rounded-full bg-zinc-900 px-6 text-sm font-semibold text-white transition-transform duration-300 hover:scale-[1.03]">
              Start a project
              <span className="grid h-7 w-7 place-items-center rounded-full" style={{ backgroundColor: ACCENT }}>
                <svg viewBox="0 0 16 16" className="h-3 w-3 text-black" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <path d="M3 8h10M9 4l4 4-4 4" />
                </svg>
              </span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

function FeaturedCard({ project }: { project: (typeof PROJECTS)[number] }) {
  return (
    <Link href={`/work/${project.slug}`} className="group relative grid grid-cols-1 overflow-hidden rounded-3xl border border-zinc-900/[0.06] bg-white shadow-[0_24px_60px_-30px_rgba(0,0,0,0.18)] transition-all duration-500 hover:shadow-[0_32px_80px_-30px_rgba(0,0,0,0.25)] lg:grid-cols-2">
      <div className="relative h-[320px] overflow-hidden bg-zinc-950 sm:h-[400px] lg:h-auto" style={{ background: `linear-gradient(135deg, #0a0a0b 0%, #111114 100%)` }}>
        <div aria-hidden className="absolute inset-0" style={{ background: `radial-gradient(circle at 30% 20%, ${project.hue}, transparent 60%)` }} />
        {project.visual}
      </div>
      <div className="flex flex-col justify-between gap-10 p-8 sm:p-12">
        <div>
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-zinc-500">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-zinc-100 px-2.5 py-1 text-[10px] font-semibold text-zinc-700">
              <span className="h-1 w-1 rounded-full" style={{ backgroundColor: project.swatch }} />
              Featured
            </span>
            <span>{project.industry}</span>
            <span className="h-1 w-1 rounded-full bg-zinc-300" />
            <span>{project.year}</span>
          </div>
          <div className="mt-4 text-sm font-semibold uppercase tracking-wider text-zinc-700">{project.client}</div>
          <h3 className="mt-3 text-balance text-3xl font-semibold leading-tight tracking-tight text-zinc-900 sm:text-4xl">{project.title}</h3>
          <p className="mt-4 max-w-lg text-base leading-relaxed text-zinc-600">{project.blurb}</p>
        </div>
        <div className="flex items-end justify-between gap-6">
          <div>
            <div className="text-4xl font-semibold tracking-tight sm:text-5xl" style={{ color: project.swatch }}>{project.metric.value}</div>
            <div className="mt-1 text-xs uppercase tracking-[0.18em] text-zinc-500">{project.metric.label}</div>
          </div>
          <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-zinc-900">
            Read case study
            <span className="grid h-7 w-7 place-items-center rounded-full transition-transform duration-300 group-hover:translate-x-0.5" style={{ backgroundColor: project.swatch }}>
              <svg viewBox="0 0 16 16" className="h-3 w-3 text-white" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M3 8h10M9 4l4 4-4 4" />
              </svg>
            </span>
          </span>
        </div>
      </div>
    </Link>
  );
}

function CaseCard({ project }: { project: (typeof PROJECTS)[number] }) {
  return (
    <Link href={`/work/${project.slug}`} className="group flex flex-col overflow-hidden rounded-2xl border border-zinc-900/[0.06] bg-white shadow-[0_16px_40px_-24px_rgba(0,0,0,0.18)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_24px_60px_-24px_rgba(0,0,0,0.25)]">
      <div className="relative h-[260px] overflow-hidden" style={{ background: `linear-gradient(135deg, #0a0a0b 0%, #111114 100%)` }}>
        <div aria-hidden className="absolute inset-0" style={{ background: `radial-gradient(circle at 30% 20%, ${project.hue}, transparent 60%)` }} />
        {project.visual}
      </div>
      <div className="flex flex-1 flex-col gap-4 p-7">
        <div className="flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-zinc-500">
          <span>{project.industry}</span>
          <span className="h-1 w-1 rounded-full bg-zinc-300" />
          <span>{project.year}</span>
        </div>
        <div>
          <div className="text-xs font-semibold uppercase tracking-wider text-zinc-700">{project.client}</div>
          <h3 className="mt-2 text-balance text-xl font-semibold leading-tight tracking-tight text-zinc-900 sm:text-2xl">{project.title}</h3>
        </div>
        <p className="text-sm leading-relaxed text-zinc-600">{project.blurb}</p>
        <div className="mt-auto flex items-end justify-between gap-4 pt-3">
          <div>
            <div className="text-2xl font-semibold tracking-tight sm:text-3xl" style={{ color: project.swatch }}>{project.metric.value}</div>
            <div className="mt-0.5 text-[11px] uppercase tracking-[0.18em] text-zinc-500">{project.metric.label}</div>
          </div>
          <span className="inline-flex items-center gap-1.5 text-sm font-medium text-zinc-700 transition-colors group-hover:text-zinc-900">
            Read
            <svg viewBox="0 0 16 16" className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M3 8h10M9 4l4 4-4 4" />
            </svg>
          </span>
        </div>
      </div>
    </Link>
  );
}
