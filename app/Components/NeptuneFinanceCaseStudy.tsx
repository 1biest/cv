'use client';

import React from 'react';
import CaseStudyPreviewDeck, { type PreviewFrame } from './CaseStudyPreviewDeck';
import { trackCaseStudyEvent } from '../lib/analytics';

interface NeptuneFinanceCaseStudyProps {
  openProject: (projectId: string) => void;
}

const NEPTUNE_PREVIEW_FRAMES: readonly PreviewFrame[] = [
  {
    src: '/screenshots/neptune-balance-menu.webp',
    alt: 'Neptune Finance Multi-Page Balance Menu, Skip/INJEX Swap Hub, and Account Health Bar',
    label: 'Balance Hub',
    tag: 'NEPTUNE // BALANCE MENU',
    caption: 'Balance Menu, Bridge & Swap Hub & Account Health',
  },
  {
    src: '/screenshots/neptune-borrow-screenshot.webp',
    alt: 'Neptune Finance Borrow Subaccount Manager, 4-Layer Health Bar, and Collateral Controls',
    label: 'Borrow UX',
    tag: 'NEPTUNE // BORROW & HEALTH',
    caption: 'Borrow Markets, Subaccounts & Liquidation Model',
  },
  {
    src: '/screenshots/neptune-lending-screenshot.webp',
    alt: 'Neptune Finance Lending Markets Table, Portfolio Composition Slider, and History Export',
    label: 'Lending',
    tag: 'NEPTUNE // LENDING MARKETS',
    caption: 'Lending Markets, Net APY & Asset Utilization',
  },
  {
    src: '/screenshots/neptune-pool-page.webp',
    alt: 'Neptune Finance Liquidity Pools and Astroport Staking Yield Controls',
    label: 'Pools LP',
    tag: 'NEPTUNE // POOLS & ASTROPORT',
    caption: 'LP Incentives & Astroport Pool Staking Controls',
  },
];

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
        <span className="text-[var(--text)]">DeFi Money Market Architecture</span>
        <span className="inline-flex items-center rounded-full bg-[#0a2540]/[0.07] px-2.5 py-0.5 text-[10px] font-mono tracking-wider text-[#0a2540] border border-[#0a2540]/20">
          $159.66M+ LOANS · 1,042+ DAYS UPTIME · $0 BAD DEBT
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
            Senior Product, Forward-Deployed, Frontend &amp; AI Engineer · Injective Mainnet
          </p>

          <p className="mt-5 text-base md:text-lg leading-relaxed text-[var(--text-muted)]">
            Engineered the Next.js/TypeScript web platform and CosmWasm integration layer for Injective&apos;s premier money market across <strong className="text-[var(--text)]">9 lending</strong> and <strong className="text-[var(--text)]">21 collateral markets</strong>—unifying Figma design systems, a React Query distributed read model, spec-driven AI velocity, and live forward-deployed triage.
          </p>

          {/* 3 Key Stats */}
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] glass-surface p-4 shadow-[var(--shadow-sm)]">
              <span className="font-mono text-xl font-bold text-[#0a2540]">$159.66M+</span>
              <p className="text-xs font-semibold text-[var(--text)] mt-1">All-Time Loans Originated</p>
              <p className="text-[11px] leading-snug text-[var(--text-muted)] mt-1">
                Peaking $40.47M/mo · 5,580+ active lenders · 2,955 borrower subaccounts
              </p>
            </div>
            <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] glass-surface p-4 shadow-[var(--shadow-sm)]">
              <span className="font-mono text-xl font-bold text-[#0a2540]">$27.76M</span>
              <p className="text-xs font-semibold text-[var(--text)] mt-1">Peak Total Value Locked</p>
              <p className="text-[11px] leading-snug text-[var(--text-muted)] mt-1">
                $18.36M DeFiLlama Net TVL + $9.41M peak active borrows
              </p>
            </div>
            <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] glass-surface p-4 shadow-[var(--shadow-sm)]">
              <span className="font-mono text-xl font-bold text-[#0a2540]">882,800+</span>
              <p className="text-xs font-semibold text-[var(--text)] mt-1">On-Chain Executions</p>
              <p className="text-[11px] leading-snug text-[var(--text-muted)] mt-1">
                452,086 direct core Neptune Market contract txs · 1,042+ days uptime
              </p>
            </div>
          </div>

          {/* Tight Summary Bullet Points across the 4 Pillars */}
          <div className="mt-6 rounded-xl border border-[var(--border)] bg-[var(--surface)] glass-surface p-5 shadow-[var(--shadow-sm)]">
            <p className="text-[11px] font-mono font-bold uppercase tracking-wider text-[var(--accent-warm)] mb-3">
              Core Engineering, Product &amp; AI Impact
            </p>
            <ul className="space-y-2.5 text-xs leading-relaxed text-[var(--text-muted)]">
              <li className="flex items-start gap-2.5">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#0a2540]" aria-hidden="true" />
                <span>
                  <strong className="text-[var(--text)]">Scaled Core DeFi Frontend &amp; Protocol UX:</strong> Architected the Next.js/TypeScript web platform and CosmWasm integration layer across 9 lending and 21 collateral markets (1,042+ days mainnet uptime, $0 bad-debt exploits).
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#0a2540]" aria-hidden="true" />
                <span>
                  <strong className="text-[var(--text)]">AI-Driven Engineering &amp; Telemetry:</strong> Built spec-driven AI agent guardrails to execute a zero-downtime migration to <code className="font-mono text-[11px] text-[#0a2540]">@neptunefinance/api-v2</code>, plus an automated on-chain gas telemetry analyzer that cut high-complexity gas estimates by 15% (7.55M gas saved).
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#0a2540]" aria-hidden="true" />
                <span>
                  <strong className="text-[var(--text)]">Frontend Distributed Systems:</strong> Eliminated client-side state waterfalls and InfluxDB dependencies with a centralized React Query read model and a state-fingerprinted post-tx polling engine that resolved blockchain indexer lag.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#0a2540]" aria-hidden="true" />
                <span>
                  <strong className="text-[var(--text)]">Product Design &amp; 1-Click DeFi Flows:</strong> Turned a 5-step atomic flash-loan + DEX routing flow into a 1-click Collateral/Debt Swap UX, designed a 4-layer <code className="font-mono text-[11px] text-[#0a2540]">@base-ui</code> Account Health Bar with live liquidation modeling, and shipped a real-time Tokenomics &amp; Revenue Flywheel analytics suite.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#0a2540]" aria-hidden="true" />
                <span>
                  <strong className="text-[var(--text)]">Forward-Deployed Triage &amp; Partner Integrations:</strong> Built a live production wallet-inspection and RPC-failover diagnostic tool for instant customer debugging, patched upstream EVM/WalletConnect SDK signing bugs, and shipped cross-protocol integrations with Hydro, Stride, Mito, Astroport, and Skip Go.
                </span>
              </li>
            </ul>
          </div>

          {/* Stack + CTA */}
          <div className="mt-6 flex flex-wrap items-center gap-1.5">
            {['Next.js', 'TypeScript', 'React Query', '@base-ui', 'CosmWasm', 'Injective SDK', 'Hydro · Stride · Skip Go', 'Figma Tokens'].map((tag) => (
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

        {/* Right column — interactive Neptune UI showcase */}
        <CaseStudyPreviewDeck
          frames={NEPTUNE_PREVIEW_FRAMES}
          onInspect={handleOpen}
          totalArtifactsCount={8}
          footerSummarySuffix="8 Production & Figma Views"
          stageBgClassName="bg-[#0a1324]"
          groupAriaLabel="Neptune Finance preview screens"
          openAriaPrefix="Open Neptune Finance case study gallery"
        />
      </div>
    </div>
  );
}
