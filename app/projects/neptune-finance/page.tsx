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
        subtitle="Frontend Lead / DeFi Interface Systems"
        summary="Built and operated a production lending interface on Injective with contract-aware transaction flows, low-latency market data, and wallet-driven execution paths."
        links={[
          { label: 'Live App', url: 'https://app.nept.finance', primary: true },
          { label: 'Landing Page', url: 'https://nept.finance', primary: false },
        ]}
      />

      {/* 2. Snapshot */}
      <SnapshotGrid
        role="Design Engineer / Frontend Lead"
        stack="Next.js, TypeScript, Tailwind, CosmWasm"
        domain="DeFi / Lending / Liquidity"
        scope={[
          'Full product ownership: Figma design system through production TypeScript',
          'Custom Figma component library and visual design language',
          'UX architecture for lending, staking, and liquidity flows',
          'Full frontend architecture and engineering systems',
          'Contract and wallet integration surfaces',
          'Smart contract integrations (Mito, Astroport)',
          'Staking, airdrop, and liquidity systems',
        ]}
      />

      <div className="py-8">
        {/* 3. Context */}
        <SectionWrapper title="Context">
          <p>
            Neptune Finance is a DeFi lending protocol on Injective with CosmWasm contracts.
            <br />
            The frontend coordinates wallet actions, contract state, and market data to keep lending
            and liquidity flows correct during live transaction execution.
          </p>
          <div className="mt-8">
            <ImageGallery
              images={[
                {
                  src: '/screenshots/neptune-landing-home.png',
                  alt: 'Neptune Landing Home',
                  type: 'image',
                },
                {
                  src: '/screenshots/neptune-overview-page.png',
                  alt: 'Neptune Overview Page',
                  type: 'image',
                },
              ]}
            />
          </div>
        </SectionWrapper>

        {/* 4. Problem Space */}
        <SectionWrapper title="Problem Space">
          <BulletList
            items={[
              'On-chain and UI state can drift during pending transactions; users making financial decisions need accurate state at all times',
              'Market-sensitive screens require low-latency updates and interfaces designed for fast decision-making',
              'Multi-step flows across lending, staking, and liquidity must feel simple despite significant underlying contract complexity',
              'Wallet signing and broadcast failures need explicit recovery paths; confusion at this moment breaks user trust and risks funds',
            ]}
          />
        </SectionWrapper>

        {/* 5. Approach */}
        <SectionWrapper title="Approach">
          <BulletList
            items={[
              'Model transaction lifecycle states as first-class UI states',
              'Use reusable query and component primitives for protocol modules',
              'Align user actions to contract message boundaries',
              'Provide deterministic error and retry handling around wallet operations',
            ]}
          />
        </SectionWrapper>

        {/* 6. Architecture & Implementation */}
        <SectionWrapper title="Architecture & Implementation">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="rounded-xl border border-[var(--border)] bg-neutral-50/90 p-6">
              <h3 className="mb-4 text-xl font-semibold text-[var(--text)]">Frontend</h3>
              <BulletList
                items={[
                  {
                    title: 'Modular component system',
                    description: 'Using Next.js + TS for robust structure.',
                  },
                  {
                    title: 'Reusable UI primitives',
                    description: 'Tailwind-driven foundation for consistency.',
                  },
                ]}
              />
            </div>

            <div className="rounded-xl border border-[var(--border)] bg-neutral-50/90 p-6">
              <h3 className="mb-4 text-xl font-semibold text-[var(--text)]">Performance</h3>
              <BulletList
                items={[
                  {
                    title: 'Memoization',
                    description: 'Preventing unnecessary re-renders in heavy data tables.',
                  },
                  {
                    title: 'Render optimization',
                    description: 'Streamlined React lifecycles for real-time tickers.',
                  },
                ]}
              />
            </div>

            <div className="rounded-xl border border-[var(--border)] bg-neutral-50/90 p-6">
              <h3 className="mb-4 text-xl font-semibold text-[var(--text)]">Data Layer</h3>
              <BulletList
                items={[
                  {
                    title: 'Onchain integration',
                    description: 'Interfacing directly with CosmWasm contracts.',
                  },
                  {
                    title: 'Unified multi-source data',
                    description: 'Aggregating indexing APIs, RPCs, and in-house databases.',
                  },
                ]}
              />
            </div>

            <div className="rounded-xl border border-[var(--border)] bg-neutral-50/90 p-6">
              <h3 className="mb-4 text-xl font-semibold text-[var(--text)]">Integrations</h3>
              <BulletList
                items={[
                  { title: 'Mito', description: 'Automated trading vaults integration.' },
                  { title: 'Astroport', description: 'AMM liquidity pools and routing.' },
                ]}
              />
            </div>

            <div className="md:col-span-2 rounded-xl border border-[var(--border)] bg-neutral-50/90 p-6">
              <h3 className="mb-4 text-xl font-semibold text-[var(--text)]">Feature Gating</h3>
              <BulletList
                items={[
                  { title: 'Access control', description: 'NEPT staking-based tiered model.' },
                  {
                    title: 'Compliance',
                    description: 'Geographic gating for regulatory requirements.',
                  },
                ]}
              />
            </div>
          </div>
        </SectionWrapper>

        {/* 7. UX & Product Design */}
        <SectionWrapper title="UX & Product Design">
          <BulletList
            items={[
              'Simplified multi-step flows',
              'Custom liquidity / LP UX patterns',
              'Clear user state visibility',
              'Designed for fast decision-making',
            ]}
          />
          <div className="mt-8">
            <h3 className="mb-4 text-xl font-semibold text-[var(--text)]">Landing Pages</h3>
            <BulletList
              items={['Data-driven visuals (interest rates)', 'Consistent product + marketing UX']}
            />
            <div className="mt-6">
              <ImageGallery
                images={[
                  {
                    src: '/screenshots/neptune-landing-rates.png',
                    alt: 'Neptune Landing Rates',
                    type: 'image',
                  },
                  {
                    src: '/screenshots/neptune-lending-figma.png',
                    alt: 'Neptune Lending Figma Mockup',
                    type: 'image',
                  },
                ]}
              />
            </div>
          </div>
          <div className="mt-8 rounded-xl border border-[var(--border)] bg-neutral-50/90 p-6">
            <h3 className="mb-4 text-xl font-semibold text-[var(--text)]">
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
                  src: '/screenshots/neptune-investment-doc.png',
                  alt: 'Neptune Investment Document',
                  type: 'image',
                },
                {
                  src: '/screenshots/neptune-token-social-posts.png',
                  alt: 'Neptune Token Social Posts',
                  type: 'image',
                },
                {
                  src: '/screenshots/neptune-component-promo.png',
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
            <div className="rounded-lg border border-[var(--border)] bg-neutral-50/90 p-5">
              <span className="font-medium text-[var(--text)]">Lending / borrowing</span>
            </div>
            <div className="rounded-lg border border-[var(--border)] bg-neutral-50/90 p-5">
              <span className="font-medium text-[var(--text)]">Staking + NEPT token</span>
            </div>
            <div className="rounded-lg border border-[var(--border)] bg-neutral-50/90 p-5">
              <span className="font-medium text-[var(--text)]">Airdrops</span>
            </div>
            <div className="rounded-lg border border-[var(--border)] bg-neutral-50/90 p-5">
              <span className="font-medium text-[var(--text)]">
                Liquidity pools (Mito + Astroport)
              </span>
            </div>
            <div className="rounded-lg border border-[var(--border)] bg-neutral-50/90 p-5">
              <span className="font-medium text-[var(--text)]">Gated features</span>
            </div>
            <div className="rounded-lg border border-[var(--border)] bg-neutral-50/90 p-5">
              <span className="font-medium text-[var(--text)]">Landing pages</span>
            </div>
          </div>
          <div className="mt-8">
            <h3 className="mb-4 text-xl font-semibold text-[var(--text)]">Feature Deep Dives</h3>
            <ImageGallery
              images={[
                {
                  src: '/screenshots/neptune-asset-detail-page.png',
                  alt: 'Neptune Asset Detail Page',
                  type: 'image',
                },
                {
                  src: '/screenshots/neptune-pool-page.png',
                  alt: 'Neptune Pool Page',
                  type: 'image',
                },
              ]}
            />
          </div>
        </SectionWrapper>

        {/* 10. Impact */}
        <SectionWrapper title="Impact">
          <BulletList
            items={[
              'Shipped lending, staking, airdrop, and liquidity workflows to production users with real funds at stake',
              'Improved transaction reliability and reduced user confusion through explicit state handling and recovery UX',
              'Built a design system that kept Figma components and production code in sync across a fast-moving codebase',
              'Identified and shipped the balance menu independently: no brief, designed in Figma, implemented in production',
            ]}
          />
        </SectionWrapper>

        {/* 11. Improvements (Senior signal) */}
        <SectionWrapper title="Improvements">
          <BulletList
            items={[
              'Add automated integration tests for contract message permutations',
              'Expand observability around failed and delayed transaction states',
              'Harden cache invalidation for high-frequency market updates',
            ]}
          />
        </SectionWrapper>
      </div>
    </div>
  );
}
