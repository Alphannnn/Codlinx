import type { ReactNode } from "react";

/* Distinct, real-world icons for each "why choose us" reason — so the grid
   reads as six different human benefits, not six identical checkmarks. */
const ICONS: Record<string, ReactNode> = {
  // Senior, expert team → people
  team: (
    <>
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </>
  ),
  // Data-driven → bar chart
  data: (
    <>
      <path d="M3 3v18h18" />
      <path d="M8 17v-5M13 17V8M18 17v-3" />
    </>
  ),
  // Transparent reporting → clipboard list
  report: (
    <>
      <rect x="8" y="2" width="8" height="4" rx="1" />
      <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
      <path d="M9 12h6M9 16h4" />
    </>
  ),
  // Strategies built for you → target
  strategy: (
    <>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="12" cy="12" r="1.2" />
    </>
  ),
  // Result-oriented → trophy
  results: (
    <>
      <path d="M8 21h8M12 17v4" />
      <path d="M7 4h10v5a5 5 0 0 1-10 0z" />
      <path d="M7 6H4v2a3 3 0 0 0 3 3" />
      <path d="M17 6h3v2a3 3 0 0 1-3 3" />
    </>
  ),
  // Dedicated support → headset
  support: (
    <>
      <path d="M4 14v-2a8 8 0 0 1 16 0v2" />
      <path d="M5 12h2v6H6a2 2 0 0 1-2-2v-2a2 2 0 0 1 1-2zM19 12h-2v6h1a2 2 0 0 0 2-2v-2a2 2 0 0 0-1-2z" />
      <path d="M17 18a4 4 0 0 1-4 3h-1" />
    </>
  ),
};

const FALLBACK: ReactNode = <path d="M3 8.5l3 3 7-7" />;

export default function WhyChooseIcon({
  name,
  className = "",
}: {
  name?: string;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      {(name && ICONS[name]) || FALLBACK}
    </svg>
  );
}
