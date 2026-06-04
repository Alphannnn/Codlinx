import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Footer from "./components/Footer";
import NavbarSlot from "./components/NavbarSlot";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const SITE_URL = "https://codlinx.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Codlinx — Software that moves businesses forward",
    template: "%s — Codlinx",
  },
  description:
    "Codlinx is a full-stack software studio. We design, engineer, and scale digital products — from zero-to-one launches to enterprise platforms shipping every week.",
  applicationName: "Codlinx",
  keywords: [
    "software house",
    "software studio",
    "web development",
    "mobile development",
    "Next.js agency",
    "React agency",
    "AI engineering",
    "cloud devops",
    "product strategy",
    "Codlinx",
  ],
  authors: [{ name: "Codlinx Studio", url: SITE_URL }],
  creator: "Codlinx Studio Ltd",
  publisher: "Codlinx Studio Ltd",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "Codlinx",
    title: "Codlinx — Software that moves businesses forward",
    description:
      "Design, engineering, AI, and infrastructure under one roof. 120+ products shipped.",
    locale: "en_GB",
  },
  twitter: {
    card: "summary_large_image",
    site: "@codlinx",
    creator: "@codlinx",
    title: "Codlinx — Software that moves businesses forward",
    description:
      "Design, engineering, AI, and infrastructure under one roof. 120+ products shipped.",
  },
  icons: {
    icon: "/favicon.ico",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  category: "technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-black">
        <a href="#main-content" className="codlinx-skip-link">
          Skip to main content
        </a>
        <NavbarSlot />
        <main id="main-content" className="pt-16 lg:pt-[72px] flex flex-1 flex-col">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
