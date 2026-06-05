import React from 'react';
import { ProjectHero } from '../../Components/case-study/ProjectHero';
import { SnapshotGrid } from '../../Components/case-study/SnapshotGrid';
import { SectionWrapper } from '../../Components/case-study/SectionWrapper';
import { BulletList } from '../../Components/case-study/BulletList';

export default function DyvePage() {
  return (
    <div className="min-h-0 pb-4">
      {/* 1. Hero Section */}
      <ProjectHero
        title="Dyve"
        subtitle="Frontend Developer"
        summary="A brand-new NFTFi primitive developed for HackFS 2022 that allows users to safely lend, rent, or short NFTs, unlocking liquidity and enabling advanced trading strategies."
        links={[
          { label: 'Source Code', url: 'https://github.com/danielssonn/dyve', primary: true },
          {
            label: 'ETHGlobal Showcase',
            url: 'https://ethglobal.com/showcase/dyve-pxsz9',
            primary: false,
          },
        ]}
      />

      {/* 2. Snapshot */}
      <SnapshotGrid
        role="Frontend Developer"
        stack="Next.js, TypeScript, Tailwind CSS, Ethers.js, Solidity"
        domain="NFTFi / Peer-to-Peer Lending / Shorting"
        scope={[
          'Designed and built the full Next.js/Tailwind frontend application',
          'Created interactive user flows for listing, borrowing, and shorting NFTs',
          'Integrated Ethers.js and Web3React for wallet connection and contract interaction',
          'Managed client-side state, routing, and dynamic data binding for NFT collections',
        ]}
      />

      <div className="py-8">
        {/* 3. Context */}
        <SectionWrapper title="Context">
          <p className="leading-relaxed text-[var(--text-muted)]">
            Dyve was developed for the HackFS 2022 hackathon. The project set out to fix a
            fundamental issue in the NFT ecosystem: millions of unproductive and idle NFTs sitting
            in wallets without active yield-generation opportunities, and a complete lack of tooling
            to hedge or short collections during bear markets.
          </p>
          <p className="mt-4 leading-relaxed text-[var(--text-muted)]">
            To address this, Dyve introduced a brand-new NFTFi primitive. Lenders list their NFTs in
            a pool to earn daily premium fees, defining custom return requirements. Borrowers pay
            the premium and post collateral to borrow the NFT, allowing them to either rent it or
            short it by selling it on the open market.
          </p>
        </SectionWrapper>

        {/* 4. Problem Space */}
        <SectionWrapper title="Problem Space">
          <BulletList
            items={[
              'NFT holders have no safe, native ways to generate passive income from their unproductive assets',
              'Traders are locked into long-only exposure, with no mechanism to hedge floor prices or profit from price declines',
              'Vulnerability to scammers and stolen NFTs interacting with DeFi smart contracts makes trustless escrow difficult',
              'Visualizing multi-step operations like collateral locks, interest rates, and liquidation thresholds is challenging for users',
            ]}
          />
        </SectionWrapper>

        {/* 5. Approach */}
        <SectionWrapper title="Approach">
          <BulletList
            items={[
              'Model borrow, lend, and short actions as explicit multi-stage transaction states in the UI to give users clear feedback',
              'Utilize IPFS to query and verify trait-specific conditions selected by the lender (Exact same NFT vs Trait-specific vs Any NFT in the collection)',
              'Leverage Covalent and NFTPort to verify NFT provenance, token balances, and security boundaries on-chain',
              'Build a clean, dark-mode Web3 interface using Next.js and Tailwind CSS with custom hooks wrapping the Solidity contract triggers',
            ]}
          />
        </SectionWrapper>

        {/* 6. Architecture & Implementation */}
        <SectionWrapper title="Architecture & Implementation">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="rounded-xl border border-[var(--border)] bg-neutral-50/90 p-6">
              <h3 className="mb-4 text-xl font-semibold text-[var(--text)]">
                Frontend Architecture
              </h3>
              <BulletList
                items={[
                  {
                    title: 'Next.js & TypeScript',
                    description:
                      'Structured layout and strong types for transaction payload formatting.',
                  },
                  {
                    title: 'Tailwind CSS Styling',
                    description:
                      'Designed a dark-themed visual design language with custom-tailored layout systems.',
                  },
                ]}
              />
            </div>

            <div className="rounded-xl border border-[var(--border)] bg-neutral-50/90 p-6">
              <h3 className="mb-4 text-xl font-semibold text-[var(--text)]">
                Web3 Data & Protocols
              </h3>
              <BulletList
                items={[
                  {
                    title: 'NFTPort API',
                    description:
                      'Used for querying NFT assets, floor prices, and collection metadata.',
                  },
                  {
                    title: 'Covalent Integration',
                    description:
                      'Indexed and pulled user-specific wallet balances and historical block transactions.',
                  },
                ]}
              />
            </div>

            <div className="rounded-xl border border-[var(--border)] bg-neutral-50/90 p-6">
              <h3 className="mb-4 text-xl font-semibold text-[var(--text)]">Smart Contracts</h3>
              <BulletList
                items={[
                  {
                    title: 'Solidity Escrow',
                    description:
                      'A suite of 7 smart contracts deployed on Ethereum and Polygon testnets managing pool assets.',
                  },
                  {
                    title: 'IPFS trait-matching',
                    description:
                      'Lenders can lock specific traits or metadata hashes securely using decentralised file resolution.',
                  },
                ]}
              />
            </div>

            <div className="rounded-xl border border-[var(--border)] bg-neutral-50/90 p-6">
              <h3 className="mb-4 text-xl font-semibold text-[var(--text)]">UX & Interaction</h3>
              <BulletList
                items={[
                  {
                    title: 'Ethers.js & Web3React',
                    description:
                      'Coordinated multi-wallet connectors with stateful loading triggers for smart contract calls.',
                  },
                  {
                    title: 'Self-closing positions',
                    description:
                      'Designed helpers to automatically repurchase floor assets to close short positions upon expiry.',
                  },
                ]}
              />
            </div>
          </div>
        </SectionWrapper>

        {/* 7. UX & Product Design */}
        <SectionWrapper title="UX & Product Design">
          <p className="leading-relaxed text-[var(--text-muted)] font-medium">
            Dyve puts massive emphasis on lender control and borrower execution:
          </p>
          <BulletList
            items={[
              'Lenders can choose to restrict returns to the EXACT SAME asset (simple rental), a TRAIT-SPECIFIC asset (using metadata), or ANY asset from the collection (shorting)',
              'Traders can see live collateral balances and liquidation limits updated dynamically on-screen',
              'Integrated detailed modal overlays detailing transaction fees, daily premiums, and liquidation rules prior to signing',
            ]}
          />
        </SectionWrapper>

        {/* 8. Impact & Recognition */}
        <SectionWrapper title="Impact & Recognition">
          <p className="leading-relaxed text-[var(--text-muted)] mb-4">
            Dyve was highly recognized during the 2022 hackathon circuits for its innovative design
            and technical implementation:
          </p>
          <BulletList
            items={[
              'Winner of Covalent Best Use Prize (🥈 Second Place)',
              'Winner of NFTPort Pool Prize (🏊‍♂️ Pool Winner)',
              'Polygon Top 5 Finalist at HackFS 2022 (5️⃣ Top 5)',
              'Shipped a fully functional MVP on Ethereum and Polygon testnets with interactive front-to-back contract execution',
            ]}
          />
        </SectionWrapper>

        {/* 9. Key Learnings */}
        <SectionWrapper title="Key Learnings">
          <BulletList
            items={[
              'Handling multi-step contract approval flows for ERC-721 and ERC-20 tokens requires meticulous UI state-machine modeling',
              'Decentralized metadata querying via IPFS needs local client caching to bypass rate-limiting and loading delays during asset browsing',
              'Clear visual indicators for collateral-at-risk are vital for user trust when conducting advanced peer-to-peer financial activities',
            ]}
          />
        </SectionWrapper>
      </div>
    </div>
  );
}
