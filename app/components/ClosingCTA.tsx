import Link from "next/link";

const ACCENT = "#3FC9B4";

export default function ClosingCTA({
  eyebrow = "Have something in mind?",
  title = "Let's talk about your project.",
  body = "Tell us what you're building. We'll come back within 24 hours with a plan, a team, and a price.",
  primary = { label: "Start a project", href: "/contact" },
  secondary,
  tone = "light",
}: {
  eyebrow?: string;
  title?: string;
  body?: string;
  primary?: { label: string; href: string };
  secondary?: { label: string; href: string };
  tone?: "light" | "dark";
}) {
  const isDark = tone === "dark";
  return (
    <section
      className={
        isDark
          ? "relative isolate overflow-hidden bg-black px-5 py-20 sm:px-8 sm:py-28"
          : "mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-32"
      }
    >
      <div
        className={
          isDark
            ? "mx-auto max-w-6xl"
            : "relative overflow-hidden rounded-3xl border border-zinc-900/[0.06] bg-white p-10 shadow-[0_24px_60px_-30px_rgba(0,0,0,0.18)] sm:p-14"
        }
      >
        <div
          aria-hidden
          className={
            isDark
              ? "absolute -right-32 -top-32 -z-10 h-80 w-80 rounded-full opacity-20 blur-3xl"
              : "absolute -right-20 -top-20 h-72 w-72 rounded-full opacity-20 blur-3xl"
          }
          style={{ backgroundColor: ACCENT }}
        />
        <div className="relative flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          <div>
            <span
              className={
                isDark
                  ? "text-xs uppercase tracking-[0.22em] text-white/55"
                  : "text-xs uppercase tracking-[0.22em] text-zinc-500"
              }
            >
              {eyebrow}
            </span>
            <h2
              className={
                isDark
                  ? "mt-3 max-w-2xl text-balance text-3xl font-semibold leading-tight tracking-tight text-white sm:text-4xl"
                  : "mt-3 max-w-2xl text-balance text-3xl font-semibold leading-tight tracking-tight text-zinc-900 sm:text-4xl"
              }
            >
              {title}
            </h2>
            <p
              className={
                isDark
                  ? "mt-3 max-w-md text-sm leading-relaxed text-white/60"
                  : "mt-3 max-w-md text-sm leading-relaxed text-zinc-600"
              }
            >
              {body}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Link
              href={primary.href}
              className={
                isDark
                  ? "group inline-flex h-12 items-center gap-2 rounded-full bg-white px-6 text-sm font-semibold text-black transition-transform duration-300 hover:scale-[1.03]"
                  : "group inline-flex h-12 items-center gap-2 rounded-full bg-zinc-900 px-6 text-sm font-semibold text-white transition-transform duration-300 hover:scale-[1.03]"
              }
            >
              {primary.label}
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
            {secondary && (
              <Link
                href={secondary.href}
                className={
                  isDark
                    ? "inline-flex h-12 items-center gap-2 rounded-full border border-white/15 bg-white/[0.03] px-5 text-sm font-medium text-white/85 transition-colors duration-200 hover:border-white/35 hover:text-white"
                    : "inline-flex h-12 items-center gap-2 rounded-full border border-zinc-900/10 bg-white px-5 text-sm font-medium text-zinc-700 transition-colors duration-200 hover:border-zinc-900/30 hover:text-zinc-900"
                }
              >
                {secondary.label}
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
