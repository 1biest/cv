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
  reelFilter: 'all' | 'defi' | 'infra' | 'design';
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
      '6+ years shipping React/TypeScript web applications, custom Figma systems, and embedded operator workflows—spanning DeFi money markets ($159.66M+ cumulative loans · $27.76M peak TVL · 882,800+ txs), spatial React 19 + Three.js software (AgOS), and spec-driven AI systems.',
    resumeLabel: 'Download Unified 1-Page CV',
    resumeHref: '/Logan Biesterfeldt Resume 2026.pdf',
    reelFilter: 'all',
    highlights: [
      'Neptune Finance ($159.66M+ Loans Originated · $27.76M Peak TVL · 1,042+ Days Uptime)',
      'AgOS Full-Stack Spatial Platform (React 19 + Three.js + Postgres)',
      'Spec-Driven AI Velocity (@neptunefinance/api-v2 Migration · 7.55M Gas Saved via Telemetry Analyzer)',
    ],
    proofItems: [
      {
        badge: 'Frontend · DeFi',
        title: 'Neptune Finance Application',
        metric: '$159.66M+ Loans · $27.76M Peak TVL',
        description:
          'Architected @neptunefinance/api-v2 React Query read models, 600ms–3.5s state-fingerprinted polling, 1-click swaps, and CosmWasm integrations across 9 lending & 21 collateral markets.',
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
        badge: 'Ecosystem · Hackathon Winner',
        title: 'CW3 Multisig & Dyve NFTFi',
        metric: 'Injective OSS · Polygon Top 5',
        description:
          'Ported Cosmos multisig governance UI to Injective with Base64 payload diagnostics and shipped Dyve (Covalent Best Use & NFTPort Pool Winner).',
        actionLabel: 'Inspect CW3 OSS Dossier',
        actionType: 'drawer',
        targetId: 'open-source-contributions',
      },
    ],
    packetBlurb: `Logan Biesterfeldt — Frontend, Product Design & Forward Deployed AI Engineer
• Summary: 6+ years shipping TypeScript/React systems, custom Figma component libraries, and embedded operator workflows (Calgary, AB · Open to Remote / Relocation).
• Proof: Neptune Finance Senior Product/Frontend/AI/FDE ($159.66M+ loans, $27.76M peak TVL, 882,800+ CosmWasm txs, 7.55M gas saved via telemetry AI); creator of AgOS (React 19, Three.js, Neon PostgreSQL, Drizzle); CW3 Multisig OSS port & ETHGlobal HackFS Triple Winner (Dyve).
• Links: https://biest.ca · logan.biesterfeldt@gmail.com · github.com/1biest`,
  },
  frontend: {
    id: 'frontend',
    label: 'Frontend Engineer',
    shortLabel: 'Frontend',
    headline: 'Senior Frontend & UI Systems Engineer (React 19 · TypeScript · Next.js)',
    summary:
      'Built production financial and real-time interfaces where centralized React Query read models, eventual consistency polling, WebGL lifecycles, and deterministic signing directly protect user capital.',
    resumeLabel: 'Frontend Engineer 1-Page CV',
    resumeHref: '/Logan Biesterfeldt - Frontend Engineer Resume 2026.pdf',
    reelFilter: 'all',
    highlights: [
      'Replaced legacy CosmWasm/InfluxDB state rebuilds with @neptunefinance/api-v2 React Query & 600ms–3.5s adaptive backoff polling',
      '15% high-complexity gas limit reduction (7.55M gas saved) & patched EVM/WalletConnect SDK signing bugs upstream',
      'Upstream OSS PRs merged in Injective Labs, Cosmos Chain Registry, Keplr & DefiLlama alongside React 19 + Three.js resource recovery',
    ],
    proofItems: [
      {
        badge: 'Distributed Frontend State',
        title: 'Neptune Finance Eventual Consistency',
        metric: '882,800+ Txs · 600ms–3.5s Polling',
        description:
          'Eliminated 30s stale UI states from blockchain indexer lag across 9 lending & 21 collateral markets ($159.66M+ cumulative loans).',
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
• Summary: Built mission-critical React/TypeScript UI for Neptune Finance ($159.66M+ loans, $27.76M peak TVL, 882,800+ txs) with @neptunefinance/api-v2 React Query & 600ms–3.5s adaptive backoff polling; ported CW3 Multisig to Injective; engineered AgOS (React 19, Three.js, Drizzle ORM).
• Strengths: Eventual consistency & React Query architecture, gas telemetry, WebSockets, WebGL lifecycle control, accessible UI primitives.
• Links: https://biest.ca · logan.biesterfeldt@gmail.com · github.com/1biest`,
  },
  design: {
    id: 'design',
    label: 'Product Design',
    shortLabel: 'Design',
    headline: 'Product Designer & Design Engineer (0 → 1 Discovery · Figma Systems · Production Code)',
    summary:
      'I design the Figma component library and ship the production code—turning multi-step atomic swaps, debt health models, and spatial workflows into effortless UI without handoff drift.',
    resumeLabel: 'Product Design 1-Page CV',
    resumeHref: '/Logan Biesterfeldt - Product Design Resume 2026.pdf',
    reelFilter: 'design',
    highlights: [
      '0 → 1 Figma design system & 1-click Collateral/Debt Swap UX compressing 5-step atomic flash loans into a single flow',
      '4-layer @base-ui Account Health Bar with live liquidation simulation, 1-click Dust Cleanup, and Revenue Flywheel analytics',
      'Self-initiated Balance Menu at Neptune & Field Signal accessible spatial 3D/tabular UI in AgOS',
    ],
    proofItems: [
      {
        badge: '1-Click DeFi UX & Systems',
        title: 'Neptune Figma, Swaps & Health UI',
        metric: '5-Step Flash Loan → 1-Click UX',
        description:
          'Designed the 0 → 1 Figma library, 4-layer @base-ui Account Health Bar, 1-click Collateral/Debt Swaps, Tokenomics suite, and persistent Balance Menu.',
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
• Summary: Full 0->1 design & frontend ownership from discovery and Figma libraries to shipped TSX. Designed Neptune Finance's system ($159.66M+ cumulative loans, $27.76M peak TVL), 1-click Collateral/Debt Swaps, 4-layer @base-ui Account Health Bar, self-initiated Balance Menu, Field Signal in AgOS, and Macro DEX / ether.fi concepts.
• Strengths: Component tokens, 1-click simplification of complex financial mechanics, spatial UX, accessibility fallbacks.
• Links: https://biest.ca · logan.biesterfeldt@gmail.com · github.com/1biest`,
  },
  'ai-fde': {
    id: 'ai-fde',
    label: 'AI & Forward Deployed',
    shortLabel: 'AI / FDE',
    headline: 'Forward Deployed Engineer — AI Software & Embedded Domain Systems',
    summary:
      'From live customer wallet triage on production DeFi markets to spec-driven AI agent migrations and boots-on-the-ground farm systems, I resolve high-stakes customer constraints directly in shipped code.',
    resumeLabel: 'AI / FDE 1-Page CV',
    resumeHref: '/Logan Biesterfeldt - Forward Deployed AI Engineer Resume 2026.pdf',
    reelFilter: 'all',
    highlights: [
      'Spec-driven AI agent rulesets executed zero-downtime @neptunefinance/api-v2 migration + 15% gas reduction (7.55M gas saved)',
      'Live Bech32 wallet diagnostic console, RPC failover, upstream SDK fixes & Hydro/Stride/Mito/Astroport/Skip Go integrations at Neptune',
      'Embedded discovery at Flat Land Farms -> AgOS (React 19 + Three.js + Postgres + Drizzle)',
    ],
    proofItems: [
      {
        badge: 'Production FDE · AI Playbooks',
        title: 'Neptune Triage, Telemetry AI & Partner Flows',
        metric: '7.55M Gas Saved · 5 Partner Integrations',
        description:
          'Built hot-swappable Bech32 wallet inspection + RPC failover console, patched upstream SDK bugs, integrated Hydro (hINJ), Stride (stATOM), Mito, Astroport & Skip Go, and drove api-v2 via AI guardrails.',
        actionLabel: 'Inspect Neptune Architecture',
        actionType: 'section',
        targetId: 'neptune',
      },
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
        badge: 'Ecosystem & Protocol OSS',
        title: 'CW3 Multisig & Upstream PRs',
        metric: 'Injective · Cosmos · DefiLlama',
        description:
          'Diagnosed chain signing and SDK quirks firsthand, porting CW3 multisig governance to Injective and landing upstream PRs across partner repositories.',
        actionLabel: 'Inspect OSS Architecture',
        actionType: 'drawer',
        targetId: 'open-source-contributions',
      },
    ],
    packetBlurb: `Logan Biesterfeldt — Forward Deployed Engineer (AI Software & Customer Systems)
• Summary: Hybrid engineer & designer connecting real-world operator and protocol constraints to shipped full-stack and agentic AI software.
• Proof: Neptune Finance FDE/AI/Frontend/Product ($159.66M+ loans, $27.76M peak TVL, live Bech32 diagnostic console, Hydro/Stride/Mito/Astroport/Skip Go integrations, 7.55M gas saved & @neptunefinance/api-v2 via spec-driven AI playbooks); AgOS (React 19, Three.js, Neon Postgres); CW3 Multisig & upstream ecosystem PRs.
• Links: https://biest.ca · logan.biesterfeldt@gmail.com · github.com/1biest`,
  },
};
