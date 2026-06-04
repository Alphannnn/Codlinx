import Link from "next/link";
import type { ReactNode } from "react";
import PageHero from "./PageHero";

export type LegalSection = { id: string; title: string; body: ReactNode };

export default function LegalLayout({
  eyebrow,
  title,
  highlight,
  description,
  lastUpdated,
  sections,
}: {
  eyebrow: string;
  title: string;
  highlight?: string;
  description: string;
  lastUpdated: string;
  sections: LegalSection[];
}) {
  return (
    <>
      <PageHero
        eyebrow={eyebrow}
        title={title}
        highlight={highlight}
        description={description}
      />

      <section className="bg-[#FAFAF7] py-16 text-zinc-900 sm:py-24">
        <div className="mx-auto max-w-5xl px-5 sm:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[220px_1fr] lg:gap-16">
            <aside className="lg:sticky lg:top-24 lg:self-start">
              <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-zinc-500">
                Last updated
              </div>
              <div className="mt-2 text-sm font-semibold text-zinc-900">
                {lastUpdated}
              </div>
              <nav className="mt-8 flex flex-col gap-2 text-sm" aria-label="On this page">
                <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-zinc-500">
                  Contents
                </div>
                {sections.map((s, i) => (
                  <Link
                    key={s.id}
                    href={`#${s.id}`}
                    className="text-zinc-600 transition-colors hover:text-zinc-900"
                  >
                    {String(i + 1).padStart(2, "0")} · {s.title}
                  </Link>
                ))}
              </nav>
            </aside>

            <div className="flex flex-col gap-12">
              {sections.map((s, i) => (
                <section
                  key={s.id}
                  id={s.id}
                  className="scroll-mt-24 border-t border-zinc-900/[0.06] pt-10 first:border-t-0 first:pt-0"
                >
                  <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-zinc-500">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <h2 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
                    {s.title}
                  </h2>
                  <div className="prose-codlinx mt-5 max-w-prose text-base leading-relaxed text-zinc-700">
                    {s.body}
                  </div>
                </section>
              ))}
            </div>
          </div>

          <p className="mt-16 text-sm text-zinc-500">
            Questions? Write to{" "}
            <a
              href="mailto:legal@codlinx.com"
              className="font-semibold text-zinc-700 underline-offset-4 hover:underline"
            >
              legal@codlinx.com
            </a>
            .
          </p>
        </div>
      </section>

      <style>{`
        .prose-codlinx p { margin: 0 0 1em 0; }
        .prose-codlinx p:last-child { margin-bottom: 0; }
        .prose-codlinx ul { list-style: disc; padding-left: 1.25rem; margin: 0.5rem 0 1em; }
        .prose-codlinx ul li { margin: 0.35em 0; }
        .prose-codlinx strong { color: #18181b; font-weight: 600; }
        .prose-codlinx a { color: #18181b; text-decoration: underline; text-underline-offset: 4px; }
      `}</style>
    </>
  );
}
