import type {
  AvailabilityWindow,
  BlockedSlot,
  BlogPostRow,
  CareerPostingRow,
  Meeting,
} from "./types";

/**
 * Demo-mode in-memory store. Persists only for the lifetime of the server
 * process — refresh on dev reload starts fresh. Used when Supabase env vars
 * aren't set so the auth/admin/booking UI can still be previewed.
 */

const PROCESS_KEY = "__codlinx_demo_store__";

type DemoData = {
  meetings: Meeting[];
  availability: AvailabilityWindow[];
  blockedSlots: BlockedSlot[];
  blog: BlogPostRow[];
  careers: CareerPostingRow[];
};

declare global {
  // eslint-disable-next-line no-var
  var __codlinx_demo_store__: DemoData | undefined;
}

function isoIn(daysFromNow: number, hour: number, minute = 0) {
  const d = new Date();
  d.setDate(d.getDate() + daysFromNow);
  d.setHours(hour, minute, 0, 0);
  return d.toISOString();
}

function isoAddMin(iso: string, mins: number) {
  return new Date(new Date(iso).getTime() + mins * 60_000).toISOString();
}

type BlogSeed = {
  slug: string;
  title: string;
  excerpt: string;
  body: string;
  category: string;
  read_time: string;
  author: string;
  author_role: string;
  hue: string;
  cover_image: string;
  published_at: string;
};

const BLOG_SEEDS: BlogSeed[] = [
  {
    slug: "opus-4-7-and-the-year-of-long-running-agents",
    title: "Opus 4.7 and the year long-running agents finally worked.",
    excerpt:
      "Anthropic's Opus 4.7 just shipped with a 1M token context window and 12-hour autonomous task budgets. Here's what changes for product teams in 2026.",
    body: "Anthropic released Claude Opus 4.7 with a million-token context window and the ability to run autonomous coding and research tasks for up to twelve hours. For the first time, a frontier model can hold an entire mid-sized codebase in its working memory and act on it without a human re-prompting every few minutes.\nThe practical implication is bigger than the benchmark gain. A year ago, agent products needed elaborate retrieval pipelines, summarisation chains, and prompt rewrites to survive past a few thousand tokens. Most of that scaffolding is now an anti-pattern. Pull the codebase in, point the agent at the goal, and let it work.\nWe migrated three internal automation tools off custom retrieval in the last six weeks. The simpler stacks ran 38% faster end-to-end and produced 12% fewer broken outputs. The lesson isn't that retrieval is dead — it's that we were retrieving around a constraint that no longer exists for code-bounded tasks.\nThe new constraint is observability. A twelve-hour run can quietly burn through a budget or wander into the wrong subgraph. Build tracing into the agent's tool calls from day one. Sample completed runs the way you'd sample production traffic. Treat each long run as a workload, not a prompt.\nIf you're starting a new agent product in mid-2026, you should not be writing retrieval logic before week three. Start with a long-context call, instrument heavily, and only add structure when the model demonstrably needs it.",
    category: "AI",
    read_time: "7 min read",
    author: "Raza Ahmed",
    author_role: "Head of AI Engineering",
    hue: "rgba(244,114,182,0.22)",
    cover_image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1600&q=80&auto=format&fit=crop",
    published_at: "2026-05-18",
  },
  {
    slug: "small-reasoning-models-eat-the-stack",
    title: "Small reasoning models are eating the agent stack.",
    excerpt:
      "DeepSeek-R2, Qwen3-Think, and the 8B reasoning class are doing 70% of the work for 5% of the cost. The architecture change you need to make.",
    body: "The most interesting model release of Q1 2026 wasn't from a frontier lab. It was the 8B-parameter reasoning models — DeepSeek-R2, Qwen3-Think, and a quietly competent batch of open-source distillations — that suddenly score within ten points of GPT-class models on math, code, and structured tool use.\nThat changes the economic shape of every agent product. Routing the easy 70% of requests to an 8B model running on a single H100 cuts inference cost by an order of magnitude. The remaining 30% — the genuinely hard, multi-hop, ambiguous-context tasks — still need frontier models, and that's fine. They're a smaller bill.\nThe architecture shift is a small-model-first router with a confidence-based escalation policy. The small model attempts the task, emits a confidence signal (or you score the output with a cheap classifier), and only failures get escalated. We've seen 60–80% cost reduction with no measurable quality regression on customer-facing chat, classification, and routine code edits.\nThe trap is benchmarking on the easy tier and assuming parity everywhere. Small models still collapse on long-horizon planning, ambiguous user intent, and any task requiring the model to know what it doesn't know. Score the escalation rate, not the average quality.\nIf your inference bill is the second-largest line on your infra spreadsheet, you have a routing problem, not a model problem.",
    category: "AI",
    read_time: "6 min read",
    author: "Raza Ahmed",
    author_role: "Head of AI Engineering",
    hue: "rgba(99,102,241,0.22)",
    cover_image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=1600&q=80&auto=format&fit=crop",
    published_at: "2026-05-06",
  },
  {
    slug: "vision-pro-2-enterprise-reality-check",
    title: "Vision Pro 2 in the enterprise: the honest reality check.",
    excerpt:
      "Apple's second-gen headset shipped lighter, cheaper, and with proper enterprise MDM. After six pilots, here's where it actually earns its keep — and where it doesn't.",
    body: "Apple's Vision Pro 2 arrived in March with the three things the first generation lacked: a price below three thousand dollars, a weight that doesn't trigger neck strain after an hour, and proper MDM support for fleet deployment. The hardware story has finally caught up to the marketing.\nWe ran six enterprise pilots between January and April. Two were unambiguous wins: field service for telecoms (remote expert overlay on physical hardware) and surgical planning (volumetric review of imaging). Both replaced an existing two-screen workflow with a single immersive one, and both saw measurable time savings within four weeks.\nThree were qualified successes: design review, executive dashboards, and warehouse picking. The first two work but face a 'meeting culture' problem — colleagues find it disorienting to talk to someone wearing a headset. The third works but requires hand-tracking calibration discipline that most warehouses haven't built.\nOne was a flat failure: customer-facing retail experiences. Users would rather use their phone. The novelty wears off in eleven seconds, on average.\nIf you're evaluating spatial computing in 2026, start where the alternative is meaningfully worse — multi-screen workflows, physical-context overlays, volumetric data. Don't pilot it where a phone is fine. The hardware is finally good enough; the use case still has to earn its weight.",
    category: "Engineering",
    read_time: "8 min read",
    author: "Daniel Reyes",
    author_role: "Principal Engineer",
    hue: "rgba(63,201,180,0.22)",
    cover_image: "https://images.unsplash.com/photo-1633613286848-e6f43bbafb8d?w=1600&q=80&auto=format&fit=crop",
    published_at: "2026-04-29",
  },
  {
    slug: "quantum-2026-reality-check",
    title: "Quantum computing in 2026: error correction is the story.",
    excerpt:
      "IBM, Google, and AWS shipped fault-tolerant quantum prototypes this quarter. What it actually means for cryptography, optimisation, and your product roadmap.",
    body: "Three labs crossed the fault-tolerance threshold in the first quarter of 2026. IBM Heron R3, Google's Willow successor, and AWS Ocelot all demonstrated logical qubits with error rates below the surface-code threshold — a milestone the field has been chasing for fifteen years.\nThat is not 'quantum supremacy in production.' It is the technical precondition for everything the field has promised. Useful quantum algorithms — Shor's, Grover's, the chemistry simulations that motivate the entire field — require thousands of logical qubits, and the prototypes are at single digits. The road from here to Shor-breaking RSA is still measured in years, not months.\nBut the cryptographic timeline just compressed. NIST's post-quantum standards (ML-KEM and ML-DSA) are now non-optional for anything you're shipping that needs to be secure past 2030. The 'harvest now, decrypt later' attack surface is real: encrypted traffic captured today can be decrypted retroactively once Shor-capable machines exist.\nThe practical 2026 move is not to invest in quantum applications. It's to migrate your TLS, your VPN, and your code-signing chain to post-quantum primitives. That work has a deadline that does not depend on your roadmap.\nWe're tracking the quantum advantage roadmap for chemistry and optimisation workloads on behalf of two clients. The honest answer for nearly every other industry is: not yet. Read the papers, attend the conferences, but build the post-quantum migration plan first.",
    category: "Engineering",
    read_time: "9 min read",
    author: "Noor Siddiqui",
    author_role: "Staff SRE",
    hue: "rgba(99,102,241,0.22)",
    cover_image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=1600&q=80&auto=format&fit=crop",
    published_at: "2026-04-22",
  },
  {
    slug: "rsc-finally-mainstream",
    title: "React Server Components are finally mainstream — and finally fast.",
    excerpt:
      "Next 16, React 19.2, and the Turbopack production builds we've been promised. Three things that quietly changed how we ship product code.",
    body: "React Server Components launched in 2022 with a lot of promise and a complicated developer experience. Three years later, in mid-2026, they finally feel like a default rather than an opt-in. The combination of Next 16's stable App Router, React 19.2's compiler, and Turbopack production builds shipping has done what no individual release could.\nThe quiet win is the React Compiler going on by default. Most of the manual `useMemo` and `useCallback` discipline that filled senior engineer time has evaporated. We migrated a 240-component app and removed 1,400 lines of memoisation noise with no measurable regression.\nThe louder win is the streaming server render model finally being legible to teams. The mental model — server components by default, client components when you need interactivity, suspense boundaries where data lives — clicks for new joiners in a couple of days now. In 2023, it took weeks.\nThe trap is treating RSC as a free LCP win. It's not. The data-fetching waterfall you avoid on the server can recreate itself on the client if your suspense boundaries are placed wrong. Profile under throttled network. Measure TTFB and INP separately. The compiler doesn't fix the architecture.\nIf you've been on the App Router for a year, the 16 upgrade is mostly free wins. If you've been deferring it, mid-2026 is the right moment. The ergonomics have caught up to the marketing.",
    category: "Engineering",
    read_time: "6 min read",
    author: "Daniel Reyes",
    author_role: "Principal Engineer",
    hue: "rgba(63,201,180,0.22)",
    cover_image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=1600&q=80&auto=format&fit=crop",
    published_at: "2026-04-14",
  },
  {
    slug: "wasm-component-model-2026",
    title: "WebAssembly's component model is the portable serverless we wanted.",
    excerpt:
      "The component model went 1.0 in February. Suddenly you can write a function in Rust, ship it to Fastly, Cloudflare, AWS, and your laptop — without rewriting.",
    body: "The WebAssembly Component Model hit 1.0 in February 2026 and the ecosystem moved fast. Fastly, Cloudflare, AWS Lambda, and Fermyon all shipped runtimes that consume the same `.wasm` artifact. For the first time, a serverless function written in Rust, Go, or Python can ship to four major clouds with no rewrite.\nThis isn't theoretical. We rebuilt a webhook processing service in Rust, compiled to a component, and deployed it simultaneously to Cloudflare Workers, AWS Lambda, and a self-hosted Fermyon cluster. Same artifact, three regions, identical behaviour. The portability story container orchestration promised in 2017 has finally arrived for stateless functions.\nThe cold-start numbers are what made it real for us. A 4MB Wasm component starts in roughly 5ms across all three runtimes — an order of magnitude faster than a Node.js Lambda, and competitive with a warm V8 isolate.\nThe limitations are real and worth naming. The component ecosystem outside Rust is still maturing — Python and JS components work but have larger artifacts and slower starts. Database drivers compiled to Wasm are a year behind their native counterparts. WASI Preview 2 covers most networking and filesystem needs but socket-level work still requires escape hatches.\nFor new serverless work in 2026, the right default is no longer 'pick the cloud's native runtime.' It's 'compile to a component and pick the cloud later.' Lock-in just became optional.",
    category: "Cloud",
    read_time: "7 min read",
    author: "Noor Siddiqui",
    author_role: "Staff SRE",
    hue: "rgba(251,191,36,0.22)",
    cover_image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1600&q=80&auto=format&fit=crop",
    published_at: "2026-04-07",
  },
  {
    slug: "open-source-llm-parity",
    title: "The open-source LLM gap closed faster than anyone predicted.",
    excerpt:
      "Llama 4, Mistral Large 3, and DeepSeek-V4 are within striking distance of the frontier on most benchmarks. What it means for self-hosted AI in production.",
    body: "Meta shipped Llama 4 in January. Mistral followed with Large 3 in March. DeepSeek's V4 dropped in April. By the end of Q1 2026, three open-weights models were within five benchmark points of GPT-class frontier models on most standard tasks — coding, multilingual reasoning, structured output.\nThe self-hosting case suddenly makes economic sense for any team doing more than $50K/month in inference. A two-H100 deployment running quantised Llama 4 70B handles roughly 200 concurrent users at human-readable latency, for a hardware cost that pays back in three months at frontier API rates.\nWhat self-hosting still doesn't buy you is the data privacy story you assume it does. The training data of an open-weights model is not, by default, auditable. If your compliance posture requires 'we can prove no client data was used in training,' you need a model trained from scratch on a curated corpus — and that is a different cost structure.\nThe one frontier capability still missing in open-weights is long-horizon agentic behaviour. Llama 4 and DeepSeek-V4 are excellent question-answer models. They are not yet excellent multi-tool-call planning models. If your product is RAG or chat, self-host. If your product is autonomous agents, the frontier APIs are still earning their keep.\nWe're now defaulting clients to a hybrid posture: open-weights for everything customer-facing, frontier API for internal automation. The savings are immediate; the engineering effort is two sprints at most.",
    category: "AI",
    read_time: "6 min read",
    author: "Raza Ahmed",
    author_role: "Head of AI Engineering",
    hue: "rgba(244,114,182,0.22)",
    cover_image: "https://images.unsplash.com/photo-1591453089816-0fbb971b454c?w=1600&q=80&auto=format&fit=crop",
    published_at: "2026-03-30",
  },
  {
    slug: "post-quantum-migration-2026",
    title: "Your post-quantum migration starts this quarter, not in 2030.",
    excerpt:
      "ML-KEM and ML-DSA are now the NIST defaults. Browser support is at 92%. If your TLS, VPN, or signing chain is still RSA-only, you're already behind.",
    body: "NIST finalised the post-quantum cryptography standards in late 2024. Eighteen months later, the ecosystem has caught up. Chrome, Firefox, and Safari ship hybrid post-quantum key exchange in TLS by default. Cloudflare, Akamai, and Fastly have it enabled at the edge. AWS KMS supports ML-DSA for signing. The infrastructure is ready.\nWhat hasn't caught up is most internal infrastructure. Service-to-service TLS, internal CAs, code-signing pipelines, and VPN tunnels are still overwhelmingly RSA or ECDSA. That is the migration work that needs to happen in 2026, not 2030.\nThe 'harvest now, decrypt later' threat is real and underweighted. Adversaries are recording encrypted traffic today on the assumption that a Shor-capable quantum computer will exist within fifteen years. Anything in that recorded traffic that needs to remain confidential past 2040 is at risk. For most companies, that includes customer PII, trade secrets, and authentication credentials.\nThe migration is annoying but not hard. The signature schemes are roughly 10x larger than RSA, so your certificate sizes, TLS handshake bytes, and JWT tokens grow. Mostly that's a CDN cost and a load balancer config change. The cryptographic libraries already exist (Bouncy Castle, OpenSSL 3.3, libsodium with the libpqcrypto patches).\nThe two-step path most teams should follow: enable hybrid TLS at your edge this quarter, then migrate internal PKI to a hybrid-capable CA before end of year. Anything more aggressive is premature; anything less leaves a known vulnerability open.",
    category: "Engineering",
    read_time: "8 min read",
    author: "Noor Siddiqui",
    author_role: "Staff SRE",
    hue: "rgba(216,124,87,0.22)",
    cover_image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1600&q=80&auto=format&fit=crop",
    published_at: "2026-03-21",
  },
  {
    slug: "ai-first-developer-tools",
    title: "AI-first dev tools have changed what 'senior' means.",
    excerpt:
      "Cursor, Copilot Workspace, and Claude Code rewrote our hiring and onboarding loops in 2026. Here's what the new senior engineer actually does all day.",
    body: "By mid-2026, the average engineer on our team is committing 3.2x the code they were committing in early 2024, and our principal engineers are reviewing four times as many PRs. The volume is up, the per-line review depth is up, and the bottleneck has moved decisively from 'writing code' to 'reviewing intent.'\nThe tools doing the heavy lifting are Cursor for inline edits, GitHub Copilot Workspace for medium-sized tasks, and Claude Code for end-to-end multi-file work. None of them are autopilot. All of them are force multipliers for engineers who already had judgement.\nWhat 'senior' means has shifted. Two years ago, seniority was 'can write the right thing.' Today it's 'can specify the right thing, recognise when the AI has written the wrong thing, and reason about systems the AI doesn't see.' The interview loop changed accordingly. We dropped one of our coding rounds and added a 'code review under AI assistance' round in its place.\nThe most underrated skill is prompt economy. Junior engineers ask the AI for the same wrong thing five times before refining the prompt. Senior engineers reframe the question on attempt two. That gap shows up in throughput within a week.\nIf you're an engineering leader in 2026 and you haven't restructured your onboarding to teach AI-assisted workflow as a first-class skill, you're losing a quarter of your team's productivity to nobody having told them how to use the tools properly.",
    category: "Engineering",
    read_time: "5 min read",
    author: "Daniel Reyes",
    author_role: "Principal Engineer",
    hue: "rgba(63,201,180,0.22)",
    cover_image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=1600&q=80&auto=format&fit=crop",
    published_at: "2026-03-12",
  },
  {
    slug: "humanoid-robots-warehouse",
    title: "Humanoid robots in the warehouse: where they actually work in 2026.",
    excerpt:
      "Figure 03 and Tesla Optimus Gen 3 shipped to commercial pilots this year. After visiting four deployments, here's the honest gap between the demo and the floor.",
    body: "Figure shipped its third-generation humanoid in February. Tesla followed with Optimus Gen 3 in April. Both are now in commercial pilots — not factory floors, but supervised, narrow-task deployments at logistics centres, automotive lines, and one quietly impressive hospital.\nThe demos are unfair. The marketing footage shows a humanoid pouring coffee, folding laundry, and walking up stairs. The pilots we visited show robots doing one task — usually pallet transfer or sub-assembly handoff — in a tightly constrained cell, with a human supervisor and a clear stop button.\nWhere it actually works in 2026: tasks that require human-form-factor mobility (climbing onto a vehicle chassis, threading through narrow aisles) combined with low-variance manipulation. Tasks where the cost of a fixed-purpose robot exceeds the cost of a humanoid by enough to justify the lower throughput. There aren't many of those, but there are some, and the count is rising.\nWhere it doesn't work: anything with high-variance manipulation (consumer goods picking with packaging variance is still rough), anything safety-critical without a cage, anything requiring 24/7 uptime. The batteries last four to six hours and the dexterity-to-cost ratio is still worse than a fixed gripper for most pick tasks.\nThe strategic question for clients isn't 'should we buy a humanoid.' It's 'are any of our floor processes constrained by the human-shaped-mobility requirement, and would solving that unlock a downstream automation?' For most warehouses, the answer is still no. For a small but growing fraction, the math is starting to work.",
    category: "Strategy",
    read_time: "8 min read",
    author: "Sara Khan",
    author_role: "Partner, Strategy",
    hue: "rgba(216,124,87,0.22)",
    cover_image: "https://images.unsplash.com/photo-1535378917042-10a22c95931a?w=1600&q=80&auto=format&fit=crop",
    published_at: "2026-03-03",
  },
  {
    slug: "ship-llm-evals-first",
    title: "Ship the eval before the prompt.",
    excerpt:
      "Most LLM features collapse in week three because no one defined 'good' in measurable terms. Here's the eval-first workflow we run on every AI build.",
    body: "Every LLM feature that fails in production fails the same way: it shipped without a measurable definition of 'good.' Demo-quality output convinces the room. Then the long tail of real prompts arrives, the team has no harness to measure regression, and the feature quietly degrades until someone calls it broken.\nThe fix is unsexy and structural. Before the first prompt is written, you write the eval. A small, curated set — 30 to 240 cases — that pins down the contract: what the model should do, what it must not do, and what the acceptable boundary looks like.\nOn a recent Northstar Labs engagement we ran the eval suite for two weeks before the model team wrote a single production prompt. By the time prompts existed, every change was scored. Every regression was caught before deploy. The team shipped with 78% weekly active adoption in eight weeks — and zero uncited claims in production.\nThe discipline matters more than the tooling. Treat eval cases as code. Version them. Run them in CI. Score them on every PR. When the score regresses, the PR doesn't merge.\nOnce that loop exists, the rest of the system gets easier. You can A/B prompts, swap models, change retrieval, refactor chains — and you'll know within minutes whether quality moved. That's the difference between an AI feature that ages well and one that decays the moment a model version rolls.",
    category: "AI",
    read_time: "8 min read",
    author: "Raza Ahmed",
    author_role: "Head of AI Engineering",
    hue: "rgba(244,114,182,0.22)",
    cover_image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=1600&q=80&auto=format&fit=crop",
    published_at: "2026-04-24",
  },
  {
    slug: "next16-turbopack-notes",
    title: "Field notes from upgrading 18 apps to Next 16.",
    excerpt:
      "What broke, what didn't, what we'd do differently. Turbopack, async params, and the new image pipeline — from the trenches.",
    body: "We migrated eighteen client codebases to Next 16 over six weeks. Most of it was painless. A handful of patterns deserved the time. These are the notes I wish we had on day one.\nAsync params are the upgrade that catches every team off-guard. The runtime cost is negligible; the migration cost is high if you have hundreds of dynamic routes. Lean into a codemod and a Friday afternoon.\nTurbopack production builds are the headline. Compile times dropped roughly 40% across our portfolio. Where they regressed, it was always a single client component importing the entire icon library — a problem that existed before Next 16 and is now louder.\nThe new image pipeline is a quiet win. Switching to AVIF + WebP by default reduced our P75 LCP image bytes by 28%. Combine with the new `minimumCacheTTL` and you shave another 10–15% on repeat visits.\nIf we were doing it again, we'd batch the migration by client tier — high-traffic apps first, internal tools second — and run smoke tests on the dynamic route fan-out before flipping production.",
    category: "Engineering",
    read_time: "6 min read",
    author: "Daniel Reyes",
    author_role: "Principal Engineer",
    hue: "rgba(99,102,241,0.22)",
    cover_image: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=1600&q=80&auto=format&fit=crop",
    published_at: "2026-04-11",
  },
  {
    slug: "design-tokens-in-code",
    title: "Design tokens that survive contact with engineering.",
    excerpt:
      "Why we generate tokens from a single source-of-truth and treat the design system as a published package — not a Figma file.",
    body: "A design system that lives only in Figma is a wish list. A design system shipped as a versioned package is a contract.\nOur rule on every engagement: tokens originate in one place — usually a Style Dictionary config — and compile out to platform targets. Tailwind for web, JSON for native, CSS variables for legacy.\nWhen designers want to change a color, they change one source value. The package republishes. Every product that pins the latest version picks it up on the next deploy.\nWe pair this with Storybook stories that double as component contracts. If the story renders, the component renders. If the visual regression test passes, the contract holds.\nOn the Lumen Retail engagement, this loop took new screens from a 9-month average to a 9-day average. The 'design system' wasn't the magic. The publish loop was.",
    category: "Design",
    read_time: "5 min read",
    author: "Amani Osei",
    author_role: "Design Systems Lead",
    hue: "rgba(63,201,180,0.22)",
    cover_image: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=1600&q=80&auto=format&fit=crop",
    published_at: "2026-03-28",
  },
  {
    slug: "kubernetes-cost-reality-check",
    title: "Your Kubernetes bill is mostly your fault.",
    excerpt:
      "Right-sizing, reserved capacity, and the three architectural choices that quietly double your cluster spend.",
    body: "When a client tells us their Kubernetes bill is out of control, we don't open the AWS console first. We open their deployment manifests.\nNine times out of ten, the bill is the symptom. The cause is three architectural choices made in week one that cascade.\nChoice one: unbounded resource requests. Pods request 2 CPUs they never use. The cluster pre-provisions for the request, not the actual load. Right-sizing those manifests typically reclaims 30–45% of cluster capacity without touching a single line of application code.\nChoice two: no cluster autoscaler tuning. Karpenter or Cluster Autoscaler with defaults will keep nodes warm long after the workload has scaled down. Tighten the cooldown, set scaledown utilisation thresholds, and your bill bends the moment traffic does.\nChoice three: dev/staging on production-grade nodes. We've seen entire dev clusters running on m5.4xlarge instances because someone copied prod's nodegroup template. Right-sized t-class spot instances handle the workload at a fraction of the cost.\nCombined, these three got Helios Energy's cluster bill down 38% in eight weeks — with zero impact on uptime.",
    category: "Cloud",
    read_time: "9 min read",
    author: "Noor Siddiqui",
    author_role: "Staff SRE",
    hue: "rgba(251,191,36,0.22)",
    cover_image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1600&q=80&auto=format&fit=crop",
    published_at: "2026-03-14",
  },
  {
    slug: "offline-first-rn",
    title: "Offline-first React Native, without the tears.",
    excerpt:
      "Conflict resolution, sync queues, and the data model that makes spotty 4G a non-event.",
    body: "Offline-first isn't a feature you add at the end. It's a data model you choose at the start. Try to bolt it on, and you'll spend three sprints fighting your own ORM.\nOur rule: pick a sync engine before you pick a UI framework. WatermelonDB, Replicache, or a hand-rolled CRDT layer — but pick something with explicit conflict resolution semantics.\nOn the Nimbus Health clinician app, every patient chart edit was queued locally first. The UI didn't wait for the network. The sync engine reconciled when the device returned. Clinicians stopped opening tickets within three weeks of rollout.\nThe hard part isn't the sync. It's the conflict semantics. Last-write-wins is a trap. Field-level merges with vector clocks are the floor for anything healthcare-adjacent.\nBuild your conflict UI before you build your sync — even a one-line 'updated by Dr. Webb 2m ago' indicator earns more trust than three layers of optimistic UI ever will.",
    category: "Mobile",
    read_time: "7 min read",
    author: "Lia Chen",
    author_role: "Mobile Engineering Lead",
    hue: "rgba(99,102,241,0.22)",
    cover_image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=1600&q=80&auto=format&fit=crop",
    published_at: "2026-03-02",
  },
  {
    slug: "discovery-deck-anti-pattern",
    title: "The discovery deck is an anti-pattern.",
    excerpt:
      "Why we replaced the 60-slide deliverable with a one-page plan and a one-hour walkthrough — and clients sign faster.",
    body: "Every agency discovery I've inherited ends the same way. A 60-slide deck arrives. It's beautiful. Nobody reads past slide 12. The CEO skims the executive summary, asks the same three questions the deck was meant to answer, and you start over in the next meeting.\nThe deliverable is wrong. The deck rewards thoroughness over decision-making.\nWe replaced ours with a one-page plan and a one-hour walkthrough. The page has four sections: the problem in one paragraph, the proposed shape of the solution in one paragraph, the sequence in a numbered list, and the cost. That's it.\nEverything else — research findings, alternatives considered, risk register — lives in linked appendices that the team can open on demand. The page itself stays short enough that a CEO can read it on their phone while waiting for coffee.\nSince we switched, our sign-off time dropped from a median of 17 days to 4. The work didn't get worse. The deliverable just stopped getting in the way.",
    category: "Strategy",
    read_time: "4 min read",
    author: "Sara Khan",
    author_role: "Partner, Strategy",
    hue: "rgba(216,124,87,0.22)",
    cover_image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1600&q=80&auto=format&fit=crop",
    published_at: "2026-02-18",
  },
];

function seedBlogPosts(): BlogPostRow[] {
  const now = new Date().toISOString();
  return BLOG_SEEDS.map((s, i) => {
    const publishedAtIso = new Date(`${s.published_at}T10:00:00Z`).toISOString();
    return {
      id: `bp_seed_${i + 1}`,
      slug: s.slug,
      title: s.title,
      excerpt: s.excerpt,
      body: s.body,
      category: s.category,
      read_time: s.read_time,
      author: s.author,
      author_role: s.author_role,
      hue: s.hue,
      cover_image: s.cover_image,
      is_published: true,
      published_at: publishedAtIso,
      created_at: publishedAtIso,
      updated_at: now,
    };
  });
}

function seed(): DemoData {
  const start1 = isoIn(3, 10);
  const start2 = isoIn(1, 14);
  const start3 = isoIn(-2, 11);
  return {
    meetings: [
      {
        id: "m_seed_1",
        user_id: "u_demo",
        user_email: "demo@codlinx.com",
        user_name: "Demo User",
        slot_start: start1,
        slot_end: isoAddMin(start1, 30),
        status: "pending",
        topic: "Trading platform scoping",
        brief: {
          services: ["Web app", "Cloud / DevOps"],
          budget: "$75K–$200K",
          timeline: "1–3 months",
          company: "Atlas Trade",
          role: "VP Engineering",
          notes: "Real-time market data for a $2B AUM fund.",
        },
        admin_notes: null,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
      {
        id: "m_seed_2",
        user_id: "u_demo",
        user_email: "demo@codlinx.com",
        user_name: "Demo User",
        slot_start: start2,
        slot_end: isoAddMin(start2, 30),
        status: "confirmed",
        topic: "Patient OS — discovery readout",
        brief: {
          services: ["Mobile app", "AI / ML"],
          budget: "$200K+",
          timeline: "3–6 months",
        },
        admin_notes: "Send the eval-first deck before the call.",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
      {
        id: "m_seed_3",
        user_id: "u_demo2",
        user_email: "founder@orbis.example",
        user_name: "Hana L.",
        slot_start: start3,
        slot_end: isoAddMin(start3, 30),
        status: "completed",
        topic: "Logistics pilot kickoff",
        brief: {
          services: ["Strategy"],
          budget: "< $25K",
          timeline: "Yesterday",
        },
        admin_notes: null,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
    ],
    availability: [
      { id: "a_mon", day_of_week: 1, start_minute: 9 * 60, end_minute: 18 * 60, slot_length_min: 30, is_active: true },
      { id: "a_tue", day_of_week: 2, start_minute: 9 * 60, end_minute: 18 * 60, slot_length_min: 30, is_active: true },
      { id: "a_wed", day_of_week: 3, start_minute: 9 * 60, end_minute: 18 * 60, slot_length_min: 30, is_active: true },
      { id: "a_thu", day_of_week: 4, start_minute: 9 * 60, end_minute: 18 * 60, slot_length_min: 30, is_active: true },
      { id: "a_fri", day_of_week: 5, start_minute: 9 * 60, end_minute: 16 * 60, slot_length_min: 30, is_active: true },
    ],
    blockedSlots: [],
    blog: seedBlogPosts(),
    careers: [
      {
        id: "c_seed_1",
        slug: "senior-engineer-ai",
        title: "Senior AI Engineer",
        level: "Senior",
        team: "AI Engineering",
        location: "Remote · UK / EU",
        employment_type: "Full-time",
        description:
          "Lead RAG and eval pipelines on client builds. Ship production AI systems with citation contracts and cost dashboards.",
        requirements: [
          "5+ years building production ML or LLM systems",
          "Strong Python; comfortable across Postgres / pgvector",
          "Has shipped at least one eval-gated LLM feature",
        ],
        perks: ["Senior comp + bonus", "4-day-week experiment", "Conference budget"],
        is_open: true,
        posted_at: new Date().toISOString(),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
      {
        id: "c_seed_2",
        slug: "principal-product-designer",
        title: "Principal Product Designer",
        level: "Principal",
        team: "Design",
        location: "London · Hybrid",
        employment_type: "Full-time",
        description:
          "Own the design system, lead product discovery, and ship interfaces that the engineering team treats as a contract.",
        requirements: [
          "8+ years shipping product, ideally agency-side",
          "Fluent in Figma + comfortable reading React",
          "Has built and maintained a multi-product design system",
        ],
        perks: ["Hybrid London office", "Conference + research budget"],
        is_open: true,
        posted_at: new Date().toISOString(),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
    ],
  };
}

export function getDemoStore(): DemoData {
  if (!globalThis.__codlinx_demo_store__) {
    globalThis.__codlinx_demo_store__ = seed();
  }
  return globalThis.__codlinx_demo_store__!;
}

export function resetDemoStore() {
  globalThis.__codlinx_demo_store__ = seed();
}

export { PROCESS_KEY };
