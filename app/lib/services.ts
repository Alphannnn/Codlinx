export type ServiceContent = {
  slug: string;
  number: string;
  label: string;
  tagline: string;
  description: string;
  intro: string;
  deliverables: string[];
  stack: string[];
  duration: string;
  engagement: string;
  process: { step: string; title: string; body: string }[];
  faqs: { q: string; a: string }[];
};

export const SERVICES_CONTENT: ServiceContent[] = [
  {
    slug: "web",
    number: "01",
    label: "Web Development",
    tagline: "Production-grade web apps, built to scale.",
    description:
      "From marketing sites that convert to dashboards that handle millions of events — we ship full-stack web products engineered for the long haul.",
    intro:
      "Most agencies hand you a Webflow build and call it done. We build the real thing: type-safe, server-rendered, observable, and ready for the team that inherits it.",
    deliverables: [
      "Type-safe Next.js + React applications",
      "Server-rendered, edge-deployed performance",
      "Custom CMS, admin panels, and dashboards",
      "API design, integrations, and data modeling",
      "Design system shipped with the build",
      "CI/CD, tests, and rollback strategy",
    ],
    stack: ["Next.js", "React", "TypeScript", "Postgres", "Prisma", "tRPC", "Vercel", "Playwright"],
    duration: "6–16 weeks",
    engagement: "Fixed-scope · T&M",
    process: [
      { step: "01", title: "Audit & architect", body: "Stack review, data model, and a deployment plan in week one." },
      { step: "02", title: "Design + build in lockstep", body: "Design and engineering ship in the same sprint — no handoff dance." },
      { step: "03", title: "Ship to staging weekly", body: "Real software in your hands every Friday. No surprises at launch." },
      { step: "04", title: "Tune for production", body: "Performance budgets, observability, and a 30-day support tail." },
    ],
    faqs: [
      { q: "Can you take over an existing codebase?", a: "Yes. We start with a paid two-week audit and return a remediation plan before committing to a build." },
      { q: "Do you do marketing sites or only apps?", a: "Both — but only with conversion goals attached. Pretty pages without numbers attached aren't our thing." },
      { q: "What about SEO?", a: "Server-rendering, structured data, sitemaps, and Core Web Vitals are part of the default build." },
    ],
  },
  {
    slug: "mobile",
    number: "02",
    label: "Mobile Apps",
    tagline: "iOS, Android, and cross-platform that feels native.",
    description:
      "We build mobile apps that pass App Store review on day one — with the polish, offline behavior, and animations users expect from a category-leading product.",
    intro:
      "Mobile is unforgiving: a janky 60fps, a missed offline state, a confused permissions prompt — and you lose the user. We sweat all of it.",
    deliverables: [
      "Native iOS (Swift) and Android (Kotlin) builds",
      "Cross-platform apps in React Native and Expo",
      "Offline-first sync, push, deep linking",
      "App Store / Play Store submission & ASO",
      "Analytics, crash reporting, and A/B framework",
      "OTA updates pipeline (Expo / CodePush)",
    ],
    stack: ["React Native", "Expo", "Swift", "Kotlin", "Firebase", "Sentry", "Amplitude"],
    duration: "10–20 weeks",
    engagement: "Fixed-scope · Retainer",
    process: [
      { step: "01", title: "Platform call", body: "Native vs cross-platform — we'll make the right call for your team, not ours." },
      { step: "02", title: "Foundation sprint", body: "Auth, routing, design system, and the first end-to-end happy path." },
      { step: "03", title: "Feature sprints", body: "Demos every Friday, TestFlight + Play Internal weekly." },
      { step: "04", title: "Store submission", body: "We file the review, handle rejections, and ship the v1.0 launch build." },
    ],
    faqs: [
      { q: "React Native or native?", a: "It depends — team size, performance ceiling, native API needs. We'll make a recommendation in week one, in writing." },
      { q: "Do you handle the App Store submission?", a: "Yes. Provisioning, screenshots, review responses — the whole pipeline." },
      { q: "Offline support?", a: "Default on. We design data models with conflict resolution from day one, not as an afterthought." },
    ],
  },
  {
    slug: "cloud",
    number: "03",
    label: "Cloud & DevOps",
    tagline: "Infra that sleeps so your team can.",
    description:
      "We design cloud architectures that scale predictably and self-heal — with the observability you need to debug at 2am and the IaC discipline to roll back without panic.",
    intro:
      "Cloud bills double, runbooks rot, and one engineer ends up holding the keys. We build infra you can hand off.",
    deliverables: [
      "AWS / GCP / Azure architecture & migration",
      "Kubernetes, Terraform, GitHub Actions pipelines",
      "Observability: logs, metrics, tracing, alerts",
      "Cost optimization and reliability engineering",
      "Disaster recovery and runbook authoring",
      "SOC 2 / ISO 27001 prep and remediation",
    ],
    stack: ["AWS", "GCP", "Kubernetes", "Terraform", "Datadog", "GitHub Actions", "Pulumi"],
    duration: "4–12 weeks",
    engagement: "Retainer · SRE-on-call",
    process: [
      { step: "01", title: "Architecture review", body: "Two-week audit: cost, reliability, security posture, and blast radius." },
      { step: "02", title: "Stabilize", body: "Quick wins: alerts, IaC coverage, and a paved-road CI/CD pipeline." },
      { step: "03", title: "Scale", body: "Multi-region, autoscaling, capacity planning, and budget guardrails." },
      { step: "04", title: "Hand off", body: "Runbooks, training, and a clean exit — or we stay on retainer if you prefer." },
    ],
    faqs: [
      { q: "AWS, GCP, or Azure?", a: "We're fluent in all three. We'll match your existing footprint and your team's expertise." },
      { q: "Can you reduce our cloud bill?", a: "Often yes — typical wins are 25–40% in the first quarter via right-sizing, reserved capacity, and architectural fixes." },
      { q: "Do you carry pager duty?", a: "Yes, on retainer engagements. SLAs and escalation paths are written into the contract." },
    ],
  },
  {
    slug: "ai",
    number: "04",
    label: "AI & Machine Learning",
    tagline: "LLMs, RAG, and ML — shipped, not demoed.",
    description:
      "We turn AI prototypes into production systems with measurable quality, predictable cost, and the evaluation harnesses that keep regressions out.",
    intro:
      "A demo with a great prompt isn't a product. We build the eval harness, the retrieval stack, the cost controls, and the guardrails that make AI shippable.",
    deliverables: [
      "LLM integrations with Claude, GPT, and open models",
      "RAG pipelines with hybrid retrieval and citations",
      "Eval harnesses, A/B frameworks, and guardrails",
      "Custom ML models — training, serving, monitoring",
      "Prompt caching, batching, and cost dashboards",
      "Safety, red-teaming, and PII handling",
    ],
    stack: ["Anthropic", "OpenAI", "pgvector", "LangChain", "PyTorch", "Modal", "Ragas"],
    duration: "8–14 weeks",
    engagement: "Discovery → Build",
    process: [
      { step: "01", title: "Define the eval", body: "Before a single prompt, we define what 'good' looks like — measurably." },
      { step: "02", title: "Build the retrieval", body: "Hybrid retrieval (BM25 + vector) tuned per domain, with provenance." },
      { step: "03", title: "Wrap with guardrails", body: "Citation contracts, PII filters, cost budgets, and graceful fallbacks." },
      { step: "04", title: "Ship + monitor", body: "Production rollout behind feature flags, with eval dashboards on day one." },
    ],
    faqs: [
      { q: "Which model should we use?", a: "Whichever wins the eval. We benchmark Claude, GPT, and open-weights against your task and pick on quality + cost." },
      { q: "How do you handle hallucinations?", a: "Citation contracts ('every claim links to a source'), eval-gated deploys, and graceful 'I don't know' fallbacks." },
      { q: "What about cost?", a: "Prompt caching, model routing, and request batching are baked in. We publish a cost dashboard with every rollout." },
    ],
  },
  {
    slug: "design",
    number: "05",
    label: "UI / UX Design",
    tagline: "Interfaces that convert and feel inevitable.",
    description:
      "Brand systems, product UI, and conversion-led marketing surfaces — designed in the same room as the engineers who'll ship them, so nothing gets lost in handoff.",
    intro:
      "We don't do dribbble shots. Every screen we design is sized against an engineer estimate before it leaves Figma.",
    deliverables: [
      "Brand systems, identities, and design tokens",
      "Product UI / UX with prototype + handoff",
      "Conversion-led landing pages",
      "Design systems in Figma + code",
      "Motion and interaction prototypes",
      "Accessibility audits to WCAG AA",
    ],
    stack: ["Figma", "Framer", "Storybook", "Motion", "Rive"],
    duration: "4–10 weeks",
    engagement: "Sprint-based",
    process: [
      { step: "01", title: "Discover", body: "Stakeholder interviews, competitive teardowns, and a sharp brief." },
      { step: "02", title: "System", body: "Tokens, components, and patterns shipped to Figma + code together." },
      { step: "03", title: "Apply", body: "Screens, flows, and motion — prototyped with real users in the loop." },
      { step: "04", title: "Hand off", body: "Live components, motion specs, and a Storybook your engineers actually use." },
    ],
    faqs: [
      { q: "Can you work with our in-house engineers?", a: "Yes — most engagements ship the design system into your repo with shared review." },
      { q: "Do you do brand or just product?", a: "Both. Identity, voice, type system, and brand application across product surfaces." },
      { q: "What about accessibility?", a: "WCAG AA is the floor. Color contrast, focus order, and keyboard flows are part of design review, not a postscript." },
    ],
  },
  {
    slug: "strategy",
    number: "06",
    label: "Product Strategy",
    tagline: "Discovery, roadmaps, and go-to-market.",
    description:
      "We sit with your team for 2–4 weeks, talk to users, and come back with a roadmap that's actually shippable — sized, sequenced, and pressure-tested with engineering.",
    intro:
      "Most strategy decks are wallpaper. Ours come with engineering estimates, scope cuts, and a clear sequence of what to ship and what to drop.",
    deliverables: [
      "User research and competitive teardowns",
      "Roadmap with phased scope and budgets",
      "Pricing, positioning, and GTM playbooks",
      "Engineering-validated estimates",
      "Stakeholder workshops and alignment",
      "Pitch-ready summary deck",
    ],
    stack: ["Research", "Roadmapping", "Workshops", "Estimates", "GTM"],
    duration: "2–6 weeks",
    engagement: "Fixed-fee discovery",
    process: [
      { step: "01", title: "Listen", body: "Stakeholder + user interviews. We come with sharp questions, not pitches." },
      { step: "02", title: "Synthesize", body: "Themes, frictions, opportunities — written, not just whiteboarded." },
      { step: "03", title: "Sequence", body: "A phased plan with sizes, dependencies, and a clear sequence." },
      { step: "04", title: "Pressure-test", body: "We walk the plan through engineering, finance, and a friendly board member." },
    ],
    faqs: [
      { q: "Do we have to build with you after?", a: "No. Discovery is its own deliverable. Many clients run discovery with us and build in-house." },
      { q: "How is this different from a McKinsey deck?", a: "Ours come with engineering estimates and shippable scope. We won't quote ourselves for a build we can't deliver." },
      { q: "Can you talk to our customers?", a: "Yes — typical engagements include 8–12 user interviews. We bring the script and the kit." },
    ],
  },
  {
    slug: "graphic-design",
    number: "07",
    label: "Graphic Design",
    tagline: "Brand visuals that stop the scroll.",
    description:
      "Logos, brand kits, ad creative, and social assets designed with intent — built to look sharp everywhere from a billboard to a feed thumbnail.",
    intro:
      "Design isn't decoration — it's the first thing a customer judges you on. We build identity systems and creative that stay consistent across every surface and convert attention into action.",
    deliverables: [
      "Logo, identity, and full brand guidelines",
      "Social media post and story templates",
      "Ad creative, banners, and display sets",
      "Pitch decks, one-pagers, and print collateral",
      "Editable source files and a usage kit",
      "Motion graphics and animated assets",
    ],
    stack: ["Figma", "Photoshop", "Illustrator", "After Effects", "Canva"],
    duration: "1–4 weeks",
    engagement: "Project · Retainer",
    process: [
      { step: "01", title: "Brief & moodboard", body: "We learn the brand, the audience, and the goal — then align on direction before a pixel moves." },
      { step: "02", title: "Concepts", body: "Two to three distinct directions, not twenty safe variations of the same idea." },
      { step: "03", title: "Refine", body: "We tighten the chosen route across every format it needs to live in." },
      { step: "04", title: "Handover", body: "Editable source files, exports, and a guideline doc your team can run with." },
    ],
    faqs: [
      { q: "Do we get the source files?", a: "Always. You own the editable Figma / Adobe files and the full export set — no lock-in." },
      { q: "Can you match our existing brand?", a: "Yes. Send your guidelines and we'll work inside them, or help evolve them if they're dated." },
      { q: "How many revisions are included?", a: "Project work includes two rounds per asset; retainers are effectively unlimited within the monthly scope." },
    ],
  },
  {
    slug: "seo",
    number: "08",
    label: "SEO",
    tagline: "Rank for the searches that actually convert.",
    description:
      "Technical fixes, content that earns its keywords, and authority building — a compounding channel engineered to grow traffic that turns into revenue.",
    intro:
      "SEO isn't a checklist you run once. We treat it as an engineering and content discipline: fix the technical foundation, target intent that converts, and build authority that compounds month over month.",
    deliverables: [
      "Technical SEO audit and Core Web Vitals fixes",
      "Keyword research mapped to buyer intent",
      "On-page optimization and internal linking",
      "Content strategy and editorial calendar",
      "Backlink and local SEO campaigns",
      "Monthly ranking and traffic reporting",
    ],
    stack: ["Ahrefs", "Semrush", "Google Search Console", "GA4", "Screaming Frog"],
    duration: "Ongoing · 3-mo min",
    engagement: "Monthly retainer",
    process: [
      { step: "01", title: "Audit", body: "Technical crawl, content gap analysis, and a backlink profile review in the first two weeks." },
      { step: "02", title: "Fix the foundation", body: "Core Web Vitals, indexation, structured data, and site architecture come first." },
      { step: "03", title: "Build content", body: "Intent-mapped pages and articles that target the keywords worth ranking for." },
      { step: "04", title: "Earn authority", body: "Link building, digital PR, and ongoing optimization — measured monthly." },
    ],
    faqs: [
      { q: "How long until we see results?", a: "Technical wins show in weeks; ranking and traffic lift typically compound over 3–6 months. We report progress monthly throughout." },
      { q: "Do you guarantee #1 rankings?", a: "No one credible does. We commit to the work that moves rankings and to transparent reporting on every metric." },
      { q: "Do you write the content too?", a: "Yes — strategy, briefs, and writing are all in scope, or we'll collaborate with your in-house team." },
    ],
  },
  {
    slug: "social-media",
    number: "09",
    label: "Social Media Management",
    tagline: "A feed that builds an audience, on autopilot.",
    description:
      "Content calendars, on-brand posts, community management, and growth — we run your channels end to end so the brand shows up consistently and grows.",
    intro:
      "Consistency is what separates a brand people follow from a feed people scroll past. We own the calendar, the creative, and the community so your channels grow without eating your week.",
    deliverables: [
      "Monthly content calendar and creative",
      "Posting, scheduling, and channel management",
      "Community management and DM responses",
      "Hashtag, caption, and format strategy",
      "Influencer and collaboration outreach",
      "Growth analytics and monthly reporting",
    ],
    stack: ["Instagram", "LinkedIn", "TikTok", "Meta Business Suite", "Buffer"],
    duration: "Ongoing",
    engagement: "Monthly retainer",
    process: [
      { step: "01", title: "Strategy", body: "Audience, voice, pillars, and the channel mix that fits your goals." },
      { step: "02", title: "Calendar", body: "A month of posts planned and designed before it goes live — approved by you." },
      { step: "03", title: "Run", body: "We publish, schedule, and manage the community day to day." },
      { step: "04", title: "Report", body: "Reach, engagement, and growth reviewed monthly — then we double down on what works." },
    ],
    faqs: [
      { q: "Which platforms do you cover?", a: "Instagram, LinkedIn, TikTok, Facebook, and X are most common. We recommend the mix that fits your audience, not all of them by default." },
      { q: "Do you create the content or do we?", a: "We do — calendar, copy, and creative. You approve before anything goes live." },
      { q: "Do you handle paid promotion too?", a: "Organic management is this service; paid campaigns are covered under our Social Media Marketing service, and the two pair well." },
    ],
  },
  {
    slug: "social-media-marketing",
    number: "10",
    label: "Social Media Marketing",
    tagline: "Paid social that turns reach into revenue.",
    description:
      "Full-funnel paid social across Meta, Instagram, TikTok, and LinkedIn — built around creative testing, precise targeting, and conversion tracking that ties every dollar to a result.",
    intro:
      "Paid social rewards discipline, not budget. We build campaigns around clean conversion tracking and relentless creative testing, so spend scales only where the return holds up — across Meta, TikTok, and LinkedIn.",
    deliverables: [
      "Paid social strategy and campaign structure",
      "Meta (Facebook / Instagram) ad campaigns",
      "TikTok and LinkedIn ad campaigns",
      "Conversion tracking and pixel / tag setup",
      "Ad creative and hook testing at scale",
      "Weekly optimization and ROAS reporting",
    ],
    stack: ["Meta Ads Manager", "TikTok Ads", "LinkedIn Ads", "GA4", "Looker Studio"],
    duration: "Ongoing · 3-mo min",
    engagement: "Retainer + ad spend",
    process: [
      { step: "01", title: "Track", body: "Pixels, conversions, and tags wired up correctly before a single dollar is spent." },
      { step: "02", title: "Launch", body: "Structured campaigns with a clear testing matrix across audiences and creative." },
      { step: "03", title: "Optimize", body: "Weekly bid, budget, and creative iteration — kill the losers, scale the winners." },
      { step: "04", title: "Scale", body: "Push spend into what's profitable, with ROAS reported transparently every week." },
    ],
    faqs: [
      { q: "How is this different from Social Media Management?", a: "Management runs your organic channels day to day; Social Media Marketing is the paid side — ad campaigns, targeting, and spend optimized for conversions. They pair well together." },
      { q: "Is ad spend included in the fee?", a: "No — our retainer covers management and creative; ad spend is paid directly to the platforms so you keep full control of the budget." },
      { q: "What budget do we need to start?", a: "It depends on your goals and market, but we'll recommend a realistic test budget before launch and scale only what's profitable." },
      { q: "How do you report performance?", a: "A live Looker Studio dashboard plus a weekly summary — spend, conversions, CPA, and ROAS, with no vanity metrics." },
    ],
  },
];

export function getServiceBySlug(slug: string): ServiceContent | undefined {
  return SERVICES_CONTENT.find((s) => s.slug === slug);
}
