'use client';

import Image from 'next/image';
import React from 'react';
import { trackCaseStudyEvent } from '../lib/analytics';

interface NeptuneFinanceCaseStudyProps {
  openProject: (projectId: string) => void;
}

export default function NeptuneFinanceCaseStudy({ openProject }: NeptuneFinanceCaseStudyProps) {
  const handleOpen = () => {
    trackCaseStudyEvent('open', 'neptune-finance', { source: 'flagship_hero' });
    openProject('neptune-finance');
  };

  return (
    <div className="relative z-10 w-full">
      {/* Eyebrow / System Marker */}
      <div className="mb-6 flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--text-subtle)]">
        <span className="font-mono text-[var(--accent-warm)] font-bold">{'03 // FLAGSHIP'}</span>
        <span className="h-px w-8 bg-[var(--border-strong)]" />
        <span className="text-[var(--text)]">DeFi Interface Architecture</span>
        <span className="inline-flex items-center rounded-full bg-[#0a2540]/[0.07] px-2.5 py-0.5 text-[10px] font-mono tracking-wider text-[#0a2540] border border-[#0a2540]/20">
          $300M+ PEAK TVL
        </span>
      </div>

      {/* Hero area */}
      <div className="grid gap-10 lg:grid-cols-[1.12fr_minmax(0,390px)] items-start">
        {/* Left column — narrative & metrics */}
        <div>
          <h2 className="heading-accent font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight text-[var(--text)] md:text-5xl">
            Neptune Finance
          </h2>
          <p className="mt-2 text-xs sm:text-sm font-mono font-semibold tracking-wider text-[#0a2540] uppercase">
            Design Engineer &amp; Frontend Lead · Injective Protocol
          </p>

          <p className="mt-5 text-base md:text-lg leading-relaxed text-[var(--text-muted)]">
            Owned end-to-end product design and frontend engineering for a live DeFi lending protocol on Injective—building the Figma component library from zero and translating it directly into production React/Next.js and TypeScript code across high-stakes collateral and liquidity workflows.
          </p>

          {/* Verified Highlights */}
          <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-3">
            <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] glass-surface p-4 shadow-[var(--shadow-sm)]">
              <span className="font-mono text-xl font-bold text-[#0a2540]">$300M+</span>
              <p className="text-[11px] font-medium text-[var(--text-muted)] mt-1">Peak Protocol TVL</p>
            </div>
            <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] glass-surface p-4 shadow-[var(--shadow-sm)]">
              <span className="font-mono text-xl font-bold text-[#0a2540]">0 → 1</span>
              <p className="text-[11px] font-medium text-[var(--text-muted)] mt-1">Figma System &amp; Frontend</p>
            </div>
            <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] glass-surface p-4 shadow-[var(--shadow-sm)] col-span-2 sm:col-span-1">
              <span className="font-mono text-xl font-bold text-[#0a2540]">CosmWasm</span>
              <p className="text-[11px] font-medium text-[var(--text-muted)] mt-1">Mito &amp; Astroport Integrations</p>
            </div>
          </div>

          {/* Problem → Approach → Outcome narrative */}
          <div className="mt-6 grid gap-3.5 sm:grid-cols-3">
            <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4">
              <h3 className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#0a2540] mb-1.5">
                01 // State Challenge
              </h3>
              <p className="text-xs leading-relaxed text-[var(--text-muted)]">
                On-chain and UI state diverge during pending blocks. Collateralized borrowing and LTV thresholds require unambiguous feedback at all times.
              </p>
            </div>
            <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4">
              <h3 className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#0a2540] mb-1.5">
                02 // Frontend Engineering
              </h3>
              <p className="text-xs leading-relaxed text-[var(--text-muted)]">
                Modeled transaction lifecycles explicitly in TypeScript with optimistic updates, unified RPC/indexer queries, and deterministic wallet recovery across Keplr, Leap, MetaMask &amp; Ledger.
              </p>
            </div>
            <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4">
              <h3 className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#0a2540] mb-1.5">
                03 // Design Delivery
              </h3>
              <p className="text-xs leading-relaxed text-[var(--text-muted)]">
                Shipped lending, staking, airdrop, and liquidity pools with shared Figma-to-Tailwind primitives—eliminating cross-team handoff drift.
              </p>
            </div>
          </div>

          {/* Self-directed feature callout */}
          <div className="mt-6 rounded-xl border border-[var(--border-strong)] border-l-3 border-l-[#0a2540] bg-[var(--surface)] glass-surface p-4 shadow-[var(--shadow-sm)]">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="text-[11px] font-mono font-bold uppercase tracking-wider text-[var(--accent-warm)]">
                Product Discovery Spotlight
              </p>
              <span className="text-[10px] font-mono text-[var(--text-subtle)]">Self-Initiated · Zero Brief</span>
            </div>
            <p className="mt-1 text-sm font-bold text-[var(--text)]">
              The Persistent Balance Menu &amp; Quick-Action Hub
            </p>
            <p className="mt-1 text-xs leading-relaxed text-[var(--text-muted)]">
              Spotted recurring navigation friction where borrowers hopped across multiple tabs just to inspect balances before rebalancing. Prototyped a unified slide-over asset hub in Figma and shipped it straight to production.
            </p>
          </div>

          {/* Stack + CTA */}
          <div className="mt-6 flex flex-wrap items-center gap-1.5">
            {['Next.js', 'TypeScript', 'Tailwind CSS', 'CosmWasm', 'Injective SDK', 'Figma Tokens'].map((tag) => (
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
              <span>Inspect Deep-Dive Case Study</span>
              <span>→</span>
            </button>
            <a
              href="https://app.nept.finance"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() =>
                trackCaseStudyEvent('external_link', 'neptune-finance', {
                  link_label: 'Live Webapp',
                  url: 'https://app.nept.finance',
                })
              }
              className="inline-flex items-center justify-center rounded-full border border-[var(--border-strong)] bg-[var(--surface)] glass-surface px-6 py-3 text-sm font-semibold text-[var(--text)] transition hover:border-[#0a2540] hover:text-[#0a2540] active:scale-[0.98]"
            >
              Launch Production App ↗
            </a>
          </div>
        </div>

        {/* Right column — clickable production artifact */}
        <div>
          <button
            type="button"
            onClick={handleOpen}
            className="w-full text-left relative rounded-2xl border border-[var(--border-strong)] bg-[var(--surface)] glass-surface p-2 shadow-[var(--shadow-card)] overflow-hidden group cursor-pointer transition hover:border-[#0a2540]/45"
          >
            <div className="relative overflow-hidden rounded-xl border border-[var(--border)] bg-[#0a2540]">
              <Image
                src="/screenshots/neptune-balance-menu.webp"
                alt="Neptune Finance — Multi-Page Balance Menu, designed in Figma and shipped to production"
                width={680}
                height={900}
                sizes="(max-width: 1024px) 100vw, 390px"
                className="w-full h-auto transition-transform duration-500 group-hover:scale-[1.02]"
                priority={false}
              />
            </div>
            <div className="mt-2 rounded-xl bg-[#0a2540] px-4 py-2.5 text-white flex items-center justify-between text-[11px] font-mono">
              <span>{'BALANCE MENU // PRODUCTION UI'}</span>
              <span className="text-[#e5c488] font-semibold">INSPECT GALLERY ↗</span>
            </div>
          </button>
          <p className="mt-3 text-center text-xs text-[var(--text-subtle)] font-mono">
            Balance Menu — Figma System through Production TSX
          </p>
        </div>
      </div>
    </div>
  );
}
