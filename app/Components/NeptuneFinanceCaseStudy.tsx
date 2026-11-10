'use client';

import Image from 'next/image';
import React from 'react';
import { trackEvent, trackCaseStudyEvent } from '../lib/analytics';

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
      <div className="opacity-0 translate-y-6 transition-all duration-700 ease-out group-data-[active=true]/slide:opacity-100 group-data-[active=true]/slide:translate-y-0 motion-reduce:opacity-100 motion-reduce:translate-y-0 delay-0">
        <div className="mb-4 flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--text-subtle)]">
          <span className="font-mono text-amber-500 font-bold">{'03 // FLAGSHIP SYSTEM'}</span>
          <span className="h-px w-8 bg-[var(--border-strong)]" />
          <span>DeFi Interface Architecture</span>
          <span className="inline-flex items-center rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-mono tracking-wider text-emerald-600 border border-emerald-500/20">
            $300M+ VOLUME SHIPPED
          </span>
        </div>
      </div>

      {/* Hero area */}
      <div className="grid gap-10 lg:grid-cols-[1.1fr_minmax(0,380px)] items-start">
        {/* Left column — narrative & metrics */}
        <div>
          <div className="opacity-0 translate-y-6 transition-all duration-700 ease-out group-data-[active=true]/slide:opacity-100 group-data-[active=true]/slide:translate-y-0 motion-reduce:opacity-100 motion-reduce:translate-y-0 delay-[100ms]">
            <h2 className="heading-accent font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight text-[var(--text)] md:text-5xl">
              Neptune Finance
            </h2>
            <p className="mt-2 text-sm font-semibold tracking-wide text-[color:var(--accent-color)] uppercase">
              Design Engineer &amp; Frontend Lead · Injective Protocol
            </p>
          </div>

          <div className="opacity-0 translate-y-6 transition-all duration-700 ease-out group-data-[active=true]/slide:opacity-100 group-data-[active=true]/slide:translate-y-0 motion-reduce:opacity-100 motion-reduce:translate-y-0 delay-[200ms]">
            <p className="mt-5 text-base md:text-lg leading-relaxed text-[var(--text-muted)]">
              Built and operated the production frontend for a premier DeFi lending protocol on Injective —
              taking complete product ownership from custom Figma design systems through production TypeScript.
              Architected contract-aware state machines, low-latency market feeds, and high-security wallet transaction flows where real funds were at stake.
            </p>
          </div>

          {/* Recruiter Highlights / Impact Metrics Pill Grid */}
          <div className="opacity-0 translate-y-6 transition-all duration-700 ease-out group-data-[active=true]/slide:opacity-100 group-data-[active=true]/slide:translate-y-0 motion-reduce:opacity-100 motion-reduce:translate-y-0 delay-[250ms] mt-6 grid grid-cols-2 sm:grid-cols-3 gap-3">
            <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-3 shadow-xs">
              <span className="font-mono text-xl md:text-2xl font-bold text-[var(--text)]">$300M+</span>
              <p className="text-[11px] font-medium text-[var(--text-muted)] mt-0.5">Protocol Volume</p>
            </div>
            <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-3 shadow-xs">
              <span className="font-mono text-xl md:text-2xl font-bold text-[var(--text)]">0</span>
              <p className="text-[11px] font-medium text-[var(--text-muted)] mt-0.5">Critical UI Exploits</p>
            </div>
            <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-3 shadow-xs col-span-2 sm:col-span-1">
              <span className="font-mono text-xl md:text-2xl font-bold text-[var(--text)]">100%</span>
              <p className="text-[11px] font-medium text-[var(--text-muted)] mt-0.5">Figma-to-Code Parity</p>
            </div>
          </div>

          {/* Problem → Approach → Outcome narrative */}
          <div className="opacity-0 translate-y-6 transition-all duration-700 ease-out group-data-[active=true]/slide:opacity-100 group-data-[active=true]/slide:translate-y-0 motion-reduce:opacity-100 motion-reduce:translate-y-0 delay-[300ms]">
            <div className="mt-7 grid gap-4 sm:grid-cols-3">
              <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4">
                <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[color:var(--accent-color)] mb-1.5">
                  01 // The Challenge
                </h3>
                <p className="text-xs leading-relaxed text-[var(--text-muted)]">
                  On-chain and UI states diverge during pending transactions. Multi-step collateralized lending and staking flows must remain intuitive and bulletproof.
                </p>
              </div>
              <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4">
                <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[color:var(--accent-color)] mb-1.5">
                  02 // The Architecture
                </h3>
                <p className="text-xs leading-relaxed text-[var(--text-muted)]">
                  Treated transaction lifecycles as deterministic state machines. Built unified query primitives, optimistic visual caching, and robust wallet recovery.
                </p>
              </div>
              <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4">
                <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[color:var(--accent-color)] mb-1.5">
                  03 // The Delivery
                </h3>
                <p className="text-xs leading-relaxed text-[var(--text-muted)]">
                  Shipped lending, staking, airdrop, and cross-chain liquidity vaults. Synchronized Figma token pipeline directly with Tailwind configuration.
                </p>
              </div>
            </div>
          </div>

          {/* Self-directed feature callout */}
          <div className="opacity-0 translate-y-6 transition-all duration-700 ease-out group-data-[active=true]/slide:opacity-100 group-data-[active=true]/slide:translate-y-0 motion-reduce:opacity-100 motion-reduce:translate-y-0 delay-[400ms]">
            <div className="mt-6 rounded-xl border border-[var(--border-strong)] bg-[var(--surface)] p-4 shadow-[var(--shadow-card)]">
              <div className="flex items-center justify-between gap-2">
                <p className="text-xs font-mono font-bold uppercase tracking-wider text-amber-600">
                  ★ Self-Directed Feature Spotlight
                </p>
                <span className="text-[10px] font-mono text-[var(--text-subtle)]">Proactive Product Ownership</span>
              </div>
              <p className="mt-1 text-sm font-bold text-[var(--text)]">
                The Balance Menu &amp; Quick-Action Hub
              </p>
              <p className="mt-1 text-xs leading-relaxed text-[var(--text-muted)]">
                Identified an architectural usability gap independently: users had to jump multiple pages to check balances and rebalance positions. Designed the UX in Figma and implemented the complete inline swap and asset breakdown directly in production without a brief, becoming one of the most praised features by power users.
              </p>
            </div>
          </div>

          {/* Stack + CTA */}
          <div className="opacity-0 translate-y-6 transition-all duration-700 ease-out group-data-[active=true]/slide:opacity-100 group-data-[active=true]/slide:translate-y-0 motion-reduce:opacity-100 motion-reduce:translate-y-0 delay-[500ms]">
            <div className="mt-6 flex flex-wrap items-center gap-2">
              {['Next.js', 'TypeScript', 'Tailwind CSS', 'CosmWasm', 'Injective SDK', 'Figma Tokens'].map((tag) => (
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
                className="inline-flex items-center justify-center rounded-full border border-[var(--border)] bg-[var(--surface)] px-6 py-3 text-sm font-semibold text-[var(--text)] transition hover:border-[color:var(--accent-color)] active:scale-[0.98]"
              >
                Launch Production App ↗
              </a>
            </div>
          </div>
        </div>

        {/* Right column — visual screenshot with cinematic badge */}
        <div className="opacity-0 translate-y-6 transition-all duration-700 ease-out group-data-[active=true]/slide:opacity-100 group-data-[active=true]/slide:translate-y-0 motion-reduce:opacity-100 motion-reduce:translate-y-0 delay-[200ms] hidden lg:block">
          <div className="relative rounded-2xl border border-[var(--border)] bg-[var(--surface)] shadow-[var(--shadow-card)] overflow-hidden group">
            <Image
              src="/screenshots/neptune-balance-menu.png"
              alt="Neptune Finance — Balance Menu, a self-directed feature"
              width={680}
              height={900}
              className="w-full h-auto transition-transform duration-500 group-hover:scale-[1.02]"
              priority={false}
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4 text-white">
              <div className="flex items-center justify-between text-xs font-mono">
                <span>{'BALANCE MENU // PRODUCTION COMPONENT'}</span>
                <span className="text-amber-400">INSPECT ↗</span>
              </div>
            </div>
          </div>
          <p className="mt-3 text-center text-xs text-[var(--text-subtle)] font-mono">
            Balance Menu — Custom Figma Design System &amp; Production Component
          </p>
        </div>
      </div>
    </div>
  );
}
