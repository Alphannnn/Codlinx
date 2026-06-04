import Link from "next/link";
import { listCareerPostings } from "../../lib/data";
import DeleteRowButton from "../DeleteRowButton";
import { deleteCareer } from "../../lib/actions/content";

export const metadata = {
  title: "Admin · Careers",
  robots: { index: false, follow: false },
};

const ACCENT = "#3FC9B4";

export default async function AdminCareersPage() {
  const postings = await listCareerPostings(true);

  return (
    <div className="flex flex-col gap-6">
      <header className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-zinc-500">
            <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: ACCENT }} />
            Careers
          </div>
          <h1 className="mt-2 text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
            Open roles at the studio.
          </h1>
        </div>
        <Link
          href="/admin/careers/new"
          className="group inline-flex h-11 items-center gap-2 rounded-full bg-zinc-900 px-5 text-sm font-semibold text-white"
        >
          New posting
          <span className="grid h-6 w-6 place-items-center rounded-full" style={{ backgroundColor: ACCENT }}>
            <svg viewBox="0 0 16 16" className="h-3 w-3 text-black" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M8 3v10M3 8h10" />
            </svg>
          </span>
        </Link>
      </header>

      {postings.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-zinc-900/10 bg-white p-12 text-center">
          <p className="text-base font-semibold text-zinc-900">No postings yet.</p>
        </div>
      ) : (
        <ul className="overflow-hidden rounded-3xl border border-zinc-900/[0.06] bg-white shadow-[0_16px_40px_-26px_rgba(0,0,0,0.18)]">
          {postings.map((c) => (
            <li
              key={c.id}
              className="flex flex-col gap-3 border-b border-zinc-900/[0.05] px-5 py-4 last:border-b-0 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="min-w-0">
                <div className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.22em]">
                  <span
                    className={[
                      "rounded-full px-2 py-0.5 font-semibold",
                      c.is_open
                        ? "bg-emerald-50 text-emerald-700"
                        : "bg-zinc-100 text-zinc-500",
                    ].join(" ")}
                  >
                    {c.is_open ? "Open" : "Closed"}
                  </span>
                  <span className="text-zinc-500">{c.team}</span>
                  <span className="text-zinc-300">·</span>
                  <span className="text-zinc-500">{c.level}</span>
                  <span className="text-zinc-300">·</span>
                  <span className="text-zinc-500">{c.location}</span>
                </div>
                <div className="mt-1 truncate text-base font-semibold tracking-tight">
                  {c.title}
                </div>
                <div className="mt-0.5 truncate text-xs text-zinc-500">/careers/{c.slug}</div>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                <Link
                  href={`/careers#${c.slug}`}
                  className="inline-flex h-8 items-center rounded-full border border-zinc-900/10 bg-white px-3 text-xs font-medium text-zinc-700 hover:border-zinc-900/30"
                >
                  View
                </Link>
                <Link
                  href={`/admin/careers/edit/${c.id}`}
                  className="inline-flex h-8 items-center rounded-full bg-zinc-900 px-3 text-xs font-semibold text-white"
                >
                  Edit
                </Link>
                <DeleteRowButton id={c.id} action={deleteCareer} label="Delete role?" />
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
