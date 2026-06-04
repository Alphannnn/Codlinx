import { cookies } from "next/headers";
import { getServerClient, getSessionUser } from "./supabase/server";
import { ADMIN_EMAIL, isAdminEmail, SUPABASE_CONFIGURED } from "./supabase/config";

export type SessionUser = {
  id: string;
  email: string;
  fullName: string | null;
  isAdmin: boolean;
};

/**
 * Demo-mode session: when Supabase isn't configured, we look at a single
 * signed-in-via-form cookie so the dashboard pages can be previewed.
 */
const DEMO_COOKIE = "codlinx_demo_user";

export async function getCurrentUser(): Promise<SessionUser | null> {
  if (SUPABASE_CONFIGURED) {
    const user = await getSessionUser();
    if (!user || !user.email) return null;
    return {
      id: user.id,
      email: user.email,
      fullName:
        (user.user_metadata?.full_name as string | undefined) ??
        user.email.split("@")[0] ??
        null,
      isAdmin: isAdminEmail(user.email),
    };
  }

  // Demo mode: read the signed-in marker cookie.
  const store = await cookies();
  const raw = store.get(DEMO_COOKIE)?.value;
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as { id: string; email: string; fullName: string | null };
    return {
      id: parsed.id,
      email: parsed.email,
      fullName: parsed.fullName,
      isAdmin: isAdminEmail(parsed.email),
    };
  } catch {
    return null;
  }
}

export async function requireUser() {
  const user = await getCurrentUser();
  if (!user) return null;
  return user;
}

export async function requireAdmin() {
  const user = await getCurrentUser();
  if (!user) return { user: null, isAdmin: false };
  return { user, isAdmin: user.isAdmin };
}

export { ADMIN_EMAIL, isAdminEmail, SUPABASE_CONFIGURED };
export { getServerClient } from "./supabase/server";
export const DEMO_USER_COOKIE = DEMO_COOKIE;
