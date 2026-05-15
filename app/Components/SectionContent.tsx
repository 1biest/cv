import React, { useEffect, useState } from 'react';
import { Experience } from '../page';
import { useLinkPreviews } from '../hooks/useOpenGraph';
import { ThemeAccentColor } from '../config';
import ImageGallery from './ImageGallery';

type SectionContentProps = {
  experience: Experience[];
  highlightIndex: number;
};

const SectionContent: React.FC<SectionContentProps> = ({ experience, highlightIndex }) => {
  const currentExperience = experience[highlightIndex];

  const { title, group, content, content2, content3, highlights, ctas, ctaPanelOverrides } =
    currentExperience;
  const { data: previews, loading } = useLinkPreviews(ctas || []);

  const [hiddenCta, setHiddenCta] = useState(true);

  useEffect(() => {
    setHiddenCta(true);
  }, [highlightIndex]);

  useEffect(() => {
    if (!loading) {
      setHiddenCta(false);
    }
  }, [loading]);

  return (
    <div className="relative flex max-w-3xl flex-col gap-6">
      <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--text-muted)]">
        {group === 'professional-experience'
          ? 'Professional Experience'
          : group === 'protocol-ecosystem'
            ? 'Protocol / Ecosystem Work'
            : 'Projects'}
      </span>
      <h4 className="font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight text-[var(--text)] md:text-4xl">
        {title || ''}
      </h4>

      <div className="flex max-w-none flex-col gap-4 text-base md:text-lg">
        {content && (
          <p
            className="leading-relaxed text-[var(--text-muted)] [&_a]:font-semibold [&_a]:text-[var(--text)] [&_a:hover]:text-[color:var(--accent-color)] [&_a]:underline-offset-2 [&_strong]:text-[var(--text)]"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        )}
        {content2 && (
          <p
            className="leading-relaxed text-[var(--text-muted)] [&_a]:font-semibold [&_a]:text-[var(--text)] [&_a:hover]:text-[color:var(--accent-color)] [&_a]:underline-offset-2 [&_strong]:text-[var(--text)]"
            dangerouslySetInnerHTML={{ __html: content2 }}
          />
        )}
        {content3 && (
          <p
            className="leading-relaxed text-[var(--text-muted)] [&_a]:font-semibold [&_a]:text-[var(--text)] [&_a:hover]:text-[color:var(--accent-color)] [&_a]:underline-offset-2 [&_strong]:text-[var(--text)]"
            dangerouslySetInnerHTML={{ __html: content3 }}
          />
        )}
      </div>

      {highlights && highlights.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {highlights.map((highlight, index) => (
            <span
              key={index}
              className="rounded-full px-3 py-1 text-xs font-semibold text-white"
              style={{ backgroundColor: ThemeAccentColor }}
            >
              {highlight}
            </span>
          ))}
        </div>
      )}

      <ImageGallery images={currentExperience.images} />

      <div className="flex flex-col">
        <h3 className="mb-4 text-lg font-semibold text-[var(--text)]">Links</h3>
        <div className="flex flex-wrap gap-3">
          {previews?.map((preview, index) => {
            if (!preview) return null;
            if (loading) return null;
            if (hiddenCta) return null;

            const { url, image, title: previewTitle, description } = preview;
            const override = ctaPanelOverrides?.[index];
            const panelTitle = override?.title ?? previewTitle;
            const panelDescription = override?.description ?? description;

            return (
              <a
                key={`${url}-${index}`}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="grid h-28 w-full max-w-xl animate-fadeIn grid-cols-3 overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--surface)] shadow-sm transition hover:border-[color:var(--accent-color)] hover:shadow-md no-underline"
              >
                {image && (
                  <div
                    className="h-full w-full bg-cover bg-center"
                    style={{ backgroundImage: `url(${image})` }}
                  />
                )}
                <div className="col-span-2 flex flex-col justify-between p-3 text-left">
                  <div className="line-clamp-2 text-sm font-semibold leading-snug text-[var(--text)] hover:text-[color:var(--accent-color)]">
                    {panelTitle}
                  </div>
                  <div className="mt-1 line-clamp-2 text-xs text-[var(--text-muted)]">
                    {panelDescription}
                  </div>
                  <div className="mt-2 text-xs font-medium" style={{ color: ThemeAccentColor }}>
                    {url?.replace(/^https?:\/\//, '')}
                  </div>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SectionContent;
