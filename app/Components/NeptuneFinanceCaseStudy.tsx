'use client';

import Image from 'next/image';
import React from 'react';
import { trackEvent } from '../lib/analytics';

interface NeptuneFinanceCaseStudyProps {
  openProject: (projectId: string) => void;
}

export default function NeptuneFinanceCaseStudy({ openProject }: NeptuneFinanceCaseStudyProps) {
  return (
    <div className="relative z-10">
      {/* Eyebrow */}
      <div className="opacity-0 translate-y-6 transition-all duration-700 ease-out group-data-[active=true]/slide:opacity-100 group-data-[active=true]/slide:translate-y-0 motion-reduce:opacity-100 motion-reduce:translate-y-0 delay-0">
        <p className="mb-4 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--text-subtle)]">
          <span className="text-[color:var(--accent-color)]">02</span>
          <span className="h-px w-8 bg-[var(--border-strong)]" />
          Flagship Case Study
        </p>
      </div>

      {/* Hero area */}
      <div className="grid gap-10 md:grid-cols-[1fr_minmax(0,340px)] items-start">
        {/* Left column — text */}
        <div>
          <div className="opacity-0 translate-y-6 transition-all duration-700 ease-out group-data-[active=true]/slide:opacity-100 group-data-[active=true]/slide:translate-y-0 motion-reduce:opacity-100 motion-reduce:translate-y-0 delay-[100ms]">
            <h2 className="heading-accent font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight text-[var(--text)] md:text-4xl">
              Neptune Finance
            </h2>
            <p className="mt-2 text-sm font-medium text-[color:var(--accent-color)]">
              Design Engineer / Frontend Lead
            </p>
          </div>

          <div className="opacity-0 translate-y-6 transition-all duration-700 ease-out group-data-[active=true]/slide:opacity-100 group-data-[active=true]/slide:translate-y-0 motion-reduce:opacity-100 motion-reduce:translate-y-0 delay-[200ms]">
            <p className="mt-6 text-lg leading-relaxed text-[var(--text-muted)]">
              Built and operated the production frontend for a DeFi lending protocol on Injective —
              full product ownership from Figma design system through production TypeScript. Contract-aware
              transaction flows, low-latency market data, and wallet-driven execution paths with real
              funds at stake.
            </p>
          </div>

          {/* Problem → Approach → Outcome narrative */}
          <div className="opacity-0 translate-y-6 transition-all duration-700 ease-out group-data-[active=true]/slide:opacity-100 group-data-[active=true]/slide:translate-y-0 motion-reduce:opacity-100 motion-reduce:translate-y-0 delay-[300ms]">
            <div className="mt-8 grid gap-6 sm:grid-cols-3">
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)] mb-2">
                  Challenge
                </h3>
                <p className="text-sm leading-relaxed text-[var(--text-muted)]">
                  On-chain and UI state drifts during pending transactions. Multi-step flows across
                  lending, staking, and liquidity must feel simple despite contract complexity.
                </p>
              </div>
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)] mb-2">
                  Approach
                </h3>
                <p className="text-sm leading-relaxed text-[var(--text-muted)]">
                  Modelled transaction lifecycle states as first-class UI states.
                  Reusable query and component primitives for each protocol module.
                  Deterministic error and retry handling around wallet operations.
                </p>
              </div>
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)] mb-2">
                  Outcome
                </h3>
                <p className="text-sm leading-relaxed text-[var(--text-muted)]">
                  Shipped lending, staking, airdrop, and liquidity workflows to production users.
                  Design system kept Figma and code in sync across a fast-moving codebase.
                </p>
              </div>
            </div>
          </div>

          {/* Self-directed feature callout */}
          <div className="opacity-0 translate-y-6 transition-all duration-700 ease-out group-data-[active=true]/slide:opacity-100 group-data-[active=true]/slide:translate-y-0 motion-reduce:opacity-100 motion-reduce:translate-y-0 delay-[400ms]">
            <div className="mt-8 rounded-xl border border-[var(--border)] bg-[var(--surface)] p-5 shadow-[var(--shadow-card)]">
              <p className="text-xs font-semibold uppercase tracking-wider text-[color:var(--accent-color)] mb-2">
                Self-directed feature
              </p>
              <p className="text-sm font-semibold text-[var(--text)]">
                Balance Menu
              </p>
              <p className="mt-1 text-sm leading-relaxed text-[var(--text-muted)]">
                Identified a gap independently, designed the solution in Figma, and built it in
                production without a brief. Surfaces an asset chart, customization toggles, and
                an inline swap — users cited it as one of the most useful additions to the product.
              </p>
            </div>
          </div>

          {/* Stack + CTA */}
          <div className="opacity-0 translate-y-6 transition-all duration-700 ease-out group-data-[active=true]/slide:opacity-100 group-data-[active=true]/slide:translate-y-0 motion-reduce:opacity-100 motion-reduce:translate-y-0 delay-[500ms]">
            <div className="mt-8 flex flex-wrap items-center gap-2">
              {['Next.js', 'TypeScript', 'Tailwind', 'CosmWasm', 'Injective'].map((tag) => (
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
                onClick={() => openProject('neptune-finance')}
                className="inline-flex items-center justify-center rounded-full bg-[var(--text)] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[color:var(--accent-color)] hover:text-white active:scale-[0.98]"
              >
                View full case study
              </button>
              <a
                href="https://app.nept.finance"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent('click_case_study_link', { project_title: 'Neptune Finance', link_label: 'Live app', link_url: 'https://app.nept.finance' })}
                className="inline-flex items-center justify-center rounded-full border border-[var(--border)] bg-[var(--surface)] px-6 py-3 text-sm font-semibold text-[var(--text)] transition hover:border-[color:var(--accent-color)] active:scale-[0.98]"
              >
                Live app ↗
              </a>
            </div>
          </div>
        </div>

        {/* Right column — screenshot */}
        <div className="opacity-0 translate-y-6 transition-all duration-700 ease-out group-data-[active=true]/slide:opacity-100 group-data-[active=true]/slide:translate-y-0 motion-reduce:opacity-100 motion-reduce:translate-y-0 delay-[200ms] hidden md:block">
          <div className="relative rounded-2xl border border-[var(--border)] bg-[var(--surface)] shadow-[var(--shadow-card)] overflow-hidden">
            <Image
              src="/screenshots/neptune-balance-menu.png"
              alt="Neptune Finance — Balance Menu, a self-directed feature"
              width={680}
              height={900}
              className="w-full h-auto"
              priority={false}
            />
          </div>
          <p className="mt-3 text-center text-xs text-[var(--text-subtle)]">
            Balance Menu — self-directed feature
          </p>
        </div>
      </div>
    </div>
  );
}
