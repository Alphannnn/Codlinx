import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageHero from "../../components/PageHero";
import ClosingCTA from "../../components/ClosingCTA";
import Counter from "../../components/Counter";
import Magnetic from "../../components/Magnetic";
import CursorGlow from "../../components/CursorGlow";
import Reveal from "../../components/Reveal";
import Tilt from "../../components/Tilt";
import Marquee from "../../components/Marquee";
import { SERVICES_CONTENT, getServiceBySlug } from "../../lib/services";

const ACCENT = "#3FC9B4";

type ServiceMedia = {
  heroImage: string;
  heroAlt: string;
  heroBadge: string;
  liveLine: string;
  heroStats: { value: string; label: string }[];
  gallery: { image: string; alt: string; caption: string }[];
  spotlight: {
    client: string;
    headline: string;
    body: string;
    image: string;
    imageAlt: string;
    metrics: { value: string; label: string }[];
    href: string;
  };
  testimonial: {
    quote: string;
    name: string;
    role: string;
    avatar: string;
  };
  signals: string[];
};

const SERVICE_MEDIA: Record<string, ServiceMedia> = {
  web: {
    heroImage:
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1800&q=80",
    heroAlt: "Editor open on a developer's screen with React code visible",
    heroBadge: "Next.js · React · TypeScript",
    liveLine: "Currently shipping a trading dashboard for Atlas Trade",
    heroStats: [
      { value: "120+", label: "Web products shipped" },
      { value: "1.2s", label: "p75 LCP at launch" },
      { value: "100%", label: "Type-safe boundaries" },
      { value: "30d", label: "Post-launch support" },
    ],
    gallery: [
      {
        image:
          "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
        alt: "Analytics dashboard with charts and tables",
        caption: "Real-time analytics, p99 under 90ms",
      },
      {
        image:
          "https://images.unsplash.com/photo-1556761175-4b46a572b786?auto=format&fit=crop&w=1200&q=80",
        alt: "Engineering team reviewing a PR on a large display",
        caption: "Pull-request review, eval-gated rollouts",
      },
      {
        image:
          "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=1200&q=80",
        alt: "Performance monitoring dashboard with metric tiles",
        caption: "Core Web Vitals tracked from day one",
      },
    ],
    spotlight: {
      client: "Atlas Trade",
      headline: "From spreadsheet to trading desk in 11 weeks.",
      body: "We rebuilt Atlas Trade's legacy back-office on a type-safe Next.js + Postgres stack. Tick-to-screen p99 dropped from 540ms to 88ms, and the team retired a $30k/mo vendor in the process.",
      image:
        "https://images.unsplash.com/photo-1642543492481-44e81e3914a7?auto=format&fit=crop&w=1600&q=80",
      imageAlt: "Financial trading dashboard with live charts",
      metrics: [
        { value: "<90ms", label: "Tick → screen p99" },
        { value: "11 wks", label: "Discovery to launch" },
        { value: "−$30k", label: "Vendor cost / month" },
      ],
      href: "/work/atlas-trade",
    },
    testimonial: {
      quote:
        "We hired Codlinx for an MVP and ended up with a platform we trust enough to run our entire desk on. The team writes code the way our SREs review it.",
      name: "Priya Sharma",
      role: "VP Engineering, Atlas Trade",
      avatar:
        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=240&q=80",
    },
    signals: [
      "Core Web Vitals tracked from PR #1",
      "TypeScript strict, ESLint, Playwright on every repo",
      "Preview env per branch, infra-as-code from week one",
      "Accessibility audit (WCAG AA) before launch",
    ],
  },
  mobile: {
    heroImage:
      "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=1800&q=80",
    heroAlt: "Designer prototyping a mobile app interface in hand",
    heroBadge: "iOS · Android · React Native",
    liveLine: "Currently shipping a clinician app for Nimbus Health",
    heroStats: [
      { value: "60fps", label: "On mid-range devices" },
      { value: "Day 1", label: "Store approvals" },
      { value: "−42%", label: "Time per workflow" },
      { value: "Offline", label: "First — default" },
    ],
    gallery: [
      {
        image:
          "https://images.unsplash.com/photo-1574169208507-84376144848b?auto=format&fit=crop&w=1200&q=80",
        alt: "Mobile app design screens on a desk",
        caption: "Native polish, offline-first by default",
      },
      {
        image:
          "https://images.unsplash.com/photo-1556656793-08538906a9f8?auto=format&fit=crop&w=1200&q=80",
        alt: "Phone displaying app analytics",
        caption: "Crash-free sessions tracked release over release",
      },
      {
        image:
          "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?auto=format&fit=crop&w=1200&q=80",
        alt: "Push-notification design system on a laptop",
        caption: "Push, deep linking, and ASO bundled in",
      },
    ],
    spotlight: {
      client: "Nimbus Health",
      headline: "Charting time cut by 42% — and the pager went quiet.",
      body: "We rebuilt Nimbus's clinician app for offline-first care and conflict-free sync. Inside three months, the average chart took 42% less time and the on-call inbox dropped by half.",
      image:
        "https://images.unsplash.com/photo-1581090700227-1e37b190418e?auto=format&fit=crop&w=1600&q=80",
      imageAlt: "Clinician using a tablet at a hospital bedside",
      metrics: [
        { value: "−42%", label: "Time per chart" },
        { value: "Day 1", label: "App Store approved" },
        { value: "100%", label: "Offline parity" },
      ],
      href: "/work/nimbus-health",
    },
    testimonial: {
      quote:
        "They said the offline-first model would matter in week one and we didn't believe them. By month three it was the reason clinicians stopped opening tickets.",
      name: "Dr. Marcus Webb",
      role: "Chief Product Officer, Nimbus Health",
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=240&q=80",
    },
    signals: [
      "Native iOS (Swift / SwiftUI) and Android (Kotlin / Compose)",
      "OTA updates via EAS / CodePush — fix a bug in hours, not weeks",
      "Crash-free sessions monitored release over release",
      "Submission, screenshots, and review-response handled end-to-end",
    ],
  },
  cloud: {
    heroImage:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1800&q=80",
    heroAlt: "Server racks in a modern data center bathed in cool light",
    heroBadge: "AWS · GCP · Azure · Kubernetes",
    liveLine: "Currently re-platforming Helios Energy's IoT fleet",
    heroStats: [
      { value: "99.97%", label: "Fleet uptime delivered" },
      { value: "−38%", label: "Median cloud bill cut" },
      { value: "<15m", label: "Pager response on retainer" },
      { value: "100%", label: "IaC coverage at handoff" },
    ],
    gallery: [
      {
        image:
          "https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&w=1200&q=80",
        alt: "Engineer working in a server rack",
        caption: "Multi-region, autoscaling, capacity-planned",
      },
      {
        image:
          "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80",
        alt: "Monitoring dashboard with alerts and metrics",
        caption: "Logs, metrics, tracing — wired before launch",
      },
      {
        image:
          "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1200&q=80",
        alt: "Terraform configuration in an editor",
        caption: "Terraform + Pulumi, never click-ops",
      },
    ],
    spotlight: {
      client: "Helios Energy",
      headline: "50,000 IoT devices, one pager, and a 38% bill cut.",
      body: "Helios's legacy fleet bled cash and woke engineers up at 2am. We rebuilt the platform on EKS with Terraform, observability via Datadog + OTel, and a paved-road CI/CD that the in-house team owns today.",
      image:
        "https://images.unsplash.com/photo-1581094288338-2314dddb7ece?auto=format&fit=crop&w=1600&q=80",
      imageAlt: "IoT energy infrastructure with solar arrays at golden hour",
      metrics: [
        { value: "50K", label: "Connected devices" },
        { value: "−38%", label: "Monthly cloud spend" },
        { value: "99.97%", label: "Rolling-30d uptime" },
      ],
      href: "/work/helios-energy",
    },
    testimonial: {
      quote:
        "The cost dashboard alone paid for the engagement. Six months in, our AWS bill is down 38% and the team finally sleeps through the night.",
      name: "Elena Rossi",
      role: "Head of Platform, Helios Energy",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=240&q=80",
    },
    signals: [
      "Terraform / Pulumi from day one — no click-ops drift",
      "Datadog + OpenTelemetry traces, logs, and metrics",
      "Disaster-recovery game days run with your team",
      "SOC 2 / ISO 27001 readiness baked in",
    ],
  },
  ai: {
    heroImage:
      "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=1800&q=80",
    heroAlt: "Abstract visualization of an AI neural network",
    heroBadge: "LLMs · RAG · Evals · Guardrails",
    liveLine: "Currently building a research copilot for Northstar Labs",
    heroStats: [
      { value: "8.6", label: "Eval score (1–10) at launch" },
      { value: "−61%", label: "Cost via caching + routing" },
      { value: "100%", label: "Citations on every answer" },
      { value: "10+", label: "Models benchmarked per build" },
    ],
    gallery: [
      {
        image:
          "https://images.unsplash.com/photo-1677756119517-756a188d2d94?auto=format&fit=crop&w=1200&q=80",
        alt: "Researcher analysing LLM outputs on a laptop",
        caption: "Eval harnesses gate every deploy",
      },
      {
        image:
          "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
        alt: "Cost and latency dashboard for an AI product",
        caption: "Cost + latency visible to the whole team",
      },
      {
        image:
          "https://images.unsplash.com/photo-1633613286848-e6f43bbafb8d?auto=format&fit=crop&w=1200&q=80",
        alt: "Vector embedding plot visualizing retrieval clusters",
        caption: "Hybrid retrieval (BM25 + vector) per domain",
      },
    ],
    spotlight: {
      client: "Northstar Labs",
      headline: "A research copilot lawyers actually trust.",
      body: "Hallucinations were a non-starter for Northstar's legal team. We built citation-contracted RAG over their case library, with eval-gated rollouts and a graceful 'I don't know' fallback. Adoption hit 78% in eight weeks.",
      image:
        "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1600&q=80",
      imageAlt: "Lawyer reading documents alongside a laptop with research tools",
      metrics: [
        { value: "78%", label: "Weekly active adoption" },
        { value: "0", label: "Uncited claims shipped" },
        { value: "−61%", label: "Inference cost / query" },
      ],
      href: "/work/northstar-labs",
    },
    testimonial: {
      quote:
        "Codlinx is the rare team that talks evals before prompts. Our partners stopped second-guessing the tool because every claim links to a source they can read.",
      name: "Maya Okafor",
      role: "Head of AI, Northstar Labs",
      avatar:
        "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=240&q=80",
    },
    signals: [
      "Eval-gated deploys — no prompt change ships without a score",
      "Citation contracts: every claim links to a source",
      "Prompt caching, batching, and model routing for cost",
      "PII filters, red-teaming, and safety reviews on every build",
    ],
  },
  design: {
    heroImage:
      "https://images.unsplash.com/photo-1561070791-2526d30994b8?auto=format&fit=crop&w=1800&q=80",
    heroAlt: "Designer sketching interface flows on paper next to a laptop",
    heroBadge: "Brand · Product · Motion",
    liveLine: "Currently shipping a design system for Lumen Retail",
    heroStats: [
      { value: "WCAG AA", label: "Default accessibility floor" },
      { value: "−54%", label: "Time to ship a screen" },
      { value: "60+", label: "Components in handoff kit" },
      { value: "100%", label: "Tokens in Figma + code" },
    ],
    gallery: [
      {
        image:
          "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=1200&q=80",
        alt: "Figma file with a complete design system",
        caption: "Tokens, components, and patterns in Figma + code",
      },
      {
        image:
          "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=1200&q=80",
        alt: "Whiteboard with user flows mapped out",
        caption: "Prototypes pressure-tested with real users",
      },
      {
        image:
          "https://images.unsplash.com/photo-1559028012-481c04fa702d?auto=format&fit=crop&w=1200&q=80",
        alt: "Brand identity guidelines on a designer's monitor",
        caption: "Brand systems your team can actually apply",
      },
    ],
    spotlight: {
      client: "Lumen Retail",
      headline: "From 9-month redesigns to 9-day screens.",
      body: "Lumen's product team rebuilt their merchant tools on a Codlinx design system. Average time to ship a new screen dropped from 9 months to 9 days; the system is now in 14 separate product surfaces.",
      image:
        "https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?auto=format&fit=crop&w=1600&q=80",
      imageAlt: "Retail merchandising app shown on a tablet in a store",
      metrics: [
        { value: "9d", label: "New screen, avg." },
        { value: "14×", label: "Product surfaces using it" },
        { value: "AA", label: "WCAG compliance" },
      ],
      href: "/work/lumen-retail",
    },
    testimonial: {
      quote:
        "Their designers think like engineers and ship like product managers. We retired three internal teams' tickets just by adopting their system.",
      name: "Hana Lindqvist",
      role: "Head of Product Design, Lumen Retail",
      avatar:
        "https://images.unsplash.com/photo-1551836022-deb4988cc6c0?auto=format&fit=crop&w=240&q=80",
    },
    signals: [
      "Design system lives in Figma and your repo, with shared review",
      "WCAG 2.2 AA is the floor, not the postscript",
      "Motion specs prototyped in Framer / Rive, not faked in mocks",
      "Every screen sized against an engineering estimate before handoff",
    ],
  },
  strategy: {
    heroImage:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1800&q=80",
    heroAlt: "Cross-functional team working through a roadmap at a whiteboard",
    heroBadge: "Discovery · Roadmap · GTM",
    liveLine: "Currently running discovery with two Series A founders",
    heroStats: [
      { value: "2–6 wks", label: "Discovery engagements" },
      { value: "12+", label: "Interviews per engagement" },
      { value: "100%", label: "Estimates engineering-validated" },
      { value: "1", label: "Shippable roadmap, not a deck" },
    ],
    gallery: [
      {
        image:
          "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1200&q=80",
        alt: "Stakeholder workshop with sticky notes on a wall",
        caption: "Stakeholder + user interviews, written up the same day",
      },
      {
        image:
          "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1200&q=80",
        alt: "Roadmap document on a laptop screen",
        caption: "Phased scope with sizes, dependencies, sequencing",
      },
      {
        image:
          "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1200&q=80",
        alt: "Board members reviewing a strategy document",
        caption: "Plan pressure-tested with engineering and finance",
      },
    ],
    spotlight: {
      client: "Cobalt Robotics",
      headline: "A discovery sprint that killed two features and saved the launch.",
      body: "Cobalt was three months from a launch with a roadmap nobody believed in. We ran a four-week discovery, killed two features, resequenced the rest, and shipped on time with the team intact.",
      image:
        "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1600&q=80",
      imageAlt: "Founders discussing a roadmap during a strategy session",
      metrics: [
        { value: "4 wks", label: "Discovery duration" },
        { value: "−2", label: "Features killed" },
        { value: "On time", label: "Launch sequencing" },
      ],
      href: "/work/cobalt-robotics",
    },
    testimonial: {
      quote:
        "Most strategy decks are wallpaper. Codlinx gave us a sequenced plan with engineering estimates and an honest list of what to drop. We shipped because of it.",
      name: "Daniel Park",
      role: "CEO, Cobalt Robotics",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=240&q=80",
    },
    signals: [
      "Stakeholder + user interviews, written up the same day",
      "Engineering-validated estimates — we won't promise what we can't ship",
      "Pricing, positioning, and GTM live in the same plan",
      "Pitch-ready summary deck for board / investor conversations",
    ],
  },
  "graphic-design": {
    heroImage:
      "https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=1800&q=80",
    heroAlt: "Designer arranging brand color swatches and type specimens",
    heroBadge: "Brand · Social · Ad creative",
    liveLine: "Currently refreshing the brand system for Lumen Retail",
    heroStats: [
      { value: "48h", label: "Typical turnaround" },
      { value: "Source", label: "Files always handed over" },
      { value: "2 rounds", label: "Revisions per asset" },
      { value: "∞", label: "On retainer" },
    ],
    gallery: [
      {
        image:
          "https://images.unsplash.com/photo-1572044162444-ad60f128bdea?auto=format&fit=crop&w=1200&q=80",
        alt: "Brand identity mockups laid out on a desk",
        caption: "Identity systems built to flex across every surface",
      },
      {
        image:
          "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?auto=format&fit=crop&w=1200&q=80",
        alt: "Social media post templates on a screen",
        caption: "Templated so the brand stays consistent at speed",
      },
      {
        image:
          "https://images.unsplash.com/photo-1626785774625-0b1c2c4eab67?auto=format&fit=crop&w=1200&q=80",
        alt: "Color palette and typography specimen sheet",
        caption: "Tokens, type, and color — documented, not improvised",
      },
    ],
    spotlight: {
      client: "Lumen Retail",
      headline: "One brand system, every channel finally on the same page.",
      body: "We rebuilt Lumen's identity into a token-driven system with social, ad, and print templates. Their team now ships on-brand creative in hours instead of waiting days on an agency queue.",
      image:
        "https://images.unsplash.com/photo-1634942537034-2531766767d1?auto=format&fit=crop&w=1600&q=80",
      imageAlt: "Brand guideline document with logo and color usage",
      metrics: [
        { value: "48h", label: "Creative turnaround" },
        { value: "1 system", label: "Across every channel" },
        { value: "100%", label: "On-brand output" },
      ],
      href: "/contact",
    },
    testimonial: {
      quote:
        "We used to wait days for a single banner. Codlinx handed us a system and source files — now our own team ships on-brand creative the same afternoon.",
      name: "Hannah Cole",
      role: "Marketing Lead, Lumen Retail",
      avatar:
        "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=240&q=80",
    },
    signals: [
      "Editable source files handed over with every project",
      "Token-driven systems, not one-off graphics",
      "Templates so your team can ship without us",
      "Motion and animated assets when the format calls for it",
    ],
  },
  seo: {
    heroImage:
      "https://images.unsplash.com/photo-1571677208775-dc0c2fa8c1c1?auto=format&fit=crop&w=1800&q=80",
    heroAlt: "Analytics dashboard showing organic search growth",
    heroBadge: "Technical · Content · Authority",
    liveLine: "Currently growing organic pipeline for Halcyon Pay",
    heroStats: [
      { value: "90+", label: "Lighthouse SEO targeted" },
      { value: "3–6mo", label: "To ranking lift" },
      { value: "Monthly", label: "Transparent reporting" },
      { value: "Intent", label: "Keywords that convert" },
    ],
    gallery: [
      {
        image:
          "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=1200&q=80",
        alt: "Team reviewing keyword research on a screen",
        caption: "Keywords mapped to buyer intent, not just volume",
      },
      {
        image:
          "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
        alt: "Search traffic analytics trending upward",
        caption: "Traffic that compounds month over month",
      },
      {
        image:
          "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
        alt: "Reporting dashboard with ranking metrics",
        caption: "Rankings, traffic, and conversions reported monthly",
      },
    ],
    spotlight: {
      client: "Halcyon Pay",
      headline: "Organic became the cheapest channel they have.",
      body: "We fixed Halcyon's technical foundation, rebuilt their content around buyer intent, and earned the links to back it. Within two quarters organic was driving more qualified demos than paid — at a fraction of the cost.",
      image:
        "https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?auto=format&fit=crop&w=1600&q=80",
      imageAlt: "Marketing team analyzing growth charts",
      metrics: [
        { value: "2 qtrs", label: "To channel parity" },
        { value: "Intent", label: "Content strategy" },
        { value: "Lower", label: "Cost per demo" },
      ],
      href: "/contact",
    },
    testimonial: {
      quote:
        "Codlinx treated SEO like engineering — fix the foundation, measure everything, compound. Two quarters in, organic out-converts the paid budget we were burning.",
      name: "Tom Reyes",
      role: "Head of Growth, Halcyon Pay",
      avatar:
        "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=240&q=80",
    },
    signals: [
      "Technical audit and Core Web Vitals fixed first",
      "Keywords mapped to intent, not vanity volume",
      "Content briefs and writing in scope",
      "Monthly reporting on rankings, traffic, and conversions",
    ],
  },
  "social-media": {
    heroImage:
      "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&w=1800&q=80",
    heroAlt: "Phone showing a curated brand social feed",
    heroBadge: "Content · Community · Growth",
    liveLine: "Currently running social for Vega Mobility",
    heroStats: [
      { value: "12–20", label: "Posts / month" },
      { value: "Daily", label: "Community mgmt" },
      { value: "On-brand", label: "Every asset" },
      { value: "Monthly", label: "Growth reporting" },
    ],
    gallery: [
      {
        image:
          "https://images.unsplash.com/photo-1611162618071-b39a2ec055fb?auto=format&fit=crop&w=1200&q=80",
        alt: "Social media content calendar on a screen",
        caption: "A month planned and designed before it goes live",
      },
      {
        image:
          "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1200&q=80",
        alt: "Team planning social content together",
        caption: "Voice, pillars, and formats decided up front",
      },
      {
        image:
          "https://images.unsplash.com/photo-1611926653458-09294b3142bf?auto=format&fit=crop&w=1200&q=80",
        alt: "Engagement analytics on a phone",
        caption: "Reach and engagement reviewed every month",
      },
    ],
    spotlight: {
      client: "Vega Mobility",
      headline: "Consistent posting turned a quiet feed into a community.",
      body: "We took over Vega's channels end to end — calendar, creative, and community. Six months of consistency turned a dormant feed into their second-largest source of inbound interest.",
      image:
        "https://images.unsplash.com/photo-1556745757-8d76bdb6984b?auto=format&fit=crop&w=1600&q=80",
      imageAlt: "Person engaging with a brand on a phone",
      metrics: [
        { value: "6 mo", label: "To real momentum" },
        { value: "#2", label: "Inbound source" },
        { value: "Daily", label: "Community presence" },
      ],
      href: "/contact",
    },
    testimonial: {
      quote:
        "We always knew social mattered and never had time for it. Codlinx just runs it — the feed looks like us, grows every month, and we barely lift a finger.",
      name: "Aisha Khan",
      role: "Founder, Vega Mobility",
      avatar:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=240&q=80",
    },
    signals: [
      "Monthly calendar approved before anything goes live",
      "On-brand creative for every post and story",
      "Daily community management and DM responses",
      "Growth reported monthly — we double down on what works",
    ],
  },
  "social-media-marketing": {
    heroImage:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1800&q=80",
    heroAlt: "Paid social campaign dashboard with performance metrics",
    heroBadge: "Meta · TikTok · LinkedIn",
    liveLine: "Currently scaling paid social for Cobalt Robotics",
    heroStats: [
      { value: "ROAS", label: "The metric we optimize" },
      { value: "Weekly", label: "Creative iteration" },
      { value: "Full-funnel", label: "Awareness → convert" },
      { value: "Live", label: "ROAS dashboard" },
    ],
    gallery: [
      {
        image:
          "https://images.unsplash.com/photo-1611162616475-46b635cb6868?auto=format&fit=crop&w=1200&q=80",
        alt: "Ad campaign creative variations on a screen",
        caption: "Relentless creative testing — kill losers, scale winners",
      },
      {
        image:
          "https://images.unsplash.com/photo-1543286386-713bdd548da4?auto=format&fit=crop&w=1200&q=80",
        alt: "Conversion tracking setup on a laptop",
        caption: "Clean conversion tracking before a dollar is spent",
      },
      {
        image:
          "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
        alt: "ROAS reporting dashboard with charts",
        caption: "Spend, CPA, and ROAS reported every week",
      },
    ],
    spotlight: {
      client: "Cobalt Robotics",
      headline: "Spend tripled — because the return held at every step.",
      body: "We rebuilt Cobalt's tracking, restructured their Meta and Google accounts, and ran a tight creative testing loop. With ROAS holding, we scaled spend 3× without the cost per lead drifting.",
      image:
        "https://images.unsplash.com/photo-1556155092-490a1ba16284?auto=format&fit=crop&w=1600&q=80",
      imageAlt: "Marketing team reviewing campaign performance",
      metrics: [
        { value: "3×", label: "Spend scaled" },
        { value: "Held", label: "Cost per lead" },
        { value: "Weekly", label: "Optimization loop" },
      ],
      href: "/contact",
    },
    testimonial: {
      quote:
        "Every other agency wanted more budget. Codlinx wanted cleaner tracking and better creative — then scaled us 3× without the cost per lead moving. That's the difference.",
      name: "Daniel Park",
      role: "CEO, Cobalt Robotics",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=240&q=80",
    },
    signals: [
      "Conversion tracking wired up before launch",
      "Structured testing across audiences and creative",
      "Weekly bid, budget, and creative iteration",
      "Live ROAS dashboard — no vanity metrics",
    ],
  },
};

const TECH_COLORS: Record<string, string> = {
  "Next.js": "#000000",
  React: "#06B6D4",
  TypeScript: "#3B82F6",
  Postgres: "#3B82F6",
  Prisma: "#6366F1",
  tRPC: "#6366F1",
  Vercel: "#000000",
  Playwright: "#10B981",
  "React Native": "#06B6D4",
  Expo: "#000000",
  Swift: "#F97316",
  Kotlin: "#8B5CF6",
  Firebase: "#FBBF24",
  Sentry: "#7C3AED",
  Amplitude: "#3B82F6",
  AWS: "#F97316",
  GCP: "#3B82F6",
  Kubernetes: "#3B82F6",
  Terraform: "#8B5CF6",
  Datadog: "#7C3AED",
  "GitHub Actions": "#000000",
  Pulumi: "#8B5CF6",
  Anthropic: "#D97757",
  OpenAI: "#10B981",
  pgvector: "#3B82F6",
  LangChain: "#10B981",
  PyTorch: "#F97316",
  Modal: "#6366F1",
  Ragas: "#8B5CF6",
  Figma: "#F43F5E",
  Framer: "#3B82F6",
  Storybook: "#EC4899",
  Motion: "#7C3AED",
  Rive: "#10B981",
  Research: "#3B82F6",
  Roadmapping: "#10B981",
  Workshops: "#F59E0B",
  Estimates: "#8B5CF6",
  GTM: "#EF4444",
};

export const dynamicParams = false;

export function generateStaticParams() {
  return SERVICES_CONTENT.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return { title: "Service" };
  return {
    title: service.label,
    description: service.description,
    alternates: { canonical: `/services/${service.slug}` },
  };
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  const media = SERVICE_MEDIA[service.slug];
  const others = SERVICES_CONTENT.filter((s) => s.slug !== service.slug);

  return (
    <>
      <CursorGlow />

      <PageHero
        eyebrow={`${service.number} · Service`}
        title={service.label}
        highlight={service.tagline}
        description={service.description}
        backHref="/services"
        backLabel="All services"
        stats={media.heroStats}
      >
        <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-xs font-medium text-white/65">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-white/75 backdrop-blur-md">
            <span
              className="h-1.5 w-1.5 rounded-full"
              style={{ backgroundColor: ACCENT }}
            />
            {media.heroBadge}
          </span>
          <span className="flex items-center gap-2">
            <span className="relative inline-flex h-2 w-2">
              <span
                className="codlinx-pulse-ring absolute inset-0 rounded-full"
                style={{ backgroundColor: ACCENT }}
              />
              <span
                className="relative inline-flex h-2 w-2 rounded-full"
                style={{ backgroundColor: ACCENT }}
              />
            </span>
            {media.liveLine}
          </span>
        </div>
      </PageHero>

      <HeroVisualBand service={service} media={media} />
      <OverviewBand service={service} media={media} />
      <DeliverablesGrid service={service} />
      <StackBand service={service} />
      <ProcessSection service={service} />
      <SpotlightCase media={media} />
      <SignalsBand media={media} />
      <ServiceTestimonial media={media} />
      <FAQBand service={service} />
      <OtherServices others={others} />

      <ClosingCTA
        eyebrow={`Ready for ${service.label.toLowerCase()}?`}
        title="Tell us about your project."
        body="A scoped plan, a senior team, and a price — inside 24 hours."
        primary={{ label: "Start a project", href: "/contact" }}
        secondary={{ label: "See case studies", href: "/work" }}
      />
    </>
  );
}

function HeroVisualBand({
  service,
  media,
}: {
  service: ReturnType<typeof getServiceBySlug> & object;
  media: ServiceMedia;
}) {
  return (
    <section className="relative -mt-8 bg-black pb-20 sm:-mt-12 sm:pb-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <div className="group relative overflow-hidden rounded-3xl border border-white/[0.08] shadow-[0_30px_80px_-40px_rgba(0,0,0,0.7)]">
            <Image
              src={media.heroImage}
              alt={media.heroAlt}
              width={1800}
              height={1000}
              priority
              className="h-[320px] w-full object-cover transition-transform duration-[1500ms] ease-out group-hover:scale-[1.04] sm:h-[460px]"
              sizes="(min-width: 1024px) 1100px, 100vw"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "linear-gradient(180deg, rgba(0,0,0,0.05) 30%, rgba(0,0,0,0.7) 100%)",
              }}
            />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
              style={{
                background: `radial-gradient(circle at 25% 30%, ${ACCENT}33, transparent 55%)`,
              }}
            />
            <div className="absolute inset-x-0 bottom-0 flex flex-col gap-4 p-6 sm:flex-row sm:items-end sm:justify-between sm:p-10">
              <div>
                <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/65">
                  {service.number} · {service.label}
                </div>
                <p className="mt-2 max-w-xl text-balance text-2xl font-semibold leading-snug tracking-tight text-white sm:text-3xl">
                  {service.tagline}
                </p>
              </div>
              <div className="flex items-center gap-3 rounded-2xl border border-white/15 bg-black/45 px-4 py-3 backdrop-blur-md">
                <span className="grid h-9 w-9 place-items-center rounded-xl bg-white/10 text-white">
                  <svg
                    viewBox="0 0 24 24"
                    className="h-4 w-4"
                    style={{ color: ACCENT }}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden
                  >
                    <path d="M12 3v18M3 12h18" />
                  </svg>
                </span>
                <div>
                  <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/55">
                    Engagement
                  </div>
                  <div className="text-sm font-semibold text-white">
                    {service.duration} · {service.engagement}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function OverviewBand({
  service,
  media,
}: {
  service: ReturnType<typeof getServiceBySlug> & object;
  media: ServiceMedia;
}) {
  return (
    <section className="bg-[#FAFAF7] py-20 text-zinc-900 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
          <Reveal direction="left">
            <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-zinc-500">
              Overview
            </span>
            <p className="mt-4 max-w-xl text-balance text-2xl font-semibold leading-snug tracking-tight text-zinc-900 sm:text-[28px]">
              {service.intro}
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Magnetic>
                <Link
                  href="/contact"
                  className="group inline-flex h-12 items-center gap-2 rounded-full bg-zinc-900 px-5 text-sm font-semibold text-white transition-transform duration-300 hover:bg-black"
                >
                  <span className="magnetic-inner inline-flex items-center gap-2">
                    Start a project
                    <span
                      className="grid h-7 w-7 place-items-center rounded-full"
                      style={{ backgroundColor: ACCENT }}
                    >
                      <svg
                        viewBox="0 0 16 16"
                        className="h-3 w-3 text-black"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden
                      >
                        <path d="M3 8h10M9 4l4 4-4 4" />
                      </svg>
                    </span>
                  </span>
                </Link>
              </Magnetic>
              <Link
                href="/work/case-studies"
                className="inline-flex h-12 items-center gap-2 rounded-full border border-zinc-900/10 bg-white px-5 text-sm font-semibold text-zinc-800 transition-colors hover:border-zinc-900/30"
              >
                Read case studies
              </Link>
            </div>
          </Reveal>

          <Reveal direction="right" delay={100}>
            <div className="grid grid-cols-2 gap-4">
              {media.gallery.slice(0, 3).map((g, i) => (
                <div
                  key={g.image}
                  className={[
                    "group relative overflow-hidden rounded-2xl border border-zinc-900/[0.06] shadow-[0_18px_45px_-32px_rgba(0,0,0,0.3)]",
                    i === 0 ? "col-span-2 h-56 sm:h-64" : "h-40 sm:h-44",
                  ].join(" ")}
                >
                  <Image
                    src={g.image}
                    alt={g.alt}
                    width={1200}
                    height={800}
                    className="h-full w-full object-cover transition-transform duration-[1100ms] ease-out group-hover:scale-[1.08]"
                    sizes="(min-width: 1024px) 480px, 100vw"
                  />
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(180deg, rgba(0,0,0,0) 40%, rgba(0,0,0,0.55) 100%)",
                    }}
                  />
                  <div className="absolute inset-x-0 bottom-0 p-3 text-[11px] font-medium text-white/90 sm:text-xs">
                    {g.caption}
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function DeliverablesGrid({
  service,
}: {
  service: ReturnType<typeof getServiceBySlug> & object;
}) {
  return (
    <section className="bg-white py-20 text-zinc-900 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <div className="flex flex-col items-start gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-zinc-900/10 bg-[#FAFAF7] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-zinc-700">
                <span
                  className="h-1.5 w-1.5 rounded-full"
                  style={{ backgroundColor: ACCENT }}
                />
                What we deliver
              </span>
              <h2 className="mt-5 max-w-2xl text-balance text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl">
                Exactly what lands in your repo.
              </h2>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-zinc-600">
              No mystery deliverables. Here&apos;s the shipping inventory you get at the end of an engagement.
            </p>
          </div>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {service.deliverables.map((d, idx) => (
            <Reveal key={d} delay={(idx % 6) * 70}>
              <div className="group relative h-full overflow-hidden rounded-2xl border border-zinc-900/[0.06] bg-[#FAFAF7] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-zinc-900/15 hover:bg-white hover:shadow-[0_18px_40px_-26px_rgba(0,0,0,0.22)]">
                <div
                  aria-hidden
                  className="pointer-events-none absolute -inset-x-12 -top-12 h-32 -skew-x-12 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
                  style={{
                    background:
                      "linear-gradient(90deg, transparent, rgba(63,201,180,0.18), transparent)",
                  }}
                />
                <div className="relative flex items-start gap-3">
                  <span
                    className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-xl text-black transition-transform duration-300 group-hover:rotate-[-4deg] group-hover:scale-110"
                    style={{ backgroundColor: ACCENT }}
                  >
                    <svg
                      viewBox="0 0 16 16"
                      className="h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden
                    >
                      <path d="M3 8.5l3 3 7-7" />
                    </svg>
                  </span>
                  <p className="text-[15px] font-medium leading-snug text-zinc-800">
                    {d}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function StackBand({
  service,
}: {
  service: ReturnType<typeof getServiceBySlug> & object;
}) {
  return (
    <section className="bg-[#FAFAF7] py-20 text-zinc-900 sm:py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <div className="flex flex-col items-start gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-zinc-900/10 bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-zinc-700">
                <span
                  className="h-1.5 w-1.5 rounded-full"
                  style={{ backgroundColor: ACCENT }}
                />
                Stack &amp; tools
              </span>
              <h2 className="mt-5 max-w-2xl text-balance text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
                The stack we reach for first.
              </h2>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-zinc-600">
              Opinionated, never religious — we&apos;ll meet your existing stack if it&apos;s a good fit.
            </p>
          </div>
        </Reveal>

        <Reveal delay={100}>
          <div className="mt-10">
            <Marquee gapClass="gap-3 sm:gap-4">
              {service.stack.map((tech) => (
                <span
                  key={tech}
                  className="inline-flex shrink-0 items-center gap-2 rounded-full border border-zinc-900/[0.08] bg-white px-4 py-2 text-sm font-medium text-zinc-800 shadow-[0_3px_10px_-4px_rgba(0,0,0,0.1)]"
                >
                  <span
                    className="h-1.5 w-1.5 rounded-full"
                    style={{
                      backgroundColor: TECH_COLORS[tech] ?? ACCENT,
                    }}
                  />
                  {tech}
                </span>
              ))}
            </Marquee>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function ProcessSection({
  service,
}: {
  service: ReturnType<typeof getServiceBySlug> & object;
}) {
  return (
    <section className="relative isolate overflow-hidden bg-black py-20 text-white sm:py-28">
      <div
        aria-hidden
        className="codlinx-float-orb absolute left-[10%] top-1/3 -z-10 h-[420px] w-[420px] rounded-full opacity-[0.16] blur-[140px]"
        style={{ backgroundColor: ACCENT }}
      />
      <div
        aria-hidden
        className="codlinx-float-orb absolute right-[6%] top-1/2 -z-10 h-[340px] w-[340px] rounded-full opacity-[0.10] blur-[140px]"
        style={{
          backgroundColor: "#6366F1",
          animationDelay: "-9s",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage:
            "radial-gradient(ellipse 70% 70% at 50% 50%, black 30%, transparent 80%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 70% 70% at 50% 50%, black 30%, transparent 80%)",
        }}
      />
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] text-white/70 backdrop-blur-md">
            <span
              className="h-1 w-1 rounded-full"
              style={{ backgroundColor: ACCENT }}
            />
            How we ship
          </span>
          <h2 className="mt-5 max-w-3xl text-balance text-3xl font-semibold leading-[1.1] tracking-tight sm:text-4xl lg:text-5xl">
            A predictable four-step rhythm.
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/65">
            Friday demos, weekly to staging, and the senior team you met in sales — start to finish.
          </p>
        </Reveal>

        <ol className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
          {service.process.map((p, idx) => (
            <Reveal key={p.step} delay={idx * 100}>
              <li className="group relative h-full overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-white/[0.16] hover:bg-white/[0.04]">
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{
                    background: `radial-gradient(circle at 50% 0%, ${ACCENT}22, transparent 70%)`,
                  }}
                />
                <div className="relative flex items-center gap-3">
                  <span
                    className="grid h-10 w-10 place-items-center rounded-xl text-sm font-bold text-black transition-transform duration-300 group-hover:scale-110 group-hover:rotate-[-4deg]"
                    style={{ backgroundColor: ACCENT }}
                  >
                    {p.step}
                  </span>
                  <span
                    aria-hidden
                    className="h-px flex-1 origin-left scale-x-0 bg-gradient-to-r from-white/40 to-transparent transition-transform duration-500 group-hover:scale-x-100"
                  />
                </div>
                <h3 className="relative mt-5 text-lg font-semibold tracking-tight">
                  {p.title}
                </h3>
                <p className="relative mt-2 text-sm leading-relaxed text-white/65">
                  {p.body}
                </p>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

function SpotlightCase({ media }: { media: ServiceMedia }) {
  return (
    <section className="bg-[#FAFAF7] py-20 text-zinc-900 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <div className="flex flex-col items-start gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-zinc-900/10 bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-zinc-700">
                <span
                  className="h-1.5 w-1.5 rounded-full"
                  style={{ backgroundColor: ACCENT }}
                />
                Spotlight case
              </span>
              <h2 className="mt-5 max-w-2xl text-balance text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl">
                {media.spotlight.headline}
              </h2>
            </div>
            <Link
              href={media.spotlight.href}
              className="group inline-flex items-center gap-1.5 text-sm font-semibold text-zinc-900 hover:opacity-80"
            >
              Read the full case study
              <svg
                viewBox="0 0 16 16"
                className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden
              >
                <path d="M3 8h10M9 4l4 4-4 4" />
              </svg>
            </Link>
          </div>
        </Reveal>

        <Reveal delay={100}>
          <div className="mt-12 overflow-hidden rounded-3xl border border-zinc-900/[0.06] bg-white shadow-[0_24px_70px_-40px_rgba(0,0,0,0.25)]">
            <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr]">
              <div className="group relative h-[300px] overflow-hidden sm:h-[380px] lg:h-auto">
                <Image
                  src={media.spotlight.image}
                  alt={media.spotlight.imageAlt}
                  width={1600}
                  height={1200}
                  className="h-full w-full object-cover transition-transform duration-[1300ms] ease-out group-hover:scale-[1.05]"
                  sizes="(min-width: 1024px) 600px, 100vw"
                />
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(0,0,0,0) 40%, rgba(0,0,0,0.5) 100%)",
                  }}
                />
                <div className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/40 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/90 backdrop-blur-md">
                  <span
                    className="h-1.5 w-1.5 rounded-full"
                    style={{ backgroundColor: ACCENT }}
                  />
                  {media.spotlight.client}
                </div>
              </div>
              <div className="flex flex-col justify-between gap-8 p-7 sm:p-10">
                <p className="text-base leading-relaxed text-zinc-700">
                  {media.spotlight.body}
                </p>
                <dl className="grid grid-cols-3 gap-px overflow-hidden rounded-2xl border border-zinc-900/[0.06] bg-zinc-900/[0.04]">
                  {media.spotlight.metrics.map((m, i) => (
                    <div key={m.label} className="bg-white px-4 py-5 text-center">
                      <dd
                        className="text-2xl font-semibold tracking-tight sm:text-3xl"
                        style={{ color: ACCENT }}
                      >
                        <Counter value={m.value} delay={i * 120} />
                      </dd>
                      <dt className="mt-1 text-[10px] font-medium uppercase tracking-[0.18em] text-zinc-500">
                        {m.label}
                      </dt>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function SignalsBand({ media }: { media: ServiceMedia }) {
  return (
    <section className="bg-white py-20 text-zinc-900 sm:py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          <Reveal direction="left">
            <span className="inline-flex items-center gap-2 rounded-full border border-zinc-900/10 bg-[#FAFAF7] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-zinc-700">
              <span
                className="h-1.5 w-1.5 rounded-full"
                style={{ backgroundColor: ACCENT }}
              />
              How we work
            </span>
            <h2 className="mt-5 text-balance text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
              The signals you can hold us to.
            </h2>
            <p className="mt-5 max-w-md text-base leading-relaxed text-zinc-600">
              We earn trust by making it cheap to verify our work — in your tools, on your calendar, in your repo.
            </p>
          </Reveal>

          <Reveal direction="right" delay={100}>
            <ul className="flex flex-col gap-3">
              {media.signals.map((s, idx) => (
                <li
                  key={s}
                  className="group relative overflow-hidden rounded-2xl border border-zinc-900/[0.06] bg-[#FAFAF7] p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-zinc-900/15 hover:bg-white hover:shadow-[0_18px_40px_-28px_rgba(0,0,0,0.2)]"
                  style={{ transitionDelay: `${idx * 30}ms` }}
                >
                  <div
                    aria-hidden
                    className="pointer-events-none absolute -inset-x-10 -top-10 h-32 -skew-x-12 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
                    style={{
                      background:
                        "linear-gradient(90deg, transparent, rgba(63,201,180,0.18), transparent)",
                    }}
                  />
                  <div className="relative flex items-center gap-3">
                    <span
                      className="grid h-8 w-8 shrink-0 place-items-center rounded-lg text-black transition-transform duration-300 group-hover:rotate-[-4deg]"
                      style={{ backgroundColor: ACCENT }}
                    >
                      <svg
                        viewBox="0 0 16 16"
                        className="h-3.5 w-3.5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden
                      >
                        <path d="M3 8.5l3 3 7-7" />
                      </svg>
                    </span>
                    <span className="text-[15px] font-medium text-zinc-800">
                      {s}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function ServiceTestimonial({ media }: { media: ServiceMedia }) {
  return (
    <section className="bg-[#FAFAF7] py-20 sm:py-28">
      <div className="mx-auto max-w-4xl px-5 sm:px-8">
        <Reveal>
          <Tilt
            max={4}
            scale={1.005}
            glare={false}
            className="relative overflow-hidden rounded-3xl border border-zinc-900/[0.06] bg-white p-8 shadow-[0_28px_70px_-40px_rgba(0,0,0,0.25)] sm:p-12"
          >
            <div
              aria-hidden
              className="absolute -right-24 -top-24 h-64 w-64 rounded-full opacity-[0.16] blur-3xl"
              style={{ backgroundColor: ACCENT }}
            />
            <svg
              viewBox="0 0 24 24"
              className="relative h-10 w-10"
              style={{ color: ACCENT }}
              fill="currentColor"
              aria-hidden
            >
              <path d="M7 7h4v4H8.5c0 2.2 1 3 3 3v3c-4 0-6-2-6-6V7zm9 0h4v4h-2.5c0 2.2 1 3 3 3v3c-4 0-6-2-6-6V7z" />
            </svg>
            <blockquote className="relative mt-5 text-balance text-2xl font-semibold leading-snug tracking-tight text-zinc-900 sm:text-[26px]">
              &ldquo;{media.testimonial.quote}&rdquo;
            </blockquote>
            <figcaption className="relative mt-8 flex items-center gap-4">
              <div className="relative h-14 w-14 shrink-0">
                <span
                  aria-hidden
                  className="absolute -inset-1 rounded-full opacity-30 blur-md"
                  style={{ backgroundColor: ACCENT }}
                />
                <Image
                  src={media.testimonial.avatar}
                  alt={media.testimonial.name}
                  width={64}
                  height={64}
                  className="relative h-14 w-14 rounded-full object-cover ring-2 ring-white"
                />
              </div>
              <div>
                <div className="text-base font-semibold text-zinc-900">
                  {media.testimonial.name}
                </div>
                <div className="text-sm text-zinc-500">
                  {media.testimonial.role}
                </div>
              </div>
            </figcaption>
          </Tilt>
        </Reveal>
      </div>
    </section>
  );
}

function FAQBand({
  service,
}: {
  service: ReturnType<typeof getServiceBySlug> & object;
}) {
  return (
    <section className="bg-white py-20 text-zinc-900 sm:py-28">
      <div className="mx-auto max-w-3xl px-5 sm:px-8">
        <Reveal>
          <span className="inline-flex items-center gap-2 rounded-full border border-zinc-900/10 bg-[#FAFAF7] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-zinc-700">
            <span
              className="h-1.5 w-1.5 rounded-full"
              style={{ backgroundColor: ACCENT }}
            />
            FAQ
          </span>
          <h2 className="mt-5 text-balance text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
            Common questions about {service.label.toLowerCase()}.
          </h2>
        </Reveal>
        <dl className="mt-10 divide-y divide-zinc-200">
          {service.faqs.map((f, idx) => (
            <Reveal key={f.q} delay={idx * 60}>
              <details className="group py-5 [&[open]_summary_svg]:rotate-180">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6">
                  <dt className="text-lg font-semibold tracking-tight transition-colors duration-200 group-hover:text-zinc-700">
                    {f.q}
                  </dt>
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[#FAFAF7] shadow-[0_2px_8px_-3px_rgba(0,0,0,0.12)] transition-transform duration-300 group-hover:scale-110">
                    <svg
                      viewBox="0 0 20 20"
                      className="h-3.5 w-3.5 text-zinc-600 transition-transform duration-300"
                      fill="currentColor"
                      aria-hidden
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 11.06l3.71-3.83a.75.75 0 1 1 1.08 1.04l-4.25 4.39a.75.75 0 0 1-1.08 0L5.21 8.27a.75.75 0 0 1 .02-1.06Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                </summary>
                <dd className="mt-3 max-w-2xl text-base leading-relaxed text-zinc-600">
                  {f.a}
                </dd>
              </details>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}

function OtherServices({
  others,
}: {
  others: typeof SERVICES_CONTENT;
}) {
  return (
    <section className="bg-[#FAFAF7] pb-20 pt-20 text-zinc-900 sm:pb-28 sm:pt-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <div className="flex flex-col items-start gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-zinc-500">
                Other services
              </div>
              <h2 className="mt-3 text-balance text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
                Most engagements run two or three in parallel.
              </h2>
            </div>
            <Link
              href="/services"
              className="group inline-flex items-center gap-1.5 text-sm font-semibold text-zinc-900 hover:opacity-80"
            >
              All services
              <svg
                viewBox="0 0 16 16"
                className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden
              >
                <path d="M3 8h10M9 4l4 4-4 4" />
              </svg>
            </Link>
          </div>
        </Reveal>

        <ul className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {others.map((o, idx) => (
            <Reveal key={o.slug} delay={(idx % 6) * 70}>
              <li>
                <Link
                  href={`/services/${o.slug}`}
                  className="group flex h-full items-center justify-between rounded-2xl border border-zinc-900/[0.06] bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_-26px_rgba(0,0,0,0.2)]"
                >
                  <div>
                    <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-zinc-500">
                      {o.number}
                    </div>
                    <div className="mt-1 text-base font-semibold tracking-tight">
                      {o.label}
                    </div>
                    <div className="mt-2 text-xs text-zinc-500">
                      {o.duration} · {o.engagement}
                    </div>
                  </div>
                  <span
                    className="grid h-9 w-9 place-items-center rounded-full bg-[#FAFAF7] text-zinc-700 transition-all duration-300 group-hover:translate-x-0.5"
                    style={{ color: ACCENT }}
                  >
                    <svg
                      viewBox="0 0 16 16"
                      className="h-3.5 w-3.5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden
                    >
                      <path d="M3 8h10M9 4l4 4-4 4" />
                    </svg>
                  </span>
                </Link>
              </li>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
