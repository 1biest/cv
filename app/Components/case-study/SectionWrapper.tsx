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
    <section id={id} className={`${noPadding ? '' : 'py-12 md:py-16'} ${className}`}>
      <div className="max-w-3xl mx-auto px-6">
        {title && (
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 tracking-tight">{title}</h2>
        )}
        <div className="text-gray-300 space-y-4 leading-relaxed max-w-prose">{children}</div>
      </div>
    </section>
  );
};
