import Link from "next/link";
import { notFound } from "next/navigation";
import { PROJECTS, ACCENT } from "../../lib/projects";

export function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = PROJECTS.find((p) => p.slug === slug);
  if (!project) return { title: "Case Study — Codlinx" };
  return { title: `${project.client} — Codlinx`, description: project.blurb };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = PROJECTS.find((p) => p.slug === slug);
  if (!project) notFound();

  const index = PROJECTS.indexOf(project);
  const prev = PROJECTS[(index - 1 + PROJECTS.length) % PROJECTS.length];
  const next = PROJECTS[(index + 1) % PROJECTS.length];

  return (
    <div className="bg-[#FAFAF7] text-zinc-900">
      <section className="relative isolate overflow-hidden bg-black text-white">
        <div
          aria-hidden
          className="absolute inset-0 -z-10 opacity-[0.12]"
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
          className="absolute left-1/2 top-[-180px] -z-10 h-[500px] w-[1000px] -translate-x-1/2 rounded-full opacity-30 blur-[120px]"
          style={{ background: `radial-gradient(circle, ${project.hue} 0%, transparent 70%)` }}
        />

        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20">
          <Link
            href="/work"
            className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.2em] text-white/50 transition-colors hover:text-white"
          >
            <svg viewBox="0 0 16 16" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M11 13L6 8l5-5" />
            </svg>
            All case studies
          </Link>

          <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs uppercase tracking-[0.2em] text-white/45">
            <span className="font-semibold text-white/80">{project.client}</span>
            <span className="h-1 w-1 rounded-full bg-white/20" />
            <span>{project.industry}</span>
            <span className="h-1 w-1 rounded-full bg-white/20" />
            <span>{project.year}</span>
          </div>
          <h1 className="mt-5 max-w-4xl text-balance text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl lg:text-[64px]">
            {project.title}
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/65 sm:text-lg">
            {project.blurb}
          </p>

          <div className="mt-10 flex flex-wrap gap-2">
            {project.tags.map((t) => (
              <span key={t} className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs font-medium text-white/80 backdrop-blur-md">
                <span className="h-1 w-1 rounded-full" style={{ backgroundColor: ACCENT }} />
                {t}
              </span>
            ))}
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-5 pb-12 sm:px-8 sm:pb-16">
          <div className="relative h-[360px] overflow-hidden rounded-2xl border border-white/[0.08] sm:h-[440px]" style={{ background: "linear-gradient(135deg, #0a0a0b 0%, #111114 100%)" }}>
            <div aria-hidden className="absolute inset-0" style={{ background: `radial-gradient(circle at 30% 20%, ${project.hue}, transparent 60%)` }} />
            {project.visual}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-5 py-16 sm:px-8 sm:py-24">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-[140px_1fr] md:gap-16">
          <div className="text-xs font-semibold uppercase tracking-[0.22em] text-zinc-500">Challenge</div>
          <p className="text-lg leading-relaxed text-zinc-800 sm:text-xl">{project.challenge}</p>
        </div>

        <div className="my-16 h-px bg-zinc-200" />

        <div className="grid grid-cols-1 gap-12 md:grid-cols-[140px_1fr] md:gap-16">
          <div className="text-xs font-semibold uppercase tracking-[0.22em] text-zinc-500">Approach</div>
          <ol className="flex flex-col gap-5">
            {project.approach.map((a, i) => (
              <li key={i} className="flex gap-4">
                <span className="mt-1 grid h-7 w-7 shrink-0 place-items-center rounded-full text-[11px] font-semibold text-white" style={{ backgroundColor: project.swatch }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-base leading-relaxed text-zinc-700 sm:text-lg">{a}</span>
              </li>
            ))}
          </ol>
        </div>

        <div className="my-16 h-px bg-zinc-200" />

        <div className="grid grid-cols-1 gap-12 md:grid-cols-[140px_1fr] md:gap-16">
          <div className="text-xs font-semibold uppercase tracking-[0.22em] text-zinc-500">Outcome</div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {project.outcome.map((o) => (
              <div key={o.label} className="rounded-2xl border border-zinc-900/[0.06] bg-white p-6 shadow-[0_12px_30px_-20px_rgba(0,0,0,0.18)]">
                <div className="text-3xl font-semibold tracking-tight sm:text-4xl" style={{ color: project.swatch }}>{o.value}</div>
                <div className="mt-1.5 text-[11px] uppercase tracking-[0.18em] text-zinc-500">{o.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-16 sm:px-8 sm:pb-24">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
          <Link href={`/work/${prev.slug}`} className="group flex items-center justify-between rounded-2xl border border-zinc-900/[0.06] bg-white p-6 shadow-[0_12px_30px_-20px_rgba(0,0,0,0.12)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_40px_-20px_rgba(0,0,0,0.18)]">
            <div>
              <div className="text-[11px] uppercase tracking-[0.22em] text-zinc-500">Previous</div>
              <div className="mt-1.5 text-base font-semibold text-zinc-900">{prev.client}</div>
              <div className="text-xs text-zinc-500">{prev.industry}</div>
            </div>
            <svg viewBox="0 0 16 16" className="h-4 w-4 rotate-180 text-zinc-500 transition-transform duration-300 group-hover:-translate-x-0.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M3 8h10M9 4l4 4-4 4" />
            </svg>
          </Link>
          <Link href={`/work/${next.slug}`} className="group flex items-center justify-between rounded-2xl border border-zinc-900/[0.06] bg-white p-6 shadow-[0_12px_30px_-20px_rgba(0,0,0,0.12)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_40px_-20px_rgba(0,0,0,0.18)]">
            <div>
              <div className="text-[11px] uppercase tracking-[0.22em] text-zinc-500">Next</div>
              <div className="mt-1.5 text-base font-semibold text-zinc-900">{next.client}</div>
              <div className="text-xs text-zinc-500">{next.industry}</div>
            </div>
            <svg viewBox="0 0 16 16" className="h-4 w-4 text-zinc-500 transition-transform duration-300 group-hover:translate-x-0.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M3 8h10M9 4l4 4-4 4" />
            </svg>
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-24 sm:px-8 sm:pb-32">
        <div className="relative overflow-hidden rounded-3xl border border-zinc-900/[0.06] bg-white p-10 shadow-[0_24px_60px_-30px_rgba(0,0,0,0.18)] sm:p-14">
          <div aria-hidden className="absolute -right-20 -top-20 h-72 w-72 rounded-full opacity-20 blur-3xl" style={{ backgroundColor: ACCENT }} />
          <div className="relative flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
            <div>
              <span className="text-xs uppercase tracking-[0.22em] text-zinc-500">Working on something similar?</span>
              <h2 className="mt-3 max-w-xl text-balance text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
                Let&apos;s talk about your project.
              </h2>
              <p className="mt-3 max-w-md text-sm leading-relaxed text-zinc-600">
                A 30-minute call. No pitch. We&apos;ll listen, ask sharp questions, and tell you whether we&apos;re the right fit.
              </p>
            </div>
            <Link href="/contact" className="group inline-flex h-12 items-center gap-2 rounded-full bg-zinc-900 px-6 text-sm font-semibold text-white transition-transform duration-300 hover:scale-[1.03]">
              Start a conversation
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
