'use client';

import dynamic from 'next/dynamic';
import Image from 'next/image';
import NeptuneFinanceCaseStudy from './Components/NeptuneFinanceCaseStudy';
import AgOSCaseStudy from './Components/AgOSCaseStudy';
import { useCallback, useEffect, useRef, useState } from 'react';
import Backdrop from './Components/Backdrop';
import { ThemeAccentColor } from './config';
import { Project, ProjectsData } from './types/projects';
import projectsData from './data/projects.json';
import CaseStudyRenderer from './Components/CaseStudyRenderer';
import { useScrollProgress } from './hooks/useScrollProgress';
import FilmStripNav, { SYSTEM_FRAMES } from './Components/FilmStripNav';
import ProductionReel from './Components/ProductionReel';
import CareerTimeline from './Components/CareerTimeline';
import ConvergenceTriangle from './Components/ConvergenceTriangle';
import RoleLensSwitcher from './Components/RoleLensSwitcher';
import RecruiterFastTrack from './Components/RecruiterFastTrack';
import { ROLE_LENSES, type RoleLens } from './lib/roleLenses';
import {
  initRecruiterSessionAnalytics,
  setAnalyticsActiveSection,
  setAnalyticsRoleLens,
  trackEvent,
  trackRecruiterAction,
  trackCaseStudyEvent,
} from './lib/analytics';

const CaseStudyDrawer = dynamic(() => import('./Components/CaseStudyDrawer'), {
  ssr: false,
});

export type Experience = Project;

const cvData = projectsData as ProjectsData;
const allProjects = cvData.projects;

const STUDY_IDS = [
  'neptune-finance',
  'agos',
  'open-source-contributions',
  'dyve',
  'cryptech',
  'monad-heartbeat',
  'etherfi-demo',
] as const;

const EMPLOYMENT_IDS = [
  'cryptech-developments',
  'stakefish',
  'artrageous-advertising',
  'flat-land-farms',
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

const systemBackgrounds: Record<string, string> = {
  'neptune-finance': '/screenshots/neptune-balance-menu.webp',
  'agos': '/screenshots/AgOS-screenshot (2).png',
  'open-source-contributions': '/screenshots/cw3-multisig-screenshot.webp',
  'dyve': '/screenshots/dyve-screenshot.webp',
  'monad-heartbeat': '/screenshots/monad-heartbeat-screenshot.webp',
  'etherfi-demo': '/screenshots/etherfi-demo-screenshot.webp',
  'cryptech': '/screenshots/cryptech-airdrop-calculator.webp',
};

const EMAIL = 'logan.biesterfeldt@gmail.com';
const MAILTO = `mailto:${EMAIL}?subject=${encodeURIComponent(
  'Interview Opportunity — Frontend / Product Design / Forward Deployed AI'
)}`;

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
        className="h-full origin-left bg-[#0a2540]"
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
      <span className="font-mono text-[var(--accent-warm)] font-bold">
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
  const [activeLens, setActiveLens] = useState<RoleLens>('all');
  const [fastTrackOpen, setFastTrackOpen] = useState(false);
  const [reelFilter, setReelFilter] = useState<string>('all');

  // Scroll tracking hook (fires React state only when active section changes)
  const { activeSection } = useScrollProgress(SYSTEM_SECTION_IDS);
  const lastTrackedSection = useRef<string>('overview');
  const sectionEnteredAtRef = useRef<{ id: string; enteredAt: number }>({
    id: 'overview',
    enteredAt: Date.now(),
  });
  const trackedDepths = useRef<Set<number>>(new Set());
  const activeLensRef = useRef<RoleLens>(activeLens);

  useEffect(() => {
    activeLensRef.current = activeLens;
    setAnalyticsRoleLens(activeLens);
  }, [activeLens]);

  useEffect(() => {
    initRecruiterSessionAnalytics();
  }, []);

  const handleSelectLens = useCallback((lens: RoleLens) => {
    setAnalyticsRoleLens(lens);
    setActiveLens(lens);
    setReelFilter(ROLE_LENSES[lens].reelFilter);
  }, []);

  // Track section transitions & dwell time for GA4
  useEffect(() => {
    if (!activeSection) return;

    const handler = setTimeout(() => {
      if (activeSection !== lastTrackedSection.current) {
        const now = Date.now();
        const prev = sectionEnteredAtRef.current;
        const dwellSeconds = Math.round((now - prev.enteredAt) / 1000);
        if (prev.id && dwellSeconds >= 2) {
          trackEvent('section_dwell', {
            section_id: prev.id,
            dwell_seconds: dwellSeconds,
            next_section_id: activeSection,
            category: 'Engagement',
          });
        }

        lastTrackedSection.current = activeSection;
        sectionEnteredAtRef.current = { id: activeSection, enteredAt: now };
        setAnalyticsActiveSection(activeSection);

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

  // Track active visible engagement milestones (15s, 30s, 60s, 120s, 180s)
  useEffect(() => {
    const milestones = [15, 30, 60, 120, 180];
    const firedMilestones = new Set<number>();
    let activeSeconds = 0;

    const interval = setInterval(() => {
      if (document.visibilityState !== 'visible') return;
      activeSeconds += 1;

      milestones.forEach((milestone) => {
        if (activeSeconds >= milestone && !firedMilestones.has(milestone)) {
          firedMilestones.add(milestone);
          trackEvent('engagement_milestone', {
            active_seconds: milestone,
            milestone_label: `${milestone}s`,
            active_section: lastTrackedSection.current || 'overview',
            active_lens: activeLensRef.current,
            category: 'Engagement',
          });
        }
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Track text selection copies (e.g. email, metrics, stack summaries)
  useEffect(() => {
    const handleCopy = () => {
      const text = window.getSelection()?.toString().trim();
      if (!text) return;
      trackEvent('content_copy', {
        copied_length: text.length,
        copied_preview: text.slice(0, 80),
        contains_email: text.includes(EMAIL),
        category: 'Recruiter_Conversion',
      });
    };

    window.addEventListener('copy', handleCopy);
    return () => window.removeEventListener('copy', handleCopy);
  }, []);

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
    setActiveProjectId(null);
    const newUrl = window.location.pathname;
    window.history.pushState(null, '', newUrl);
  }, []);

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

  const activeProject = caseStudies.find((item) => item.id === activeProjectId);
  const shareUrl =
    typeof window !== 'undefined' && activeProject
      ? `${window.location.origin}${window.location.pathname}?project=${activeProject.id}`
      : '';

  return (
    <div
      className="min-h-screen pb-0 relative"
      style={
        {
          '--text': '#141414',
          '--theme-accent': ThemeAccentColor,
        } as React.CSSProperties
      }
    >
      <Backdrop />

      {/* Top Full-Width Navigation Bar with Integrated Filmstrip */}
      <header className="sticky top-0 inset-x-0 z-50 border-b border-[var(--border)] bg-[var(--bg-page)]/90 backdrop-blur-md">
        <div className="w-full flex flex-col gap-2 px-4 sm:px-6 md:px-8 py-2.5">
          {/* Main Navigation Row */}
          <div className="flex items-center justify-between gap-4 w-full">
            {/* Left Brand Identity (Typographic Monogram — headshot reserved for Hero) */}
            <a
              href="#overview"
              onClick={() => trackEvent('filmstrip_nav_click', { target: 'overview', source: 'header_brand' })}
              className="group flex items-center gap-3 font-[family-name:var(--font-display)] text-lg font-semibold tracking-tight text-[var(--text)] transition-colors hover:text-[#0a2540] shrink-0"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#0a2540] font-mono text-xs font-bold text-[#e5c488] shadow-xs transition group-hover:ring-2 group-hover:ring-[#0a2540]/25">
                LB
              </span>
              <div className="flex flex-col">
                <span className="leading-tight">Logan Biesterfeldt</span>
                <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--text-subtle)] font-normal">
                  Frontend · Design · AI
                </span>
              </div>
            </a>

            {/* Center Desktop Section Navigation Track */}
            <div className="hidden lg:flex items-center justify-center flex-1 px-2">
              <FilmStripNav
                activeSection={activeSection}
                onSelectFrame={(frameId) => {
                  document.getElementById(frameId)?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="rounded-full bg-[#0a2540]/[0.04] border border-[var(--border)]"
              />
            </div>

            {/* Right Action Controls (Matched h-9 pill geometry) */}
            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={() => {
                  const next = !fastTrackOpen;
                  setFastTrackOpen(next);
                  trackEvent('recruiter_hud_toggle', { opened: next });
                }}
                className={`hidden sm:inline-flex h-9 items-center gap-1.5 rounded-full border px-3.5 text-xs font-semibold transition cursor-pointer ${
                  fastTrackOpen
                    ? 'border-[#0a2540] bg-[#0a2540] text-white shadow-xs'
                    : 'border-[var(--border-strong)] bg-[var(--surface)] glass-surface text-[var(--text)] hover:border-[#0a2540]'
                }`}
              >
                <span
                  className={`font-mono text-[10px] font-bold ${
                    fastTrackOpen ? 'text-[#e5c488]' : 'text-[var(--accent-warm)]'
                  }`}
                >
                  60s
                </span>
                <span>Brief</span>
              </button>

              <a
                href={MAILTO}
                onClick={() => trackRecruiterAction('email_click', { location: 'header_nav' })}
                className="hidden md:inline-flex h-9 items-center gap-1.5 rounded-full border border-transparent px-3 text-xs font-semibold text-[var(--text-muted)] hover:border-[var(--border)] hover:bg-white/60 hover:text-[#0a2540] transition"
              >
                Email
              </a>

              {/* Resume PDF Download (Follows Active Role Lens) */}
              <a
                href={ROLE_LENSES[activeLens].resumeHref}
                download
                onClick={() =>
                  trackRecruiterAction('resume_download', {
                    location: 'header_nav',
                    lens: activeLens,
                    resume_file: ROLE_LENSES[activeLens].resumeHref,
                  })
                }
                className="inline-flex h-9 items-center gap-1.5 rounded-full bg-[#0a2540] px-4 text-xs font-semibold text-white shadow-xs transition hover:bg-[var(--accent-hover)]"
              >
                <span>Résumé</span>
                <span className="font-mono text-[10px] text-[#e5c488]">PDF</span>
              </a>
            </div>
          </div>

          {/* Sub Row: Integrated Navigation Track on Mobile/Tablet */}
          <div className="flex lg:hidden w-full overflow-hidden border-t border-[var(--border)] pt-2">
            <FilmStripNav
              activeSection={activeSection}
              onSelectFrame={(frameId) => {
                document.getElementById(frameId)?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="w-full rounded-full bg-[#0a2540]/[0.04] border border-[var(--border)]"
            />
          </div>
        </div>
        <ScrollProgress />
      </header>

      <RecruiterFastTrack
        isOpen={fastTrackOpen}
        onClose={() => setFastTrackOpen(false)}
        activeLens={activeLens}
        onSelectLens={handleSelectLens}
      />

      {/* Main Systems Flow */}
      <main className="relative z-10 mx-auto max-w-6xl px-5 md:px-8">
        {/* ========================================================================= */}
        {/* SYSTEM 01: OVERVIEW // SYSTEM OVERVIEW & CAPABILITIES */}
        {/* ========================================================================= */}
        <section
          id="overview"
          className="slide-section relative min-h-[86vh] py-12 sm:py-16 flex flex-col justify-center scroll-mt-24"
        >
          <span id="intro" className="sr-only" />
          <span id="prologue" className="sr-only" />
          <div
            className="w-full group/slide"
            data-active={activeSection === 'overview' ? 'true' : 'false'}
          >
            <div className="relative z-10">
              <SystemMarker
                index="01"
                category="OVERVIEW"
                title="Frontend Engineering · Product Design · Forward Deployed AI"
              />

              <div className="flex flex-wrap items-center gap-5 sm:gap-6">
                <Image
                  src="/logan-biesterfeldt-headshot.webp"
                  alt="Logan Biesterfeldt"
                  width={96}
                  height={96}
                  sizes="(max-width: 640px) 68px, 88px"
                  priority
                  className="h-17 w-17 sm:h-22 sm:w-22 rounded-full border-2 border-[#0a2540]/20 ring-4 ring-white/65 object-cover shadow-md"
                />
                <div>
                  <h1 className="font-[family-name:var(--font-display)] text-[clamp(2.4rem,5.4vw,4.4rem)] font-semibold leading-[1.04] tracking-tight text-[var(--text)]">
                    Logan Biesterfeldt
                  </h1>
                  <p className="mt-2 max-w-2xl text-lg sm:text-xl font-semibold text-[#0a2540] md:text-2xl">
                    Frontend Engineer · Product Design · Forward Deployed AI
                  </p>
                </div>
              </div>

              <p className="mt-5 max-w-3xl text-base text-[var(--text-muted)] leading-relaxed">
                Bridging customer discovery and Figma component systems directly into production TypeScript, React 19, Three.js, and AI-accelerated software—spanning DeFi lending systems ($159.66M+ loans originated / $27.76M peak TVL at Neptune Finance), full-stack agricultural operations (AgOS), and spec-driven agentic builds.
              </p>

              {/* Status + Primary Hero CTA Bar */}
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => {
                    trackEvent('filmstrip_nav_click', { target: 'neptune', source: 'hero_primary_cta' });
                    document.getElementById('neptune')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#0a2540] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[var(--accent-hover)] active:scale-[0.98] shadow-xs cursor-pointer"
                >
                  <span>Explore Flagship Systems</span>
                  <span>↓</span>
                </button>

                <a
                  href={ROLE_LENSES[activeLens].resumeHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() =>
                    trackRecruiterAction('resume_download', {
                      location: 'hero_cta',
                      lens: activeLens,
                      resume_file: ROLE_LENSES[activeLens].resumeHref,
                    })
                  }
                  className="inline-flex items-center justify-center rounded-full border border-[var(--border-strong)] bg-[var(--surface)] glass-surface px-5 py-3 text-sm font-semibold text-[var(--text)] transition hover:border-[#0a2540] hover:text-[#0a2540] active:scale-[0.98]"
                >
                  Open {ROLE_LENSES[activeLens].shortLabel} Résumé PDF ↗
                </a>

                <span className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface)] px-3.5 py-2 text-[11px] font-mono uppercase tracking-wider text-[var(--text)]">
                  <span className="status-dot" aria-hidden="true" />
                  Available · Calgary / Remote
                </span>
              </div>

              {/* Verified Impact Metrics */}
              <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 gap-3 max-w-3xl">
                <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] glass-surface p-4 shadow-[var(--shadow-sm)]">
                  <span className="font-mono text-xl sm:text-2xl font-bold text-[#0a2540]">$159.66M+</span>
                  <p className="text-[11px] font-medium text-[var(--text-muted)] mt-1">Loans Originated · $27.76M Peak TVL</p>
                </div>
                <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] glass-surface p-4 shadow-[var(--shadow-sm)]">
                  <span className="font-mono text-xl sm:text-2xl font-bold text-[#0a2540]">0 → 1</span>
                  <p className="text-[11px] font-medium text-[var(--text-muted)] mt-1">Figma-to-Code Ownership</p>
                </div>
                <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] glass-surface p-4 shadow-[var(--shadow-sm)] col-span-2 sm:col-span-1">
                  <span className="font-mono text-xl sm:text-2xl font-bold text-[#0a2540]">6+ Yrs</span>
                  <p className="text-[11px] font-medium text-[var(--text-muted)] mt-1">Frontend &amp; Product Systems</p>
                </div>
              </div>

              {/* Role Lens Switcher: Tailors proof highlights + 1-page PDF resume */}
              <RoleLensSwitcher
                activeLens={activeLens}
                onSelectLens={handleSelectLens}
                onOpenProject={openProject}
                onNavigateSection={(id) =>
                  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
                }
              />
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SYSTEM 02: CRAFT // THE CONVERGENCE OF DESIGN, ENGINEERING & PRODUCT */}
        {/* ========================================================================= */}
        <section
          id="craft"
          className="slide-section border-t border-[var(--border)] min-h-[85vh] py-16 flex flex-col justify-center scroll-mt-24"
        >
          <span id="about" className="sr-only" />
          <span id="philosophy" className="sr-only" />
          <span id="act-narrative" className="sr-only" />
          <div
            className="w-full group/slide"
            data-active={activeSection === 'craft' ? 'true' : 'false'}
          >
            <SystemMarker
              index="02"
              category="CRAFT"
              title="The Convergence of Design, Engineering &amp; Product"
            />

            <h2 className="heading-accent font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight text-[var(--text)] md:text-5xl">
              Where Design, Engineering &amp; Product Converge
            </h2>

            <p className="mt-4 max-w-3xl text-lg text-[var(--text-muted)] leading-relaxed">
              Software fails most frequently at organizational seams: designers deliver static mockups detached from data constraints, engineers implement APIs without ergonomic empathy, and product teams lose intent between discovery and shipping. My craft sits directly across all three—turning operational constraints into clear, reliable software.
            </p>

            {/* Triangular Visual Motif with Surrounding Discipline and Intersection Elements */}
            <div className="mt-14">
              <ConvergenceTriangle />
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SYSTEM 03: FLAGSHIP // NEPTUNE FINANCE */}
        {/* ========================================================================= */}
        <section
          id="neptune"
          className="slide-section border-t border-[var(--border)] min-h-[85vh] py-16 flex flex-col justify-center scroll-mt-24"
        >
          <span id="neptune-case-study" className="sr-only" />
          <span id="act-flagship" className="sr-only" />
          <div
            className="w-full group/slide"
            data-active={activeSection === 'neptune' ? 'true' : 'false'}
          >
            <NeptuneFinanceCaseStudy openProject={openProject} />
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SYSTEM 04: SPATIAL // AGOS OPERATING SYSTEM */}
        {/* ========================================================================= */}
        <section
          id="agos"
          className="slide-section border-t border-[var(--border)] min-h-[85vh] py-16 flex flex-col justify-center scroll-mt-24"
        >
          <span id="act-agos" className="sr-only" />
          <div
            className="w-full group/slide"
            data-active={activeSection === 'agos' ? 'true' : 'false'}
          >
            <AgOSCaseStudy openProject={openProject} />
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SYSTEM 05: PROJECTS // SELECTED PROJECTS REEL */}
        {/* ========================================================================= */}
        <section
          id="systems"
          className="slide-section border-t border-[var(--border)] min-h-[85vh] py-16 flex flex-col justify-center scroll-mt-24"
        >
          <span id="projects" className="sr-only" />
          <span id="studies" className="sr-only" />
          <span id="act-reel" className="sr-only" />
          <div
            className="w-full group/slide"
            data-active={activeSection === 'systems' ? 'true' : 'false'}
          >
            <SystemMarker
              index="05"
              category="PROJECTS"
              title="Selected Projects"
            />

            <div className="flex flex-col gap-2 mb-6">
              <h2 className="heading-accent font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight text-[var(--text)] md:text-5xl">
                Selected Projects
              </h2>
              <p className="text-sm font-medium text-[var(--text-muted)]">
                Interactive archive of frontend applications, design systems, and protocol infrastructure.
              </p>
            </div>

            <ProductionReel
              systems={selectedStudies}
              systemBackgrounds={systemBackgrounds}
              onOpenProject={openProject}
              activeFilter={reelFilter}
              onFilterChange={setReelFilter}
            />
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SYSTEM 06: EXPERIENCE // LEADERSHIP & PROFESSIONAL TRACK RECORD */}
        {/* ========================================================================= */}
        <section
          id="experience"
          className="slide-section border-t border-[var(--border)] min-h-[85vh] py-16 flex flex-col justify-center scroll-mt-24"
        >
          <span id="act-credits" className="sr-only" />
          <div
            className="w-full group/slide"
            data-active={activeSection === 'experience' ? 'true' : 'false'}
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
                Chronological path spanning DeFi frontend leadership, precision ag domain immersion, protocol media, and web systems delivery.
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
          className="slide-section border-t border-[var(--border)] min-h-[85vh] py-16 flex flex-col justify-center scroll-mt-24"
        >
          <span id="act-arsenal" className="sr-only" />
          <div
            className="w-full group/slide"
            data-active={activeSection === 'stack' ? 'true' : 'false'}
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
                The technologies and engineering disciplines applied across frontend architecture, product design, and AI systems.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {competencies.map((group) => (
                <div
                  key={group.category}
                  className="card-interactive h-full rounded-2xl border border-[var(--border)] bg-[var(--surface)] glass-surface p-6 shadow-[var(--shadow-card)] flex flex-col justify-between"
                >
                  <div>
                    <span className="font-mono text-[10px] uppercase text-[var(--accent-warm)] font-bold tracking-wider">
                      CAPABILITY
                    </span>
                    <h3 className="text-base font-bold text-[var(--text)] mt-1">
                      {group.category}
                    </h3>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {group.items.map((item) => (
                        <span
                          key={item}
                          className="text-xs font-mono px-2 py-0.5 rounded-md bg-[#0a2540]/[0.04] text-[var(--text)] border border-[var(--border)]"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>

                  {group.description ? (
                    <p className="mt-4 pt-3 border-t border-[var(--border)] text-xs leading-relaxed text-[var(--text-muted)]">
                      {group.description}
                    </p>
                  ) : null}
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
          className="slide-section border-t border-[var(--border)] min-h-[85vh] py-16 flex flex-col justify-center scroll-mt-24"
        >
          <span id="act-epilogue" className="sr-only" />
          <div
            className="w-full group/slide"
            data-active={activeSection === 'contact' ? 'true' : 'false'}
          >
            <SystemMarker
              index="08"
              category="ENGAGEMENT"
              title="Direct Hiring &amp; Role Inquiries"
            />

            <div className="max-w-3xl">
              <h2 className="heading-accent font-[family-name:var(--font-display)] text-4xl font-semibold tracking-tight text-[var(--text)] md:text-6xl">
                Let&apos;s Build Something Exceptional
              </h2>
              <p className="mt-4 text-lg text-[var(--text-muted)] leading-relaxed">
                Hiring for a <strong className="text-[var(--text)]">Frontend Engineer</strong>, <strong className="text-[var(--text)]">Product Design Engineer</strong>, or <strong className="text-[var(--text)]">Forward Deployed AI Engineer</strong>? I take product problems from discovery and Figma systems directly into verified production code.
              </p>
            </div>

            {/* Recruiter Action Launchpad (Unified Hero Deep Navy Signature Surface) */}
            <div className="mt-10 rounded-2xl border border-[#0a2540] bg-gradient-to-br from-[#0a2540] via-[#0d2d4d] to-[#081b30] text-white p-7 sm:p-9 shadow-[var(--shadow-lg)]">
              <div className="flex flex-wrap items-center justify-between gap-3 pb-6 border-b border-white/15">
                <div>
                  <span className="font-mono text-xs uppercase tracking-widest text-[#e5c488] font-bold">
                    HIRING &amp; INTERVIEW LAUNCHPAD
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold mt-1 text-white">
                    Direct Candidate Engagement
                  </h3>
                </div>
                <div className="flex items-center gap-2">
                  <span className="status-dot" aria-hidden="true" />
                  <span className="text-xs font-mono text-slate-200">
                    Same-day response · Open to Remote / Relo
                  </span>
                </div>
              </div>

              {/* Direct Mailto Templates for Hiring Teams */}
              <div className="mt-6">
                <p className="text-xs font-mono uppercase text-slate-300 mb-3">
                  1-Click Role Inquiries &amp; Tailored 1-Page Résumés:
                </p>
                <div className="flex flex-wrap gap-2.5">
                  <a
                    href={`mailto:${EMAIL}?subject=${encodeURIComponent('Interview Opportunity: Frontend / Product Design / FDE Role')}&body=${encodeURIComponent("Hi Logan,\n\nWe reviewed your portfolio on biest.ca and would like to discuss a role on our team.\n\nRole Track: [Frontend Engineer / Product Design / Forward Deployed AI]\nCompany:\n\nBest,\n[Name]")}`}
                    onClick={() => trackRecruiterAction('email_click', { subject_preset: 'role_inquiry' })}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#fafaf8] hover:bg-white text-[#0a2540] text-xs font-bold transition shadow-xs"
                  >
                    <span>✉</span> Schedule Interview
                  </a>

                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/10 hover:bg-white/15 text-white text-xs font-semibold border border-white/20 transition cursor-pointer"
                  >
                    <span>📋</span> {copied ? 'Email Copied ✓' : 'Copy Direct Email'}
                  </button>

                  <a
                    href="/Logan Biesterfeldt Resume 2026.pdf"
                    download
                    onClick={() =>
                      trackRecruiterAction('resume_download', {
                        location: 'epilogue_unified',
                        lens: 'all',
                        resume_file: '/Logan Biesterfeldt Resume 2026.pdf',
                      })
                    }
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/10 hover:bg-white/15 text-white text-xs font-semibold border border-white/20 transition"
                  >
                    <span>📄</span> Unified 1-Page CV (PDF)
                  </a>
                </div>

                {/* Role-Specific 1-Page ATS PDFs */}
                <div className="mt-5 flex flex-wrap items-center gap-2 text-xs">
                  <span className="font-mono text-[11px] text-[#e5c488] uppercase tracking-wider mr-1">
                    Track-Specific PDFs:
                  </span>
                  <a
                    href="/Logan Biesterfeldt - Frontend Engineer Resume 2026.pdf"
                    download
                    onClick={() =>
                      trackRecruiterAction('resume_download', {
                        location: 'epilogue_frontend',
                        lens: 'frontend',
                        resume_file: '/Logan Biesterfeldt - Frontend Engineer Resume 2026.pdf',
                      })
                    }
                    className="rounded-full border border-white/20 bg-white/[0.06] px-3.5 py-1.5 text-slate-100 hover:border-[#e5c488] hover:text-[#e5c488] transition"
                  >
                    Frontend Engineer ↓
                  </a>
                  <a
                    href="/Logan Biesterfeldt - Product Design Resume 2026.pdf"
                    download
                    onClick={() =>
                      trackRecruiterAction('resume_download', {
                        location: 'epilogue_design',
                        lens: 'design',
                        resume_file: '/Logan Biesterfeldt - Product Design Resume 2026.pdf',
                      })
                    }
                    className="rounded-full border border-white/20 bg-white/[0.06] px-3.5 py-1.5 text-slate-100 hover:border-[#e5c488] hover:text-[#e5c488] transition"
                  >
                    Product Design ↓
                  </a>
                  <a
                    href="/Logan Biesterfeldt - Forward Deployed AI Engineer Resume 2026.pdf"
                    download
                    onClick={() =>
                      trackRecruiterAction('resume_download', {
                        location: 'epilogue_ai_fde',
                        lens: 'ai-fde',
                        resume_file: '/Logan Biesterfeldt - Forward Deployed AI Engineer Resume 2026.pdf',
                      })
                    }
                    className="rounded-full border border-white/20 bg-white/[0.06] px-3.5 py-1.5 text-slate-100 hover:border-[#e5c488] hover:text-[#e5c488] transition"
                  >
                    Forward Deployed AI ↓
                  </a>
                </div>
              </div>

              {/* Direct Details Grid */}
              <div className="mt-8 pt-6 border-t border-white/15 grid gap-6 sm:grid-cols-3 text-xs">
                <div>
                  <span className="text-slate-400 font-mono uppercase text-[10px]">Direct Email</span>
                  <p className="mt-1 font-semibold text-white">
                    <a
                      href={MAILTO}
                      onClick={() => trackRecruiterAction('email_click', { location: 'footer_direct' })}
                      className="text-white hover:text-[#e5c488] transition"
                    >
                      {EMAIL}
                    </a>
                  </p>
                </div>
                <div>
                  <span className="text-slate-400 font-mono uppercase text-[10px]">Timezone / Location</span>
                  <p className="mt-1 font-semibold text-white">
                    Calgary, AB (Mountain Time) · Remote / Relo
                  </p>
                </div>
                <div>
                  <span className="text-slate-400 font-mono uppercase text-[10px]">Verification Links</span>
                  <div className="mt-1 flex gap-3 text-slate-200">
                    <a
                      href="https://github.com/1biest"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => trackEvent('social_link_click', { platform: 'GitHub', location: 'footer' })}
                      className="text-slate-100 hover:text-[#e5c488] underline-offset-2 hover:underline transition"
                    >
                      GitHub
                    </a>
                    <span>·</span>
                    <a
                      href="https://www.linkedin.com/in/biest/"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => trackEvent('social_link_click', { platform: 'LinkedIn', location: 'footer' })}
                      className="text-slate-100 hover:text-[#e5c488] underline-offset-2 hover:underline transition"
                    >
                      LinkedIn
                    </a>
                    <span>·</span>
                    <a
                      href="https://t.me/Biesterfeldt"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => trackEvent('social_link_click', { platform: 'Telegram', location: 'footer' })}
                      className="text-slate-100 hover:text-[#e5c488] underline-offset-2 hover:underline transition"
                    >
                      Telegram
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Engineering Copyright */}
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-2 border-t border-[var(--border)] pt-6 text-xs text-[var(--text-subtle)]">
              <p>© {new Date().getFullYear()} Logan Biesterfeldt · Design Engineering</p>
              <p className="text-[11px] text-[var(--text-subtle)]">
                Built with Next.js 16, TypeScript, Tailwind CSS &amp; Google Analytics 4
              </p>
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
