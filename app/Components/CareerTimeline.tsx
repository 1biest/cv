'use client';

import React from 'react';
import { Project } from '../types/projects';
import { trackCaseStudyEvent } from '../lib/analytics';

interface CareerTimelineProps {
  employmentRoles: Project[];
  onOpenProject: (projectId: string) => void;
}

const COMPANY_DATES: Record<string, string> = {
  'cryptech-developments': '2022 — 2026',
  'stakefish': '2020 — 2022',
  'artrageous-advertising': '2016 — 2020',
  'davis-automotive': '2014 — 2016',
};

export default function CareerTimeline({ employmentRoles, onOpenProject }: CareerTimelineProps) {
  return (
    <div className="w-full">
      <div className="relative pl-6 sm:pl-8 before:absolute before:left-2 sm:before:left-3 before:top-3 before:bottom-3 before:w-px before:bg-gradient-to-b before:from-amber-400 before:via-[var(--border-strong)] before:to-transparent">
        <div className="space-y-10 sm:space-y-12">
          {employmentRoles.map((role, idx) => {
            const dateRange = COMPANY_DATES[role.id] || '2022 — Present';

            return (
              <div
                key={role.id}
                className="group relative transition-all"
              >
                {/* Timeline node marker */}
                <div className="absolute -left-[27px] sm:-left-[35px] top-1.5 flex items-center justify-center">
                  <div className="h-4 w-4 rounded-full border-2 border-[var(--bg-page)] bg-amber-400 shadow-[0_0_10px_rgba(251,191,36,0.6)] group-hover:scale-125 transition-transform" />
                </div>

                <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 sm:p-7 shadow-[var(--shadow-card)] transition hover:border-[var(--border-strong)]">
                  {/* Top bar with dates and role badge */}
                  <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-[var(--border)]">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-amber-500 uppercase tracking-widest">
                        {dateRange}
                      </span>
                      {role.badge && (
                        <span className="inline-flex items-center rounded-full bg-[color:var(--accent-color)]/10 px-2 py-0.5 text-[10px] font-semibold tracking-wider uppercase text-[color:var(--accent-color)] border border-[color:var(--accent-color)]/20">
                          {role.badge}
                        </span>
                      )}
                    </div>
                    <span className="text-xs font-mono text-[var(--text-subtle)]">
                      ROLE 0{idx + 1}
                    </span>
                  </div>

                  {/* Main Role & Company */}
                  <div className="mt-4 flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
                    <h3 className="text-xl sm:text-2xl font-bold text-[var(--text)] tracking-tight">
                      {role.title}
                    </h3>
                    <span className="text-sm font-semibold text-[color:var(--accent-color)]">
                      {role.role || 'Design Engineer'}
                    </span>
                  </div>

                  {role.roleDescriptor && (
                    <p className="mt-2 text-sm text-[var(--text-muted)] leading-relaxed font-normal">
                      {role.roleDescriptor}
                    </p>
                  )}

                  {/* Highlights */}
                  {role.highlights && role.highlights.length > 0 && (
                    <ul className="mt-4 space-y-2 text-xs sm:text-sm text-[var(--text-muted)] list-disc pl-4 marker:text-amber-500">
                      {role.highlights.map((h, hIdx) => (
                        <li key={hIdx} className="leading-relaxed">
                          {h}
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* Stack pills & Deep dive CTA */}
                  <div className="mt-6 pt-4 border-t border-[var(--border)] flex flex-wrap items-center justify-between gap-4">
                    {role.stack && (
                      <div className="flex flex-wrap gap-1.5">
                        {(typeof role.stack === 'string'
                          ? role.stack.split(/[,·•|]/).map((s) => s.trim()).filter(Boolean)
                          : []
                        ).map((tech) => (
                          <span
                            key={tech}
                            className="text-[11px] font-mono px-2 py-0.5 rounded bg-[var(--surface)] border border-[var(--border)] text-[var(--text-muted)]"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}

                    <button
                      type="button"
                      onClick={() => {
                        trackCaseStudyEvent('open', role.id, { source: 'credits_timeline' });
                        onOpenProject(role.id);
                      }}
                      className="group/cta inline-flex items-center gap-1.5 text-xs font-bold text-[color:var(--accent-color)] hover:underline ml-auto"
                    >
                      <span>Inspect Role Details</span>
                      <span className="transition-transform duration-200 group-hover/cta:translate-x-1">
                        →
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
