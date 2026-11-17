'use client';

import Image from 'next/image';
import React from 'react';
import { trackCaseStudyEvent } from '../lib/analytics';

interface AgOSCaseStudyProps {
  openProject: (projectId: string) => void;
}

export default function AgOSCaseStudy({ openProject }: AgOSCaseStudyProps) {
  const handleOpen = () => {
    trackCaseStudyEvent('open', 'agos', { source: 'agos_feature_slide' });
    openProject('agos');
  };

  return (
    <div className="relative z-10 w-full">
      {/* Eyebrow / System Marker */}
      <div className="mb-6 flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--text-subtle)]">
        <span className="font-mono text-[var(--accent-warm)] font-bold">{'04 // SPATIAL'}</span>
        <span className="h-px w-8 bg-[var(--border-strong)]" />
        <span className="text-[var(--text)]">Field-to-Code Discovery &amp; Spatial UI</span>
        <span className="inline-flex items-center rounded-full bg-[#0a2540]/[0.07] px-2.5 py-0.5 text-[10px] font-mono tracking-wider text-[#0a2540] border border-[#0a2540]/20">
          REACT 19 · THREE.JS · POSTGRES
        </span>
      </div>

      {/* Main Grid */}
      <div className="grid gap-10 lg:grid-cols-[1.12fr_minmax(0,390px)] items-start">
        {/* Left column — narrative & metrics */}
        <div>
          <h2 className="heading-accent font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight text-[var(--text)] md:text-5xl">
            AgOS
          </h2>
          <p className="mt-2 text-xs sm:text-sm font-mono font-semibold tracking-wider text-[#0a2540] uppercase">
            Agricultural Operating System · Field Operations to Relational Software
          </p>

          <p className="mt-5 text-base md:text-lg leading-relaxed text-[var(--text-muted)]">
            Full-stack platform unifying crop planning, parametric 3D grain storage, shipping logistics, sales contracts, and P&amp;L into one coherent interface. Built directly from firsthand domain discovery operating commercial telemetry at <strong className="text-[var(--text)]">Flat Land Farms</strong>.
          </p>

          {/* Architectural Highlights */}
          <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-3">
            <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] glass-surface p-4 shadow-[var(--shadow-sm)]">
              <span className="font-mono text-xl font-bold text-[#0a2540]">Three.js</span>
              <p className="text-[11px] font-medium text-[var(--text-muted)] mt-1">Parametric 3D Bin Yard</p>
            </div>
            <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] glass-surface p-4 shadow-[var(--shadow-sm)]">
              <span className="font-mono text-xl font-bold text-[#0a2540]">Drizzle + PG</span>
              <p className="text-[11px] font-medium text-[var(--text-muted)] mt-1">Typed Multi-Tenant Schema</p>
            </div>
            <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] glass-surface p-4 shadow-[var(--shadow-sm)] col-span-2 sm:col-span-1">
              <span className="font-mono text-xl font-bold text-[#0a2540]">Field Signal</span>
              <p className="text-[11px] font-medium text-[var(--text-muted)] mt-1">Accessible Design System</p>
            </div>
          </div>

          {/* Problem → Approach → Architecture */}
          <div className="mt-6 grid gap-3.5 sm:grid-cols-3">
            <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4">
              <h3 className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#0a2540] mb-1.5">
                01 // Embedded Discovery
              </h3>
              <p className="text-xs leading-relaxed text-[var(--text-muted)]">
                Two years operating John Deere Ops Center &amp; Climate FieldView exposed where spreadsheets broke down between harvest bins, contracts, and cash flow.
              </p>
            </div>
            <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4">
              <h3 className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#0a2540] mb-1.5">
                02 // WebGL &amp; State Lifecycle
              </h3>
              <p className="text-xs leading-relaxed text-[var(--text-muted)]">
                Modeled round, hopper, and bulk storage geometry in Three.js tied to PostgreSQL records—handling GPU texture disposal, resize observation, and WebGL recovery.
              </p>
            </div>
            <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4">
              <h3 className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#0a2540] mb-1.5">
                03 // Unified Decision UI
              </h3>
              <p className="text-xs leading-relaxed text-[var(--text-muted)]">
                Recharts/Nivo financials, Sankey allocation flows, and Leaflet shipping maps share typed calculation engines so numbers match across every view.
              </p>
            </div>
          </div>

          {/* Highlight feature callout */}
          <div className="mt-6 rounded-xl border border-[var(--border-strong)] border-l-3 border-l-[#0a2540] bg-[var(--surface)] glass-surface p-4 shadow-[var(--shadow-sm)]">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="text-[11px] font-mono font-bold uppercase tracking-wider text-[var(--accent-warm)]">
                Accessibility &amp; Resilience
              </p>
              <span className="text-[10px] font-mono text-[var(--text-subtle)]">Spatial + Tabular Parity</span>
            </div>
            <p className="mt-1 text-sm font-bold text-[var(--text)]">
              3D Spatial Twin Paired with Keyboard &amp; Tabular Fallbacks
            </p>
            <p className="mt-1 text-xs leading-relaxed text-[var(--text-muted)]">
              Every 3D grain yard supports keyboard-accessible bin reordering and mirrors exact fill weights, commodity splits, and basis commitments inside screen-reader friendly tables.
            </p>
          </div>

          {/* Stack + CTA */}
          <div className="mt-6 flex flex-wrap items-center gap-1.5">
            {['React 19', 'TypeScript', 'Three.js', 'Tailwind CSS', 'Leaflet', 'Recharts / Nivo', 'Drizzle ORM', 'Neon PostgreSQL'].map((tag) => (
              <span
                key={tag}
                className="rounded-md border border-[var(--border)] bg-[#0a2540]/[0.04] px-2.5 py-1 text-[11px] font-mono text-[var(--text-muted)]"
              >
                {tag}
              </span>
            ))}
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={handleOpen}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#0a2540] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[var(--accent-hover)] active:scale-[0.98] shadow-xs cursor-pointer"
            >
              <span>Inspect AgOS Case Study</span>
              <span>→</span>
            </button>
            <a
              href="https://ag-os.pro/"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() =>
                trackCaseStudyEvent('external_link', 'agos', {
                  link_label: 'Live Platform Demo',
                  url: 'https://ag-os.pro/',
                })
              }
              className="inline-flex items-center justify-center rounded-full border border-[var(--border-strong)] bg-[var(--surface)] glass-surface px-6 py-3 text-sm font-semibold text-[var(--text)] transition hover:border-[#0a2540] hover:text-[#0a2540] active:scale-[0.98]"
            >
              Launch Live Platform (ag-os.pro) ↗
            </a>
          </div>
        </div>

        {/* Right column — bespoke SVG architecture diagram */}
        <div>
          <button
            type="button"
            onClick={handleOpen}
            className="w-full text-left relative rounded-2xl border border-[var(--border-strong)] bg-[var(--surface)] glass-surface p-2 shadow-[var(--shadow-card)] overflow-hidden group cursor-pointer transition hover:border-[#0a2540]/45"
          >
            <div className="relative overflow-hidden rounded-xl border border-[var(--border)] bg-[#0d1722]">
              <Image
                src="/diagrams/agos-architecture.svg"
                alt="AgOS Domain & Full-Stack Architecture: Field Discovery to 3D Storage, Financial Views, and Neon Postgres"
                width={800}
                height={520}
                sizes="(max-width: 1024px) 100vw, 390px"
                className="w-full h-auto block transition-transform duration-500 group-hover:scale-[1.01]"
                priority={false}
              />
            </div>
            <div className="mt-2 rounded-xl bg-[#0a2540] px-4 py-2.5 text-white flex items-center justify-between text-[11px] font-mono">
              <span>{'AGOS // SYSTEM ARCHITECTURE'}</span>
              <span className="text-[#e5c488] font-semibold">INSPECT SPEC ↗</span>
            </div>
          </button>
          <p className="mt-3 text-center text-xs text-[var(--text-subtle)] font-mono">
            AgOS Data &amp; Spatial Engine Blueprint
          </p>
        </div>
      </div>
    </div>
  );
}
