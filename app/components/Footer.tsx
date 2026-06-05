import Link from "next/link";
import Image from "next/image";

const ACCENT = "#3FC9B4";

const COLUMNS = [
  {
    title: "Product",
    links: [
      { label: "Services", href: "/#services" },
      { label: "Case studies", href: "/work" },
      { label: "Process", href: "/#process" },
      { label: "Pricing", href: "/pricing" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Careers", href: "/careers" },
      { label: "Blog", href: "/blog" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy", href: "/privacy" },
      { label: "Terms", href: "/terms" },
      { label: "Security", href: "/security" },
      { label: "Status", href: "https://status.codlinx.com" },
    ],
  },
];

const SOCIAL = [
  { label: "GitHub", href: "https://github.com/Alphannnn/Codlinx", icon: <GitHubIcon /> },
  { label: "LinkedIn", href: "https://linkedin.com/company/codlinx", icon: <LinkedInIcon /> },
  { label: "X", href: "https://x.com/codlinx", icon: <XIcon /> },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/[0.06] bg-[#09090a] text-white">
      <ClosingStatement />

      <div className="border-t border-white/[0.06]">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
          <div className="grid grid-cols-1 gap-14 lg:grid-cols-[1.05fr_2fr] lg:gap-20">
            <Brand />
            <Columns />
          </div>
        </div>
      </div>

      <MetaBar year={year} />
    </footer>
  );
}

function ClosingStatement() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
      <div className="flex flex-col items-start gap-10 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <div className="inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1.5 text-[11px] font-medium uppercase tracking-[0.22em] text-white/70 backdrop-blur-sm">
            <span className="relative flex h-1.5 w-1.5">
              <span
                className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-60"
                style={{ backgroundColor: ACCENT }}
              />
              <span
                className="relative inline-flex h-1.5 w-1.5 rounded-full"
                style={{ backgroundColor: ACCENT }}
              />
            </span>
            Q2 2026 · Booking new engagements
          </div>

          <h2 className="mt-7 max-w-3xl text-balance text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl lg:text-[64px]">
            Have something{" "}
            <span className="italic font-light text-white/85">worth</span>{" "}
            shipping?
          </h2>

          <p className="mt-5 max-w-md text-base leading-relaxed text-white/55">
            Tell us about your project. We&apos;ll come back inside 24 hours with a
            scoped plan, a team, and a price.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 lg:pb-2">
          <Link
            href="/contact"
            className="group inline-flex h-12 items-center gap-2 rounded-full bg-white px-6 text-sm font-semibold text-black transition-transform duration-300 hover:scale-[1.03]"
          >
            Start a project
            <span
              className="grid h-7 w-7 place-items-center rounded-full transition-transform duration-300 group-hover:translate-x-0.5"
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
          </Link>
        </div>
      </div>
    </div>
  );
}

function Brand() {
  return (
    <div className="flex flex-col gap-6">
      <Link
        href="/"
        aria-label="Codlinx home"
        className="inline-flex items-center gap-2.5 self-start outline-none focus-visible:ring-2 focus-visible:ring-[#3FC9B4]/60"
      >
        <Image
          src="/codlinx-icon.png"
          alt="Codlinx"
          width={40}
          height={40}
          className="h-10 w-10 rounded-xl shadow-[0_8px_24px_-8px_rgba(63,201,180,0.5)]"
        />
        <span className="text-[17px] font-semibold tracking-[0.22em]">CODLINX</span>
      </Link>

      <p className="max-w-xs text-[15px] leading-relaxed text-white/55">
        A senior software studio. Engineered, designed, and shipped under one
        roof.
      </p>

      <dl className="mt-1 flex flex-col gap-3 text-sm">
        <MetaLine
          label="Email"
          value={
            <a
              href="mailto:info@codlinx.com"
              className="text-white/85 transition-colors hover:text-white"
            >
              info@codlinx.com
            </a>
          }
        />
        <MetaLine label="Studios" value="London · Lahore · Remote" />
        <MetaLine
          label="Office"
          value={
            <a
              href="https://maps.google.com/?q=7+Parramatta+Square,+Level+40,+10+Darcy+Street,+Parramatta+NSW+2150"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/85 transition-colors hover:text-white"
            >
              7 Parramatta Square, Level 40, 10 Darcy Street, Parramatta, NSW, 2150
            </a>
          }
        />
        <MetaLine label="Established" value="2019" />
      </dl>
    </div>
  );
}

function MetaLine({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className="flex items-baseline gap-4">
      <dt className="w-[88px] shrink-0 text-[10px] font-semibold uppercase tracking-[0.22em] text-white/35">
        {label}
      </dt>
      <dd className="text-white/75">{value}</dd>
    </div>
  );
}

function Columns() {
  return (
    <div className="grid grid-cols-1 gap-10 sm:grid-cols-3">
      {COLUMNS.map((col) => (
        <div key={col.title} className="flex flex-col gap-5">
          <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/40">
            {col.title}
          </div>
          <ul className="flex flex-col gap-3">
            {col.links.map((link) => {
              const external = link.href.startsWith("http");
              const inner = (
                <span className="relative inline-flex items-center gap-1">
                  {link.label}
                  {external && (
                    <svg
                      viewBox="0 0 16 16"
                      className="h-3 w-3 text-white/40 transition-colors group-hover:text-white/70"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden
                    >
                      <path d="M6 4h6v6M12 4l-8 8" />
                    </svg>
                  )}
                  <span
                    aria-hidden
                    className="absolute -bottom-0.5 left-0 h-px w-0 bg-[#3FC9B4]/70 transition-all duration-300 group-hover:w-full"
                  />
                </span>
              );
              return (
                <li key={link.label}>
                  {external ? (
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center text-[15px] text-white/70 transition-colors duration-200 hover:text-white"
                    >
                      {inner}
                    </a>
                  ) : (
                    <Link
                      href={link.href}
                      className="group inline-flex items-center text-[15px] text-white/70 transition-colors duration-200 hover:text-white"
                    >
                      {inner}
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </div>
  );
}

function MetaBar({ year }: { year: number }) {
  return (
    <div className="border-t border-white/[0.06]">
      <div className="mx-auto flex max-w-6xl flex-col-reverse items-start gap-5 px-5 py-7 sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <p className="font-mono text-[11px] tracking-wide text-white/40">
          © {year} CODLINX STUDIO LTD · ALL RIGHTS RESERVED
        </p>

        <ul className="flex items-center gap-1.5">
          {SOCIAL.map((s) => (
            <li key={s.label}>
              <a
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="grid h-9 w-9 place-items-center rounded-full border border-transparent text-white/55 transition-all duration-200 hover:border-white/10 hover:bg-white/[0.04] hover:text-white"
              >
                {s.icon}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function GitHubIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden>
      <path d="M12 2C6.48 2 2 6.58 2 12.25c0 4.53 2.87 8.37 6.84 9.72.5.1.68-.22.68-.49 0-.24-.01-.88-.01-1.72-2.78.62-3.37-1.36-3.37-1.36-.45-1.18-1.11-1.49-1.11-1.49-.91-.64.07-.62.07-.62 1 .07 1.53 1.05 1.53 1.05.89 1.56 2.34 1.11 2.91.85.09-.66.35-1.11.63-1.37-2.22-.26-4.56-1.14-4.56-5.06 0-1.12.39-2.03 1.03-2.74-.1-.26-.45-1.29.1-2.69 0 0 .84-.27 2.75 1.05a9.34 9.34 0 0 1 2.5-.34c.85.01 1.7.12 2.5.34 1.91-1.32 2.75-1.05 2.75-1.05.55 1.4.2 2.43.1 2.69.64.71 1.03 1.62 1.03 2.74 0 3.93-2.35 4.79-4.58 5.05.36.32.68.94.68 1.9 0 1.37-.01 2.48-.01 2.81 0 .27.18.59.69.49A10.04 10.04 0 0 0 22 12.25C22 6.58 17.52 2 12 2z" />
    </svg>
  );
}
function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden>
      <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9h4v12H3V9zm7 0h3.8v1.7h.05c.53-1 1.83-2 3.77-2 4.03 0 4.78 2.66 4.78 6.12V21h-4v-5.36c0-1.28-.02-2.93-1.78-2.93-1.78 0-2.05 1.39-2.05 2.83V21H10V9z" />
    </svg>
  );
}
function XIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden>
      <path d="M18.244 2H21l-6.52 7.45L22 22h-6.78l-4.69-6.13L4.97 22H2.21l6.97-7.96L2 2h6.91l4.24 5.6L18.244 2zm-1.19 18h1.86L7.04 4H5.07l11.984 16z" />
    </svg>
  );
}
