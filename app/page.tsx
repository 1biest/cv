'use client';

import { useEffect, useState } from 'react';
import BackgroundFX from './Components/BackgroundFx';
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

export default function Home() {
  const [highlightIndex, setHighlightIndex] = useState<number>(0);
  const [showBackgroundFX, setShowBackgroundFX] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowBackgroundFX(true);
    }, 0);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <>
      <div
        className="w-full px-4 sm:px-8 lg:px-12 pt-6 sm:pt-10 pb-16 selection:bg-[var(--theme-accent)] selection:text-[#101322]"
        style={{ '--theme-accent': ThemeAccentColor } as React.CSSProperties}
      >
        <div className="max-w-[1300px] mx-auto grid grid-cols-1 lg:grid-cols-[340px_1fr] gap-8 cursor-default">
          <aside className="lg:sticky lg:top-8 h-fit rounded-lg border border-white/10 bg-[rgba(153,172,199,0.06)] p-4 text-[#99ACC7] flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-[#dde5ed] to-[#99ACC7] leading-tight">
                Logan Biesterfeldt
              </h1>
              <h2 className="text-sm font-bold">
                Senior Frontend Engineer - DeFi Infrastructure & Smart Contract UI Systems
              </h2>
              <p className="text-xs font-semibold">React · TypeScript · Next.js · CosmWasm</p>
            </div>
            <p className="text-xs">{technicalSummary}</p>
            <div className="flex flex-col gap-2">
              <h3 className="text-sm font-bold text-[#dde5ed]">Core Competencies</h3>
              {competencies.map((group) => (
                <div key={group.category} className="flex flex-col gap-1">
                  <span className="text-[11px] uppercase tracking-wide text-[#C9D5E5]">
                    {group.category}
                  </span>
                  <span className="text-xs">{group.items.join(' · ')}</span>
                </div>
              ))}
            </div>
            <div className="pt-1 border-t border-white/10 flex flex-col gap-3">
              <h3 className="text-sm font-bold text-[#dde5ed]">Links</h3>
              <a href="https://github.com/1biest" target="_blank" rel="noopener noreferrer">
                github.com/1biest
              </a>
              <a href="https://nept.finance" target="_blank" rel="noopener noreferrer">
                nept.finance
              </a>
              <SocialLinks />
            </div>
          </aside>
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-1 text-xs">
              <h3 className="text-base font-bold text-[#dde5ed] mb-2">Professional Experience</h3>
              {experience
                .map((exp, index) => ({ exp, index }))
                .filter(({ exp }) => exp.group === 'professional-experience')
                .map(({ exp, index }) => (
                  <span
                    key={exp.id}
                    className={`cursor-pointer hover:text-[color:var(--accent-color)] ${
                      index === highlightIndex ? 'text-[color:var(--accent-color)]' : ''
                    }`}
                    onClick={() => setHighlightIndex(index)}
                  >
                    {exp.title}
                  </span>
                ))}
              <h3 className="text-base font-bold text-[#dde5ed] mt-4 mb-2">Protocol / Ecosystem Work</h3>
              {experience
                .map((exp, index) => ({ exp, index }))
                .filter(({ exp }) => exp.group === 'protocol-ecosystem')
                .map(({ exp, index }) => (
                  <span
                    key={exp.id}
                    className={`cursor-pointer hover:text-[color:var(--accent-color)] ${
                      index === highlightIndex ? 'text-[color:var(--accent-color)]' : ''
                    }`}
                    onClick={() => setHighlightIndex(index)}
                  >
                    {exp.title}
                  </span>
                ))}
              <h3 className="text-base font-bold text-[#dde5ed] mt-4 mb-2">Projects</h3>
              {experience
                .map((exp, index) => ({ exp, index }))
                .filter(({ exp }) => exp.group === 'projects')
                .map(({ exp, index }) => (
                  <span
                    key={exp.id}
                    className={`cursor-pointer hover:text-[color:var(--accent-color)] ${
                      index === highlightIndex ? 'text-[color:var(--accent-color)]' : ''
                    }`}
                    onClick={() => setHighlightIndex(index)}
                  >
                    {exp.title}
                  </span>
                ))}
            </div>
          </div>
          <div className="pt-2">
            <h3 className="text-xl font-bold text-[#dde5ed] mb-4">Selected Systems Built</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 mb-2">
              {systemsBuilt.map((system) => {
                const linkedIndex = experience.findIndex((exp) => exp.id === system.projectId);
                return (
                  <button
                    key={system.name}
                    className="text-left rounded-lg border border-white/10 bg-[rgba(153,172,199,0.07)] p-4 hover:border-[var(--accent-color)] transition"
                    onClick={() => linkedIndex >= 0 && setHighlightIndex(linkedIndex)}
                  >
                    <h4 className="text-sm font-bold text-[#dde5ed] mb-1">{system.name}</h4>
                    <p className="text-xs text-[#99ACC7] mb-2">{system.domain}</p>
                    <p className="text-xs text-[#99ACC7] mb-2">
                      Integrations: {system.integrations.join(', ')}
                    </p>
                    <p className="text-xs text-[#99ACC7] mb-2">
                      Constraints: {system.constraints.join(', ')}
                    </p>
                    <p className="text-xs text-[#C9D5E5]">{system.outcome}</p>
                  </button>
                );
              })}
            </div>
          </div>
          <div className="w-full">
            {highlightIndex === 0 ? (
              <NeptuneFinance />
            ) : (
              <SectionContent experience={experience} highlightIndex={highlightIndex} />
            )}
          </div>
        </div>
      </div>

      {showBackgroundFX && <BackgroundFX />}
    </>
  );
}
