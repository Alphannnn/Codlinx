"use client";

import { createBrowserClient } from "@supabase/ssr";
import { SUPABASE_ANON_KEY, SUPABASE_CONFIGURED, SUPABASE_URL } from "./config";

/**
 * Browser-side Supabase client. Returns null in demo mode (no env vars).
 * Components must handle the null case and render a "connect Supabase" UI.
 */
export function getBrowserClient() {
  if (!SUPABASE_CONFIGURED) return null;
  return createBrowserClient(SUPABASE_URL, SUPABASE_ANON_KEY);
}
