"use client";

import { useEffect, useMemo, useRef, useState, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  signInWithPassword,
  signUpWithPassword,
  sendPasswordReset,
  startOAuth,
  type OAuthProvider,
} from "../lib/actions/auth";

const ACCENT = "#3FC9B4";
const EMAIL_RE = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i;

type Mode = "sign-in" | "sign-up" | "forgot";

export default function LoginForm({
  next,
  initialMode,
  initialError,
  initialNotice,
  supabaseConfigured,
  adminEmail,
  enabledOAuthProviders,
}: {
  next: string;
  initialMode: "sign-in" | "sign-up";
  initialError: string | null;
  initialNotice: string | null;
  supabaseConfigured: boolean;
  adminEmail: string;
  enabledOAuthProviders: OAuthProvider[];
}) {
  const router = useRouter();
  const emailRef = useRef<HTMLInputElement>(null);

  const [mode, setMode] = useState<Mode>(initialMode);
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [website, setWebsite] = useState("");
  const [error, setError] = useState<string | null>(initialError);
  const [errorField, setErrorField] = useState<"email" | "password" | "full_name" | null>(null);
  const [notice, setNotice] = useState<string | null>(initialNotice);
  const [oauthPending, setOauthPending] = useState<OAuthProvider | null>(null);
  const [submitting, startSubmit] = useTransition();
  const [resetSent, setResetSent] = useState(false);

  const oauthEnabled = enabledOAuthProviders.length > 0;
  const emailValid = useMemo(() => EMAIL_RE.test(email.trim()), [email]);
  const emailIsAdmin = useMemo(
    () => emailValid && email.trim().toLowerCase() === adminEmail.toLowerCase(),
    [email, emailValid, adminEmail]
  );
  const strength = useMemo(() => passwordStrength(password), [password]);
  const passwordsMatch = mode !== "sign-up" || password === confirmPassword;

  useEffect(() => {
    if (!initialError) emailRef.current?.focus();
  }, [initialError]);

  useEffect(() => {
    setError(null);
    setErrorField(null);
    setNotice(null);
    setResetSent(false);
  }, [mode]);

  const submit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    setError(null);
    setErrorField(null);
    setNotice(null);

    if (!emailValid) {
      setError("Please enter a valid email address.");
      setErrorField("email");
      return;
    }
    if (mode === "sign-up" && !fullName.trim()) {
      setError("Please tell us your name.");
      setErrorField("full_name");
      return;
    }
    if (mode !== "forgot") {
      if (!password) {
        setError("Please enter a password.");
        setErrorField("password");
        return;
      }
      if (mode === "sign-up" && strength.score < 3) {
        setError(strength.hint);
        setErrorField("password");
        return;
      }
      if (mode === "sign-up" && !passwordsMatch) {
        setError("Passwords don't match.");
        setErrorField("password");
        return;
      }
    }

    startSubmit(async () => {
      const fd = new FormData();
      fd.set("email", email.trim());
      fd.set("password", password);
      fd.set("website", website);
      fd.set("next", next);
      if (mode === "sign-up") fd.set("full_name", fullName.trim());

      if (mode === "forgot") {
        const res = await sendPasswordReset(fd);
        if (!res.ok) {
          setError(res.error);
          setErrorField(res.field ?? null);
          return;
        }
        setResetSent(true);
        return;
      }

      const res =
        mode === "sign-in"
          ? await signInWithPassword(fd)
          : await signUpWithPassword(fd);

      if (!res.ok) {
        setError(res.error);
        setErrorField(res.field ?? null);
        return;
      }
      router.push(res.redirectTo);
      router.refresh();
    });
  };

  const handleOAuth = (provider: OAuthProvider) => {
    if (!supabaseConfigured) {
      setError("Single sign-on is available once Supabase is configured.");
      return;
    }
    setError(null);
    setOauthPending(provider);
    startSubmit(async () => {
      const res = await startOAuth(provider, next);
      if (!res.ok) {
        setError(res.error);
        setOauthPending(null);
        return;
      }
      window.location.href = res.url;
    });
  };

  const titleCopy =
    mode === "sign-up"
      ? "Create your client portal."
      : mode === "forgot"
        ? "Reset your password."
        : "Sign in to your client portal.";
  const subtitleCopy =
    mode === "sign-up"
      ? "One workspace for every engagement — scoped briefs, booked calls, and partner notes in one place."
      : mode === "forgot"
        ? "Enter the email tied to your account and we'll send you a secure reset link."
        : "Welcome back. Track scoped projects, book discovery calls, and read partner notes — all in one place.";

  return (
    <section className="relative isolate flex flex-1 items-center overflow-hidden bg-black text-white">
      <div
        aria-hidden
        className="absolute inset-0 -z-10 opacity-[0.10]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage:
            "radial-gradient(ellipse 70% 60% at 50% 40%, black 30%, transparent 75%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 70% 60% at 50% 40%, black 30%, transparent 75%)",
        }}
      />
      <div
        aria-hidden
        className="absolute left-1/2 top-[-220px] -z-10 h-[500px] w-[900px] -translate-x-1/2 rounded-full opacity-25 blur-[140px]"
        style={{ background: `radial-gradient(circle, ${ACCENT} 0%, transparent 70%)` }}
      />

      <div className="mx-auto grid w-full max-w-5xl grid-cols-1 gap-12 px-5 py-20 sm:px-8 lg:grid-cols-[1.05fr_1fr] lg:gap-16 lg:py-24">
        <div className="flex flex-col justify-center">
          <Link
            href="/"
            className="inline-flex w-fit items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] text-white/80 backdrop-blur-md transition-all hover:border-white/30"
          >
            <span className="grid h-5 w-5 place-items-center rounded-full bg-white/10">
              <svg viewBox="0 0 16 16" className="h-2.5 w-2.5 rotate-180" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M3 8h10M9 4l4 4-4 4" />
              </svg>
            </span>
            Back to home
          </Link>

          <h1
            className="mt-8 text-balance text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl"
            style={{
              backgroundImage: `linear-gradient(120deg, #ffffff 0%, ${ACCENT} 100%)`,
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            {titleCopy}
          </h1>
          <p className="mt-5 max-w-md text-pretty text-base leading-relaxed text-white/65 sm:text-lg">
            {subtitleCopy}
          </p>

          <ul className="mt-10 flex flex-col gap-3 text-sm text-white/65">
            {[
              "Encrypted at rest, TLS in transit",
              "Row-level security on every table",
              "Independent admin login — separate workspace",
            ].map((b) => (
              <li key={b} className="flex items-start gap-3">
                <span
                  className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full"
                  style={{ backgroundColor: "rgba(63,201,180,0.15)" }}
                >
                  <svg viewBox="0 0 16 16" className="h-3 w-3" style={{ color: ACCENT }} fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    <path d="M3 8l4 4 6-8" />
                  </svg>
                </span>
                {b}
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-3xl border border-white/[0.08] bg-white/[0.03] p-7 backdrop-blur-md shadow-[0_28px_80px_-40px_rgba(0,0,0,0.6)] sm:p-9">
          {mode !== "forgot" && (
            <div className="grid grid-cols-2 gap-1 rounded-full bg-white/[0.04] p-1 text-sm">
              {(["sign-in", "sign-up"] as const).map((m) => {
                const active = mode === m;
                return (
                  <button
                    key={m}
                    type="button"
                    onClick={() => setMode(m)}
                    aria-pressed={active}
                    className={[
                      "rounded-full px-3 py-2 font-medium transition-all",
                      active
                        ? "bg-white text-black shadow-[0_8px_24px_-12px_rgba(255,255,255,0.4)]"
                        : "text-white/65 hover:text-white",
                    ].join(" ")}
                  >
                    {m === "sign-in" ? "Sign in" : "Create account"}
                  </button>
                );
              })}
            </div>
          )}

          {mode === "forgot" && resetSent ? (
            <ResetSentState
              email={email}
              onBack={() => {
                setMode("sign-in");
                setResetSent(false);
              }}
            />
          ) : (
            <>
              {oauthEnabled && mode !== "forgot" && (
                <>
                  <div
                    className={[
                      "mt-6 grid gap-2.5",
                      enabledOAuthProviders.length > 1 ? "grid-cols-1 sm:grid-cols-2" : "grid-cols-1",
                    ].join(" ")}
                  >
                    {enabledOAuthProviders.includes("google") && (
                      <OAuthButton
                        provider="google"
                        label="Continue with Google"
                        loading={oauthPending === "google"}
                        disabled={submitting}
                        onClick={() => handleOAuth("google")}
                      />
                    )}
                    {enabledOAuthProviders.includes("github") && (
                      <OAuthButton
                        provider="github"
                        label="Continue with GitHub"
                        loading={oauthPending === "github"}
                        disabled={submitting}
                        onClick={() => handleOAuth("github")}
                      />
                    )}
                  </div>

                  <div className="mt-6 flex items-center gap-3" aria-hidden>
                    <div className="h-px flex-1 bg-white/[0.06]" />
                    <span className="text-[11px] font-medium uppercase tracking-[0.22em] text-white/45">
                      or with email
                    </span>
                    <div className="h-px flex-1 bg-white/[0.06]" />
                  </div>
                </>
              )}

              <form
                className={oauthEnabled && mode !== "forgot" ? "mt-5 flex flex-col gap-4" : "mt-6 flex flex-col gap-4"}
                onSubmit={submit}
                noValidate
              >
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

                {mode === "sign-up" && (
                  <FormField
                    label="Full name"
                    error={errorField === "full_name" ? error : null}
                  >
                    <input
                      type="text"
                      autoComplete="name"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Ada Lovelace"
                      maxLength={80}
                      className="login-input"
                    />
                  </FormField>
                )}

                <FormField
                  label="Email"
                  error={errorField === "email" ? error : null}
                  adornment={
                    emailIsAdmin && (
                      <span
                        className="rounded-full px-2 py-0.5 text-[9px] font-bold tracking-[0.18em]"
                        style={{ backgroundColor: "rgba(63,201,180,0.15)", color: ACCENT }}
                      >
                        Admin
                      </span>
                    )
                  }
                >
                  <div className="relative">
                    <input
                      ref={emailRef}
                      type="email"
                      required
                      autoComplete="email"
                      inputMode="email"
                      spellCheck={false}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@company.com"
                      maxLength={254}
                      aria-invalid={errorField === "email"}
                      className="login-input pr-10"
                    />
                    {emailValid && (
                      <span
                        aria-hidden
                        className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2"
                        style={{ color: ACCENT }}
                      >
                        <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M3 8l4 4 6-8" />
                        </svg>
                      </span>
                    )}
                  </div>
                </FormField>

                {mode !== "forgot" && (
                  <FormField
                    label="Password"
                    error={errorField === "password" ? error : null}
                    adornment={
                      mode === "sign-in" && (
                        <button
                          type="button"
                          onClick={() => setMode("forgot")}
                          className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/55 underline-offset-4 hover:text-white hover:underline"
                        >
                          Forgot?
                        </button>
                      )
                    }
                  >
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        autoComplete={mode === "sign-up" ? "new-password" : "current-password"}
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        minLength={mode === "sign-up" ? 8 : undefined}
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
                    {mode === "sign-up" && password.length > 0 && (
                      <PasswordStrength strength={strength} />
                    )}
                  </FormField>
                )}

                {mode === "sign-up" && (
                  <FormField label="Confirm password">
                    <input
                      type={showPassword ? "text" : "password"}
                      autoComplete="new-password"
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="••••••••"
                      minLength={8}
                      maxLength={128}
                      aria-invalid={confirmPassword.length > 0 && !passwordsMatch}
                      className="login-input"
                    />
                    {confirmPassword.length > 0 && !passwordsMatch && (
                      <p className="mt-1 text-[11px] text-rose-300">Passwords don&apos;t match.</p>
                    )}
                  </FormField>
                )}

                {error && !errorField && (
                  <p role="alert" className="rounded-xl border border-rose-500/30 bg-rose-500/10 px-3 py-2 text-xs text-rose-200">
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
                      <Spinner />{" "}
                      {mode === "sign-up" ? "Creating account…" : mode === "forgot" ? "Sending…" : "Signing in…"}
                    </>
                  ) : (
                    <>
                      {mode === "sign-up" ? "Create account" : mode === "forgot" ? "Send reset link" : "Sign in"}
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

                {mode === "forgot" && (
                  <button
                    type="button"
                    onClick={() => setMode("sign-in")}
                    className="text-center text-xs font-medium text-white/55 underline-offset-4 hover:text-white hover:underline"
                  >
                    Back to sign in
                  </button>
                )}

                <p className="text-center text-[11px] text-white/40">
                  By continuing you agree to our{" "}
                  <Link href="/terms" className="underline-offset-4 hover:text-white/70 hover:underline">terms</Link>{" "}
                  and{" "}
                  <Link href="/privacy" className="underline-offset-4 hover:text-white/70 hover:underline">privacy policy</Link>.
                </p>
              </form>
            </>
          )}
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

/* ----------------------------- Helpers ----------------------------- */

function FormField({
  label,
  error,
  adornment,
  children,
}: {
  label: string;
  error?: string | null;
  adornment?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <label className="flex flex-col gap-2">
      <span className="flex items-center justify-between text-[11px] font-semibold uppercase tracking-[0.2em] text-white/55">
        <span>{label}</span>
        {adornment}
      </span>
      {children}
      {error && <span className="text-[11px] text-rose-300">{error}</span>}
    </label>
  );
}

type StrengthResult = { score: 0 | 1 | 2 | 3 | 4; label: string; hint: string };

function passwordStrength(password: string): StrengthResult {
  if (!password)
    return { score: 0, label: "", hint: "Use at least 8 characters with upper/lower/number." };
  let score = 0;
  if (password.length >= 8) score++;
  if (/[a-z]/.test(password)) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^a-zA-Z0-9]/.test(password)) score++;
  if (password.length >= 12 && score >= 4) score = 4;
  else if (score > 4) score = 4;
  const label = ["", "Very weak", "Weak", "Good", "Strong"][score] ?? "";
  const hint =
    score < 3
      ? "Add an uppercase letter, a number, and at least 8 characters."
      : score === 3
        ? "Good — adding length or a symbol makes it strong."
        : "Strong password.";
  return { score: score as 0 | 1 | 2 | 3 | 4, label, hint };
}

function PasswordStrength({ strength }: { strength: StrengthResult }) {
  const colors = ["#27272a", "#dc2626", "#f97316", "#eab308", ACCENT];
  return (
    <div className="mt-2 flex flex-col gap-1.5">
      <div className="flex gap-1">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="h-1 flex-1 rounded-full transition-colors"
            style={{ backgroundColor: i <= strength.score ? colors[strength.score] : "rgba(255,255,255,0.08)" }}
          />
        ))}
      </div>
      <div className="flex items-center justify-between text-[11px]">
        <span className="text-white/55">{strength.hint}</span>
        {strength.label && (
          <span className="font-semibold" style={{ color: colors[strength.score] }}>
            {strength.label}
          </span>
        )}
      </div>
    </div>
  );
}

function ResetSentState({ email, onBack }: { email: string; onBack: () => void }) {
  return (
    <div className="mt-6 flex flex-col gap-4">
      <span className="grid h-12 w-12 place-items-center rounded-full" style={{ backgroundColor: "rgba(63,201,180,0.15)" }}>
        <svg viewBox="0 0 24 24" className="h-6 w-6" style={{ color: ACCENT }} fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="M4 12.5l5 5 11-11" />
        </svg>
      </span>
      <h2 className="text-2xl font-semibold tracking-tight text-white">Check your inbox.</h2>
      <p className="text-sm leading-relaxed text-white/65">
        If an account exists for <span className="font-semibold text-white">{email}</span>, we sent
        a password-reset link. Open it on this device to choose a new password.
      </p>
      <button
        type="button"
        onClick={onBack}
        className="mt-2 inline-flex h-11 items-center justify-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-5 text-sm font-medium text-white/85 transition-colors hover:border-white/30"
      >
        Back to sign in
      </button>
    </div>
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

function OAuthButton({
  provider,
  label,
  loading,
  disabled,
  onClick,
}: {
  provider: OAuthProvider;
  label: string;
  loading: boolean;
  disabled: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled || loading}
      aria-busy={loading}
      className="inline-flex h-11 items-center justify-center gap-2.5 rounded-full border border-white/10 bg-white/[0.04] px-4 text-sm font-medium text-white/90 transition-all hover:border-white/25 hover:bg-white/[0.07] disabled:cursor-not-allowed disabled:opacity-50"
    >
      {loading ? <Spinner /> : provider === "google" ? <GoogleIcon /> : <GitHubIcon />}
      <span className="truncate">{label}</span>
    </button>
  );
}

function GoogleIcon() {
  return (
    <svg viewBox="0 0 18 18" className="h-4 w-4" aria-hidden>
      <path fill="#EA4335" d="M9 3.48c1.69 0 2.83.73 3.48 1.34l2.54-2.48C13.46.89 11.43 0 9 0 5.48 0 2.44 2.02.96 4.96l2.91 2.26C4.6 5.05 6.62 3.48 9 3.48z" />
      <path fill="#4285F4" d="M17.64 9.2c0-.74-.06-1.28-.19-1.84H9v3.34h4.96c-.1.83-.64 2.08-1.84 2.92l2.84 2.2c1.7-1.57 2.68-3.88 2.68-6.62z" />
      <path fill="#FBBC05" d="M3.88 10.78A5.54 5.54 0 0 1 3.58 9c0-.62.11-1.22.29-1.78L.96 4.96A9 9 0 0 0 0 9c0 1.45.35 2.82.96 4.04l2.92-2.26z" />
      <path fill="#34A853" d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.84-2.2c-.76.53-1.78.9-3.12.9-2.38 0-4.4-1.57-5.12-3.74L.97 13.04C2.45 15.98 5.48 18 9 18z" />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg viewBox="0 0 16 16" className="h-4 w-4 fill-current" aria-hidden>
      <path d="M8 0C3.58 0 0 3.58 0 8a8 8 0 0 0 5.47 7.59c.4.07.55-.17.55-.38v-1.34c-2.22.48-2.69-1.07-2.69-1.07-.36-.92-.89-1.17-.89-1.17-.73-.5.06-.49.06-.49.81.06 1.23.83 1.23.83.72 1.22 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82a7.66 7.66 0 0 1 4 0c1.53-1.03 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.47v2.18c0 .21.15.46.55.38A8 8 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
    </svg>
  );
}
