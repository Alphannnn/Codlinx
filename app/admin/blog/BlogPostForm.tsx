"use client";

import { useMemo, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { saveBlogPost } from "../../lib/actions/content";
import type { BlogPostRow } from "../../lib/types";

const ACCENT = "#3FC9B4";

const CATEGORIES = ["Engineering", "AI", "Mobile", "Cloud", "Design", "Strategy"];
const HUES: { label: string; value: string }[] = [
  { label: "Accent", value: "rgba(63,201,180,0.22)" },
  { label: "Indigo", value: "rgba(99,102,241,0.22)" },
  { label: "Pink", value: "rgba(244,114,182,0.22)" },
  { label: "Amber", value: "rgba(251,191,36,0.22)" },
  { label: "Coral", value: "rgba(216,124,87,0.22)" },
];

function slugify(s: string) {
  return s
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 80);
}

export default function BlogPostForm({
  initial,
  mode,
}: {
  initial?: Partial<BlogPostRow>;
  mode: "new" | "edit";
}) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const [title, setTitle] = useState(initial?.title ?? "");
  const [slug, setSlug] = useState(initial?.slug ?? "");
  const [category, setCategory] = useState(initial?.category ?? "Engineering");
  const [readTime, setReadTime] = useState(initial?.read_time ?? "5 min read");
  const [excerpt, setExcerpt] = useState(initial?.excerpt ?? "");
  const [body, setBody] = useState(initial?.body ?? "");
  const [author, setAuthor] = useState(initial?.author ?? "");
  const [authorRole, setAuthorRole] = useState(initial?.author_role ?? "");
  const [hue, setHue] = useState(initial?.hue ?? HUES[0].value);
  const [coverImage, setCoverImage] = useState(initial?.cover_image ?? "");
  const [isPublished, setIsPublished] = useState(initial?.is_published ?? true);

  const effectiveSlug = useMemo(() => slug || slugify(title), [slug, title]);
  const wordCount = useMemo(() => body.trim().split(/\s+/).filter(Boolean).length, [body]);
  const estReadMin = Math.max(1, Math.round(wordCount / 200));

  const submit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    setError(null);
    const fd = new FormData();
    if (initial?.id) fd.set("id", initial.id);
    fd.set("title", title);
    if (slug) fd.set("slug", slug);
    fd.set("category", category);
    fd.set("read_time", readTime);
    fd.set("excerpt", excerpt);
    fd.set("body", body);
    fd.set("author", author);
    fd.set("author_role", authorRole);
    fd.set("hue", hue);
    fd.set("cover_image", coverImage);
    if (isPublished) fd.set("is_published", "on");
    if (initial?.created_at) fd.set("created_at", initial.created_at);
    startTransition(async () => {
      const res = await saveBlogPost(fd);
      if (!res.ok) {
        setError(res.error);
        return;
      }
      router.push("/admin/blog");
      router.refresh();
    });
  };

  return (
    <form onSubmit={submit} className="flex flex-col gap-8">
      {/* Hero */}
      <header
        className="flex flex-wrap items-end justify-between gap-4"
        style={{ animation: "admin-fade-up 0.7s ease-out both" }}
      >
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
            {mode === "new" ? "New post" : "Edit post"}
          </span>
          <h1
            className="text-balance font-semibold leading-[1.05] tracking-tight"
            style={{ fontSize: "clamp(32px, 4.5vw, 48px)", letterSpacing: "-0.03em" }}
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
              {mode === "new" ? "Write a new field note." : title || "Edit field note"}
            </span>
          </h1>
        </div>
        <Link
          href="/admin/blog"
          className="inline-flex h-9 items-center gap-1.5 rounded-full border border-white/[0.06] bg-white/[0.02] px-3.5 text-xs font-medium text-white/75 transition-all hover:border-white/15 hover:text-white"
        >
          <svg viewBox="0 0 16 16" className="h-3 w-3 rotate-180" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M3 8h10M9 4l4 4-4 4" />
          </svg>
          Back to posts
        </Link>
      </header>

      <div
        className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_340px] lg:gap-8"
        style={{ animation: "admin-fade-up 0.7s 0.08s ease-out both" }}
      >
        {/* Main column */}
        <div className="flex flex-col gap-5">
          <Field label="Title" required>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              maxLength={120}
              placeholder="Ship the eval before the prompt."
              className="admin-input text-lg font-semibold tracking-tight"
            />
          </Field>

          <Field
            label="Slug"
            hint={
              <span className="flex items-center gap-1.5 font-mono text-white/55">
                <span className="text-white/35">/blog/</span>
                <span className="text-white/80">{effectiveSlug || "auto-from-title"}</span>
              </span>
            }
          >
            <input
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              placeholder="auto-generated-from-title"
              className="admin-input"
            />
          </Field>

          <Field
            label="Excerpt"
            required
            hint={`${excerpt.length} / 220 chars`}
          >
            <textarea
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              required
              rows={3}
              maxLength={220}
              placeholder="One sentence. What's the post about and why should I read it?"
              className="admin-input"
            />
          </Field>

          <Field
            label="Cover image URL"
            hint="Public image URL (Unsplash, your CDN, etc). Falls back to a hue gradient if empty."
          >
            <input
              value={coverImage}
              onChange={(e) => setCoverImage(e.target.value)}
              placeholder="https://images.unsplash.com/photo-…"
              className="admin-input"
            />
            <CoverPreview src={coverImage} hue={hue} category={category} />
          </Field>

          <Field
            label="Body"
            required
            hint={`${wordCount} words · ~${estReadMin} min read`}
          >
            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              required
              rows={16}
              placeholder="One paragraph per line. Plain text for now — markdown coming later."
              className="admin-input font-mono text-[13px] leading-relaxed"
            />
          </Field>
        </div>

        {/* Sidebar */}
        <aside className="flex flex-col gap-4">
          <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5 backdrop-blur-xl">
            <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/55">
              Publication
            </div>

            <label className="mt-4 flex cursor-pointer items-start gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] p-3 transition-colors hover:border-white/[0.14]">
              <PublishToggle on={isPublished} onChange={setIsPublished} />
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-white">
                  {isPublished ? "Publish on save" : "Keep as draft"}
                </span>
                <span className="text-[11px] text-white/55">
                  {isPublished
                    ? "Visible at /blog and in search."
                    : "Hidden from public — admin-only."}
                </span>
              </div>
            </label>

            <div className="mt-5 flex flex-col gap-4">
              <Field label="Category">
                <DarkSelect
                  value={category}
                  onChange={setCategory}
                  options={CATEGORIES}
                />
              </Field>
              <Field label="Read time">
                <input
                  value={readTime}
                  onChange={(e) => setReadTime(e.target.value)}
                  placeholder="5 min read"
                  className="admin-input"
                />
              </Field>
            </div>
          </div>

          <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5 backdrop-blur-xl">
            <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/55">
              Byline
            </div>
            <div className="mt-4 flex flex-col gap-4">
              <Field label="Author">
                <input
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  placeholder="Your name"
                  className="admin-input"
                />
              </Field>
              <Field label="Author role">
                <input
                  value={authorRole}
                  onChange={(e) => setAuthorRole(e.target.value)}
                  placeholder="Principal Engineer"
                  className="admin-input"
                />
              </Field>
            </div>
          </div>

          <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5 backdrop-blur-xl">
            <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/55">
              Hero hue
            </div>
            <p className="mt-1 text-[11px] text-white/45">
              Used when the cover image is empty or as a tint overlay.
            </p>
            <div className="mt-3 grid grid-cols-5 gap-2">
              {HUES.map((h) => {
                const active = hue === h.value;
                return (
                  <button
                    key={h.value}
                    type="button"
                    onClick={() => setHue(h.value)}
                    aria-label={h.label}
                    aria-pressed={active}
                    className="group/hue relative grid aspect-square place-items-center overflow-hidden rounded-xl border transition-all"
                    style={{
                      borderColor: active ? "rgba(255,255,255,0.4)" : "rgba(255,255,255,0.06)",
                      boxShadow: active
                        ? "0 0 0 1px rgba(255,255,255,0.4), 0 8px 20px -10px rgba(63,201,180,0.4)"
                        : undefined,
                    }}
                  >
                    <span
                      className="absolute inset-0"
                      style={{
                        background: `radial-gradient(circle at 30% 30%, ${h.value}, rgba(10,10,14,0.6) 75%)`,
                      }}
                    />
                    {active && (
                      <svg viewBox="0 0 16 16" className="relative h-4 w-4 text-white" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                        <path d="M3 8l4 4 6-8" />
                      </svg>
                    )}
                  </button>
                );
              })}
            </div>
            <div className="mt-2 text-center text-[10px] uppercase tracking-[0.22em] text-white/45">
              {HUES.find((h) => h.value === hue)?.label}
            </div>
          </div>

          {error && (
            <p
              role="alert"
              className="inline-flex items-center gap-2 rounded-xl border border-rose-500/30 bg-rose-500/10 px-3 py-2 text-xs text-rose-200"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-rose-400" />
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={pending}
            className="group inline-flex h-12 items-center justify-center gap-2 rounded-full px-6 text-sm font-semibold transition-all enabled:hover:-translate-y-px disabled:cursor-not-allowed disabled:opacity-50"
            style={{
              background: "linear-gradient(120deg, #3FC9B4 0%, #2AA791 100%)",
              color: "#0a0a0e",
              boxShadow:
                "0 0 0 1px rgba(63,201,180,0.3), 0 12px 32px -16px rgba(63,201,180,0.6)",
            }}
          >
            {pending ? (
              <>
                <Spinner /> Saving…
              </>
            ) : (
              <>
                {mode === "new"
                  ? isPublished ? "Publish post" : "Save draft"
                  : "Save changes"}
                <svg viewBox="0 0 16 16" className="h-3 w-3 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <path d="M3 8h10M9 4l4 4-4 4" />
                </svg>
              </>
            )}
          </button>
        </aside>
      </div>

      <style jsx global>{`
        .admin-input {
          display: block;
          width: 100%;
          appearance: none;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 12px;
          padding: 10px 13px;
          font-size: 14px;
          color: #ffffff;
          transition: border-color 0.2s, box-shadow 0.2s, background-color 0.2s;
        }
        .admin-input::placeholder {
          color: rgba(255, 255, 255, 0.32);
        }
        .admin-input:focus {
          outline: none;
          border-color: rgba(255, 255, 255, 0.22);
          background-color: rgba(255, 255, 255, 0.04);
          box-shadow: 0 0 0 4px rgba(63, 201, 180, 0.12);
        }
        textarea.admin-input {
          resize: vertical;
          min-height: 100px;
        }
      `}</style>
    </form>
  );
}

function Field({
  label,
  required,
  hint,
  children,
}: {
  label: string;
  required?: boolean;
  hint?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="flex items-center justify-between text-[10px] font-semibold uppercase tracking-[0.22em] text-white/55">
        <span>
          {label}
          {required && <span className="ml-1 text-rose-400/80">*</span>}
        </span>
      </span>
      {children}
      {hint && <span className="text-[11px] text-white/45">{hint}</span>}
    </label>
  );
}

function CoverPreview({
  src,
  hue,
  category,
}: {
  src: string;
  hue: string;
  category: string;
}) {
  if (!src) {
    return (
      <div
        className="mt-2 relative h-40 overflow-hidden rounded-xl border border-dashed border-white/[0.08]"
        style={{
          background: `radial-gradient(circle at 30% 20%, ${hue}, transparent 60%), linear-gradient(180deg, #0a0a0e 0%, #111114 100%)`,
        }}
      >
        <div className="absolute inset-0 grid place-items-center">
          <div className="text-center">
            <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/45">
              Fallback preview
            </div>
            <div className="mt-1 text-xs text-white/65">Gradient + hue tint</div>
          </div>
        </div>
        <span
          className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-black/45 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/85 backdrop-blur-md"
        >
          <span className="h-1 w-1 rounded-full" style={{ backgroundColor: ACCENT }} />
          {category}
        </span>
      </div>
    );
  }
  return (
    <div className="mt-2 relative h-40 overflow-hidden rounded-xl border border-white/[0.06]">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt="Cover preview"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <span
        aria-hidden
        className="absolute inset-0"
        style={{
          background: "linear-gradient(180deg, rgba(0,0,0,0.1) 30%, rgba(0,0,0,0.5) 100%)",
        }}
      />
      <span
        className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-black/45 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/85 backdrop-blur-md"
      >
        <span className="h-1 w-1 rounded-full" style={{ backgroundColor: ACCENT }} />
        {category}
      </span>
    </div>
  );
}

function DarkSelect({
  value,
  onChange,
  options,
}: {
  value: string;
  onChange: (v: string) => void;
  options: string[];
}) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="admin-input appearance-none pr-9"
      >
        {options.map((o) => (
          <option key={o} value={o} className="bg-[#0a0a0e] text-white">
            {o}
          </option>
        ))}
      </select>
      <svg
        viewBox="0 0 16 16"
        className="pointer-events-none absolute right-3 top-1/2 h-3 w-3 -translate-y-1/2 text-white/45"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        <path d="M3 6l5 5 5-5" />
      </svg>
    </div>
  );
}

function PublishToggle({ on, onChange }: { on: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      onClick={() => onChange(!on)}
      className="relative h-6 w-10 shrink-0 rounded-full transition-colors"
      style={{
        backgroundColor: on ? ACCENT : "rgba(255,255,255,0.10)",
        boxShadow: on ? `0 0 12px ${ACCENT}55` : undefined,
      }}
    >
      <span
        className="absolute top-1 grid h-4 w-4 place-items-center rounded-full bg-white shadow-md transition-all"
        style={{ left: on ? "calc(100% - 1.25rem)" : "0.25rem" }}
      >
        {on && (
          <svg viewBox="0 0 16 16" className="h-2.5 w-2.5 text-black" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M3 8l4 4 6-8" />
          </svg>
        )}
      </span>
    </button>
  );
}

function Spinner() {
  return (
    <svg viewBox="0 0 16 16" className="h-3.5 w-3.5 animate-spin" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" aria-hidden>
      <circle cx="8" cy="8" r="6" opacity="0.25" />
      <path d="M14 8a6 6 0 0 0-6-6" />
    </svg>
  );
}
