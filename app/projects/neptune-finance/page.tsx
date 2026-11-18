import React from 'react';
import ImageGallery from '../../Components/ImageGallery';
import { ProjectHero } from '../../Components/case-study/ProjectHero';
import { SnapshotGrid } from '../../Components/case-study/SnapshotGrid';
import { SectionWrapper } from '../../Components/case-study/SectionWrapper';
import { BulletList } from '../../Components/case-study/BulletList';

export default function NeptuneFinancePage() {
  return (
    <div className="min-h-0 pb-4">
      {/* 1. Hero Section */}
      <ProjectHero
        title="Neptune Finance"
        subtitle="Senior Product, Forward-Deployed, Frontend & AI Engineer · Injective Mainnet"
        summary="Engineered the web platform and smart-contract integration layer for Injective's leading money market—scaling across 9 lending and 21 collateral markets to $159.66M+ in cumulative loans originated, $27.76M peak gross TVL, and 882,800+ on-chain CosmWasm executions over 1,042+ days of mainnet uptime with $0 bad-debt exploits."
        links={[
          { label: 'Live App', url: 'https://app.nept.finance', primary: true },
          { label: 'Landing Page', url: 'https://nept.finance', primary: false },
        ]}
        badge="$159.66M+ Loans Originated"
      />

      {/* 2. Snapshot */}
      <SnapshotGrid
        role="Senior Product / Forward-Deployed / Frontend & AI Engineer"
        stack="Next.js, TypeScript, React Query (@neptunefinance/api-v2), @base-ui, Tailwind CSS, CosmWasm, Injective SDK, Figma"
        domain="DeFi Money Market / Distributed UI State / AI-Accelerated Engineering"
        scope={[
          'Core platform & smart-contract integration across 9 lending and 21 collateral markets',
          'Full-stack read-model migration (@neptunefinance/api-v2) with spec-driven AI agent playbooks',
          'Automated on-chain gas telemetry analyzer across 10 tx profiles (15% limit reduction, 7.55M gas saved)',
          'Centralized React Query state architecture + 600ms–3.5s state-fingerprinted post-tx polling engine',
          '1-click Collateral & Debt Swap UX, 4-layer @base-ui Account Health Bar, and batch Dust Cleanup',
          'Executive Tokenomics & Revenue Flywheel suite + self-initiated Balance Menu',
          'Live Bech32 wallet-inspection diagnostic console, upstream SDK patches & Hydro / Stride / Mito / Astroport / Skip Go integrations',
        ]}
      />

      <div className="py-8">
        {/* 2b. Mainnet Telemetry (3 Key Stats) */}
        <SectionWrapper title="Protocol Scale & Mainnet Telemetry">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] glass-surface p-5 shadow-[var(--shadow-sm)]">
              <span className="font-mono text-2xl font-bold text-[#0a2540]">$159.66M+</span>
              <p className="text-sm font-semibold text-[var(--text)] mt-1">All-Time Loans Originated</p>
              <p className="text-xs leading-relaxed text-[var(--text-muted)] mt-1.5">
                Peaking at $40.47M/month across 5,580+ active lenders and 2,955 borrower subaccounts.
              </p>
            </div>
            <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] glass-surface p-5 shadow-[var(--shadow-sm)]">
              <span className="font-mono text-2xl font-bold text-[#0a2540]">$27.76M</span>
              <p className="text-sm font-semibold text-[var(--text)] mt-1">Peak Total Value Locked</p>
              <p className="text-xs leading-relaxed text-[var(--text-muted)] mt-1.5">
                $18.36M DeFiLlama Net TVL + $9.41M peak active borrows across 9 lending &amp; 21 collateral markets.
              </p>
            </div>
            <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] glass-surface p-5 shadow-[var(--shadow-sm)]">
              <span className="font-mono text-2xl font-bold text-[#0a2540]">882,800+</span>
              <p className="text-sm font-semibold text-[var(--text)] mt-1">On-Chain Contract Executions</p>
              <p className="text-xs leading-relaxed text-[var(--text-muted)] mt-1.5">
                452,086 direct transactions on the core Neptune Market contract over 1,042+ days uptime ($0 bad debt).
              </p>
            </div>
          </div>

          <div className="rounded-xl border border-[var(--border)] border-l-3 border-l-[#0a2540] bg-[var(--surface)] glass-surface p-6 shadow-[var(--shadow-sm)]">
            <h3 className="mb-3 text-base font-semibold tracking-tight text-[#0a2540]">
              Executive Execution Summary
            </h3>
            <BulletList
              items={[
                {
                  title: 'Scaled Core DeFi Frontend & Protocol UX',
                  description:
                    "Architected the Next.js/TypeScript web platform and CosmWasm integration layer for Injective's premier money market across 9 lending and 21 collateral markets (1,042+ days mainnet uptime, $0 bad-debt exploits).",
                },
                {
                  title: 'AI-Driven Engineering & Telemetry',
                  description:
                    'Built spec-driven AI agent guardrails to execute a zero-downtime migration to @neptunefinance/api-v2, plus an automated on-chain gas telemetry analyzer that cut high-complexity gas estimates by 15% (7.55M gas saved).',
                },
                {
                  title: 'Frontend Distributed Systems',
                  description:
                    'Eliminated client-side state waterfalls and InfluxDB dependencies with a centralized React Query read model and a state-fingerprinted post-tx polling engine that resolved blockchain indexer lag.',
                },
                {
                  title: 'Product Design & 1-Click DeFi Flows',
                  description:
                    'Turned a 5-step atomic flash-loan + DEX routing flow into a 1-click Collateral/Debt Swap UX, designed a 4-layer @base-ui Account Health Bar with live liquidation modeling, and shipped a real-time Tokenomics & Revenue Flywheel analytics suite.',
                },
                {
                  title: 'Forward-Deployed Triage & Partner Integrations',
                  description:
                    'Built a live production wallet-inspection and RPC-failover diagnostic tool for instant customer debugging, patched upstream EVM/WalletConnect SDK signing bugs, and shipped cross-protocol integrations with Hydro, Stride, Mito, Astroport, and Skip Go.',
                },
              ]}
            />
          </div>
        </SectionWrapper>

        {/* 3. Context */}
        <SectionWrapper title="Context">
          <p className="leading-relaxed text-[var(--text-muted)]">
            Neptune Finance is Injective&apos;s leading CosmWasm money market, serving 5,580+ active lenders and 2,955 borrower subaccounts across 9 lending pools and 21 collateral markets with 1,042+ days of mainnet uptime and $0 bad-debt exploits.
          </p>
          <p className="mt-4 leading-relaxed text-[var(--text-muted)]">
            Operating at real capital stakes required solving distributed blockchain state consistency, transaction gas predictability, multi-wallet EVM/Cosmos signing edge cases, and high-cognitive-load DeFi UX—while designing the complete Figma component system and shipping every workflow in production Next.js and TypeScript.
          </p>
          <div className="mt-8">
            <ImageGallery
              images={[
                {
                  src: '/screenshots/neptune-landing-home.webp',
                  alt: 'Neptune Landing Home',
                  type: 'image',
                },
                {
                  src: '/screenshots/neptune-overview-page.webp',
                  alt: 'Neptune Overview Page',
                  type: 'image',
                },
              ]}
            />
          </div>
        </SectionWrapper>

        {/* 4. Engineering, Product & AI Delivery Pillars */}
        <SectionWrapper title="Deep-Dive Execution Across 4 Pillars">
          <div className="space-y-4">
            <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] glass-surface p-6 shadow-[var(--shadow-sm)]">
              <h3 className="mb-2 text-lg font-semibold tracking-tight text-[#0a2540]">
                01 // Protocol Scale &amp; Reliability
              </h3>
              <p className="text-sm leading-relaxed text-[var(--text-muted)]">
                Engineered the web platform and smart-contract integration layer for Injective&apos;s leading money market, scaling to <strong className="text-[var(--text)]">$159.66M+</strong> in cumulative loans originated (peaking at <strong className="text-[var(--text)]">$40.47M/month</strong>), <strong className="text-[var(--text)]">$27.76M</strong> peak gross TVL (<strong className="text-[var(--text)]">$18.36M</strong> DeFiLlama Net TVL + <strong className="text-[var(--text)]">$9.41M</strong> peak active borrows), and <strong className="text-[var(--text)]">882,800+</strong> on-chain CosmWasm executions (<strong className="text-[var(--text)]">452,086</strong> direct Market contract txs) across 5,580+ lenders and 2,955 borrower subaccounts.
              </p>
            </div>

            <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] glass-surface p-6 shadow-[var(--shadow-sm)]">
              <h3 className="mb-2 text-lg font-semibold tracking-tight text-[#0a2540]">
                02 // AI Engineering &amp; Agentic Velocity
              </h3>
              <p className="text-sm leading-relaxed text-[var(--text-muted)]">
                Designed spec-driven AI agent rulesets and verification playbooks to execute a full-stack read-model migration (<code className="font-mono text-xs text-[#0a2540]">@neptunefinance/api-v2</code>), and built a telemetry-driven gas estimation analyzer across 10 transaction profiles that reduced high-complexity gas limits by <strong className="text-[var(--text)]">15%</strong> (<strong className="text-[var(--text)]">7.55M gas saved</strong>) while preventing out-of-gas reverts.
              </p>
            </div>

            <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] glass-surface p-6 shadow-[var(--shadow-sm)]">
              <h3 className="mb-2 text-lg font-semibold tracking-tight text-[#0a2540]">
                03 // Frontend Systems &amp; Eventual Consistency
              </h3>
              <p className="text-sm leading-relaxed text-[var(--text-muted)]">
                Replaced legacy client-side CosmWasm/InfluxDB state reconstruction with a centralized React Query architecture and engineered a state-fingerprinted post-transaction polling engine (<strong className="text-[var(--text)]">600ms–3.5s adaptive backoff</strong>) that eliminated 30-second stale UI states caused by blockchain indexer lag.
              </p>
            </div>

            <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] glass-surface p-6 shadow-[var(--shadow-sm)]">
              <h3 className="mb-2 text-lg font-semibold tracking-tight text-[#0a2540]">
                04 // Product Design &amp; 1-Click DeFi UX
              </h3>
              <p className="text-sm leading-relaxed text-[var(--text-muted)]">
                Abstracted a 5-step atomic flash-loan, DEX routing, and nToken receipt conversion workflow into a <strong className="text-[var(--text)]">1-click Collateral &amp; Debt Swap UI</strong>; designed a 4-layer <code className="font-mono text-xs text-[#0a2540]">@base-ui</code> Account Health visualization with real-time liquidation simulation; and shipped a 1-click batch Dust Cleanup flow and executive Tokenomics/Revenue Flywheel analytics suite.
              </p>
            </div>

            <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] glass-surface p-6 shadow-[var(--shadow-sm)]">
              <h3 className="mb-2 text-lg font-semibold tracking-tight text-[#0a2540]">
                05 // Forward-Deployed Engineering &amp; Ecosystem Integrations
              </h3>
              <p className="text-sm leading-relaxed text-[var(--text-muted)]">
                Built an in-production diagnostic console (hot-swappable Bech32 wallet inspection and RPC failover) for rapid live customer triage; diagnosed and patched upstream multi-decimal APY weighting and EVM/WalletConnect SDK signing bugs; and delivered cross-protocol integrations with <strong className="text-[var(--text)]">Hydro (hINJ)</strong>, <strong className="text-[var(--text)]">Stride (stATOM ICA oracle)</strong>, <strong className="text-[var(--text)]">Mito</strong>, <strong className="text-[var(--text)]">Astroport</strong>, and <strong className="text-[var(--text)]">Skip Go</strong>.
              </p>
            </div>
          </div>
        </SectionWrapper>

        {/* 5. Architecture & Implementation */}
        <SectionWrapper title="System Architecture & Implementation">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] glass-surface p-6 shadow-[var(--shadow-sm)]">
              <h3 className="mb-4 text-lg font-semibold tracking-tight text-[#0a2540]">Read Model &amp; Consistency</h3>
              <BulletList
                items={[
                  {
                    title: 'Centralized @neptunefinance/api-v2',
                    description: 'Replaced legacy client-side CosmWasm/InfluxDB reconstruction with typed React Query caching.',
                  },
                  {
                    title: 'Adaptive Post-Tx Polling Engine',
                    description: 'State-fingerprinted 600ms–3.5s backoff removing 30s indexer-lag UI stalls.',
                  },
                ]}
              />
            </div>

            <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] glass-surface p-6 shadow-[var(--shadow-sm)]">
              <h3 className="mb-4 text-lg font-semibold tracking-tight text-[#0a2540]">Gas Telemetry &amp; AI Tooling</h3>
              <BulletList
                items={[
                  {
                    title: '10-Profile Gas Analyzer',
                    description: 'Reduced high-complexity gas limits by 15% (7.55M gas saved) without out-of-gas reverts.',
                  },
                  {
                    title: 'Spec-Driven Agent Playbooks',
                    description: 'Verification rulesets guarding zero-downtime API-v2 schema migrations.',
                  },
                ]}
              />
            </div>

            <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] glass-surface p-6 shadow-[var(--shadow-sm)]">
              <h3 className="mb-4 text-lg font-semibold tracking-tight text-[#0a2540]">Forward-Deployed Triage</h3>
              <BulletList
                items={[
                  {
                    title: 'Live Production Console',
                    description: 'Hot-swappable Bech32 address inspection and RPC endpoint failover for instant customer debugging.',
                  },
                  {
                    title: 'Upstream SDK & Precision Fixes',
                    description: 'Patched multi-decimal APY weighting and EVM / WalletConnect signing failures upstream.',
                  },
                ]}
              />
            </div>

            <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] glass-surface p-6 shadow-[var(--shadow-sm)]">
              <h3 className="mb-4 text-lg font-semibold tracking-tight text-[#0a2540]">Ecosystem Integrations</h3>
              <BulletList
                items={[
                  { title: 'Liquid Staking & Oracles', description: 'Hydro (hINJ) and Stride (stATOM ICA oracle) collateral markets.' },
                  { title: 'Liquidity & Routing', description: 'Mito automated vaults, Astroport AMM pools, and Skip Go cross-chain routing.' },
                ]}
              />
            </div>

            <div className="md:col-span-2 rounded-xl border border-[var(--border)] bg-[var(--surface)] glass-surface p-6 shadow-[var(--shadow-sm)]">
              <h3 className="mb-4 text-lg font-semibold tracking-tight text-[#0a2540]">1-Click DeFi Flows &amp; Feature Gating</h3>
              <BulletList
                items={[
                  { title: 'Atomic Collateral & Debt Swaps', description: '5-step flash-loan, DEX routing, and nToken receipt conversion compressed into one action.' },
                  { title: 'Tokenomics, Dust & Gating', description: 'Batch 1-click Dust Cleanup, Revenue Flywheel analytics, NEPT staking tiers, and geographic compliance gating.' },
                ]}
              />
            </div>
          </div>
        </SectionWrapper>

        {/* 7. UX & Product Design */}
        <SectionWrapper title="UX & Product Design">
          <BulletList
            items={[
              '1-click Collateral & Debt Swap workflow abstracting 5-step atomic flash-loan and DEX routing sequences',
              '4-layer @base-ui Account Health visualization with real-time liquidation threshold simulation',
              '1-click batch Dust Cleanup across dormant subaccount balances and Executive Tokenomics / Revenue Flywheel charts',
              'Unified Figma component tokens synchronized with Tailwind CSS and accessible @base-ui primitives',
            ]}
          />
          <div className="mt-8">
            <h3 className="mb-4 text-lg font-semibold tracking-tight text-[#0a2540]">Landing Pages</h3>
            <BulletList
              items={['Data-driven visuals (interest rates)', 'Consistent product + marketing UX']}
            />
            <div className="mt-6">
              <ImageGallery
                images={[
                  {
                    src: '/screenshots/neptune-landing-rates.webp',
                    alt: 'Neptune Landing Rates',
                    type: 'image',
                  },
                  {
                    src: '/screenshots/neptune-lending-figma.webp',
                    alt: 'Neptune Lending Figma Mockup',
                    type: 'image',
                  },
                ]}
              />
            </div>
          </div>
          <div className="mt-8 rounded-xl border border-[var(--border)] border-l-3 border-l-[#0a2540] bg-[var(--surface)] glass-surface p-6 shadow-[var(--shadow-sm)]">
            <h3 className="mb-4 text-lg font-semibold tracking-tight text-[#0a2540]">
              Self-Directed Feature: Balance Menu
            </h3>
            <p className="leading-relaxed text-[var(--text-muted)]">
              The wallet area showed only an address and a disconnect button, dead real estate at
              the most-visited point in the UI.
            </p>
            <p className="mt-4 leading-relaxed text-[var(--text-muted)]">
              I identified the gap independently, designed the solution in Figma, and built it in
              production without a brief. The redesigned balance menu surfaces an asset chart and
              table, customisation toggles, and an inline swap, allowing users to act without
              breaking their current flow.
            </p>
            <p className="mt-4 leading-relaxed text-[var(--text-muted)]">
              Outcome: users cited it as one of the most useful additions to the product. Teammates
              began referencing it as the standard for how to approach UI improvements across the
              app.
            </p>
          </div>
        </SectionWrapper>

        {/* 8. Design System */}
        <SectionWrapper title="Design System">
          <BulletList
            items={[
              'Custom Figma component library',
              'Consistent visual identity',
              'Reusable assets',
              'Midjourney-assisted exploration',
            ]}
          />
          <div className="mt-6">
            <ImageGallery
              images={[
                {
                  src: '/screenshots/neptune-investment-doc.webp',
                  alt: 'Neptune Investment Document',
                  type: 'image',
                },
                {
                  src: '/screenshots/neptune-token-social-posts.webp',
                  alt: 'Neptune Token Social Posts',
                  type: 'image',
                },
                {
                  src: '/screenshots/neptune-component-promo.webp',
                  alt: 'Neptune Component Promo',
                  type: 'image',
                },
              ]}
            />
          </div>
        </SectionWrapper>

        {/* 9. Features */}
        <SectionWrapper title="Features">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] glass-surface p-5 shadow-[var(--shadow-sm)]">
              <span className="font-medium text-[var(--text)]">Lending / borrowing</span>
            </div>
            <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] glass-surface p-5 shadow-[var(--shadow-sm)]">
              <span className="font-medium text-[var(--text)]">Staking + NEPT token</span>
            </div>
            <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] glass-surface p-5 shadow-[var(--shadow-sm)]">
              <span className="font-medium text-[var(--text)]">Airdrops</span>
            </div>
            <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] glass-surface p-5 shadow-[var(--shadow-sm)]">
              <span className="font-medium text-[var(--text)]">
                Liquidity pools (Mito + Astroport)
              </span>
            </div>
            <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] glass-surface p-5 shadow-[var(--shadow-sm)]">
              <span className="font-medium text-[var(--text)]">Gated features</span>
            </div>
            <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] glass-surface p-5 shadow-[var(--shadow-sm)]">
              <span className="font-medium text-[var(--text)]">Landing pages</span>
            </div>
          </div>
          <div className="mt-8">
            <h3 className="mb-4 text-lg font-semibold tracking-tight text-[#0a2540]">Feature Deep Dives</h3>
            <ImageGallery
              images={[
                {
                  src: '/screenshots/neptune-asset-detail-page.webp',
                  alt: 'Neptune Asset Detail Page',
                  type: 'image',
                },
                {
                  src: '/screenshots/neptune-pool-page.webp',
                  alt: 'Neptune Pool Page',
                  type: 'image',
                },
              ]}
            />
          </div>
        </SectionWrapper>

        {/* 10. Impact */}
        <SectionWrapper title="Impact & Outcomes">
          <BulletList
            items={[
              '$159.66M+ cumulative loans originated (peaking at $40.47M/month), $27.76M peak gross TVL ($18.36M DeFiLlama Net TVL), and 882,800+ on-chain CosmWasm executions across 5,580+ active lenders and 2,955 borrower subaccounts',
              '1,042+ days of mainnet uptime with $0 bad-debt exploits across 9 lending and 21 collateral markets',
              '15% high-complexity gas limit reduction (7.55M gas saved) across 10 transaction profiles via automated telemetry profiling',
              'Eliminated 30-second indexer-lag stale UI states via the centralized @neptunefinance/api-v2 React Query read model and 600ms–3.5s adaptive backoff polling',
              'Expanded ecosystem liquidity and borrower UX with Hydro (hINJ), Stride (stATOM), Mito, Astroport, and Skip Go integrations alongside 1-click swaps, batch Dust Cleanup, and the unbriefed Balance Menu',
            ]}
          />
        </SectionWrapper>
      </div>
    </div>
  );
}
