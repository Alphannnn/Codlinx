// Portfolio showcase data.
//
// This is a portfolio piece: the Digital Otters (digitalotters.com) information
// architecture and page content, faithfully recreated in the Codlinx design
// language. Content mirrors the source site's offering; styling and structure
// follow Codlinx's premium dark/teal system. Nothing here touches Codlinx's own
// services, work, or marketing pages.

export const ACCENT = "#3FC9B4";

export type PortfolioGroup =
  | "Social"
  | "AI & Search Visibility"
  | "Web Development"
  | "Creative"
  | "Paid Media"
  | "Tools";

export type Offering = { title: string; body: string };
export type Step = { title: string; body: string };
export type Stat = { value: string; label: string };
export type Faq = { q: string; a: string };
export type Package = {
  name: string;
  price?: string;
  blurb: string;
  features: string[];
  featured?: boolean;
};
export type ShowcaseSite = { name: string; url: string; image?: string };
export type Showcase = {
  kicker: string;
  heading: string;
  sub?: string;
  sites: ShowcaseSite[];
};

export type PortfolioPage = {
  slug: string;
  /** Label as it appears in the Digital Otters navbar */
  navLabel: string;
  /** Short description shown in the Codlinx nav dropdown + landing grid */
  navDescription: string;
  group: PortfolioGroup;
  /** Source URL on digitalotters.com — shown as the "original" reference */
  sourceUrl: string;
  swatch: string;
  hue: string;

  eyebrow: string;
  title: string;
  highlight: string;
  description: string;
  heroBadge: string;
  heroStats: Stat[];

  overview: { kicker: string; heading: string; body: string };
  offerings: Offering[];
  process?: { kicker: string; heading: string; steps: Step[] };
  metricBand?: Stat[];
  packages?: Package[];
  /** Marquee chips — platforms, stacks, or tools depending on the page */
  marqueeTitle?: string;
  marquee?: string[];
  industries?: string[];
  faqs?: Faq[];
  /** Live example sites to showcase, each opening in a new tab. */
  showcase?: Showcase;
};

export const PORTFOLIO_PAGES: PortfolioPage[] = [
  // ────────────────────────────────────────────────────────── Social
  {
    slug: "social-media-management",
    navLabel: "Social Media Management",
    navDescription: "Channels run end to end across every major network.",
    group: "Social",
    sourceUrl: "https://www.digitalotters.com/social-media-management/",
    swatch: "#3FC9B4",
    hue: "rgba(63,201,180,0.22)",
    eyebrow: "Social Media Management",
    title: "Social media,",
    highlight: "run end to end.",
    description:
      "Result-proven Facebook, Instagram, LinkedIn, Twitter, Snapchat, TikTok, and YouTube management and marketing — content that resonates instead of merely flooding feeds with promotional noise.",
    heroBadge: "Meta · TikTok · LinkedIn · YouTube",
    heroStats: [
      { value: "57%", label: "Of buyers follow brands they buy from" },
      { value: "7", label: "Networks managed end to end" },
      { value: "30", label: "Posts / month at the top tier" },
      { value: "Daily", label: "Community management" },
    ],
    overview: {
      kicker: "What is social media management",
      heading: "Presence is the easy part. Resonance is the work.",
      body: "57% of consumers follow a brand's social pages to keep up with new products and updates. We don't just inundate users with promotional material devoid of substance — we build a calendar, a voice, and a creative system per channel, then manage the community that gathers around it.",
    },
    offerings: [
      { title: "Facebook Management & Marketing", body: "Granular audience targeting to put your offer in front of the exact customer most likely to buy." },
      { title: "Instagram Management & Marketing", body: "Memorable reels and visually-led campaigns that earn saves, shares, and follows." },
      { title: "Twitter / X Management & Marketing", body: "A text-first platform ideal for B2B reach, real-time relevance, and thought leadership." },
      { title: "LinkedIn Management & Marketing", body: "Business networking turned into a repeatable lead-generation engine." },
      { title: "YouTube Management & Marketing", body: "Long- and short-form video that compounds brand awareness and pipeline." },
      { title: "TikTok Marketing", body: "The fastest-growing platform — built for quick reach and sharp sales lifts." },
    ],
    process: {
      kicker: "How we run it",
      heading: "A month planned before a single post goes live.",
      steps: [
        { title: "Choose the right channels", body: "We pick the platforms your audience actually uses — not all seven for the sake of it." },
        { title: "Plan & design the calendar", body: "A full month of posts, captions, and creative approved before anything publishes." },
        { title: "Publish & manage the community", body: "Daily posting, DMs, and replies handled in your brand voice." },
        { title: "Report & double down", body: "Reach and engagement reviewed monthly; we scale what works and cut what doesn't." },
      ],
    },
    metricBand: [
      { value: "Organic", label: "+ paid, run together" },
      { value: "On-brand", label: "Every single asset" },
      { value: "Monthly", label: "Growth reporting" },
      { value: "6", label: "Platforms targeted per brand" },
    ],
    packages: [
      { name: "Social Basic", blurb: "For brands establishing a consistent presence.", features: ["8 posts / month", "2 networks managed", "6 ad campaigns", "Monthly report"] },
      { name: "Social Pro", featured: true, blurb: "For brands ready to grow across channels.", features: ["16–20 posts / month", "3 networks managed", "8 ad campaigns", "Community management"] },
      { name: "Social Elite", blurb: "For brands running a full-funnel social engine.", features: ["26–30 posts / month", "Up to 5 networks", "10 ad campaigns", "Priority creative + reporting"] },
    ],
    marqueeTitle: "Channels we manage",
    marquee: ["Facebook", "Instagram", "LinkedIn", "Twitter / X", "YouTube", "TikTok", "Snapchat", "Pinterest"],
    industries: ["E-commerce", "Healthcare", "Real Estate", "Tech", "Education", "Corporate"],
    faqs: [
      { q: "Organic or paid social — which do I need?", a: "Almost always both. Organic builds the brand and community; paid accelerates reach and conversions. We run them together so each makes the other cheaper." },
      { q: "How many posts will you publish?", a: "Between 8 and 30 a month depending on the package and the channels — every one designed and approved before it goes live." },
      { q: "Do you handle replies and DMs?", a: "Yes. Daily community management and DM responses in your brand voice are included from the Pro tier up." },
    ],
  },

  // ──────────────────────────────────────── AI & Search Visibility
  {
    slug: "seo-services",
    navLabel: "SEO Services",
    navDescription: "Rank for the searches that actually convert — and for AI answers.",
    group: "AI & Search Visibility",
    sourceUrl: "https://www.digitalotters.com/seo-services/",
    swatch: "#6366F1",
    hue: "rgba(99,102,241,0.22)",
    eyebrow: "SEO Services",
    title: "Result-oriented",
    highlight: "premium SEO.",
    description:
      "A trusted partner for SEO success. Backed by experienced specialists, we go beyond basic optimization to build fully customized strategies — from deep keyword research and content optimization to authoritative link-building and technical SEO.",
    heroBadge: "Technical · Content · Authority · GEO",
    heroStats: [
      { value: "9", label: "Stages in our SEO process" },
      { value: "3–6mo", label: "To meaningful ranking lift" },
      { value: "Monthly", label: "Transparent reporting" },
      { value: "Intent", label: "Keywords that convert" },
    ],
    overview: {
      kicker: "What to expect",
      heading: "SEO run like engineering — fix the foundation, measure, compound.",
      body: "We don't sell rankings; we build the system that earns them. A technical foundation that crawls clean, content mapped to buyer intent, and the authority to back it — reported every month against rankings, traffic, and conversions.",
    },
    offerings: [
      { title: "Premium Managed SEO", body: "End-to-end SEO management focused on higher rankings and consistent, compounding growth." },
      { title: "Generative Engine & AI SEO", body: "Optimize your brand for AI-powered search — Google SGE, Gemini, ChatGPT, and Claude." },
      { title: "Local Listing SEO", body: "Attract nearby customers with local rankings and Google Maps visibility." },
      { title: "Enterprise SEO", body: "Scalable solutions for large websites and competitive, high-stakes markets." },
      { title: "Ecommerce SEO", body: "Boost product visibility with optimized pages and a clean site structure." },
      { title: "Search Visibility Recovery", body: "Recover lost rankings after algorithm updates or technical SEO issues." },
    ],
    process: {
      kicker: "Strategic SEO process",
      heading: "Nine stages, in order, every engagement.",
      steps: [
        { title: "Website audit", body: "A full technical and content baseline before we touch a thing." },
        { title: "Keyword research", body: "Mapped to buyer intent, not vanity search volume." },
        { title: "On-page optimization", body: "Titles, structure, and content tuned to rank and convert." },
        { title: "Meta & technical", body: "Schema, meta structure, Core Web Vitals, and crawlability fixed." },
        { title: "High-tier link building", body: "Authoritative, editorial links — off-page authority earned, not bought cheap." },
        { title: "Algorithm analysis & reporting", body: "Update impact tracked; rankings, traffic, and conversions reported monthly." },
      ],
    },
    metricBand: [
      { value: "GEO", label: "Generative engine optimization" },
      { value: "AA", label: "Technical health floor" },
      { value: "Editorial", label: "Link building only" },
      { value: "Monthly", label: "Reporting cadence" },
    ],
    marqueeTitle: "Tools we use for SEO",
    marquee: ["Semrush", "Ahrefs", "Google Search Console", "Screaming Frog", "GA4", "Surfer", "Moz", "Looker Studio"],
    industries: ["SaaS", "E-commerce", "Healthcare", "Real Estate", "Finance", "Local Business"],
    faqs: [
      { q: "How long until I see results?", a: "Foundational fixes show up in weeks; meaningful ranking and traffic lift typically lands in 3–6 months and compounds from there." },
      { q: "What is Generative Engine Optimization (GEO)?", a: "Optimizing so your brand is cited inside AI answers — Google SGE, Gemini, ChatGPT, and Claude — not just the classic blue links." },
      { q: "Do you build links?", a: "Yes — high-tier, editorial links only. We never risk your domain on cheap link schemes." },
    ],
  },
  {
    slug: "reputation-management",
    navLabel: "Reputation Management",
    navDescription: "Protect, restore, and elevate your brand across the web.",
    group: "AI & Search Visibility",
    sourceUrl: "https://www.digitalotters.com/reputation-management-services/",
    swatch: "#F472B6",
    hue: "rgba(244,114,182,0.22)",
    eyebrow: "Reputation Management",
    title: "Your reputation,",
    highlight: "protected & restored.",
    description:
      "In today's digital age, your online reputation is more crucial than ever. We enhance and protect your brand image across the internet, helping you stand out positively in a noisy digital landscape.",
    heroBadge: "Monitor · Mitigate · Restore",
    heroStats: [
      { value: "24/7", label: "Reputation monitoring" },
      { value: "SERP", label: "Ranking revival" },
      { value: "Legal", label: "Removal team on hand" },
      { value: "Custom", label: "Plans per brand" },
    ],
    overview: {
      kicker: "Why it matters",
      heading: "One bad result on page one can cost you the sale.",
      body: "We run comprehensive reputation management designed to enhance and protect brand image across the internet — combating misinformation, rebuilding consumer confidence, and making sure the first thing people find reflects who you actually are.",
    },
    offerings: [
      { title: "Personal Reputation Management", body: "Safeguard your personal reputation against misinformation and coordinated negative campaigns." },
      { title: "Business Reputation Management", body: "Fight misinformation at scale and restore consumer confidence in your brand." },
      { title: "Legal Removals", body: "A professional legal team handles the removal of libelous and defamatory statements." },
      { title: "Negative Content Mitigation", body: "Identify and address negative SEO and content actively hurting your brand." },
    ],
    process: {
      kicker: "What's included",
      heading: "A full toolkit for owning page one.",
      steps: [
        { title: "Powerful social presence", body: "Owned profiles built and ranked to occupy the results that matter." },
        { title: "Negative reviews & delisting", body: "Reviews addressed, spam links flagged, and harmful results delisted." },
        { title: "Positive link building", body: "Authoritative, positive coverage that pushes negatives down the page." },
        { title: "SERP revival & PR", body: "Local citation strategy, video marketing, and PR publications that restore credibility." },
      ],
    },
    metricBand: [
      { value: "+", label: "Measurable performance lift" },
      { value: "NPS®", label: "Higher satisfaction scores" },
      { value: "CRM", label: "& ad integrations" },
      { value: "%", label: "Strong client retention" },
    ],
    industries: ["Executives", "Healthcare", "Hospitality", "Legal", "E-commerce", "Public Figures"],
    faqs: [
      { q: "What is reputation management?", a: "The practice of monitoring, influencing, and protecting how your brand or name appears across search, reviews, and social — so the public narrative stays accurate and positive." },
      { q: "Can you remove negative reviews?", a: "Where reviews are libelous or violate platform policy, our legal and delisting teams pursue removal. Where they can't be removed, we mitigate them with positive content and SERP work." },
      { q: "Do you offer customized plans?", a: "Yes — every reputation situation is different, so plans are scoped to your specific risks and goals." },
    ],
  },

  // ──────────────────────────────────────────────── Web Development
  {
    slug: "web-development",
    navLabel: "Web Development",
    navDescription: "360° web development across modern stacks and CMS platforms.",
    group: "Web Development",
    sourceUrl: "https://www.digitalotters.com/web-development-services/",
    swatch: "#3FC9B4",
    hue: "rgba(63,201,180,0.22)",
    eyebrow: "Web Development",
    title: "Top web development,",
    highlight: "built to convert.",
    description:
      "Evolve your digital presence with 360° web development focused on a solid online foundation. We turn business concepts into functional websites using contemporary frameworks — built to grow your return on investment.",
    heroBadge: "PHP · Laravel · Shopify · WordPress · Python",
    heroStats: [
      { value: "360°", label: "Full-stack delivery" },
      { value: "6", label: "Core stacks supported" },
      { value: "ROI", label: "The metric we build for" },
      { value: "Modern", label: "Frameworks only" },
    ],
    overview: {
      kicker: "What a web partner should do",
      heading: "From concept to a site that earns its keep.",
      body: "We transform business concepts into functional websites using contemporary technology frameworks — designed, built, and hardened to enhance return on investment, not just to look good in a portfolio.",
    },
    offerings: [
      { title: "Custom PHP Development", body: "A robust backend language for dependable, custom applications." },
      { title: "Laravel Development", body: "A structured PHP framework for maintainable, scalable web projects." },
      { title: "Shopify Development", body: "Conversion-focused e-commerce on the platform built for selling." },
      { title: "Magento Development", body: "Enterprise e-commerce for catalogues and complexity at scale." },
      { title: "WordPress Development", body: "CMS-driven sites your team can own and update with confidence." },
      { title: "Python Development", body: "A versatile language for web apps, automation, and data work." },
    ],
    process: {
      kicker: "What we deliver",
      heading: "Front, back, and everything between.",
      steps: [
        { title: "Custom & web app development", body: "Bespoke websites and web applications built around your workflow." },
        { title: "eCommerce & portals", body: "Storefronts and web portals tuned for transactions and members." },
        { title: "UI/UX web design", body: "Conversion-led interfaces designed before a line of code is written." },
        { title: "Custom CMS development", body: "A content system your team actually wants to use." },
      ],
    },
    metricBand: [
      { value: "Frontend", label: "React, modern JS" },
      { value: "Backend", label: "PHP, Laravel, Python" },
      { value: "Fullstack", label: "End-to-end ownership" },
      { value: "ROI", label: "Built into the brief" },
    ],
    marqueeTitle: "Stack we reach for",
    marquee: ["PHP", "Laravel", "WordPress", "Shopify", "Magento", "Python", "React", "Node.js"],
    industries: ["E-commerce", "Healthcare", "Real Estate", "SaaS", "EdTech", "Fintech"],
    faqs: [
      { q: "What does a web development agency do?", a: "Everything from discovery and UX through build, launch, and support — turning a business goal into a fast, reliable website that performs." },
      { q: "How long does it take to build a website?", a: "A focused marketing site can ship in weeks; complex applications and storefronts run longer. We scope honestly up front." },
      { q: "How do I know which tech stack to use?", a: "We recommend based on your goals, team, and budget — and we'll happily work within an existing stack when it's the right fit." },
    ],
    showcase: {
      kicker: "Web experiences worth studying",
      heading: "The bar we build to.",
      sub: "A few sites we point to when we talk craft — tap any to open it live in a new tab.",
      sites: [
        { name: "Chilli Bomba", url: "https://www.chillibomba.com/", image: "/projects/showcase/chilli-bomba.jpg" },
        { name: "MoxieSozo", url: "https://moxiesozo.com/", image: "/projects/showcase/moxiesozo.jpg" },
        { name: "Locomotive", url: "https://locomotive.ca/" },
      ],
    },
  },
  {
    slug: "shopify",
    navLabel: "Shopify Development",
    navDescription: "Sell more, sell easily — responsive, customizable storefronts.",
    group: "Web Development",
    sourceUrl: "https://www.digitalotters.com/shopify-website-development/",
    swatch: "#22C55E",
    hue: "rgba(34,197,94,0.22)",
    eyebrow: "Shopify Development",
    title: "Best-in-class",
    highlight: "Shopify stores.",
    description:
      "Sell more, sell easily — with cross-continent sales and a powerful e-commerce website. Sale-focused Shopify development that generates high ROI through responsive, customizable themes and complete store solutions.",
    heroBadge: "Themes · Apps · Migration · Shopify Plus",
    heroStats: [
      { value: "ROI", label: "What we optimize for" },
      { value: "Custom", label: "Themes & apps" },
      { value: "Global", label: "Cross-continent selling" },
      { value: "24/7", label: "Maintenance & support" },
    ],
    overview: {
      kicker: "#1 Shopify development",
      heading: "A storefront engineered to convert, not just to launch.",
      body: "We build sale-focused Shopify stores that generate high ROI and maximum sales — responsive, customizable themes paired with the integrations, migrations, and apps a serious store needs to scale.",
    },
    offerings: [
      { title: "Beautiful, responsive themes", body: "Design-led, fully customizable themes built mobile-first." },
      { title: "E-store customization", body: "Tailored modifications that match how your customers actually shop." },
      { title: "Shopify theme development", body: "Custom themes from scratch when an off-the-shelf one won't cut it." },
      { title: "Migration services", body: "Move from any platform to Shopify without losing data or rankings." },
      { title: "Shopify app development", body: "Custom apps to extend your store with the functionality you need." },
      { title: "Maintenance & support", body: "Ongoing technical support so the store keeps selling." },
    ],
    process: {
      kicker: "Why Shopify",
      heading: "Scale easily on the platform built for commerce.",
      steps: [
        { title: "Integrations", body: "Connect payments, shipping, CRM, and marketing without the duct tape." },
        { title: "Migration", body: "Lift-and-shift from Magento, WooCommerce, or custom carts — cleanly." },
        { title: "Theme customization", body: "Bend a premium theme to your brand instead of fighting it." },
        { title: "Shopify Plus solutions", body: "Enterprise-grade builds for high-volume, multi-store brands." },
      ],
    },
    metricBand: [
      { value: "+", label: "Brands successfully launched" },
      { value: "+", label: "Countries served" },
      { value: "+", label: "Stores maintained" },
      { value: "%", label: "Client satisfaction rate" },
    ],
    marqueeTitle: "What we integrate",
    marquee: ["Shopify Plus", "Klaviyo", "Stripe", "Recharge", "Meta Shops", "Google Shopping", "Yotpo", "Gorgias"],
    industries: ["Fashion", "Beauty", "Home", "Electronics", "Food & Bev", "DTC Brands"],
    faqs: [
      { q: "Can you migrate my existing store to Shopify?", a: "Yes — products, customers, orders, and SEO equity all move across with a tested migration plan." },
      { q: "Custom theme or a premium one?", a: "Both are valid. We'll customize a premium theme when speed matters, or build bespoke when your brand demands it." },
      { q: "Do you support Shopify Plus?", a: "We do — including multi-store, scripts, and high-volume checkout customization." },
    ],
    showcase: {
      kicker: "Shopify storefronts worth studying",
      heading: "Shopify, done right.",
      sub: "Storefronts that set the bar for the stores we build — tap any to open it live in a new tab.",
      sites: [
        { name: "Popov Leather", url: "https://www.popovleather.com/", image: "/projects/showcase/popov-leather.jpg" },
        { name: "Suta", url: "https://suta.in/", image: "/projects/showcase/suta.jpg" },
        { name: "Ridge", url: "https://ridge.com/", image: "/projects/showcase/ridge.jpg" },
        { name: "Beechtree", url: "https://beechtree.pk/", image: "/projects/showcase/beechtree.jpg" },
        { name: "Sapphire", url: "https://pk.sapphireonline.pk/", image: "/projects/showcase/sapphire.jpg" },
        { name: "Zeen Woman", url: "https://zeenwoman.com/", image: "/projects/showcase/zeen-woman.jpg" },
        { name: "Bica Coffee", url: "https://www.bicacoffee.com/", image: "/projects/showcase/bica-coffee.jpg" },
      ],
    },
  },
  {
    slug: "wordpress",
    navLabel: "WordPress Development",
    navDescription: "Custom, responsive, SEO-friendly WordPress that converts.",
    group: "Web Development",
    sourceUrl: "https://www.digitalotters.com/wordpress-development-services-agency/",
    swatch: "#3B82F6",
    hue: "rgba(59,130,246,0.22)",
    eyebrow: "WordPress Development",
    title: "Custom WordPress,",
    highlight: "built around your brand.",
    description:
      "We specialize in custom WordPress development — tailored websites that align perfectly with your brand and business goals. Unique, responsive, and SEO-friendly sites designed to engage audiences and drive conversions.",
    heroBadge: "Themes · Plugins · WooCommerce",
    heroStats: [
      { value: "350+", label: "Websites maintained monthly" },
      { value: "500+", label: "WordPress SEO specialists" },
      { value: "$10M+", label: "In revenue powered" },
      { value: "12yr", label: "Combined expertise" },
    ],
    overview: {
      kicker: "Why custom WordPress",
      heading: "Personalized, not a recycled template.",
      body: "We craft unique, responsive, and SEO-friendly WordPress sites built to engage audiences and drive conversions — fully personalized websites with the latest features, owned by your team after handover.",
    },
    offerings: [
      { title: "WordPress website design", body: "A customized approach from first design through deployment." },
      { title: "Custom WordPress development", body: "End-to-end web application development using progressive techniques." },
      { title: "WordPress plugin development", body: "Custom plugins for exactly the functionality you need." },
      { title: "Theme customization", body: "Tailored theme modifications that fit your brand precisely." },
      { title: "WordPress e-commerce", body: "Sales-optimized WooCommerce stores built to scale." },
      { title: "Maintenance & support", body: "Ongoing security, speed, and content updates." },
    ],
    process: {
      kicker: "Our four-step process",
      heading: "Create → optimize → extend → earn.",
      steps: [
        { title: "Create the site", body: "Design and build a responsive, on-brand WordPress site." },
        { title: "Build for SEO", body: "Structure, speed, and metadata tuned to rank from day one." },
        { title: "Install plugins", body: "Extend functionality with the right plugins, configured properly." },
        { title: "Generate revenue", body: "Optimize the experience so traffic turns into conversions." },
      ],
    },
    metricBand: [
      { value: "20+", label: "Cybersecurity professionals" },
      { value: "350+", label: "Websites maintained / month" },
      { value: "$10M+", label: "Revenue powered" },
      { value: "12yr", label: "Combined expertise" },
    ],
    marqueeTitle: "Technology stack",
    marquee: ["WordPress", "WooCommerce", "Elementor", "ACF", "PHP", "MySQL", "Yoast", "Cloudflare"],
    industries: ["E-commerce", "Healthcare", "Real Estate", "Education", "Nonprofit", "Hospitality"],
    faqs: [
      { q: "Will I be able to edit the site myself?", a: "Yes. We build with editor-friendly tooling and hand over training so your team can manage content without us." },
      { q: "Is WordPress secure enough for business?", a: "When it's built and maintained properly — yes. Security hardening and ongoing patching are part of every engagement." },
      { q: "Can you build an online store on WordPress?", a: "Absolutely — WooCommerce stores tuned for speed, SEO, and conversions." },
    ],
  },
  {
    slug: "nodejs",
    navLabel: "Node JS Development",
    navDescription: "High-performance, real-time apps with the best Node.js developers.",
    group: "Web Development",
    sourceUrl: "https://www.digitalotters.com/node-js-development-company/",
    swatch: "#84CC16",
    hue: "rgba(132,204,22,0.22)",
    eyebrow: "Node.js Development",
    title: "Real-time apps,",
    highlight: "engineered to scale.",
    description:
      "Unlock the potential of your web projects by hiring the best Node.js developers. Flexible engagement models, agile delivery, and feature-rich, high-performance web applications.",
    heroBadge: "Real-time · APIs · SPAs · Microservices",
    heroStats: [
      { value: "10yr+", label: "Node.js experience" },
      { value: "Real-time", label: "By default" },
      { value: "Agile", label: "Delivery model" },
      { value: "Flexible", label: "Full-time or hourly" },
    ],
    overview: {
      kicker: "Why Node.js",
      heading: "When the app needs to be fast and live.",
      body: "We offer flexible engagement models and agile delivery focused on high-performance web applications — from real-time dashboards to APIs serving thousands of brands, startups, and corporations globally.",
    },
    offerings: [
      { title: "Real-time applications", body: "Chat apps, collaborative tools, and live dashboards with instant updates." },
      { title: "Single Page Applications", body: "Fast, engaging experiences with dynamic, app-like content." },
      { title: "APIs", body: "Robust APIs powering data insights and user engagement." },
      { title: "Data streaming apps", body: "Real-time visualization and trend identification at scale." },
      { title: "E-commerce development", body: "Scalable platforms that handle high-traffic spikes calmly." },
      { title: "Content management systems", body: "Custom CMS with clean, user-friendly interfaces." },
    ],
    process: {
      kicker: "Beyond build",
      heading: "Consulting, dashboards, and chains.",
      steps: [
        { title: "Node.js consulting", body: "Performance assessment, architecture evaluation, and deployment review." },
        { title: "Web development", body: "Full-stack, microservices, DevOps, and database integration." },
        { title: "Back-end dashboards", body: "Operational dashboards that make your data actionable." },
        { title: "Blockchain app development", body: "Decentralized application development when the use case fits." },
      ],
    },
    metricBand: [
      { value: "Microservices", label: "Architecture-ready" },
      { value: "DevOps", label: "Built in" },
      { value: "Global", label: "Clients served" },
      { value: "Agile", label: "Sprint cadence" },
    ],
    marqueeTitle: "Stack & tooling",
    marquee: ["Node.js", "Express", "NestJS", "React", "Socket.IO", "MongoDB", "PostgreSQL", "Docker"],
    industries: ["Fintech", "SaaS", "Logistics", "Media", "Gaming", "Healthcare"],
    faqs: [
      { q: "Can I hire developers full-time or hourly?", a: "Both. We offer flexible engagement models so you can scale the team up or down as the roadmap changes." },
      { q: "Is Node.js good for real-time features?", a: "It's one of the best choices for it — chat, live dashboards, and streaming all play to Node's strengths." },
      { q: "Do you handle DevOps and deployment?", a: "Yes — CI/CD, containerization, and cloud deployment are part of the delivery." },
    ],
  },
  {
    slug: "website-maintenance",
    navLabel: "Website Maintenance",
    navDescription: "Security, speed, and support — an experience free of frustration.",
    group: "Web Development",
    sourceUrl: "https://www.digitalotters.com/website-maintenance-security-support-services/",
    swatch: "#F59E0B",
    hue: "rgba(245,158,11,0.22)",
    eyebrow: "Maintenance, Security & Support",
    title: "Hacked, slow, broken?",
    highlight: "Not on our watch.",
    description:
      "Frustrated with hacked and slow websites full of issues? Digital Otters brings an experience free of frustration — comprehensive maintenance and security that keeps your site fast, secure, and online.",
    heroBadge: "Updates · Security · Hosting · Support",
    heroStats: [
      { value: "30+", label: "Cybersecurity professionals" },
      { value: "350+", label: "Websites maintained monthly" },
      { value: "100%", label: "Guaranteed satisfaction" },
      { value: "$10M+", label: "Client revenue protected" },
    ],
    overview: {
      kicker: "Why maintenance matters",
      heading: "A website is a living thing. We keep it healthy.",
      body: "We ensure your website stays functional and secure through comprehensive maintenance — security patches, content updates, speed, uptime, and a support team that picks up when something breaks.",
    },
    offerings: [
      { title: "Regular updates", body: "Security patches, content changes, speed tuning, and uptime management." },
      { title: "Tech support", body: "Email setup, navigation changes, form creation, and consulting on request." },
      { title: "WordPress maintenance", body: "Security, speed, uptime, content/image updates, and plugin management." },
      { title: "Malware removal", body: "Malicious code detected and removed by cybersecurity experts." },
      { title: "Secured web hosting", body: "Investment-backed security measures for reliable, fast hosting." },
    ],
    metricBand: [
      { value: "30+", label: "Security professionals" },
      { value: "350+", label: "Sites maintained / month" },
      { value: "$10M+", label: "Client revenue powered" },
      { value: "100%", label: "Satisfaction guarantee" },
    ],
    packages: [
      { name: "Basic Care+", price: "$199/mo", blurb: "For small sites that just need to stay healthy.", features: ["Up to 10 pages", "Basic updates", "Security monitoring", "Uptime management"] },
      { name: "Core Guard", price: "$399/mo", blurb: "For growing sites with regular content needs.", features: ["Up to 50 pages", "6 hrs content updates", "Security + backups", "Priority support"], featured: true },
      { name: "Pro Support", price: "$799/mo", blurb: "For busy sites that change often.", features: ["Up to 100 pages", "12 hrs content updates", "Malware response", "Performance tuning"] },
      { name: "Max Master", price: "$1,850/mo", blurb: "For large, mission-critical websites.", features: ["Up to 500 pages", "36 hrs content updates", "Dedicated engineer", "SLA-backed response"] },
    ],
    industries: ["E-commerce", "Healthcare", "Corporate", "Education", "SaaS", "Hospitality"],
    faqs: [
      { q: "What's included in a maintenance plan?", a: "Security patches, backups, uptime monitoring, speed tuning, and a bucket of content-update hours scaled to your plan." },
      { q: "Can you clean up a hacked site?", a: "Yes — our cybersecurity team detects and removes malware, then hardens the site so it doesn't happen again." },
      { q: "Do you maintain non-WordPress sites?", a: "We do — maintenance and support span multiple platforms, not just WordPress." },
    ],
  },

  // ─────────────────────────────────────────────────────── Paid Media
  {
    slug: "paid-ads",
    navLabel: "Paid Ads Management",
    navDescription: "Result-oriented PPC across every platform that matters.",
    group: "Paid Media",
    sourceUrl: "https://www.digitalotters.com/ppc-paid-ads-management-services-agency/",
    swatch: "#EF4444",
    hue: "rgba(239,68,68,0.22)",
    eyebrow: "PPC & Paid Ads Management",
    title: "Paid ads that",
    highlight: "return on spend.",
    description:
      "Increase your sales and leads with a 20% lift in ROI from result-oriented PPC and paid ads management. A full-service team optimizing return on ad spend for clients across every industry.",
    heroBadge: "Google · Meta · TikTok · LinkedIn · Amazon",
    heroStats: [
      { value: "+20%", label: "ROI lift target" },
      { value: "97%", label: "Client retention rate" },
      { value: "30yr+", label: "Combined team experience" },
      { value: "12+", label: "Ad platforms managed" },
    ],
    overview: {
      kicker: "Why PPC",
      heading: "Every other agency wants more budget. We want a better return.",
      body: "As a comprehensive PPC management firm, we deliver optimal return on ad spend across industries — clean tracking before a dollar is spent, sharp creative, and relentless testing that scales winners and kills losers.",
    },
    offerings: [
      { title: "Google Ads", body: "Search that captures billions of daily queries and high-intent traffic." },
      { title: "Google Shopping", body: "Product-led ads with images, titles, and prices that convert browsers." },
      { title: "Meta Ads", body: "Facebook and Instagram campaigns run by a specialized paid-social team." },
      { title: "LinkedIn Ads", body: "Precise B2B targeting across a professional audience of 645M+." },
      { title: "TikTok & Snapchat Ads", body: "Gen Z reach and impulse-buy engagement at massive scale." },
      { title: "Amazon, YouTube, Bing & more", body: "Marketplace, video, and search coverage wherever your buyers are." },
    ],
    process: {
      kicker: "Easy setup & management",
      heading: "A four-stage loop that compounds.",
      steps: [
        { title: "Strategize", body: "Buyer personas, targeting, demographics, and positioning defined first." },
        { title: "Design", body: "Ad copy and creative built to match exactly what the audience needs to see." },
        { title: "A/B test", body: "Campaigns validated across audiences and creative before we scale spend." },
        { title: "Scale", body: "Budget expanded with retargeting and lookalikes — while ROAS holds." },
      ],
    },
    metricBand: [
      { value: "ROAS", label: "The metric we optimize" },
      { value: "Weekly", label: "Creative iteration" },
      { value: "Full-funnel", label: "Awareness → convert" },
      { value: "Live", label: "Performance dashboard" },
    ],
    marqueeTitle: "Platforms we run",
    marquee: ["Google Ads", "Meta", "LinkedIn", "TikTok", "Snapchat", "Amazon", "YouTube", "Bing", "Twitter / X", "WhatsApp"],
    industries: ["E-commerce", "SaaS", "Real Estate", "Healthcare", "Finance", "Local Services"],
    faqs: [
      { q: "What is PPC?", a: "Pay-per-click advertising — you pay only when someone clicks your ad. Done right, it's the fastest way to put your offer in front of high-intent buyers." },
      { q: "Why invest in PPC management?", a: "Because the platforms reward expertise. Clean tracking, structured testing, and weekly optimization are the difference between burning budget and scaling profitably." },
      { q: "How much do your services cost?", a: "Management fees scale with ad spend and complexity. We scope transparently and optimize for your pipeline, not our invoice." },
    ],
  },

  // ─────────────────────────────────────────── Web Development · Mobile
  {
    slug: "mobile-apps",
    navLabel: "Mobile Apps",
    navDescription: "Native iOS, Android & cross-platform apps that feel native.",
    group: "Web Development",
    sourceUrl: "https://www.digitalotters.com/mobile-app-development/",
    swatch: "#6C8CFF",
    hue: "rgba(108,140,255,0.22)",
    eyebrow: "Mobile App Development",
    title: "Mobile apps that",
    highlight: "feel native.",
    description:
      "iOS, Android, and cross-platform apps engineered to pass store review on day one — with the polish, offline behavior, and animation users expect from a category-leading product.",
    heroBadge: "iOS · Android · React Native · Flutter",
    heroStats: [
      { value: "2", label: "Stores, one codebase option" },
      { value: "60fps", label: "Animation target" },
      { value: "Offline", label: "First-class by default" },
      { value: "4.8★", label: "Store-quality polish" },
    ],
    overview: {
      kicker: "What is mobile app development",
      heading: "Mobile is unforgiving. We sweat the details users feel.",
      body: "A janky scroll, a missed offline state, a confused permissions prompt — and you lose the user. We build apps the right way: native where it counts, cross-platform where it pays, and tested on real devices before a single store submission.",
    },
    offerings: [
      { title: "iOS App Development", body: "Native Swift builds tuned for the App Store, from iPhone to iPad." },
      { title: "Android App Development", body: "Native Kotlin apps built to thrive across the Android device landscape." },
      { title: "Cross-Platform Apps", body: "One React Native or Flutter codebase shipping to both stores at once." },
      { title: "App UI/UX Design", body: "Flows, motion, and micro-interactions designed for thumbs, not cursors." },
      { title: "Offline, Sync & Push", body: "Offline-first data, conflict resolution, deep linking, and push from day one." },
      { title: "Store Launch & ASO", body: "Submission, review responses, screenshots, and app-store optimization handled end to end." },
    ],
    process: {
      kicker: "How we ship apps",
      heading: "From idea to the store, demoed every Friday.",
      steps: [
        { title: "Platform call", body: "Native vs cross-platform — we make the right call for your team, in writing, in week one." },
        { title: "Foundation sprint", body: "Auth, navigation, design system, and the first end-to-end happy path." },
        { title: "Feature sprints", body: "TestFlight and Play Internal builds every week, with demos you can actually tap." },
        { title: "Store submission", body: "We file the review, handle rejections, and ship the v1.0 launch build." },
      ],
    },
    metricBand: [
      { value: "Native", label: "Where performance matters" },
      { value: "OTA", label: "Updates without a resubmit" },
      { value: "Crash-free", label: "Monitoring from launch" },
      { value: "Weekly", label: "Builds in your hands" },
    ],
    packages: [
      { name: "App MVP", blurb: "For founders validating a mobile product fast.", features: ["Single platform or cross-platform", "Core happy-path features", "Store submission included", "30-day launch support"] },
      { name: "App Pro", featured: true, blurb: "For teams shipping a polished v1.", features: ["iOS + Android", "Offline sync & push", "Analytics & crash reporting", "ASO and launch assets"] },
      { name: "App Scale", blurb: "For products growing past the first release.", features: ["Native modules where needed", "OTA update pipeline", "A/B and feature flags", "Ongoing retainer support"] },
    ],
    marqueeTitle: "Stacks we build on",
    marquee: ["Swift", "Kotlin", "React Native", "Flutter", "Expo", "Firebase", "Sentry", "Amplitude", "App Store", "Google Play"],
    industries: ["E-commerce", "Healthcare", "Fintech", "Logistics", "Education", "Social"],
    faqs: [
      { q: "React Native or native?", a: "It depends on team size, performance ceiling, and native-API needs. We make a recommendation in week one, in writing — and we're fluent in both." },
      { q: "Do you handle the App Store submission?", a: "Yes. Provisioning, screenshots, review responses, and ASO — the whole pipeline, including resubmits if Apple or Google push back." },
      { q: "Does the app work offline?", a: "By default. We design data models with conflict resolution from day one, not as an afterthought bolted on later." },
    ],
  },

  // ──────────────────────────────────────────────────────────── Creative
  {
    slug: "graphic-design",
    navLabel: "Graphic Design",
    navDescription: "Brand identity, creative, and assets that stop the scroll.",
    group: "Creative",
    sourceUrl: "https://www.digitalotters.com/graphic-design/",
    swatch: "#F472B6",
    hue: "rgba(244,114,182,0.22)",
    eyebrow: "Graphic Design",
    title: "Design that",
    highlight: "stops the scroll.",
    description:
      "Logos, brand systems, ad creative, and social assets designed with intent — built to look sharp everywhere from a billboard to a feed thumbnail, and to convert attention into action.",
    heroBadge: "Brand · Social · Ads · Print",
    heroStats: [
      { value: "0.05s", label: "To make a first impression" },
      { value: "All-format", label: "Designed once, fits everywhere" },
      { value: "Source", label: "Editable files, always yours" },
      { value: "2", label: "Concept directions per brief" },
    ],
    overview: {
      kicker: "What is graphic design",
      heading: "Design isn't decoration — it's the first thing you're judged on.",
      body: "Before a word is read, a brand is judged on how it looks. We build identity systems and creative that stay consistent across every surface — so the brand shows up sharp whether it's a billboard, a pitch deck, or a feed thumbnail.",
    },
    offerings: [
      { title: "Logo & Brand Identity", body: "Marks, color, type, and full brand guidelines that scale across every touchpoint." },
      { title: "Social Media Creative", body: "Post, story, and reel templates that keep the feed on-brand and on-message." },
      { title: "Ad & Display Creative", body: "Banners, display sets, and ad creative built and tested to convert." },
      { title: "Pitch Decks & Collateral", body: "Decks, one-pagers, and print collateral that make the brand look serious." },
      { title: "Packaging & Print", body: "Print-ready packaging, signage, and merch designed to spec." },
      { title: "Motion & Animated Assets", body: "Animated logos, motion graphics, and short-form video for feeds and ads." },
    ],
    process: {
      kicker: "How we design",
      heading: "Direction agreed before a single pixel moves.",
      steps: [
        { title: "Brief & moodboard", body: "We learn the brand, audience, and goal — then align on direction up front." },
        { title: "Concepts", body: "Two to three distinct directions, not twenty safe variations of one idea." },
        { title: "Refine", body: "We tighten the chosen route across every format it needs to live in." },
        { title: "Handover", body: "Editable source files, exports, and a guideline doc your team can run with." },
      ],
    },
    metricBand: [
      { value: "On-brand", label: "Every asset, every surface" },
      { value: "Source", label: "Editable files handed over" },
      { value: "All-format", label: "Print to feed thumbnail" },
      { value: "Fast", label: "Turnarounds in days" },
    ],
    packages: [
      { name: "Brand Starter", blurb: "For new brands that need a sharp identity.", features: ["Logo + core identity", "Color & type system", "Basic brand guidelines", "Editable source files"] },
      { name: "Creative Pro", featured: true, blurb: "For brands shipping creative every week.", features: ["Full brand guidelines", "Social + ad templates", "Two revision rounds per asset", "Source files & usage kit"] },
      { name: "Creative Retainer", blurb: "For teams with an always-on creative pipeline.", features: ["Monthly creative scope", "Effectively unlimited revisions", "Motion & animated assets", "Priority turnaround"] },
    ],
    marqueeTitle: "Tools we design in",
    marquee: ["Figma", "Photoshop", "Illustrator", "After Effects", "InDesign", "Canva", "Lottie", "Procreate"],
    industries: ["E-commerce", "Real Estate", "Healthcare", "Hospitality", "Tech", "Corporate"],
    faqs: [
      { q: "Do we get the source files?", a: "Always. You own the editable Figma / Adobe files and the full export set — no lock-in, ever." },
      { q: "Can you match our existing brand?", a: "Yes. Send your guidelines and we'll work inside them, or help evolve them if they're feeling dated." },
      { q: "How many revisions are included?", a: "Project work includes two rounds per asset; retainers are effectively unlimited within the monthly scope." },
    ],
  },

  // ───────────────────────────────────────────────────────────── Tools
  {
    slug: "tools",
    navLabel: "Tools",
    navDescription: "Free AI, SEO, and web utilities for marketers and builders.",
    group: "Tools",
    sourceUrl: "https://tools.digitalotters.com/",
    swatch: "#8B5CF6",
    hue: "rgba(139,92,246,0.22)",
    eyebrow: "Free Online Tools",
    title: "Free AI, SEO &",
    highlight: "web utilities.",
    description:
      "A growing suite of free online tools — AI, SEO, and web utilities — from an agency delivering web, digital marketing, cloud, and performance-driven solutions. No signup, no catch.",
    heroBadge: "AI · SEO · Web · Free",
    heroStats: [
      { value: "5", label: "Free tools live" },
      { value: "$0", label: "Cost to use" },
      { value: "No", label: "Signup required" },
      { value: "Web", label: "Runs in your browser" },
    ],
    overview: {
      kicker: "Why we build free tools",
      heading: "Useful first. The pitch comes later.",
      body: "We ship free utilities that marketers and builders actually reach for — quick, no-signup tools for the everyday jobs of optimizing a site, shipping creative, and checking your work.",
    },
    offerings: [
      { title: "SEO Checker", body: "Analyze and evaluate a website's SEO performance and surface optimization opportunities." },
      { title: "Compress Images", body: "Shrink image file sizes while preserving quality for faster pages." },
      { title: "QR Generator", body: "Create QR codes for campaigns, packaging, and print in seconds." },
      { title: "WhatsApp Widget", body: "Build a customizable WhatsApp chat widget for your website." },
      { title: "AI Bot Checker", body: "Detect AI-generated content and identify likely bot activity." },
    ],
    metricBand: [
      { value: "AI", label: "Detection utilities" },
      { value: "SEO", label: "Audit & checks" },
      { value: "Media", label: "Image optimization" },
      { value: "Comms", label: "Widgets & QR" },
    ],
    faqs: [
      { q: "Are these tools really free?", a: "Yes — all of them, with no signup. They're our way of being useful before we ever talk about an engagement." },
      { q: "Do I need an account?", a: "No account, no email gate. Open the tool and use it." },
      { q: "Can you build a custom tool for my team?", a: "We can — internal tools and utilities are part of what our web and cloud teams do." },
    ],
  },
];

export function getPortfolioPage(slug: string): PortfolioPage | undefined {
  return PORTFOLIO_PAGES.find((p) => p.slug === slug);
}

/** Representative thumbnail per portfolio page (locally hosted, themed photos). */
export const PORTFOLIO_THUMBS: Record<string, string> = {
  "social-media-management": "/projects/portfolio/social-media-management.jpg",
  "seo-services": "/projects/portfolio/seo-services.jpg",
  "reputation-management": "/projects/portfolio/reputation-management.jpg",
  "web-development": "/projects/portfolio/web-development.jpg",
  shopify: "/projects/portfolio/shopify.jpg",
  wordpress: "/projects/portfolio/wordpress.jpg",
  nodejs: "/projects/portfolio/nodejs.jpg",
  "website-maintenance": "/projects/portfolio/website-maintenance.jpg",
  "mobile-apps": "/projects/portfolio/mobile-apps.jpg",
  "graphic-design": "/projects/portfolio/graphic-design.jpg",
  "paid-ads": "/projects/portfolio/paid-ads.jpg",
  tools: "/projects/portfolio/tools.jpg",
};

export function getPortfolioThumb(slug: string): string | undefined {
  return PORTFOLIO_THUMBS[slug];
}

// ───────────────────────────────────────────────────────────────────────────
// Faithful Digital Otters section data.
//
// The DO service pages share a recognizable structure: a "recognized by" badge
// strip under the hero, alternating image/text feature rows that deep-dive the
// offering, and a shared "Why Choose Digital Otters" grid. These are recreated
// here (recolored to the Codlinx palette at render time).

/** Badge strip shown under every hero — the "Recognized by" row on DO. */
export const RECOGNIZED: string[] = [
  "Google Partner",
  "Meta Business Partner",
  "Semrush Certified",
  "Trustpilot",
  "GoodFirms",
  "Clutch",
];

/** Shared "Why Choose Digital Otters" reasons — DO reuses these across pages. */
export const WHY_CHOOSE: { title: string; body: string; icon: string }[] = [
  { icon: "team", title: "A senior, expert team", body: "Specialists who've shipped this work before — not juniors learning on your budget." },
  { icon: "data", title: "Data-driven approach", body: "Every decision is tied to a number. We measure, learn, and double down on what works." },
  { icon: "report", title: "Transparent reporting", body: "Clear monthly reporting on the metrics that matter — no vanity dashboards." },
  { icon: "strategy", title: "Strategies built for you", body: "Fully customized to your brand, market, and goals — never a recycled template." },
  { icon: "results", title: "Result-oriented", body: "We optimize for outcomes — rankings, leads, revenue — not activity for its own sake." },
  { icon: "support", title: "Dedicated support", body: "A responsive team that picks up when you need them, on the channels you use." },
];

export type FeatureRow = { title: string; body: string; bullets: string[] };

/** Alternating text/visual deep-dive rows — DO's signature mid-page sections. */
export const FEATURE_ROWS: Record<string, FeatureRow[]> = {
  "social-media-management": [
    { title: "Every platform, managed end to end", body: "We run each network as its own channel — calendar, creative, scheduling, and community — so the brand shows up consistently everywhere your audience is.", bullets: ["Monthly content calendar approved before publishing", "On-brand creative for every post and story", "Daily community management and DM responses"] },
    { title: "Organic and paid, working together", body: "Organic builds the brand and the community; paid amplifies what's already resonating. Run together, each makes the other cheaper.", bullets: ["Organic growth + paid amplification in one plan", "Audience and creative testing across networks", "Monthly growth reporting with clear next steps"] },
  ],
  "seo-services": [
    { title: "Technical SEO that crawls clean", body: "We fix the foundation first — Core Web Vitals, crawlability, schema, and meta structure — so everything you publish has a fair chance to rank.", bullets: ["Full technical audit and Core Web Vitals fixes", "Schema, meta, and site-structure optimization", "Crawl-error and indexation cleanup"] },
    { title: "Content & authority that compounds", body: "Content mapped to buyer intent, backed by high-tier editorial links. Traffic that compounds month over month instead of spiking and fading.", bullets: ["Keyword-to-intent mapping and content briefs", "High-tier, editorial link building only", "Generative Engine Optimization for AI search"] },
  ],
  "reputation-management": [
    { title: "Combat misinformation, rebuild trust", body: "We identify what's hurting your brand and address it at the source — then rebuild consumer confidence with positive, credible coverage.", bullets: ["Negative content identification and mitigation", "Legal removals of libelous statements", "Positive PR publications and link building"] },
    { title: "Own page one of your results", body: "Owned profiles and positive content, built and ranked to occupy the search results people see first.", bullets: ["Powerful, ranked social presence", "SERP revival and local citation strategy", "Spam-link flagging and negative delisting"] },
  ],
  "web-development": [
    { title: "Frontend, backend, full-stack", body: "From pixel-perfect interfaces to durable backend services, we own the whole stack — or slot into yours where it makes sense.", bullets: ["Frontend in modern JavaScript and React", "Backend in PHP, Laravel, and Python", "Full-stack ownership end to end"] },
    { title: "eCommerce, portals & custom CMS", body: "Storefronts, members' portals, and content systems your team actually wants to use — all built to convert and to last.", bullets: ["eCommerce and web-portal development", "Custom CMS your team can own", "UI/UX designed before a line of code"] },
  ],
  shopify: [
    { title: "Maximize your sales", body: "Sale-focused stores built to convert — responsive themes, clean checkout, and the integrations a serious store needs to scale.", bullets: ["Responsive, customizable theme development", "Conversion-tuned checkout and storefront", "Payments, shipping, and marketing integrations"] },
    { title: "Scale easily with Shopify Plus", body: "When volume grows, the store keeps up — enterprise-grade builds, migrations, and custom apps for high-volume brands.", bullets: ["Shopify Plus and multi-store solutions", "Migration from any platform, SEO intact", "Custom Shopify app development"] },
  ],
  wordpress: [
    { title: "Custom themes & plugins", body: "Unique, responsive, SEO-friendly sites with exactly the functionality you need — built on progressive techniques, not recycled templates.", bullets: ["Custom theme design and development", "Bespoke plugin development", "SEO-friendly structure from day one"] },
    { title: "WooCommerce that converts", body: "Sales-optimized online stores on WordPress, hardened for security and tuned for speed.", bullets: ["WooCommerce stores built to scale", "Security hardening and ongoing patching", "Editor-friendly handover and training"] },
  ],
  nodejs: [
    { title: "Real-time & streaming apps", body: "Chat, live dashboards, and data streaming where instant updates matter — playing directly to Node's strengths.", bullets: ["Real-time apps and live dashboards", "Single Page Applications (SPAs)", "Data streaming and visualization"] },
    { title: "Microservices, APIs & DevOps", body: "Scalable architectures and robust APIs, delivered agile, with CI/CD and cloud deployment built in.", bullets: ["Microservices and API development", "Full DevOps and CI/CD pipelines", "Flexible full-time or hourly engagement"] },
  ],
  "website-maintenance": [
    { title: "Security & malware protection", body: "Cybersecurity professionals detect and remove malicious code, then harden the site so it doesn't happen again.", bullets: ["Malware detection and removal", "Security patches and backups", "Hardening against future attacks"] },
    { title: "Speed, uptime & support", body: "Regular updates, performance tuning, and a support team that picks up when something breaks.", bullets: ["Content updates and uptime management", "Speed and performance tuning", "Email setup, forms, and tech support"] },
  ],
  "paid-ads": [
    { title: "Search engine marketing", body: "High-intent search and shopping campaigns across Google, Bing, and Amazon — captured the moment buyers are looking.", bullets: ["Google Ads and Google Shopping", "Bing and Amazon marketplace ads", "Clean conversion tracking before launch"] },
    { title: "Social media advertising", body: "Full-funnel paid social with relentless creative testing — kill the losers, scale the winners, hold the ROAS.", bullets: ["Meta, TikTok, Snapchat, and LinkedIn", "Structured audience and creative testing", "Weekly bid, budget, and creative iteration"] },
  ],
  tools: [
    { title: "Built for marketers and builders", body: "Quick, no-signup utilities for the everyday jobs of optimizing a site, shipping creative, and checking your work.", bullets: ["SEO checks and image compression", "QR codes and WhatsApp widgets", "AI and bot detection"] },
    { title: "Free, with no catch", body: "All of our tools are free to use, right in the browser — our way of being useful before we ever talk about an engagement.", bullets: ["No account, no email gate", "Runs entirely in your browser", "Custom internal tools available on request"] },
  ],
};

export function getFeatureRows(slug: string): FeatureRow[] {
  return FEATURE_ROWS[slug] ?? [];
}

export type PortfolioNavLink = {
  label: string;
  href: string;
  description: string;
  /** Nested flyout sub-links (e.g. Portfolio › Web Development). */
  children?: PortfolioNavLink[];
};

/**
 * Nav-link list for the Codlinx navbar Portfolio dropdown.
 * Curated to the six core categories, in this exact order. Other portfolio
 * pages still exist and render — they're just not surfaced in the dropdown.
 */
const PORTFOLIO_NAV_SLUGS = [
  "web-development", // "Websites" — expands into the web-dev sub-pages
  "mobile-apps",
  "social-media-management", // "Social Media"
  "paid-ads", // "Paid Ads"
  "graphic-design",
  "seo-services", // "SEO"
] as const;

/** Sub-pages nested under "Web Development" (Node JS intentionally omitted). */
const WEB_DEV_CHILD_SLUGS = [
  "web-development",
  "shopify",
  "wordpress",
  "website-maintenance",
] as const;

function navLinkFor(slug: string): PortfolioNavLink {
  const p = PORTFOLIO_PAGES.find((page) => page.slug === slug)!;
  return {
    label: p.navLabel,
    href: `/portfolio/${p.slug}`,
    description: p.navDescription,
  };
}

export const PORTFOLIO_NAV: PortfolioNavLink[] = PORTFOLIO_NAV_SLUGS.map(
  (slug) => {
    const base = navLinkFor(slug);
    if (slug === "web-development") {
      return { ...base, children: WEB_DEV_CHILD_SLUGS.map(navLinkFor) };
    }
    return base;
  }
);

/** Grouped for the landing page, mirroring the Digital Otters menu structure. */
export const PORTFOLIO_GROUPS: { group: PortfolioGroup; pages: PortfolioPage[] }[] = (
  ["Social", "AI & Search Visibility", "Web Development", "Creative", "Paid Media", "Tools"] as PortfolioGroup[]
).map((group) => ({
  group,
  pages: PORTFOLIO_PAGES.filter((p) => p.group === group),
}));
