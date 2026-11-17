export type RoleLens = 'all' | 'frontend' | 'design' | 'ai-fde';

export interface RoleProofItem {
  badge: string;
  title: string;
  metric: string;
  description: string;
  actionLabel: string;
  actionType: 'section' | 'drawer';
  targetId: string;
}

export interface RoleLensConfig {
  id: RoleLens;
  label: string;
  shortLabel: string;
  headline: string;
  summary: string;
  resumeLabel: string;
  resumeHref: string;
  reelFilter: 'all' | 'defi' | 'infra' | 'ai';
  highlights: string[];
  proofItems: RoleProofItem[];
  packetBlurb: string;
}

export const ROLE_LENS_ORDER: RoleLens[] = ['all', 'frontend', 'design', 'ai-fde'];

export const ROLE_LENSES: Record<RoleLens, RoleLensConfig> = {
  all: {
    id: 'all',
    label: 'All Tracks',
    shortLabel: 'Overview',
    headline: 'Frontend Engineering · Product Design · Forward Deployed AI',
    summary:
      '6+ years shipping React/TypeScript web applications, custom Figma systems, and embedded operator workflows—spanning DeFi liquidity interfaces ($300M+ peak TVL), spatial React 19 + Three.js software (AgOS), and spec-driven AI systems.',
    resumeLabel: 'Download Unified 1-Page CV',
    resumeHref: '/Logan Biesterfeldt Resume 2026.pdf',
    reelFilter: 'all',
    highlights: [
      'Neptune Finance Frontend Lead ($300M+ Peak TVL)',
      'AgOS Full-Stack Spatial Platform (React 19 + Three.js + Postgres)',
      'CrAIdle & Satsuma Spec-Driven Agentic Delivery',
    ],
    proofItems: [
      {
        badge: 'Frontend · DeFi',
        title: 'Neptune Finance Application',
        metric: '$300M+ Peak TVL',
        description:
          'Owned Figma systems and production Next.js/TypeScript state architecture across lending, borrowing, Mito vaults, and Astroport LP flows.',
        actionLabel: 'Read Neptune Case Study',
        actionType: 'section',
        targetId: 'neptune',
      },
      {
        badge: 'Product · Field-to-Code',
        title: 'AgOS Agricultural OS',
        metric: 'React 19 · Three.js · Postgres',
        description:
          'Converted 2 years of Flat Land Farms operator experience into connected 3D grain storage, crop planning, and financial visualizations.',
        actionLabel: 'Explore AgOS Architecture',
        actionType: 'section',
        targetId: 'agos',
      },
      {
        badge: 'AI Systems · 48h Ship',
        title: 'CrAIdle & Satsuma Orchestration',
        metric: 'Spec-Driven Agentic Flows',
        description:
          'Directed OpenClaw/MiniMax agents against explicit contract invariants and testnet verification gates on Base Sepolia and Injective.',
        actionLabel: 'Inspect CrAIdle Dossier',
        actionType: 'drawer',
        targetId: 'craidle',
      },
    ],
    packetBlurb: `Logan Biesterfeldt — Frontend, Product Design & Forward Deployed AI Engineer
• Summary: 6+ years shipping TypeScript/React systems, custom Figma component libraries, and embedded operator workflows (Calgary, AB · Open to Remote / Relocation).
• Proof: Frontend Lead at Neptune Finance ($300M+ peak TVL on Injective); creator of AgOS (React 19, Three.js, Neon PostgreSQL, Drizzle); shipped CrAIdle & Satsuma via spec-driven AI agent orchestration; ETHGlobal HackFS Triple Winner (Dyve).
• Links: https://biest.ca · logan.biesterfeldt@gmail.com · github.com/1biest`,
  },
  frontend: {
    id: 'frontend',
    label: 'Frontend Engineer',
    shortLabel: 'Frontend',
    headline: 'Senior Frontend & UI Systems Engineer (React 19 · TypeScript · Next.js)',
    summary:
      'Built production financial and real-time interfaces where wallet signing, WebGL lifecycles, optimistic state sync, and deterministic error recovery directly protect user outcomes.',
    resumeLabel: 'Frontend Engineer 1-Page CV',
    resumeHref: '/Logan Biesterfeldt - Frontend Engineer Resume 2026.pdf',
    reelFilter: 'all',
    highlights: [
      'Deterministic transaction & wallet state machines across Injective & EVM',
      'Custom React 19 + Three.js resource management & WebGL context recovery',
      'Upstream OSS PRs merged in Injective Labs, Cosmos Chain Registry, Keplr & DefiLlama',
    ],
    proofItems: [
      {
        badge: 'Production Architecture',
        title: 'Neptune Finance State Sync',
        metric: 'Next.js · CosmWasm · Injective',
        description:
          'Engineered resilient RPC/indexer aggregation, slippage guards, and deterministic retry UX across lending, staking, and vault flows.',
        actionLabel: 'Jump to Neptune Engineering',
        actionType: 'section',
        targetId: 'neptune',
      },
      {
        badge: 'Upstream OSS',
        title: 'CW3 Multisig & Ecosystem PRs',
        metric: 'Injective · Cosmos · DefiLlama',
        description:
          'Refactored Cosmos multisig UI for Injective execution paths, decoded Base64 payloads, and merged adapters to core protocol registries.',
        actionLabel: 'Open OSS Dossier',
        actionType: 'drawer',
        targetId: 'open-source-contributions',
      },
      {
        badge: 'WebGL & Real-Time',
        title: 'AgOS 3D & Monad Heartbeat',
        metric: 'Three.js · WebSockets · Drizzle',
        description:
          'Managed resize observers, GPU disposal, WebGL context recovery, and high-frequency WebSocket block visualization with HTTP fallback.',
        actionLabel: 'Inspect Monad Heartbeat',
        actionType: 'drawer',
        targetId: 'monad-heartbeat',
      },
    ],
    packetBlurb: `Logan Biesterfeldt — Senior Frontend Engineer (React 19 · TypeScript · Next.js)
• Summary: Built mission-critical React/TypeScript UI for Neptune Finance ($300M+ peak TVL), ported CW3 Multisig to Injective, merged PRs to Injective Labs/Cosmos/DefiLlama, and engineered AgOS (React 19, Three.js, Drizzle ORM).
• Strengths: State synchronization, WebSockets, WebGL lifecycle control, accessible UI primitives, design token architecture.
• Links: https://biest.ca · logan.biesterfeldt@gmail.com · github.com/1biest`,
  },
  design: {
    id: 'design',
    label: 'Product Design',
    shortLabel: 'Design',
    headline: 'Product Designer & Design Engineer (0 → 1 Discovery · Figma Systems · Production Code)',
    summary:
      'I build the Figma component library and ship the production code—translating complex workflows into clear visual hierarchy without losing intent in design-to-dev handoff.',
    resumeLabel: 'Product Design 1-Page CV',
    resumeHref: '/Logan Biesterfeldt - Product Design Resume 2026.pdf',
    reelFilter: 'defi',
    highlights: [
      '0 -> 1 Figma design system & brand language across Neptune Finance and Cryptech',
      'Self-initiated Balance Menu solved cross-page asset navigation gaps without a brief',
      'Field Signal system in AgOS pairs accessibility (keyboard + tabular fallbacks) with spatial 3D',
    ],
    proofItems: [
      {
        badge: 'Design Systems · 0 → 1',
        title: 'Neptune Figma Library & Balance Menu',
        metric: 'Figma -> Production Parity',
        description:
          'Designed token rules, lending screens, and the persistent Balance Menu after identifying cross-route navigation friction firsthand.',
        actionLabel: 'Inspect Neptune Design',
        actionType: 'section',
        targetId: 'neptune',
      },
      {
        badge: 'Accessible Domain UI',
        title: 'Field Signal System in AgOS',
        metric: '3D Spatial + Tabular Parity',
        description:
          'Unified serif orientation headings, dense operational sans/mono controls, keyboard storage reordering, and WCAG-aware data tables.',
        actionLabel: 'Jump to AgOS Section',
        actionType: 'section',
        targetId: 'agos',
      },
      {
        badge: 'Multi-Product UX',
        title: 'Macro DEX & ether.fi Cash UI',
        metric: 'Dark Neobank & Swap Systems',
        description:
          'Created responsive dark-mode financial hierarchy, LTV health visualizations, and unified Cryptech component style guides.',
        actionLabel: 'Open ether.fi Cash Dossier',
        actionType: 'drawer',
        targetId: 'etherfi-demo',
      },
    ],
    packetBlurb: `Logan Biesterfeldt — Product Designer & Design Engineer
• Summary: Full 0->1 design & frontend ownership from discovery and Figma libraries to shipped TSX. Created Neptune Finance's design system ($300M+ peak TVL), self-initiated Balance Menu UX, Field Signal system in AgOS, and Macro DEX / ether.fi UI concepts.
• Strengths: Component tokens, high-trust financial flows, spatial UX, accessibility fallbacks.
• Links: https://biest.ca · logan.biesterfeldt@gmail.com · github.com/1biest`,
  },
  'ai-fde': {
    id: 'ai-fde',
    label: 'AI & Forward Deployed',
    shortLabel: 'AI / FDE',
    headline: 'Forward Deployed Engineer — AI Software & Embedded Domain Systems',
    summary:
      'Comfortable in boots with domain operators and in the terminal orchestrating AI agents: I bridge messy customer constraints into typed schemas, verified smart/backend logic, and production software.',
    resumeLabel: 'AI / FDE 1-Page CV',
    resumeHref: '/Logan Biesterfeldt - Forward Deployed AI Engineer Resume 2026.pdf',
    reelFilter: 'ai',
    highlights: [
      'Embedded domain discovery at Flat Land Farms -> shipped AgOS (Postgres + Drizzle + React 19)',
      'Spec-driven multi-agent orchestration (OpenClaw, MiniMax, Claude, Cursor) with HITL gates',
      '48-hour shipping velocity from customer/protocol constraint to live testnet/production deployment',
    ],
    proofItems: [
      {
        badge: 'Embedded Domain -> Product',
        title: 'Flat Land Farms → AgOS',
        metric: 'Field Ops -> Neon Postgres',
        description:
          'Turned 2 years operating precision ag consoles (John Deere, Climate FieldView) into a typed farm operating system spanning bins, contracts, and P&L.',
        actionLabel: 'See Field-to-Code Bridge',
        actionType: 'section',
        targetId: 'agos',
      },
      {
        badge: 'Agentic Orchestration',
        title: 'CrAIdle Yield-Budgeted Launchpad',
        metric: 'OpenClaw · MiniMax · Solidity',
        description:
          'Authored vault principal-lock specs and directed OpenClaw/MiniMax agents to ship 4 verified Base Sepolia contracts + Next.js monitoring UI.',
        actionLabel: 'Inspect CrAIdle Architecture',
        actionType: 'drawer',
        targetId: 'craidle',
      },
      {
        badge: 'Cross-Chain AI Delivery',
        title: 'Satsuma 4-Network Router',
        metric: '48h Spec-Driven Ship',
        description:
          'Paired explicit multi-chain transition specs with agentic codegen and manual Keplr/ICP wallet verification to ship in 48 hours at Cosmoverse.',
        actionLabel: 'Inspect Satsuma Diagram',
        actionType: 'drawer',
        targetId: 'satsuma',
      },
    ],
    packetBlurb: `Logan Biesterfeldt — Forward Deployed Engineer (AI Software & Customer Systems)
• Summary: Hybrid engineer & designer connecting real-world operator workflows to shipped full-stack and agentic AI software.
• Proof: Converted 2 years in precision agriculture (Flat Land Farms) into AgOS (React 19, Three.js, Neon Postgres, Drizzle); shipped CrAIdle (OpenClaw/MiniMax agent pipeline + 4 Base Sepolia contracts) and Satsuma (48h cross-chain router) using spec-driven HITL verification; 4 years leading customer-facing DeFi product at Neptune Finance ($300M+ TVL).
• Links: https://biest.ca · logan.biesterfeldt@gmail.com · github.com/1biest`,
  },
};
