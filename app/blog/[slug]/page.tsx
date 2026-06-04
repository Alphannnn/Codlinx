import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import PageHero from "../../components/PageHero";
import ClosingCTA from "../../components/ClosingCTA";
import CursorGlow from "../../components/CursorGlow";
import Reveal from "../../components/Reveal";
import ScrollProgress from "../../components/ScrollProgress";
import Magnetic from "../../components/Magnetic";
import { getBlogPost, listBlogPosts } from "../../lib/data";
import { getStaticClient } from "../../lib/supabase/server";
import { SUPABASE_CONFIGURED } from "../../lib/supabase/config";
import { formatBlogDate } from "../../lib/formatters";
import type { BlogPostRow } from "../../lib/types";

const ACCENT = "#3FC9B4";

export async function generateStaticParams() {
  if (SUPABASE_CONFIGURED) {
    const supabase = getStaticClient();
    if (!supabase) return [];
    const { data } = await supabase
      .from("blog_posts")
      .select("slug")
      .eq("is_published", true);
    return (data ?? []).map((p) => ({ slug: p.slug }));
  }
  const posts = await listBlogPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPost(slug);
  if (!post) return { title: "Post not found" };
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `/blog/${post.slug}`,
      type: "article",
      images: post.cover_image ? [{ url: post.cover_image }] : undefined,
      authors: [post.author],
      publishedTime: post.published_at ?? post.created_at,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: post.cover_image ? [post.cover_image] : undefined,
    },
  };
}

function paragraphs(body: string): string[] {
  return body
    .split(/\n+/)
    .map((s) => s.trim())
    .filter(Boolean);
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getBlogPost(slug);
  if (!post) notFound();

  const all = await listBlogPosts();
  const index = all.findIndex((p) => p.slug === post.slug);
  const prev = index > 0 ? all[index - 1] : null;
  const next = index >= 0 && index < all.length - 1 ? all[index + 1] : null;
  const related = all.filter((p) => p.slug !== post.slug).slice(0, 3);

  const displayDate = formatBlogDate(post.published_at ?? post.created_at);
  const bodyParagraphs = paragraphs(post.body);

  return (
    <>
      <CursorGlow />
      <ScrollProgress />

      <PageHero
        eyebrow={`${post.category} · ${displayDate}`}
        title={post.title.replace(/\.$/, "")}
        description={post.excerpt}
        backHref="/blog"
        backLabel="All posts"
      >
        <div className="mt-8 flex flex-wrap items-center gap-4 text-sm text-white/65">
          <div className="inline-flex items-center gap-2">
            <span
              className="grid h-8 w-8 place-items-center rounded-full text-[11px] font-bold text-black"
              style={{ backgroundColor: ACCENT }}
            >
              {post.author
                .split(" ")
                .map((w) => w[0])
                .slice(0, 2)
                .join("")}
            </span>
            <span className="flex flex-col leading-tight">
              <span className="font-semibold text-white">{post.author}</span>
              {post.author_role && (
                <span className="text-xs text-white/55">{post.author_role}</span>
              )}
            </span>
          </div>
          <span className="hidden text-white/25 sm:inline">·</span>
          <span className="text-xs uppercase tracking-[0.22em] text-white/55">
            {post.read_time}
          </span>
        </div>
      </PageHero>

      <article className="bg-[#FAFAF7] py-16 text-zinc-900 sm:py-24">
        <div className="mx-auto max-w-3xl px-5 sm:px-8">
          <Reveal>
            <div className="relative h-56 overflow-hidden rounded-3xl border border-zinc-900/[0.06] sm:h-80">
              {post.cover_image ? (
                <Image
                  src={post.cover_image}
                  alt={post.title}
                  fill
                  sizes="(min-width: 768px) 768px, 100vw"
                  className="object-cover"
                  priority
                />
              ) : (
                <div
                  className="absolute inset-0"
                  style={{
                    background: "linear-gradient(135deg, #0a0a0b 0%, #111114 100%)",
                  }}
                />
              )}
              <div
                aria-hidden
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(0,0,0,0.08) 30%, rgba(0,0,0,0.55) 100%)",
                }}
              />
              <div
                aria-hidden
                className="absolute inset-0"
                style={{
                  background: `radial-gradient(circle at 30% 20%, ${post.hue}, transparent 60%)`,
                }}
              />
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-6 text-white">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/45 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] backdrop-blur-md">
                  <span
                    className="h-1.5 w-1.5 rounded-full"
                    style={{ backgroundColor: ACCENT }}
                  />
                  {post.category}
                </span>
                <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-white/70">
                  {displayDate}
                </span>
              </div>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="mt-12 flex flex-col gap-7 text-[17px] leading-[1.75] text-zinc-700 sm:text-lg sm:leading-[1.8]">
              {bodyParagraphs.map((p, i) => (
                <p
                  key={i}
                  className={
                    i === 0
                      ? "text-balance text-xl font-medium leading-[1.55] text-zinc-900 sm:text-2xl"
                      : "text-pretty"
                  }
                >
                  {p}
                </p>
              ))}
            </div>
          </Reveal>

          <Reveal delay={200}>
            <div className="mt-14 flex flex-col gap-6 rounded-3xl border border-zinc-900/[0.06] bg-white p-6 shadow-[0_18px_50px_-30px_rgba(0,0,0,0.18)] sm:flex-row sm:items-center sm:gap-8 sm:p-8">
              <span
                className="grid h-14 w-14 shrink-0 place-items-center rounded-full text-base font-bold text-black"
                style={{ backgroundColor: ACCENT }}
              >
                {post.author
                  .split(" ")
                  .map((w) => w[0])
                  .slice(0, 2)
                  .join("")}
              </span>
              <div className="flex-1">
                <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-zinc-500">
                  Written by
                </div>
                <div className="mt-1 text-lg font-semibold tracking-tight">
                  {post.author}
                </div>
                {post.author_role && (
                  <div className="text-sm text-zinc-500">{post.author_role}</div>
                )}
              </div>
              <Magnetic>
                <Link
                  href="/contact"
                  className="inline-flex h-11 items-center gap-2 rounded-full bg-zinc-900 px-5 text-sm font-semibold text-white"
                >
                  <span className="magnetic-inner inline-flex items-center gap-2">
                    Work with us
                    <span
                      className="grid h-6 w-6 place-items-center rounded-full"
                      style={{ backgroundColor: ACCENT }}
                    >
                      <svg
                        viewBox="0 0 16 16"
                        className="h-3 w-3 text-black"
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
                  </span>
                </Link>
              </Magnetic>
            </div>
          </Reveal>
        </div>
      </article>

      <PrevNext prev={prev} next={next} />
      <RelatedPosts related={related} />

      <ClosingCTA
        eyebrow="Have something to ship?"
        title="Bring us the hard problem."
        body="We don't write thought leadership for traffic. We write what we learn from real builds. If you've got a real build, let's talk."
        primary={{ label: "Start a project", href: "/contact" }}
        secondary={{ label: "More posts", href: "/blog" }}
      />
    </>
  );
}

function PrevNext({
  prev,
  next,
}: {
  prev: BlogPostRow | null;
  next: BlogPostRow | null;
}) {
  if (!prev && !next) return null;
  return (
    <section className="bg-white py-16 text-zinc-900">
      <div className="mx-auto max-w-4xl px-5 sm:px-8">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
          {prev ? (
            <Reveal direction="left">
              <Link
                href={`/blog/${prev.slug}`}
                className="group relative flex h-full items-center justify-between gap-6 overflow-hidden rounded-2xl border border-zinc-900/[0.06] bg-[#FAFAF7] p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-zinc-900/15 hover:shadow-[0_18px_40px_-26px_rgba(0,0,0,0.22)]"
              >
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-y-0 left-0 w-0 transition-all duration-500 group-hover:w-1"
                  style={{ backgroundColor: ACCENT }}
                />
                <div>
                  <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-zinc-500">
                    ← Previous
                  </div>
                  <div className="mt-1 text-base font-semibold text-zinc-900">
                    {prev.title}
                  </div>
                  <div className="text-xs text-zinc-500">
                    {prev.category} · {prev.read_time}
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
          ) : (
            <span />
          )}
          {next ? (
            <Reveal direction="right">
              <Link
                href={`/blog/${next.slug}`}
                className="group relative flex h-full items-center justify-between gap-6 overflow-hidden rounded-2xl border border-zinc-900/[0.06] bg-[#FAFAF7] p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-zinc-900/15 hover:shadow-[0_18px_40px_-26px_rgba(0,0,0,0.22)]"
              >
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-y-0 right-0 w-0 transition-all duration-500 group-hover:w-1"
                  style={{ backgroundColor: ACCENT }}
                />
                <div>
                  <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-zinc-500">
                    Next →
                  </div>
                  <div className="mt-1 text-base font-semibold text-zinc-900">
                    {next.title}
                  </div>
                  <div className="text-xs text-zinc-500">
                    {next.category} · {next.read_time}
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
          ) : (
            <span />
          )}
        </div>
      </div>
    </section>
  );
}

function RelatedPosts({ related }: { related: BlogPostRow[] }) {
  if (related.length === 0) return null;
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
                Keep reading
              </span>
              <h2 className="mt-5 text-balance text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
                More from the studio.
              </h2>
            </div>
          </div>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          {related.map((p, idx) => (
            <Reveal key={p.slug} delay={idx * 100}>
              <Link
                href={`/blog/${p.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-zinc-900/[0.06] bg-white shadow-[0_18px_40px_-26px_rgba(0,0,0,0.2)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_28px_60px_-26px_rgba(0,0,0,0.32)]"
              >
                <div className="relative h-44 overflow-hidden">
                  {p.cover_image ? (
                    <Image
                      src={p.cover_image}
                      alt={p.title}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                    />
                  ) : (
                    <div
                      className="absolute inset-0"
                      style={{
                        background:
                          "linear-gradient(135deg, #0a0a0b 0%, #111114 100%)",
                      }}
                    />
                  )}
                  <div
                    aria-hidden
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(180deg, rgba(0,0,0,0.05) 40%, rgba(0,0,0,0.55) 100%)",
                    }}
                  />
                  <div
                    aria-hidden
                    className="absolute inset-0"
                    style={{
                      background: `radial-gradient(circle at 30% 20%, ${p.hue}, transparent 60%)`,
                    }}
                  />
                  <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-black/40 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/90 backdrop-blur-md">
                    <span
                      className="h-1 w-1 rounded-full"
                      style={{ backgroundColor: ACCENT }}
                    />
                    {p.category}
                  </span>
                </div>
                <div className="flex flex-1 flex-col gap-3 p-5">
                  <div className="text-[11px] uppercase tracking-[0.2em] text-zinc-500">
                    {formatBlogDate(p.published_at ?? p.created_at)} · {p.read_time}
                  </div>
                  <h3 className="text-balance text-base font-semibold leading-snug tracking-tight">
                    {p.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-zinc-600">
                    {p.excerpt}
                  </p>
                  <span className="mt-auto inline-flex items-center gap-1.5 text-sm font-medium text-zinc-700 transition-colors group-hover:text-zinc-900">
                    Read
                    <svg
                      viewBox="0 0 16 16"
                      className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden
                    >
                      <path d="M3 8h10M9 4l4 4-4 4" />
                    </svg>
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
