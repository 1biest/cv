'use client';

import React from 'react';
import { trackEvent } from '../../lib/analytics';

interface ProjectHeroProps {
  title: string;
  subtitle: string;
  summary: string;
  links?: {
    label: string;
    url: string;
    primary?: boolean;
  }[];
  badge?: string;
}

export const ProjectHero: React.FC<ProjectHeroProps> = ({
  title,
  subtitle,
  summary,
  links,
  badge,
}) => {
  return (
    <section className="pb-12 pt-4 md:pb-16 md:pt-2">
      <div className="mx-auto max-w-3xl">
        <div className="flex flex-wrap items-center gap-3 mb-3">
          <h1 className="font-[family-name:var(--font-display)] text-4xl font-semibold tracking-tight text-[var(--text)] md:text-5xl">
            {title}
          </h1>
          {badge && (
            <span className="inline-flex items-center rounded-full bg-[color:var(--accent-color)]/10 px-2.5 py-0.5 text-xs font-semibold tracking-wider uppercase text-[color:var(--accent-color)] border border-[color:var(--accent-color)]/20">
              {badge}
            </span>
          )}
        </div>
        <h2 className="mb-8 text-xl font-medium text-[var(--text-muted)] md:text-2xl">
          {subtitle}
        </h2>
        <p className="mb-10 max-w-2xl text-lg leading-relaxed text-[var(--text-muted)] md:text-xl">
          {summary}
        </p>

        {links && links.length > 0 && (
          <div className="flex flex-wrap gap-3">
            {links.map((link, index) => (
              <a
                key={index}
                href={link.url}
                target={link.url.startsWith('http') ? '_blank' : undefined}
                rel={link.url.startsWith('http') ? 'noopener noreferrer' : undefined}
                onClick={() => trackEvent('click_case_study_link', { project_title: title, link_label: link.label, link_url: link.url })}
                className={`inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold transition ${
                  link.primary
                    ? 'bg-[var(--text)] text-white hover:bg-[color:var(--accent-color)] hover:text-white'
                    : 'border border-[var(--border)] bg-[var(--surface)] text-[var(--text)] hover:border-[color:var(--accent-color)]'
                }`}
              >
                {link.label}
              </a>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
