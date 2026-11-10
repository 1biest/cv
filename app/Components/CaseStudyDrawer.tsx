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
      src: '/screenshots/neptune-balance-menu.png',
      alt: 'Neptune Balance Menu',
      title: 'Balance Menu & Quick Swap Hub',
      caption: 'Self-directed production feature designed in Figma and implemented in production without a brief.',
    },
    {
      src: '/screenshots/neptune-landing-home.png',
      alt: 'Neptune Landing Home',
      title: 'Marketing & Protocol Landing Page',
      caption: 'High-conversion design system and marketing interface for the lending protocol.',
    },
    {
      src: '/screenshots/neptune-overview-page.png',
      alt: 'Neptune Overview Page',
      title: 'Portfolio Overview Dashboard',
      caption: 'Real-time collateral health ratios, borrow positions, and interest rate updates.',
    },
    {
      src: '/screenshots/neptune-asset-detail-page.png',
      alt: 'Neptune Asset Detail Page',
      title: 'Asset Detail & Risk Parameters',
      caption: 'Deep liquidity metrics, borrow factor limits, and multi-asset deposit configurations.',
    },
    {
      src: '/screenshots/neptune-lending-screenshot.png',
      alt: 'Neptune Lending Interface',
      title: 'Lending Market Table',
      caption: 'Low-latency interest rate markets and real-time CosmWasm state synchronization.',
    },
    {
      src: '/screenshots/neptune-borrow-screenshot.png',
      alt: 'Neptune Borrow Interface',
      title: 'Borrow & Repayment Workflows',
      caption: 'Deterministic transaction lifecycles and wallet error recovery boundaries.',
    },
    {
      src: '/screenshots/neptune-pool-page.png',
      alt: 'Neptune Liquidity Pools',
      title: 'Liquidity Pools & Staking',
      caption: 'Automated yield routing with Astroport pools and Mito vaults.',
    },
    {
      src: '/screenshots/neptune-lending-figma.png',
      alt: 'Neptune Figma Mockup',
      title: 'Figma Design System Architecture',
      caption: 'Custom component library and token scales synchronized directly to Tailwind CSS.',
    },
  ],
  'agos': [
    {
      src: '/screenshots/neptune-balance-menu.png',
      alt: 'AgOS Spatial System Preview',
      title: 'Spatial Interface & Yard Model',
      caption: 'Parametric 3D grain storage digital twin with 100% accessible tabular mirrors.',
    },
  ],
  'dyve': [
    {
      src: '/screenshots/dyve-screenshot.png',
      alt: 'Dyve Interface',
      title: 'Dyve NFTFi Trading Interface',
      caption: 'Decentralized peer-to-peer lending and shorting platform developed for HackFS 2022.',
    },
  ],
  'craidle': [
    {
      src: '/screenshots/craidle-dashboard.png',
      alt: 'CrAIdle Dashboard',
      title: 'CrAIdle AI Analytics Platform',
      caption: 'Interactive workflow monitor and machine learning model telemetry dashboard.',
    },
  ],
  'satsuma': [
    {
      src: '/screenshots/satsuma-screenshot.png',
      alt: 'Satsuma Interface',
      title: 'Satsuma DEX Interface',
      caption: 'High-frequency decentralized exchange interface with low-latency charts.',
    },
  ],
  'monad-heartbeat': [
    {
      src: '/screenshots/monad-heartbeat-screenshot.png',
      alt: 'Monad Heartbeat',
      title: 'Monad Heartbeat Monitor',
      caption: 'High-throughput EVM validator telemetry and real-time block pulse tracker.',
    },
  ],
  'etherfi-demo': [
    {
      src: '/screenshots/etherfi-demo-screenshot.png',
      alt: 'ether.fi Liquid Restaking Demo',
      title: 'Liquid Restaking Deposit Flow',
      caption: 'EVM liquid restaking protocol interface demo and vault deposit workflows.',
    },
  ],
  'cryptech': [
    {
      src: '/screenshots/cryptech-homepage.png',
      alt: 'Cryptech Homepage',
      title: 'Cryptech Web3 Studio',
      caption: 'Engineering studio web identity and project portal.',
    },
    {
      src: '/screenshots/cryptech-dashboard.png',
      alt: 'Cryptech Dashboard',
      title: 'DeFi Portfolio Dashboard',
      caption: 'Asset portfolio tracker and multi-chain wallet connector.',
    },
    {
      src: '/screenshots/cryptech-airdrop-calculator.png',
      alt: 'Airdrop Calculator',
      title: 'Airdrop Calculator UI',
      caption: 'Complex staking tiered eligibility and multiplier calculation engine.',
    },
    {
      src: '/screenshots/cryptech-style-guides.png',
      alt: 'Style Guides',
      title: 'Design System & Typography',
      caption: 'Tokens, color scales, and typography hierarchies.',
    },
    {
      src: '/screenshots/macro-dex-screenshot.png',
      alt: 'Macro DEX',
      title: 'Macro DEX Interface',
      caption: 'Automated market maker and cross-chain swap interface.',
    },
    {
      src: '/screenshots/macro-dex-branding-concepts.png',
      alt: 'Macro DEX Branding',
      title: 'Macro DEX Visual System',
      caption: 'Brand identity, iconography, and tokenomics graphics.',
    },
  ],
  'cryptech-developments': [
    {
      src: '/screenshots/cryptech-homepage.png',
      alt: 'Cryptech Developments',
      title: 'Cryptech Developments',
      caption: 'Web3 product studio and protocol development lead.',
    },
    {
      src: '/screenshots/neptune-balance-menu.png',
      alt: 'Neptune Finance Balance Menu',
      title: 'Neptune Finance Protocol',
      caption: 'Lead frontend engineering and design systems.',
    },
    {
      src: '/screenshots/cryptech-dashboard.png',
      alt: 'Cryptech Dashboard',
      title: 'Web3 Dashboard Architecture',
      caption: 'Reusable TypeScript and React component libraries.',
    },
  ],
  'open-source-contributions': [
    {
      src: '/screenshots/cw3-multisig-screenshot.png',
      alt: 'CW3 Multisig UI',
      title: 'CosmWasm CW3 Multisig',
      caption: 'Open-source multisig transaction proposal and threshold voting interface.',
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
      {/* Dark frosted backdrop overlay */}
      <div
        className={`absolute inset-0 bg-neutral-950/75 backdrop-blur-md transition-opacity duration-300 ${
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
        <div className="flex items-center justify-between text-neutral-300 pointer-events-auto">
          <div className="flex items-center gap-3">
            <span className="inline-block w-2 h-2 rounded-full bg-amber-400" />
            <span className="font-mono text-xs uppercase tracking-widest text-neutral-300 font-bold">
              VISUAL ARTIFACTS // {projectTitle.toUpperCase()}
            </span>
            {galleryItems.length > 0 && (
              <span className="font-mono text-[11px] text-neutral-400 bg-neutral-900/80 px-2 py-0.5 rounded border border-neutral-800">
                {selectedImageIndex + 1} OF {galleryItems.length}
              </span>
            )}
          </div>

          <button
            onClick={onClose}
            className="text-xs font-mono text-neutral-400 hover:text-white px-2.5 py-1 rounded border border-neutral-800 hover:border-neutral-600 transition"
          >
            DISMISS [ESC]
          </button>
        </div>

        {/* Featured Main Preview in Negative Space */}
        {activeImage ? (
          <div className="my-auto max-w-2xl w-full mx-auto pointer-events-auto">
            <div className="group relative rounded-2xl border border-neutral-800 bg-neutral-950/90 p-2 shadow-2xl overflow-hidden transition-all duration-300 hover:border-neutral-600">
              <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-neutral-900">
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
              <div className="p-3.5 flex items-start justify-between gap-3 text-neutral-200">
                <div>
                  <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-amber-400">
                    {activeImage.title}
                  </h4>
                  {activeImage.caption && (
                    <p className="text-xs text-neutral-400 mt-1 leading-relaxed">
                      {activeImage.caption}
                    </p>
                  )}
                </div>

                <a
                  href={activeImage.src}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shrink-0 p-2 text-neutral-400 hover:text-white transition"
                  title="Open full resolution"
                >
                  <FontAwesomeIcon icon={faExpand} className="text-xs" />
                </a>
              </div>
            </div>
          </div>
        ) : (
          <div className="my-auto max-w-md mx-auto text-center text-neutral-400 pointer-events-auto">
            <div className="rounded-2xl border border-neutral-800 bg-neutral-950/60 p-8">
              <span className="font-mono text-xs uppercase text-amber-400 tracking-wider">
                DESIGN ARTIFACTS
              </span>
              <h4 className="text-base font-bold text-white mt-1">
                {projectTitle}
              </h4>
              <p className="text-xs text-neutral-400 mt-2 leading-relaxed">
                Detailed architecture specifications, contract state diagrams, and interaction flows are loaded in the panel.
              </p>
            </div>
          </div>
        )}

        {/* Thumbnail Reel at the Bottom of Negative Space */}
        {galleryItems.length > 1 && (
          <div className="pointer-events-auto pt-4 border-t border-neutral-800/80">
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
                        ? 'border-amber-400 ring-2 ring-amber-400/40 scale-105 shadow-md'
                        : 'border-neutral-800 opacity-60 hover:opacity-100 hover:border-neutral-600'
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

      {/* Slide-over panel — Brighter frosted glass for 100% legibility over any background */}
      <div
        className={`relative z-20 flex h-full w-full flex-col border-l border-neutral-200/90 bg-white/96 dark:bg-[#fcfcfb]/96 backdrop-blur-3xl shadow-[0_0_80px_rgba(0,0,0,0.35)] transition-transform duration-300 ease-out sm:max-w-2xl md:max-w-3xl xl:max-w-4xl text-[var(--text)] ${
          animateShow ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Sticky Header */}
        <header className="sticky top-0 z-20 flex items-center justify-between border-b border-neutral-200/90 bg-white/95 px-6 py-4 backdrop-blur-md">
          <div className="flex items-center gap-3 overflow-hidden">
            <button
              onClick={onClose}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-neutral-300 text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900 transition shadow-xs"
              aria-label="Close case study"
            >
              <FontAwesomeIcon icon={faXmark} className="text-sm" />
            </button>
            <span className="hidden text-xs font-mono font-bold uppercase tracking-wider text-amber-600 sm:inline">
              CASE STUDY
            </span>
            <span className="hidden text-xs text-neutral-400 sm:inline">/</span>
            <h2 className="truncate text-base font-bold text-neutral-900">{projectTitle}</h2>
          </div>

          <div className="flex items-center gap-2">
            {/* Share link button */}
            <button
              onClick={copyLink}
              className="relative flex h-9 px-3.5 items-center justify-center gap-1.5 rounded-full border border-neutral-300 text-xs font-semibold text-neutral-800 hover:border-neutral-500 hover:bg-neutral-50 transition shadow-xs"
            >
              <FontAwesomeIcon icon={faLink} className="text-[11px]" />
              <span>{copied ? 'Copied!' : 'Copy Link'}</span>
            </button>
          </div>
        </header>

        {/* Scrollable Case Study Content */}
        <div className="flex-1 overflow-y-auto px-6 py-8 md:px-12 md:py-12 bg-white/60">
          <div className="mx-auto max-w-3xl">{children}</div>
        </div>

        {/* Footer Navigation */}
        <footer className="border-t border-neutral-200/90 bg-neutral-50/95 px-6 py-4 backdrop-blur-md">
          <div className="mx-auto flex max-w-3xl items-center justify-between gap-4">
            <button
              onClick={onPrev}
              className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-neutral-600 hover:text-neutral-950 transition"
            >
              <FontAwesomeIcon icon={faArrowLeft} />
              <span>Previous Project</span>
            </button>
            <button
              onClick={onNext}
              className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-neutral-600 hover:text-neutral-950 transition"
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
