import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import PageHero from "../components/PageHero";
import ClosingCTA from "../components/ClosingCTA";
import { listBlogPosts } from "../lib/data";
import { formatBlogDate } from "../lib/formatters";

const ACCENT = "#3FC9B4";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Field notes from Codlinx engineers and designers — on Next.js, AI, mobile, and the practice of shipping software.",
  alternates: { canonical: "/blog" },
};

const CATEGORIES = ["All", "Engineering", "AI", "Mobile", "Cloud", "Design", "Strategy"];

export default async function BlogPage() {
  const posts = await listBlogPosts();
  if (posts.length === 0) {
    return (
      <>
        <PageHero
          eyebrow="Field notes"
          title="What we're learning,"
          highlight="in writing."
          description="Long-form posts from our engineers, designers, and strategists."
        />
        <section className="bg-[#FAFAF7] py-24 text-zinc-900">
          <div className="mx-auto max-w-3xl px-5 text-center sm:px-8">
            <p className="text-lg text-zinc-600">No posts yet. Check back soon.</p>
          </div>
        </section>
        <ClosingCTA
          eyebrow="Stay in the loop"
          title="Get one post a month, no fluff."
          body="The best of what our team writes, in your inbox. Unsubscribe in one click."
          primary={{ label: "Subscribe", href: "/contact" }}
        />
      </>
    );
  }

  const [featured, ...rest] = posts;
  return (
    <>
      <PageHero
        eyebrow="Field notes"
        title="What we're learning,"
        highlight="in writing."
        description="Long-form posts from our engineers, designers, and strategists. No thought leadership — just the things we wish we'd known on day one."
      />

      <section className="bg-[#FAFAF7] py-20 text-zinc-900 sm:py-28">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <ul className="flex flex-wrap gap-2">
            {CATEGORIES.map((c, i) => (
              <li key={c}>
                <button
                  type="button"
                  className={[
                    "inline-flex h-9 items-center rounded-full border px-3.5 text-sm font-medium transition-colors",
                    i === 0
                      ? "border-zinc-900 bg-zinc-900 text-white"
                      : "border-zinc-900/10 bg-white text-zinc-700 hover:border-zinc-900/30",
                  ].join(" ")}
                >
                  {c}
                </button>
              </li>
            ))}
          </ul>

          <article className="mt-10 grid grid-cols-1 overflow-hidden rounded-3xl border border-zinc-900/[0.06] bg-white shadow-[0_24px_60px_-30px_rgba(0,0,0,0.18)] lg:grid-cols-[1.1fr_1fr]">
            <div className="relative min-h-[280px] overflow-hidden sm:min-h-[360px] lg:min-h-[440px]">
              {featured.cover_image ? (
                <Image
                  src={featured.cover_image}
                  alt={featured.title}
                  fill
                  sizes="(min-width: 1024px) 55vw, 100vw"
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
                    "linear-gradient(180deg, rgba(0,0,0,0.12) 0%, rgba(0,0,0,0.55) 100%)",
                }}
              />
              <div
                aria-hidden
                className="absolute inset-0"
                style={{
                  background: `radial-gradient(circle at 30% 20%, ${featured.hue}, transparent 60%)`,
                }}
              />
              <div className="relative flex h-full flex-col justify-between p-10 text-white">
                <span className="inline-flex items-center gap-1.5 self-start rounded-full bg-white/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] backdrop-blur-md">
                  <span
                    className="h-1 w-1 rounded-full"
                    style={{ backgroundColor: ACCENT }}
                  />
                  Featured
                </span>
                <div>
                  <div className="text-[11px] uppercase tracking-[0.2em] text-white/70">
                    {featured.category} · {formatBlogDate(featured.published_at ?? featured.created_at)}
                  </div>
                  <h2 className="mt-3 text-balance text-2xl font-semibold leading-tight tracking-tight sm:text-3xl">
                    {featured.title}
                  </h2>
                </div>
              </div>
            </div>
            <div className="flex flex-col justify-between p-8 sm:p-10">
              <div>
                <div className="text-xs uppercase tracking-[0.2em] text-zinc-500">
                  {featured.read_time} · by {featured.author}
                </div>
                <p className="mt-5 max-w-lg text-base leading-relaxed text-zinc-600 sm:text-lg">
                  {featured.excerpt}
                </p>
              </div>
              <Link
                href={`/blog/${featured.slug}`}
                className="mt-8 inline-flex h-12 w-fit items-center gap-2 rounded-full bg-zinc-900 px-6 text-sm font-semibold text-white transition-transform hover:scale-[1.03]"
              >
                Read post
                <span
                  className="grid h-7 w-7 place-items-center rounded-full"
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
              </Link>
            </div>
          </article>

          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {rest.map((p) => (
              <Link
                key={p.slug}
                href={`/blog/${p.slug}`}
                className="group flex flex-col overflow-hidden rounded-2xl border border-zinc-900/[0.06] bg-white shadow-[0_16px_40px_-24px_rgba(0,0,0,0.15)] transition-all hover:-translate-y-1 hover:shadow-[0_24px_60px_-24px_rgba(0,0,0,0.22)]"
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
                  <span className="absolute left-5 top-5 inline-flex items-center gap-1.5 rounded-full bg-black/45 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-white backdrop-blur-md">
                    <span
                      className="h-1 w-1 rounded-full"
                      style={{ backgroundColor: ACCENT }}
                    />
                    {p.category}
                  </span>
                </div>
                <div className="flex flex-1 flex-col gap-4 p-6">
                  <div className="text-[11px] uppercase tracking-[0.2em] text-zinc-500">
                    {formatBlogDate(p.published_at ?? p.created_at)} · {p.read_time}
                  </div>
                  <h3 className="text-balance text-lg font-semibold leading-tight tracking-tight">
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
            ))}
          </div>
        </div>
      </section>

      <ClosingCTA
        eyebrow="Stay in the loop"
        title="Get one post a month, no fluff."
        body="The best of what our team writes, in your inbox. Unsubscribe in one click."
        primary={{ label: "Subscribe", href: "/contact" }}
      />
    </>
  );
}
