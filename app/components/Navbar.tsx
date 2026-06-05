"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";

type NavLink = {
  label: string;
  href: string;
  description?: string;
};

type NavItem = {
  label: string;
  href?: string;
  children?: NavLink[];
};

export type NavUser = {
  email: string;
  fullName: string | null;
  isAdmin: boolean;
};

const NAV_ITEMS: NavItem[] = [
  {
    label: "Services",
    children: [
      {
        label: "Web Development",
        href: "/services/web",
        description: "Scalable web apps built with Next.js & React.",
      },
      {
        label: "Mobile Apps",
        href: "/services/mobile",
        description: "Native iOS, Android & cross-platform builds.",
      },
      {
        label: "Cloud & DevOps",
        href: "/services/cloud",
        description: "AWS, GCP, CI/CD pipelines, and SRE.",
      },
      {
        label: "AI & ML",
        href: "/services/ai",
        description: "LLM integrations, RAG, and ML pipelines.",
      },
      {
        label: "UI / UX Design",
        href: "/services/design",
        description: "Brand systems and conversion-led interfaces.",
      },
      {
        label: "Product Strategy",
        href: "/services/strategy",
        description: "Discovery, roadmaps, and go-to-market.",
      },
    ],
  },
  {
    label: "Work",
    children: [
      {
        label: "Case Studies",
        href: "/work/case-studies",
        description: "Deep dives into shipped products.",
      },
      {
        label: "Clients",
        href: "/work/clients",
        description: "Companies we've partnered with.",
      },
      {
        label: "Industries",
        href: "/work/industries",
        description: "Fintech, health, SaaS, and more.",
      },
    ],
  },
  { label: "About", href: "/about" },
  { label: "Careers", href: "/careers" },
  { label: "Blog", href: "/blog" },
];

const ACCENT = "#3FC9B4";

function CodlinxMark({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <Image
        src="/codlinx-icon.png"
        alt="Codlinx"
        width={36}
        height={36}
        priority
        className="h-9 w-9 rounded-xl shadow-[0_8px_24px_-8px_rgba(63,201,180,0.55)]"
      />
      <span className="text-[17px] font-semibold tracking-[0.22em] text-white">
        CODLINX
      </span>
    </span>
  );
}

export default function Navbar({ user = null }: { user?: NavUser | null }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileSection, setMobileSection] = useState<string | null>(null);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobileOpen(false);
        setOpenMenu(null);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const scheduleClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpenMenu(null), 120);
  };
  const cancelClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  };

  return (
    <header
      className={[
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled
          ? "bg-black/70 backdrop-blur-xl border-b border-white/[0.06] shadow-[0_8px_30px_rgba(0,0,0,0.35)]"
          : "bg-gradient-to-b from-black/40 to-transparent backdrop-blur-sm border-b border-transparent",
      ].join(" ")}
    >
      <div className="pointer-events-none absolute inset-x-0 -bottom-px h-px bg-gradient-to-r from-transparent via-[#3FC9B4]/30 to-transparent opacity-60" />

      <nav
        aria-label="Primary"
        className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8 lg:h-[72px]"
      >
        <Link
          href="/"
          aria-label="Codlinx home"
          className="group relative -m-2 rounded-lg p-2 outline-none focus-visible:ring-2 focus-visible:ring-[#3FC9B4]/60"
        >
          <CodlinxMark className="transition-transform duration-300 group-hover:scale-[1.02]" />
        </Link>

        <ul className="hidden items-center gap-1 lg:flex">
          {NAV_ITEMS.map((item) => {
            const hasChildren = !!item.children?.length;
            const isOpen = openMenu === item.label;
            return (
              <li
                key={item.label}
                className="relative"
                onMouseEnter={() => {
                  cancelClose();
                  if (hasChildren) setOpenMenu(item.label);
                }}
                onMouseLeave={scheduleClose}
              >
                {hasChildren ? (
                  <button
                    type="button"
                    aria-haspopup="true"
                    aria-expanded={isOpen}
                    onClick={() => setOpenMenu(isOpen ? null : item.label)}
                    className={[
                      "flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition-colors duration-200",
                      isOpen
                        ? "text-white bg-white/[0.06]"
                        : "text-white/70 hover:text-white hover:bg-white/[0.04]",
                    ].join(" ")}
                  >
                    {item.label}
                    <svg
                      className={`h-3.5 w-3.5 transition-transform duration-300 ${
                        isOpen ? "rotate-180 text-[#3FC9B4]" : "text-white/50"
                      }`}
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 11.06l3.71-3.83a.75.75 0 1 1 1.08 1.04l-4.25 4.39a.75.75 0 0 1-1.08 0L5.21 8.27a.75.75 0 0 1 .02-1.06Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                ) : (
                  <Link
                    href={item.href || "#"}
                    className="rounded-full px-4 py-2 text-sm font-medium text-white/70 transition-colors duration-200 hover:bg-white/[0.04] hover:text-white"
                  >
                    {item.label}
                  </Link>
                )}

                {hasChildren && (
                  <div
                    onMouseEnter={cancelClose}
                    onMouseLeave={scheduleClose}
                    className={[
                      "absolute left-1/2 top-[calc(100%+10px)] w-[560px] -translate-x-1/2 origin-top",
                      "transition-all duration-300 ease-out",
                      isOpen
                        ? "pointer-events-auto translate-y-0 opacity-100 scale-100"
                        : "pointer-events-none -translate-y-2 opacity-0 scale-[0.98]",
                    ].join(" ")}
                  >
                    <div className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0b0b0c]/95 p-2 shadow-2xl backdrop-blur-2xl">
                      <div
                        className="pointer-events-none absolute -top-24 left-1/2 h-48 w-48 -translate-x-1/2 rounded-full opacity-30 blur-3xl"
                        style={{ backgroundColor: ACCENT }}
                      />
                      <ul className="relative grid grid-cols-2 gap-1">
                        {item.children!.map((child) => (
                          <li key={child.label}>
                            <Link
                              href={child.href}
                              className="group flex flex-col gap-0.5 rounded-xl p-3 transition-colors duration-200 hover:bg-white/[0.04]"
                            >
                              <span className="flex items-center gap-2 text-sm font-medium text-white">
                                {child.label}
                                <svg
                                  viewBox="0 0 16 16"
                                  className="h-3 w-3 -translate-x-1 opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100"
                                  style={{ color: ACCENT }}
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                >
                                  <path d="M5 3l5 5-5 5" />
                                </svg>
                              </span>
                              {child.description && (
                                <span className="text-xs leading-relaxed text-white/50">
                                  {child.description}
                                </span>
                              )}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </li>
            );
          })}
        </ul>

        <div className="hidden items-center gap-2 lg:flex">
          {user ? (
            <div
              className="relative"
              onMouseEnter={() => {
                cancelClose();
                setUserMenuOpen(true);
              }}
              onMouseLeave={() => {
                closeTimer.current = setTimeout(() => setUserMenuOpen(false), 120);
              }}
            >
              <button
                type="button"
                aria-haspopup="true"
                aria-expanded={userMenuOpen}
                onClick={() => setUserMenuOpen((v) => !v)}
                className={[
                  "inline-flex items-center gap-2 rounded-full border px-2.5 py-1.5 text-sm font-medium transition-colors duration-200",
                  userMenuOpen
                    ? "border-white/25 bg-white/[0.08] text-white"
                    : "border-white/10 bg-white/[0.03] text-white/85 hover:border-white/20 hover:text-white",
                ].join(" ")}
              >
                <span
                  className="grid h-6 w-6 place-items-center rounded-full text-[10px] font-bold text-black"
                  style={{ backgroundColor: "#3FC9B4" }}
                  aria-hidden
                >
                  {(user.fullName || user.email)
                    .split(/\s+/)
                    .map((p) => p[0])
                    .filter(Boolean)
                    .slice(0, 2)
                    .join("")
                    .toUpperCase()}
                </span>
                <span className="max-w-[140px] truncate">
                  {user.fullName || user.email.split("@")[0]}
                </span>
                {user.isAdmin && (
                  <span className="rounded-full bg-white/10 px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-[0.18em] text-white/75">
                    Admin
                  </span>
                )}
                <svg
                  className={`h-3.5 w-3.5 transition-transform duration-300 ${userMenuOpen ? "rotate-180 text-[#3FC9B4]" : "text-white/50"}`}
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden
                >
                  <path
                    fillRule="evenodd"
                    d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 11.06l3.71-3.83a.75.75 0 1 1 1.08 1.04l-4.25 4.39a.75.75 0 0 1-1.08 0L5.21 8.27a.75.75 0 0 1 .02-1.06Z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>

              <div
                className={[
                  "absolute right-0 top-[calc(100%+8px)] w-64 origin-top-right transition-all duration-200",
                  userMenuOpen
                    ? "translate-y-0 opacity-100 pointer-events-auto"
                    : "-translate-y-1 opacity-0 pointer-events-none",
                ].join(" ")}
              >
                <div className="overflow-hidden rounded-2xl border border-white/[0.08] bg-black/95 p-2 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.7)] backdrop-blur-xl">
                  <div className="border-b border-white/[0.06] px-3 py-3">
                    <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/40">
                      Signed in as
                    </div>
                    <div className="mt-1 truncate text-sm font-medium text-white">
                      {user.email}
                    </div>
                  </div>
                  <Link
                    href="/account"
                    onClick={() => setUserMenuOpen(false)}
                    className="flex items-center justify-between gap-3 rounded-lg px-3 py-2.5 text-sm text-white/85 hover:bg-white/[0.05] hover:text-white"
                  >
                    My account
                    <svg viewBox="0 0 16 16" className="h-3 w-3 text-white/40" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M3 8h10M9 4l4 4-4 4" /></svg>
                  </Link>
                  <Link
                    href="/account/book"
                    onClick={() => setUserMenuOpen(false)}
                    className="flex items-center justify-between gap-3 rounded-lg px-3 py-2.5 text-sm text-white/85 hover:bg-white/[0.05] hover:text-white"
                  >
                    Book a meeting
                    <svg viewBox="0 0 16 16" className="h-3 w-3 text-white/40" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M3 8h10M9 4l4 4-4 4" /></svg>
                  </Link>
                  {user.isAdmin && (
                    <Link
                      href="/admin"
                      onClick={() => setUserMenuOpen(false)}
                      className="flex items-center justify-between gap-3 rounded-lg px-3 py-2.5 text-sm text-white/85 hover:bg-white/[0.05] hover:text-white"
                    >
                      Admin dashboard
                      <span className="rounded-full bg-white/[0.06] px-2 py-0.5 text-[9px] font-semibold uppercase tracking-[0.18em] text-[#3FC9B4]">
                        Admin
                      </span>
                    </Link>
                  )}
                  <form action="/auth/sign-out" method="post" className="mt-1 border-t border-white/[0.06] pt-1">
                    <button
                      type="submit"
                      className="flex w-full items-center justify-between gap-3 rounded-lg px-3 py-2.5 text-left text-sm text-white/65 hover:bg-white/[0.05] hover:text-white"
                    >
                      Sign out
                      <svg viewBox="0 0 16 16" className="h-3 w-3 text-white/40" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M10 4l-6 4 6 4M4 8h10" /></svg>
                    </button>
                  </form>
                </div>
              </div>
            </div>
          ) : (
            <Link
              href="/login"
              className="rounded-full px-4 py-2 text-sm font-medium text-white/70 transition-colors duration-200 hover:bg-white/[0.04] hover:text-white"
            >
              Sign in
            </Link>
          )}
          <Link
            href={user ? "/account/book" : "/contact"}
            className="group relative inline-flex items-center gap-1.5 overflow-hidden rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-black transition-transform duration-300 hover:scale-[1.03]"
          >
            <span
              className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 group-hover:translate-x-full"
              aria-hidden
            />
            <span className="relative">{user ? "Book a meeting" : "Start a Project"}</span>
            <svg
              viewBox="0 0 16 16"
              className="relative h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden
            >
              <path d="M3 8h10M9 4l4 4-4 4" />
            </svg>
          </Link>
        </div>

        <button
          type="button"
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((v) => !v)}
          className="relative grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/[0.03] text-white transition-colors hover:bg-white/[0.08] lg:hidden"
        >
          <span className="sr-only">Menu</span>
          <span className="relative block h-3.5 w-5">
            <span
              className={[
                "absolute left-0 top-0 h-0.5 w-full rounded-full bg-white transition-transform duration-300",
                mobileOpen ? "translate-y-1.5 rotate-45" : "",
              ].join(" ")}
            />
            <span
              className={[
                "absolute left-0 top-1.5 h-0.5 w-full rounded-full bg-white transition-opacity duration-200",
                mobileOpen ? "opacity-0" : "opacity-100",
              ].join(" ")}
            />
            <span
              className={[
                "absolute left-0 top-3 h-0.5 w-full rounded-full bg-white transition-transform duration-300",
                mobileOpen ? "-translate-y-1.5 -rotate-45" : "",
              ].join(" ")}
            />
          </span>
        </button>
      </nav>

      <div
        className={[
          "lg:hidden overflow-hidden border-t border-white/[0.06] bg-black/95 backdrop-blur-2xl transition-[max-height,opacity] duration-500 ease-out",
          mobileOpen ? "max-h-[100vh] opacity-100" : "max-h-0 opacity-0",
        ].join(" ")}
      >
        <div className="px-5 py-6 sm:px-8">
          <ul className="flex flex-col gap-1">
            {NAV_ITEMS.map((item) => {
              const hasChildren = !!item.children?.length;
              const expanded = mobileSection === item.label;
              return (
                <li key={item.label} className="border-b border-white/[0.04]">
                  {hasChildren ? (
                    <>
                      <button
                        type="button"
                        onClick={() =>
                          setMobileSection(expanded ? null : item.label)
                        }
                        className="flex w-full items-center justify-between py-4 text-left text-base font-medium text-white"
                        aria-expanded={expanded}
                      >
                        {item.label}
                        <svg
                          className={`h-4 w-4 transition-transform duration-300 ${
                            expanded ? "rotate-180 text-[#3FC9B4]" : "text-white/50"
                          }`}
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          aria-hidden
                        >
                          <path
                            fillRule="evenodd"
                            d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 11.06l3.71-3.83a.75.75 0 1 1 1.08 1.04l-4.25 4.39a.75.75 0 0 1-1.08 0L5.21 8.27a.75.75 0 0 1 .02-1.06Z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                      <div
                        className={[
                          "grid transition-[grid-template-rows] duration-300 ease-out",
                          expanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
                        ].join(" ")}
                      >
                        <div className="overflow-hidden">
                          <ul className="flex flex-col gap-1 pb-3 pl-1">
                            {item.children!.map((child) => (
                              <li key={child.label}>
                                <Link
                                  href={child.href}
                                  onClick={() => setMobileOpen(false)}
                                  className="flex flex-col gap-0.5 rounded-lg px-3 py-2.5 hover:bg-white/[0.04]"
                                >
                                  <span className="text-sm font-medium text-white">
                                    {child.label}
                                  </span>
                                  {child.description && (
                                    <span className="text-xs text-white/50">
                                      {child.description}
                                    </span>
                                  )}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </>
                  ) : (
                    <Link
                      href={item.href || "#"}
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center justify-between py-4 text-base font-medium text-white"
                    >
                      {item.label}
                      <svg
                        viewBox="0 0 16 16"
                        className="h-3.5 w-3.5 text-white/40"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden
                      >
                        <path d="M5 3l5 5-5 5" />
                      </svg>
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>

          <div className="mt-6 flex flex-col gap-3">
            {user ? (
              <>
                <div className="flex items-center gap-3 rounded-2xl border border-white/[0.08] bg-white/[0.03] p-3">
                  <span
                    className="grid h-10 w-10 place-items-center rounded-full text-sm font-bold text-black"
                    style={{ backgroundColor: "#3FC9B4" }}
                  >
                    {(user.fullName || user.email)
                      .split(/\s+/)
                      .map((p) => p[0])
                      .filter(Boolean)
                      .slice(0, 2)
                      .join("")
                      .toUpperCase()}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-sm font-semibold text-white">
                      {user.fullName || user.email.split("@")[0]}
                    </div>
                    <div className="truncate text-xs text-white/55">
                      {user.email}
                    </div>
                  </div>
                  {user.isAdmin && (
                    <span className="rounded-full bg-white/10 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-[0.18em] text-[#3FC9B4]">
                      Admin
                    </span>
                  )}
                </div>
                <Link
                  href="/account"
                  onClick={() => setMobileOpen(false)}
                  className="flex h-11 items-center justify-center rounded-full border border-white/10 text-sm font-medium text-white"
                >
                  My account
                </Link>
                {user.isAdmin && (
                  <Link
                    href="/admin"
                    onClick={() => setMobileOpen(false)}
                    className="flex h-11 items-center justify-center rounded-full border border-white/10 text-sm font-medium text-white"
                  >
                    Admin dashboard
                  </Link>
                )}
                <Link
                  href="/account/book"
                  onClick={() => setMobileOpen(false)}
                  className="flex h-11 items-center justify-center gap-1.5 rounded-full bg-white text-sm font-semibold text-black"
                >
                  Book a meeting
                  <svg
                    viewBox="0 0 16 16"
                    className="h-3.5 w-3.5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden
                  >
                    <path d="M3 8h10M9 4l4 4-4 4" />
                  </svg>
                </Link>
                <form action="/auth/sign-out" method="post">
                  <button
                    type="submit"
                    className="flex h-11 w-full items-center justify-center rounded-full border border-white/10 text-sm font-medium text-white/65 hover:text-white"
                  >
                    Sign out
                  </button>
                </form>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  onClick={() => setMobileOpen(false)}
                  className="flex h-11 items-center justify-center rounded-full border border-white/10 text-sm font-medium text-white"
                >
                  Sign in
                </Link>
                <Link
                  href="/contact"
                  onClick={() => setMobileOpen(false)}
                  className="flex h-11 items-center justify-center gap-1.5 rounded-full bg-white text-sm font-semibold text-black"
                >
                  Start a Project
                  <svg
                    viewBox="0 0 16 16"
                    className="h-3.5 w-3.5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden
                  >
                    <path d="M3 8h10M9 4l4 4-4 4" />
                  </svg>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
