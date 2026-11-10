'use client';

import React, { useState } from 'react';

export type ConvergenceElementId =
  | 'design'
  | 'engineering'
  | 'product'
  | 'design-engineering'
  | 'engineering-product'
  | 'product-design'
  | 'convergence'
  | null;

interface FloatingCardProps {
  id: ConvergenceElementId;
  nodeTag?: string;
  compassBadge?: string;
  title: string;
  subtitle: string;
  activeId: ConvergenceElementId;
  onHover: (id: ConvergenceElementId) => void;
  onLeave: () => void;
  onClick: (id: ConvergenceElementId) => void;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  expandDirection?: 'down' | 'up';
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
}: FloatingCardProps) {
  // ONLY expand the single component currently being hovered (or pinned)
  const isExpanded = activeId === id;

  return (
    <div
      onMouseEnter={() => onHover(id)}
      onMouseLeave={onLeave}
      onClick={() => onClick(id)}
      style={style}
      className={`group cursor-pointer rounded-2xl border transition-all duration-300 ${
        isExpanded
          ? 'border-amber-500 bg-white/96 backdrop-blur-3xl shadow-[0_12px_40px_rgba(0,0,0,0.14)] ring-1 ring-amber-500/40 z-30'
          : 'border-neutral-200/90 bg-white/92 backdrop-blur-2xl hover:border-amber-400/80 shadow-[0_4px_20px_rgba(0,0,0,0.06)] z-20'
      } ${className}`}
    >
      <div className="p-3.5 sm:p-4 min-h-[76px] flex flex-col justify-center">
        {/* If expanding UP, render the expandable body FIRST (above the title) */}
        {expandDirection === 'up' && (
          <div
            className={`grid transition-all duration-300 ease-out overflow-hidden ${
              isExpanded
                ? 'grid-rows-[1fr] opacity-100 mb-3 pb-3 border-b border-neutral-200/90'
                : 'grid-rows-[0fr] opacity-0'
            }`}
          >
            <div className="overflow-hidden text-neutral-700">
              {children}
            </div>
          </div>
        )}

        {/* Title Row with subtle expand indicator (Clean aesthetic, high-contrast dark text) */}
        <div className="flex items-start justify-between gap-2">
          <h4 className="text-sm sm:text-base font-bold text-neutral-900 leading-snug">
            {title}
          </h4>
          <span
            className={`text-xs text-neutral-400 transition-transform duration-300 font-mono shrink-0 mt-0.5 ${
              isExpanded
                ? expandDirection === 'up'
                  ? 'text-amber-600 font-bold'
                  : 'rotate-180 text-amber-600 font-bold'
                : 'group-hover:text-amber-600'
            }`}
          >
            {expandDirection === 'up' ? (isExpanded ? '▾' : '▴') : (isExpanded ? '▴' : '▾')}
          </span>
        </div>

        {/* Subtitle (Clean high-contrast text) */}
        <p className="mt-1 text-xs text-neutral-600 leading-relaxed font-normal">
          {subtitle}
        </p>

        {/* If expanding DOWN, render the expandable body LAST (beneath the subtitle) */}
        {expandDirection === 'down' && (
          <div
            className={`grid transition-all duration-300 ease-out overflow-hidden ${
              isExpanded
                ? 'grid-rows-[1fr] opacity-100 mt-3 pt-3 border-t border-neutral-200/90'
                : 'grid-rows-[0fr] opacity-0'
            }`}
          >
            <div className="overflow-hidden text-neutral-700">
              {children}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function ConvergenceTriangle() {
  const [hoveredId, setHoveredId] = useState<ConvergenceElementId>(null);
  const [pinnedId, setPinnedId] = useState<ConvergenceElementId>(null);

  const activeId = pinnedId || hoveredId;

  const handleCardClick = (id: ConvergenceElementId) => {
    setPinnedId(pinnedId === id ? null : id);
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
    <div className="w-full relative py-2">
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
              <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.25" />
              <stop offset="70%" stopColor="#f59e0b" stopOpacity="0.05" />
              <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Background Concentric Coordinate Radar Rings Scaled 20% (r: 90, 174, 258) Centered at (480, 340) */}
          <circle cx="480" cy="340" r="90" fill="none" stroke="var(--border)" strokeDasharray="4 4" opacity="0.35" />
          <circle cx="480" cy="340" r="174" fill="none" stroke="var(--border)" strokeDasharray="5 5" opacity="0.25" />
          <circle cx="480" cy="340" r="258" fill="none" stroke="var(--border)" strokeDasharray="6 6" opacity="0.18" />

          {/* Triangle Medians (Centroid to Scaled Vertices) */}
          <line x1="480" y1="138" x2="480" y2="340" stroke="var(--border)" strokeDasharray="3 3" opacity="0.5" />
          <line x1="674" y1="434" x2="480" y2="340" stroke="var(--border)" strokeDasharray="3 3" opacity="0.5" />
          <line x1="286" y1="434" x2="480" y2="340" stroke="var(--border)" strokeDasharray="3 3" opacity="0.5" />

          {/* Translucent 20% Scaled Triangle Surface Fill */}
          <polygon points="480,138 674,434 286,434" fill="var(--surface)" opacity="0.45" />

          {/* ------------------------------------------------------------------- */}
          {/* THE 6 DASHED TETHERS RADIATING DIRECTLY IN LINE WITH THE CENTER (480, 340) */}
          {/* ------------------------------------------------------------------- */}

          {/* 1. NODE 1 TETHER: Radiates straight UP from Node 1 apex ring (480, 114) to bottom center of card (480, 84) */}
          <line
            x1="480"
            y1="114"
            x2="480"
            y2="84"
            stroke={isHighlighted('design') ? '#f59e0b' : 'var(--border-strong)'}
            strokeWidth={isHighlighted('design') ? '2.5' : '1.5'}
            strokeDasharray="4 3"
            className="transition-all duration-300"
          />
          <circle cx="480" cy="84" r="3.5" fill="#f59e0b" stroke="#ffffff" strokeWidth="1.5" />

          {/* 2. VECTOR A TETHER: Radiates UP-RIGHT from Zero-Handoff badge (625, 259) to bottom-left of card (730, 201) */}
          <line
            x1="625"
            y1="259"
            x2="730"
            y2="201"
            stroke={isHighlighted('design-engineering') ? '#f59e0b' : 'var(--border-strong)'}
            strokeWidth={isHighlighted('design-engineering') ? '2.5' : '1.5'}
            strokeDasharray="4 3"
            className="transition-all duration-300"
          />
          <circle cx="730" cy="201" r="3.5" fill="#f59e0b" stroke="#ffffff" strokeWidth="1.5" />

          {/* 3. NODE 2 TETHER: Radiates DOWN-RIGHT from Node 2 ring (696, 445) to top-left of card (730, 461) */}
          <line
            x1="696"
            y1="445"
            x2="730"
            y2="461"
            stroke={isHighlighted('engineering') ? '#f59e0b' : 'var(--border-strong)'}
            strokeWidth={isHighlighted('engineering') ? '2.5' : '1.5'}
            strokeDasharray="4 3"
            className="transition-all duration-300"
          />
          <circle cx="730" cy="461" r="3.5" fill="#f59e0b" stroke="#ffffff" strokeWidth="1.5" />

          {/* 4. VECTOR B TETHER: Radiates straight DOWN from Protocol-Aware badge (480, 448) to top middle of card (480, 560) */}
          <line
            x1="480"
            y1="448"
            x2="480"
            y2="560"
            stroke={isHighlighted('engineering-product') ? '#f59e0b' : 'var(--border-strong)'}
            strokeWidth={isHighlighted('engineering-product') ? '2.5' : '1.5'}
            strokeDasharray="4 3"
            className="transition-all duration-300"
          />
          <circle cx="480" cy="560" r="3.5" fill="#f59e0b" stroke="#ffffff" strokeWidth="1.5" />

          {/* 5. NODE 3 TETHER: Radiates DOWN-LEFT from Node 3 ring (264, 445) to top-right of card (230, 461) */}
          <line
            x1="264"
            y1="445"
            x2="230"
            y2="461"
            stroke={isHighlighted('product') ? '#f59e0b' : 'var(--border-strong)'}
            strokeWidth={isHighlighted('product') ? '2.5' : '1.5'}
            strokeDasharray="4 3"
            className="transition-all duration-300"
          />
          <circle cx="230" cy="461" r="3.5" fill="#f59e0b" stroke="#ffffff" strokeWidth="1.5" />

          {/* 6. VECTOR C TETHER: Radiates UP-LEFT from Spatial Clarity badge (335, 259) to bottom-right of card (230, 201) */}
          <line
            x1="335"
            y1="259"
            x2="230"
            y2="201"
            stroke={isHighlighted('product-design') ? '#f59e0b' : 'var(--border-strong)'}
            strokeWidth={isHighlighted('product-design') ? '2.5' : '1.5'}
            strokeDasharray="4 3"
            className="transition-all duration-300"
          />
          <circle cx="230" cy="201" r="3.5" fill="#f59e0b" stroke="#ffffff" strokeWidth="1.5" />

          {/* ------------------------------------------------------------- */}
          {/* THE 3 PRIMARY EDGES OF THE 20% LARGER EQUILATERAL TRIANGLE    */}
          {/* ------------------------------------------------------------- */}

          {/* RIGHT EDGE: DESIGN <-> ENGINEERING (Length ~389px) */}
          <line
            x1="480"
            y1="138"
            x2="674"
            y2="434"
            stroke={isHighlighted('design-engineering') ? '#f59e0b' : 'var(--border-strong)'}
            strokeWidth={isHighlighted('design-engineering') ? '4' : '2.5'}
            strokeDasharray={isHighlighted('design-engineering') ? '8 4' : undefined}
            className="transition-all duration-300"
          />

          {/* BOTTOM EDGE: ENGINEERING <-> PRODUCT (Length 388px) */}
          <line
            x1="286"
            y1="434"
            x2="674"
            y2="434"
            stroke={isHighlighted('engineering-product') ? '#f59e0b' : 'var(--border-strong)'}
            strokeWidth={isHighlighted('engineering-product') ? '4' : '2.5'}
            strokeDasharray={isHighlighted('engineering-product') ? '8 4' : undefined}
            className="transition-all duration-300"
          />

          {/* LEFT EDGE: PRODUCT <-> DESIGN (Length ~389px) */}
          <line
            x1="286"
            y1="434"
            x2="480"
            y2="138"
            stroke={isHighlighted('product-design') ? '#f59e0b' : 'var(--border-strong)'}
            strokeWidth={isHighlighted('product-design') ? '4' : '2.5'}
            strokeDasharray={isHighlighted('product-design') ? '8 4' : undefined}
            className="transition-all duration-300"
          />

          {/* ------------------------------------------------------------- */}
          {/* EDGE INTERSECTION INTERACTIVE BADGES (20% SCALED OUTWARD)     */}
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
              fill={isHighlighted('design-engineering') ? '#f59e0b' : '#ffffff'}
              stroke={isHighlighted('design-engineering') ? '#d97706' : '#e5e5e5'}
              strokeWidth="1.5"
              className="transition-all duration-300 shadow-sm"
            />
            <text
              x="577"
              y="290"
              textAnchor="middle"
              className={`font-mono text-[9px] font-bold tracking-wider select-none ${
                isHighlighted('design-engineering') ? 'fill-white' : 'fill-neutral-900'
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
              fill={isHighlighted('engineering-product') ? '#f59e0b' : '#ffffff'}
              stroke={isHighlighted('engineering-product') ? '#d97706' : '#e5e5e5'}
              strokeWidth="1.5"
              className="transition-all duration-300 shadow-sm"
            />
            <text
              x="480"
              y="438"
              textAnchor="middle"
              className={`font-mono text-[9px] font-bold tracking-wider select-none ${
                isHighlighted('engineering-product') ? 'fill-white' : 'fill-neutral-900'
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
              fill={isHighlighted('product-design') ? '#f59e0b' : '#ffffff'}
              stroke={isHighlighted('product-design') ? '#d97706' : '#e5e5e5'}
              strokeWidth="1.5"
              className="transition-all duration-300 shadow-sm"
            />
            <text
              x="383"
              y="290"
              textAnchor="middle"
              className={`font-mono text-[9px] font-bold tracking-wider select-none ${
                isHighlighted('product-design') ? 'fill-white' : 'fill-neutral-900'
              }`}
            >
              SPATIAL CLARITY
            </text>
          </g>

          {/* ------------------------------------------------------------- */}
          {/* THE 3 PROMINENT DISCIPLINE VERTICES (20% SCALED OUTWARD)      */}
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
              stroke="#f59e0b"
              strokeWidth={isHighlighted('design') ? '2.5' : '1.5'}
              opacity={isHighlighted('design') ? '0.9' : '0.4'}
              strokeDasharray="4 2"
              className="transition-all duration-300"
            />
            <circle
              cx="480"
              cy="138"
              r="18"
              fill="#ffffff"
              stroke={isHighlighted('design') ? '#f59e0b' : '#d4d4d4'}
              strokeWidth="2"
              className="transition-all duration-300 shadow-sm"
            />
            <circle cx="480" cy="138" r="7" fill="#f59e0b" />
            <text
              x="480"
              y="108"
              textAnchor="middle"
              className="font-mono text-xs font-bold uppercase tracking-widest fill-amber-600 select-none"
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
              stroke="#f59e0b"
              strokeWidth={isHighlighted('engineering') ? '2.5' : '1.5'}
              opacity={isHighlighted('engineering') ? '0.9' : '0.4'}
              strokeDasharray="4 2"
              className="transition-all duration-300"
            />
            <circle
              cx="674"
              cy="434"
              r="18"
              fill="#ffffff"
              stroke={isHighlighted('engineering') ? '#f59e0b' : '#d4d4d4'}
              strokeWidth="2"
              className="transition-all duration-300 shadow-sm"
            />
            <circle cx="674" cy="434" r="7" fill="#f59e0b" />
            <text
              x="674"
              y="474"
              textAnchor="middle"
              className="font-mono text-xs font-bold uppercase tracking-widest fill-amber-600 select-none"
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
              stroke="#f59e0b"
              strokeWidth={isHighlighted('product') ? '2.5' : '1.5'}
              opacity={isHighlighted('product') ? '0.9' : '0.4'}
              strokeDasharray="4 2"
              className="transition-all duration-300"
            />
            <circle
              cx="286"
              cy="434"
              r="18"
              fill="#ffffff"
              stroke={isHighlighted('product') ? '#f59e0b' : '#d4d4d4'}
              strokeWidth="2"
              className="transition-all duration-300 shadow-sm"
            />
            <circle cx="286" cy="434" r="7" fill="#f59e0b" />
            <text
              x="286"
              y="474"
              textAnchor="middle"
              className="font-mono text-xs font-bold uppercase tracking-widest fill-amber-600 select-none"
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
              stroke={activeId === 'convergence' ? '#f59e0b' : '#d4d4d4'}
              strokeWidth={activeId === 'convergence' ? '3' : '1.5'}
              className="transition-all duration-300 shadow-md"
            />
            {/* Inner Dashed Ring */}
            <circle
              cx="480"
              cy="340"
              r="28"
              fill={activeId === 'convergence' ? 'rgba(245, 158, 11, 0.15)' : 'none'}
              stroke="#f59e0b"
              strokeWidth="1"
              strokeDasharray="4 3"
            />
            {/* Crosshairs */}
            <line x1="480" y1="284" x2="480" y2="296" stroke="#f59e0b" strokeWidth="1.5" />
            <line x1="480" y1="384" x2="480" y2="396" stroke="#f59e0b" strokeWidth="1.5" />
            <line x1="424" y1="340" x2="436" y2="340" stroke="#f59e0b" strokeWidth="1.5" />
            <line x1="524" y1="340" x2="536" y2="340" stroke="#f59e0b" strokeWidth="1.5" />

            <text
              x="480"
              y="336"
              textAnchor="middle"
              className="font-mono text-[10px] font-bold uppercase tracking-wider fill-neutral-900 select-none"
            >
              CONVERGENCE
            </text>
            <text
              x="480"
              y="348"
              textAnchor="middle"
              className="font-mono text-[8px] uppercase tracking-wider fill-amber-600 font-bold select-none"
            >
              DESIGN ENGINEER
            </text>
            <text
              x="480"
              y="359"
              textAnchor="middle"
              className="font-mono text-[7px] uppercase tracking-widest fill-neutral-500 select-none"
            >
              0 → 1 RIGOR
            </text>
          </g>
        </svg>

        {/* ----------------------------------------------------------------------- */}
        {/* TOP 3 PANELS: EXPAND DOWNWARD                                           */}
        {/* ----------------------------------------------------------------------- */}

        {/* 1. NODE 1 CARD: Bottom center anchored to top of radial dashed line (480, 84) */}
        <FloatingCard
          id="design"
          title="Visual Systems & Spatial Craft"
          subtitle="Figma token architectures matching Tailwind variables 1:1, custom 3D WebGL, and motion."
          activeId={activeId}
          onHover={setHoveredId}
          onLeave={() => setHoveredId(null)}
          onClick={handleCardClick}
          expandDirection="down"
          style={{ left: 300, top: 8, width: 360 }}
          className="absolute"
        >
          <div className="space-y-2 text-xs leading-relaxed">
            <p>
              Fine arts foundation translated into production design systems. Component token libraries designed in Figma drive Tailwind variables directly, preventing styling drift.
            </p>
            <div className="space-y-1.5 border-t border-neutral-200/90 pt-2 text-[11px]">
              <div>
                <strong className="text-neutral-900 font-semibold">Field Signal (AgOS):</strong> 3D Three.js grain bin geometry where diameter, height, and fill slopes directly mirror physical telemetry.
              </div>
              <div>
                <strong className="text-neutral-900 font-semibold">Neptune Finance:</strong> Full Figma token system directly driving production Tailwind classes and liquidation states.
              </div>
              <div>
                <strong className="text-neutral-900 font-semibold">stakefish:</strong> Procedural consensus motion explaining Ethereum Proof-of-Stake mechanics.
              </div>
            </div>
            <div className="pt-2 border-t border-neutral-200/90 flex flex-wrap gap-1">
              <span className="rounded bg-neutral-100 border border-neutral-200 px-1.5 py-0.5 text-[9px] font-mono text-neutral-700">
                Figma Tokens 1:1
              </span>
              <span className="rounded bg-neutral-100 border border-neutral-200 px-1.5 py-0.5 text-[9px] font-mono text-neutral-700">
                Three.js Spatial
              </span>
              <span className="rounded bg-neutral-100 border border-neutral-200 px-1.5 py-0.5 text-[9px] font-mono text-neutral-700">
                Motion Systems
              </span>
            </div>
          </div>
        </FloatingCard>

        {/* 2. VECTOR C PANEL: Bottom-right corner attached to radial line from Spatial Clarity (230, 201) */}
        <FloatingCard
          id="product-design"
          title="High-Stakes Decision Surfaces"
          subtitle="Translating complex debt liquidation ratios and inventories into intuitive spatial decisions."
          activeId={activeId}
          onHover={setHoveredId}
          onLeave={() => setHoveredId(null)}
          onClick={handleCardClick}
          expandDirection="down"
          style={{ left: 10, top: 125, width: 220 }}
          className="absolute"
        >
          <div className="space-y-2 text-xs leading-relaxed">
            <p>
              Translating abstract financial risks and agricultural inventory allocations into clear spatial twins, color-coded heatmaps, and instant decisions.
            </p>
            <div className="pt-2 border-t border-neutral-200/90 text-[10px] font-mono text-neutral-900 font-semibold">
              Output: Clear telemetry &amp; spatial confidence during critical choices
            </div>
          </div>
        </FloatingCard>

        {/* 3. VECTOR A PANEL: Bottom-left corner attached to radial line from Zero-Handoff (730, 201) */}
        <FloatingCard
          id="design-engineering"
          title="The Zero-Handoff Medium"
          subtitle="Figma token parity and author-time resolution eliminating cross-team handoff lag."
          activeId={activeId}
          onHover={setHoveredId}
          onLeave={() => setHoveredId(null)}
          onClick={handleCardClick}
          expandDirection="down"
          style={{ left: 730, top: 125, width: 220 }}
          className="absolute"
        >
          <div className="space-y-2 text-xs leading-relaxed">
            <p>
              Figma tokens map 1:1 to Tailwind CSS classes and React component props. Responsive edge cases, loading skeletons, and accessibility are resolved during authoring.
            </p>
            <div className="pt-2 border-t border-neutral-200/90 text-[10px] font-mono text-neutral-900 font-semibold">
              Output: ~40% faster time-to-market · Zero UI drift
            </div>
          </div>
        </FloatingCard>

        {/* ----------------------------------------------------------------------- */}
        {/* BOTTOM 3 PANELS: EXPAND UPWARD                                          */}
        {/* ----------------------------------------------------------------------- */}

        {/* 4. NODE 3 PANEL: Top-right corner attached to radial line from Node 3 (230, 461) */}
        <FloatingCard
          id="product"
          title="0 → 1 Ownership & Economics"
          subtitle="Deep immersion in domain economics, identifying user friction and deploying unprompted solutions."
          activeId={activeId}
          onHover={setHoveredId}
          onLeave={() => setHoveredId(null)}
          onClick={handleCardClick}
          expandDirection="up"
          style={{ left: 10, bottom: 143, width: 220 }}
          className="absolute"
        >
          <div className="space-y-2 text-xs leading-relaxed">
            <div className="space-y-1.5 text-[11px]">
              <div>
                <strong className="text-neutral-900 font-semibold">Neptune Balance Menu:</strong> Self-directed feature conceived &amp; shipped without a spec, becoming a core daily surface.
              </div>
              <div>
                <strong className="text-neutral-900 font-semibold">AgOS Logistics:</strong> Real-world forward contracts, basis pricing, storage allocations, and finances.
              </div>
              <div>
                <strong className="text-neutral-900 font-semibold">Agentic Velocity:</strong> Orchestrating Claude and Cursor for 3x execution speed with senior architectural taste.
              </div>
            </div>
            <div className="pt-2 border-t border-neutral-200/90 flex flex-wrap gap-1">
              <span className="rounded bg-neutral-100 border border-neutral-200 px-1.5 py-0.5 text-[9px] font-mono text-neutral-700">
                0 → 1 Discovery
              </span>
              <span className="rounded bg-neutral-100 border border-neutral-200 px-1.5 py-0.5 text-[9px] font-mono text-neutral-700">
                Domain Economics
              </span>
            </div>
          </div>
        </FloatingCard>

        {/* 5. VECTOR B COMPONENT: Top middle attached to radial line extending down from Protocol-Aware (480, 560) */}
        <FloatingCard
          id="engineering-product"
          title="Protocol-Aware Reality"
          subtitle="Interfaces architected directly around mechanical boundaries and transaction truth."
          activeId={activeId}
          onHover={setHoveredId}
          onLeave={() => setHoveredId(null)}
          onClick={handleCardClick}
          expandDirection="up"
          style={{ left: 300, bottom: 44, width: 360 }}
          className="absolute"
        >
          <div className="space-y-2 text-xs leading-relaxed">
            <p>
              UX is built around true mechanical constraints: RPC indexer latencies, contract confirmation states, and gas fallbacks. The UI never misrepresents technical reality.
            </p>
            <div className="pt-2 border-t border-neutral-200/90 text-[10px] font-mono text-neutral-900 font-semibold">
              Output: Zero UI fund-loss &amp; 100% verified state reflection
            </div>
          </div>
        </FloatingCard>

        {/* 6. NODE 2 CARD: Top-left corner attached to radial line from Node 2 (730, 461) */}
        <FloatingCard
          id="engineering"
          title="Deterministic Code Rigor"
          subtitle="Frontends as distributed systems coordinating smart contracts, indexer lag, and GPU memory."
          activeId={activeId}
          onHover={setHoveredId}
          onLeave={() => setHoveredId(null)}
          onClick={handleCardClick}
          expandDirection="up"
          style={{ left: 730, bottom: 143, width: 220 }}
          className="absolute"
        >
          <div className="space-y-2 text-xs leading-relaxed">
            <div className="space-y-1.5 text-[11px]">
              <div>
                <strong className="text-neutral-900 font-semibold">Neptune ($300M+ Volume):</strong> CosmWasm contracts on Injective, multi-step transaction lifecycles, and zero exploits.
              </div>
              <div>
                <strong className="text-neutral-900 font-semibold">AgOS (WebGL Lifecycle):</strong> GPU memory disposal, resize observation, and typed Neon PostgreSQL / Drizzle ORM.
              </div>
              <div>
                <strong className="text-neutral-900 font-semibold">Protocols:</strong> Injective CW3 multisig with Base64 payload decoding, Satsuma cross-chain yield routing.
              </div>
            </div>
            <div className="pt-2 border-t border-neutral-200/90 flex flex-wrap gap-1">
              <span className="rounded bg-neutral-100 border border-neutral-200 px-1.5 py-0.5 text-[9px] font-mono text-neutral-700">
                React 19 &amp; Next.js
              </span>
              <span className="rounded bg-neutral-100 border border-neutral-200 px-1.5 py-0.5 text-[9px] font-mono text-neutral-700">
                CosmWasm / EVM
              </span>
            </div>
          </div>
        </FloatingCard>
      </div>

      {/* ========================================================================= */}
      {/* MOBILE & TABLET LAYOUT (< lg): White Frosted Panels & Hero Dial            */}
      {/* ========================================================================= */}
      <div className="lg:hidden flex flex-col gap-5">
        {/* Prominent Centered Triangle SVG Hero Dial */}
        <div className="w-full max-w-md mx-auto p-4 sm:p-6 rounded-2xl border border-neutral-200/90 bg-white/94 backdrop-blur-2xl shadow-sm">
          <div className="text-center mb-3">
            <span className="font-mono text-[10px] uppercase tracking-widest text-amber-600 font-bold">
              TAP NODES &amp; EDGES TO INSPECT
            </span>
          </div>
          <svg
            viewBox="0 0 500 420"
            className="w-full h-auto overflow-visible select-none"
            aria-label="Triangular Discipline Motif"
          >
            {/* Radar rings */}
            <circle cx="250" cy="245" r="70" fill="none" stroke="var(--border)" strokeDasharray="4 4" opacity="0.4" />
            <circle cx="250" cy="245" r="135" fill="none" stroke="var(--border)" strokeDasharray="5 5" opacity="0.3" />

            {/* Median lines */}
            <line x1="250" y1="44" x2="250" y2="245" stroke="var(--border)" strokeDasharray="3 3" opacity="0.6" />
            <line x1="430" y1="355" x2="250" y2="245" stroke="var(--border)" strokeDasharray="3 3" opacity="0.6" />
            <line x1="70" y1="355" x2="250" y2="245" stroke="var(--border)" strokeDasharray="3 3" opacity="0.6" />

            {/* Polygon */}
            <polygon points="250,44 430,355 70,355" fill="var(--surface)" opacity="0.35" />

            {/* Edges */}
            <line
              x1="250"
              y1="44"
              x2="430"
              y2="355"
              stroke={isHighlighted('design-engineering') ? '#f59e0b' : 'var(--border-strong)'}
              strokeWidth={isHighlighted('design-engineering') ? '4' : '2.5'}
              strokeDasharray={isHighlighted('design-engineering') ? '6 3' : undefined}
            />
            <line
              x1="70"
              y1="355"
              x2="430"
              y2="355"
              stroke={isHighlighted('engineering-product') ? '#f59e0b' : 'var(--border-strong)'}
              strokeWidth={isHighlighted('engineering-product') ? '4' : '2.5'}
              strokeDasharray={isHighlighted('engineering-product') ? '6 3' : undefined}
            />
            <line
              x1="70"
              y1="355"
              x2="250"
              y2="44"
              stroke={isHighlighted('product-design') ? '#f59e0b' : 'var(--border-strong)'}
              strokeWidth={isHighlighted('product-design') ? '4' : '2.5'}
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
                fill={isHighlighted('design-engineering') ? '#f59e0b' : '#ffffff'}
                stroke={isHighlighted('design-engineering') ? '#d97706' : '#e5e5e5'}
              />
              <text
                x="340"
                y="205"
                textAnchor="middle"
                className={`font-mono text-[8px] font-bold ${
                  isHighlighted('design-engineering') ? 'fill-white' : 'fill-neutral-900'
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
                fill={isHighlighted('engineering-product') ? '#f59e0b' : '#ffffff'}
                stroke={isHighlighted('engineering-product') ? '#d97706' : '#e5e5e5'}
              />
              <text
                x="250"
                y="359"
                textAnchor="middle"
                className={`font-mono text-[8px] font-bold ${
                  isHighlighted('engineering-product') ? 'fill-white' : 'fill-neutral-900'
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
                fill={isHighlighted('product-design') ? '#f59e0b' : '#ffffff'}
                stroke={isHighlighted('product-design') ? '#d97706' : '#e5e5e5'}
              />
              <text
                x="160"
                y="205"
                textAnchor="middle"
                className={`font-mono text-[8px] font-bold ${
                  isHighlighted('product-design') ? 'fill-white' : 'fill-neutral-900'
                }`}
              >
                PRODUCT × DESIGN
              </text>
            </g>

            {/* Vertices */}
            <g onClick={() => handleCardClick('design')}>
              <circle cx="250" cy="44" r="20" fill="#ffffff" stroke="#f59e0b" strokeWidth="2" />
              <circle cx="250" cy="44" r="7" fill="#f59e0b" />
              <text x="250" y="16" textAnchor="middle" className="font-mono text-[11px] font-bold fill-amber-600">
                DESIGN
              </text>
            </g>

            <g onClick={() => handleCardClick('engineering')}>
              <circle cx="430" cy="355" r="20" fill="#ffffff" stroke="#f59e0b" strokeWidth="2" />
              <circle cx="430" cy="355" r="7" fill="#f59e0b" />
              <text x="430" y="395" textAnchor="middle" className="font-mono text-[11px] font-bold fill-amber-600">
                ENGINEERING
              </text>
            </g>

            <g onClick={() => handleCardClick('product')}>
              <circle cx="70" cy="355" r="20" fill="#ffffff" stroke="#f59e0b" strokeWidth="2" />
              <circle cx="70" cy="355" r="7" fill="#f59e0b" />
              <text x="70" y="395" textAnchor="middle" className="font-mono text-[11px] font-bold fill-amber-600">
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
                stroke={activeId === 'convergence' ? '#f59e0b' : '#d4d4d4'}
                strokeWidth="2"
              />
              <text
                x="250"
                y="241"
                textAnchor="middle"
                className="font-mono text-[9px] font-bold uppercase fill-neutral-900"
              >
                CONVERGENCE
              </text>
              <text
                x="250"
                y="253"
                textAnchor="middle"
                className="font-mono text-[7px] uppercase fill-amber-600 font-semibold"
              >
                FULL-STACK
              </text>
            </g>
          </svg>
        </div>

        {/* The 3 Discipline Cards on Mobile */}
        <div className="space-y-3">
          <div className="text-xs font-mono uppercase tracking-wider text-[var(--text-subtle)] font-bold">
            01 // THE THREE PILLARS (TAP TO EXPAND)
          </div>

          <FloatingCard
            id="design"
            title="Visual Systems & Spatial Craft"
            subtitle="Figma token architectures matching Tailwind variables 1:1, custom 3D WebGL, and motion."
            activeId={activeId}
            onHover={setHoveredId}
            onLeave={() => setHoveredId(null)}
            onClick={handleCardClick}
            expandDirection="down"
          >
            <div className="space-y-1.5 text-xs text-neutral-600">
              <p>Field Signal 3D grain storage geometry, complete Neptune token library, and stakefish PoS motion design.</p>
            </div>
          </FloatingCard>

          <FloatingCard
            id="engineering"
            title="Deterministic Code Rigor"
            subtitle="Frontends as distributed systems coordinating smart contracts, indexer lag, and GPU memory."
            activeId={activeId}
            onHover={setHoveredId}
            onLeave={() => setHoveredId(null)}
            onClick={handleCardClick}
            expandDirection="down"
          >
            <div className="space-y-1.5 text-xs text-neutral-600">
              <p>CosmWasm contracts across $300M+ volume, WebGL GPU disposal lifecycles, and Injective CW3 multisig.</p>
            </div>
          </FloatingCard>

          <FloatingCard
            id="product"
            title="0 → 1 Ownership & Economics"
            subtitle="Deep immersion in domain economics, identifying user friction and deploying unprompted solutions."
            activeId={activeId}
            onHover={setHoveredId}
            onLeave={() => setHoveredId(null)}
            onClick={handleCardClick}
            expandDirection="down"
          >
            <div className="space-y-1.5 text-xs text-neutral-600">
              <p>Self-directed Neptune Balance Menu, agricultural forward contracts in AgOS, and 3x agentic delivery velocity.</p>
            </div>
          </FloatingCard>
        </div>

        {/* The 3 Intersections on Mobile */}
        <div className="space-y-3">
          <div className="text-xs font-mono uppercase tracking-wider text-[var(--text-subtle)] font-bold">
            02 // THE THREE INTERSECTIONS (TAP TO EXPAND)
          </div>

          <FloatingCard
            id="design-engineering"
            title="The Zero-Handoff Medium"
            subtitle="Figma token parity and author-time resolution eliminating cross-team handoff lag."
            activeId={activeId}
            onHover={setHoveredId}
            onLeave={() => setHoveredId(null)}
            onClick={handleCardClick}
            expandDirection="down"
          >
            <p className="text-xs text-neutral-600">1:1 token parity and responsive accessibility resolved during code authoring.</p>
          </FloatingCard>

          <FloatingCard
            id="engineering-product"
            title="Protocol-Aware Reality"
            subtitle="Interfaces architected directly around mechanical boundaries and transaction truth."
            activeId={activeId}
            onHover={setHoveredId}
            onLeave={() => setHoveredId(null)}
            onClick={handleCardClick}
            expandDirection="down"
          >
            <p className="text-xs text-neutral-600">UX aligned to RPC indexer latencies and contract confirmation states with zero UI fund-loss exploits.</p>
          </FloatingCard>

          <FloatingCard
            id="product-design"
            title="High-Stakes Decision Surfaces"
            subtitle="Translating complex debt liquidation ratios and inventories into intuitive spatial decisions."
            activeId={activeId}
            onHover={setHoveredId}
            onLeave={() => setHoveredId(null)}
            onClick={handleCardClick}
            expandDirection="down"
          >
            <p className="text-xs text-neutral-600">Spatial 3D yard twins and real-time collateral liquidation heatmaps for clear telemetry.</p>
          </FloatingCard>
        </div>
      </div>
    </div>
  );
}
