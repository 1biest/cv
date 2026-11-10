'use client';

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
      <div className="opacity-0 translate-y-6 transition-all duration-700 ease-out group-data-[active=true]/slide:opacity-100 group-data-[active=true]/slide:translate-y-0 motion-reduce:opacity-100 motion-reduce:translate-y-0 delay-0">
        <div className="mb-4 flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--text-subtle)]">
          <span className="font-mono text-amber-500 font-bold">{'04 // SPATIAL PLATFORM'}</span>
          <span className="h-px w-8 bg-[var(--border-strong)]" />
          <span>Spatial Interface Engineering</span>
          <span className="inline-flex items-center rounded-full bg-amber-500/10 px-2 py-0.5 text-[10px] font-mono tracking-wider text-amber-700 border border-amber-500/20">
            THREE.JS + REACT 19
          </span>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid gap-10 lg:grid-cols-[1.1fr_minmax(0,380px)] items-start">
        {/* Left column — narrative & metrics */}
        <div>
          <div className="opacity-0 translate-y-6 transition-all duration-700 ease-out group-data-[active=true]/slide:opacity-100 group-data-[active=true]/slide:translate-y-0 motion-reduce:opacity-100 motion-reduce:translate-y-0 delay-[100ms]">
            <h2 className="heading-accent font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight text-[var(--text)] md:text-5xl">
              AgOS
            </h2>
            <p className="mt-2 text-sm font-semibold tracking-wide text-[color:var(--accent-color)] uppercase">
              Agricultural Operating System · Spatial Web Application
            </p>
          </div>

          <div className="opacity-0 translate-y-6 transition-all duration-700 ease-out group-data-[active=true]/slide:opacity-100 group-data-[active=true]/slide:translate-y-0 motion-reduce:opacity-100 motion-reduce:translate-y-0 delay-[200ms]">
            <p className="mt-5 text-base md:text-lg leading-relaxed text-[var(--text-muted)]">
              An enterprise platform connecting crop planning, custom 3D grain storage, shipping logistics, contracts, equipment, and finances into one unified interface.
              Transforms complex physical operations and disconnected spreadsheets into an intuitive, real-time spatial digital twin.
            </p>
          </div>

          {/* Impact Metrics Pill Grid */}
          <div className="opacity-0 translate-y-6 transition-all duration-700 ease-out group-data-[active=true]/slide:opacity-100 group-data-[active=true]/slide:translate-y-0 motion-reduce:opacity-100 motion-reduce:translate-y-0 delay-[250ms] mt-6 grid grid-cols-2 sm:grid-cols-3 gap-3">
            <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-3.5 shadow-xs">
              <span className="font-mono text-xl sm:text-2xl font-bold text-[var(--text)]">Three.js</span>
              <p className="text-[11px] font-medium text-[var(--text-muted)] mt-0.5">3D Spatial Bin Engine</p>
            </div>
            <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-3.5 shadow-xs">
              <span className="font-mono text-xl sm:text-2xl font-bold text-[var(--text)]">React 19</span>
              <p className="text-[11px] font-medium text-[var(--text-muted)] mt-0.5">Modern Architecture</p>
            </div>
            <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-3.5 shadow-xs col-span-2 sm:col-span-1">
              <span className="font-mono text-xl sm:text-2xl font-bold text-[var(--text)]">Field Signal</span>
              <p className="text-[11px] font-medium text-[var(--text-muted)] mt-0.5">Custom Design System</p>
            </div>
          </div>

          {/* Problem → Approach → Architecture */}
          <div className="opacity-0 translate-y-6 transition-all duration-700 ease-out group-data-[active=true]/slide:opacity-100 group-data-[active=true]/slide:translate-y-0 motion-reduce:opacity-100 motion-reduce:translate-y-0 delay-[300ms]">
            <div className="mt-7 grid gap-4 sm:grid-cols-3">
              <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4">
                <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[color:var(--accent-color)] mb-1.5">
                  01 // The Challenge
                </h3>
                <p className="text-xs leading-relaxed text-[var(--text-muted)]">
                  Physical agricultural inventory is scattered across yards, disconnected from grain delivery contracts, forward pricing, and cash flow obligations.
                </p>
              </div>
              <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4">
                <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[color:var(--accent-color)] mb-1.5">
                  02 // Spatial Modeling
                </h3>
                <p className="text-xs leading-relaxed text-[var(--text-muted)]">
                  Built parametric Three.js geometry for bins, hopper bottoms, and bulk storage. Live dimensions, fill levels, and commodity types map directly to database records.
                </p>
              </div>
              <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4">
                <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[color:var(--accent-color)] mb-1.5">
                  03 // Financial Sync
                </h3>
                <p className="text-xs leading-relaxed text-[var(--text-muted)]">
                  Integrated Sankey diagrams, route maps, and accessible tabular mirrors, keeping operational field data unified with commercial business decisions.
                </p>
              </div>
            </div>
          </div>

          {/* Highlight feature callout */}
          <div className="opacity-0 translate-y-6 transition-all duration-700 ease-out group-data-[active=true]/slide:opacity-100 group-data-[active=true]/slide:translate-y-0 motion-reduce:opacity-100 motion-reduce:translate-y-0 delay-[400ms]">
            <div className="mt-6 rounded-xl border border-[var(--border-strong)] bg-[var(--surface)] p-4 shadow-[var(--shadow-card)]">
              <div className="flex items-center justify-between gap-2">
                <p className="text-xs font-mono font-bold uppercase tracking-wider text-amber-600">
                  ★ Architectural Highlight
                </p>
                <span className="text-[10px] font-mono text-[var(--text-subtle)]">Accessible Spatial Engineering</span>
              </div>
              <p className="mt-1 text-sm font-bold text-[var(--text)]">
                Interactive Yard Engine with 100% Tabular Parity
              </p>
              <p className="mt-1 text-xs leading-relaxed text-[var(--text-muted)]">
                Engineered custom WebGL shader materials and GPU resource lifecycle disposals, while guaranteeing every 3D yard has a first-class tabular data mirror with keyboard navigation and screen-reader accessibility for field workers.
              </p>
            </div>
          </div>

          {/* Stack + CTA */}
          <div className="opacity-0 translate-y-6 transition-all duration-700 ease-out group-data-[active=true]/slide:opacity-100 group-data-[active=true]/slide:translate-y-0 motion-reduce:opacity-100 motion-reduce:translate-y-0 delay-[500ms]">
            <div className="mt-6 flex flex-wrap items-center gap-2">
              {['React 19', 'TypeScript', 'Three.js', 'Tailwind CSS', 'Leaflet', 'Drizzle ORM', 'PostgreSQL'].map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-[var(--border)] bg-[var(--surface)] px-3 py-1 text-xs font-medium text-[var(--text-muted)]"
                >
                  {tag}
                </span>
              ))}
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={handleOpen}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--text)] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[color:var(--accent-color)] active:scale-[0.98] shadow-sm"
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
                className="inline-flex items-center justify-center rounded-full border border-[var(--border)] bg-[var(--surface)] px-6 py-3 text-sm font-semibold text-[var(--text)] transition hover:border-[color:var(--accent-color)] active:scale-[0.98]"
              >
                Launch Live Demo (ag-os.pro) ↗
              </a>
            </div>
          </div>
        </div>

        {/* Right column — Visual feature card */}
        <div className="opacity-0 translate-y-6 transition-all duration-700 ease-out group-data-[active=true]/slide:opacity-100 group-data-[active=true]/slide:translate-y-0 motion-reduce:opacity-100 motion-reduce:translate-y-0 delay-[200ms] hidden lg:block">
          <div className="relative rounded-2xl border border-[var(--border)] bg-gradient-to-br from-amber-950/20 via-neutral-900 to-black p-6 shadow-[var(--shadow-card)] text-white overflow-hidden group">
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fbbf24_1px,transparent_1px)] [background-size:16px_16px]" />

            <div className="relative z-10 flex flex-col justify-between h-[340px]">
              <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
                <span className="font-mono text-xs text-amber-400">{'AGOS // SPATIAL INTERFACE ENGINE'}</span>
                <span className="text-[10px] font-mono uppercase bg-amber-400/20 text-amber-300 px-2 py-0.5 rounded border border-amber-400/30">
                  WEBGL ACTIVE
                </span>
              </div>

              <div className="space-y-4">
                <div className="space-y-1">
                  <p className="text-xs font-mono text-neutral-400">PARAMETRIC 3D BIN YARD</p>
                  <p className="text-lg font-bold text-white tracking-tight">
                    Custom Procedural Mesh Generation
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                  <div className="bg-neutral-950/80 p-2.5 rounded border border-neutral-800">
                    <span className="text-neutral-500 block text-[10px]">GEOMETRY</span>
                    <span className="text-amber-300 font-bold">Round &amp; Hopper Bins</span>
                  </div>
                  <div className="bg-neutral-950/80 p-2.5 rounded border border-neutral-800">
                    <span className="text-neutral-500 block text-[10px]">RENDER PIPELINE</span>
                    <span className="text-amber-300 font-bold">GPU Adaptive Capping</span>
                  </div>
                </div>

                <p className="text-xs text-neutral-400 leading-relaxed">
                  Real-time calculation of volumetric grain slope, commodity density, and visual fill levels mapped directly from farm records.
                </p>
              </div>

              <div className="pt-3 border-t border-neutral-800 flex items-center justify-between text-xs font-mono text-neutral-400">
                <span>INTERACTIVE DEMO</span>
                <a
                  href="https://ag-os.pro/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-amber-400 hover:text-amber-300 underline"
                >
                  EXPLORE ag-os.pro ↗
                </a>
              </div>
            </div>
          </div>
          <p className="mt-3 text-center text-xs text-[var(--text-subtle)] font-mono">
            AgOS — Parametric 3D Spatial Digital Twin &amp; Yard Engine
          </p>
        </div>
      </div>
    </div>
  );
}
