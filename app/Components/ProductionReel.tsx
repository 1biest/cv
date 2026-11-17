'use client';

import Image from 'next/image';
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
  tracks?: string[];
}

interface ProductionReelProps {
  systems: SystemItem[];
  systemBackgrounds: Record<string, string>;
  onOpenProject: (projectId: string) => void;
  activeFilter?: string;
  onFilterChange?: (categoryId: string) => void;
}

const CATEGORIES = [
  { id: 'all', label: 'All Systems' },
  { id: 'defi', label: 'Frontend & DeFi' },
  { id: 'infra', label: 'Infrastructure & Open Source' },
  { id: 'ai', label: 'AI & Agentic Systems' },
] as const;

export default function ProductionReel({
  systems,
  systemBackgrounds,
  onOpenProject,
  activeFilter,
  onFilterChange,
}: ProductionReelProps) {
  const [internalFilter, setInternalFilter] = useState<string>('all');
  const activeCategory = activeFilter ?? internalFilter;

  const filteredSystems = systems.filter((system) => {
    if (activeCategory === 'all') return true;
    if (system.tracks && system.tracks.includes(activeCategory)) return true;
    if (activeCategory === 'defi') {
      return (
        system.projectId === 'dyve' ||
        system.projectId === 'satsuma' ||
        system.projectId === 'etherfi-demo' ||
        system.projectId === 'cryptech' ||
        system.projectId === 'neptune-finance'
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
        system.projectId === 'satsuma' ||
        system.projectId === 'agos' ||
        system.name.toLowerCase().includes('ai') ||
        system.domain.toLowerCase().includes('ai')
      );
    }
    return true;
  });

  const handleFilterClick = (catId: string, label: string) => {
    if (onFilterChange) {
      onFilterChange(catId);
    } else {
      setInternalFilter(catId);
    }
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
        <span className="text-xs font-mono uppercase tracking-wider text-[var(--text-subtle)] mr-1">
          FILTER:
        </span>
        <div className="inline-flex flex-wrap gap-1 rounded-full border border-[var(--border)] bg-[#0a2540]/[0.04] p-1">
          {CATEGORIES.map((cat) => {
            const isSelected = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => handleFilterClick(cat.id, cat.label)}
                className={`text-xs font-medium px-3 py-1 rounded-full transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#0a2540] text-white shadow-xs'
                    : 'text-[var(--text-muted)] hover:text-[#0a2540] hover:bg-[#0a2540]/[0.06]'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Grid of System Feature Cards */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {filteredSystems.map((system) => {
          const bgSrc = systemBackgrounds[system.projectId];
          return (
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
              className="group card-interactive relative flex flex-col justify-between h-full w-full text-left rounded-2xl border border-[var(--border)] bg-[var(--surface)] glass-surface p-6 shadow-[var(--shadow-card)] overflow-hidden transition-all hover:border-[#0a2540]/35 cursor-pointer"
            >
              {/* Compressed thumbnail / architecture SVG preview */}
              {bgSrc ? (
                <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden rounded-2xl">
                  <Image
                    src={bgSrc}
                    alt=""
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover object-right opacity-[0.12] transition-all duration-500 group-hover:scale-105 group-hover:opacity-[0.3]"
                  />
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        'linear-gradient(108deg, rgba(250, 250, 248, 0.96) 54%, rgba(250, 250, 248, 0.72) 100%)',
                    }}
                  />
                </div>
              ) : null}

              <div className="relative z-10 flex flex-col h-full w-full">
                {/* Card Header */}
                <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                  <h3 className="text-base font-bold text-[var(--text)] transition-colors group-hover:text-[#0a2540]">
                    {system.name}
                  </h3>
                  {system.badge ? (
                    <span className="shrink-0 inline-flex items-center rounded-full bg-[#0a2540]/[0.07] px-2.5 py-0.5 text-[10px] font-mono uppercase font-semibold text-[#0a2540] border border-[#0a2540]/20">
                      {system.badge}
                    </span>
                  ) : null}
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
                      className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-[#0a2540]/[0.04] text-[var(--text-muted)] border border-[var(--border)]"
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
                <div className="mt-auto pt-4 border-t border-[var(--border)] flex items-center justify-between text-xs font-semibold text-[#0a2540]">
                  <span>Inspect Architecture</span>
                  <span className="transition-transform duration-200 group-hover:translate-x-1.5 font-bold">
                    →
                  </span>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
