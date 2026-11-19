'use client';

import Image from 'next/image';
import React, { useState } from 'react';
import { trackCaseStudyEvent } from '../lib/analytics';

export interface PreviewFrame {
  src: string;
  alt: string;
  label: string;
  tag: string;
  caption: string;
}

interface CaseStudyPreviewDeckProps {
  projectId: string;
  frames: readonly PreviewFrame[];
  onInspect: () => void;
  totalArtifactsCount?: number;
  footerSummarySuffix?: string;
  stageBgClassName?: string;
  groupAriaLabel: string;
  openAriaPrefix: string;
}

export default function CaseStudyPreviewDeck({
  projectId,
  frames,
  onInspect,
  totalArtifactsCount,
  footerSummarySuffix,
  stageBgClassName = 'bg-[#0a1929]',
  groupAriaLabel,
  openAriaPrefix,
}: CaseStudyPreviewDeckProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeFrame = frames[activeIndex] ?? frames[0];
  const artifactTotal = totalArtifactsCount ?? frames.length;

  if (!activeFrame) return null;

  const handleOpenFromDeck = (source: 'preview_deck_stage' | 'preview_deck_footer_cta') => {
    trackCaseStudyEvent('open', projectId, {
      source,
      active_frame_label: activeFrame.label,
      active_frame_index: activeIndex + 1,
    });
    onInspect();
  };

  return (
    <div>
      <div className="relative rounded-2xl border border-[var(--border-strong)] bg-[var(--surface)] glass-surface p-2 shadow-[var(--shadow-card)] overflow-hidden transition hover:border-[#0a2540]/45">
        <button
          type="button"
          onClick={() => handleOpenFromDeck('preview_deck_stage')}
          className="w-full text-left block group cursor-pointer focus-visible:outline-none"
          aria-label={`${openAriaPrefix} (${activeFrame.caption})`}
        >
          <div
            className={`relative aspect-[16/10] w-full overflow-hidden rounded-xl border border-[var(--border)] ${stageBgClassName}`}
          >
            <Image
              src={activeFrame.src}
              alt={activeFrame.alt}
              fill
              sizes="(max-width: 1024px) 100vw, 390px"
              className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
              priority={false}
            />
          </div>
        </button>

        {/* Inline screen switcher */}
        <div
          className="mt-2 grid grid-cols-4 gap-1.5"
          role="group"
          aria-label={groupAriaLabel}
        >
          {frames.map((frame, idx) => {
            const isSelected = idx === activeIndex;
            return (
              <button
                key={frame.src}
                type="button"
                onClick={() => {
                  setActiveIndex(idx);
                  trackCaseStudyEvent('preview_select', projectId, {
                    frame_index: idx + 1,
                    frame_label: frame.label,
                    frame_tag: frame.tag,
                    frame_caption: frame.caption,
                    frame_src: frame.src,
                  });
                }}
                aria-pressed={isSelected}
                className={`group/thumb relative overflow-hidden rounded-lg border text-left transition cursor-pointer ${
                  isSelected
                    ? 'border-[#0a2540] ring-1 ring-[#0a2540]/40 bg-[#0a2540]/[0.06]'
                    : 'border-[var(--border)] opacity-75 hover:opacity-100 hover:border-[#0a2540]/40'
                }`}
              >
                <div
                  className={`relative aspect-[16/10] w-full overflow-hidden ${stageBgClassName}`}
                >
                  <Image
                    src={frame.src}
                    alt={frame.label}
                    fill
                    sizes="96px"
                    className="object-cover object-top"
                  />
                </div>
                <span
                  className={`block truncate px-1.5 py-1 text-[9px] font-mono font-semibold uppercase tracking-wider ${
                    isSelected ? 'text-[#0a2540]' : 'text-[var(--text-subtle)]'
                  }`}
                >
                  {frame.label}
                </span>
              </button>
            );
          })}
        </div>

        <button
          type="button"
          onClick={() => handleOpenFromDeck('preview_deck_footer_cta')}
          className="mt-2 w-full rounded-xl bg-[#0a2540] px-4 py-2.5 text-white flex items-center justify-between text-[11px] font-mono cursor-pointer transition hover:bg-[var(--accent-hover)]"
        >
          <span>{activeFrame.tag}</span>
          <span className="text-[#e5c488] font-semibold">
            {`INSPECT GALLERY (${artifactTotal}) ↗`}
          </span>
        </button>
      </div>
      <p className="mt-3 text-center text-xs text-[var(--text-subtle)] font-mono">
        {activeFrame.caption}
        {footerSummarySuffix ? ` · ${footerSummarySuffix}` : ''}
      </p>
    </div>
  );
}
