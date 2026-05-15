'use client';

import { useCallback, useRef, useState } from 'react';
import SocialLinks from './Components/SocialLinks';
import SectionContent from './Components/SectionContent';
import { ThemeAccentColor } from './config';
import { Project, ProjectsData } from './types/projects';
import projectsData from './data/projects.json';
import NeptuneFinance from './projects/neptune-finance/page';

export type Experience = Project;

const cvData = projectsData as ProjectsData;
const experience: Experience[] = cvData.projects;
const systemsBuilt = cvData.systemsBuilt;
const competencies = cvData.coreCompetencies;
const technicalSummary = cvData.technicalSummary;

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

export default function Home() {
  const [highlightIndex, setHighlightIndex] = useState(0);
  const detailRef = useRef<HTMLElement>(null);

  const scrollToDetail = useCallback(() => {
    requestAnimationFrame(() => {
      detailRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }, []);

  const selectExperience = useCallback(
    (index: number) => {
      setHighlightIndex(index);
      scrollToDetail();
    },
    [scrollToDetail]
  );

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
      <header className="sticky top-0 z-50 border-b border-[var(--border)] bg-[var(--bg-page)]/85 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-4 md:px-8">
          <a
            href="#intro"
            className="font-[family-name:var(--font-display)] text-lg font-semibold tracking-tight text-[var(--text)] transition-colors hover:text-[color:var(--accent-color)]"
          >
            Logan Biesterfeldt
          </a>
          <nav className="hidden flex-wrap items-center justify-end gap-x-6 gap-y-2 text-sm font-medium text-[var(--text-muted)] md:flex">
            {NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="transition-colors hover:text-[color:var(--accent-color)]"
              >
                {item.label}
              </a>
            ))}
          </nav>
          <nav className="flex max-w-[55vw] gap-3 overflow-x-auto pb-0.5 text-xs font-medium text-[var(--text-muted)] md:hidden">
            {NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="whitespace-nowrap shrink-0 hover:text-[color:var(--accent-color)]"
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-5 md:px-8">
        <section id="intro" className="scroll-mt-28 pt-14 pb-20 md:pt-20 md:pb-28">
          <p className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-[var(--text-muted)]">
            Portfolio
          </p>
          <h1 className="font-[family-name:var(--font-display)] text-[clamp(2.5rem,6vw,4.5rem)] font-semibold leading-[1.05] tracking-tight text-[var(--text)]">
            Logan Biesterfeldt
          </h1>
          <p className="mt-5 max-w-2xl text-xl font-medium text-[var(--text)] md:text-2xl">
            Senior Frontend Engineer — DeFi infrastructure & smart-contract UI systems
          </p>
          <p className="mt-3 text-sm text-[var(--text-muted)]">
            React · TypeScript · Next.js · CosmWasm · Injective
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <span
              className="rounded-full border border-[var(--border)] bg-[var(--surface)] px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-[var(--text)] shadow-sm"
              style={{ boxShadow: 'var(--shadow-card)' }}
            >
              Open to opportunities
            </span>
          </div>
          <div className="mt-10 flex flex-wrap gap-3">
            <a
              href="#work"
              className="inline-flex items-center justify-center rounded-full bg-[var(--text)] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[color:var(--accent-color)] hover:text-white"
            >
              View work
            </a>
            <a
              href="/Logan Biesterfeldt Resume 2026.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full border border-[var(--border)] bg-[var(--surface)] px-6 py-3 text-sm font-semibold text-[var(--text)] transition hover:border-[color:var(--accent-color)]"
            >
              Download résumé
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
        </section>

        <section id="about" className="scroll-mt-28 border-t border-[var(--border)] py-16 md:py-24">
          <h2 className="font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight text-[var(--text)] md:text-4xl">
            About me
          </h2>
          <p className="mt-8 max-w-3xl text-lg leading-relaxed text-[var(--text-muted)]">
            {technicalSummary}
          </p>
        </section>

        <section id="work" className="scroll-mt-28 border-t border-[var(--border)] py-16 md:py-24">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <h2 className="font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight text-[var(--text)] md:text-4xl">
              Selected systems
            </h2>
            <span className="text-sm font-medium text-[var(--text-muted)]">
              Case studies &amp; shipping scope
            </span>
          </div>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {systemsBuilt.map((system) => {
              const linkedIndex = experience.findIndex((exp) => exp.id === system.projectId);
              return (
                <button
                  key={system.name}
                  type="button"
                  className="group text-left rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-[var(--shadow-card)] transition hover:border-[color:var(--accent-color)]"
                  onClick={() => linkedIndex >= 0 && selectExperience(linkedIndex)}
                >
                  <h3 className="text-base font-semibold text-[var(--text)] group-hover:text-[color:var(--accent-color)]">
                    {system.name}
                  </h3>
                  <p className="mt-2 text-sm text-[var(--text-muted)]">{system.domain}</p>
                  <p className="mt-4 text-xs leading-relaxed text-[var(--text-muted)]">
                    <span className="font-semibold text-[var(--text)]">Integrations · </span>
                    {system.integrations.join(', ')}
                  </p>
                  <p className="mt-2 text-xs leading-relaxed text-[var(--text-muted)]">
                    <span className="font-semibold text-[var(--text)]">Outcome · </span>
                    {system.outcome}
                  </p>
                </button>
              );
            })}
          </div>
        </section>

        <section
          id="detail"
          ref={detailRef}
          className="scroll-mt-28 border-t border-[var(--border)] py-16 md:py-24"
        >
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-[var(--shadow-card)] md:p-10">
            {highlightIndex === 0 ? (
              <NeptuneFinance />
            ) : (
              <SectionContent experience={experience} highlightIndex={highlightIndex} />
            )}
          </div>
        </section>

        <section
          id="experience"
          className="scroll-mt-28 border-t border-[var(--border)] py-16 md:py-24"
        >
          <h2 className="font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight text-[var(--text)] md:text-4xl">
            Experience
          </h2>
          <p className="mt-4 max-w-2xl text-[var(--text-muted)]">
            Representative roles, protocol work, and projects. Select an entry to open the full
            write-up above.
          </p>
          <div className="mt-14 flex flex-col gap-16">
            {experience.map((exp, index) => (
              <article
                key={exp.id}
                className="grid gap-8 border-b border-[var(--border)] pb-16 last:border-0 last:pb-0 md:grid-cols-[minmax(0,200px)_1fr]"
              >
                <div>
                  <p className="text-sm font-medium uppercase tracking-wider text-[var(--text-muted)]">
                    {groupEyebrow(exp.group)}
                  </p>
                  <button
                    type="button"
                    onClick={() => selectExperience(index)}
                    className="mt-4 text-left text-sm font-semibold text-[color:var(--accent-color)] hover:underline"
                  >
                    View details →
                  </button>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-[var(--text)] md:text-2xl">
                    {exp.title}
                  </h3>
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
            ))}
          </div>
        </section>

        <section id="stack" className="scroll-mt-28 border-t border-[var(--border)] py-16 md:py-24">
          <h2 className="font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight text-[var(--text)] md:text-4xl">
            Stack
          </h2>
          <p className="mt-4 max-w-2xl text-[var(--text-muted)]">
            Tools and domains I work across most often.
          </p>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {competencies.map((group) => (
              <div
                key={group.category}
                className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-[var(--shadow-card)]"
              >
                <h3 className="text-sm font-semibold text-[var(--text)]">{group.category}</h3>
                <p className="mt-3 text-sm leading-relaxed text-[var(--text-muted)]">
                  {group.items.join(' · ')}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section
          id="contact"
          className="scroll-mt-28 border-t border-[var(--border)] py-16 md:py-24"
        >
          <h2 className="font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight text-[var(--text)] md:text-4xl">
            Let&apos;s talk
          </h2>
          <div className="mt-10 grid gap-10 md:grid-cols-2">
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">
                Links
              </h3>
              <div className="mt-4 flex flex-col gap-2 text-[var(--text-muted)]">
                <a
                  href="https://github.com/1biest"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-fit text-[var(--text)] hover:text-[color:var(--accent-color)]"
                >
                  github.com/1biest
                </a>
                <a
                  href="https://nept.finance"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-fit text-[var(--text)] hover:text-[color:var(--accent-color)]"
                >
                  nept.finance
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
          <p className="mt-16 text-center text-xs text-[var(--text-muted)]">
            © {new Date().getFullYear()} Logan Biesterfeldt
          </p>
        </section>
      </main>
    </div>
  );
}
