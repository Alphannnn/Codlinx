import type { ReactNode } from "react";
import LiveSitePreview from "../components/LiveSitePreview";

export const ACCENT = "#3FC9B4";

export type Project = {
  slug: string;
  client: string;
  industry: string;
  year: string;
  title: string;
  blurb: string;
  summary: string;
  url: string;
  metric: { value: string; label: string };
  tags: string[];
  hue: string;
  swatch: string;
  visual?: ReactNode;
  challenge: string;
  approach: string[];
  outcome: { value: string; label: string }[];
  heroImage: string;
  heroAlt: string;
  gallery: { image: string; alt: string; caption: string }[];
  testimonial: {
    quote: string;
    name: string;
    role: string;
    avatar: string;
  };
  services: string[];
  duration: string;
  team: string;
  location: string;
};

type Seed = Omit<Project, "visual"> & { swatch: string; hue: string };

const SEEDS: Seed[] = [
  {
    slug: "flote",
    client: "Flote",
    industry: "Marketing Automation",
    year: "2024",
    url: "https://flotelab.com/",
    title: "A workflow engine for modern marketing teams.",
    blurb:
      "Full-stack delivery on Flote Lab — a marketing automation platform that turns multi-channel campaigns into a single, observable workflow.",
    summary:
      "We led full-stack development on Flote, building campaign workflows, integrations, and the dashboards marketers actually open every morning. Cross-functional collaboration shaped the product from API contracts to UI states.",
    metric: { value: "Live", label: "In production" },
    tags: ["Next.js", "Node.js", "Postgres", "Automation"],
    hue: "rgba(139,92,246,0.22)",
    swatch: "#8B5CF6",
    heroImage:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1800&q=80",
    heroAlt: "Marketing analytics dashboards on a wide monitor",
    gallery: [
      {
        image:
          "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
        alt: "Campaign analytics dashboard on a laptop",
        caption: "Campaign analytics surfaced in one operational view",
      },
      {
        image:
          "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?auto=format&fit=crop&w=1200&q=80",
        alt: "Marketing team reviewing automation workflows",
        caption: "Automation workflows replacing spreadsheets and ad-hoc scripts",
      },
      {
        image:
          "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1200&q=80",
        alt: "Strategy session at a workshop table",
        caption: "Strategy synced weekly with the in-house product team",
      },
    ],
    testimonial: {
      quote:
        "We led full-stack delivery on Flote, partnering with product, design, and growth to ship integrations, workflow primitives, and reporting that marketers rely on day-to-day.",
      name: "Codlinx Engineering",
      role: "Engagement note · Flote",
      avatar:
        "https://images.unsplash.com/photo-1521119989659-a83eee488004?auto=format&fit=crop&w=240&q=80",
    },
    challenge:
      "Flote needed to translate scattered marketing tactics into repeatable automated workflows — without sacrificing the flexibility growth teams expect.",
    approach: [
      "Mapped the marketing workflow surface end-to-end with the product team.",
      "Built core automation primitives and event-driven triggers in Node.",
      "Shipped a Next.js dashboard with campaign analytics and audit history.",
      "Wired third-party integrations behind a unified connector layer.",
    ],
    outcome: [
      { value: "Live", label: "Shipped to production" },
      { value: "Full-stack", label: "Delivery scope" },
      { value: "2024", label: "Engagement year" },
    ],
    services: ["Web", "Cloud", "Strategy"],
    duration: "Multi-quarter",
    team: "Full-stack pod",
    location: "Remote",
  },
  {
    slug: "traded",
    client: "Traded",
    industry: "Fintech",
    year: "2023",
    url: "https://traded.co/",
    title: "Streamlining the trade, end to end.",
    blurb:
      "Backend and frontend delivery on Traded — a platform that pulls fragmented trading workflows into a clean, investor-friendly experience.",
    summary:
      "We contributed to Traded as full-stack engineers, building durable backend services and intuitive interfaces so investors could move from listing to close without the spreadsheet detours.",
    metric: { value: "Live", label: "In production" },
    tags: ["React", "Node.js", "TypeScript", "Postgres"],
    hue: "rgba(63,201,180,0.22)",
    swatch: "#3FC9B4",
    heroImage:
      "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=1800&q=80",
    heroAlt: "Trading charts and market data on multiple screens",
    gallery: [
      {
        image:
          "https://images.unsplash.com/photo-1642543492481-44e81e3914a7?auto=format&fit=crop&w=1200&q=80",
        alt: "Real-time market data on a workstation",
        caption: "Investor-facing flows pulled from disparate sources",
      },
      {
        image:
          "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&w=1200&q=80",
        alt: "Engineer reviewing platform architecture",
        caption: "Robust backend services powering the trade lifecycle",
      },
      {
        image:
          "https://images.unsplash.com/photo-1554260570-e9689a3418b8?auto=format&fit=crop&w=1200&q=80",
        alt: "Skyline with financial district at golden hour",
        caption: "Built for serious operators, not weekend traders",
      },
    ],
    testimonial: {
      quote:
        "On Traded, we delivered backend systems and frontend surfaces in lockstep — collaborating with the team to ensure each trade flow felt seamless from listing through close.",
      name: "Codlinx Engineering",
      role: "Engagement note · Traded",
      avatar:
        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=240&q=80",
    },
    challenge:
      "Traded needed to compress a fragmented, document-heavy trade flow into a single experience investors and operators could both trust.",
    approach: [
      "Audited the existing trade lifecycle with operations stakeholders.",
      "Built backend services to model listings, parties, and state transitions.",
      "Shipped React interfaces tuned for investor decision-making.",
      "Hardened the platform with type-safe APIs and observability hooks.",
    ],
    outcome: [
      { value: "Live", label: "Shipped to production" },
      { value: "Full-stack", label: "Delivery scope" },
      { value: "2023", label: "Engagement year" },
    ],
    services: ["Web", "Cloud"],
    duration: "Multi-quarter",
    team: "Full-stack pod",
    location: "Remote",
  },
  {
    slug: "zentap",
    client: "Zentap",
    industry: "Marketing Automation",
    year: "2022",
    url: "https://www.zentap.com/",
    title: "Leading delivery on a real-estate marketing engine.",
    blurb:
      "Pivotal development role on Zentap — a marketing automation platform built for real-estate agents who want growth without the busywork.",
    summary:
      "We led development efforts on Zentap, collaborating across product, design, and growth to ship features and integrations that turn marketing inputs into outputs agents can measure.",
    metric: { value: "Live", label: "In production" },
    tags: ["Next.js", "Node.js", "Stripe", "Integrations"],
    hue: "rgba(244,114,182,0.22)",
    swatch: "#F472B6",
    heroImage:
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1800&q=80",
    heroAlt: "Real-estate listing photography on a desk with a laptop",
    gallery: [
      {
        image:
          "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1200&q=80",
        alt: "Real-estate agents reviewing marketing content",
        caption: "Pipeline from listing to multi-channel campaign",
      },
      {
        image:
          "https://images.unsplash.com/photo-1551836022-deb4988cc6c0?auto=format&fit=crop&w=1200&q=80",
        alt: "Engineer at a workstation late afternoon",
        caption: "Engineering led from architecture down to shipped UI",
      },
      {
        image:
          "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=1200&q=80",
        alt: "Team discussing growth strategy at a whiteboard",
        caption: "Cross-functional rhythm with product and growth",
      },
    ],
    testimonial: {
      quote:
        "We played a leading role in Zentap's development — shipping features and integrations alongside cross-functional partners to turn marketing automation into outcomes agents trust.",
      name: "Codlinx Engineering",
      role: "Engagement note · Zentap",
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=240&q=80",
    },
    challenge:
      "Zentap's agent customers needed marketing leverage without becoming marketing operators — automation had to feel like a service, not a tool.",
    approach: [
      "Owned the technical roadmap alongside product leadership.",
      "Built the automation backbone with reusable workflow primitives.",
      "Shipped agent-facing dashboards with measurable performance views.",
      "Integrated commerce, content, and channel partners behind one API.",
    ],
    outcome: [
      { value: "Live", label: "Shipped to production" },
      { value: "Lead role", label: "Engagement model" },
      { value: "2022", label: "Engagement year" },
    ],
    services: ["Web", "Cloud", "Strategy"],
    duration: "Multi-quarter",
    team: "Lead engineer + pod",
    location: "Remote",
  },
  {
    slug: "upcoming-events",
    client: "Upcoming Events",
    industry: "Events",
    year: "2022",
    url: "https://www.upcomingevents.com/philadelphia",
    title: "End-to-end ownership of an event staffing platform.",
    blurb:
      "Led the build for Upcoming Events — agile delivery from requirements through deployment for a regional event discovery and staffing site.",
    summary:
      "Managed the project end-to-end: stakeholder discovery, intuitive UI design, robust backend systems, and an agile cadence that kept stakeholders close from kickoff to launch.",
    metric: { value: "Live", label: "In production" },
    tags: ["Agile", "Full-stack", "UX", "Deployment"],
    hue: "rgba(251,191,36,0.22)",
    swatch: "#FBBF24",
    heroImage:
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1800&q=80",
    heroAlt: "Crowd at an outdoor event at golden hour",
    gallery: [
      {
        image:
          "https://images.unsplash.com/photo-1531058020387-3be344556be6?auto=format&fit=crop&w=1200&q=80",
        alt: "Event crowd at a music festival",
        caption: "User-centric discovery flows for event-goers",
      },
      {
        image:
          "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=1200&q=80",
        alt: "Concert lights and audience",
        caption: "Regional content tuned for the Philadelphia market",
      },
      {
        image:
          "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1200&q=80",
        alt: "Engineers reviewing delivery roadmap on a screen",
        caption: "Agile lifecycle from inception through deployment",
      },
    ],
    testimonial: {
      quote:
        "We led the Upcoming Events build end-to-end — applying agile methodology across the lifecycle, gathering requirements, designing the experience, and shipping the backend that powers it.",
      name: "Codlinx Engineering",
      role: "Engagement note · Upcoming Events",
      avatar:
        "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=240&q=80",
    },
    challenge:
      "Upcoming Events needed someone to own the build — not just code, but the whole lifecycle from stakeholder discovery through a confident production launch.",
    approach: [
      "Ran requirements workshops with stakeholders and partners.",
      "Designed intuitive flows for both event-goers and organisers.",
      "Built backend systems with deployment confidence from day one.",
      "Delivered against an agile cadence with weekly stakeholder demos.",
    ],
    outcome: [
      { value: "Live", label: "Shipped to production" },
      { value: "End-to-end", label: "Delivery ownership" },
      { value: "Agile", label: "Operating cadence" },
    ],
    services: ["Web", "Strategy", "Design"],
    duration: "Multi-month",
    team: "Lead engineer + pod",
    location: "Remote",
  },
  {
    slug: "go-outfitter",
    client: "Go Outfitter",
    industry: "Commerce",
    year: "2023",
    url: "https://www.gooutfitter.com/",
    title: "A marketplace built for serious outdoor buyers.",
    blurb:
      "Full-stack development on Go Outfitter — an online marketplace with intuitive navigation, secure payments, and the polish outdoor shoppers expect.",
    summary:
      "We contributed across the stack on Go Outfitter, shaping the buyer journey, hardening payments, and shipping the merchandising surfaces that make discovery feel effortless.",
    metric: { value: "Live", label: "In production" },
    tags: ["E-commerce", "Payments", "React", "Node.js"],
    hue: "rgba(46,184,114,0.22)",
    swatch: "#2EB872",
    heroImage:
      "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=1800&q=80",
    heroAlt: "Outdoor gear laid out on a wooden table",
    gallery: [
      {
        image:
          "https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=1200&q=80",
        alt: "Hiker overlooking a valley",
        caption: "Designed for the audience, not the algorithm",
      },
      {
        image:
          "https://images.unsplash.com/photo-1455156218388-5e61b526818b?auto=format&fit=crop&w=1200&q=80",
        alt: "Outdoor gear arranged for product photography",
        caption: "Merchandising surfaces tuned for browse-to-buy",
      },
      {
        image:
          "https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=1200&q=80",
        alt: "Mountain trail with adventurer",
        caption: "Trust and secure payments at the heart of checkout",
      },
    ],
    testimonial: {
      quote:
        "On Go Outfitter we contributed full-stack — pairing software engineering depth with a focus on user-friendly navigation and a checkout shoppers actually trust.",
      name: "Codlinx Engineering",
      role: "Engagement note · Go Outfitter",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=240&q=80",
    },
    challenge:
      "Go Outfitter needed an online marketplace where outdoor shoppers could find gear without friction and check out with confidence.",
    approach: [
      "Designed buyer journeys aligned to real outdoor purchasing intent.",
      "Built reusable storefront primitives and product surfaces.",
      "Implemented secure payment flows with end-to-end validation.",
      "Tuned performance for browse-heavy sessions on mobile.",
    ],
    outcome: [
      { value: "Live", label: "Shipped to production" },
      { value: "Full-stack", label: "Delivery scope" },
      { value: "2023", label: "Engagement year" },
    ],
    services: ["Web", "Design"],
    duration: "Multi-month",
    team: "Full-stack pod",
    location: "Remote",
  },
  {
    slug: "event-staffing",
    client: "Event Staffing",
    industry: "Events",
    year: "2022",
    url: "https://eventstaffing.co.uk/",
    title: "Connecting organisers with the people who make events happen.",
    blurb:
      "Member of the build team for Event Staffing — designing intuitive interfaces and the backend that powers organiser-to-staff coordination.",
    summary:
      "We worked on Event Staffing as part of the core delivery team, shaping the UI for organisers and crew while implementing the backend logic that keeps roster operations honest.",
    metric: { value: "Live", label: "In production" },
    tags: ["UI Design", "Backend", "Scheduling", "Coordination"],
    hue: "rgba(99,102,241,0.22)",
    swatch: "#6366F1",
    heroImage:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1800&q=80",
    heroAlt: "Event production crew setting up a stage",
    gallery: [
      {
        image:
          "https://images.unsplash.com/photo-1503428593586-e225b39bddfe?auto=format&fit=crop&w=1200&q=80",
        alt: "Crew building an event stage",
        caption: "Roster and shift logic mapped to real operations",
      },
      {
        image:
          "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1200&q=80",
        alt: "Event audience at golden hour",
        caption: "Organiser UI tuned for fast-moving event ops",
      },
      {
        image:
          "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1200&q=80",
        alt: "Engineers reviewing the platform on a screen",
        caption: "Backend hardened for shift coordination at scale",
      },
    ],
    testimonial: {
      quote:
        "We helped build Event Staffing — designing intuitive UIs for organisers and crew, and implementing the backend systems that keep shift coordination clean and verifiable.",
      name: "Codlinx Engineering",
      role: "Engagement note · Event Staffing",
      avatar:
        "https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?auto=format&fit=crop&w=240&q=80",
    },
    challenge:
      "Event Staffing needed software that mirrored how organisers and crew actually work — shifts, roles, communications — without becoming yet another back-office tool.",
    approach: [
      "Designed intuitive interfaces for organiser and staff workflows.",
      "Built backend logic for shifts, roles, and roster state.",
      "Implemented coordination flows for fast-moving event ops.",
      "Hardened the platform for reliability around event peaks.",
    ],
    outcome: [
      { value: "Live", label: "Shipped to production" },
      { value: "Core team", label: "Engagement role" },
      { value: "2022", label: "Engagement year" },
    ],
    services: ["Web", "Design"],
    duration: "Multi-month",
    team: "Build team",
    location: "Remote",
  },
  {
    slug: "cancelo",
    client: "Cancelo",
    industry: "SaaS",
    year: "2023",
    url: "https://cancelo.io/",
    title: "Subscription management without the friction.",
    blurb:
      "Member of the Cancelo build team — engineering the backend and interfaces that let users see, edit, and stop subscriptions on their terms.",
    summary:
      "We worked on Cancelo as part of the delivery team, building efficient backend services and intuitive UIs that turn subscription chaos into something users actually control.",
    metric: { value: "Live", label: "In production" },
    tags: ["SaaS", "Payments", "TypeScript", "Subscriptions"],
    hue: "rgba(217,119,87,0.22)",
    swatch: "#D97757",
    heroImage:
      "https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?auto=format&fit=crop&w=1800&q=80",
    heroAlt: "Mobile app showing subscriptions and recurring charges",
    gallery: [
      {
        image:
          "https://images.unsplash.com/photo-1556742044-3c52d6e88c62?auto=format&fit=crop&w=1200&q=80",
        alt: "Subscription dashboard on a phone",
        caption: "All recurring charges in one accountable view",
      },
      {
        image:
          "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
        alt: "Analytics dashboard showing spend over time",
        caption: "User-friendly visibility into spend patterns",
      },
      {
        image:
          "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1200&q=80",
        alt: "Paper bills and receipts beside a laptop",
        caption: "Cancellation flows that respect the user, not the merchant",
      },
    ],
    testimonial: {
      quote:
        "On Cancelo we played a key engineering role — shipping efficient backend systems and intuitive interfaces so users can manage and stop subscriptions without the dark-pattern detour.",
      name: "Codlinx Engineering",
      role: "Engagement note · Cancelo",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=240&q=80",
    },
    challenge:
      "Cancelo's customers needed an honest, fast way to see and cancel subscriptions — without the dark patterns that protect the merchant over the user.",
    approach: [
      "Built efficient backend services for subscription state and payments.",
      "Designed UIs that surface charges and cancellations clearly.",
      "Implemented secure integrations across multiple payment providers.",
      "Tuned the experience for trust and speed at the moment that matters.",
    ],
    outcome: [
      { value: "Live", label: "Shipped to production" },
      { value: "Build team", label: "Engagement role" },
      { value: "2023", label: "Engagement year" },
    ],
    services: ["Web", "Cloud"],
    duration: "Multi-month",
    team: "Build team",
    location: "Remote",
  },
  {
    slug: "assemble",
    client: "Assemble",
    industry: "Collaboration",
    year: "2023",
    url: "https://assemble.fyi/",
    title: "A workspace built for the way remote teams actually work.",
    blurb:
      "Member of the Assemble build team — shipping intuitive interfaces and seamless communication features for remote-first collaboration.",
    summary:
      "We contributed to Assemble's build team, shaping a collaborative workspace tailored to remote teams. Software engineering depth applied to UI craft and the real-time plumbing that makes collaboration feel close.",
    metric: { value: "Live", label: "In production" },
    tags: ["Collaboration", "Realtime", "TypeScript", "React"],
    hue: "rgba(34,211,238,0.22)",
    swatch: "#22D3EE",
    heroImage:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1800&q=80",
    heroAlt: "Distributed team collaborating across video and chat",
    gallery: [
      {
        image:
          "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1200&q=80",
        alt: "Remote team meeting on a laptop",
        caption: "Real-time collaboration that respects distance",
      },
      {
        image:
          "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=80",
        alt: "Team brainstorming with sticky notes",
        caption: "Async + sync flows for how teams actually work",
      },
      {
        image:
          "https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=1200&q=80",
        alt: "Engineer working from a home office",
        caption: "Built for remote-first teams from the ground up",
      },
    ],
    testimonial: {
      quote:
        "We helped build Assemble — applying software engineering craft to intuitive UI and the seamless communication features that make distributed collaboration feel close.",
      name: "Codlinx Engineering",
      role: "Engagement note · Assemble",
      avatar:
        "https://images.unsplash.com/photo-1551836022-deb4988cc6c0?auto=format&fit=crop&w=240&q=80",
    },
    challenge:
      "Assemble's audience expected the polish of a co-located workspace inside a remote-first product — without the latency or seams of bolted-on tools.",
    approach: [
      "Built intuitive interfaces for shared and individual workspaces.",
      "Implemented seamless real-time communication features.",
      "Shaped collaboration flows around remote-team rituals.",
      "Hardened the platform with type-safety and performance budgets.",
    ],
    outcome: [
      { value: "Live", label: "Shipped to production" },
      { value: "Build team", label: "Engagement role" },
      { value: "2023", label: "Engagement year" },
    ],
    services: ["Web", "Design"],
    duration: "Multi-month",
    team: "Build team",
    location: "Remote",
  },
];

export const PROJECTS: Project[] = SEEDS.map((s) => ({
  ...s,
  visual: (
    <LiveSitePreview
      url={s.url}
      swatch={s.swatch}
      hue={s.hue}
      label={s.client}
    />
  ),
}));

export function getProjectBySlug(slug: string): Project | undefined {
  return PROJECTS.find((p) => p.slug === slug);
}
