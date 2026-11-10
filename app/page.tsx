'use client';

import Image from 'next/image';
import NeptuneFinanceCaseStudy from './Components/NeptuneFinanceCaseStudy';
import AgOSCaseStudy from './Components/AgOSCaseStudy';
import { useCallback, useEffect, useRef, useState } from 'react';
import SocialLinks from './Components/SocialLinks';
import Backdrop from './Components/Backdrop';
import { ThemeAccentColor } from './config';
import { Project, ProjectsData } from './types/projects';
import projectsData from './data/projects.json';
import CaseStudyDrawer from './Components/CaseStudyDrawer';
import CaseStudyRenderer from './Components/CaseStudyRenderer';
import { useScrollProgress } from './hooks/useScrollProgress';
import FilmStripNav, { SYSTEM_FRAMES } from './Components/FilmStripNav';
import ProductionReel from './Components/ProductionReel';
import CareerTimeline from './Components/CareerTimeline';
import ConvergenceTriangle from './Components/ConvergenceTriangle';
import {
  trackEvent,
  trackRecruiterAction,
  trackCaseStudyEvent,
} from './lib/analytics';

export type Experience = Project;

const cvData = projectsData as ProjectsData;
const allProjects = cvData.projects;

const STUDY_IDS = [
  'neptune-finance',
  'agos',
  'open-source-contributions',
  'dyve',
  'cryptech',
  'satsuma',
  'craidle',
  'monad-heartbeat',
  'etherfi-demo',
] as const;

const EMPLOYMENT_IDS = [
  'cryptech-developments',
  'stakefish',
  'artrageous-advertising',
  'davis-automotive',
] as const;

const projectById = new Map(allProjects.map((project) => [project.id, project]));
const studies = STUDY_IDS.map((id) => projectById.get(id)).filter((project): project is Project => !!project);
const employment = EMPLOYMENT_IDS.map((id) => projectById.get(id)).filter(
  (project): project is Project => !!project
);
const caseStudies = [...studies, ...employment];
const selectedStudies = cvData.systemsBuilt.filter(
  (system) => system.projectId !== 'neptune-finance' && system.projectId !== 'agos'
);
const competencies = cvData.coreCompetencies;
const technicalSummary = cvData.technicalSummary;

const systemBackgrounds: Record<string, string> = {
  'neptune-finance': '/screenshots/neptune-balance-menu.png',
  'open-source-contributions': '/screenshots/cw3-multisig-screenshot.png',
  'dyve': '/screenshots/dyve-screenshot.png',
  'satsuma': '/screenshots/satsuma-screenshot.png',
  'craidle': '/screenshots/craidle-dashboard.png',
  'monad-heartbeat': '/screenshots/monad-heartbeat-screenshot.png',
  'etherfi-demo': '/screenshots/etherfi-demo-screenshot.png',
  'cryptech': '/screenshots/cryptech-homepage.png',
};

const EMAIL = 'logan.biesterfeldt@gmail.com';
const MAILTO = `mailto:${EMAIL}?subject=${encodeURIComponent('Interview Opportunity — Senior Design Engineer')}`;

// Core system sections in the navigation strip
const SYSTEM_SECTION_IDS = [
  'overview',
  'craft',
  'neptune',
  'agos',
  'systems',
  'experience',
  'stack',
  'contact',
];

function ScrollProgress() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const el = ref.current;
      if (!el) return;
      const scrollTop = window.scrollY;
      const height = document.documentElement.scrollHeight - window.innerHeight;
      const progress = height > 0 ? Math.min(scrollTop / height, 1) : 0;
      el.style.transform = `scaleX(${progress})`;
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-0.5 overflow-hidden">
      <div
        ref={ref}
        className="h-full origin-left bg-amber-400"
        style={{ transform: 'scaleX(0)' }}
      />
    </div>
  );
}

function SystemMarker({
  index,
  category,
  title,
}: {
  index: string;
  category: string;
  title: string;
}) {
  return (
    <div className="mb-6 flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--text-subtle)]">
      <span className="font-mono text-amber-500 font-bold">
        {`${index} // ${category}`}
      </span>
      <span className="h-px w-8 bg-[var(--border-strong)]" />
      <span className="text-[var(--text)]">{title}</span>
    </div>
  );
}

export default function Home() {
  const [activeProjectId, setActiveProjectId] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [prefersReduced, setPrefersReduced] = useState(false);

  // Scroll tracking hook
  const { progresses, activeSection } = useScrollProgress(SYSTEM_SECTION_IDS);
  const lastTrackedSection = useRef<string>('');
  const trackedDepths = useRef<Set<number>>(new Set());

  // Track section changes for GA4
  useEffect(() => {
    if (!activeSection) return;

    const handler = setTimeout(() => {
      if (activeSection !== lastTrackedSection.current) {
        lastTrackedSection.current = activeSection;
        const frame = SYSTEM_FRAMES.find((f) => f.id === activeSection);
        trackEvent('view_section', {
          section_id: activeSection,
          section_title: frame?.title || activeSection,
          section_number: frame?.number || '01',
          category: 'Navigation',
        });
      }
    }, 800);

    return () => clearTimeout(handler);
  }, [activeSection]);

  // Track scroll depth milestones (25%, 50%, 75%, 100%)
  useEffect(() => {
    const handleScrollDepth = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight <= 0) return;
      const pct = Math.round((window.scrollY / scrollHeight) * 100);

      [25, 50, 75, 100].forEach((milestone) => {
        if (pct >= milestone && !trackedDepths.current.has(milestone)) {
          trackedDepths.current.add(milestone);
          trackEvent('scroll_depth', {
            percent: milestone,
            milestone: `${milestone}%`,
            category: 'Engagement',
          });
        }
      });
    };

    window.addEventListener('scroll', handleScrollDepth, { passive: true });
    return () => window.removeEventListener('scroll', handleScrollDepth);
  }, []);

  // Sync reduced motion preferences
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReduced(mediaQuery.matches);
    const handleMediaChange = (e: MediaQueryListEvent) => {
      setPrefersReduced(e.matches);
    };
    mediaQuery.addEventListener('change', handleMediaChange);
    return () => mediaQuery.removeEventListener('change', handleMediaChange);
  }, []);

  // Sync project modal with URL
  useEffect(() => {
    const syncProjectFromUrl = () => {
      const params = new URLSearchParams(window.location.search);
      const project = params.get('project');
      if (project && caseStudies.some((item) => item.id === project)) {
        setActiveProjectId(project);
      } else {
        setActiveProjectId(null);
      }
    };

    syncProjectFromUrl();
    window.addEventListener('popstate', syncProjectFromUrl);
    return () => window.removeEventListener('popstate', syncProjectFromUrl);
  }, []);

  const openProject = useCallback((projectId: string) => {
    setActiveProjectId(projectId);
    const newUrl = `${window.location.pathname}?project=${projectId}`;
    window.history.pushState({ project: projectId }, '', newUrl);
    trackCaseStudyEvent('open', projectId, { method: 'url_sync' });
  }, []);

  const closeProject = useCallback(() => {
    if (activeProjectId) {
      trackCaseStudyEvent('close', activeProjectId);
    }
    setActiveProjectId(null);
    const newUrl = window.location.pathname;
    window.history.pushState(null, '', newUrl);
  }, [activeProjectId]);

  const handleNextProject = useCallback(() => {
    if (!activeProjectId) return;
    const currentIndex = caseStudies.findIndex((item) => item.id === activeProjectId);
    if (currentIndex >= 0) {
      const nextIndex = (currentIndex + 1) % caseStudies.length;
      const nextId = caseStudies[nextIndex].id;
      trackCaseStudyEvent('navigate', nextId, {
        direction: 'next',
        from_id: activeProjectId,
      });
      openProject(nextId);
    }
  }, [activeProjectId, openProject]);

  const handlePrevProject = useCallback(() => {
    if (!activeProjectId) return;
    const currentIndex = caseStudies.findIndex((item) => item.id === activeProjectId);
    if (currentIndex >= 0) {
      const prevIndex = (currentIndex - 1 + caseStudies.length) % caseStudies.length;
      const prevId = caseStudies[prevIndex].id;
      trackCaseStudyEvent('navigate', prevId, {
        direction: 'prev',
        from_id: activeProjectId,
      });
      openProject(prevId);
    }
  }, [activeProjectId, openProject]);

  const handleCopyEmail = useCallback(async () => {
    trackRecruiterAction('copy_email', { location: 'contact_section' });
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  }, []);

  const getSlideStyles = useCallback(
    (progress: number | undefined): React.CSSProperties => {
      if (prefersReduced || progress === undefined) return {};

      let opacity = 1;
      let scale = 1;
      let translateY = 0;

      if (progress < 0.5) {
        const enterProgress = Math.max(0, Math.min(1, (progress - 0.15) * 3));
        opacity = enterProgress;
        translateY = (1 - enterProgress) * 20;
      } else {
        const exitProgress = Math.max(0, Math.min(1, (progress - 0.55) * 3));
        opacity = 1 - exitProgress * 0.7;
        scale = 1 - exitProgress * 0.03;
        translateY = -exitProgress * 20;
      }

      return {
        opacity,
        transform: `scale(${scale}) translateY(${translateY}px)`,
        transition: 'transform 0.15s ease-out, opacity 0.15s ease-out',
        willChange: 'transform, opacity',
      };
    },
    [prefersReduced]
  );

  const activeProject = caseStudies.find((item) => item.id === activeProjectId);
  const shareUrl =
    typeof window !== 'undefined' && activeProject
      ? `${window.location.origin}${window.location.pathname}?project=${activeProject.id}`
      : '';

  return (
    <div
      className="min-h-screen selection:text-[var(--text)] pb-0 relative"
      style={
        {
          '--text': '#141414',
          '--theme-accent': ThemeAccentColor,
        } as React.CSSProperties
      }
    >
      <Backdrop />

      {/* Aliases for External and Legacy Links */}
      <div id="intro" className="absolute top-0 pointer-events-none" />
      <div id="prologue" className="absolute top-0 pointer-events-none" />
      <div id="about" className="absolute top-[100vh] pointer-events-none" />
      <div id="philosophy" className="absolute top-[100vh] pointer-events-none" />
      <div id="act-narrative" className="absolute top-[100vh] pointer-events-none" />
      <div id="neptune-case-study" className="absolute top-[200vh] pointer-events-none" />
      <div id="act-flagship" className="absolute top-[200vh] pointer-events-none" />
      <div id="act-agos" className="absolute top-[300vh] pointer-events-none" />
      <div id="studies" className="absolute top-[400vh] pointer-events-none" />
      <div id="act-reel" className="absolute top-[400vh] pointer-events-none" />
      <div id="act-credits" className="absolute top-[500vh] pointer-events-none" />
      <div id="act-arsenal" className="absolute top-[600vh] pointer-events-none" />
      <div id="act-epilogue" className="absolute top-[700vh] pointer-events-none" />

      {/* Top Full-Width Navigation Bar with Integrated Filmstrip */}
      <header className="sticky top-0 inset-x-0 z-50 border-b border-[var(--border)] bg-[var(--bg-page)]/90 backdrop-blur-md">
        <div className="w-full flex flex-col gap-2 px-4 sm:px-6 md:px-8 py-2.5">
          {/* Main Navigation Row */}
          <div className="flex items-center justify-between gap-4 w-full">
            {/* Left Brand Identity */}
            <a
              href="#overview"
              onClick={() => trackEvent('filmstrip_nav_click', { target: 'overview', source: 'header_brand' })}
              className="group flex items-center gap-3 font-[family-name:var(--font-display)] text-lg font-semibold tracking-tight text-[var(--text)] transition-colors hover:text-[color:var(--accent-color)] shrink-0"
            >
              <Image
                src="/logan-biesterfeldt-headshot.jpg"
                alt="Logan Biesterfeldt"
                width={34}
                height={34}
                priority
                className="h-8.5 w-8.5 rounded-full border border-[var(--border)] object-cover shadow-xs transition group-hover:border-amber-400"
              />
              <div className="flex flex-col">
                <span className="leading-tight">Logan Biesterfeldt</span>
                <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--text-subtle)] font-normal">
                  Senior Design Engineer
                </span>
              </div>
            </a>

            {/* Center Desktop Filmstrip Navigation Track (Full Width Span) */}
            <div className="hidden lg:flex items-center justify-center flex-1 px-4">
              <FilmStripNav
                activeSection={activeSection}
                onSelectFrame={(frameId) => {
                  document.getElementById(frameId)?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="bg-black/5 rounded-lg border border-[var(--border)] px-1.5"
              />
            </div>

            {/* Right Action Buttons */}
            <div className="flex items-center gap-2.5 shrink-0">
              <a
                href={MAILTO}
                onClick={() => trackRecruiterAction('email_click', { location: 'header_nav' })}
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[var(--text-muted)] hover:text-[color:var(--accent-color)] transition-colors"
              >
                Contact
              </a>

              {/* Resume PDF Download */}
              <a
                href="/Logan Biesterfeldt Resume 2026.pdf"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackRecruiterAction('resume_download', { location: 'header_nav' })}
                className="inline-flex items-center gap-1.5 rounded-full border border-[var(--border-strong)] bg-[var(--surface)] px-3.5 py-1.5 text-xs font-semibold text-[var(--text)] shadow-xs transition hover:border-amber-500 hover:text-[color:var(--accent-color)]"
              >
                <span>Résumé</span>
                <span className="text-[10px] text-[var(--text-muted)]">PDF</span>
              </a>
            </div>
          </div>

          {/* Sub Row: Integrated Filmstrip Frame Track on Mobile/Tablet */}
          <div className="flex lg:hidden w-full overflow-hidden border-t border-[var(--border)] pt-1.5">
            <FilmStripNav
              activeSection={activeSection}
              onSelectFrame={(frameId) => {
                document.getElementById(frameId)?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="w-full"
            />
          </div>
        </div>
        <ScrollProgress />
      </header>

      {/* Main Systems Flow */}
      <main className="relative z-10 mx-auto max-w-6xl px-5 md:px-8">
        {/* ========================================================================= */}
        {/* SYSTEM 01: OVERVIEW // SYSTEM OVERVIEW & CAPABILITIES */}
        {/* ========================================================================= */}
        <section
          id="overview"
          className="slide-section relative min-h-[92vh] py-16 flex flex-col justify-center"
        >
          <div
            className="w-full group/slide transition-all duration-700 ease-out"
            data-active={activeSection === 'overview' ? 'true' : 'false'}
            style={getSlideStyles(progresses['overview']?.progress)}
          >
            <div className="relative z-10">
              <SystemMarker
                index="01"
                category="OVERVIEW"
                title="Design Engineering Architecture &amp; Leadership"
              />

              <div className="flex flex-wrap items-center gap-4 sm:gap-6">
                <Image
                  src="/logan-biesterfeldt-headshot.jpg"
                  alt="Logan Biesterfeldt"
                  width={80}
                  height={80}
                  priority
                  className="h-16 w-16 sm:h-20 sm:w-20 rounded-full border-2 border-[var(--border-strong)] object-cover shadow-md"
                />
                <h1 className="font-[family-name:var(--font-display)] text-[clamp(2.5rem,5.5vw,4.5rem)] font-semibold leading-[1.04] tracking-tight text-[var(--text)]">
                  Logan Biesterfeldt
                </h1>
              </div>

              <p className="mt-4 max-w-2xl text-xl font-medium text-[var(--text)] md:text-2xl">
                Senior Design Engineer · Frontend Architecture Lead
              </p>

              <p className="mt-3 max-w-2xl text-base text-[var(--text-muted)] leading-relaxed">
                Bridging the gap between Figma token systems and bulletproof production code.
                Over a decade of experience designing and shipping zero-to-one Web3 protocols, high-frequency interfaces, and multi-million dollar DeFi systems.
              </p>

              {/* Recruiter Value Metrics Pill Bar */}
              <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-4xl">
                <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-3.5 shadow-xs">
                  <span className="font-mono text-xl sm:text-2xl font-bold text-[var(--text)]">$300M+</span>
                  <p className="text-[11px] font-medium text-[var(--text-muted)] mt-0.5">DeFi Volume Shipped</p>
                </div>
                <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-3.5 shadow-xs">
                  <span className="font-mono text-xl sm:text-2xl font-bold text-[var(--text)]">0 → 1</span>
                  <p className="text-[11px] font-medium text-[var(--text-muted)] mt-0.5">Full Product Ownership</p>
                </div>
                <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-3.5 shadow-xs">
                  <span className="font-mono text-xl sm:text-2xl font-bold text-[var(--text)]">8+</span>
                  <p className="text-[11px] font-medium text-[var(--text-muted)] mt-0.5">Production Web3 Apps</p>
                </div>
                <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-3.5 shadow-xs">
                  <span className="font-mono text-xl sm:text-2xl font-bold text-[var(--text)]">10+ Yrs</span>
                  <p className="text-[11px] font-medium text-[var(--text-muted)] mt-0.5">Design &amp; Engineering</p>
                </div>
              </div>

              {/* Status and Relocation Pill */}
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <span
                  className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface)] px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-[var(--text)] shadow-xs"
                >
                  <span className="status-dot" aria-hidden="true" />
                  Actively Interviewing
                </span>
                <span className="text-xs font-mono text-[var(--text-muted)]">
                  Calgary, AB · Remote Worldwide · Relocation Open
                </span>
              </div>

              {/* Primary Call to Actions */}
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => {
                    trackEvent('filmstrip_nav_click', { target: 'neptune', source: 'hero_primary_cta' });
                    document.getElementById('neptune')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--text)] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[color:var(--accent-color)] active:scale-[0.98] shadow-sm"
                >
                  <span>Explore Flagship Systems</span>
                  <span>↓</span>
                </button>

                <a
                  href="/Logan Biesterfeldt Resume 2026.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackRecruiterAction('resume_download', { location: 'hero_cta' })}
                  className="inline-flex items-center justify-center rounded-full border border-[var(--border)] bg-[var(--surface)] px-5 py-3 text-sm font-semibold text-[var(--text)] transition hover:border-[color:var(--accent-color)] active:scale-[0.98]"
                >
                  Download Résumé
                </a>

                <a
                  href={MAILTO}
                  onClick={() => trackRecruiterAction('email_click', { location: 'hero_email' })}
                  className="inline-flex items-center justify-center rounded-full border border-transparent px-4 py-3 text-sm font-semibold text-[var(--text-muted)] underline-offset-4 hover:underline"
                >
                  Email Logan
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SYSTEM 02: CRAFT // THE CONVERGENCE OF DESIGN, ENGINEERING & PRODUCT */}
        {/* ========================================================================= */}
        <section
          id="craft"
          className="slide-section border-t border-[var(--border)] min-h-[90vh] py-16 flex flex-col justify-center scroll-mt-20"
        >
          <div
            className="w-full group/slide transition-all duration-700 ease-out"
            data-active={activeSection === 'craft' ? 'true' : 'false'}
            style={getSlideStyles(progresses['craft']?.progress)}
          >
            <SystemMarker
              index="02"
              category="CRAFT"
              title="The Convergence of Design, Engineering & Product"
            />

            <h2 className="heading-accent font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight text-[var(--text)] md:text-5xl">
              Where Design, Engineering &amp; Product Converge
            </h2>

            <p className="mt-4 max-w-3xl text-lg text-[var(--text-muted)] leading-relaxed">
              Software fails most frequently at organizational seams: designers deliver static mockups detached from data constraints, engineers implement APIs without ergonomic empathy, and product leaders struggle to bridge technical feasibility with customer adoption. My craft operates at the exact intersection of all three disciplines—transforming complex, high-stakes domains into deterministic, elegant, and commercially resilient products.
            </p>

            {/* Triangular Visual Motif with Surrounding Discipline and Intersection Elements */}
            <div className="mt-8">
              <ConvergenceTriangle />
            </div>

            {/* Technical Narrative Excerpt */}
            <div className="mt-10 max-w-3xl border-l-2 border-amber-400 pl-6 space-y-4 text-base leading-relaxed text-[var(--text-muted)]">
              {technicalSummary.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SYSTEM 03: FLAGSHIP // NEPTUNE FINANCE */}
        {/* ========================================================================= */}
        <section
          id="neptune"
          className="slide-section border-t border-[var(--border)] min-h-screen py-16 flex flex-col justify-center"
        >
          <div
            className="w-full group/slide transition-all duration-700 ease-out"
            data-active={activeSection === 'neptune' ? 'true' : 'false'}
            style={getSlideStyles(progresses['neptune']?.progress)}
          >
            <NeptuneFinanceCaseStudy openProject={openProject} />
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SYSTEM 04: SPATIAL // AGOS OPERATING SYSTEM */}
        {/* ========================================================================= */}
        <section
          id="agos"
          className="slide-section border-t border-[var(--border)] min-h-screen py-16 flex flex-col justify-center"
        >
          <div
            className="w-full group/slide transition-all duration-700 ease-out"
            data-active={activeSection === 'agos' ? 'true' : 'false'}
            style={getSlideStyles(progresses['agos']?.progress)}
          >
            <AgOSCaseStudy openProject={openProject} />
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SYSTEM 05: SYSTEMS // PRODUCTION SYSTEMS REEL */}
        {/* ========================================================================= */}
        <section
          id="systems"
          className="slide-section border-t border-[var(--border)] min-h-screen py-16 flex flex-col justify-center"
        >
          <div
            className="w-full group/slide transition-all duration-700 ease-out"
            data-active={activeSection === 'systems' ? 'true' : 'false'}
            style={getSlideStyles(progresses['systems']?.progress)}
          >
            <SystemMarker
              index="05"
              category="SYSTEMS"
              title="Selected Production Systems"
            />

            <div className="flex flex-col gap-2 mb-6">
              <h2 className="heading-accent font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight text-[var(--text)] md:text-5xl">
                Selected Systems in Production
              </h2>
              <p className="text-sm font-medium text-[var(--text-muted)]">
                Interactive showcase of multi-asset lending, decentralized exchanges, AI tools, and smart contract multisig interfaces.
              </p>
            </div>

            <ProductionReel
              systems={selectedStudies}
              systemBackgrounds={systemBackgrounds}
              onOpenProject={openProject}
            />
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SYSTEM 06: EXPERIENCE // LEADERSHIP & PROFESSIONAL TRACK RECORD */}
        {/* ========================================================================= */}
        <section
          id="experience"
          className="slide-section border-t border-[var(--border)] min-h-screen py-16 flex flex-col justify-center"
        >
          <div
            className="w-full group/slide transition-all duration-700 ease-out"
            data-active={activeSection === 'experience' ? 'true' : 'false'}
            style={getSlideStyles(progresses['experience']?.progress)}
          >
            <SystemMarker
              index="06"
              category="EXPERIENCE"
              title="Leadership &amp; Professional Track Record"
            />

            <div className="flex flex-col gap-2 mb-10">
              <h2 className="heading-accent font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight text-[var(--text)] md:text-5xl">
                Professional Track Record
              </h2>
              <p className="text-sm font-medium text-[var(--text-muted)]">
                Chronological journey spanning full-stack frontend engineering, design systems, protocol infrastructure, and creative leadership.
              </p>
            </div>

            <CareerTimeline
              employmentRoles={employment}
              onOpenProject={openProject}
            />
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SYSTEM 07: STACK // CORE CAPABILITIES & ARCHITECTURAL STANDARDS */}
        {/* ========================================================================= */}
        <section
          id="stack"
          className="slide-section border-t border-[var(--border)] min-h-screen py-16 flex flex-col justify-center"
        >
          <div
            className="w-full group/slide transition-all duration-700 ease-out"
            data-active={activeSection === 'stack' ? 'true' : 'false'}
            style={getSlideStyles(progresses['stack']?.progress)}
          >
            <SystemMarker
              index="07"
              category="TOOLKIT"
              title="Technical Stack &amp; Architectural Standards"
            />

            <div className="flex flex-col gap-2 mb-8">
              <h2 className="heading-accent font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight text-[var(--text)] md:text-5xl">
                Engineering Capabilities &amp; Tooling
              </h2>
              <p className="text-sm font-medium text-[var(--text-muted)]">
                The battle-tested technologies and architectural standards I rely on to deliver fast, secure products.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {competencies.map((group) => (
                <div
                  key={group.category}
                  className="card-interactive h-full rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-[var(--shadow-card)] flex flex-col justify-between"
                >
                  <div>
                    <span className="font-mono text-[10px] uppercase text-amber-500 font-bold tracking-wider">
                      CAPABILITY
                    </span>
                    <h3 className="text-base font-bold text-[var(--text)] mt-1">
                      {group.category}
                    </h3>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {group.items.map((item) => (
                        <span
                          key={item}
                          className="text-xs font-mono px-2 py-0.5 rounded bg-black/5 text-[var(--text)] border border-[var(--border)]"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>

                  {group.description && (
                    <p className="mt-4 pt-3 border-t border-[var(--border)] text-xs leading-relaxed text-[var(--text-muted)]">
                      {group.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SYSTEM 08: CONTACT // DIRECT RECRUITER ENGAGEMENT & CONTACT */}
        {/* ========================================================================= */}
        <section
          id="contact"
          className="slide-section border-t border-[var(--border)] min-h-[90vh] py-16 flex flex-col justify-center"
        >
          <div
            className="w-full group/slide transition-all duration-700 ease-out"
            data-active={activeSection === 'contact' ? 'true' : 'false'}
            style={getSlideStyles(progresses['contact']?.progress)}
          >
            <SystemMarker
              index="08"
              category="ENGAGEMENT"
              title="Direct Engineering Inquiries &amp; Collaboration"
            />

            <div className="max-w-3xl">
              <h2 className="heading-accent font-[family-name:var(--font-display)] text-4xl font-semibold tracking-tight text-[var(--text)] md:text-6xl">
                Let&apos;s Build Something Exceptional
              </h2>
              <p className="mt-4 text-lg text-[var(--text-muted)] leading-relaxed">
                Looking for a senior design engineer who can bridge Figma to production, lead frontend architecture, and ship high-impact software from day one?
                I am actively considering new opportunities.
              </p>
            </div>

            {/* Recruiter Action Launchpad */}
            <div className="mt-10 rounded-2xl border border-amber-500/30 bg-gradient-to-br from-neutral-900 via-neutral-950 to-neutral-900 text-white p-7 sm:p-9 shadow-2xl">
              <div className="flex flex-wrap items-center justify-between gap-3 pb-6 border-b border-neutral-800">
                <div>
                  <span className="font-mono text-xs uppercase tracking-widest text-amber-400 font-bold">
                    RECRUITER ACTION HUB
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold mt-1 text-white">
                    Direct Candidate Engagement
                  </h3>
                </div>
                <div className="flex items-center gap-2">
                  <span className="inline-block w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-xs font-mono text-neutral-300">
                    Typical response: &lt; 4 hours
                  </span>
                </div>
              </div>

              {/* Direct Mailto Templates for Recruiters */}
              <div className="mt-6">
                <p className="text-xs font-mono uppercase text-neutral-400 mb-3">
                  1-Click Interview Scheduling / Inquiries:
                </p>
                <div className="flex flex-wrap gap-2.5">
                  <a
                    href={`mailto:${EMAIL}?subject=${encodeURIComponent('Interview Opportunity: Senior Design Engineer')}&body=${encodeURIComponent("Hi Logan,\n\nWe love your work on Neptune Finance and your hybrid design engineering background. We'd love to chat about a Senior Design Engineer / Frontend Lead role at [Company].\n\nBest,\n[Name]")}`}
                    onClick={() => trackRecruiterAction('email_click', { subject_preset: 'senior_role' })}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-neutral-950 text-xs font-bold transition shadow-sm"
                  >
                    <span>✉</span> Full-Time Senior / Lead Role
                  </a>

                  <a
                    href={`mailto:${EMAIL}?subject=${encodeURIComponent('Advisory / Contract Inquiry: Design Engineering')}`}
                    onClick={() => trackRecruiterAction('email_click', { subject_preset: 'contract_advisory' })}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-semibold border border-neutral-700 transition"
                  >
                    <span>⚡</span> Contract / 0→1 Advisory
                  </a>

                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-semibold border border-neutral-700 transition"
                  >
                    <span>📋</span> {copied ? 'Email Copied ✓' : 'Copy Direct Email'}
                  </button>

                  <a
                    href="/Logan Biesterfeldt Resume 2026.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackRecruiterAction('resume_download', { location: 'epilogue_hub' })}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-semibold border border-neutral-700 transition"
                  >
                    <span>📄</span> Download Résumé (PDF)
                  </a>
                </div>
              </div>

              {/* Direct Details Grid */}
              <div className="mt-8 pt-6 border-t border-neutral-800 grid gap-6 sm:grid-cols-3 text-xs">
                <div>
                  <span className="text-neutral-500 font-mono uppercase text-[10px]">Direct Email</span>
                  <p className="mt-1 font-semibold text-white">
                    <a
                      href={MAILTO}
                      onClick={() => trackRecruiterAction('email_click', { location: 'footer_direct' })}
                      className="hover:text-amber-400 transition"
                    >
                      {EMAIL}
                    </a>
                  </p>
                </div>
                <div>
                  <span className="text-neutral-500 font-mono uppercase text-[10px]">Timezone / Location</span>
                  <p className="mt-1 font-semibold text-white">
                    Calgary, AB (Mountain Time) · Remote / Relo
                  </p>
                </div>
                <div>
                  <span className="text-neutral-500 font-mono uppercase text-[10px]">Verification Links</span>
                  <div className="mt-1 flex gap-3 text-neutral-300">
                    <a
                      href="https://github.com/1biest"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => trackEvent('social_link_click', { platform: 'GitHub', location: 'footer' })}
                      className="hover:text-amber-400 underline-offset-2 hover:underline"
                    >
                      GitHub
                    </a>
                    <span>·</span>
                    <a
                      href="https://www.linkedin.com/in/biest/"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => trackEvent('social_link_click', { platform: 'LinkedIn', location: 'footer' })}
                      className="hover:text-amber-400 underline-offset-2 hover:underline"
                    >
                      LinkedIn
                    </a>
                    <span>·</span>
                    <a
                      href="https://t.me/Biesterfeldt"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => trackEvent('social_link_click', { platform: 'Telegram', location: 'footer' })}
                      className="hover:text-amber-400 underline-offset-2 hover:underline"
                    >
                      Telegram
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Links Row & Engineering Copyright */}
            <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[var(--border)] pt-8 text-xs text-[var(--text-subtle)]">
              <div>
                <SocialLinks />
              </div>
              <div className="text-right">
                <p>© {new Date().getFullYear()} Logan Biesterfeldt · Design Engineering</p>
                <p className="text-[11px] text-[var(--text-subtle)] mt-0.5">
                  Built with Next.js 16, TypeScript, Tailwind CSS &amp; Google Analytics 4
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Case Study Full Deep Dive Drawer */}
      {activeProject && (
        <CaseStudyDrawer
          isOpen={!!activeProjectId}
          onClose={closeProject}
          onNext={handleNextProject}
          onPrev={handlePrevProject}
          projectTitle={activeProject.title}
          projectUrl={shareUrl}
          project={activeProject}
        >
          <CaseStudyRenderer project={activeProject} />
        </CaseStudyDrawer>
      )}
    </div>
  );
}
