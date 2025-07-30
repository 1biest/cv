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

  const { title, content, content2, content3, highlights, ctas } = currentExperience;
  const { data: previews, loading } = useLinkPreviews(ctas || []);

  const [hiddenCta, setHiddenCta] = useState(true);

  useEffect(() => {
    // When highlightIndex changes, hide the CTA
    setHiddenCta(true);
  }, [highlightIndex]);

  useEffect(() => {
    // When loading finishes, show the CTA
    if (!loading) {
      setHiddenCta(false);
    }
  }, [loading]);

  return (
    <div className="max-w-[700px] relative flex flex-col gap-6">
      {/* Title */}
      <h4 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-[#dde5ed] to-[#99ACC7]">
        {title || ''}
      </h4>

      {/* Content paragraphs */}
      <div className="flex flex-col prose prose-invert max-w-none gap-4">
        {content && (
          <p
            className="text-[#99ACC7] z-30 relative"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        )}
        {content2 && (
          <p
            className="text-[#99ACC7] z-30 relative"
            dangerouslySetInnerHTML={{ __html: content2 }}
          />
        )}
        {content3 && (
          <p
            className="text-[#99ACC7] z-30 relative"
            dangerouslySetInnerHTML={{ __html: content3 }}
          />
        )}
      </div>

      {/* Highlights */}
      {highlights && highlights.length > 0 && (
        <div className="flex flex-wrap gap-2 z-30 relative pointer-events-none">
          {highlights.map((highlight, index) => (
            <div
              key={index}
              className="rounded text-[#131A28] text-xs p-1 px-2 cursor-default"
              style={{ backgroundColor: ThemeAccentColor }}
            >
              <span>{highlight}</span>
            </div>
          ))}
        </div>
      )}

      <ImageGallery images={currentExperience.images} />

      {/* CTA Links with Previews */}
      <div className="flex flex-col flex-wrap z-30 relative">
        <h3 className="text-lg font-bold mb-4">Links</h3>
        <div className="flex flex-wrap gap-2">
          {previews?.map((preview, index) => {
            if (!preview) return null;
            if (loading) return null;
            if (hiddenCta) return null;

            const { url, image, title, description } = preview;

            return (
              <a
                key={`${url}-${index}`}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="grid grid-cols-3 w-full max-w-xl h-30 rounded-lg overflow-hidden border border-white/10 group bg-[rgba(153,172,199,0.07)] hover:shadow-lg hover:border-[var(--theme-accent)] transition duration-300 no-underline cursor-pointer animate-fadeIn"
                style={{ '--theme-accent': ThemeAccentColor } as React.CSSProperties}
              >
                {image && (
                  <div
                    className="w-full bg-cover bg-center"
                    style={{ backgroundImage: `url(${image})` }}
                  />
                )}
                <div className="col-span-2 flex flex-col justify-between p-3 text-left">
                  <div
                    className="text-sm font-semibold leading-snug line-clamp-2 hover:text-[var(--theme-accent)]"
                    style={{ '--theme-accent': ThemeAccentColor } as React.CSSProperties}
                  >
                    {title}
                  </div>
                  <div className="text-xs text-[#99ACC7] mt-1 line-clamp-2">{description}</div>
                  <div className="text-xs mt-2" style={{ color: ThemeAccentColor }}>
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
