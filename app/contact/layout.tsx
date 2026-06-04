import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Tell us about your project. A senior team will come back inside 24 hours with a plan, a team, and a price.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact Codlinx",
    description:
      "Tell us about your project — we'll come back inside 24 hours.",
    url: "/contact",
    type: "website",
  },
};

export default function ContactLayout({ children }: { children: ReactNode }) {
  return children;
}
