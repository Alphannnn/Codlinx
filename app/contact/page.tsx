import Link from "next/link";
import ContactForm from "./ContactForm";
import { getCurrentUser } from "../lib/auth";

const ACCENT = "#3FC9B4";

export default async function ContactPage() {
  const user = await getCurrentUser();

  return (
    <>
      {user && (
        <div className="border-b border-white/[0.08] bg-black text-white">
          <div className="mx-auto flex max-w-6xl flex-col items-start gap-4 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-8">
            <div className="flex items-center gap-3">
              <span
                className="grid h-9 w-9 place-items-center rounded-full"
                style={{ backgroundColor: "rgba(63,201,180,0.18)" }}
              >
                <svg
                  viewBox="0 0 20 20"
                  className="h-4 w-4"
                  style={{ color: ACCENT }}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden
                >
                  <rect x="3" y="4.5" width="14" height="13" rx="2" />
                  <path d="M3 8h14M7 3v3M13 3v3" />
                </svg>
              </span>
              <div>
                <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/55">
                  Signed in as {user.email}
                </div>
                <div className="mt-0.5 text-[15px] font-semibold tracking-tight">
                  Skip the brief — book a slot directly.
                </div>
              </div>
            </div>
            <Link
              href="/account/book"
              className="group inline-flex h-10 items-center gap-2 rounded-full bg-white px-4 text-sm font-semibold text-black transition-transform duration-300 hover:scale-[1.03]"
            >
              Pick a slot
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
            </Link>
          </div>
        </div>
      )}
      <ContactForm />
    </>
  );
}
