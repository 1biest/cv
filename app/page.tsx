'use client';

import Image from 'next/image';
import NeptuneFinanceCaseStudy from './Components/NeptuneFinanceCaseStudy';
import { useCallback, useEffect, useRef, useState } from 'react';
import SocialLinks from './Components/SocialLinks';
import Reveal from './Components/Reveal';
import Backdrop from './Components/Backdrop';
import { ThemeAccentColor } from './config';
import { Project, ProjectsData } from './types/projects';
import projectsData from './data/projects.json';
import CaseStudyDrawer from './Components/CaseStudyDrawer';
import CaseStudyRenderer from './Components/CaseStudyRenderer';
import { useScrollProgress } from './hooks/useScrollProgress';
import { trackEvent } from './lib/analytics';

export type Experience = Project;

const cvData = projectsData as ProjectsData;
const experience: Experience[] = cvData.projects;
const systemsBuilt = cvData.systemsBuilt;
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
const MAILTO = `mailto:${EMAIL}?subject=${encodeURIComponent('Opportunity for Logan — Design Engineer')}`;

const NAV = [
  { href: '#intro', label: 'Intro' },
  { href: '#about', label: 'About' },
  { href: '#neptune-case-study', label: 'Neptune' },
  { href: '#work', label: 'Work' },
  { href: '#experience', label: 'Experience' },
  { href: '#stack', label: 'Stack' },
  { href: '#contact', label: 'Contact' },
] as const;

function groupEyebrow(group: Project['group']): string {
  switch (group) {
    case 'professional-experience':
      return 'Professional Experience';
    case 'protocol-ecosystem':
      return 'Protocol / Ecosystem';
    default:
      return 'Projects';
  }
}

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
        className="h-full origin-left bg-[color:var(--accent-color)]"
        style={{ transform: 'scaleX(0)' }}
      />
    </div>
  );
}

function SectionEyebrow({ index, children }: { index: string; children: React.ReactNode }) {
  return (
    <p className="mb-4 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--text-subtle)]">
      <span className="text-[color:var(--accent-color)]">{index}</span>
      <span className="h-px w-8 bg-[var(--border-strong)]" />
      {children}
    </p>
  );
}

export default function Home() {
  const [activeProjectId, setActiveProjectId] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [prefersReduced, setPrefersReduced] = useState(false);

  // Set up slide elements and IDs
  const experienceSlideIds = experience.map((exp) => `experience-${exp.id}`);
  const allSlideIds = [
    'intro',
    'about',
    'neptune-case-study',
    'work',
    'experience-header',
    ...experienceSlideIds,
    'stack',
    'contact',
  ];

  // Scroll tracking hook
  const { progresses, activeSection } = useScrollProgress(allSlideIds);

  const lastTrackedSection = useRef<string>('');

  useEffect(() => {
    if (!activeSection) return;

    const handler = setTimeout(() => {
      if (activeSection !== lastTrackedSection.current) {
        lastTrackedSection.current = activeSection;
        trackEvent('view_section', { section_id: activeSection });
      }
    }, 1000);

    return () => clearTimeout(handler);
  }, [activeSection]);

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

  useEffect(() => {
    const syncProjectFromUrl = () => {
      const params = new URLSearchParams(window.location.search);
      const project = params.get('project');
      if (project && experience.some((exp) => exp.id === project)) {
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
    trackEvent('open_case_study', { project_id: projectId });
  }, []);

  const closeProject = useCallback(() => {
    if (activeProjectId) {
      trackEvent('close_case_study', { project_id: activeProjectId });
    }
    setActiveProjectId(null);
    const newUrl = window.location.pathname;
    window.history.pushState(null, '', newUrl);
  }, [activeProjectId]);

  const handleNextProject = useCallback(() => {
    if (!activeProjectId) return;
    const currentIndex = experience.findIndex((exp) => exp.id === activeProjectId);
    if (currentIndex >= 0) {
      const nextIndex = (currentIndex + 1) % experience.length;
      const nextId = experience[nextIndex].id;
      trackEvent('navigate_case_study', { direction: 'next', from_project: activeProjectId, to_project: nextId });
      openProject(nextId);
    }
  }, [activeProjectId, openProject]);

  const handlePrevProject = useCallback(() => {
    if (!activeProjectId) return;
    const currentIndex = experience.findIndex((exp) => exp.id === activeProjectId);
    if (currentIndex >= 0) {
      const prevIndex = (currentIndex - 1 + experience.length) % experience.length;
      const prevId = experience[prevIndex].id;
      trackEvent('navigate_case_study', { direction: 'prev', from_project: activeProjectId, to_project: prevId });
      openProject(prevId);
    }
  }, [activeProjectId, openProject]);

  const handleCopyEmail = useCallback(async () => {
    trackEvent('copy_email', { location: 'contact' });
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard unavailable; mailto link remains the fallback.
    }
  }, []);

  // Helper to calculate progressive transforms for slides
  const getSlideStyles = useCallback(
    (progress: number | undefined, active: boolean): React.CSSProperties => {
      if (prefersReduced || progress === undefined) return {};

      let opacity = 1;
      let scale = 1;
      let translateY = 0;

      if (progress < 0.5) {
        // Entering from bottom (progress goes 0.0 -> 0.5)
        const enterProgress = Math.max(0, Math.min(1, (progress - 0.2) * 3.33));
        opacity = enterProgress;
        translateY = (1 - enterProgress) * 24;
      } else {
        // Exiting at top (progress goes 0.5 -> 1.0)
        const exitProgress = Math.max(0, Math.min(1, (progress - 0.5) * 3.33));
        opacity = 1 - exitProgress;
        scale = 1 - exitProgress * 0.05; // slightly scale down
        translateY = -exitProgress * 30; // slide up out of view
      }

      return {
        opacity,
        transform: `scale(${scale}) translateY(${translateY}px)`,
        transition: 'transform 0.1s ease-out, opacity 0.1s ease-out',
        willChange: 'transform, opacity',
      };
    },
    [prefersReduced]
  );

  const activeProject = experience.find((exp) => exp.id === activeProjectId);
  const shareUrl =
    typeof window !== 'undefined' && activeProject
      ? `${window.location.origin}${window.location.pathname}?project=${activeProject.id}`
      : '';

  return (
    <div
      className="min-h-screen selection:text-[var(--text)] pb-0"
      style={
        {
          '--text': '#141414',
          '--theme-accent': ThemeAccentColor,
        } as React.CSSProperties
      }
    >
      <Backdrop />

      {/* Slide Deck Pagination Dots */}
      <div className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden xl:flex flex-col gap-3 bg-[var(--surface)]/80 backdrop-blur-md p-3.5 rounded-full border border-[var(--border)] shadow-sm">
        {allSlideIds.map((id) => {
          let label = '';
          if (id === 'intro') label = 'Intro';
          else if (id === 'about') label = 'About';
          else if (id === 'neptune-case-study') label = 'Neptune';
          else if (id === 'work') label = 'Work';
          else if (id === 'experience-header') label = 'Experience';
          else if (id.startsWith('experience-')) {
            const expId = id.replace('experience-', '');
            const expItem = experience.find((e) => e.id === expId);
            label = expItem ? `Role: ${expItem.title}` : 'Experience';
          } else if (id === 'stack') label = 'Stack';
          else if (id === 'contact') label = 'Contact';

          const isActive = activeSection === id;

          return (
            <button
              key={id}
              onClick={() => {
                trackEvent('click_pagination_dot', { label, target_id: id });
                document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
              }}
              className={`group relative w-3 h-3 rounded-full transition-all duration-300 ${isActive
                ? 'bg-[color:var(--accent-color)] scale-125'
                : 'bg-[var(--text-subtle)]/40 hover:bg-[color:var(--accent-color)]/60'
                }`}
              aria-label={`Scroll to ${label}`}
            >
              <span className="absolute right-7 top-1/2 -translate-y-1/2 bg-[var(--text)] text-white text-[10px] font-semibold tracking-wide uppercase px-2 py-1 rounded shadow-md opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap border border-neutral-700">
                {label}
              </span>
            </button>
          );
        })}
      </div>

      <header className="fixed top-0 inset-x-0 z-50 border-b border-[var(--border)] bg-[var(--bg-page)]/85 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-4 md:px-8">
          <a
            href="#intro"
            className="group flex items-center gap-3 font-[family-name:var(--font-display)] text-lg font-semibold tracking-tight text-[var(--text)] transition-colors hover:text-[color:var(--accent-color)]"
          >
            <Image
              src="/logan-biesterfeldt-headshot.png"
              alt="Logan Biesterfeldt"
              width={36}
              height={36}
              priority
              className="h-9 w-9 rounded-full border border-[var(--border)] object-cover shadow-sm transition group-hover:border-[color:var(--accent-color)]"
            />
            Logan Biesterfeldt
          </a>
          <nav className="hidden flex-wrap items-center justify-end gap-x-6 gap-y-2 text-sm font-medium md:flex">
            {NAV.map((item) => {
              const href = item.href === '#experience' ? '#experience-header' : item.href;
              const isActive =
                item.href === '#experience'
                  ? activeSection === 'experience-header' || activeSection.startsWith('experience-')
                  : activeSection === item.href.slice(1);
              return (
                <a
                  key={item.href}
                  href={href}
                  onClick={() => trackEvent('click_nav_link', { label: item.label, href_or_target: href })}
                  className={`link-underline transition-colors ${isActive
                    ? 'text-[color:var(--accent-color)] font-semibold'
                    : 'text-[var(--text-muted)] hover:text-[color:var(--accent-color)]'
                    }`}
                >
                  {item.label}
                </a>
              );
            })}
            <a
              href="/Logan Biesterfeldt Resume 2026.pdf"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent('click_resume', { location: 'header' })}
              className="inline-flex items-center gap-1.5 rounded-full border border-[var(--border-strong)] bg-[var(--surface)] px-3.5 py-1.5 text-xs font-semibold text-[var(--text)] shadow-sm transition hover:border-[color:var(--accent-color)] hover:text-[color:var(--accent-color)]"
            >
              Résumé
            </a>
          </nav>
          <nav className="flex max-w-[55vw] gap-3 overflow-x-auto pb-0.5 text-xs font-medium md:hidden">
            {NAV.map((item) => {
              const href = item.href === '#experience' ? '#experience-header' : item.href;
              const isActive =
                item.href === '#experience'
                  ? activeSection === 'experience-header' || activeSection.startsWith('experience-')
                  : activeSection === item.href.slice(1);
              return (
                <a
                  key={item.href}
                  href={href}
                  onClick={() => trackEvent('click_nav_link', { label: item.label, href_or_target: href })}
                  className={`whitespace-nowrap shrink-0 transition-colors ${isActive
                    ? 'text-[color:var(--accent-color)] font-semibold'
                    : 'text-[var(--text-muted)] hover:text-[color:var(--accent-color)]'
                    }`}
                >
                  {item.label}
                </a>
              );
            })}
          </nav>
        </div>
        <ScrollProgress />
      </header>

      <main className="relative z-10 mx-auto max-w-6xl px-5 md:px-8">
        {/* Slide 1: Intro */}
        <section id="intro" className="slide-section relative min-h-screen pt-[4.5rem] flex flex-col justify-center">
          <div
            className="w-full py-12 md:py-20 group/slide transition-all duration-700 ease-out"
            data-active={activeSection === 'intro' ? 'true' : 'false'}
            style={getSlideStyles(progresses['intro']?.progress, progresses['intro']?.active)}
          >
            <div className="relative z-10">
              <p className="opacity-0 translate-y-6 transition-all duration-700 ease-out group-data-[active=true]/slide:opacity-100 group-data-[active=true]/slide:translate-y-0 motion-reduce:opacity-100 motion-reduce:translate-y-0 delay-0 mb-4 text-sm font-medium uppercase tracking-[0.2em] text-[var(--text-muted)]">
                Portfolio
              </p>
              <h1 className="opacity-0 translate-y-6 transition-all duration-700 ease-out group-data-[active=true]/slide:opacity-100 group-data-[active=true]/slide:translate-y-0 motion-reduce:opacity-100 motion-reduce:translate-y-0 delay-[100ms] font-[family-name:var(--font-display)] text-[clamp(2.5rem,6vw,4.5rem)] font-semibold leading-[1.05] tracking-tight text-[var(--text)]">
                Logan Biesterfeldt
              </h1>
              <p className="opacity-0 translate-y-6 transition-all duration-700 ease-out group-data-[active=true]/slide:opacity-100 group-data-[active=true]/slide:translate-y-0 motion-reduce:opacity-100 motion-reduce:translate-y-0 delay-[200ms] mt-5 max-w-2xl text-xl font-medium text-[var(--text)] md:text-2xl">
                Design Engineer · Frontend Lead
              </p>
              <p className="opacity-0 translate-y-6 transition-all duration-700 ease-out group-data-[active=true]/slide:opacity-100 group-data-[active=true]/slide:translate-y-0 motion-reduce:opacity-100 motion-reduce:translate-y-0 delay-[300ms] mt-3 text-sm text-[var(--text-muted)]">
                Figma to production: design systems, React, TypeScript, blockchain
              </p>
              <div className="opacity-0 translate-y-6 transition-all duration-700 ease-out group-data-[active=true]/slide:opacity-100 group-data-[active=true]/slide:translate-y-0 motion-reduce:opacity-100 motion-reduce:translate-y-0 delay-[400ms] mt-8 flex flex-wrap items-center gap-3">
                <span
                  className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface)] px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-[var(--text)]"
                  style={{ boxShadow: 'var(--shadow-card)' }}
                >
                  <span className="status-dot" aria-hidden="true" />
                  Open to opportunities
                </span>
                <span className="text-xs font-medium text-[var(--text-muted)]">
                  Open to relocation · Remote-friendly
                </span>
              </div>
              <div className="opacity-0 translate-y-6 transition-all duration-700 ease-out group-data-[active=true]/slide:opacity-100 group-data-[active=true]/slide:translate-y-0 motion-reduce:opacity-100 motion-reduce:translate-y-0 delay-[500ms] mt-10 flex flex-wrap gap-3">
                <a
                  href="#work"
                  onClick={() => trackEvent('click_nav_link', { label: 'View work', href_or_target: '#work' })}
                  className="inline-flex items-center justify-center rounded-full bg-[var(--text)] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[color:var(--accent-color)] hover:text-white active:scale-[0.98]"
                >
                  View work
                </a>
                <a
                  href="/Logan Biesterfeldt Resume 2026.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackEvent('click_resume', { location: 'intro' })}
                  className="inline-flex items-center justify-center rounded-full border border-[var(--border)] bg-[var(--surface)] px-6 py-3 text-sm font-semibold text-[var(--text)] transition hover:border-[color:var(--accent-color)] active:scale-[0.98]"
                >
                  Download résumé
                </a>
                <a
                  href={MAILTO}
                  onClick={() => trackEvent('click_email', { location: 'intro' })}
                  className="inline-flex items-center justify-center rounded-full border border-transparent px-6 py-3 text-sm font-semibold text-[var(--text-muted)] underline-offset-4 hover:underline"
                >
                  Email me
                </a>
                <a
                  href="https://github.com/1biest"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackEvent('click_social_link', { platform: 'GitHub', url: 'https://github.com/1biest' })}
                  className="inline-flex items-center justify-center rounded-full border border-transparent px-6 py-3 text-sm font-semibold text-[var(--text-muted)] underline-offset-4 hover:underline"
                >
                  GitHub
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Slide 2: About */}
        <section id="about" className="slide-section border-t border-[var(--border)] min-h-screen pt-[4.5rem] flex flex-col justify-center">
          <div
            className="w-full py-12 md:py-20 group/slide transition-all duration-700 ease-out"
            data-active={activeSection === 'about' ? 'true' : 'false'}
            style={getSlideStyles(progresses['about']?.progress, progresses['about']?.active)}
          >
            <div className="opacity-0 translate-y-6 transition-all duration-700 ease-out group-data-[active=true]/slide:opacity-100 group-data-[active=true]/slide:translate-y-0 motion-reduce:opacity-100 motion-reduce:translate-y-0 delay-0">
              <SectionEyebrow index="01">About</SectionEyebrow>
              <h2 className="heading-accent font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight text-[var(--text)] md:text-4xl">
                About me
              </h2>
            </div>
            <div className="max-w-3xl">
              {technicalSummary.map((paragraph, index) => (
                <div
                  key={index}
                  className="opacity-0 translate-y-6 transition-all duration-700 ease-out group-data-[active=true]/slide:opacity-100 group-data-[active=true]/slide:translate-y-0 motion-reduce:opacity-100 motion-reduce:translate-y-0 mt-6 first:mt-8 text-lg leading-relaxed text-[var(--text-muted)]"
                  style={{ transitionDelay: `${(index + 1) * 100}ms` }}
                >
                  <p>{paragraph}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Slide 3: Neptune Finance — Flagship Case Study */}
        <section id="neptune-case-study" className="slide-section border-t border-[var(--border)] min-h-screen pt-[4.5rem] flex flex-col justify-center">
          <div
            className="w-full py-12 md:py-20 group/slide transition-all duration-700 ease-out"
            data-active={activeSection === 'neptune-case-study' ? 'true' : 'false'}
            style={getSlideStyles(progresses['neptune-case-study']?.progress, progresses['neptune-case-study']?.active)}
          >
            <NeptuneFinanceCaseStudy openProject={openProject} />
          </div>
        </section>

        {/* Slide 4: Work */}
        <section id="work" className="slide-section border-t border-[var(--border)] min-h-screen pt-[4.5rem] flex flex-col justify-center">
          <div
            className="w-full py-12 md:py-20 group/slide transition-all duration-700 ease-out"
            data-active={activeSection === 'work' ? 'true' : 'false'}
            style={getSlideStyles(progresses['work']?.progress, progresses['work']?.active)}
          >
            <div className="opacity-0 translate-y-6 transition-all duration-700 ease-out group-data-[active=true]/slide:opacity-100 group-data-[active=true]/slide:translate-y-0 motion-reduce:opacity-100 motion-reduce:translate-y-0 delay-0">
              <SectionEyebrow index="03">Work</SectionEyebrow>
              <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <h2 className="heading-accent font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight text-[var(--text)] md:text-4xl">
                  Selected systems
                </h2>
                <span className="text-sm font-medium text-[var(--text-muted)]">
                  Case studies &amp; shipping scope
                </span>
              </div>
            </div>
            <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {systemsBuilt.map((system, i) => (
                <button
                  key={system.name}
                  type="button"
                  onClick={() => system.projectId && openProject(system.projectId)}
                  className={`opacity-0 translate-y-6 transition-all duration-700 ease-out group-data-[active=true]/slide:opacity-100 group-data-[active=true]/slide:translate-y-0 motion-reduce:opacity-100 motion-reduce:translate-y-0 card-interactive group h-full w-full text-left rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-[var(--shadow-card)] overflow-hidden ${system.projectId === 'neptune-finance' ? 'sm:col-span-2 lg:col-span-2' : ''
                    }`}
                  style={{ transitionDelay: `${(i + 1) * 75}ms` }}
                >
                  {systemBackgrounds[system.projectId] && (
                    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden rounded-2xl">
                      {/* Image container spanning the full card to avoid internal seams */}
                      <div
                        className="absolute inset-0 bg-cover bg-no-repeat bg-right opacity-[0.14] transition-opacity duration-300 group-hover:opacity-[0.8] mix-blend-multiply"
                        style={{
                          backgroundImage: `url('${systemBackgrounds[system.projectId]}')`,
                        }}
                      />
                      {/* Fade mask to merge seamlessly with the card surface */}
                      <div
                        className="absolute inset-0"
                        style={{
                          background: 'linear-gradient(105deg, var(--surface) 35%, transparent 75%)',
                        }}
                      />
                    </div>
                  )}
                  <div className="relative z-10 flex flex-col h-full w-full">
                    <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                      <h3 className="text-base font-semibold text-[var(--text)] transition-colors group-hover:text-[color:var(--accent-color)]">
                        {system.name}
                      </h3>
                      {system.badge && (
                        <span className="shrink-0 inline-flex items-center rounded-full bg-[color:var(--accent-color)]/10 px-2.5 py-0.5 text-[10px] font-semibold tracking-wider uppercase text-[color:var(--accent-color)] border border-[color:var(--accent-color)]/20">
                          {system.badge}
                        </span>
                      )}
                    </div>
                    <p className="mt-2 text-sm text-[var(--text-muted)]">{system.domain}</p>
                    <p className="mt-4 text-xs leading-relaxed text-[var(--text-muted)]">
                      <span className="font-semibold text-[var(--text)]">Integrations · </span>
                      {system.integrations.join(', ')}
                    </p>
                    <p className="mt-2 text-xs leading-relaxed text-[var(--text-muted)]">
                      <span className="font-semibold text-[var(--text)]">Outcome · </span>
                      {system.outcome}
                    </p>
                    <span className="mt-5 inline-flex items-center gap-1 text-xs font-semibold text-[color:var(--accent-color)]">
                      View details
                      <span className="transition-transform duration-200 group-hover:translate-x-1">
                        →
                      </span>
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Slide 4: Experience Header */}
        <section id="experience-header" className="slide-section border-t border-[var(--border)] min-h-screen pt-[4.5rem] flex flex-col justify-center">
          <div
            className="w-full py-12 md:py-20 group/slide transition-all duration-700 ease-out"
            data-active={activeSection === 'experience-header' ? 'true' : 'false'}
            style={getSlideStyles(progresses['experience-header']?.progress, progresses['experience-header']?.active)}
          >
            <div className="opacity-0 translate-y-6 transition-all duration-700 ease-out group-data-[active=true]/slide:opacity-100 group-data-[active=true]/slide:translate-y-0 motion-reduce:opacity-100 motion-reduce:translate-y-0 delay-0">
              <SectionEyebrow index="04">Experience</SectionEyebrow>
              <h2 className="heading-accent font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight text-[var(--text)] md:text-4xl">
                Experience
              </h2>
            </div>
            <div className="max-w-2xl opacity-0 translate-y-6 transition-all duration-700 ease-out group-data-[active=true]/slide:opacity-100 group-data-[active=true]/slide:translate-y-0 motion-reduce:opacity-100 motion-reduce:translate-y-0 delay-[100ms]">
              <p className="mt-8 text-lg leading-relaxed text-[var(--text-muted)]">
                Representative roles, protocol work, and projects. Scroll down to browse individual case studies.
              </p>
              <div className="mt-8 flex items-center gap-2 text-sm text-[var(--text-subtle)] font-medium">
                <span>Scroll to start browsing</span>
                <span className="animate-bounce">↓</span>
              </div>
            </div>
          </div>
        </section>

        {/* Slides 5-16: Individual Experiences */}
        {experience.map((exp) => (
          <section
            key={exp.id}
            id={`experience-${exp.id}`}
            className="slide-section border-t border-[var(--border)] min-h-screen pt-[4.5rem] flex flex-col justify-center"
          >
            <div
              className="w-full py-12 md:py-20 group/slide transition-all duration-700 ease-out"
              data-active={activeSection === `experience-${exp.id}` ? 'true' : 'false'}
              style={getSlideStyles(progresses[`experience-${exp.id}`]?.progress, progresses[`experience-${exp.id}`]?.active)}
            >
              <article className="grid gap-8 md:grid-cols-[minmax(0,250px)_1fr]">
                <div className="opacity-0 translate-y-6 transition-all duration-700 ease-out group-data-[active=true]/slide:opacity-100 group-data-[active=true]/slide:translate-y-0 motion-reduce:opacity-100 motion-reduce:translate-y-0 delay-0">
                  <p className="text-xs font-semibold uppercase tracking-wider text-[var(--text-subtle)] mb-2">
                    {groupEyebrow(exp.group)}
                  </p>
                  <h4 className="text-sm font-medium text-[var(--text-muted)]">{exp.role || 'Contributor'}</h4>
                  <button
                    type="button"
                    onClick={() => openProject(exp.id)}
                    className="group/btn mt-6 inline-flex items-center gap-1.5 text-left text-sm font-bold text-[color:var(--accent-color)] hover:underline"
                  >
                    View details
                    <span className="transition-transform duration-200 group-hover/btn:translate-x-1">
                      →
                    </span>
                  </button>
                </div>
                <div>
                  <div className="opacity-0 translate-y-6 transition-all duration-700 ease-out group-data-[active=true]/slide:opacity-100 group-data-[active=true]/slide:translate-y-0 motion-reduce:opacity-100 motion-reduce:translate-y-0 delay-[100ms]">
                    <div className="flex flex-wrap items-center gap-3">
                      <h3 className="text-2xl font-bold text-[var(--text)] md:text-3xl leading-tight">
                        {exp.title}
                      </h3>
                      {exp.badge && (
                        <span className="inline-flex items-center rounded-full bg-[color:var(--accent-color)]/10 px-2.5 py-0.5 text-[10px] font-semibold tracking-wider uppercase text-[color:var(--accent-color)] border border-[color:var(--accent-color)]/20">
                          {exp.badge}
                        </span>
                      )}
                    </div>
                    {exp.roleDescriptor && (
                      <p className="mt-3 text-base text-[var(--text-muted)] leading-relaxed">
                        {exp.roleDescriptor}
                      </p>
                    )}
                  </div>
                  {exp.highlights?.length > 0 && (
                    <ul className="opacity-0 translate-y-6 transition-all duration-700 ease-out group-data-[active=true]/slide:opacity-100 group-data-[active=true]/slide:translate-y-0 motion-reduce:opacity-100 motion-reduce:translate-y-0 delay-[200ms] mt-6 list-disc space-y-2.5 pl-5 text-[var(--text-muted)] marker:text-[var(--text-muted)]">
                      {exp.highlights.map((h) => (
                        <li key={h} className="leading-relaxed text-sm">
                          {h}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </article>
            </div>
          </section>
        ))}

        {/* Slide 17: Stack */}
        <section id="stack" className="slide-section border-t border-[var(--border)] min-h-screen pt-[4.5rem] flex flex-col justify-center">
          <div
            className="w-full py-12 md:py-20 group/slide transition-all duration-700 ease-out"
            data-active={activeSection === 'stack' ? 'true' : 'false'}
            style={getSlideStyles(progresses['stack']?.progress, progresses['stack']?.active)}
          >
            <div className="opacity-0 translate-y-6 transition-all duration-700 ease-out group-data-[active=true]/slide:opacity-100 group-data-[active=true]/slide:translate-y-0 motion-reduce:opacity-100 motion-reduce:translate-y-0 delay-0">
              <SectionEyebrow index="05">Stack</SectionEyebrow>
              <h2 className="heading-accent font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight text-[var(--text)] md:text-4xl">
                Stack
              </h2>
              <p className="mt-4 max-w-2xl text-[var(--text-muted)]">
                Tools and domains I work across most often.
              </p>
            </div>
            <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {competencies.map((group, i) => (
                <div
                  key={group.category}
                  className="opacity-0 translate-y-6 transition-all duration-700 ease-out group-data-[active=true]/slide:opacity-100 group-data-[active=true]/slide:translate-y-0 motion-reduce:opacity-100 motion-reduce:translate-y-0 card-interactive h-full rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-[var(--shadow-card)]"
                  style={{ transitionDelay: `${(i + 1) * 75}ms` }}
                >
                  <h3 className="text-sm font-semibold text-[var(--text)]">{group.category}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-[var(--text-muted)] font-medium">
                    {group.items.join(' · ')}
                  </p>
                  {group.description && (
                    <p className="mt-2 text-sm leading-relaxed text-[var(--text-muted)] font-normal">
                      {group.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Slide 18: Contact */}
        <section id="contact" className="slide-section border-t border-[var(--border)] min-h-screen pt-[4.5rem] flex flex-col justify-center">
          <div
            className="w-full py-12 md:py-20 group/slide transition-all duration-700 ease-out"
            data-active={activeSection === 'contact' ? 'true' : 'false'}
            style={getSlideStyles(progresses['contact']?.progress, progresses['contact']?.active)}
          >
            <div className="opacity-0 translate-y-6 transition-all duration-700 ease-out group-data-[active=true]/slide:opacity-100 group-data-[active=true]/slide:translate-y-0 motion-reduce:opacity-100 motion-reduce:translate-y-0 delay-0">
              <SectionEyebrow index="06">Contact</SectionEyebrow>
              <h2 className="heading-accent font-[family-name:var(--font-display)] text-4xl font-semibold tracking-tight text-[var(--text)] md:text-5xl">
                Let&apos;s talk
              </h2>
              <p className="mt-4 max-w-2xl text-lg text-[var(--text-muted)]">
                Looking for a design engineer who can own the path from Figma to production? I&apos;m
                open to new opportunities and quick to reply.
              </p>
            </div>

            <div className="opacity-0 translate-y-6 transition-all duration-700 ease-out group-data-[active=true]/slide:opacity-100 group-data-[active=true]/slide:translate-y-0 motion-reduce:opacity-100 motion-reduce:translate-y-0 delay-[100ms] mt-8 flex flex-wrap items-center gap-3">
              <a
                href={MAILTO}
                onClick={() => trackEvent('click_email', { location: 'contact' })}
                className="inline-flex items-center justify-center rounded-full bg-[var(--text)] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[color:var(--accent-color)] active:scale-[0.98]"
              >
                Email me
              </a>
              <button
                type="button"
                onClick={handleCopyEmail}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface)] px-6 py-3 text-sm font-semibold text-[var(--text)] transition hover:border-[color:var(--accent-color)] active:scale-[0.98]"
              >
                {copied ? 'Copied ✓' : 'Copy email'}
              </button>
              <a
                href="/Logan Biesterfeldt Resume 2026.pdf"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent('click_resume', { location: 'contact' })}
                className="inline-flex items-center justify-center rounded-full border border-transparent px-6 py-3 text-sm font-semibold text-[var(--text-muted)] underline-offset-4 hover:underline"
              >
                Download résumé
              </a>
            </div>

            <div className="opacity-0 translate-y-6 transition-all duration-700 ease-out group-data-[active=true]/slide:opacity-100 group-data-[active=true]/slide:translate-y-0 motion-reduce:opacity-100 motion-reduce:translate-y-0 delay-[200ms] mt-12 grid gap-10 md:grid-cols-2">
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">
                  Direct
                </h3>
                <div className="mt-4 flex flex-col gap-2 text-[var(--text-muted)]">
                  <a
                    href={MAILTO}
                    onClick={() => trackEvent('click_email', { location: 'contact_footer' })}
                    className="link-underline w-fit text-[var(--text)] hover:text-[color:var(--accent-color)]"
                  >
                    {EMAIL}
                  </a>
                  <a
                    href="https://github.com/1biest"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackEvent('click_social_link', { platform: 'GitHub_footer', url: 'https://github.com/1biest' })}
                    className="link-underline w-fit text-[var(--text)] hover:text-[color:var(--accent-color)]"
                  >
                    github.com/1biest
                  </a>
                </div>
              </div>
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">
                  Social
                </h3>
                <div className="mt-4">
                  <SocialLinks />
                </div>
              </div>
            </div>

            <div className="mt-16 flex flex-col items-center gap-1 border-t border-[var(--border)] pt-8 text-center text-xs text-[var(--text-subtle)]">
              <p>© {new Date().getFullYear()} Logan Biesterfeldt</p>
              <p>Designed &amp; engineered by Logan · Built with Next.js &amp; Tailwind CSS</p>
            </div>
          </div>
        </section>
      </main>

      {activeProject && (
        <CaseStudyDrawer
          isOpen={!!activeProjectId}
          onClose={closeProject}
          onNext={handleNextProject}
          onPrev={handlePrevProject}
          projectTitle={activeProject.title}
          projectUrl={shareUrl}
        >
          <CaseStudyRenderer project={activeProject} />
        </CaseStudyDrawer>
      )}
    </div>
  );
}
