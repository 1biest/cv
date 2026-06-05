'use client';

import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faLink, faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons';

interface CaseStudyDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
  projectTitle: string;
  projectUrl: string;
  children: React.ReactNode;
}

export default function CaseStudyDrawer({
  isOpen,
  onClose,
  onNext,
  onPrev,
  projectTitle,
  projectUrl,
  children,
}: CaseStudyDrawerProps) {
  const [copied, setCopied] = useState(false);
  const [isRendered, setIsRendered] = useState(false);
  const [animateShow, setAnimateShow] = useState(false);

  // Handle animation lifecycle
  useEffect(() => {
    if (isOpen) {
      setIsRendered(true);
      // Let rendering complete before adding opacity/transform classes
      const timer = setTimeout(() => {
        setAnimateShow(true);
      }, 10);
      return () => clearTimeout(timer);
    } else {
      setAnimateShow(false);
      const timer = setTimeout(() => {
        setIsRendered(false);
      }, 300); // match transition duration
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isOpen]);

  // Keyboard handler for Esc
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const copyLink = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(projectUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy link', err);
    }
  };

  if (!isRendered) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex justify-end overflow-hidden"
      role="dialog"
      aria-modal="true"
    >
      {/* Backdrop overlay */}
      <div
        className={`absolute inset-0 bg-neutral-950/20 backdrop-blur-sm transition-opacity duration-300 ${
          animateShow ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Slide-over panel */}
      <div
        className={`relative flex h-full w-full flex-col border-l border-[var(--border)] bg-[var(--surface)] shadow-2xl transition-transform duration-300 ease-out sm:max-w-4xl ${
          animateShow ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Sticky Header */}
        <header className="sticky top-0 z-20 flex items-center justify-between border-b border-[var(--border)] bg-[var(--surface)]/95 px-6 py-4 backdrop-blur-md">
          <div className="flex items-center gap-3 overflow-hidden">
            <button
              onClick={onClose}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[var(--border)] text-[var(--text-muted)] hover:bg-neutral-100 hover:text-[var(--text)] transition"
              aria-label="Close case study"
            >
              <FontAwesomeIcon icon={faXmark} className="text-base" />
            </button>
            <span className="hidden text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)] sm:inline">
              Case Study
            </span>
            <span className="hidden text-xs text-[var(--text-muted)] sm:inline">/</span>
            <h2 className="truncate text-base font-semibold text-[var(--text)]">{projectTitle}</h2>
          </div>

          <div className="flex items-center gap-2">
            {/* Share link button */}
            <button
              onClick={copyLink}
              className="relative flex h-10 px-4 items-center justify-center gap-2 rounded-full border border-[var(--border)] text-xs font-semibold text-[var(--text)] hover:border-neutral-400 hover:bg-neutral-50 transition"
            >
              <FontAwesomeIcon icon={faLink} />
              <span>{copied ? 'Copied!' : 'Copy Link'}</span>
            </button>
          </div>
        </header>

        {/* Scrollable Case Study Content */}
        <div className="flex-1 overflow-y-auto px-6 py-8 md:px-12 md:py-12">
          <div className="mx-auto max-w-3xl">{children}</div>
        </div>

        {/* Footer Navigation */}
        <footer className="border-t border-[var(--border)] bg-neutral-50/90 px-6 py-4 backdrop-blur-md">
          <div className="mx-auto flex max-w-3xl items-center justify-between gap-4">
            <button
              onClick={onPrev}
              className="flex items-center gap-2 text-sm font-semibold text-[var(--text-muted)] hover:text-[var(--text)] transition"
            >
              <FontAwesomeIcon icon={faArrowLeft} />
              <span>Previous</span>
            </button>
            <button
              onClick={onNext}
              className="flex items-center gap-2 text-sm font-semibold text-[var(--text-muted)] hover:text-[var(--text)] transition"
            >
              <span>Next Project</span>
              <FontAwesomeIcon icon={faArrowRight} />
            </button>
          </div>
        </footer>
      </div>
    </div>
  );
}
