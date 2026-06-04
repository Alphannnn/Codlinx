"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

const ACCENT = "#3FC9B4";

type NavItem = {
  href: string;
  label: string;
  icon: ReactNode;
  hue: string;
};

const NAV: NavItem[] = [
  { href: "/admin", label: "Overview", hue: ACCENT, icon: <DashIcon /> },
  { href: "/admin/meetings", label: "Meetings", hue: "#FBBF24", icon: <CalIcon /> },
  { href: "/admin/availability", label: "Availability", hue: "#6366F1", icon: <ClockIcon /> },
  { href: "/admin/blog", label: "Blog", hue: "#F472B6", icon: <BookIcon /> },
  { href: "/admin/careers", label: "Careers", hue: "#34D399", icon: <TeamIcon /> },
];

export default function AdminShell({
  user,
  children,
}: {
  user: { email: string; fullName: string | null };
  children: ReactNode;
}) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [cmdOpen, setCmdOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const initials = useMemo(() => {
    const src = user.fullName || user.email;
    return src
      .split(/[\s@.]/)
      .filter(Boolean)
      .slice(0, 2)
      .map((p) => p[0]?.toUpperCase())
      .join("");
  }, [user]);

  const activeIdx = useMemo(() => {
    // longest-prefix match
    let best = -1;
    let bestLen = -1;
    NAV.forEach((n, i) => {
      if (pathname === n.href || pathname.startsWith(n.href + "/")) {
        if (n.href.length > bestLen) {
          bestLen = n.href.length;
          best = i;
        }
      }
    });
    return best;
  }, [pathname]);

  // Cmd+K opens palette; Escape closes
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setCmdOpen((o) => !o);
      }
      if (e.key === "Escape") {
        setCmdOpen(false);
        setMobileOpen(false);
        setMenuOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Close menu on outside click
  useEffect(() => {
    if (!menuOpen) return;
    const onClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    window.addEventListener("mousedown", onClick);
    return () => window.removeEventListener("mousedown", onClick);
  }, [menuOpen]);

  return (
    <div className="relative isolate min-h-[calc(100vh-72px)] overflow-hidden bg-[#07070a] text-white">
      {/* Ambient background */}
      <BackgroundFx />

      {/* Top bar */}
      <header className="sticky top-0 z-30 border-b border-white/[0.06] bg-[#07070a]/80 backdrop-blur-xl">
        <div className="mx-auto flex h-14 max-w-[1600px] items-center gap-3 px-4 sm:px-6">
          <button
            type="button"
            onClick={() => setMobileOpen((o) => !o)}
            aria-label="Open menu"
            className="grid h-9 w-9 place-items-center rounded-lg border border-white/[0.06] bg-white/[0.03] text-white/85 transition-colors hover:border-white/15 lg:hidden"
          >
            <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden>
              <path d="M2 4h12M2 8h12M2 12h12" />
            </svg>
          </button>

          <Link href="/admin" className="flex items-center gap-2.5">
            <span
              className="grid h-7 w-7 place-items-center rounded-lg text-[11px] font-bold text-black"
              style={{ backgroundColor: ACCENT }}
            >
              C
            </span>
            <span className="hidden text-sm font-semibold tracking-tight sm:flex sm:items-center sm:gap-2">
              Codlinx
              <span className="rounded-md bg-white/[0.06] px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.2em] text-white/55">
                Admin
              </span>
            </span>
          </Link>

          <div className="ml-2 hidden h-5 w-px bg-white/[0.08] sm:block" />

          <button
            type="button"
            onClick={() => setCmdOpen(true)}
            className="group relative ml-1 hidden h-9 flex-1 items-center gap-2 rounded-lg border border-white/[0.06] bg-white/[0.03] px-3 text-sm text-white/55 transition-all hover:border-white/15 hover:bg-white/[0.05] sm:flex sm:max-w-md"
            aria-label="Search and quick actions"
          >
            <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden>
              <circle cx="7" cy="7" r="4.5" />
              <path d="M11 11l3 3" />
            </svg>
            <span className="flex-1 text-left">Search or jump to…</span>
            <kbd className="rounded-md border border-white/[0.08] bg-white/[0.04] px-1.5 py-0.5 font-mono text-[10px] font-semibold text-white/70">
              ⌘K
            </kbd>
          </button>

          <div className="ml-auto flex items-center gap-2">
            <LiveClock />
            <div ref={menuRef} className="relative">
              <button
                type="button"
                onClick={() => setMenuOpen((o) => !o)}
                aria-haspopup="menu"
                aria-expanded={menuOpen}
                className="grid h-9 w-9 place-items-center rounded-lg border border-white/[0.06] bg-white/[0.03] text-[11px] font-bold transition-all hover:border-white/15"
                style={{ color: ACCENT }}
              >
                {initials}
              </button>
              {menuOpen && (
                <div
                  role="menu"
                  className="absolute right-0 top-[120%] z-40 w-64 origin-top-right overflow-hidden rounded-xl border border-white/[0.08] bg-[#0c0c10] p-1.5 shadow-[0_24px_60px_-30px_rgba(0,0,0,0.9)]"
                  style={{ animation: "admin-menu 0.16s ease-out both" }}
                >
                  <div className="border-b border-white/[0.06] px-3 py-2.5">
                    <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/45">
                      Signed in
                    </div>
                    <div className="mt-1 truncate text-sm font-semibold">
                      {user.fullName ?? user.email.split("@")[0]}
                    </div>
                    <div className="truncate text-xs text-white/55">{user.email}</div>
                  </div>
                  <Link
                    href="/"
                    className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-white/85 transition-colors hover:bg-white/[0.06]"
                  >
                    <svg viewBox="0 0 16 16" className="h-3.5 w-3.5 rotate-180" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                      <path d="M3 8h10M9 4l4 4-4 4" />
                    </svg>
                    Back to site
                  </Link>
                  <Link
                    href="/account"
                    className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-white/85 transition-colors hover:bg-white/[0.06]"
                  >
                    <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                      <circle cx="8" cy="6" r="2.5" />
                      <path d="M3 13.5c.6-2.2 2.5-3.5 5-3.5s4.4 1.3 5 3.5" />
                    </svg>
                    My account
                  </Link>
                  <form action="/auth/sign-out" method="post" className="px-1 pt-1">
                    <button
                      type="submit"
                      className="flex w-full items-center gap-3 rounded-lg px-2 py-2 text-sm text-rose-300/90 transition-colors hover:bg-rose-500/10"
                    >
                      <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                        <path d="M10 4V3a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h5a1 1 0 0 0 1-1v-1" />
                        <path d="M14 8H7M11 5l3 3-3 3" />
                      </svg>
                      Sign out
                    </button>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Body */}
      <div className="mx-auto grid max-w-[1600px] grid-cols-1 gap-0 px-0 lg:grid-cols-[240px_1fr] lg:gap-0 lg:px-4 lg:py-6 xl:gap-6 xl:px-6">
        {/* Sidebar — desktop */}
        <aside className="hidden lg:sticky lg:top-20 lg:block lg:self-start">
          <nav className="relative rounded-2xl border border-white/[0.06] bg-white/[0.02] p-2 backdrop-blur-xl">
            {NAV.map((n, i) => {
              const isActive = activeIdx === i;
              return (
                <Link
                  key={n.href}
                  href={n.href}
                  className="group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-white/65 transition-all hover:text-white"
                  data-active={isActive}
                >
                  {isActive && (
                    <span
                      aria-hidden
                      className="absolute inset-0 rounded-xl border border-white/[0.08] bg-white/[0.05]"
                      style={{
                        boxShadow: `0 0 0 1px ${n.hue}30, 0 8px 24px -12px ${n.hue}40`,
                        animation: "admin-active-pulse 2.4s ease-in-out infinite",
                      }}
                    />
                  )}
                  <span
                    className="relative z-10 grid h-8 w-8 place-items-center rounded-lg transition-colors"
                    style={{
                      backgroundColor: isActive ? `${n.hue}22` : "rgba(255,255,255,0.04)",
                      color: isActive ? n.hue : "rgba(255,255,255,0.55)",
                    }}
                  >
                    {n.icon}
                  </span>
                  <span className="relative z-10">{n.label}</span>
                  {isActive && (
                    <span
                      className="relative z-10 ml-auto h-1.5 w-1.5 rounded-full"
                      style={{ backgroundColor: n.hue, boxShadow: `0 0 8px ${n.hue}` }}
                    />
                  )}
                </Link>
              );
            })}

            <div className="mt-3 border-t border-white/[0.06] pt-3">
              <Link
                href="/"
                className="group flex items-center gap-3 rounded-xl px-3 py-2 text-xs font-medium text-white/45 transition-colors hover:text-white/85"
              >
                <span className="grid h-7 w-7 place-items-center rounded-lg bg-white/[0.04] transition-colors group-hover:bg-white/[0.08]">
                  <svg viewBox="0 0 16 16" className="h-3 w-3 rotate-180" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    <path d="M3 8h10M9 4l4 4-4 4" />
                  </svg>
                </span>
                Back to site
              </Link>
            </div>
          </nav>

          <div className="mt-4 overflow-hidden rounded-2xl border border-white/[0.06] bg-gradient-to-br from-white/[0.04] to-white/[0.01] p-4 backdrop-blur-xl">
            <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-white/55">
              <span
                className="h-1.5 w-1.5 rounded-full"
                style={{ backgroundColor: ACCENT, animation: "admin-active-pulse 1.4s ease-in-out infinite" }}
              />
              Production
            </div>
            <div className="mt-1.5 text-xs leading-relaxed text-white/65">
              Connected to Supabase. All writes hit Postgres with RLS enforced.
            </div>
          </div>
        </aside>

        {/* Sidebar — mobile drawer */}
        {mobileOpen && (
          <div className="fixed inset-0 z-40 lg:hidden">
            <div
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setMobileOpen(false)}
              aria-hidden
            />
            <aside className="absolute inset-y-0 left-0 w-72 overflow-y-auto border-r border-white/[0.06] bg-[#0a0a0e] p-4">
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                aria-label="Close menu"
                className="ml-auto grid h-9 w-9 place-items-center rounded-lg border border-white/[0.06] bg-white/[0.03] text-white/70"
              >
                <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden>
                  <path d="M3 3l10 10M13 3L3 13" />
                </svg>
              </button>
              <nav className="mt-4 flex flex-col gap-1">
                {NAV.map((n, i) => {
                  const isActive = activeIdx === i;
                  return (
                    <Link
                      key={n.href}
                      href={n.href}
                      onClick={() => setMobileOpen(false)}
                      className="group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-white/75 transition-all hover:bg-white/[0.04] hover:text-white"
                      style={isActive ? { backgroundColor: "rgba(255,255,255,0.05)" } : undefined}
                    >
                      <span
                        className="grid h-8 w-8 place-items-center rounded-lg"
                        style={{
                          backgroundColor: isActive ? `${n.hue}22` : "rgba(255,255,255,0.04)",
                          color: isActive ? n.hue : "rgba(255,255,255,0.55)",
                        }}
                      >
                        {n.icon}
                      </span>
                      {n.label}
                    </Link>
                  );
                })}
              </nav>
            </aside>
          </div>
        )}

        {/* Main */}
        <main className="min-w-0 px-4 py-6 sm:px-6 lg:px-0 lg:py-0">{children}</main>
      </div>

      {/* Command palette */}
      {cmdOpen && (
        <CommandPalette
          items={NAV}
          onClose={() => setCmdOpen(false)}
        />
      )}

      <style jsx global>{`
        @keyframes admin-active-pulse {
          0%, 100% { opacity: 1; }
          50%      { opacity: 0.55; }
        }
        @keyframes admin-menu {
          from { opacity: 0; transform: translateY(-4px) scale(0.98); }
          to   { opacity: 1; transform: translateY(0)    scale(1); }
        }
        @keyframes admin-aurora {
          0%   { transform: translate3d(-15%, -10%, 0) rotate(0deg); }
          50%  { transform: translate3d(10%, 8%, 0)   rotate(180deg); }
          100% { transform: translate3d(-15%, -10%, 0) rotate(360deg); }
        }
        @keyframes admin-aurora-2 {
          0%   { transform: translate3d(20%, 15%, 0) rotate(0deg); }
          50%  { transform: translate3d(-12%, -6%, 0) rotate(-160deg); }
          100% { transform: translate3d(20%, 15%, 0) rotate(-360deg); }
        }
        @keyframes admin-fade-up {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}

function BackgroundFx() {
  return (
    <>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.18) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.18) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage:
            "radial-gradient(ellipse 90% 60% at 50% 0%, black 30%, transparent 75%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 90% 60% at 50% 0%, black 30%, transparent 75%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-[20%] left-1/2 -z-10 h-[700px] w-[1200px] -translate-x-1/2 rounded-full opacity-25 blur-[140px]"
        style={{
          background: `radial-gradient(circle, ${ACCENT} 0%, transparent 70%)`,
          animation: "admin-aurora 22s ease-in-out infinite",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-[30%] right-[5%] -z-10 h-[500px] w-[800px] rounded-full opacity-[0.18] blur-[140px]"
        style={{
          background: "radial-gradient(circle, #6366F1 0%, transparent 70%)",
          animation: "admin-aurora-2 28s ease-in-out infinite",
        }}
      />
    </>
  );
}

function LiveClock() {
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => {
    setNow(new Date());
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);
  if (!now) return null;
  const time = new Intl.DateTimeFormat("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
    timeZone: "Europe/London",
  }).format(now);
  return (
    <div className="hidden items-center gap-2 rounded-lg border border-white/[0.06] bg-white/[0.03] px-3 py-1.5 sm:flex">
      <span
        className="h-1.5 w-1.5 rounded-full"
        style={{
          backgroundColor: ACCENT,
          boxShadow: `0 0 6px ${ACCENT}`,
          animation: "admin-active-pulse 1.2s ease-in-out infinite",
        }}
      />
      <span className="font-mono text-[11px] font-semibold tabular-nums text-white/80">
        {time}
      </span>
      <span className="text-[10px] uppercase tracking-[0.18em] text-white/40">BST</span>
    </div>
  );
}

function CommandPalette({
  items,
  onClose,
}: {
  items: NavItem[];
  onClose: () => void;
}) {
  const [q, setQ] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const [hover, setHover] = useState(0);
  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    if (!needle) return items;
    return items.filter(
      (i) => i.label.toLowerCase().includes(needle) || i.href.toLowerCase().includes(needle)
    );
  }, [q, items]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    setHover(0);
  }, [q]);

  const onKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHover((h) => Math.min(filtered.length - 1, h + 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHover((h) => Math.max(0, h - 1));
    } else if (e.key === "Enter") {
      const target = filtered[hover];
      if (target) {
        window.location.href = target.href;
        onClose();
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-[12vh]">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-md" onClick={onClose} aria-hidden />
      <div
        className="relative w-full max-w-xl overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0c0c10] shadow-[0_30px_80px_-20px_rgba(0,0,0,0.8)]"
        style={{ animation: "admin-menu 0.18s ease-out both" }}
      >
        <div className="flex items-center gap-3 border-b border-white/[0.06] px-4">
          <svg viewBox="0 0 16 16" className="h-4 w-4 text-white/45" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden>
            <circle cx="7" cy="7" r="4.5" />
            <path d="M11 11l3 3" />
          </svg>
          <input
            ref={inputRef}
            value={q}
            onChange={(e) => setQ(e.target.value)}
            onKeyDown={onKeyDown}
            placeholder="Search admin sections…"
            className="h-12 flex-1 bg-transparent text-sm text-white outline-none placeholder:text-white/35"
          />
          <kbd className="rounded-md border border-white/[0.08] bg-white/[0.04] px-1.5 py-0.5 font-mono text-[10px] font-semibold text-white/55">
            esc
          </kbd>
        </div>
        <ul className="max-h-[50vh] overflow-y-auto p-1.5">
          {filtered.length === 0 ? (
            <li className="px-3 py-6 text-center text-sm text-white/45">No matches.</li>
          ) : (
            filtered.map((item, i) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={onClose}
                  onMouseEnter={() => setHover(i)}
                  className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm"
                  style={{
                    backgroundColor: hover === i ? "rgba(255,255,255,0.06)" : "transparent",
                    color: hover === i ? "white" : "rgba(255,255,255,0.75)",
                  }}
                >
                  <span
                    className="grid h-8 w-8 place-items-center rounded-lg"
                    style={{ backgroundColor: `${item.hue}22`, color: item.hue }}
                  >
                    {item.icon}
                  </span>
                  <span className="font-medium">{item.label}</span>
                  <span className="ml-auto font-mono text-[10px] text-white/40">
                    {item.href}
                  </span>
                </Link>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
}

function DashIcon() {
  return (
    <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="2" y="2" width="5" height="6" rx="1" />
      <rect x="9" y="2" width="5" height="3" rx="1" />
      <rect x="2" y="10" width="5" height="4" rx="1" />
      <rect x="9" y="7" width="5" height="7" rx="1" />
    </svg>
  );
}
function CalIcon() {
  return (
    <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="2" y="3.5" width="12" height="11" rx="1.5" />
      <path d="M2 7h12M5 2v3M11 2v3" />
    </svg>
  );
}
function ClockIcon() {
  return (
    <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="8" cy="8" r="6" />
      <path d="M8 5v3l2 1.5" />
    </svg>
  );
}
function BookIcon() {
  return (
    <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M3 2.5h7a2 2 0 0 1 2 2V14H5a2 2 0 0 1-2-2V2.5zM12 14V4.5" />
    </svg>
  );
}
function TeamIcon() {
  return (
    <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="6" cy="6" r="2" />
      <circle cx="11.5" cy="6" r="2" />
      <path d="M2.5 13c.5-1.6 1.9-2.5 3.5-2.5s3 .9 3.5 2.5M11 10.5c1.5 0 2.5.9 3 2.5" />
    </svg>
  );
}
