'use client';

import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';
import SocialLinks from './Components/SocialLinks';
import Reveal from './Components/Reveal';
import Backdrop from './Components/Backdrop';
import { ThemeAccentColor } from './config';
import { Project, ProjectsData } from './types/projects';
import projectsData from './data/projects.json';
import CaseStudyDrawer from './Components/CaseStudyDrawer';
import CaseStudyRenderer from './Components/CaseStudyRenderer';

export type Experience = Project;

const cvData = projectsData as ProjectsData;
const experience: Experience[] = cvData.projects;
const systemsBuilt = cvData.systemsBuilt;
const competencies = cvData.coreCompetencies;
const technicalSummary = cvData.technicalSummary;

const EMAIL = 'logan.biesterfeldt@gmail.com';
const MAILTO = `mailto:${EMAIL}?subject=${encodeURIComponent('Opportunity for Logan — Design Engineer')}`;

const NAV = [
  { href: '#intro', label: 'Intro' },
  { href: '#about', label: 'About' },
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
  const [activeSection, setActiveSection] = useState('intro');
  const [copied, setCopied] = useState(false);

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

  useEffect(() => {
    const sections = document.querySelectorAll('section[id]');
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -60% 0px',
      threshold: 0,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, observerOptions);

    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  const openProject = useCallback((projectId: string) => {
    setActiveProjectId(projectId);
    const newUrl = `${window.location.pathname}?project=${projectId}`;
    window.history.pushState({ project: projectId }, '', newUrl);
  }, []);

  const closeProject = useCallback(() => {
    setActiveProjectId(null);
    const newUrl = window.location.pathname;
    window.history.pushState(null, '', newUrl);
  }, []);

  const handleNextProject = useCallback(() => {
    if (!activeProjectId) return;
    const currentIndex = experience.findIndex((exp) => exp.id === activeProjectId);
    if (currentIndex >= 0) {
      const nextIndex = (currentIndex + 1) % experience.length;
      openProject(experience[nextIndex].id);
    }
  }, [activeProjectId, openProject]);

  const handlePrevProject = useCallback(() => {
    if (!activeProjectId) return;
    const currentIndex = experience.findIndex((exp) => exp.id === activeProjectId);
    if (currentIndex >= 0) {
      const prevIndex = (currentIndex - 1 + experience.length) % experience.length;
      openProject(experience[prevIndex].id);
    }
  }, [activeProjectId, openProject]);

  const handleCopyEmail = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard unavailable; mailto link remains the fallback.
    }
  }, []);

  const activeProject = experience.find((exp) => exp.id === activeProjectId);
  const shareUrl =
    typeof window !== 'undefined' && activeProject
      ? `${window.location.origin}${window.location.pathname}?project=${activeProject.id}`
      : '';

  return (
    <div
      className="min-h-screen selection:text-[var(--text)] pb-24"
      style={
        {
          '--text': '#141414',
          '--theme-accent': ThemeAccentColor,
        } as React.CSSProperties
      }
    >
      <Backdrop />

      <header className="sticky top-0 z-50 border-b border-[var(--border)] bg-[var(--bg-page)]/85 backdrop-blur-md">
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
              const isActive = activeSection === item.href.slice(1);
              return (
                <a
                  key={item.href}
                  href={item.href}
                  className={`link-underline transition-colors ${
                    isActive
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
              className="inline-flex items-center gap-1.5 rounded-full border border-[var(--border-strong)] bg-[var(--surface)] px-3.5 py-1.5 text-xs font-semibold text-[var(--text)] shadow-sm transition hover:border-[color:var(--accent-color)] hover:text-[color:var(--accent-color)]"
            >
              Résumé
            </a>
          </nav>
          <nav className="flex max-w-[55vw] gap-3 overflow-x-auto pb-0.5 text-xs font-medium md:hidden">
            {NAV.map((item) => {
              const isActive = activeSection === item.href.slice(1);
              return (
                <a
                  key={item.href}
                  href={item.href}
                  className={`whitespace-nowrap shrink-0 transition-colors ${
                    isActive
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
        <section id="intro" className="relative scroll-mt-28 pt-14 pb-20 md:pt-24 md:pb-28">
          <div className="relative z-10">
            <Reveal immediate index={0}>
              <p className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-[var(--text-muted)]">
                Portfolio
              </p>
            </Reveal>
            <Reveal immediate index={1}>
              <h1 className="font-[family-name:var(--font-display)] text-[clamp(2.5rem,6vw,4.5rem)] font-semibold leading-[1.05] tracking-tight text-[var(--text)]">
                Logan Biesterfeldt
              </h1>
            </Reveal>
            <Reveal immediate index={2}>
              <p className="mt-5 max-w-2xl text-xl font-medium text-[var(--text)] md:text-2xl">
                Design Engineer · Frontend Lead
              </p>
            </Reveal>
            <Reveal immediate index={3}>
              <p className="mt-3 text-sm text-[var(--text-muted)]">
                Figma to production: design systems, React, TypeScript, blockchain
              </p>
            </Reveal>
            <Reveal immediate index={4}>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <span
                  className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface)] px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-[var(--text)]"
                  style={{ boxShadow: 'var(--shadow-card)' }}
                >
                  <span className="status-dot" aria-hidden="true" />
                  Open to opportunities
                </span>
                <span className="text-xs font-medium text-[var(--text-muted)]">
                  Calgary, Canada · Remote-friendly
                </span>
              </div>
            </Reveal>
            <Reveal immediate index={5}>
              <div className="mt-10 flex flex-wrap gap-3">
                <a
                  href="#work"
                  className="inline-flex items-center justify-center rounded-full bg-[var(--text)] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[color:var(--accent-color)] hover:text-white active:scale-[0.98]"
                >
                  View work
                </a>
                <a
                  href="/Logan Biesterfeldt Resume 2026.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-full border border-[var(--border)] bg-[var(--surface)] px-6 py-3 text-sm font-semibold text-[var(--text)] transition hover:border-[color:var(--accent-color)] active:scale-[0.98]"
                >
                  Download résumé
                </a>
                <a
                  href={MAILTO}
                  className="inline-flex items-center justify-center rounded-full border border-transparent px-6 py-3 text-sm font-semibold text-[var(--text-muted)] underline-offset-4 hover:underline"
                >
                  Email me
                </a>
                <a
                  href="https://github.com/1biest"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-full border border-transparent px-6 py-3 text-sm font-semibold text-[var(--text-muted)] underline-offset-4 hover:underline"
                >
                  GitHub
                </a>
              </div>
            </Reveal>
          </div>
        </section>

        <section id="about" className="scroll-mt-28 border-t border-[var(--border)] py-16 md:py-24">
          <Reveal>
            <SectionEyebrow index="01">About</SectionEyebrow>
            <h2 className="heading-accent font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight text-[var(--text)] md:text-4xl">
              About me
            </h2>
          </Reveal>
          <div className="max-w-3xl">
            {technicalSummary.map((paragraph, index) => (
              <Reveal key={index} index={Math.min(index, 4)}>
                <p
                  className={`text-lg leading-relaxed text-[var(--text-muted)] ${index === 0 ? 'mt-8' : 'mt-6'}`}
                >
                  {paragraph}
                </p>
              </Reveal>
            ))}
          </div>
        </section>

        <section id="work" className="scroll-mt-28 border-t border-[var(--border)] py-16 md:py-24">
          <Reveal>
            <SectionEyebrow index="02">Work</SectionEyebrow>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <h2 className="heading-accent font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight text-[var(--text)] md:text-4xl">
                Selected systems
              </h2>
              <span className="text-sm font-medium text-[var(--text-muted)]">
                Case studies &amp; shipping scope
              </span>
            </div>
          </Reveal>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {systemsBuilt.map((system, i) => (
              <Reveal key={system.name} index={Math.min(i, 5)}>
                <button
                  type="button"
                  className="card-interactive group h-full w-full text-left rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-[var(--shadow-card)]"
                  onClick={() => system.projectId && openProject(system.projectId)}
                >
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
                </button>
              </Reveal>
            ))}
          </div>
        </section>

        <section
          id="experience"
          className="scroll-mt-28 border-t border-[var(--border)] py-16 md:py-24"
        >
          <Reveal>
            <SectionEyebrow index="03">Experience</SectionEyebrow>
            <h2 className="heading-accent font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight text-[var(--text)] md:text-4xl">
              Experience
            </h2>
            <p className="mt-4 max-w-2xl text-[var(--text-muted)]">
              Representative roles, protocol work, and projects. Select an entry to open the full
              write-up in the drawer panel.
            </p>
          </Reveal>
          <div className="mt-14 flex flex-col gap-16">
            {experience.map((exp, i) => (
              <Reveal key={exp.id} index={Math.min(i % 3, 2)}>
                <article className="grid gap-8 border-b border-[var(--border)] pb-16 last:border-0 last:pb-0 md:grid-cols-[minmax(0,200px)_1fr]">
                  <div>
                    <p className="text-sm font-medium uppercase tracking-wider text-[var(--text-muted)]">
                      {groupEyebrow(exp.group)}
                    </p>
                    <button
                      type="button"
                      onClick={() => openProject(exp.id)}
                      className="group/btn mt-4 inline-flex items-center gap-1 text-left text-sm font-semibold text-[color:var(--accent-color)] hover:underline"
                    >
                      View details
                      <span className="transition-transform duration-200 group-hover/btn:translate-x-1">
                        →
                      </span>
                    </button>
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-3">
                      <h3 className="text-xl font-semibold text-[var(--text)] md:text-2xl">
                        {exp.title}
                      </h3>
                      {exp.badge && (
                        <span className="inline-flex items-center rounded-full bg-[color:var(--accent-color)]/10 px-2.5 py-0.5 text-[10px] font-semibold tracking-wider uppercase text-[color:var(--accent-color)] border border-[color:var(--accent-color)]/20">
                          {exp.badge}
                        </span>
                      )}
                    </div>
                    {exp.roleDescriptor && (
                      <p className="mt-2 text-sm text-[var(--text-muted)]">{exp.roleDescriptor}</p>
                    )}
                    {exp.highlights?.length > 0 && (
                      <ul className="mt-6 list-disc space-y-2 pl-5 text-[var(--text-muted)] marker:text-[var(--text-muted)]">
                        {exp.highlights.map((h) => (
                          <li key={h} className="leading-relaxed">
                            {h}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </section>

        <section id="stack" className="scroll-mt-28 border-t border-[var(--border)] py-16 md:py-24">
          <Reveal>
            <SectionEyebrow index="04">Stack</SectionEyebrow>
            <h2 className="heading-accent font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight text-[var(--text)] md:text-4xl">
              Stack
            </h2>
            <p className="mt-4 max-w-2xl text-[var(--text-muted)]">
              Tools and domains I work across most often.
            </p>
          </Reveal>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {competencies.map((group, i) => (
              <Reveal key={group.category} index={Math.min(i, 5)}>
                <div className="card-interactive h-full rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-[var(--shadow-card)]">
                  <h3 className="text-sm font-semibold text-[var(--text)]">{group.category}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-[var(--text-muted)]">
                    {group.items.join(' · ')}
                  </p>
                  {group.description && (
                    <p className="mt-2 text-sm leading-relaxed text-[var(--text-muted)]">
                      {group.description}
                    </p>
                  )}
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        <section
          id="contact"
          className="scroll-mt-28 border-t border-[var(--border)] py-16 md:py-24"
        >
          <Reveal>
            <SectionEyebrow index="05">Contact</SectionEyebrow>
            <h2 className="heading-accent font-[family-name:var(--font-display)] text-4xl font-semibold tracking-tight text-[var(--text)] md:text-5xl">
              Let&apos;s talk
            </h2>
            <p className="mt-4 max-w-2xl text-lg text-[var(--text-muted)]">
              Looking for a design engineer who can own the path from Figma to production? I&apos;m
              open to new opportunities and quick to reply.
            </p>
          </Reveal>

          <Reveal index={1}>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href={MAILTO}
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
                className="inline-flex items-center justify-center rounded-full border border-transparent px-6 py-3 text-sm font-semibold text-[var(--text-muted)] underline-offset-4 hover:underline"
              >
                Download résumé
              </a>
            </div>
          </Reveal>

          <Reveal index={2}>
            <div className="mt-12 grid gap-10 md:grid-cols-2">
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">
                  Direct
                </h3>
                <div className="mt-4 flex flex-col gap-2 text-[var(--text-muted)]">
                  <a
                    href={MAILTO}
                    className="link-underline w-fit text-[var(--text)] hover:text-[color:var(--accent-color)]"
                  >
                    {EMAIL}
                  </a>
                  <a
                    href="https://github.com/1biest"
                    target="_blank"
                    rel="noopener noreferrer"
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
          </Reveal>

          <div className="mt-16 flex flex-col items-center gap-1 border-t border-[var(--border)] pt-8 text-center text-xs text-[var(--text-subtle)]">
            <p>© {new Date().getFullYear()} Logan Biesterfeldt</p>
            <p>Designed &amp; engineered by Logan · Built with Next.js &amp; Tailwind CSS</p>
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
