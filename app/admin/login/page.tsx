import { redirect } from "next/navigation";
import type { Metadata } from "next";
import { getCurrentUser } from "../../lib/auth";
import AdminLoginForm from "./AdminLoginForm";

export const metadata: Metadata = {
  title: "Admin · Sign in",
  description: "Restricted area. Admin sign-in.",
  robots: { index: false, follow: false },
};

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; notice?: string }>;
}) {
  const { error, notice } = await searchParams;
  const user = await getCurrentUser();
  if (user?.isAdmin) redirect("/admin");

  return (
    <AdminLoginForm
      initialError={error ?? null}
      initialNotice={notice ?? null}
      alreadySignedInAsUser={user ? user.email : null}
    />
  );
}
