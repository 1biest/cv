import { useEffect, useRef, useState } from 'react';

export function useScrollProgress(sectionIds: string[]) {
  const [activeSection, setActiveSection] = useState<string>(sectionIds[0] || '');
  const activeRef = useRef<string>(sectionIds[0] || '');

  useEffect(() => {
    const ids = sectionIds;
    if (ids.length === 0) return;

    let rafId: number | null = null;

    const computeActiveSection = () => {
      rafId = null;
      const viewportAnchor = window.innerHeight * 0.35;
      let closestId = activeRef.current || ids[0];
      let minDistance = Infinity;

      for (const id of ids) {
        const el = document.getElementById(id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        const distance =
          rect.top <= viewportAnchor && rect.bottom >= viewportAnchor
            ? 0
            : Math.min(
                Math.abs(rect.top - viewportAnchor),
                Math.abs(rect.bottom - viewportAnchor),
              );
        if (distance < minDistance) {
          minDistance = distance;
          closestId = id;
        }
      }

      if (closestId !== activeRef.current) {
        activeRef.current = closestId;
        setActiveSection(closestId);
      }
    };

    const handleScroll = () => {
      if (rafId !== null) return;
      rafId = window.requestAnimationFrame(computeActiveSection);
    };

    computeActiveSection();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      if (rafId !== null) {
        window.cancelAnimationFrame(rafId);
      }
    };
  }, [sectionIds]);

  return { activeSection };
}
