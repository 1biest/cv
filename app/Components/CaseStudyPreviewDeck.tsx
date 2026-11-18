'use client';

import Image from 'next/image';
import React, { useState } from 'react';

export interface PreviewFrame {
  src: string;
  alt: string;
  label: string;
  tag: string;
  caption: string;
}

interface CaseStudyPreviewDeckProps {
  frames: readonly PreviewFrame[];
  onInspect: () => void;
  totalArtifactsCount?: number;
  footerSummarySuffix?: string;
  stageBgClassName?: string;
  groupAriaLabel: string;
  openAriaPrefix: string;
}

export default function CaseStudyPreviewDeck({
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

  return (
    <div>
      <div className="relative rounded-2xl border border-[var(--border-strong)] bg-[var(--surface)] glass-surface p-2 shadow-[var(--shadow-card)] overflow-hidden transition hover:border-[#0a2540]/45">
        <button
          type="button"
          onClick={onInspect}
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
                onClick={() => setActiveIndex(idx)}
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
          onClick={onInspect}
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
