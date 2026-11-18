'use client';

import React from 'react';
import { Project } from '../types/projects';
import { trackCaseStudyEvent } from '../lib/analytics';

interface CareerTimelineProps {
  employmentRoles: Project[];
  onOpenProject: (projectId: string) => void;
}

const COMPANY_DATES: Record<string, string> = {
  'cryptech-developments': 'Aug 2022 — May 2026',
  'stakefish': 'Oct 2020 — Aug 2022',
  'artrageous-advertising': 'Dec 2019 — Oct 2020',
  'flat-land-farms': 'Sep 2017 — Oct 2019',
  'davis-automotive': 'Apr 2013 — Aug 2017',
};

export default function CareerTimeline({ employmentRoles, onOpenProject }: CareerTimelineProps) {
  return (
    <div className="w-full">
      <div className="relative pl-6 sm:pl-8 before:absolute before:left-2 sm:before:left-3 before:top-3 before:bottom-3 before:w-px before:bg-gradient-to-b before:from-[#0a2540] before:via-[var(--border-strong)] before:to-transparent">
        <div className="space-y-8 sm:space-y-10">
          {employmentRoles.map((role, idx) => {
            const dateRange = COMPANY_DATES[role.id] || role.roleDescriptor || 'Experience';
            const bulletItems =
              role.achievements && role.achievements.length > 0
                ? role.achievements
                : role.highlights;

            return (
              <div
                key={role.id}
                className="group relative transition-all"
              >
                {/* Timeline node marker */}
                <div className="absolute -left-[27px] sm:-left-[35px] top-6 flex items-center justify-center">
                  <div className="flex h-4 w-4 items-center justify-center rounded-full border-2 border-[var(--bg-page)] bg-[#0a2540] shadow-xs group-hover:scale-125 transition-transform">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#e5c488]" />
                  </div>
                </div>

                <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] glass-surface p-6 sm:p-7 shadow-[var(--shadow-card)] transition hover:border-[#0a2540]/35">
                  {/* Top bar with dates and role badge */}
                  <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-[var(--border)]">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-[var(--accent-warm)] uppercase tracking-widest">
                        {dateRange}
                      </span>
                      {role.badge && (
                        <span className="inline-flex items-center rounded-full bg-[#0a2540]/[0.07] px-2.5 py-0.5 text-[10px] font-mono font-semibold tracking-wider uppercase text-[#0a2540] border border-[#0a2540]/20">
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
                    <span className="text-sm font-semibold text-[#0a2540]">
                      {role.role || 'Design Engineer'}
                    </span>
                  </div>

                  {role.roleDescriptor && (
                    <p className="mt-2 text-sm text-[var(--text-muted)] leading-relaxed font-normal">
                      {role.roleDescriptor}
                    </p>
                  )}

                  {/* Concrete Achievements / Highlights */}
                  {bulletItems && bulletItems.length > 0 && (
                    <ul className="mt-4 space-y-2 text-xs sm:text-sm text-[var(--text-muted)] list-disc pl-4 marker:text-[#0a2540]">
                      {bulletItems.map((h, hIdx) => (
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
                            className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-[#0a2540]/[0.04] border border-[var(--border)] text-[var(--text-muted)]"
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
                      className="group/cta inline-flex items-center gap-1.5 text-xs font-bold text-[#0a2540] hover:underline ml-auto"
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
