import React from 'react';
import ImageGallery from '../../Components/ImageGallery';
import { ProjectHero } from '../../Components/case-study/ProjectHero';
import { SnapshotGrid } from '../../Components/case-study/SnapshotGrid';
import { SectionWrapper } from '../../Components/case-study/SectionWrapper';
import { BulletList } from '../../Components/case-study/BulletList';

export default function CraidlePage() {
  return (
    <div className="min-h-0 pb-4">
      {/* 1. Hero Section */}
      <ProjectHero
        title="CrAIdle"
        subtitle="Design Engineer / Agent Orchestrator"
        summary="A self-sustaining AI agent token launchpad and incubation treasury primitive built for the Synthesis Hackathon. Produced entirely through autonomous orchestrated AI agents utilizing the OpenClaw framework and MiniMax."
        links={[{ label: 'Source Code', url: 'https://github.com/1biest/craidle', primary: true }]}
      />

      {/* 2. Snapshot */}
      <SnapshotGrid
        role="Design Engineer / Agent Orchestrator"
        stack="Next.js, TypeScript, Tailwind CSS, OpenClaw, MiniMax, Solidity, Base Sepolia, Ethers.js, Lido stETH"
        domain="AI Agents / Token Launchpad / Yield Treasuries"
        scope={[
          'Designed and built the yield-budgeted treasury and token factory smart contracts',
          'Orchestrated autonomous coding agent pipelines (OpenClaw + MiniMax) for code implementation',
          'Designed a premium dark-mode gameboard dashboard interface for agent monitoring',
          'Implemented Base Sepolia smart contract wallet connectivity and live data feeds',
        ]}
      />

      <div className="py-8">
        {/* 3. Context */}
        <SectionWrapper title="Context">
          <p className="leading-relaxed text-[var(--text-muted)]">
            CrAIdle was developed for the Synthesis Hackathon (Lido Yield-Budgeted Agent track). The
            project addresses a fundamental fragility in the autonomous agent ecosystem: most agent
            systems fund their compute runway by spending their core investment capital directly.
            This drains runway quickly, prevents long incubation cycles, and lacks a clear
            separation between protected principal and operating compute budget.
          </p>
          <p className="mt-4 leading-relaxed text-[var(--text-muted)]">
            To solve this, CrAIdle introduces a yield-budgeted treasury model. Users deposit capital
            into an incubation vault where principal remains locked and safe, while the accrued
            yield (e.g. from Lido stETH) is dynamically routed to the agent's compute budget.
          </p>
          <p className="mt-4 leading-relaxed text-[var(--text-muted)] font-medium">
            Notably, the development process was entirely automated: 100% of the Solidity smart
            contracts and Next.js frontend code was produced and refined by autonomous coding agent
            loops utilizing the OpenClaw gateway framework and MiniMax LLM platforms.
          </p>
          <div className="mt-8">
            <ImageGallery
              images={[
                {
                  src: '/screenshots/craidle-dashboard.png',
                  alt: 'CrAIdle Incubation Dashboard Mockup',
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
              'Compute costs drain agent capital runway rapidly, leading to premature termination of agent systems',
              'No native mechanism exists to partition protected investment principal from operational compute spend',
              'Complex multi-chain yield routes and graduation state transitions are highly difficult for users to track visually',
              'Directing autonomous agent workflows to produce a clean, production-ready codebase without manual developer intervention is highly challenging',
            ]}
          />
        </SectionWrapper>

        {/* 5. Approach */}
        <SectionWrapper title="Approach">
          <BulletList
            items={[
              'Design an Incubator Vault that locks principal and splits yield to a compute budget contract',
              'Utilize OpenClaw autonomous agents and MiniMax models to generate, refine, and deploy frontend and Solidity code',
              'Model agent incubation phases (Incubating, Graduated) as explicit, real-time visual trackers on a dark-themed cyberpunk dashboard',
              'Harden wallet integrations (Ethers.js) with robust error reporting to support Base Sepolia testnet interactions',
            ]}
          />
        </SectionWrapper>

        {/* 6. Architecture & Implementation */}
        <SectionWrapper title="Architecture & Implementation">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="rounded-xl border border-[var(--border)] bg-neutral-50/90 p-6">
              <h3 className="mb-4 text-xl font-semibold text-[var(--text)]">Agent Orchestration</h3>
              <BulletList
                items={[
                  {
                    title: 'OpenClaw Framework',
                    description:
                      'Autonomous agent gateway coordinating multi-file code editing loops and automated verification scripts.',
                  },
                  {
                    title: 'MiniMax LLM Integration',
                    description:
                      'Used for smart code generation, refactoring, and logical contract design checks.',
                  },
                ]}
              />
            </div>

            <div className="rounded-xl border border-[var(--border)] bg-neutral-50/90 p-6">
              <h3 className="mb-4 text-xl font-semibold text-[var(--text)]">Smart Contracts</h3>
              <BulletList
                items={[
                  {
                    title: 'IncubatorVault.sol',
                    description:
                      'Locks principal capital, maps deposits, and manages the locked incubation period.',
                  },
                  {
                    title: 'AgentBudgetManager.sol',
                    description:
                      'Siphons Lido yield and routes it directly to compute budgets while enforcing principal security boundaries.',
                  },
                ]}
              />
            </div>

            <div className="rounded-xl border border-[var(--border)] bg-neutral-50/90 p-6">
              <h3 className="mb-4 text-xl font-semibold text-[var(--text)]">Launchpad Factory</h3>
              <BulletList
                items={[
                  {
                    title: 'AgentTokenFactory.sol',
                    description:
                      'Allows agents to spawn their own ERC-20 tokens on Base to establish localized micro-economies.',
                  },
                  {
                    title: 'Trading Fee Revenue',
                    description:
                      'Built-in 0.25% transfer fee routed back to the agent compute wallet as an ongoing sustainability stream.',
                  },
                ]}
              />
            </div>

            <div className="rounded-xl border border-[var(--border)] bg-neutral-50/90 p-6">
              <h3 className="mb-4 text-xl font-semibold text-[var(--text)]">UX & Frontend</h3>
              <BulletList
                items={[
                  {
                    title: 'Ethers.js & Web3',
                    description:
                      'Direct Base Sepolia RPC integration for deposit, budget query, and graduation execution.',
                  },
                  {
                    title: 'Cyberpunk Gameboard UI',
                    description:
                      'A futuristic, dark-mode design with glowing status cards, Orbitron font headings, and glassmorphism panels.',
                  },
                ]}
              />
            </div>
          </div>
        </SectionWrapper>

        {/* 7. UX & Product Design */}
        <SectionWrapper title="UX & Product Design">
          <p className="leading-relaxed text-[var(--text-muted)] font-medium">
            CrAIdle prioritizes high visual density and clear system states:
          </p>
          <BulletList
            items={[
              'Left sidebar showcases active agents with clear, glowing status badges (Incubating, Ready, Graduated)',
              'Vault panel displays live capital metrics, compute budget balances, and yield accrual stats',
              'Futuristic Orbitron and Rajdhani typography builds a thematic, high-fidelity developer experience',
            ]}
          />
        </SectionWrapper>

        {/* 8. Impact & Recognition */}
        <SectionWrapper title="Impact & Recognition">
          <p className="leading-relaxed text-[var(--text-muted)] mb-4">
            CrAIdle demonstrates both technical execution and innovative agent workflows:
          </p>
          <BulletList
            items={[
              '100% Agent-Produced Codebase: Proven capability of directed AI agents to design and ship full-stack web applications',
              'Lido Yield-Budget Treasury: Deployed functional vault and treasury primitives on Base Sepolia',
              'Self-Sustaining Economy: Agent-controlled ERC-20 tokens with fee collector routes built directly into the transfer pipeline',
            ]}
          />
        </SectionWrapper>

        {/* 9. Key Learnings */}
        <SectionWrapper title="Key Learnings">
          <BulletList
            items={[
              'Orchestrating agentic code loops requires granular specifications to prevent styling drift across multiple files',
              'Mathematical separation of principal and yield at the smart contract level is key for investor trust in agentic systems',
              'Synchronizing fast-updating on-chain yield metrics in Next.js requires explicit refresh hooks to avoid UI balance lag',
            ]}
          />
        </SectionWrapper>
      </div>
    </div>
  );
}
