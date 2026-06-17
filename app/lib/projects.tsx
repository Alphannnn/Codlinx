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
  previewImage?: string;
};

type Seed = Omit<Project, "visual"> & { swatch: string; hue: string };

const SEEDS: Seed[] = [
  {
    slug: "traded",
    client: "Traded",
    industry: "Fintech",
    year: "2023",
    url: "https://traded.co/",
    previewImage: "/projects/traded.jpeg",
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
    previewImage: "/projects/zentap.jpeg",
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
    previewImage: "/projects/upcoming-events.jpeg",
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
    slug: "event-staffing",
    client: "Event Staffing",
    industry: "Events",
    year: "2022",
    url: "https://eventstaffing.co.uk/",
    previewImage: "/projects/event-staffing.jpeg",
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
];

export const PROJECTS: Project[] = SEEDS.map((s) => ({
  ...s,
  visual: (
    <LiveSitePreview
      url={s.url}
      swatch={s.swatch}
      hue={s.hue}
      label={s.client}
      previewImage={s.previewImage}
    />
  ),
}));

export function getProjectBySlug(slug: string): Project | undefined {
  return PROJECTS.find((p) => p.slug === slug);
}
