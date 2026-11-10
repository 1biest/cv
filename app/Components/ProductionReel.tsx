'use client';

import React, { useState } from 'react';
import { trackCaseStudyEvent, trackEvent } from '../lib/analytics';

export interface SystemItem {
  name: string;
  projectId: string;
  badge?: string;
  domain: string;
  integrations: string[];
  constraints?: string[];
  outcome: string;
}

interface ProductionReelProps {
  systems: SystemItem[];
  systemBackgrounds: Record<string, string>;
  onOpenProject: (projectId: string) => void;
}

const CATEGORIES = [
  { id: 'all', label: 'All Systems' },
  { id: 'defi', label: 'DeFi & Protocols' },
  { id: 'infra', label: 'Infrastructure & Open Source' },
  { id: 'ai', label: 'AI & Data Platforms' },
] as const;

export default function ProductionReel({
  systems,
  systemBackgrounds,
  onOpenProject,
}: ProductionReelProps) {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const filteredSystems = systems.filter((system) => {
    if (activeCategory === 'all') return true;
    if (activeCategory === 'defi') {
      return (
        system.projectId === 'dyve' ||
        system.projectId === 'satsuma' ||
        system.projectId === 'etherfi-demo' ||
        system.projectId === 'cryptech'
      );
    }
    if (activeCategory === 'infra') {
      return (
        system.projectId === 'open-source-contributions' ||
        system.projectId === 'monad-heartbeat' ||
        system.projectId === 'agos'
      );
    }
    if (activeCategory === 'ai') {
      return (
        system.projectId === 'craidle' ||
        system.name.toLowerCase().includes('ai') ||
        system.domain.toLowerCase().includes('ai')
      );
    }
    return true;
  });

  const handleFilterClick = (catId: string, label: string) => {
    setActiveCategory(catId);
    trackEvent('reel_filter_select', {
      category_id: catId,
      category_label: label,
      resulting_count: systems.length,
    });
  };

  return (
    <div className="w-full">
      {/* Category Filter Strip */}
      <div className="flex flex-wrap items-center gap-2 mb-8">
        <span className="text-xs font-mono uppercase text-[var(--text-subtle)] mr-2">
          SYSTEM FILTER:
        </span>
        {CATEGORIES.map((cat) => {
          const isSelected = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => handleFilterClick(cat.id, cat.label)}
              className={`text-xs font-mono px-3 py-1.5 rounded-full border transition-all ${
                isSelected
                  ? 'bg-[var(--text)] text-white border-[var(--text)] shadow-xs'
                  : 'bg-[var(--surface)] text-[var(--text-muted)] border-[var(--border)] hover:border-[var(--border-strong)]'
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Grid of System Feature Cards */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {filteredSystems.map((system, i) => (
          <button
            key={system.name}
            type="button"
            onClick={() => {
              if (system.projectId) {
                trackCaseStudyEvent('open', system.projectId, {
                  source: 'production_reel_card',
                  category: activeCategory,
                });
                onOpenProject(system.projectId);
              }
            }}
            className="group card-interactive relative flex flex-col justify-between h-full w-full text-left rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-[var(--shadow-card)] overflow-hidden transition-all hover:border-amber-500/50 hover:shadow-lg"
          >
            {/* Visual background screenshot thumbnail */}
            {systemBackgrounds[system.projectId] && (
              <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden rounded-2xl">
                <div
                  className="absolute inset-0 bg-cover bg-no-repeat bg-right opacity-[0.14] transition-all duration-500 group-hover:scale-105 group-hover:opacity-[0.75] mix-blend-multiply"
                  style={{
                    backgroundImage: `url('${systemBackgrounds[system.projectId]}')`,
                  }}
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background: 'linear-gradient(110deg, var(--surface) 38%, transparent 80%)',
                  }}
                />
              </div>
            )}

            <div className="relative z-10 flex flex-col h-full w-full">
              {/* Card Header */}
              <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                <h3 className="text-base font-bold text-[var(--text)] transition-colors group-hover:text-[color:var(--accent-color)]">
                  {system.name}
                </h3>
                {system.badge && (
                  <span className="shrink-0 inline-flex items-center rounded-full bg-[color:var(--accent-color)]/10 px-2.5 py-0.5 text-[10px] font-mono uppercase font-semibold text-[color:var(--accent-color)] border border-[color:var(--accent-color)]/20">
                    {system.badge}
                  </span>
                )}
              </div>

              {/* Domain */}
              <p className="mt-1 text-xs text-[var(--text-muted)] font-medium">
                {system.domain}
              </p>

              {/* Integrations */}
              <div className="mt-4 flex flex-wrap gap-1">
                {system.integrations.slice(0, 4).map((tech) => (
                  <span
                    key={tech}
                    className="text-[10px] font-mono px-2 py-0.5 rounded bg-black/5 text-[var(--text-muted)] border border-[var(--border)]"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Outcome */}
              <p className="mt-4 text-xs leading-relaxed text-[var(--text-muted)] line-clamp-3">
                <span className="font-semibold text-[var(--text)]">Outcome · </span>
                {system.outcome}
              </p>

              {/* Action Button */}
              <div className="mt-6 pt-3 border-t border-[var(--border)] flex items-center justify-between text-xs font-semibold text-[color:var(--accent-color)]">
                <span>Inspect Architecture</span>
                <span className="transition-transform duration-200 group-hover:translate-x-1.5 font-bold">
                  →
                </span>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
