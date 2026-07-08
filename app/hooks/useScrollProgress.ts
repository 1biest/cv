'use client';

import { useEffect, useState } from 'react';

export type SectionProgress = {
  progress: number; // 0.0 (entering at bottom) to 1.0 (fully exited at top)
  active: boolean;  // is this the current section closest to being snapped
};

export function useScrollProgress(sectionIds: string[]) {
  const [progresses, setProgresses] = useState<Record<string, SectionProgress>>({});
  const [activeSection, setActiveSection] = useState<string>('');

  const sectionIdsKey = sectionIds.join(',');

  useEffect(() => {
    if (sectionIds.length === 0) return;

    const handleScroll = () => {
      const newProgresses: Record<string, SectionProgress> = {};
      let closestSectionId = '';
      let minDiff = Infinity;
      const vh = window.innerHeight;

      sectionIds.forEach((id) => {
        const el = document.getElementById(id);
        if (!el) return;

        const rect = el.getBoundingClientRect();
        
        // Calculate progress from 0.0 (entering bottom) to 1.0 (exiting top)
        // when rect.top = vh => progress = 0.0
        // when rect.top = 0 => progress = vh / (vh + height) ~ 0.5 (for height = vh)
        // when rect.top = -height => progress = 1.0
        const totalDist = vh + rect.height;
        const currentDist = vh - rect.top;
        const progress = totalDist > 0 ? Math.max(0, Math.min(1, currentDist / totalDist)) : 0.5;

        // Determine which section is currently centered or closest to the top of the viewport
        const diff = Math.abs(rect.top);
        if (diff < minDiff) {
          minDiff = diff;
          closestSectionId = id;
        }

        newProgresses[id] = {
          progress,
          active: false,
        };
      });

      if (closestSectionId) {
        setActiveSection(closestSectionId);
        if (newProgresses[closestSectionId]) {
          newProgresses[closestSectionId].active = true;
        }
      }

      setProgresses(newProgresses);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    
    // Initial run
    handleScroll();

    // Extra trigger to ensure correct positioning after layout shifts
    const timer = setTimeout(handleScroll, 150);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      clearTimeout(timer);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sectionIdsKey]);

  return { progresses, activeSection };
}
