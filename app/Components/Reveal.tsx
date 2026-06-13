'use client';

import { useEffect, useRef, useState, type ElementType, type ReactNode } from 'react';

const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

type RevealProps = {
  children: ReactNode;
  as?: ElementType;
  index?: number;
  className?: string;
  /** Reveal on mount instead of on scroll-into-view (use for above-the-fold content). */
  immediate?: boolean;
};

export default function Reveal({
  children,
  as: Tag = 'div',
  index = 0,
  className = '',
  immediate = false,
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion()) {
      setShown(true);
      return;
    }

    if (immediate) {
      const raf = requestAnimationFrame(() => setShown(true));
      return () => cancelAnimationFrame(raf);
    }

    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry], obs) => {
        if (entry.isIntersecting) {
          setShown(true);
          obs.unobserve(entry.target);
        }
      },
      { rootMargin: '0px 0px -12% 0px', threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [immediate]);

  return (
    <Tag
      ref={ref}
      data-reveal=""
      data-revealed={shown ? '' : undefined}
      style={{ ['--reveal-i' as string]: index }}
      className={className}
    >
      {children}
    </Tag>
  );
}
