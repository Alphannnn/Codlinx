import { redirect } from "next/navigation";
import { getCurrentUser } from "../lib/auth";
import { sanitizeNext } from "../lib/safe-redirect";
import {
  SUPABASE_CONFIGURED,
  ADMIN_EMAIL,
  ENABLED_OAUTH_PROVIDERS,
} from "../lib/supabase/config";
import LoginForm from "./LoginForm";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{
    next?: string;
    mode?: string;
    error?: string;
    notice?: string;
  }>;
}) {
  const { next: nextRaw, mode, error, notice } = await searchParams;
  const next = sanitizeNext(nextRaw);

  const user = await getCurrentUser();
  if (user) {
    redirect(next);
  }

  const initialMode = mode === "sign-up" ? "sign-up" : "sign-in";

  return (
    <LoginForm
      next={next}
      initialMode={initialMode}
      initialError={error ?? null}
      initialNotice={notice ?? null}
      supabaseConfigured={SUPABASE_CONFIGURED}
      adminEmail={ADMIN_EMAIL}
      enabledOAuthProviders={[...ENABLED_OAUTH_PROVIDERS]}
    />
  );
}
