"use server";

import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import { getServerClient } from "../supabase/server";
import { SITE_URL, SUPABASE_CONFIGURED, isAdminEmail } from "../supabase/config";
import { DEMO_USER_COOKIE } from "../auth";
import { sanitizeNext } from "../safe-redirect";

export type AuthResult =
  | { ok: true; isAdmin: boolean; redirectTo: string }
  | { ok: false; error: string; field?: "email" | "password" | "full_name" };

export type OAuthResult = { ok: true; url: string } | { ok: false; error: string };

export type OAuthProvider = "google" | "github";

const EMAIL_RE = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i;
const NAME_MAX = 80;
const PASSWORD_MIN = 8;
const RESEND_COOLDOWN_MS = 5_000;
const HOURLY_LIMIT = 30;

type Bucket = { last: number; count: number; windowStart: number };
const bucketStore = new Map<string, Bucket>();
const HOUR = 60 * 60 * 1000;

function rateLimitCheck(key: string): { ok: boolean; retryAfterMs: number } {
  const now = Date.now();
  const existing = bucketStore.get(key);
  if (!existing) {
    bucketStore.set(key, { last: now, count: 1, windowStart: now });
    return { ok: true, retryAfterMs: 0 };
  }
  if (now - existing.windowStart > HOUR) {
    existing.count = 1;
    existing.windowStart = now;
    existing.last = now;
    return { ok: true, retryAfterMs: 0 };
  }
  if (now - existing.last < RESEND_COOLDOWN_MS) {
    return { ok: false, retryAfterMs: RESEND_COOLDOWN_MS - (now - existing.last) };
  }
  if (existing.count >= HOURLY_LIMIT) {
    return { ok: false, retryAfterMs: HOUR - (now - existing.windowStart) };
  }
  existing.last = now;
  existing.count += 1;
  return { ok: true, retryAfterMs: 0 };
}

async function clientKey(prefix: string, email: string): Promise<string> {
  const h = await headers();
  const fwd = h.get("x-forwarded-for") ?? "";
  const ip = fwd.split(",")[0]?.trim() || "anon";
  return `${prefix}:${ip}::${email}`;
}

function validatePassword(password: string): string | null {
  if (!password) return "Please enter a password.";
  if (password.length < PASSWORD_MIN) return `Password must be at least ${PASSWORD_MIN} characters.`;
  if (!/[a-z]/.test(password)) return "Password must include a lowercase letter.";
  if (!/[A-Z]/.test(password)) return "Password must include an uppercase letter.";
  if (!/[0-9]/.test(password)) return "Password must include a number.";
  return null;
}

/* ----------------------------- Sign up ----------------------------- */

export async function signUpWithPassword(formData: FormData): Promise<AuthResult> {
  if (String(formData.get("website") ?? "")) {
    return { ok: true, isAdmin: false, redirectTo: "/account" };
  }

  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const password = String(formData.get("password") ?? "");
  const fullName = String(formData.get("full_name") ?? "").trim().slice(0, NAME_MAX);
  const nextRaw = String(formData.get("next") ?? "");

  if (!email || !EMAIL_RE.test(email) || email.length > 254) {
    return { ok: false, error: "Please enter a valid email address.", field: "email" };
  }
  if (!fullName) {
    return { ok: false, error: "Please tell us your name.", field: "full_name" };
  }
  const passwordError = validatePassword(password);
  if (passwordError) return { ok: false, error: passwordError, field: "password" };

  const rl = rateLimitCheck(await clientKey("signup", email));
  if (!rl.ok) {
    const seconds = Math.ceil(rl.retryAfterMs / 1000);
    return { ok: false, error: `Too many attempts — wait ${seconds}s.` };
  }

  if (!SUPABASE_CONFIGURED) {
    const store = await cookies();
    store.set(
      DEMO_USER_COOKIE,
      JSON.stringify({
        id: `u_${email.replace(/[^a-z0-9]/g, "").slice(0, 16)}`,
        email,
        fullName,
      }),
      {
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        path: "/",
        maxAge: 60 * 60 * 24 * 30,
      }
    );
    return {
      ok: true,
      isAdmin: isAdminEmail(email),
      redirectTo: sanitizeNext(nextRaw, isAdminEmail(email) ? "/admin" : "/account"),
    };
  }

  const supabase = await getServerClient();
  if (!supabase) return { ok: false, error: "Authentication service unavailable." };

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { full_name: fullName },
      emailRedirectTo: `${SITE_URL}/auth/callback`,
    },
  });

  if (error) {
    if (/already registered|already exists/i.test(error.message)) {
      return {
        ok: false,
        error: "An account with that email already exists. Try signing in instead.",
        field: "email",
      };
    }
    if (/password/i.test(error.message)) {
      return { ok: false, error: error.message, field: "password" };
    }
    return { ok: false, error: "Couldn't create the account. Please try again." };
  }
  if (!data.session) {
    return {
      ok: false,
      error:
        "Account created but email confirmation is required. Check your inbox to finish signing up.",
    };
  }

  return {
    ok: true,
    isAdmin: isAdminEmail(email),
    redirectTo: sanitizeNext(nextRaw, isAdminEmail(email) ? "/admin" : "/account"),
  };
}

/* ----------------------------- Sign in ----------------------------- */

export async function signInWithPassword(formData: FormData): Promise<AuthResult> {
  if (String(formData.get("website") ?? "")) {
    return { ok: true, isAdmin: false, redirectTo: "/account" };
  }

  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const password = String(formData.get("password") ?? "");
  const nextRaw = String(formData.get("next") ?? "");
  const requireAdmin = String(formData.get("require_admin") ?? "") === "true";

  if (!email || !EMAIL_RE.test(email)) {
    return { ok: false, error: "Please enter a valid email address.", field: "email" };
  }
  if (!password) {
    return { ok: false, error: "Please enter your password.", field: "password" };
  }

  const rl = rateLimitCheck(await clientKey("signin", email));
  if (!rl.ok) {
    const seconds = Math.ceil(rl.retryAfterMs / 1000);
    return { ok: false, error: `Too many attempts — wait ${seconds}s.` };
  }

  if (!SUPABASE_CONFIGURED) {
    const store = await cookies();
    store.set(
      DEMO_USER_COOKIE,
      JSON.stringify({
        id: `u_${email.replace(/[^a-z0-9]/g, "").slice(0, 16)}`,
        email,
        fullName: email.split("@")[0],
      }),
      {
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        path: "/",
        maxAge: 60 * 60 * 24 * 30,
      }
    );
    if (requireAdmin && !isAdminEmail(email)) {
      return {
        ok: false,
        error: "This account doesn't have admin access.",
        field: "email",
      };
    }
    return {
      ok: true,
      isAdmin: isAdminEmail(email),
      redirectTo: sanitizeNext(nextRaw, isAdminEmail(email) ? "/admin" : "/account"),
    };
  }

  const supabase = await getServerClient();
  if (!supabase) return { ok: false, error: "Authentication service unavailable." };

  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    if (/invalid login credentials/i.test(error.message)) {
      return {
        ok: false,
        error: "That email and password don't match our records.",
        field: "password",
      };
    }
    if (/not confirmed|email not confirmed/i.test(error.message)) {
      return {
        ok: false,
        error: "Confirm your email address before signing in. Check your inbox.",
      };
    }
    return { ok: false, error: "Couldn't sign in. Please try again." };
  }

  if (requireAdmin && !isAdminEmail(email)) {
    // Sign them out so an authenticated non-admin doesn't sit on /admin/login
    await supabase.auth.signOut();
    return {
      ok: false,
      error: "This account doesn't have admin access.",
      field: "email",
    };
  }

  return {
    ok: true,
    isAdmin: isAdminEmail(email),
    redirectTo: sanitizeNext(nextRaw, isAdminEmail(email) ? "/admin" : "/account"),
  };
}

/* ----------------------------- Forgot password ----------------------------- */

export async function sendPasswordReset(formData: FormData): Promise<AuthResult> {
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  if (!email || !EMAIL_RE.test(email)) {
    return { ok: false, error: "Please enter a valid email address.", field: "email" };
  }

  const rl = rateLimitCheck(await clientKey("reset", email));
  if (!rl.ok) {
    const seconds = Math.ceil(rl.retryAfterMs / 1000);
    return { ok: false, error: `Too many attempts — wait ${seconds}s.` };
  }

  if (!SUPABASE_CONFIGURED) {
    return { ok: true, isAdmin: false, redirectTo: "/login" };
  }

  const supabase = await getServerClient();
  if (!supabase) return { ok: false, error: "Authentication service unavailable." };

  // Returns success even on unknown email to avoid leaking user existence.
  await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${SITE_URL}/auth/callback?next=/account`,
  });

  return { ok: true, isAdmin: false, redirectTo: "/login" };
}

/* ----------------------------- OAuth ----------------------------- */

export async function startOAuth(provider: OAuthProvider, next?: string): Promise<OAuthResult> {
  if (!SUPABASE_CONFIGURED) {
    return { ok: false, error: "Connect Supabase to enable single sign-on." };
  }
  const supabase = await getServerClient();
  if (!supabase) return { ok: false, error: "Authentication service unavailable." };

  const safeNext = sanitizeNext(next);
  const redirectTo = `${SITE_URL}/auth/callback${safeNext ? `?next=${encodeURIComponent(safeNext)}` : ""}`;

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
    options: { redirectTo, skipBrowserRedirect: true },
  });

  if (error || !data?.url) {
    return { ok: false, error: "Couldn't start single sign-on. Try again." };
  }
  return { ok: true, url: data.url };
}

/* ----------------------------- Sign out ----------------------------- */

export async function signOut() {
  if (SUPABASE_CONFIGURED) {
    const supabase = await getServerClient();
    if (supabase) await supabase.auth.signOut();
  } else {
    const store = await cookies();
    store.delete(DEMO_USER_COOKIE);
  }
  redirect("/");
}
