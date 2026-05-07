import React, { ReactNode } from 'react';

interface SectionWrapperProps {
  children: ReactNode;
  id?: string;
  title?: string;
  className?: string;
  noPadding?: boolean;
}

export const SectionWrapper: React.FC<SectionWrapperProps> = ({
  children,
  id,
  title,
  className = '',
  noPadding = false,
}) => {
  return (
    <section id={id} className={`${noPadding ? '' : 'py-10 md:py-14'} ${className}`}>
      <div className="mx-auto max-w-3xl">
        {title && (
          <h2 className="mb-6 font-[family-name:var(--font-display)] text-2xl font-semibold tracking-tight text-[var(--text)] md:text-3xl">
            {title}
          </h2>
        )}
        <div className="max-w-prose space-y-4 leading-relaxed text-[var(--text-muted)]">
          {children}
        </div>
      </div>
    </section>
  );
};
