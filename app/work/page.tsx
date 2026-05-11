import Link from "next/link";
import { PROJECTS, ACCENT } from "../lib/projects";

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
          className="absolute inset-0 -z-10 opacity-[0.08]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
            maskImage:
              "radial-gradient(ellipse 70% 80% at 50% 30%, black 30%, transparent 80%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 70% 80% at 50% 30%, black 30%, transparent 80%)",
          }}
        />
        <div
          aria-hidden
          className="absolute left-1/2 top-[-200px] -z-10 h-[520px] w-[1000px] -translate-x-1/2 rounded-full opacity-25 blur-[140px]"
          style={{
            background: `radial-gradient(circle, ${ACCENT} 0%, transparent 70%)`,
          }}
        />

        <div className="mx-auto max-w-6xl px-5 pt-10 sm:px-8 sm:pt-14">
          <BackButton href="/" label="Back to home" tone="dark" />
        </div>

        <div className="mx-auto max-w-6xl px-5 pb-20 pt-10 sm:px-8 sm:pb-28 sm:pt-14">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] text-white/70 backdrop-blur-md">
            <span className="h-1 w-1 rounded-full" style={{ backgroundColor: ACCENT }} />
            Case Studies
          </span>

          <h1 className="mt-6 max-w-3xl text-balance text-4xl font-semibold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl">
            Work we&apos;re proud to{" "}
            <span style={{ color: ACCENT }}>put our name on.</span>
          </h1>

          <p className="mt-5 max-w-xl text-base leading-relaxed text-white/65 sm:text-lg">
            Real products, shipped to real users. Four industries, one constant:
            software that ran in production and moved a number that mattered.
          </p>

          <dl className="mt-10 grid grid-cols-3 gap-px overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.04] sm:max-w-xl">
            <Stat value="120+" label="Products shipped" />
            <Stat value="4.9" label="Client rating" />
            <Stat value="40+" label="Engagements" />
          </dl>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 pt-20 sm:px-8 sm:pt-24">
        <SectionHeading
          eyebrow="Featured"
          title="The one we lead with."
          count={null}
        />
        <div className="mt-10">
          <FeaturedCard project={featured} />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 pt-20 sm:px-8 sm:pt-24">
        <SectionHeading
          eyebrow="More case studies"
          title="Recent engagements."
          count={rest.length}
        />
        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:gap-8">
          {rest.map((p) => (
            <CaseCard key={p.slug} project={p} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-24 sm:px-8 sm:py-32">
        <div className="relative overflow-hidden rounded-3xl border border-zinc-900/[0.06] bg-white p-10 shadow-[0_24px_60px_-30px_rgba(0,0,0,0.18)] sm:p-14">
          <div
            aria-hidden
            className="absolute -right-20 -top-20 h-72 w-72 rounded-full opacity-20 blur-3xl"
            style={{ backgroundColor: ACCENT }}
          />
          <div className="relative flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
            <div>
              <span className="text-xs uppercase tracking-[0.22em] text-zinc-500">
                Have something in mind?
              </span>
              <h2 className="mt-3 max-w-xl text-balance text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
                Your case study could be next.
              </h2>
              <p className="mt-3 max-w-md text-sm leading-relaxed text-zinc-600">
                Tell us what you&apos;re building. We&apos;ll come back within
                24 hours with a plan, a team, and a price.
              </p>
            </div>
            <Link
              href="/contact"
              className="group inline-flex h-12 items-center gap-2 rounded-full bg-zinc-900 px-6 text-sm font-semibold text-white transition-transform duration-300 hover:scale-[1.03]"
            >
              Start a project
              <span
                className="grid h-7 w-7 place-items-center rounded-full"
                style={{ backgroundColor: ACCENT }}
              >
                <ArrowRight className="h-3 w-3 text-black" />
              </span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="bg-black/40 px-5 py-4">
      <div className="text-xl font-semibold tracking-tight text-white sm:text-2xl">
        {value}
      </div>
      <div className="mt-1 text-[10px] uppercase tracking-[0.18em] text-white/45">
        {label}
      </div>
    </div>
  );
}

function SectionHeading({
  eyebrow,
  title,
  count,
}: {
  eyebrow: string;
  title: string;
  count: number | null;
}) {
  return (
    <div className="flex items-end justify-between gap-6 border-b border-zinc-900/[0.08] pb-5">
      <div>
        <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-zinc-500">
          {eyebrow}
        </div>
        <h2 className="mt-2 text-2xl font-semibold leading-tight tracking-tight text-zinc-900 sm:text-3xl">
          {title}
        </h2>
      </div>
      {count !== null && (
        <span className="shrink-0 text-xs font-medium uppercase tracking-[0.18em] text-zinc-400">
          {String(count).padStart(2, "0")} projects
        </span>
      )}
    </div>
  );
}

function FeaturedCard({ project }: { project: (typeof PROJECTS)[number] }) {
  return (
    <Link
      href={`/work/${project.slug}`}
      className="group relative grid grid-cols-1 overflow-hidden rounded-3xl border border-zinc-900/[0.06] bg-white shadow-[0_24px_60px_-30px_rgba(0,0,0,0.18)] transition-all duration-500 hover:shadow-[0_32px_80px_-30px_rgba(0,0,0,0.25)] lg:grid-cols-[1.1fr_1fr]"
    >
      <div
        className="relative h-[300px] overflow-hidden bg-zinc-950 sm:h-[380px] lg:h-auto lg:min-h-[440px]"
        style={{
          background: "linear-gradient(135deg, #0a0a0b 0%, #111114 100%)",
        }}
      >
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background: `radial-gradient(circle at 30% 20%, ${project.hue}, transparent 60%)`,
          }}
        />
        {project.visual}
      </div>
      <div className="flex flex-col justify-between gap-12 p-8 sm:p-12">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-zinc-900 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-white">
              <span
                className="h-1 w-1 rounded-full"
                style={{ backgroundColor: project.swatch }}
              />
              Featured
            </span>
            <span className="text-[11px] uppercase tracking-[0.2em] text-zinc-500">
              {project.industry} · {project.year}
            </span>
          </div>

          <div className="mt-6 text-sm font-semibold uppercase tracking-wider text-zinc-700">
            {project.client}
          </div>
          <h3 className="mt-3 text-balance text-3xl font-semibold leading-[1.15] tracking-tight text-zinc-900 sm:text-[34px]">
            {project.title}
          </h3>
          <p className="mt-5 max-w-lg text-base leading-relaxed text-zinc-600">
            {project.blurb}
          </p>
        </div>

        <div className="flex items-end justify-between gap-6 border-t border-zinc-900/[0.06] pt-6">
          <div>
            <div
              className="text-4xl font-semibold tracking-tight sm:text-5xl"
              style={{ color: project.swatch }}
            >
              {project.metric.value}
            </div>
            <div className="mt-1.5 text-[11px] uppercase tracking-[0.18em] text-zinc-500">
              {project.metric.label}
            </div>
          </div>
          <span className="inline-flex items-center gap-2 text-sm font-semibold text-zinc-900">
            Read case study
            <span
              className="grid h-8 w-8 place-items-center rounded-full transition-transform duration-300 group-hover:translate-x-0.5"
              style={{ backgroundColor: project.swatch }}
            >
              <ArrowRight className="h-3 w-3 text-white" />
            </span>
          </span>
        </div>
      </div>
    </Link>
  );
}

function CaseCard({ project }: { project: (typeof PROJECTS)[number] }) {
  return (
    <Link
      href={`/work/${project.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-zinc-900/[0.06] bg-white shadow-[0_16px_40px_-24px_rgba(0,0,0,0.18)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_24px_60px_-24px_rgba(0,0,0,0.25)]"
    >
      <div
        className="relative h-[240px] overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #0a0a0b 0%, #111114 100%)",
        }}
      >
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background: `radial-gradient(circle at 30% 20%, ${project.hue}, transparent 60%)`,
          }}
        />
        {project.visual}
      </div>
      <div className="flex flex-1 flex-col gap-5 p-8">
        <div className="text-[11px] uppercase tracking-[0.2em] text-zinc-500">
          {project.industry} · {project.year}
        </div>

        <div>
          <div className="text-xs font-semibold uppercase tracking-wider text-zinc-700">
            {project.client}
          </div>
          <h3 className="mt-2.5 text-balance text-xl font-semibold leading-[1.25] tracking-tight text-zinc-900 sm:text-2xl">
            {project.title}
          </h3>
        </div>

        <p className="text-sm leading-relaxed text-zinc-600">{project.blurb}</p>

        <div className="mt-auto flex items-end justify-between gap-4 border-t border-zinc-900/[0.06] pt-5">
          <div>
            <div
              className="text-2xl font-semibold tracking-tight sm:text-3xl"
              style={{ color: project.swatch }}
            >
              {project.metric.value}
            </div>
            <div className="mt-0.5 text-[11px] uppercase tracking-[0.18em] text-zinc-500">
              {project.metric.label}
            </div>
          </div>
          <span className="inline-flex items-center gap-1.5 text-sm font-medium text-zinc-700 transition-colors group-hover:text-zinc-900">
            Read
            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
          </span>
        </div>
      </div>
    </Link>
  );
}

function BackButton({
  href,
  label,
  tone,
}: {
  href: string;
  label: string;
  tone: "dark" | "light";
}) {
  const isDark = tone === "dark";
  return (
    <Link
      href={href}
      className={
        isDark
          ? "group inline-flex h-10 items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-4 text-xs font-semibold uppercase tracking-[0.18em] text-white/80 backdrop-blur-md transition-all duration-300 hover:border-white/30 hover:bg-white/[0.08] hover:text-white"
          : "group inline-flex h-10 items-center gap-2 rounded-full border border-zinc-900/10 bg-white px-4 text-xs font-semibold uppercase tracking-[0.18em] text-zinc-700 transition-all duration-300 hover:border-zinc-900/25 hover:text-zinc-900"
      }
    >
      <span
        className={
          isDark
            ? "grid h-5 w-5 place-items-center rounded-full bg-white/10 transition-transform duration-300 group-hover:-translate-x-0.5"
            : "grid h-5 w-5 place-items-center rounded-full bg-zinc-100 transition-transform duration-300 group-hover:-translate-x-0.5"
        }
      >
        <svg
          viewBox="0 0 16 16"
          className="h-2.5 w-2.5 rotate-180"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
        >
          <path d="M3 8h10M9 4l4 4-4 4" />
        </svg>
      </span>
      {label}
    </Link>
  );
}

function ArrowRight({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M3 8h10M9 4l4 4-4 4" />
    </svg>
  );
}
