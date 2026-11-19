'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faLink, faArrowRight, faArrowLeft, faExpand } from '@fortawesome/free-solid-svg-icons';
import { trackCaseStudyEvent, trackEvent } from '../lib/analytics';
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
      src: '/screenshots/AgOS-screenshot (2).png',
      alt: 'AgOS 3D Grain Storage Yard and Selected Bin D-02 Inspector',
      title: '3D Parametric Storage Yard & Bin Inspector',
      caption: 'Custom Three.js grain bins (Westeel, Behlen, Meridian) tied live to PostgreSQL fill weights, grade, protein, and commodity balances.',
    },
    {
      src: '/screenshots/AgOS-screenshot (3).png',
      alt: 'AgOS Fields & Crops Satellite Map and Crop Allocation Overview',
      title: 'Fields & Crops — Satellite Map & Crop Plan',
      caption: 'Interactive Leaflet + Esri field map across 17 fields (4,800 ac) with crop breakdown charts and John Deere Ops Center (JDOC) import.',
    },
    {
      src: '/screenshots/AgOS-screenshot (5).png',
      alt: 'AgOS Cash Flow Ledger and Production Economics Sankey Diagram',
      title: 'Cash Flow & Production Economics Sankey',
      caption: 'Input cost ledger ($1.23M outflow) traced through a Nivo Sankey diagram into crop production, stored grain value, and sales receipts.',
    },
    {
      src: '/screenshots/AgOS-screenshot (4).png',
      alt: 'AgOS Storage Overview with Inventory Mix Donuts and Stacked Time-Series Chart',
      title: 'Storage Overview — Inventory Mix & Time-Series',
      caption: '$2.1M market valuation and 5,240 t / 208,337 bu on-hand history featuring drag-reorderable and keyboard-accessible layer handles.',
    },
    {
      src: '/screenshots/AgOS-screenshot (1).png',
      alt: 'AgOS Markets Page with Durum Price History Chart and Current Price Board',
      title: 'Markets & Grain Price Benchmarking',
      caption: 'Durum Wheat spot curve against Statistics Canada benchmarks paired with on-hand exposure, open commitments, and active price boards.',
    },
    {
      src: '/screenshots/AgOS-screenshot (7).png',
      alt: 'AgOS Field-to-Bin Shipping Ticket Modal with Manual Entry and Upload & Extract Tabs',
      title: 'Shipping Ticket Intake & Tonnage Sync',
      caption: 'Load ticket builder supporting manual entry and upload/extract intake with live source-to-bin tonnage matching and visual bin selection.',
    },
    {
      src: '/screenshots/AgOS-screenshot (6).png',
      alt: 'AgOS Multi-Tenant Organization and Land Location Settings Modal',
      title: 'Multi-Tenant Organizations & Legal Land Datum',
      caption: 'Isolated organization workspaces with DLS legal land lookup (NW-12-24-02-W3), local coordinate derivation, and role access controls.',
    },
    {
      src: '/diagrams/agos-architecture.svg',
      alt: 'AgOS Full-Stack Architecture Diagram',
      title: 'Field Discovery → 3D Spatial Twin & Postgres Schema',
      caption: 'Originating from 2 years of Flat Land Farms operations: React 19, parametric Three.js bins, Recharts/Nivo financials, Drizzle ORM, and Neon PostgreSQL.',
    },
  ],
  'flat-land-farms': [
    {
      src: '/screenshots/AgOS-screenshot (3).png',
      alt: 'AgOS Fields & Crops Map showing Import from JDOC Action',
      title: 'Translating JDOC Field Workflows into AgOS',
      caption: 'Built direct JDOC field import and 4,800-acre spatial crop planning workflows based on day-to-day precision agriculture bottlenecks.',
    },
    {
      src: '/screenshots/AgOS-screenshot (2).png',
      alt: 'AgOS 3D Storage Yard replacing Manual Whiteboard Grain Tracking',
      title: 'Replacing Whiteboard Bin Logs with 3D Yard State',
      caption: 'Unified bin fill levels, protein/grade attributes, and commodity balances into one live spatial inventory tool.',
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
      caption: 'Injective money market ($159.66M+ cumulative loans · $27.76M peak gross TVL · 882,800+ contract txs).',
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
  const openedAtRef = useRef<number>(Date.now());
  const viewedImagesRef = useRef<Set<number>>(new Set([0]));
  const maxScrollPctRef = useRef<number>(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

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

  // Reset selected image and engagement metrics when project changes or drawer opens
  useEffect(() => {
    setSelectedImageIndex(0);
    openedAtRef.current = Date.now();
    viewedImagesRef.current = new Set([0]);
    maxScrollPctRef.current = 0;
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = 0;
    }
  }, [projectId, isOpen]);

  const recordDwellClose = useCallback(
    (closeMethod: 'backdrop' | 'escape' | 'header_close' | 'top_dismiss' | 'prev_project' | 'next_project') => {
      if (!projectId) return;
      trackCaseStudyEvent('close', projectId, {
        project_title: projectTitle,
        close_method: closeMethod,
        dwell_seconds: Math.max(1, Math.round((Date.now() - openedAtRef.current) / 1000)),
        max_scroll_pct: maxScrollPctRef.current,
        artifacts_viewed_count: galleryItems.length > 0 ? viewedImagesRef.current.size : 0,
        artifacts_total_count: galleryItems.length,
      });
    },
    [galleryItems.length, projectId, projectTitle]
  );

  const handleTrackedClose = useCallback(
    (closeMethod: 'backdrop' | 'escape' | 'header_close' | 'top_dismiss') => {
      recordDwellClose(closeMethod);
      onClose();
    },
    [onClose, recordDwellClose]
  );

  const selectGalleryImage = useCallback(
    (
      nextIdx: number,
      method: 'thumbnail' | 'prev_button' | 'next_button' | 'keyboard_arrow' | 'mobile_thumbnail'
    ) => {
      setSelectedImageIndex(nextIdx);
      viewedImagesRef.current.add(nextIdx);
      const chosen = galleryItems[nextIdx];
      trackCaseStudyEvent('gallery_select', projectId, {
        project_title: projectTitle,
        image_index: nextIdx + 1,
        total_images: galleryItems.length,
        image_title: chosen?.title,
        image_src: chosen?.src,
        interaction_method: method,
      });
    },
    [galleryItems, projectId, projectTitle]
  );

  const handleDrawerScroll = useCallback(() => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const scrollable = el.scrollHeight - el.clientHeight;
    if (scrollable <= 0) {
      maxScrollPctRef.current = 100;
      return;
    }
    const pct = Math.min(100, Math.round((el.scrollTop / scrollable) * 100));
    if (pct > maxScrollPctRef.current) {
      maxScrollPctRef.current = pct;
    }
  }, []);

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

  // Keyboard handler for Esc and gallery arrow navigation
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleTrackedClose('escape');
        return;
      }
      if (galleryItems.length > 1) {
        if (e.key === 'ArrowRight') {
          const nextIdx = (selectedImageIndex + 1) % galleryItems.length;
          selectGalleryImage(nextIdx, 'keyboard_arrow');
        } else if (e.key === 'ArrowLeft') {
          const prevIdx = (selectedImageIndex - 1 + galleryItems.length) % galleryItems.length;
          selectGalleryImage(prevIdx, 'keyboard_arrow');
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, galleryItems.length, handleTrackedClose, selectGalleryImage, selectedImageIndex]);

  const copyLink = async (e: React.MouseEvent) => {
    e.stopPropagation();
    trackEvent('share_case_study', {
      project_id: projectId,
      project_title: projectTitle,
      project_url: projectUrl,
      category: 'Case_Study',
    });
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
        onClick={() => handleTrackedClose('backdrop')}
        aria-hidden="true"
      />

      {/* Full-Bleed Visual Stage (Desktop Viewports: visible on lg/xl screens) */}
      <div
        className={`relative hidden lg:flex flex-1 flex-col h-full z-10 transition-all duration-300 overflow-hidden pointer-events-none ${
          animateShow ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-6'
        }`}
      >
        {/* Minimal Floating Header Controls */}
        <div className="pointer-events-none absolute top-0 inset-x-0 z-20 flex items-center justify-between px-5 py-4 bg-gradient-to-b from-[#061321]/70 via-[#061321]/25 to-transparent">
          <div className="pointer-events-auto flex items-center gap-2.5">
            <span className="inline-block w-2 h-2 rounded-full bg-[#e5c488]" />
            <span className="font-mono text-[11px] uppercase tracking-widest text-slate-100 font-semibold">
              {projectTitle}
            </span>
            {galleryItems.length > 0 && (
              <span className="font-mono text-[11px] text-[#e5c488] bg-[#0a2540]/85 px-2.5 py-0.5 rounded-full border border-white/15 backdrop-blur-xs">
                {selectedImageIndex + 1} / {galleryItems.length}
              </span>
            )}
          </div>

          <div className="pointer-events-auto flex items-center gap-2">
            {activeImage && (
              <a
                href={activeImage.src}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() =>
                  trackCaseStudyEvent('image_expand', projectId, {
                    project_title: projectTitle,
                    image_index: selectedImageIndex + 1,
                    image_title: activeImage.title,
                    image_src: activeImage.src,
                    source: 'desktop_drawer',
                  })
                }
                className="flex h-8 w-8 items-center justify-center rounded-full bg-[#0a2540]/85 text-slate-200 border border-white/15 hover:text-white hover:border-white/40 transition backdrop-blur-xs"
                title="Open full resolution"
                aria-label="Open full resolution image"
              >
                <FontAwesomeIcon icon={faExpand} className="text-xs" />
              </a>
            )}
            <button
              type="button"
              onClick={() => handleTrackedClose('top_dismiss')}
              className="h-8 px-3 rounded-full bg-[#0a2540]/85 text-[11px] font-mono text-slate-200 hover:text-white border border-white/15 hover:border-white/40 transition backdrop-blur-xs cursor-pointer"
            >
              DISMISS [ESC]
            </button>
          </div>
        </div>

        {/* Full-Height, Full-Width Unframed Imagery Canvas */}
        <div className="relative flex-1 min-h-0 w-full">
          {activeImage ? (
            <>
              <Image
                src={activeImage.src}
                alt={activeImage.alt}
                fill
                sizes="(max-width: 1024px) 100vw, (max-width: 1536px) 55vw, 1100px"
                className="object-contain"
                priority
              />
              {galleryItems.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={() =>
                      selectGalleryImage(
                        (selectedImageIndex - 1 + galleryItems.length) % galleryItems.length,
                        'prev_button'
                      )
                    }
                    aria-label="Previous artifact"
                    className="pointer-events-auto absolute left-3 top-1/2 -translate-y-1/2 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-[#061321]/70 text-slate-200 border border-white/15 hover:bg-[#0a2540] hover:text-white transition backdrop-blur-xs cursor-pointer"
                  >
                    <FontAwesomeIcon icon={faArrowLeft} className="text-xs" />
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      selectGalleryImage(
                        (selectedImageIndex + 1) % galleryItems.length,
                        'next_button'
                      )
                    }
                    aria-label="Next artifact"
                    className="pointer-events-auto absolute right-3 top-1/2 -translate-y-1/2 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-[#061321]/70 text-slate-200 border border-white/15 hover:bg-[#0a2540] hover:text-white transition backdrop-blur-xs cursor-pointer"
                  >
                    <FontAwesomeIcon icon={faArrowRight} className="text-xs" />
                  </button>
                </>
              )}
            </>
          ) : (
            <div className="pointer-events-auto flex h-full w-full items-center justify-center px-8 text-center">
              <div className="max-w-md">
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
        </div>

        {/* Bottom Bar: Title & Description right by the Gallery Strip */}
        {(activeImage || galleryItems.length > 1) && (
          <div className="pointer-events-auto relative z-20 shrink-0 border-t border-white/10 bg-[#061321]/82 px-5 py-3.5 backdrop-blur-md">
            <div className="flex flex-col gap-2.5">
              {activeImage && (
                <div className="min-w-0">
                  <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#e5c488] leading-snug">
                    {activeImage.title}
                  </h4>
                  {activeImage.caption && (
                    <p className="mt-1 text-xs text-slate-300 leading-relaxed">
                      {activeImage.caption}
                    </p>
                  )}
                </div>
              )}

              {galleryItems.length > 1 && (
                <div className="flex items-center gap-2 overflow-x-auto pb-0.5 scrollbar-none">
                  {galleryItems.map((item, idx) => {
                    const isSelected = idx === selectedImageIndex;
                    return (
                      <button
                        key={item.src + idx}
                        type="button"
                        onClick={() => selectGalleryImage(idx, 'thumbnail')}
                        className={`group relative shrink-0 w-18 h-12 rounded-md overflow-hidden border transition-all cursor-pointer ${
                          isSelected
                            ? 'border-[#e5c488] ring-1 ring-[#e5c488] opacity-100'
                            : 'border-white/20 opacity-60 hover:opacity-100 hover:border-white/45'
                        }`}
                        title={item.title}
                      >
                        <Image
                          src={item.src}
                          alt={item.alt}
                          fill
                          sizes="72px"
                          className="object-cover"
                        />
                        <span className="absolute bottom-0.5 right-0.5 font-mono text-[8px] bg-black/75 px-1 rounded text-white">
                          {String(idx + 1).padStart(2, '0')}
                        </span>
                      </button>
                    );
                  })}
                </div>
              )}
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
              onClick={() => handleTrackedClose('header_close')}
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
        <div
          ref={scrollContainerRef}
          onScroll={handleDrawerScroll}
          className="flex-1 overflow-y-auto px-6 py-8 md:px-12 md:py-12"
        >
          <div className="mx-auto max-w-3xl">
            {/* Mobile Visual Artifacts Strip (since full-bleed desktop gallery sits on lg+) */}
            {activeImage ? (
              <div className="lg:hidden -mx-6 sm:mx-0 mb-8 sm:rounded-xl bg-[#061321] overflow-hidden">
                <div className="relative aspect-[16/10] w-full">
                  <Image
                    src={activeImage.src}
                    alt={activeImage.alt}
                    fill
                    sizes="100vw"
                    className="object-contain"
                  />
                </div>
                <div className="border-t border-white/10 px-4 py-3 text-slate-100 space-y-2.5">
                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#e5c488]">
                        {activeImage.title}
                      </h4>
                      <a
                        href={activeImage.src}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() =>
                          trackCaseStudyEvent('image_expand', projectId, {
                            project_title: projectTitle,
                            image_index: selectedImageIndex + 1,
                            image_title: activeImage.title,
                            image_src: activeImage.src,
                            source: 'mobile_drawer',
                          })
                        }
                        className="shrink-0 text-xs font-mono text-slate-300 underline"
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
                    <div className="flex items-center gap-2 overflow-x-auto pt-2 border-t border-white/10">
                      {galleryItems.map((item, idx) => (
                        <button
                          key={item.src + idx}
                          type="button"
                          onClick={() => selectGalleryImage(idx, 'mobile_thumbnail')}
                          className={`relative h-11 w-16 shrink-0 overflow-hidden rounded border transition cursor-pointer ${
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
              </div>
            ) : null}
            {children}
          </div>
        </div>

        {/* Footer Navigation */}
        <footer className="border-t border-[var(--border)] bg-[var(--bg-page)]/95 px-6 py-4 backdrop-blur-md">
          <div className="mx-auto flex max-w-3xl items-center justify-between gap-4">
            <button
              onClick={() => {
                recordDwellClose('prev_project');
                onPrev();
              }}
              className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)] hover:text-[#0a2540] transition"
            >
              <FontAwesomeIcon icon={faArrowLeft} />
              <span>Previous Project</span>
            </button>
            <button
              onClick={() => {
                recordDwellClose('next_project');
                onNext();
              }}
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
