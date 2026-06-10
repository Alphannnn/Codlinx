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
    ],
  },
];

const SOCIAL = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/codlinx00/posts/?feedView=all",
    icon: <LinkedInIcon />,
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/codlinx.official/",
    icon: <InstagramIcon />,
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/profile.php?id=61584328390459",
    icon: <FacebookIcon />,
  },
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
        className="inline-flex items-center self-start outline-none focus-visible:ring-2 focus-visible:ring-[#3FC9B4]/60"
      >
        <Image
          src="/codlinx-logo.png"
          alt="Codlinx"
          width={1100}
          height={256}
          className="h-9 w-auto"
        />
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

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden>
      <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9h4v12H3V9zm7 0h3.8v1.7h.05c.53-1 1.83-2 3.77-2 4.03 0 4.78 2.66 4.78 6.12V21h-4v-5.36c0-1.28-.02-2.93-1.78-2.93-1.78 0-2.05 1.39-2.05 2.83V21H10V9z" />
    </svg>
  );
}
function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden>
      <path d="M12 2.2c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.7 3.7 0 0 1-1.38-.9 3.7 3.7 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23C2.21 15.58 2.2 15.2 2.2 12s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.21 8.8 2.2 12 2.2zm0 1.8c-3.15 0-3.5.01-4.74.07-.9.04-1.39.19-1.71.32-.43.17-.74.37-1.06.69-.32.32-.52.63-.69 1.06-.13.32-.28.81-.32 1.71C3.21 8.5 3.2 8.85 3.2 12s.01 3.5.07 4.74c.04.9.19 1.39.32 1.71.17.43.37.74.69 1.06.32.32.63.52 1.06.69.32.13.81.28 1.71.32 1.24.06 1.59.07 4.74.07s3.5-.01 4.74-.07c.9-.04 1.39-.19 1.71-.32.43-.17.74-.37 1.06-.69.32-.32.52-.63.69-1.06.13-.32.28-.81.32-1.71.06-1.24.07-1.59.07-4.74s-.01-3.5-.07-4.74c-.04-.9-.19-1.39-.32-1.71a2.85 2.85 0 0 0-.69-1.06 2.85 2.85 0 0 0-1.06-.69c-.32-.13-.81-.28-1.71-.32C15.5 4.01 15.15 4 12 4zm0 3.06A4.94 4.94 0 1 1 12 16.94 4.94 4.94 0 0 1 12 7.06zm0 1.8a3.14 3.14 0 1 0 0 6.28 3.14 3.14 0 0 0 0-6.28zm5.14-3.24a1.15 1.15 0 1 1 0 2.3 1.15 1.15 0 0 1 0-2.3z" />
    </svg>
  );
}
function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden>
      <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5.02 3.66 9.18 8.44 9.94v-7.03H7.9v-2.91h2.54V9.85c0-2.52 1.49-3.91 3.78-3.91 1.1 0 2.24.2 2.24.2v2.47h-1.26c-1.24 0-1.63.78-1.63 1.57v1.88h2.78l-.44 2.91h-2.34V22c4.78-.76 8.44-4.92 8.44-9.94z" />
    </svg>
  );
}
