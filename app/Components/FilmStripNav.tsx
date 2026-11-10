'use client';

import React, { useEffect, useRef } from 'react';
import { trackFilmstripNav } from '../lib/analytics';

export interface SystemFrame {
  id: string;
  category: string;
  number: string;
  label: string;
  title: string;
}

export const SYSTEM_FRAMES: SystemFrame[] = [
  { id: 'overview', category: 'OVERVIEW', number: '01', label: 'Intro', title: 'Design Engineer Overview' },
  { id: 'craft', category: 'CRAFT', number: '02', label: 'Craft', title: 'Convergence of Design, Engineering & Product' },
  { id: 'neptune', category: 'FLAGSHIP', number: '03', label: 'Neptune', title: 'DeFi Lending Architecture' },
  { id: 'agos', category: 'SPATIAL', number: '04', label: 'AgOS', title: '3D Spatial Operating System' },
  { id: 'systems', category: 'SYSTEMS', number: '05', label: 'Systems', title: 'Production Work' },
  { id: 'experience', category: 'HISTORY', number: '06', label: 'Experience', title: 'Leadership & Track Record' },
  { id: 'stack', category: 'TOOLKIT', number: '07', label: 'Stack', title: 'Engineering Primitives' },
  { id: 'contact', category: 'CONNECT', number: '08', label: 'Contact', title: 'Direct Engineering Hire' },
];

interface FilmStripNavProps {
  activeSection: string;
  onSelectFrame?: (frameId: string) => void;
  className?: string;
}

export default function FilmStripNav({
  activeSection,
  onSelectFrame,
  className = '',
}: FilmStripNavProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Map activeSection to corresponding system frame
  const currentFrame = SYSTEM_FRAMES.find((f) => f.id === activeSection) || SYSTEM_FRAMES[0];

  const handleFrameClick = (frame: SystemFrame) => {
    trackFilmstripNav(frame.id, frame.number, frame.label, 'click');
    if (onSelectFrame) {
      onSelectFrame(frame.id);
    } else {
      const el = document.getElementById(frame.id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  // Scroll active frame into view horizontally on smaller viewports
  useEffect(() => {
    if (!containerRef.current) return;
    const activeBtn = containerRef.current.querySelector<HTMLButtonElement>(`[data-frame-id="${currentFrame.id}"]`);
    if (activeBtn) {
      const parent = containerRef.current;
      const targetScroll = activeBtn.offsetLeft - parent.clientWidth / 2 + activeBtn.clientWidth / 2;
      parent.scrollTo({ left: Math.max(0, targetScroll), behavior: 'smooth' });
    }
  }, [currentFrame.id]);

  return (
    <div
      ref={containerRef}
      className={`relative flex items-center gap-1.5 overflow-x-auto py-1 px-1 scrollbar-none select-none scroll-smooth ${className}`}
      role="tablist"
      aria-label="Systems navigation strip"
    >
      {SYSTEM_FRAMES.map((frame) => {
        const isActive = currentFrame.id === frame.id;

        return (
          <button
            key={frame.id}
            data-frame-id={frame.id}
            role="tab"
            aria-selected={isActive}
            onClick={() => handleFrameClick(frame)}
            className={`group relative shrink-0 flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium transition-all duration-150 ${
              isActive
                ? 'bg-[var(--text)] text-white shadow-xs'
                : 'text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-black/5'
            }`}
            title={`${frame.number} · ${frame.title}`}
          >
            {/* Filmstrip Frame Perforation / Monospace Index */}
            <span
              className={`font-mono text-[9px] px-1 py-0.2 rounded font-semibold tracking-tight transition-colors ${
                isActive
                  ? 'bg-amber-400 text-neutral-950 font-bold'
                  : 'bg-black/5 text-[var(--text-subtle)] group-hover:text-[var(--text)]'
              }`}
            >
              {frame.number}
            </span>

            {/* Frame Label */}
            <span className="tracking-tight whitespace-nowrap">
              {frame.label}
            </span>

            {/* Sprocket-style active pip */}
            {isActive && (
              <span className="w-1 h-1 rounded-full bg-amber-400" />
            )}
          </button>
        );
      })}
    </div>
  );
}
