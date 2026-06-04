import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { getCurrentUser } from "../lib/auth";
import AdminShell from "./AdminShell";

export const metadata: Metadata = {
  title: "Admin",
  description: "Codlinx admin dashboard — internal only.",
  robots: { index: false, follow: false },
};

const ACCENT = "#3FC9B4";

export default async function AdminLayout({ children }: { children: ReactNode }) {
  // /admin/login sits inside the /admin/* tree but must NOT be gated — that
  // would cause an infinite redirect loop.
  const hdrs = await headers();
  const pathname = hdrs.get("x-pathname") ?? "";
  if (pathname === "/admin/login" || pathname.startsWith("/admin/login/")) {
    return <>{children}</>;
  }

  const user = await getCurrentUser();
  if (!user) redirect("/admin/login");
  if (!user.isAdmin) {
    return (
      <section className="relative isolate flex flex-1 flex-col items-center justify-center bg-black px-5 py-24 text-center text-white">
        <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] text-white/70 backdrop-blur-md">
          <span className="h-1 w-1 rounded-full" style={{ backgroundColor: ACCENT }} />
          403 · Admins only
        </span>
        <h1 className="mt-6 max-w-xl text-balance text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
          This area is reserved for the studio team.
        </h1>
        <p className="mt-4 max-w-md text-sm text-white/65">
          You&apos;re signed in as <span className="font-semibold text-white">{user.email}</span>.
          If this is your account, ask the operator to add it as <code className="font-mono">NEXT_PUBLIC_ADMIN_EMAIL</code>.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/account"
            className="inline-flex h-11 items-center gap-2 rounded-full bg-white px-5 text-sm font-semibold text-black"
          >
            Back to my account
          </Link>
          <form action="/auth/sign-out" method="post">
            <button
              type="submit"
              className="inline-flex h-11 items-center gap-2 rounded-full border border-white/15 bg-white/[0.03] px-5 text-sm font-medium text-white/85 hover:border-white/30"
            >
              Sign out
            </button>
          </form>
        </div>
      </section>
    );
  }

  return (
    <AdminShell user={{ email: user.email, fullName: user.fullName }}>
      {children}
    </AdminShell>
  );
}
