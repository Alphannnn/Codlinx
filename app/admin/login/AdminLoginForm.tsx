"use client";

import { useEffect, useMemo, useRef, useState, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signInWithPassword } from "../../lib/actions/auth";

const ACCENT = "#3FC9B4";
const EMAIL_RE = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i;

export default function AdminLoginForm({
  initialError,
  initialNotice,
  alreadySignedInAsUser,
}: {
  initialError: string | null;
  initialNotice: string | null;
  alreadySignedInAsUser: string | null;
}) {
  const router = useRouter();
  const emailRef = useRef<HTMLInputElement>(null);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [website, setWebsite] = useState("");
  const [error, setError] = useState<string | null>(initialError);
  const [errorField, setErrorField] = useState<"email" | "password" | null>(null);
  const [notice] = useState<string | null>(initialNotice);
  const [submitting, startSubmit] = useTransition();

  const emailValid = useMemo(() => EMAIL_RE.test(email.trim()), [email]);

  useEffect(() => {
    if (!initialError) emailRef.current?.focus();
  }, [initialError]);

  const submit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    setError(null);
    setErrorField(null);

    if (!emailValid) {
      setError("Please enter a valid email address.");
      setErrorField("email");
      return;
    }
    if (!password) {
      setError("Please enter your password.");
      setErrorField("password");
      return;
    }

    startSubmit(async () => {
      const fd = new FormData();
      fd.set("email", email.trim());
      fd.set("password", password);
      fd.set("website", website);
      fd.set("next", "/admin");
      fd.set("require_admin", "true");

      const res = await signInWithPassword(fd);
      if (!res.ok) {
        setError(res.error);
        setErrorField(res.field === "full_name" ? null : res.field ?? null);
        return;
      }
      router.push(res.redirectTo);
      router.refresh();
    });
  };

  return (
    <section className="relative isolate flex flex-1 items-center justify-center overflow-hidden bg-black text-white">
      <div
        aria-hidden
        className="absolute inset-0 -z-10 opacity-[0.10]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage:
            "radial-gradient(ellipse 60% 50% at 50% 40%, black 30%, transparent 75%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 60% 50% at 50% 40%, black 30%, transparent 75%)",
        }}
      />
      <div
        aria-hidden
        className="absolute left-1/2 top-[-180px] -z-10 h-[420px] w-[700px] -translate-x-1/2 rounded-full opacity-30 blur-[140px]"
        style={{ background: `radial-gradient(circle, ${ACCENT}, transparent 70%)` }}
      />

      <div className="mx-auto flex w-full max-w-md flex-col px-5 py-20 sm:px-8 lg:py-24">
        <Link
          href="/"
          className="mb-10 inline-flex w-fit items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] text-white/80 backdrop-blur-md transition-all hover:border-white/30"
        >
          <span className="grid h-5 w-5 place-items-center rounded-full bg-white/10">
            <svg viewBox="0 0 16 16" className="h-2.5 w-2.5 rotate-180" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M3 8h10M9 4l4 4-4 4" />
            </svg>
          </span>
          Back to home
        </Link>

        <div className="rounded-3xl border border-white/[0.08] bg-white/[0.03] p-7 backdrop-blur-md shadow-[0_28px_80px_-40px_rgba(0,0,0,0.6)] sm:p-9">
          <div className="flex items-center gap-2">
            <span
              className="grid h-9 w-9 place-items-center rounded-xl text-sm font-bold text-black"
              style={{ backgroundColor: ACCENT }}
            >
              <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <rect x="3" y="7" width="10" height="7" rx="1.5" />
                <path d="M5 7V5a3 3 0 0 1 6 0v2" />
              </svg>
            </span>
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/50">
                Restricted area
              </div>
              <h1 className="text-xl font-semibold tracking-tight">Admin sign-in</h1>
            </div>
          </div>

          <p className="mt-5 text-sm leading-relaxed text-white/65">
            Sign in with the admin account to access the studio dashboard. This page
            is not for client accounts — clients should{" "}
            <Link href="/login" className="font-medium text-white underline-offset-4 hover:underline">
              sign in here
            </Link>{" "}
            instead.
          </p>

          {alreadySignedInAsUser && (
            <div className="mt-5 rounded-2xl border border-amber-400/20 bg-amber-400/[0.06] p-3.5 text-xs leading-relaxed text-amber-100/90">
              <div className="font-semibold text-amber-100">Signed in as a client</div>
              <p className="mt-1 text-amber-100/75">
                You&apos;re currently signed in as{" "}
                <span className="font-semibold text-amber-100">{alreadySignedInAsUser}</span>{" "}
                — that account doesn&apos;t have admin access. Sign out before continuing.
              </p>
              <form action="/auth/sign-out" method="post" className="mt-2.5">
                <button
                  type="submit"
                  className="inline-flex h-8 items-center rounded-full border border-amber-300/40 bg-amber-300/10 px-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-amber-100 hover:bg-amber-300/15"
                >
                  Sign out
                </button>
              </form>
            </div>
          )}

          <form className="mt-6 flex flex-col gap-4" onSubmit={submit} noValidate>
            <input
              type="text"
              name="website"
              tabIndex={-1}
              autoComplete="off"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              aria-hidden="true"
              className="absolute -left-[9999px] h-0 w-0 opacity-0"
            />

            <label className="flex flex-col gap-2">
              <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/55">
                Admin email
              </span>
              <input
                ref={emailRef}
                type="email"
                required
                autoComplete="email"
                inputMode="email"
                spellCheck={false}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@codlinx.com"
                maxLength={254}
                aria-invalid={errorField === "email"}
                className="login-input"
              />
              {errorField === "email" && error && (
                <span className="text-[11px] text-rose-300">{error}</span>
              )}
            </label>

            <label className="flex flex-col gap-2">
              <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/55">
                Password
              </span>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  maxLength={128}
                  aria-invalid={errorField === "password"}
                  className="login-input pr-11"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute right-2 top-1/2 grid h-7 w-7 -translate-y-1/2 place-items-center rounded-md text-white/55 transition-colors hover:bg-white/[0.06] hover:text-white"
                >
                  {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                </button>
              </div>
              {errorField === "password" && error && (
                <span className="text-[11px] text-rose-300">{error}</span>
              )}
            </label>

            {error && !errorField && (
              <p
                role="alert"
                className="rounded-xl border border-rose-500/30 bg-rose-500/10 px-3 py-2 text-xs text-rose-200"
              >
                {error}
              </p>
            )}
            {notice && !error && (
              <p className="rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2 text-xs text-white/75">
                {notice}
              </p>
            )}

            <button
              type="submit"
              disabled={submitting}
              aria-busy={submitting}
              className="group mt-2 inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-white px-6 text-sm font-semibold text-black transition-transform duration-300 enabled:hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {submitting ? (
                <>
                  <Spinner /> Verifying…
                </>
              ) : (
                <>
                  Sign in to admin
                  <span
                    className="grid h-7 w-7 place-items-center rounded-full transition-transform duration-300 group-hover:translate-x-0.5"
                    style={{ backgroundColor: ACCENT }}
                  >
                    <svg viewBox="0 0 16 16" className="h-3 w-3 text-black" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                      <path d="M3 8h10M9 4l4 4-4 4" />
                    </svg>
                  </span>
                </>
              )}
            </button>

            <p className="text-center text-[11px] text-white/40">
              Unauthorized access attempts are logged.
            </p>
          </form>
        </div>
      </div>

      <style jsx>{`
        .login-input {
          display: block;
          width: 100%;
          padding: 12px 14px;
          background-color: rgba(255, 255, 255, 0.04);
          color: white;
          font-size: 15px;
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: 12px;
          transition: border-color 0.2s, box-shadow 0.2s, background-color 0.2s;
        }
        .login-input::placeholder { color: rgba(255, 255, 255, 0.35); }
        .login-input:focus {
          outline: none;
          border-color: ${ACCENT};
          box-shadow: 0 0 0 4px rgba(63, 201, 180, 0.18);
          background-color: rgba(255, 255, 255, 0.06);
        }
        .login-input[aria-invalid="true"] {
          border-color: rgba(244, 63, 94, 0.45);
        }
      `}</style>
    </section>
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

function EyeIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function EyeOffIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
      <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
  );
}
