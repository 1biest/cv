'use client';

import React, { useEffect, useState } from 'react';
import { trackEvent } from '../lib/analytics';

export type ConvergenceElementId =
  | 'design'
  | 'engineering'
  | 'product'
  | 'design-engineering'
  | 'engineering-product'
  | 'product-design'
  | 'convergence'
  | null;

interface ConvergenceDetail {
  id: Exclude<ConvergenceElementId, null>;
  kicker: string;
  title: string;
  subtitle: string;
  summary: string;
  bullets: { label: string; detail: string }[];
  footerNote?: string;
  tags: string[];
}

const CONVERGENCE_DETAILS: Record<Exclude<ConvergenceElementId, null>, ConvergenceDetail> = {
  design: {
    id: 'design',
    kicker: 'Pillar 01 · Design Systems',
    title: 'Visual Systems & Spatial Craft',
    subtitle: 'Figma token architectures aligned to Tailwind variables, custom 3D WebGL, and motion.',
    summary:
      'Fine arts discipline applied to production interface systems. Token libraries in Figma drive Tailwind variables directly so visual hierarchy survives implementation intact.',
    bullets: [
      {
        label: 'Field Signal (AgOS)',
        detail: 'Three.js grain bin geometry where dimensions, fill levels, and slopes bind to live relational storage records.',
      },
      {
        label: 'Neptune Finance',
        detail: 'Built the custom Figma component system mapping tokens cleanly to production TypeScript and Tailwind UI.',
      },
      {
        label: 'stakefish',
        detail: 'Technical motion sequences clarifying Ethereum Beacon Chain & PoS delegation steps.',
      },
    ],
    tags: ['Figma Token Systems', 'Three.js Spatial', 'WCAG Contrast & Fallback'],
  },
  'product-design': {
    id: 'product-design',
    kicker: 'Intersection · Product × Design',
    title: 'High-Stakes Decision Surfaces',
    subtitle: 'Translating debt health ratios, multi-chain routes, and farm inventories into clear spatial actions.',
    summary:
      'Complex financial ratios and distributed inventories fail users when hidden across fragmented tabs. Surfaces pair high-contrast visual cues with deterministic tabular breakdowns.',
    bullets: [
      {
        label: 'Neptune Lending & Swaps UX',
        detail: 'Abstracted 5-step atomic flash-loan/DEX swaps into a 1-click flow alongside a 4-layer @base-ui Account Health Bar and live liquidation modeling.',
      },
      {
        label: 'AgOS Spatial + Tabular Parity',
        detail: 'Interactive 3D yard navigation accompanied by accessible keyboard controls and tabular financial reports.',
      },
    ],
    footerNote: 'Outcome: Fast operator comprehension during capital-sensitive workflows',
    tags: ['Financial Hierarchy', 'Spatial UX', 'Accessible Fallbacks'],
  },
  'design-engineering': {
    id: 'design-engineering',
    kicker: 'Intersection · Design × Engineering',
    title: 'The Direct Design-to-Code Loop',
    subtitle: 'Single-owner Figma-to-TypeScript execution eliminating multi-team translation lag.',
    summary:
      'Design decisions and frontend engineering share one feedback loop: edge states, responsive breakpoints, skeleton states, and keyboard focus are resolved during component authoring.',
    bullets: [
      {
        label: 'Unified Tokens',
        detail: 'CSS variables and Tailwind primitives stay synchronized between Figma exploration and production components.',
      },
      {
        label: 'Author-Time Resilience',
        detail: 'Loading, partial-data, and wallet rejection states are designed in TypeScript alongside the happy path.',
      },
    ],
    footerNote: 'Outcome: Direct Figma-to-Tailwind token ownership · No multi-week handoff queues',
    tags: ['Single-Owner Loop', 'Component Primitives', 'UI Resilience'],
  },
  product: {
    id: 'product',
    kicker: 'Pillar 02 · Product & Domain Discovery',
    title: '0 → 1 Ownership & Field Discovery',
    subtitle: 'Embedding inside operator workflows to identify friction and ship unprompted solutions.',
    summary:
      'Great software starts by observing real workflows firsthand—then translating operator constraints directly into relational schemas, AI specs, and usable interfaces.',
    bullets: [
      {
        label: 'Flat Land Farms → AgOS',
        detail: 'Turned two years of hands-on precision agriculture operations into relational schemas connecting grain bins, contracts, and P&L.',
      },
      {
        label: 'Neptune Balance Menu',
        detail: 'Identified cross-page balance friction independently; designed in Figma and shipped straight into production.',
      },
      {
        label: 'Spec-Driven Agentic Delivery',
        detail: 'Built spec-driven AI agent playbooks and telemetry tooling verified against strict TypeScript, schema, and mainnet bounds.',
      },
    ],
    tags: ['Embedded Discovery', '0 → 1 Product', 'Agent Orchestration'],
  },
  'engineering-product': {
    id: 'engineering-product',
    kicker: 'Intersection · Engineering × Product',
    title: 'Protocol & System-Aware UI',
    subtitle: 'Interfaces architected directly around mechanical boundaries and distributed state.',
    summary:
      'UI components never misrepresent asynchronous backend reality: indexer latency, confirmation stages, slippage checks, and optimistic retries remain transparent to users.',
    bullets: [
      {
        label: 'Neptune Adaptive Polling Engine',
        detail: 'State-fingerprinted 600ms–3.5s backoff synced against @neptunefinance/api-v2 so UI eliminates 30-second indexer lag.',
      },
      {
        label: 'Monad Block Heartbeat',
        detail: 'High-frequency WebSocket consensus visualizer with HTTP polling fallback and deterministic EVM tx feedback.',
      },
    ],
    footerNote: 'Outcome: Deterministic signing guards & live state reflection under indexer latency',
    tags: ['State Machines', 'Signing Guards', 'Distributed State'],
  },
  engineering: {
    id: 'engineering',
    kicker: 'Pillar 03 · Software Engineering',
    title: 'Deterministic Frontend & Full-Stack Rigor',
    subtitle: 'React 19, TypeScript, WebGL resource lifecycles, smart contracts, and PostgreSQL schemas.',
    summary:
      'Applications engineered with strict typing, deterministic recovery paths, memory/GPU cleanup, and clean separation between economic computation and presentation.',
    bullets: [
      {
        label: 'Neptune ($159.66M+ Loans · $27.76M Peak TVL)',
        detail: 'Injective money market scaling to 882,800+ CosmWasm executions via @neptunefinance/api-v2, adaptive post-tx polling, and Hydro/Stride/Mito/Astroport/Skip Go integrations.',
      },
      {
        label: 'AgOS (WebGL & Postgres)',
        detail: 'Three.js pixel-ratio & GPU disposal lifecycles paired with Auth.js, Neon PostgreSQL, and Drizzle ORM.',
      },
      {
        label: 'CW3 Multisig & Ecosystem OSS',
        detail: 'Refactored Injective signing paths with Base64 payload decode plus merged PRs to Injective Labs, Cosmos, and DefiLlama.',
      },
    ],
    tags: ['React 19 & Next.js', 'CosmWasm / EVM', 'Drizzle & Postgres'],
  },
  convergence: {
    id: 'convergence',
    kicker: 'Full-Stack Convergence',
    title: 'Frontend · Product Design · Forward Deployed AI',
    subtitle: 'Hover or click any vertex or edge to inspect specific artifacts and engineering constraints.',
    summary:
      'Operating across Design Systems, Production Frontend Engineering, and Embedded Product Discovery means fewer translation losses, clearer operator interfaces, and faster iterations from real constraint to verified code.',
    bullets: [
      {
        label: 'Frontend Engineer Track',
        detail: 'Type-safe React 19 / Next.js state architecture, WebGL resource control, WebSockets, and upstream OSS.',
      },
      {
        label: 'Product Design Track',
        detail: 'End-to-end 0 → 1 discovery, custom Figma token systems, high-trust financial UI, and accessible layouts.',
      },
      {
        label: 'Forward Deployed AI Track',
        detail: 'Field discovery (Flat Land Farms -> AgOS) + spec-driven AI playbooks & 7.55M gas telemetry at Neptune Finance.',
      },
    ],
    tags: ['Frontend Systems', 'Product Design', 'AI & Forward Deployed'],
  },
};

interface FloatingCardProps {
  id: Exclude<ConvergenceElementId, null>;
  title: string;
  subtitle: string;
  activeId: ConvergenceElementId;
  onHover: (id: ConvergenceElementId) => void;
  onLeave: () => void;
  onClick: (id: ConvergenceElementId) => void;
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  expandDirection?: 'down' | 'up';
  compactOnly?: boolean;
}

function FloatingCard({
  id,
  title,
  subtitle,
  activeId,
  onHover,
  onLeave,
  onClick,
  children,
  className = '',
  style,
  expandDirection = 'down',
  compactOnly = false,
}: FloatingCardProps) {
  const isSelected = activeId === id;
  const isExpanded = !compactOnly && isSelected;

  return (
    <button
      type="button"
      onMouseEnter={() => onHover(id)}
      onMouseLeave={onLeave}
      onFocus={() => onHover(id)}
      onBlur={onLeave}
      onClick={() => onClick(id)}
      style={style}
      aria-pressed={isSelected}
      className={`group text-left cursor-pointer rounded-2xl border transition-all duration-200 ${
        isSelected
          ? 'border-[#0a2540] bg-white shadow-[0_10px_28px_rgba(10,37,64,0.14)] ring-1 ring-[#0a2540]/20 z-30'
          : 'border-[var(--border)] bg-[var(--surface)] glass-surface hover:border-[#0a2540]/45 shadow-[var(--shadow-card)] z-20'
      } ${className}`}
    >
      <div className="p-3.5 sm:p-4 min-h-[76px] flex flex-col justify-center">
        {!compactOnly && expandDirection === 'up' && (
          <div
            className={`grid transition-all duration-300 ease-out overflow-hidden ${
              isExpanded
                ? 'grid-rows-[1fr] opacity-100 mb-3 pb-3 border-b border-[var(--border)]'
                : 'grid-rows-[0fr] opacity-0'
            }`}
          >
            <div className="overflow-hidden text-[var(--text-muted)]">
              {children}
            </div>
          </div>
        )}

        <div className="flex items-start justify-between gap-2">
          <h4 className="text-sm sm:text-base font-bold text-[var(--text)] leading-snug">
            {title}
          </h4>
          <span
            className={`text-xs font-mono shrink-0 mt-0.5 transition-colors ${
              isSelected
                ? 'text-[#0a2540] font-bold'
                : 'text-[var(--text-subtle)] group-hover:text-[#0a2540]'
            }`}
          >
            {compactOnly
              ? isSelected
                ? '●'
                : '○'
              : expandDirection === 'up'
                ? isExpanded
                  ? '▾'
                  : '▴'
                : isExpanded
                  ? '▴'
                  : '▾'}
          </span>
        </div>

        <p className="mt-1 text-xs text-[var(--text-muted)] leading-relaxed font-normal">
          {subtitle}
        </p>

        {!compactOnly && expandDirection === 'down' && (
          <div
            className={`grid transition-all duration-300 ease-out overflow-hidden ${
              isExpanded
                ? 'grid-rows-[1fr] opacity-100 mt-3 pt-3 border-t border-[var(--border)]'
                : 'grid-rows-[0fr] opacity-0'
            }`}
          >
            <div className="overflow-hidden text-[var(--text-muted)]">
              {children}
            </div>
          </div>
        )}
      </div>
    </button>
  );
}

function ConvergenceDetailBody({
  detail,
  stickyTags = false,
}: {
  detail: ConvergenceDetail;
  stickyTags?: boolean;
}) {
  return (
    <div
      className={
        stickyTags
          ? 'flex flex-1 min-h-0 flex-col justify-between text-xs leading-relaxed text-[var(--text-muted)]'
          : 'space-y-2.5 text-xs leading-relaxed text-[var(--text-muted)]'
      }
    >
      <div className={stickyTags ? 'space-y-2.5 overflow-y-auto pr-1 min-h-0' : 'space-y-2.5'}>
        <p>{detail.summary}</p>
        <div className="space-y-1.5 border-t border-[var(--border)] pt-2 text-[11px]">
          {detail.bullets.map((bullet) => (
            <div key={bullet.label}>
              <strong className="text-[var(--text)] font-semibold">{bullet.label}:</strong>{' '}
              {bullet.detail}
            </div>
          ))}
        </div>
        {detail.footerNote ? (
          <div className="pt-2 border-t border-[var(--border)] font-mono text-[11px] font-semibold text-[#0a2540]">
            {detail.footerNote}
          </div>
        ) : null}
      </div>
      <div
        className={`${
          stickyTags ? 'shrink-0 mt-2.5 ' : ''
        }pt-2 border-t border-[var(--border)] flex flex-wrap gap-1.5`}
      >
        {detail.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-md bg-[#0a2540]/[0.05] border border-[var(--border)] px-2 py-0.5 text-[10px] font-mono text-[var(--text)]"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function ConvergenceTriangle() {
  const [hoveredId, setHoveredId] = useState<ConvergenceElementId>(null);
  const [pinnedId, setPinnedId] = useState<ConvergenceElementId>(null);

  const activeId = pinnedId || hoveredId;
  const inspectedDetail = CONVERGENCE_DETAILS[activeId || 'convergence'];

  useEffect(() => {
    if (!hoveredId) return;
    const timer = setTimeout(() => {
      const detail = CONVERGENCE_DETAILS[hoveredId];
      trackEvent('craft_triangle_hover', {
        node_id: hoveredId,
        node_title: detail.title,
        node_kicker: detail.kicker,
        category: 'Craft_Exploration',
      });
    }, 650);

    return () => clearTimeout(timer);
  }, [hoveredId]);

  const handleCardClick = (id: ConvergenceElementId) => {
    const nextPinned = pinnedId === id ? null : id;
    setPinnedId(nextPinned);
    const detail = id ? CONVERGENCE_DETAILS[id] : CONVERGENCE_DETAILS.convergence;
    trackEvent('craft_triangle_pin', {
      node_id: id || 'convergence',
      node_title: detail.title,
      node_kicker: detail.kicker,
      pin_action: nextPinned ? 'pin' : 'unpin',
      category: 'Craft_Exploration',
    });
  };

  const isHighlighted = (id: ConvergenceElementId) => {
    if (!activeId) return false;
    if (activeId === 'convergence') return true;
    if (activeId === id) return true;

    // Edge highlighting when a connected vertex is active
    if (activeId === 'design' && (id === 'design-engineering' || id === 'product-design')) return true;
    if (activeId === 'engineering' && (id === 'design-engineering' || id === 'engineering-product')) return true;
    if (activeId === 'product' && (id === 'product-design' || id === 'engineering-product')) return true;

    // Vertex highlighting when an edge is active
    if (activeId === 'design-engineering' && (id === 'design' || id === 'engineering')) return true;
    if (activeId === 'engineering-product' && (id === 'engineering' || id === 'product')) return true;
    if (activeId === 'product-design' && (id === 'product' || id === 'design')) return true;

    return false;
  };

  return (
    <div className="w-full relative pt-4 pb-2 lg:pt-14">
      {/* ========================================================================= */}
      {/* DESKTOP LAYOUT (lg & xl): Perfectly Fitted Stage (960x680)               */}
      {/* ========================================================================= */}
      <div className="hidden lg:block relative w-full max-w-[960px] mx-auto h-[680px]">
        {/* ----------------------------------------------------------------------- */}
        {/* FULL-STAGE SVG: 20% LARGER DISCIPLINE TRIANGLE + RADIATING TETHERS      */}
        {/* ----------------------------------------------------------------------- */}
        <svg
          viewBox="0 0 960 680"
          className="absolute inset-0 w-full h-full pointer-events-none select-none drop-shadow-md"
          aria-label="20% Larger Triangular Discipline Motif with Radiating Tethers"
        >
          <defs>
            {/* Luminous Glow Filter */}
            <filter id="anchorGlow" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="7" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
            <radialGradient id="centerAura" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#0a2540" stopOpacity="0.16" />
              <stop offset="65%" stopColor="#b88a44" stopOpacity="0.06" />
              <stop offset="100%" stopColor="#0a2540" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Background Concentric Coordinate Radar Rings */}
          <circle cx="480" cy="340" r="90" fill="none" stroke="var(--border)" strokeDasharray="4 4" opacity="0.45" />
          <circle cx="480" cy="340" r="174" fill="none" stroke="var(--border)" strokeDasharray="5 5" opacity="0.32" />
          <circle cx="480" cy="340" r="258" fill="none" stroke="var(--border)" strokeDasharray="6 6" opacity="0.22" />

          {/* Triangle Medians (Centroid to Scaled Vertices) */}
          <line x1="480" y1="138" x2="480" y2="340" stroke="var(--border)" strokeDasharray="3 3" opacity="0.55" />
          <line x1="674" y1="434" x2="480" y2="340" stroke="var(--border)" strokeDasharray="3 3" opacity="0.55" />
          <line x1="286" y1="434" x2="480" y2="340" stroke="var(--border)" strokeDasharray="3 3" opacity="0.55" />

          {/* Translucent 20% Scaled Triangle Surface Fill */}
          <polygon points="480,138 674,434 286,434" fill="rgba(255,255,255,0.6)" />

          {/* ------------------------------------------------------------------- */}
          {/* THE 6 DASHED TETHERS RADIATING DIRECTLY IN LINE WITH THE CENTER (480, 340) */}
          {/* ------------------------------------------------------------------- */}

          {/* 1. NODE 1 TETHER */}
          <line
            x1="480"
            y1="92"
            x2="480"
            y2="79"
            stroke={isHighlighted('design') ? '#0a2540' : 'var(--border-strong)'}
            strokeWidth={isHighlighted('design') ? '2.5' : '1.5'}
            strokeDasharray="4 3"
            className="transition-all duration-300"
          />
          <circle cx="480" cy="79" r="3.5" fill={isHighlighted('design') ? '#0a2540' : '#8a5a19'} stroke="#ffffff" strokeWidth="1.5" />

          {/* 2. VECTOR A TETHER */}
          <line
            x1="625"
            y1="259"
            x2="730"
            y2="201"
            stroke={isHighlighted('design-engineering') ? '#0a2540' : 'var(--border-strong)'}
            strokeWidth={isHighlighted('design-engineering') ? '2.5' : '1.5'}
            strokeDasharray="4 3"
            className="transition-all duration-300"
          />
          <circle cx="730" cy="201" r="3.5" fill={isHighlighted('design-engineering') ? '#0a2540' : '#8a5a19'} stroke="#ffffff" strokeWidth="1.5" />

          {/* 3. NODE 2 TETHER */}
          <line
            x1="696"
            y1="445"
            x2="730"
            y2="461"
            stroke={isHighlighted('engineering') ? '#0a2540' : 'var(--border-strong)'}
            strokeWidth={isHighlighted('engineering') ? '2.5' : '1.5'}
            strokeDasharray="4 3"
            className="transition-all duration-300"
          />
          <circle cx="730" cy="461" r="3.5" fill={isHighlighted('engineering') ? '#0a2540' : '#8a5a19'} stroke="#ffffff" strokeWidth="1.5" />

          {/* 4. VECTOR B TETHER */}
          <line
            x1="480"
            y1="448"
            x2="480"
            y2="545"
            stroke={isHighlighted('engineering-product') ? '#0a2540' : 'var(--border-strong)'}
            strokeWidth={isHighlighted('engineering-product') ? '2.5' : '1.5'}
            strokeDasharray="4 3"
            className="transition-all duration-300"
          />
          <circle cx="480" cy="545" r="3.5" fill={isHighlighted('engineering-product') ? '#0a2540' : '#8a5a19'} stroke="#ffffff" strokeWidth="1.5" />

          {/* 5. NODE 3 TETHER */}
          <line
            x1="264"
            y1="445"
            x2="230"
            y2="461"
            stroke={isHighlighted('product') ? '#0a2540' : 'var(--border-strong)'}
            strokeWidth={isHighlighted('product') ? '2.5' : '1.5'}
            strokeDasharray="4 3"
            className="transition-all duration-300"
          />
          <circle cx="230" cy="461" r="3.5" fill={isHighlighted('product') ? '#0a2540' : '#8a5a19'} stroke="#ffffff" strokeWidth="1.5" />

          {/* 6. VECTOR C TETHER */}
          <line
            x1="335"
            y1="259"
            x2="230"
            y2="201"
            stroke={isHighlighted('product-design') ? '#0a2540' : 'var(--border-strong)'}
            strokeWidth={isHighlighted('product-design') ? '2.5' : '1.5'}
            strokeDasharray="4 3"
            className="transition-all duration-300"
          />
          <circle cx="230" cy="201" r="3.5" fill={isHighlighted('product-design') ? '#0a2540' : '#8a5a19'} stroke="#ffffff" strokeWidth="1.5" />

          {/* ------------------------------------------------------------- */}
          {/* THE 3 PRIMARY EDGES OF THE EQUILATERAL TRIANGLE               */}
          {/* ------------------------------------------------------------- */}

          {/* RIGHT EDGE: DESIGN <-> ENGINEERING */}
          <line
            x1="480"
            y1="138"
            x2="674"
            y2="434"
            stroke={isHighlighted('design-engineering') ? '#0a2540' : 'rgba(10, 37, 64, 0.22)'}
            strokeWidth={isHighlighted('design-engineering') ? '3.5' : '2'}
            strokeDasharray={isHighlighted('design-engineering') ? '8 4' : undefined}
            className="transition-all duration-300"
          />

          {/* BOTTOM EDGE: ENGINEERING <-> PRODUCT */}
          <line
            x1="286"
            y1="434"
            x2="674"
            y2="434"
            stroke={isHighlighted('engineering-product') ? '#0a2540' : 'rgba(10, 37, 64, 0.22)'}
            strokeWidth={isHighlighted('engineering-product') ? '3.5' : '2'}
            strokeDasharray={isHighlighted('engineering-product') ? '8 4' : undefined}
            className="transition-all duration-300"
          />

          {/* LEFT EDGE: PRODUCT <-> DESIGN */}
          <line
            x1="286"
            y1="434"
            x2="480"
            y2="138"
            stroke={isHighlighted('product-design') ? '#0a2540' : 'rgba(10, 37, 64, 0.22)'}
            strokeWidth={isHighlighted('product-design') ? '3.5' : '2'}
            strokeDasharray={isHighlighted('product-design') ? '8 4' : undefined}
            className="transition-all duration-300"
          />

          {/* ------------------------------------------------------------- */}
          {/* EDGE INTERSECTION INTERACTIVE BADGES                          */}
          {/* ------------------------------------------------------------- */}

          {/* Right Edge Badge: ZERO-HANDOFF (577, 286) */}
          <g
            className="pointer-events-auto cursor-pointer group"
            onMouseEnter={() => setHoveredId('design-engineering')}
            onMouseLeave={() => setHoveredId(null)}
            onClick={() => handleCardClick('design-engineering')}
          >
            <rect
              x="529"
              y="272"
              width="96"
              height="28"
              rx="14"
              fill={isHighlighted('design-engineering') ? '#0a2540' : '#ffffff'}
              stroke={isHighlighted('design-engineering') ? '#0a2540' : 'rgba(10, 37, 64, 0.2)'}
              strokeWidth="1.5"
              className="transition-all duration-300 shadow-sm"
            />
            <text
              x="577"
              y="290"
              textAnchor="middle"
              className={`font-mono text-[9px] font-bold tracking-wider select-none ${
                isHighlighted('design-engineering') ? 'fill-white' : 'fill-[#0a2540]'
              }`}
            >
              ZERO-HANDOFF
            </text>
          </g>

          {/* Bottom Edge Badge: PROTOCOL-AWARE (480, 434) */}
          <g
            className="pointer-events-auto cursor-pointer group"
            onMouseEnter={() => setHoveredId('engineering-product')}
            onMouseLeave={() => setHoveredId(null)}
            onClick={() => handleCardClick('engineering-product')}
          >
            <rect
              x="422"
              y="420"
              width="116"
              height="28"
              rx="14"
              fill={isHighlighted('engineering-product') ? '#0a2540' : '#ffffff'}
              stroke={isHighlighted('engineering-product') ? '#0a2540' : 'rgba(10, 37, 64, 0.2)'}
              strokeWidth="1.5"
              className="transition-all duration-300 shadow-sm"
            />
            <text
              x="480"
              y="438"
              textAnchor="middle"
              className={`font-mono text-[9px] font-bold tracking-wider select-none ${
                isHighlighted('engineering-product') ? 'fill-white' : 'fill-[#0a2540]'
              }`}
            >
              PROTOCOL-AWARE
            </text>
          </g>

          {/* Left Edge Badge: SPATIAL CLARITY (383, 286) */}
          <g
            className="pointer-events-auto cursor-pointer group"
            onMouseEnter={() => setHoveredId('product-design')}
            onMouseLeave={() => setHoveredId(null)}
            onClick={() => handleCardClick('product-design')}
          >
            <rect
              x="325"
              y="272"
              width="116"
              height="28"
              rx="14"
              fill={isHighlighted('product-design') ? '#0a2540' : '#ffffff'}
              stroke={isHighlighted('product-design') ? '#0a2540' : 'rgba(10, 37, 64, 0.2)'}
              strokeWidth="1.5"
              className="transition-all duration-300 shadow-sm"
            />
            <text
              x="383"
              y="290"
              textAnchor="middle"
              className={`font-mono text-[9px] font-bold tracking-wider select-none ${
                isHighlighted('product-design') ? 'fill-white' : 'fill-[#0a2540]'
              }`}
            >
              SPATIAL CLARITY
            </text>
          </g>

          {/* ------------------------------------------------------------- */}
          {/* THE 3 PROMINENT DISCIPLINE VERTICES                           */}
          {/* ------------------------------------------------------------- */}

          {/* APEX: NODE 1 // DESIGN (480, 138) */}
          <g
            className="pointer-events-auto cursor-pointer group"
            onMouseEnter={() => setHoveredId('design')}
            onMouseLeave={() => setHoveredId(null)}
            onClick={() => handleCardClick('design')}
          >
            <circle
              cx="480"
              cy="138"
              r={isHighlighted('design') ? '34' : '24'}
              fill="none"
              stroke={isHighlighted('design') ? '#0a2540' : '#b88a44'}
              strokeWidth={isHighlighted('design') ? '2.5' : '1.5'}
              opacity={isHighlighted('design') ? '0.9' : '0.45'}
              strokeDasharray="4 2"
              className="transition-all duration-300"
            />
            <circle
              cx="480"
              cy="138"
              r="18"
              fill="#ffffff"
              stroke={isHighlighted('design') ? '#0a2540' : 'rgba(10, 37, 64, 0.24)'}
              strokeWidth="2"
              className="transition-all duration-300 shadow-sm"
            />
            <circle cx="480" cy="138" r="7" fill={isHighlighted('design') ? '#0a2540' : '#8a5a19'} />
            <text
              x="480"
              y="108"
              textAnchor="middle"
              className="font-mono text-xs font-bold uppercase tracking-widest fill-[#0a2540] select-none"
            >
              DESIGN
            </text>
          </g>

          {/* BOTTOM-RIGHT: NODE 2 // ENGINEERING (674, 434) */}
          <g
            className="pointer-events-auto cursor-pointer group"
            onMouseEnter={() => setHoveredId('engineering')}
            onMouseLeave={() => setHoveredId(null)}
            onClick={() => handleCardClick('engineering')}
          >
            <circle
              cx="674"
              cy="434"
              r={isHighlighted('engineering') ? '34' : '24'}
              fill="none"
              stroke={isHighlighted('engineering') ? '#0a2540' : '#b88a44'}
              strokeWidth={isHighlighted('engineering') ? '2.5' : '1.5'}
              opacity={isHighlighted('engineering') ? '0.9' : '0.45'}
              strokeDasharray="4 2"
              className="transition-all duration-300"
            />
            <circle
              cx="674"
              cy="434"
              r="18"
              fill="#ffffff"
              stroke={isHighlighted('engineering') ? '#0a2540' : 'rgba(10, 37, 64, 0.24)'}
              strokeWidth="2"
              className="transition-all duration-300 shadow-sm"
            />
            <circle cx="674" cy="434" r="7" fill={isHighlighted('engineering') ? '#0a2540' : '#8a5a19'} />
            <text
              x="674"
              y="474"
              textAnchor="middle"
              className="font-mono text-[11px] font-bold uppercase tracking-wider fill-[#0a2540] select-none"
            >
              ENGINEERING
            </text>
          </g>

          {/* BOTTOM-LEFT: NODE 3 // PRODUCT (286, 434) */}
          <g
            className="pointer-events-auto cursor-pointer group"
            onMouseEnter={() => setHoveredId('product')}
            onMouseLeave={() => setHoveredId(null)}
            onClick={() => handleCardClick('product')}
          >
            <circle
              cx="286"
              cy="434"
              r={isHighlighted('product') ? '34' : '24'}
              fill="none"
              stroke={isHighlighted('product') ? '#0a2540' : '#b88a44'}
              strokeWidth={isHighlighted('product') ? '2.5' : '1.5'}
              opacity={isHighlighted('product') ? '0.9' : '0.45'}
              strokeDasharray="4 2"
              className="transition-all duration-300"
            />
            <circle
              cx="286"
              cy="434"
              r="18"
              fill="#ffffff"
              stroke={isHighlighted('product') ? '#0a2540' : 'rgba(10, 37, 64, 0.24)'}
              strokeWidth="2"
              className="transition-all duration-300 shadow-sm"
            />
            <circle cx="286" cy="434" r="7" fill={isHighlighted('product') ? '#0a2540' : '#8a5a19'} />
            <text
              x="286"
              y="474"
              textAnchor="middle"
              className="font-mono text-[11px] font-bold uppercase tracking-wider fill-[#0a2540] select-none"
            >
              PRODUCT
            </text>
          </g>

          {/* ------------------------------------------------------------- */}
          {/* CENTER CONVERGENCE NEXUS (480, 340)                           */}
          {/* ------------------------------------------------------------- */}
          <g
            className="pointer-events-auto cursor-pointer group"
            onMouseEnter={() => setHoveredId('convergence')}
            onMouseLeave={() => setHoveredId(null)}
            onClick={() => handleCardClick('convergence')}
          >
            {/* Radiant Backdrop Aura */}
            <circle cx="480" cy="340" r="60" fill="url(#centerAura)" />
            {/* Outer Ring */}
            <circle
              cx="480"
              cy="340"
              r="48"
              fill="#ffffff"
              stroke={activeId === 'convergence' ? '#0a2540' : 'rgba(10, 37, 64, 0.25)'}
              strokeWidth={activeId === 'convergence' ? '3' : '1.5'}
              className="transition-all duration-300 shadow-md"
            />
            {/* Inner Dashed Ring */}
            <circle
              cx="480"
              cy="340"
              r="28"
              fill={activeId === 'convergence' ? 'rgba(10, 37, 64, 0.08)' : 'none'}
              stroke="#b88a44"
              strokeWidth="1"
              strokeDasharray="4 3"
            />
            {/* Crosshairs */}
            <line x1="480" y1="284" x2="480" y2="296" stroke="#b88a44" strokeWidth="1.5" />
            <line x1="480" y1="384" x2="480" y2="396" stroke="#b88a44" strokeWidth="1.5" />
            <line x1="424" y1="340" x2="436" y2="340" stroke="#b88a44" strokeWidth="1.5" />
            <line x1="524" y1="340" x2="536" y2="340" stroke="#b88a44" strokeWidth="1.5" />

            <text
              x="480"
              y="336"
              textAnchor="middle"
              className="font-mono text-[10px] font-bold uppercase tracking-wider fill-[#141414] select-none"
            >
              CONVERGENCE
            </text>
            <text
              x="480"
              y="348"
              textAnchor="middle"
              className="font-mono text-[8px] uppercase tracking-wider fill-[#8a5a19] font-bold select-none"
            >
              DESIGN ENGINEER
            </text>
            <text
              x="480"
              y="359"
              textAnchor="middle"
              className="font-mono text-[7px] uppercase tracking-widest fill-[#595959] select-none"
            >
              FE · DESIGN · AI
            </text>
          </g>
        </svg>

        {/* ----------------------------------------------------------------------- */}
        {/* COMPACT PERIMETER NODE SELECTORS (NO INLINE OVERLAP WITH SVG)           */}
        {/* ----------------------------------------------------------------------- */}
        <FloatingCard
          id="design"
          title={CONVERGENCE_DETAILS.design.title}
          subtitle={CONVERGENCE_DETAILS.design.subtitle}
          activeId={activeId}
          onHover={setHoveredId}
          onLeave={() => setHoveredId(null)}
          onClick={handleCardClick}
          compactOnly
          style={{ left: 300, bottom: 601, width: 360 }}
          className="absolute"
        />

        <FloatingCard
          id="product-design"
          title={CONVERGENCE_DETAILS['product-design'].title}
          subtitle={CONVERGENCE_DETAILS['product-design'].subtitle}
          activeId={activeId}
          onHover={setHoveredId}
          onLeave={() => setHoveredId(null)}
          onClick={handleCardClick}
          compactOnly
          style={{ left: 10, top: 125, width: 220 }}
          className="absolute"
        />

        <FloatingCard
          id="design-engineering"
          title={CONVERGENCE_DETAILS['design-engineering'].title}
          subtitle={CONVERGENCE_DETAILS['design-engineering'].subtitle}
          activeId={activeId}
          onHover={setHoveredId}
          onLeave={() => setHoveredId(null)}
          onClick={handleCardClick}
          compactOnly
          style={{ left: 730, top: 125, width: 220 }}
          className="absolute"
        />

        <FloatingCard
          id="product"
          title={CONVERGENCE_DETAILS.product.title}
          subtitle={CONVERGENCE_DETAILS.product.subtitle}
          activeId={activeId}
          onHover={setHoveredId}
          onLeave={() => setHoveredId(null)}
          onClick={handleCardClick}
          compactOnly
          style={{ left: 10, bottom: 143, width: 220 }}
          className="absolute"
        />

        <FloatingCard
          id="engineering-product"
          title={CONVERGENCE_DETAILS['engineering-product'].title}
          subtitle={CONVERGENCE_DETAILS['engineering-product'].subtitle}
          activeId={activeId}
          onHover={setHoveredId}
          onLeave={() => setHoveredId(null)}
          onClick={handleCardClick}
          compactOnly
          style={{ left: 300, top: 545, width: 360 }}
          className="absolute"
        />

        <FloatingCard
          id="engineering"
          title={CONVERGENCE_DETAILS.engineering.title}
          subtitle={CONVERGENCE_DETAILS.engineering.subtitle}
          activeId={activeId}
          onHover={setHoveredId}
          onLeave={() => setHoveredId(null)}
          onClick={handleCardClick}
          compactOnly
          style={{ left: 730, bottom: 143, width: 220 }}
          className="absolute"
        />
      </div>

      {/* Desktop Docked Inspector: Fixed height prevents UI thrashing across hover/pin states */}
      <div className="hidden lg:block max-w-[960px] mx-auto mt-6">
        <div className="rounded-2xl border border-[var(--border-strong)] bg-[var(--surface)] glass-surface p-6 shadow-[var(--shadow-card)] h-[312px] flex flex-col">
          <div className="shrink-0 flex flex-wrap items-center justify-between gap-2 pb-3 mb-3 border-b border-[var(--border)]">
            <div>
              <p className="font-mono text-[11px] font-bold uppercase tracking-widest text-[var(--accent-warm)]">
                {inspectedDetail.kicker}
              </p>
              <h3 className="mt-0.5 text-lg font-bold text-[var(--text)]">
                {inspectedDetail.title}
              </h3>
            </div>
            {pinnedId ? (
              <button
                type="button"
                onClick={() => {
                  trackEvent('craft_triangle_pin', {
                    node_id: 'convergence',
                    previous_node_id: pinnedId,
                    pin_action: 'reset',
                    category: 'Craft_Exploration',
                  });
                  setPinnedId(null);
                }}
                className="inline-flex h-7 items-center rounded-full border border-[var(--border-strong)] bg-white/75 px-3 font-mono text-[11px] font-medium text-[var(--text-muted)] hover:border-[#0a2540] hover:text-[#0a2540] cursor-pointer"
              >
                Reset to Convergence ↺
              </button>
            ) : (
              <span className="inline-flex h-7 items-center font-mono text-[11px] text-[var(--text-subtle)]">
                Hover or click any node to pin details
              </span>
            )}
          </div>
          <ConvergenceDetailBody detail={inspectedDetail} stickyTags />
        </div>
      </div>

      {/* ========================================================================= */}
      {/* MOBILE & TABLET LAYOUT (< lg): White Frosted Panels & Hero Dial            */}
      {/* ========================================================================= */}
      <div className="lg:hidden flex flex-col gap-5">
        {/* Prominent Centered Triangle SVG Hero Dial */}
        <div className="w-full max-w-md mx-auto p-4 sm:p-6 rounded-2xl border border-[var(--border-strong)] bg-[var(--surface)] glass-surface shadow-[var(--shadow-card)]">
          <div className="text-center mb-3">
            <span className="font-mono text-[10px] uppercase tracking-widest text-[var(--accent-warm)] font-bold">
              TAP NODES &amp; EDGES TO INSPECT
            </span>
          </div>
          <svg
            viewBox="0 0 500 420"
            className="w-full h-auto overflow-visible select-none"
            aria-label="Triangular Discipline Motif"
          >
            {/* Radar rings */}
            <circle cx="250" cy="245" r="70" fill="none" stroke="var(--border)" strokeDasharray="4 4" opacity="0.45" />
            <circle cx="250" cy="245" r="135" fill="none" stroke="var(--border)" strokeDasharray="5 5" opacity="0.32" />

            {/* Median lines */}
            <line x1="250" y1="44" x2="250" y2="245" stroke="var(--border)" strokeDasharray="3 3" opacity="0.6" />
            <line x1="430" y1="355" x2="250" y2="245" stroke="var(--border)" strokeDasharray="3 3" opacity="0.6" />
            <line x1="70" y1="355" x2="250" y2="245" stroke="var(--border)" strokeDasharray="3 3" opacity="0.6" />

            {/* Polygon */}
            <polygon points="250,44 430,355 70,355" fill="rgba(255,255,255,0.55)" />

            {/* Edges */}
            <line
              x1="250"
              y1="44"
              x2="430"
              y2="355"
              stroke={isHighlighted('design-engineering') ? '#0a2540' : 'rgba(10, 37, 64, 0.24)'}
              strokeWidth={isHighlighted('design-engineering') ? '3.5' : '2'}
              strokeDasharray={isHighlighted('design-engineering') ? '6 3' : undefined}
            />
            <line
              x1="70"
              y1="355"
              x2="430"
              y2="355"
              stroke={isHighlighted('engineering-product') ? '#0a2540' : 'rgba(10, 37, 64, 0.24)'}
              strokeWidth={isHighlighted('engineering-product') ? '3.5' : '2'}
              strokeDasharray={isHighlighted('engineering-product') ? '6 3' : undefined}
            />
            <line
              x1="70"
              y1="355"
              x2="250"
              y2="44"
              stroke={isHighlighted('product-design') ? '#0a2540' : 'rgba(10, 37, 64, 0.24)'}
              strokeWidth={isHighlighted('product-design') ? '3.5' : '2'}
              strokeDasharray={isHighlighted('product-design') ? '6 3' : undefined}
            />

            {/* Badges on Edges */}
            <g onClick={() => handleCardClick('design-engineering')}>
              <rect
                x="295"
                y="188"
                width="90"
                height="26"
                rx="13"
                fill={isHighlighted('design-engineering') ? '#0a2540' : '#ffffff'}
                stroke={isHighlighted('design-engineering') ? '#0a2540' : 'rgba(10, 37, 64, 0.22)'}
              />
              <text
                x="340"
                y="205"
                textAnchor="middle"
                className={`font-mono text-[8px] font-bold ${
                  isHighlighted('design-engineering') ? 'fill-white' : 'fill-[#0a2540]'
                }`}
              >
                DESIGN × ENG
              </text>
            </g>

            <g onClick={() => handleCardClick('engineering-product')}>
              <rect
                x="195"
                y="342"
                width="110"
                height="26"
                rx="13"
                fill={isHighlighted('engineering-product') ? '#0a2540' : '#ffffff'}
                stroke={isHighlighted('engineering-product') ? '#0a2540' : 'rgba(10, 37, 64, 0.22)'}
              />
              <text
                x="250"
                y="359"
                textAnchor="middle"
                className={`font-mono text-[8px] font-bold ${
                  isHighlighted('engineering-product') ? 'fill-white' : 'fill-[#0a2540]'
                }`}
              >
                ENG × PRODUCT
              </text>
            </g>

            <g onClick={() => handleCardClick('product-design')}>
              <rect
                x="110"
                y="188"
                width="100"
                height="26"
                rx="13"
                fill={isHighlighted('product-design') ? '#0a2540' : '#ffffff'}
                stroke={isHighlighted('product-design') ? '#0a2540' : 'rgba(10, 37, 64, 0.22)'}
              />
              <text
                x="160"
                y="205"
                textAnchor="middle"
                className={`font-mono text-[8px] font-bold ${
                  isHighlighted('product-design') ? 'fill-white' : 'fill-[#0a2540]'
                }`}
              >
                PRODUCT × DESIGN
              </text>
            </g>

            {/* Vertices */}
            <g onClick={() => handleCardClick('design')}>
              <circle cx="250" cy="44" r="20" fill="#ffffff" stroke="#0a2540" strokeWidth="2" />
              <circle cx="250" cy="44" r="7" fill="#8a5a19" />
              <text x="250" y="16" textAnchor="middle" className="font-mono text-[11px] font-bold fill-[#0a2540]">
                DESIGN
              </text>
            </g>

            <g onClick={() => handleCardClick('engineering')}>
              <circle cx="430" cy="355" r="20" fill="#ffffff" stroke="#0a2540" strokeWidth="2" />
              <circle cx="430" cy="355" r="7" fill="#8a5a19" />
              <text x="430" y="395" textAnchor="middle" className="font-mono text-[11px] font-bold fill-[#0a2540]">
                ENGINEERING
              </text>
            </g>

            <g onClick={() => handleCardClick('product')}>
              <circle cx="70" cy="355" r="20" fill="#ffffff" stroke="#0a2540" strokeWidth="2" />
              <circle cx="70" cy="355" r="7" fill="#8a5a19" />
              <text x="70" y="395" textAnchor="middle" className="font-mono text-[11px] font-bold fill-[#0a2540]">
                PRODUCT
              </text>
            </g>

            {/* Center Nexus */}
            <g onClick={() => handleCardClick('convergence')}>
              <circle
                cx="250"
                cy="245"
                r="38"
                fill="#ffffff"
                stroke={activeId === 'convergence' ? '#0a2540' : 'rgba(10, 37, 64, 0.25)'}
                strokeWidth="2"
              />
              <text
                x="250"
                y="241"
                textAnchor="middle"
                className="font-mono text-[9px] font-bold uppercase fill-[#141414]"
              >
                CONVERGENCE
              </text>
              <text
                x="250"
                y="253"
                textAnchor="middle"
                className="font-mono text-[7px] uppercase fill-[#8a5a19] font-semibold"
              >
                FE · DESIGN · AI
              </text>
            </g>
          </svg>
        </div>

        {/* The 3 Discipline Cards on Mobile */}
        <div className="space-y-3">
          <div className="text-xs font-mono uppercase tracking-wider text-[var(--text-subtle)] font-bold">
            01 // THE THREE PILLARS (TAP TO EXPAND)
          </div>

          {(['design', 'engineering', 'product'] as const).map((id) => {
            const detail = CONVERGENCE_DETAILS[id];
            return (
              <FloatingCard
                key={id}
                id={id}
                title={detail.title}
                subtitle={detail.subtitle}
                activeId={activeId}
                onHover={setHoveredId}
                onLeave={() => setHoveredId(null)}
                onClick={handleCardClick}
                expandDirection="down"
              >
                <ConvergenceDetailBody detail={detail} />
              </FloatingCard>
            );
          })}
        </div>

        {/* The 3 Intersections on Mobile */}
        <div className="space-y-3">
          <div className="text-xs font-mono uppercase tracking-wider text-[var(--text-subtle)] font-bold">
            02 // THE THREE INTERSECTIONS (TAP TO EXPAND)
          </div>

          {(['design-engineering', 'engineering-product', 'product-design'] as const).map((id) => {
            const detail = CONVERGENCE_DETAILS[id];
            return (
              <FloatingCard
                key={id}
                id={id}
                title={detail.title}
                subtitle={detail.subtitle}
                activeId={activeId}
                onHover={setHoveredId}
                onLeave={() => setHoveredId(null)}
                onClick={handleCardClick}
                expandDirection="down"
              >
                <ConvergenceDetailBody detail={detail} />
              </FloatingCard>
            );
          })}
        </div>
      </div>
    </div>
  );
}
