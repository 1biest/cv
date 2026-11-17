'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faLink, faArrowRight, faArrowLeft, faExpand } from '@fortawesome/free-solid-svg-icons';
import { trackEvent } from '../lib/analytics';
import { Project } from '../types/projects';

interface GalleryItem {
  src: string;
  alt: string;
  title: string;
  caption?: string;
}

const PROJECT_GALLERIES: Record<string, GalleryItem[]> = {
  'neptune-finance': [
    {
      src: '/screenshots/neptune-balance-menu.webp',
      alt: 'Neptune Balance Menu',
      title: 'Balance Menu & Quick-Action Hub',
      caption: 'Self-initiated production feature designed in Figma and shipped straight into production.',
    },
    {
      src: '/screenshots/neptune-landing-home.webp',
      alt: 'Neptune Landing Home',
      title: 'Marketing & Protocol Landing Page',
      caption: 'Unified design system and product marketing interface for the lending protocol.',
    },
    {
      src: '/screenshots/neptune-overview-page.webp',
      alt: 'Neptune Overview Page',
      title: 'Portfolio Overview Dashboard',
      caption: 'Real-time collateral health ratios, borrow positions, and live interest rate state.',
    },
    {
      src: '/screenshots/neptune-asset-detail-page.webp',
      alt: 'Neptune Asset Detail Page',
      title: 'Asset Detail & Risk Parameters',
      caption: 'Deep liquidity metrics, borrow factor limits, and collateral configurations.',
    },
    {
      src: '/screenshots/neptune-lending-screenshot.webp',
      alt: 'Neptune Lending Interface',
      title: 'Lending Market Table',
      caption: 'Low-latency interest rate markets and real-time CosmWasm state synchronization.',
    },
    {
      src: '/screenshots/neptune-borrow-screenshot.webp',
      alt: 'Neptune Borrow Interface',
      title: 'Borrow & Repayment Workflows',
      caption: 'Deterministic transaction lifecycles and wallet error recovery boundaries.',
    },
    {
      src: '/screenshots/neptune-pool-page.webp',
      alt: 'Neptune Liquidity Pools',
      title: 'Liquidity Pools & Staking',
      caption: 'Yield and vault routing with Astroport pools and Mito vaults.',
    },
    {
      src: '/screenshots/neptune-lending-figma.webp',
      alt: 'Neptune Figma Mockup',
      title: 'Figma Design System Architecture',
      caption: 'Custom Figma component library and token scales aligned directly to Tailwind CSS.',
    },
  ],
  'agos': [
    {
      src: '/diagrams/agos-architecture.svg',
      alt: 'AgOS Full-Stack Architecture Diagram',
      title: 'Field Discovery → 3D Spatial Twin & Postgres Schema',
      caption: 'Originating from 2 years of Flat Land Farms operations: React 19, parametric Three.js bins, Recharts/Nivo financials, Drizzle ORM, and Neon PostgreSQL.',
    },
  ],
  'flat-land-farms': [
    {
      src: '/diagrams/agos-architecture.svg',
      alt: 'AgOS Field-to-Software Architecture Diagram',
      title: 'From Precision Field Telemetry to AgOS Software',
      caption: 'Direct grower experience with John Deere Ops Center & Climate FieldView informed AgOS crop, storage, and contracting workflows.',
    },
  ],
  'dyve': [
    {
      src: '/screenshots/dyve-screenshot.webp',
      alt: 'Dyve Interface',
      title: 'Dyve NFTFi Trading & Lending UI',
      caption: 'Decentralized peer-to-peer NFT lending and shorting platform built for ETHGlobal HackFS 2022.',
    },
  ],
  'craidle': [
    {
      src: '/diagrams/craidle-architecture.svg',
      alt: 'CrAIdle Architecture Diagram',
      title: 'CrAIdle Yield-Budgeted Treasury & OpenClaw Pipeline',
      caption: 'Spec-driven agentic engineering (OpenClaw + MiniMax) shipping 4 Base Sepolia contracts separating locked principal from stETH compute yield.',
    },
  ],
  'satsuma': [
    {
      src: '/diagrams/satsuma-architecture.svg',
      alt: 'Satsuma Cross-Chain Routing Diagram',
      title: 'Satsuma Cross-Chain Yield-to-Bitcoin Architecture',
      caption: '4-network yield routing workflow coordinating Injective deposits, Astroport swaps, Axelar GMP relays, and ICP canisters.',
    },
  ],
  'monad-heartbeat': [
    {
      src: '/screenshots/monad-heartbeat-screenshot.webp',
      alt: 'Monad Heartbeat Visualizer',
      title: 'Monad Heartbeat 3D Block Explorer',
      caption: 'Real-time WebSocket visualizer tracking speculative, execution, consensus, and finalized block states.',
    },
  ],
  'etherfi-demo': [
    {
      src: '/screenshots/etherfi-demo-screenshot.webp',
      alt: 'ether.fi Cash Dashboard Demo',
      title: 'ether.fi Cash Interactive Dashboard Demo',
      caption: 'Interactive dark-mode DeFi credit card UI modeling weETH collateral borrowing power and card spend limits.',
    },
  ],
  'cryptech': [
    {
      src: '/screenshots/cryptech-airdrop-calculator.webp',
      alt: 'Airdrop Calculator UI',
      title: 'Cryptech Cosmos Airdrop Calculator',
      caption: 'Interactive staking tier eligibility and multiplier calculation tool.',
    },
    {
      src: '/screenshots/cryptech-style-guides.webp',
      alt: 'Cryptech Style Guides',
      title: 'Design System & Token Guides',
      caption: 'Typography hierarchies, color scales, and reusable CSS/Tailwind component guides.',
    },
    {
      src: '/screenshots/macro-dex-screenshot.webp',
      alt: 'Macro DEX Interface',
      title: 'Macro DEX Exchange UI',
      caption: 'Cross-chain swap and orderflow explorer interface built with React and Next.js.',
    },
    {
      src: '/screenshots/macro-dex-branding-concepts.webp',
      alt: 'Macro DEX Branding Concepts',
      title: 'Macro DEX Visual System',
      caption: 'Brand identity explorations, color modes, and product UI concepts.',
    },
  ],
  'cryptech-developments': [
    {
      src: '/screenshots/neptune-balance-menu.webp',
      alt: 'Neptune Finance Balance Menu',
      title: 'Neptune Finance Product Engineering',
      caption: 'Lead frontend engineering and Figma design systems ($300M+ peak protocol TVL).',
    },
    {
      src: '/screenshots/cryptech-airdrop-calculator.webp',
      alt: 'Cryptech Airdrop Calculator',
      title: 'Cryptech Tooling & Calculators',
      caption: 'Interactive ecosystem calculators and reusable React component primitives.',
    },
    {
      src: '/screenshots/macro-dex-screenshot.webp',
      alt: 'Macro DEX Interface',
      title: 'Macro DEX Interface',
      caption: 'Product interfaces and unified styling tokens across Cryptech properties.',
    },
  ],
  'open-source-contributions': [
    {
      src: '/screenshots/cw3-multisig-screenshot.webp',
      alt: 'CW3 Multisig UI',
      title: 'CosmWasm CW3 Multisig on Injective',
      caption: 'Ported multisig transaction proposal, threshold voting, and Base64 payload diagnostics.',
    },
  ],
};

interface CaseStudyDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
  projectTitle: string;
  projectUrl: string;
  project?: Project;
  children: React.ReactNode;
}

export default function CaseStudyDrawer({
  isOpen,
  onClose,
  onNext,
  onPrev,
  projectTitle,
  projectUrl,
  project,
  children,
}: CaseStudyDrawerProps) {
  const [copied, setCopied] = useState(false);
  const [isRendered, setIsRendered] = useState(false);
  const [animateShow, setAnimateShow] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const projectId = project?.id || '';

  // Retrieve gallery images: custom map or project's embedded images
  const galleryItems: GalleryItem[] =
    PROJECT_GALLERIES[projectId] ||
    (project?.images && project.images.length > 0
      ? project.images
          .filter((img) => img.src)
          .map((img) => ({
            src: img.src!,
            alt: img.alt,
            title: img.alt,
          }))
      : []);

  // Reset selected image when project changes
  useEffect(() => {
    setSelectedImageIndex(0);
  }, [projectId]);

  // Handle animation lifecycle
  useEffect(() => {
    if (isOpen) {
      setIsRendered(true);
      const timer = setTimeout(() => {
        setAnimateShow(true);
      }, 10);
      return () => clearTimeout(timer);
    } else {
      setAnimateShow(false);
      const timer = setTimeout(() => {
        setIsRendered(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isOpen]);

  // Keyboard handler for Esc
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const copyLink = async (e: React.MouseEvent) => {
    e.stopPropagation();
    trackEvent('share_case_study', { project_title: projectTitle, project_url: projectUrl });
    try {
      await navigator.clipboard.writeText(projectUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy link', err);
    }
  };

  if (!isRendered) return null;

  const activeImage = galleryItems[selectedImageIndex] || galleryItems[0];

  return (
    <div
      className="fixed inset-0 z-[100] flex justify-end overflow-hidden"
      role="dialog"
      aria-modal="true"
    >
      {/* Deep Navy frosted backdrop overlay */}
      <div
        className={`absolute inset-0 bg-[#061321]/78 backdrop-blur-md transition-opacity duration-300 ${
          animateShow ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Negative Space Visual Gallery (Desktop Viewports: visible on lg/xl screens) */}
      <div
        className={`relative hidden lg:flex flex-1 flex-col justify-between p-6 xl:p-10 z-10 transition-all duration-300 overflow-hidden pointer-events-none ${
          animateShow ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-6'
        }`}
      >
        {/* Gallery Header */}
        <div className="flex items-center justify-between text-slate-200 pointer-events-auto">
          <div className="flex items-center gap-3">
            <span className="inline-block w-2 h-2 rounded-full bg-[#e5c488]" />
            <span className="font-mono text-xs uppercase tracking-widest text-slate-200 font-bold">
              VISUAL ARTIFACTS // {projectTitle.toUpperCase()}
            </span>
            {galleryItems.length > 0 && (
              <span className="font-mono text-[11px] text-slate-300 bg-[#0a2540]/80 px-2.5 py-0.5 rounded-full border border-white/15">
                {selectedImageIndex + 1} OF {galleryItems.length}
              </span>
            )}
          </div>

          <button
            onClick={onClose}
            className="text-xs font-mono text-slate-300 hover:text-white px-3 py-1 rounded-full border border-white/20 hover:border-white/40 transition"
          >
            DISMISS [ESC]
          </button>
        </div>

        {/* Featured Main Preview in Negative Space */}
        {activeImage ? (
          <div className="my-auto max-w-2xl w-full mx-auto pointer-events-auto">
            <div className="group relative rounded-2xl border border-white/15 bg-[#0a1929]/95 p-2 shadow-2xl overflow-hidden transition-all duration-300 hover:border-white/30">
              <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-[#07121f]">
                <Image
                  src={activeImage.src}
                  alt={activeImage.alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, (max-width: 1536px) 50vw, 680px"
                  className="object-contain transition-transform duration-500 group-hover:scale-[1.02]"
                  priority
                />
              </div>

              {/* Caption and expand link */}
              <div className="p-3.5 flex items-start justify-between gap-3 text-slate-200">
                <div>
                  <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#e5c488]">
                    {activeImage.title}
                  </h4>
                  {activeImage.caption && (
                    <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                      {activeImage.caption}
                    </p>
                  )}
                </div>

                <a
                  href={activeImage.src}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shrink-0 p-2 text-slate-300 hover:text-white transition"
                  title="Open full resolution"
                >
                  <FontAwesomeIcon icon={faExpand} className="text-xs" />
                </a>
              </div>
            </div>
          </div>
        ) : (
          <div className="my-auto max-w-md mx-auto text-center text-slate-300 pointer-events-auto">
            <div className="rounded-2xl border border-white/15 bg-[#0a1929]/85 p-8">
              <span className="font-mono text-xs uppercase text-[#e5c488] tracking-wider">
                DESIGN ARTIFACTS
              </span>
              <h4 className="text-base font-bold text-white mt-1">
                {projectTitle}
              </h4>
              <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                Detailed architecture specifications, contract state diagrams, and interaction flows are loaded in the panel.
              </p>
            </div>
          </div>
        )}

        {/* Thumbnail Reel at the Bottom of Negative Space */}
        {galleryItems.length > 1 && (
          <div className="pointer-events-auto pt-4 border-t border-white/15">
            <div className="flex items-center gap-2.5 overflow-x-auto pb-1 scrollbar-none">
              {galleryItems.map((item, idx) => {
                const isSelected = idx === selectedImageIndex;
                return (
                  <button
                    key={item.src + idx}
                    type="button"
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`group relative shrink-0 w-20 h-14 rounded-lg overflow-hidden border transition-all ${
                      isSelected
                        ? 'border-[#e5c488] ring-2 ring-[#e5c488]/40 scale-105 shadow-md'
                        : 'border-white/20 opacity-65 hover:opacity-100 hover:border-white/40'
                    }`}
                    title={item.title}
                  >
                    <Image
                      src={item.src}
                      alt={item.alt}
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                    <span className="absolute bottom-0.5 right-0.5 font-mono text-[8px] bg-black/80 px-1 rounded text-white">
                      0{idx + 1}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Slide-over panel — Warm Limestone Frosted Glass */}
      <div
        className={`relative z-20 flex h-full w-full flex-col border-l border-[var(--border-strong)] bg-[var(--bg-elevated)]/96 backdrop-blur-3xl shadow-[0_0_80px_rgba(10,37,64,0.35)] transition-transform duration-300 ease-out sm:max-w-2xl md:max-w-3xl xl:max-w-4xl text-[var(--text)] ${
          animateShow ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Sticky Header */}
        <header className="sticky top-0 z-20 flex items-center justify-between border-b border-[var(--border)] bg-[var(--bg-elevated)]/95 px-6 py-4 backdrop-blur-md">
          <div className="flex items-center gap-3 overflow-hidden">
            <button
              onClick={onClose}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[var(--border-strong)] bg-white/80 text-[var(--text-muted)] hover:border-[#0a2540] hover:text-[#0a2540] transition shadow-xs"
              aria-label="Close case study"
            >
              <FontAwesomeIcon icon={faXmark} className="text-sm" />
            </button>
            <span className="hidden text-xs font-mono font-bold uppercase tracking-wider text-[var(--accent-warm)] sm:inline">
              CASE STUDY
            </span>
            <span className="hidden text-xs text-[var(--text-subtle)] sm:inline">/</span>
            <h2 className="truncate text-base font-bold text-[var(--text)]">{projectTitle}</h2>
          </div>

          <div className="flex items-center gap-2">
            {/* Share link button */}
            <button
              onClick={copyLink}
              className="relative flex h-9 px-3.5 items-center justify-center gap-1.5 rounded-full border border-[var(--border-strong)] bg-white/80 text-xs font-semibold text-[var(--text)] hover:border-[#0a2540] hover:text-[#0a2540] transition shadow-xs"
            >
              <FontAwesomeIcon icon={faLink} className="text-[11px]" />
              <span>{copied ? 'Copied!' : 'Copy Link'}</span>
            </button>
          </div>
        </header>

        {/* Scrollable Case Study Content */}
        <div className="flex-1 overflow-y-auto px-6 py-8 md:px-12 md:py-12">
          <div className="mx-auto max-w-3xl">
            {/* Mobile Visual Artifacts Strip (since negative-space panel sits on lg+) */}
            {activeImage ? (
              <div className="lg:hidden mb-8 rounded-2xl border border-[var(--border-strong)] bg-[#0a1929] overflow-hidden shadow-md">
                <div className="relative aspect-video w-full bg-[#07121f]">
                  <Image
                    src={activeImage.src}
                    alt={activeImage.alt}
                    fill
                    sizes="100vw"
                    className="object-contain"
                  />
                </div>
                <div className="p-3.5 text-slate-100">
                  <div className="flex items-center justify-between gap-2">
                    <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#e5c488]">
                      {activeImage.title}
                    </h4>
                    <a
                      href={activeImage.src}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-mono text-slate-300 underline"
                    >
                      Open ↗
                    </a>
                  </div>
                  {activeImage.caption ? (
                    <p className="mt-1 text-xs text-slate-300 leading-relaxed">
                      {activeImage.caption}
                    </p>
                  ) : null}
                </div>
                {galleryItems.length > 1 ? (
                  <div className="flex items-center gap-2 overflow-x-auto border-t border-white/15 bg-[#081523] px-3 py-2.5">
                    {galleryItems.map((item, idx) => (
                      <button
                        key={item.src + idx}
                        type="button"
                        onClick={() => setSelectedImageIndex(idx)}
                        className={`relative h-11 w-16 shrink-0 overflow-hidden rounded border transition ${
                          idx === selectedImageIndex
                            ? 'border-[#e5c488] ring-1 ring-[#e5c488]'
                            : 'border-white/20 opacity-65 hover:opacity-100'
                        }`}
                      >
                        <Image
                          src={item.src}
                          alt={item.alt}
                          fill
                          sizes="64px"
                          className="object-cover"
                        />
                      </button>
                    ))}
                  </div>
                ) : null}
              </div>
            ) : null}
            {children}
          </div>
        </div>

        {/* Footer Navigation */}
        <footer className="border-t border-[var(--border)] bg-[var(--bg-page)]/95 px-6 py-4 backdrop-blur-md">
          <div className="mx-auto flex max-w-3xl items-center justify-between gap-4">
            <button
              onClick={onPrev}
              className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)] hover:text-[#0a2540] transition"
            >
              <FontAwesomeIcon icon={faArrowLeft} />
              <span>Previous Project</span>
            </button>
            <button
              onClick={onNext}
              className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)] hover:text-[#0a2540] transition"
            >
              <span>Next Project</span>
              <FontAwesomeIcon icon={faArrowRight} />
            </button>
          </div>
        </footer>
      </div>
    </div>
  );
}
