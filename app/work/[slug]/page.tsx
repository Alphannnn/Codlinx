import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import PageHero from "../../components/PageHero";
import ClosingCTA from "../../components/ClosingCTA";
import Counter from "../../components/Counter";
import Magnetic from "../../components/Magnetic";
import CursorGlow from "../../components/CursorGlow";
import Reveal from "../../components/Reveal";
import Tilt from "../../components/Tilt";
import Parallax from "../../components/Parallax";
import ScrollProgress from "../../components/ScrollProgress";
import { PROJECTS, ACCENT, type Project } from "../../lib/projects";

// Pre-render the real case studies, but allow unknown slugs to be handled at
// runtime so a stale/old link (e.g. a cached clients card, a typo, or a
// legacy /work/<client> URL) gracefully redirects to /work instead of 404ing.
export const dynamicParams = true;

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
  if (!project) return { title: "Case Study" };
  return {
    title: `${project.client}`,
    description: project.blurb,
    alternates: { canonical: `/work/${project.slug}` },
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = PROJECTS.find((p) => p.slug === slug);
  if (!project) redirect("/work");

  const index = PROJECTS.indexOf(project);
  const prev = PROJECTS[(index - 1 + PROJECTS.length) % PROJECTS.length];
  const next = PROJECTS[(index + 1) % PROJECTS.length];
  const related = PROJECTS.filter((p) => p.slug !== project.slug).slice(0, 3);

  return (
    <>
      <CursorGlow color={`${project.swatch}33`} />
      <ScrollProgress color={project.swatch} />

      <PageHero
        eyebrow={`${project.industry} · ${project.year}`}
        title={project.client}
        highlight={project.title.replace(/\.$/, "")}
        description={project.blurb}
        backHref="/work"
        backLabel="All case studies"
      >
        <div className="mt-8 flex flex-wrap items-center gap-2">
          {project.tags.map((t) => (
            <span
              key={t}
              className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs font-medium text-white/80 backdrop-blur-md transition-colors hover:border-white/30 hover:text-white"
            >
              <span
                className="h-1 w-1 rounded-full"
                style={{ backgroundColor: project.swatch }}
              />
              {t}
            </span>
          ))}
        </div>

        <SectionAnchors />
      </PageHero>

      <HeroVisual project={project} />
      <SnapshotMeta project={project} />
      {project.visual && <LivePreview project={project} />}
      <ChallengeSection project={project} />
      <ApproachSection project={project} />
      <GallerySection project={project} />
      <OutcomeSection project={project} />
      <TestimonialBlock project={project} />
      <PrevNext prev={prev} next={next} />
      <RelatedWork related={related} />

      <ClosingCTA
        eyebrow="Working on something similar?"
        title="Let's talk about your project."
        body="A 30-minute call. No pitch. We'll listen, ask sharp questions, and tell you whether we're the right fit."
        primary={{ label: "Start a conversation", href: "/contact" }}
        secondary={{ label: "All case studies", href: "/work" }}
      />
    </>
  );
}

function SectionAnchors() {
  const anchors = [
    { label: "Snapshot", href: "#snapshot" },
    { label: "Challenge", href: "#challenge" },
    { label: "Approach", href: "#approach" },
    { label: "Gallery", href: "#gallery" },
    { label: "Outcome", href: "#outcome" },
    { label: "Testimonial", href: "#testimonial" },
  ];
  return (
    <nav
      aria-label="Sections"
      className="mt-10 flex flex-wrap items-center gap-x-1 gap-y-2 border-t border-white/[0.06] pt-6 text-[11px] font-medium uppercase tracking-[0.18em] text-white/55"
    >
      <span className="mr-2 text-white/35">Jump to —</span>
      {anchors.map((a, i) => (
        <span key={a.href} className="flex items-center gap-1">
          <Link
            href={a.href}
            className="rounded-full px-2.5 py-1 transition-colors duration-200 hover:bg-white/[0.06] hover:text-white"
          >
            {a.label}
          </Link>
          {i < anchors.length - 1 && (
            <span className="text-white/20">/</span>
          )}
        </span>
      ))}
    </nav>
  );
}

function HeroVisual({ project }: { project: Project }) {
  return (
    <section className="relative -mt-8 bg-black pb-20 sm:-mt-12 sm:pb-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <div className="group relative overflow-hidden rounded-3xl border border-white/[0.08] shadow-[0_30px_80px_-40px_rgba(0,0,0,0.7)]">
            <Parallax speed={0.05}>
              <Image
                src={project.heroImage}
                alt={project.heroAlt}
                width={1800}
                height={1000}
                priority
                className="h-[360px] w-full scale-[1.08] object-cover transition-transform duration-[1500ms] ease-out group-hover:scale-[1.14] sm:h-[500px]"
                sizes="(min-width: 1024px) 1100px, 100vw"
              />
            </Parallax>
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "linear-gradient(180deg, rgba(0,0,0,0.05) 30%, rgba(0,0,0,0.78) 100%)",
              }}
            />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
              style={{
                background: `radial-gradient(circle at 30% 30%, ${project.hue}, transparent 60%)`,
              }}
            />

            <div
              aria-hidden
              className="pointer-events-none absolute right-6 top-6 hidden md:block"
            >
              <svg
                viewBox="0 0 120 120"
                className="codlinx-spin-slow h-24 w-24"
                aria-hidden
              >
                <defs>
                  <path
                    id="ring"
                    d="M60,60 m-46,0 a46,46 0 1,1 92,0 a46,46 0 1,1 -92,0"
                  />
                </defs>
                <text fill="rgba(255,255,255,0.55)" fontSize="9" letterSpacing="3">
                  <textPath href="#ring">
                    {project.client.toUpperCase()} · {project.industry.toUpperCase()} · {project.year} ·{" "}
                  </textPath>
                </text>
                <circle
                  cx="60"
                  cy="60"
                  r="4"
                  fill={project.swatch}
                />
              </svg>
            </div>

            <div className="absolute inset-x-0 bottom-0 flex flex-col gap-4 p-6 sm:flex-row sm:items-end sm:justify-between sm:p-10">
              <div>
                <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/65">
                  {project.client} · {project.year}
                </div>
                <p className="mt-2 max-w-2xl text-balance text-2xl font-semibold leading-snug tracking-tight text-white sm:text-3xl">
                  {project.title}
                </p>
              </div>
              <div className="rounded-2xl border border-white/15 bg-black/55 px-5 py-3 backdrop-blur-md">
                <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/55">
                  Headline metric
                </div>
                <div
                  className="mt-1 text-2xl font-semibold tracking-tight sm:text-3xl"
                  style={{ color: project.swatch }}
                >
                  <Counter value={project.metric.value} />
                </div>
                <div className="text-[11px] font-medium text-white/70">
                  {project.metric.label}
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function SnapshotMeta({ project }: { project: Project }) {
  const items = [
    { label: "Industry", value: project.industry },
    { label: "Year", value: project.year },
    { label: "Duration", value: project.duration },
    { label: "Team", value: project.team },
    { label: "Location", value: project.location },
    { label: "Services", value: project.services.join(" · ") },
  ];
  return (
    <section id="snapshot" className="scroll-mt-24 bg-[#FAFAF7] py-14 text-zinc-900">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-zinc-900/[0.06] bg-zinc-900/[0.06] sm:grid-cols-3 lg:grid-cols-6">
            {items.map((it, i) => (
              <div
                key={it.label}
                className="group relative overflow-hidden bg-white px-5 py-4 transition-colors hover:bg-[#FAFAF7]"
              >
                <div
                  aria-hidden
                  className="pointer-events-none absolute -bottom-px left-0 h-px w-0 transition-all duration-500 group-hover:w-full"
                  style={{ backgroundColor: project.swatch }}
                />
                <dt className="text-[10px] font-semibold uppercase tracking-[0.22em] text-zinc-500">
                  {String(i + 1).padStart(2, "0")} · {it.label}
                </dt>
                <dd className="mt-1 text-sm font-semibold tracking-tight text-zinc-900">
                  {it.value}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}

function LivePreview({ project }: { project: Project }) {
  return (
    <section className="relative isolate overflow-hidden bg-black py-20 text-white sm:py-24">
      <div
        aria-hidden
        className="codlinx-float-orb absolute left-[10%] top-1/3 -z-10 h-[420px] w-[420px] rounded-full opacity-[0.14] blur-[140px]"
        style={{ backgroundColor: project.swatch }}
      />
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <div className="flex flex-col items-start gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] text-white/70 backdrop-blur-md">
                <span
                  className="h-1.5 w-1.5 rounded-full"
                  style={{
                    backgroundColor: project.swatch,
                    animation: "codlinx-grid-pulse 1.4s ease-in-out infinite",
                  }}
                />
                Live preview
              </span>
              <h2 className="mt-5 max-w-2xl text-balance text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
                A glimpse at what the product feels like.
              </h2>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-white/60">
              Animated mock based on the real interface — running in the page, no video.
            </p>
          </div>
        </Reveal>

        <Reveal delay={100}>
          <Tilt max={3} scale={1.01} glare={false} className="relative mt-10">
            <div
              className="relative h-[420px] overflow-hidden rounded-3xl border border-white/[0.08] shadow-[0_30px_80px_-40px_rgba(0,0,0,0.6)] sm:h-[480px]"
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
          </Tilt>
        </Reveal>
      </div>
    </section>
  );
}

function ChallengeSection({ project }: { project: Project }) {
  return (
    <section
      id="challenge"
      className="scroll-mt-24 bg-[#FAFAF7] py-20 text-zinc-900 sm:py-28"
    >
      <div className="mx-auto max-w-4xl px-5 sm:px-8">
        <Reveal>
          <div className="grid grid-cols-1 gap-12 md:grid-cols-[140px_1fr] md:gap-16">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-zinc-500">
                <span
                  className="h-1.5 w-1.5 rounded-full"
                  style={{ backgroundColor: project.swatch }}
                />
                Challenge
              </div>
              <div className="mt-2 text-[10px] font-medium uppercase tracking-[0.2em] text-zinc-400">
                01 / 03
              </div>
            </div>
            <p className="text-balance text-xl leading-snug text-zinc-800 sm:text-2xl">
              {project.challenge}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function ApproachSection({ project }: { project: Project }) {
  return (
    <section
      id="approach"
      className="scroll-mt-24 bg-white py-20 text-zinc-900 sm:py-28"
    >
      <div className="mx-auto max-w-5xl px-5 sm:px-8">
        <Reveal>
          <div className="grid grid-cols-1 gap-10 md:grid-cols-[160px_1fr] md:gap-16">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-zinc-500">
                <span
                  className="h-1.5 w-1.5 rounded-full"
                  style={{ backgroundColor: project.swatch }}
                />
                Approach
              </div>
              <div className="mt-2 text-[10px] font-medium uppercase tracking-[0.2em] text-zinc-400">
                02 / 03
              </div>
              <p className="mt-5 text-sm leading-relaxed text-zinc-500">
                Four steps. No theatre.
              </p>
            </div>
            <ol className="relative flex flex-col gap-4">
              <span
                aria-hidden
                className="pointer-events-none absolute bottom-2 left-5 top-2 w-px"
                style={{
                  background: `linear-gradient(to bottom, transparent, ${project.swatch}55, transparent)`,
                }}
              />
              {project.approach.map((a, i) => (
                <Reveal key={i} delay={i * 80}>
                  <li className="group relative flex gap-5 rounded-2xl border border-zinc-900/[0.06] bg-[#FAFAF7] p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-zinc-900/15 hover:bg-white hover:shadow-[0_18px_40px_-26px_rgba(0,0,0,0.22)]">
                    <span
                      className="relative grid h-10 w-10 shrink-0 place-items-center rounded-xl text-sm font-bold text-white transition-transform duration-300 group-hover:rotate-[-6deg] group-hover:scale-110"
                      style={{ backgroundColor: project.swatch }}
                    >
                      {String(i + 1).padStart(2, "0")}
                      <span
                        aria-hidden
                        className="absolute -inset-1 rounded-xl opacity-0 blur-md transition-opacity duration-300 group-hover:opacity-50"
                        style={{ backgroundColor: project.swatch }}
                      />
                    </span>
                    <p className="text-base leading-relaxed text-zinc-700 sm:text-lg">
                      {a}
                    </p>
                  </li>
                </Reveal>
              ))}
            </ol>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function GallerySection({ project }: { project: Project }) {
  return (
    <section
      id="gallery"
      className="scroll-mt-24 bg-[#FAFAF7] py-20 text-zinc-900 sm:py-24"
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <div className="flex flex-col items-start gap-3">
            <span className="inline-flex items-center gap-2 rounded-full border border-zinc-900/10 bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-zinc-700">
              <span
                className="h-1.5 w-1.5 rounded-full"
                style={{ backgroundColor: project.swatch }}
              />
              In the wild
            </span>
            <h2 className="text-balance text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
              Moments from the engagement.
            </h2>
          </div>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {project.gallery.map((g, idx) => (
            <Reveal key={g.image} delay={idx * 100}>
              <Tilt max={5} scale={1.01} glare={false} className="h-full">
                <div className="group relative h-64 overflow-hidden rounded-3xl border border-zinc-900/[0.06] shadow-[0_18px_50px_-30px_rgba(0,0,0,0.25)]">
                  <Image
                    src={g.image}
                    alt={g.alt}
                    width={1200}
                    height={800}
                    className="h-full w-full object-cover transition-transform duration-[1100ms] ease-out group-hover:scale-[1.09]"
                    sizes="(min-width: 1024px) 33vw, 100vw"
                  />
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(180deg, rgba(0,0,0,0) 45%, rgba(0,0,0,0.6) 100%)",
                    }}
                  />
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    style={{
                      background: `radial-gradient(circle at 30% 30%, ${project.hue}, transparent 60%)`,
                    }}
                  />
                  <div className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/40 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/85 backdrop-blur-md">
                    {String(idx + 1).padStart(2, "0")} / {String(project.gallery.length).padStart(2, "0")}
                  </div>
                  <div className="absolute inset-x-0 bottom-0 translate-y-2 p-5 text-sm font-medium text-white/90 opacity-90 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                    {g.caption}
                  </div>
                </div>
              </Tilt>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function OutcomeSection({ project }: { project: Project }) {
  return (
    <section
      id="outcome"
      className="scroll-mt-24 relative isolate overflow-hidden bg-black py-20 text-white sm:py-28"
    >
      <div
        aria-hidden
        className="codlinx-float-orb absolute left-[8%] top-1/3 -z-10 h-[420px] w-[420px] rounded-full opacity-[0.18] blur-[140px]"
        style={{ backgroundColor: project.swatch }}
      />
      <div
        aria-hidden
        className="codlinx-float-orb absolute right-[8%] top-1/2 -z-10 h-[360px] w-[360px] rounded-full opacity-[0.12] blur-[140px]"
        style={{ backgroundColor: ACCENT, animationDelay: "-9s" }}
      />
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <div className="flex flex-col items-start gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] text-white/70 backdrop-blur-md">
                <span
                  className="h-1 w-1 rounded-full"
                  style={{ backgroundColor: project.swatch }}
                />
                Outcome · 03 / 03
              </span>
              <h2 className="mt-5 max-w-2xl text-balance text-3xl font-semibold leading-[1.1] tracking-tight sm:text-4xl">
                The receipts.
              </h2>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-white/65">
              Numbers agreed in week one, reported on weekly.
            </p>
          </div>
        </Reveal>
        <Reveal delay={120}>
          <dl className="mt-12 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.04] sm:grid-cols-3">
            {project.outcome.map((o, i) => (
              <div
                key={o.label}
                className="group relative overflow-hidden bg-black/60 px-6 py-10 text-center transition-colors duration-300 hover:bg-black/40"
              >
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{
                    background: `radial-gradient(circle at 50% 0%, ${project.swatch}29, transparent 70%)`,
                  }}
                />
                <div
                  aria-hidden
                  className="pointer-events-none absolute -top-px left-0 h-px w-0 transition-all duration-500 group-hover:w-full"
                  style={{ backgroundColor: project.swatch }}
                />
                <dd
                  className="relative text-4xl font-semibold tracking-tight sm:text-6xl"
                  style={{ color: project.swatch }}
                >
                  <Counter value={o.value} delay={i * 140} />
                </dd>
                <dt className="relative mt-3 text-[11px] font-medium uppercase tracking-[0.2em] text-white/55">
                  {o.label}
                </dt>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}

function TestimonialBlock({ project }: { project: Project }) {
  return (
    <section
      id="testimonial"
      className="scroll-mt-24 bg-[#FAFAF7] py-20 sm:py-28"
    >
      <div className="mx-auto max-w-4xl px-5 sm:px-8">
        <Reveal>
          <Tilt
            max={3}
            scale={1.005}
            glare={false}
            className="relative overflow-hidden rounded-3xl border border-zinc-900/[0.06] bg-white p-8 shadow-[0_28px_70px_-40px_rgba(0,0,0,0.25)] sm:p-12"
          >
            <div
              aria-hidden
              className="absolute -right-24 -top-24 h-64 w-64 rounded-full opacity-[0.18] blur-3xl"
              style={{ backgroundColor: project.swatch }}
            />
            <div
              aria-hidden
              className="codlinx-blob absolute -bottom-24 -left-24 h-48 w-48 opacity-[0.12]"
              style={{ backgroundColor: project.swatch }}
            />
            <svg
              viewBox="0 0 24 24"
              className="relative h-10 w-10"
              style={{ color: project.swatch }}
              fill="currentColor"
              aria-hidden
            >
              <path d="M7 7h4v4H8.5c0 2.2 1 3 3 3v3c-4 0-6-2-6-6V7zm9 0h4v4h-2.5c0 2.2 1 3 3 3v3c-4 0-6-2-6-6V7z" />
            </svg>
            <blockquote className="relative mt-5 text-balance text-2xl font-semibold leading-snug tracking-tight text-zinc-900 sm:text-[28px]">
              &ldquo;{project.testimonial.quote}&rdquo;
            </blockquote>
            <figcaption className="relative mt-8 flex items-center gap-4">
              <div className="relative h-14 w-14 shrink-0">
                <span
                  aria-hidden
                  className="absolute -inset-1 rounded-full opacity-30 blur-md"
                  style={{ backgroundColor: project.swatch }}
                />
                <Image
                  src={project.testimonial.avatar}
                  alt={project.testimonial.name}
                  width={64}
                  height={64}
                  className="relative h-14 w-14 rounded-full object-cover ring-2 ring-white"
                />
              </div>
              <div>
                <div className="text-base font-semibold text-zinc-900">
                  {project.testimonial.name}
                </div>
                <div className="text-sm text-zinc-500">
                  {project.testimonial.role}
                </div>
              </div>
              <div className="ml-auto hidden flex-col items-end text-right sm:flex">
                <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-zinc-400">
                  Engagement
                </span>
                <span className="mt-1 text-sm font-semibold text-zinc-900">
                  {project.duration} · {project.year}
                </span>
              </div>
            </figcaption>
          </Tilt>
        </Reveal>
      </div>
    </section>
  );
}

function PrevNext({ prev, next }: { prev: Project; next: Project }) {
  return (
    <section className="bg-white py-16 text-zinc-900">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
          <Reveal direction="left">
            <Link
              href={`/work/${prev.slug}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex h-full items-center justify-between gap-6 overflow-hidden rounded-2xl border border-zinc-900/[0.06] bg-[#FAFAF7] p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-zinc-900/15 hover:shadow-[0_18px_40px_-26px_rgba(0,0,0,0.22)]"
            >
              <div
                aria-hidden
                className="pointer-events-none absolute inset-y-0 left-0 w-0 transition-all duration-500 group-hover:w-1"
                style={{ backgroundColor: prev.swatch }}
              />
              <div className="flex items-center gap-4">
                <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl">
                  <Image
                    src={prev.heroImage}
                    alt={prev.heroAlt}
                    width={120}
                    height={120}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div>
                  <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-zinc-500">
                    ← Previous
                  </div>
                  <div className="mt-1 text-base font-semibold text-zinc-900">
                    {prev.client}
                  </div>
                  <div className="text-xs text-zinc-500">{prev.industry}</div>
                </div>
              </div>
              <svg
                viewBox="0 0 16 16"
                className="h-4 w-4 rotate-180 text-zinc-500 transition-transform duration-300 group-hover:-translate-x-1"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden
              >
                <path d="M3 8h10M9 4l4 4-4 4" />
              </svg>
            </Link>
          </Reveal>
          <Reveal direction="right">
            <Link
              href={`/work/${next.slug}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex h-full items-center justify-between gap-6 overflow-hidden rounded-2xl border border-zinc-900/[0.06] bg-[#FAFAF7] p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-zinc-900/15 hover:shadow-[0_18px_40px_-26px_rgba(0,0,0,0.22)]"
            >
              <div
                aria-hidden
                className="pointer-events-none absolute inset-y-0 right-0 w-0 transition-all duration-500 group-hover:w-1"
                style={{ backgroundColor: next.swatch }}
              />
              <div className="flex items-center gap-4">
                <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl">
                  <Image
                    src={next.heroImage}
                    alt={next.heroAlt}
                    width={120}
                    height={120}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div>
                  <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-zinc-500">
                    Next →
                  </div>
                  <div className="mt-1 text-base font-semibold text-zinc-900">
                    {next.client}
                  </div>
                  <div className="text-xs text-zinc-500">{next.industry}</div>
                </div>
              </div>
              <svg
                viewBox="0 0 16 16"
                className="h-4 w-4 text-zinc-500 transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden
              >
                <path d="M3 8h10M9 4l4 4-4 4" />
              </svg>
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function RelatedWork({ related }: { related: Project[] }) {
  return (
    <section className="bg-[#FAFAF7] py-20 text-zinc-900 sm:py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <div className="flex flex-col items-start gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-zinc-900/10 bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-zinc-700">
                <span
                  className="h-1.5 w-1.5 rounded-full"
                  style={{ backgroundColor: ACCENT }}
                />
                More work
              </span>
              <h2 className="mt-5 text-balance text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
                Other case studies.
              </h2>
            </div>
            <Magnetic>
              <Link
                href="/work"
                className="group inline-flex h-11 items-center gap-2 rounded-full bg-zinc-900 px-5 text-sm font-semibold text-white transition-transform duration-300 hover:bg-black"
              >
                <span className="magnetic-inner inline-flex items-center gap-2">
                  See all work
                  <span
                    className="grid h-6 w-6 place-items-center rounded-full"
                    style={{ backgroundColor: ACCENT }}
                  >
                    <svg
                      viewBox="0 0 16 16"
                      className="h-3 w-3 text-black"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden
                    >
                      <path d="M3 8h10M9 4l4 4-4 4" />
                    </svg>
                  </span>
                </span>
              </Link>
            </Magnetic>
          </div>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          {related.map((p, idx) => (
            <Reveal key={p.slug} delay={idx * 100}>
              <Tilt max={4} scale={1.01} glare={false} className="h-full">
                <Link
                  href={`/work/${p.slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex h-full flex-col overflow-hidden rounded-2xl border border-zinc-900/[0.06] bg-white shadow-[0_18px_40px_-26px_rgba(0,0,0,0.2)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_28px_60px_-26px_rgba(0,0,0,0.32)]"
                >
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={p.heroImage}
                      alt={p.heroAlt}
                      width={900}
                      height={600}
                      className="h-full w-full object-cover transition-transform duration-[1100ms] ease-out group-hover:scale-[1.08]"
                      sizes="(min-width: 768px) 33vw, 100vw"
                    />
                    <div
                      aria-hidden
                      className="pointer-events-none absolute inset-0"
                      style={{
                        background:
                          "linear-gradient(180deg, rgba(0,0,0,0) 45%, rgba(0,0,0,0.55) 100%)",
                      }}
                    />
                    <div className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-black/40 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/85 backdrop-blur-md">
                      <span
                        className="h-1 w-1 rounded-full"
                        style={{ backgroundColor: p.swatch }}
                      />
                      {p.industry}
                    </div>
                  </div>
                  <div className="flex flex-1 flex-col gap-3 p-5">
                    <div className="text-xs font-semibold uppercase tracking-wider text-zinc-700">
                      {p.client}
                    </div>
                    <h3 className="text-base font-semibold leading-snug tracking-tight">
                      {p.title}
                    </h3>
                    <div className="mt-auto flex items-end justify-between border-t border-zinc-900/[0.06] pt-3">
                      <div>
                        <div
                          className="text-xl font-semibold tracking-tight"
                          style={{ color: p.swatch }}
                        >
                          {p.metric.value}
                        </div>
                        <div className="text-[10px] uppercase tracking-[0.18em] text-zinc-500">
                          {p.metric.label}
                        </div>
                      </div>
                      <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-zinc-900 text-white transition-transform duration-300 group-hover:rotate-[-12deg] group-hover:scale-110">
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
                          <path d="M3 8h10M9 4l4 4-4 4" />
                        </svg>
                      </span>
                    </div>
                  </div>
                </Link>
              </Tilt>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
