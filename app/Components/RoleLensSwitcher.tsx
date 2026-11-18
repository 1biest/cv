'use client';

import {
  ROLE_LENSES,
  ROLE_LENS_ORDER,
  type RoleLens,
  type RoleProofItem,
} from '../lib/roleLenses';
import { trackRecruiterAction } from '../lib/analytics';

interface RoleLensSwitcherProps {
  activeLens: RoleLens;
  onSelectLens: (lens: RoleLens) => void;
  onOpenProject: (projectId: string) => void;
  onNavigateSection: (sectionId: string) => void;
}

export default function RoleLensSwitcher({
  activeLens,
  onSelectLens,
  onOpenProject,
  onNavigateSection,
}: RoleLensSwitcherProps) {
  const current = ROLE_LENSES[activeLens];

  const handleProofAction = (item: RoleProofItem) => {
    trackRecruiterAction('view_summary', {
      lens: activeLens,
      proof_title: item.title,
      action_type: item.actionType,
      target: item.targetId,
    });
    if (item.actionType === 'drawer') {
      onOpenProject(item.targetId);
    } else {
      onNavigateSection(item.targetId);
    }
  };

  return (
    <div className="mt-8 rounded-2xl border border-[var(--border-strong)] bg-[var(--surface)] glass-surface p-5 sm:p-6 shadow-[var(--shadow-card)]">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between border-b border-[var(--border)] pb-4">
        <div>
          <p className="font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-[var(--accent-warm)]">
            Tailor Portfolio View by Hiring Track
          </p>
          <p className="mt-1 text-sm font-semibold text-[var(--text)]">
            {current.headline}
          </p>
        </div>

        <div
          className="inline-flex flex-wrap gap-1 rounded-full border border-[var(--border)] bg-[#0a2540]/[0.04] p-1"
          role="tablist"
          aria-label="Hiring role lens selector"
        >
          {ROLE_LENS_ORDER.map((lensId) => {
            const lens = ROLE_LENSES[lensId];
            const isSelected = activeLens === lensId;
            return (
              <button
                key={lensId}
                type="button"
                role="tab"
                aria-selected={isSelected}
                onClick={() => {
                  onSelectLens(lensId);
                  trackRecruiterAction('view_summary', { lens_selected: lensId });
                }}
                className={`rounded-full px-3 py-1.5 text-xs font-medium transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#0a2540] text-white shadow-xs'
                    : 'text-[var(--text-muted)] hover:text-[#0a2540] hover:bg-[#0a2540]/[0.06]'
                }`}
              >
                {lens.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm leading-relaxed text-[var(--text-muted)] max-w-3xl">
          {current.summary}
        </p>

        <a
          href={current.resumeHref}
          download
          onClick={() =>
            trackRecruiterAction('resume_download', {
              source: 'role_lens_switcher',
              lens: activeLens,
            })
          }
          className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-[#0a2540] px-4 py-2 text-xs font-semibold text-white shadow-xs transition hover:bg-[var(--accent-hover)]"
        >
          <span>Download {current.resumeLabel}</span>
          <span aria-hidden="true">↗</span>
        </a>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-3 md:grid-cols-3">
        {current.proofItems.map((item) => (
          <button
            key={`${current.id}-${item.title}`}
            type="button"
            onClick={() => handleProofAction(item)}
            className="card-interactive group flex flex-col justify-between rounded-xl border border-[var(--border)] bg-white/70 p-4 text-left transition hover:border-[#0a2540]/35 hover:bg-white/95 cursor-pointer"
          >
            <div>
              <div className="flex items-center justify-between gap-2">
                <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[var(--accent-warm)]">
                  {item.badge}
                </span>
                <span className="font-mono text-[10px] font-semibold text-[var(--text-subtle)]">
                  {item.metric}
                </span>
              </div>
              <h3 className="mt-1.5 text-sm font-semibold text-[var(--text)] group-hover:text-[#0a2540]">
                {item.title}
              </h3>
              <p className="mt-1.5 text-xs leading-relaxed text-[var(--text-muted)]">
                {item.description}
              </p>
            </div>

            <span className="mt-3 inline-flex items-center gap-1 font-mono text-[11px] font-semibold text-[#0a2540] group-hover:underline">
              {item.actionLabel} →
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
