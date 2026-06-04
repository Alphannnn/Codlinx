import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { createClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";
import { SUPABASE_ANON_KEY, SUPABASE_CONFIGURED, SUPABASE_URL } from "./config";

/**
 * Server-side Supabase client bound to the current request's cookies.
 * Returns null when Supabase is not configured.
 */
export async function getServerClient() {
  if (!SUPABASE_CONFIGURED) return null;
  const cookieStore = await cookies();
  return createServerClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(
            ({ name, value, options }: { name: string; value: string; options: CookieOptions }) =>
              cookieStore.set(name, value, options)
          );
        } catch {
          // Calling from a Server Component (read-only) — Supabase auto refreshes
          // tokens via middleware, so this is safe to swallow.
        }
      },
    },
  });
}

/**
 * Cookie-less Supabase client for build-time / static-param use cases.
 * generateStaticParams() runs without an HTTP request, so it can't read
 * cookies — we read public, RLS-allowed data via the anon key directly.
 */
export function getStaticClient() {
  if (!SUPABASE_CONFIGURED) return null;
  return createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

/**
 * Returns the current authed user (or null). Safe in both auth and demo mode.
 */
export async function getSessionUser() {
  const supabase = await getServerClient();
  if (!supabase) return null;
  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) return null;
  return data.user;
}
