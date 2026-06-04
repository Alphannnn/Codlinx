"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import DeleteRowButton from "../DeleteRowButton";
import { deleteBlog } from "../../lib/actions/content";
import { formatBlogDate } from "../../lib/formatters";
import type { BlogPostRow } from "../../lib/types";

const ACCENT = "#3FC9B4";

const STATUS_FILTERS = [
  { key: "all", label: "All" },
  { key: "live", label: "Live" },
  { key: "draft", label: "Draft" },
] as const;

type StatusKey = (typeof STATUS_FILTERS)[number]["key"];

export default function BlogListClient({ initial }: { initial: BlogPostRow[] }) {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<StatusKey>("all");
  const [category, setCategory] = useState<string>("all");

  const categories = useMemo(() => {
    const set = new Set<string>();
    initial.forEach((p) => p.category && set.add(p.category));
    return ["all", ...Array.from(set).sort()];
  }, [initial]);

  const counts = useMemo(
    () => ({
      all: initial.length,
      live: initial.filter((p) => p.is_published).length,
      draft: initial.filter((p) => !p.is_published).length,
    }),
    [initial]
  );

  const filtered = useMemo(() => {
    return initial.filter((p) => {
      if (status === "live" && !p.is_published) return false;
      if (status === "draft" && p.is_published) return false;
      if (category !== "all" && p.category !== category) return false;
      if (query.trim()) {
        const q = query.toLowerCase();
        const hay = `${p.title} ${p.slug} ${p.excerpt} ${p.author ?? ""} ${p.category}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }, [initial, status, category, query]);

  return (
    <div className="flex flex-col gap-8">
      {/* Hero */}
      <header
        className="flex flex-col gap-5"
        style={{ animation: "admin-fade-up 0.7s ease-out both" }}
      >
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="flex flex-col gap-3">
            <span className="inline-flex w-fit items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-white/65 backdrop-blur-md">
              <span
                className="h-1.5 w-1.5 rounded-full"
                style={{
                  backgroundColor: ACCENT,
                  boxShadow: `0 0 6px ${ACCENT}`,
                  animation: "admin-active-pulse 1.4s ease-in-out infinite",
                }}
              />
              Blog · {initial.length} posts
            </span>
            <h1
              className="text-balance font-semibold leading-[1] tracking-tight"
              style={{ fontSize: "clamp(36px, 5vw, 56px)", letterSpacing: "-0.03em" }}
            >
              <span
                style={{
                  backgroundImage:
                    "linear-gradient(120deg, #ffffff 0%, #ffffff 55%, #3FC9B4 100%)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  color: "transparent",
                }}
              >
                Field notes — the studio voice.
              </span>
            </h1>
            <p className="max-w-xl text-base text-white/55 sm:text-lg">
              Write, edit, and ship long-form posts. Drafts stay private until
              you flip them live.
            </p>
          </div>
          <Link
            href="/admin/blog/new"
            className="group inline-flex h-11 items-center gap-2 rounded-full px-5 text-sm font-semibold transition-all hover:-translate-y-px"
            style={{
              background: "linear-gradient(120deg, #3FC9B4 0%, #2AA791 100%)",
              color: "#0a0a0e",
              boxShadow:
                "0 0 0 1px rgba(63,201,180,0.3), 0 8px 24px -12px rgba(63,201,180,0.5)",
            }}
          >
            <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M8 3v10M3 8h10" />
            </svg>
            New post
          </Link>
        </div>

        {/* Mini stats */}
        <div className="flex flex-wrap gap-2">
          <Stat label="Live" value={counts.live} hue="#34D399" />
          <Stat label="Drafts" value={counts.draft} hue="#FBBF24" />
          <Stat label="Categories" value={categories.length - 1} hue="#F472B6" />
        </div>
      </header>

      {/* Filter + search */}
      <div
        className="flex flex-col gap-3 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-3 backdrop-blur-xl sm:flex-row sm:items-center sm:justify-between sm:gap-4"
        style={{ animation: "admin-fade-up 0.7s 0.08s ease-out both" }}
      >
        <div className="flex flex-wrap gap-1.5">
          {STATUS_FILTERS.map((s) => {
            const active = status === s.key;
            const hue =
              s.key === "live" ? "#34D399" : s.key === "draft" ? "#FBBF24" : ACCENT;
            return (
              <button
                key={s.key}
                type="button"
                onClick={() => setStatus(s.key)}
                className="inline-flex h-9 items-center gap-2 rounded-full px-3.5 text-xs font-medium transition-all"
                style={{
                  backgroundColor: active ? `${hue}1f` : "transparent",
                  color: active ? hue : "rgba(255,255,255,0.65)",
                  boxShadow: active
                    ? `inset 0 0 0 1px ${hue}55`
                    : "inset 0 0 0 1px rgba(255,255,255,0.06)",
                }}
              >
                {s.key !== "all" && (
                  <span
                    className="h-1.5 w-1.5 rounded-full"
                    style={{ backgroundColor: hue, boxShadow: active ? `0 0 6px ${hue}` : undefined }}
                  />
                )}
                {s.label}
                <span
                  className="font-mono tabular-nums"
                  style={{
                    color: active ? "inherit" : "rgba(255,255,255,0.4)",
                    fontSize: 10,
                  }}
                >
                  {counts[s.key]}
                </span>
              </button>
            );
          })}
          <span className="mx-1 hidden h-5 w-px self-center bg-white/[0.06] sm:block" />
          {categories.length > 1 &&
            categories.map((c) => {
              const active = category === c;
              return (
                <button
                  key={c}
                  type="button"
                  onClick={() => setCategory(c)}
                  className="inline-flex h-9 items-center rounded-full px-3.5 text-xs font-medium capitalize transition-all"
                  style={{
                    backgroundColor: active ? "rgba(255,255,255,0.08)" : "transparent",
                    color: active ? "white" : "rgba(255,255,255,0.55)",
                    boxShadow: active
                      ? "inset 0 0 0 1px rgba(255,255,255,0.15)"
                      : "inset 0 0 0 1px rgba(255,255,255,0.04)",
                  }}
                >
                  {c === "all" ? "All categories" : c}
                </button>
              );
            })}
        </div>

        <div className="relative sm:w-72">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            type="search"
            placeholder="Search title, slug, author…"
            className="search-input h-9 w-full rounded-full border border-white/[0.06] bg-white/[0.02] pl-9 pr-3 text-sm text-white placeholder:text-white/35 focus:border-white/15 focus:bg-white/[0.04] focus:outline-none"
          />
          <svg
            viewBox="0 0 16 16"
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/45"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
          >
            <circle cx="7" cy="7" r="4.5" />
            <path d="M11 11l3 3" />
          </svg>
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              aria-label="Clear search"
              className="absolute right-2 top-1/2 grid h-6 w-6 -translate-y-1/2 place-items-center rounded-full text-white/45 hover:bg-white/[0.06] hover:text-white"
            >
              <svg viewBox="0 0 16 16" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
                <path d="M3 3l10 10M13 3L3 13" />
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* List */}
      {filtered.length === 0 ? (
        <div
          className="rounded-3xl border border-dashed border-white/[0.06] bg-white/[0.02] px-6 py-16 text-center backdrop-blur-xl"
          style={{ animation: "admin-fade-up 0.6s 0.15s ease-out both" }}
        >
          <div
            className="mx-auto grid h-12 w-12 place-items-center rounded-2xl"
            style={{ backgroundColor: "rgba(244,114,182,0.10)" }}
          >
            <svg viewBox="0 0 16 16" className="h-5 w-5" style={{ color: "#F472B6" }} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M3 2.5h7a2 2 0 0 1 2 2V14H5a2 2 0 0 1-2-2V2.5zM12 14V4.5" />
            </svg>
          </div>
          <p className="mt-4 text-base font-semibold tracking-tight">
            {initial.length === 0 ? "No posts yet." : "Nothing matches this filter."}
          </p>
          <p className="mt-1 text-sm text-white/55">
            {initial.length === 0
              ? "Click New post to publish your first field note."
              : "Try clearing the search or changing the status."}
          </p>
          {initial.length === 0 && (
            <Link
              href="/admin/blog/new"
              className="mt-6 inline-flex h-10 items-center gap-2 rounded-full px-4 text-sm font-semibold"
              style={{
                background: "linear-gradient(120deg, #3FC9B4 0%, #2AA791 100%)",
                color: "#0a0a0e",
              }}
            >
              <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M8 3v10M3 8h10" />
              </svg>
              Write the first one
            </Link>
          )}
        </div>
      ) : (
        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {filtered.map((p, i) => (
            <PostCard key={p.id} post={p} index={i} />
          ))}
        </ul>
      )}

      <style jsx global>{`
        .search-input::-webkit-search-cancel-button {
          display: none;
        }
      `}</style>
    </div>
  );
}

function PostCard({ post, index }: { post: BlogPostRow; index: number }) {
  const dateLabel = formatBlogDate(post.published_at ?? post.created_at);
  return (
    <li
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-xl transition-all hover:-translate-y-0.5 hover:border-white/[0.14]"
      style={{ animation: `admin-fade-up 0.5s ${0.1 + index * 0.04}s ease-out both` }}
    >
      <Link
        href={`/blog/${post.slug}`}
        target="_blank"
        rel="noopener noreferrer"
        className="relative block aspect-[16/9] overflow-hidden bg-gradient-to-br from-zinc-800 to-zinc-950"
        aria-label={`Preview ${post.title}`}
      >
        {post.cover_image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={post.cover_image}
            alt=""
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
            loading="lazy"
          />
        ) : (
          <span
            aria-hidden
            className="absolute inset-0"
            style={{
              background: `radial-gradient(circle at 30% 20%, ${post.hue}, transparent 60%)`,
            }}
          />
        )}
        <span
          aria-hidden
          className="absolute inset-0"
          style={{
            background: "linear-gradient(180deg, rgba(0,0,0,0.1) 30%, rgba(0,0,0,0.65) 100%)",
          }}
        />
        <div className="absolute inset-x-4 top-4 flex items-center justify-between">
          <StatusChip live={post.is_published} />
          <span className="inline-flex items-center gap-1.5 rounded-full bg-black/45 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/85 backdrop-blur-md">
            <span
              className="h-1 w-1 rounded-full"
              style={{ backgroundColor: ACCENT }}
            />
            {post.category}
          </span>
        </div>
        <div className="absolute inset-x-4 bottom-4 flex items-center justify-between text-[11px] text-white/70">
          <span className="font-mono uppercase tracking-[0.18em]">{dateLabel}</span>
          <span>{post.read_time}</span>
        </div>
      </Link>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <h3 className="text-balance text-base font-semibold leading-snug tracking-tight text-white">
          {post.title}
        </h3>
        <p className="line-clamp-2 text-sm leading-relaxed text-white/55">
          {post.excerpt}
        </p>
        <div className="mt-auto flex items-center justify-between pt-3">
          <div className="min-w-0 truncate">
            <div className="truncate text-xs text-white/70">{post.author || "Codlinx team"}</div>
            <div className="truncate font-mono text-[10px] text-white/35">/blog/{post.slug}</div>
          </div>
          <div className="flex shrink-0 items-center gap-1.5">
            <Link
              href={`/blog/${post.slug}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="View live"
              className="grid h-8 w-8 place-items-center rounded-full border border-white/[0.06] bg-white/[0.02] text-white/65 transition-all hover:border-white/20 hover:text-white"
            >
              <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M6 3H4a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-2M9 3h4v4M7 9l6-6" />
              </svg>
            </Link>
            <Link
              href={`/admin/blog/edit/${post.id}`}
              aria-label="Edit"
              className="grid h-8 w-8 place-items-center rounded-full text-black transition-all"
              style={{
                background: "linear-gradient(120deg, #3FC9B4 0%, #2AA791 100%)",
                boxShadow: "0 0 0 1px rgba(63,201,180,0.3)",
              }}
            >
              <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M11 2l3 3-8 8H3v-3l8-8z" />
              </svg>
            </Link>
            <DeleteRowButton id={post.id} action={deleteBlog} label="Delete post?" />
          </div>
        </div>
      </div>
    </li>
  );
}

function StatusChip({ live }: { live: boolean }) {
  const color = live ? "#34D399" : "#FBBF24";
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full border bg-black/45 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] backdrop-blur-md"
      style={{ borderColor: `${color}40`, color }}
    >
      <span
        className="h-1.5 w-1.5 rounded-full"
        style={{ backgroundColor: color, boxShadow: `0 0 6px ${color}` }}
      />
      {live ? "Live" : "Draft"}
    </span>
  );
}

function Stat({ label, value, hue }: { label: string; value: number; hue: string }) {
  return (
    <div className="inline-flex items-center gap-2.5 rounded-full border border-white/[0.06] bg-white/[0.02] px-3 py-1.5 backdrop-blur-md">
      <span
        className="h-1.5 w-1.5 rounded-full"
        style={{ backgroundColor: hue, boxShadow: `0 0 6px ${hue}` }}
      />
      <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/55">
        {label}
      </span>
      <span className="font-mono text-xs font-semibold tabular-nums text-white">{value}</span>
    </div>
  );
}
