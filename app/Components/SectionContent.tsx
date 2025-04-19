import React from 'react';
import { Experience } from '../page';
import { useLinkPreviews } from '../hooks/useOpenGraph';

type SectionContentProps = {
  experience: Experience[];
  highlightIndex: number;
};

const SectionContent: React.FC<SectionContentProps> = ({ experience, highlightIndex }) => {
  const currentExperience = experience[highlightIndex];

  const { title, content, content2, content3, highlights, ctas } = currentExperience;
  const { data: previews } = useLinkPreviews(ctas || []);

  return (
    <div className="max-w-[700px] relative flex flex-col gap-6">
      {/* Title */}
      <h4 className="text-3xl font-bold">{title || ''}</h4>

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
              className="bg-[#EBCB8E] rounded text-[#131A28] text-xs p-1 px-2 cursor-default"
            >
              <span>{highlight}</span>
            </div>
          ))}
        </div>
      )}

      {/* CTA Links with Previews */}
      <div className="flex gap-2 z-30 relative">
        {previews?.map((preview, index) => {
          if (!preview) return null;

          const { url, image, title, description } = preview;

          return (
            <a
              key={index}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full max-w-md h-28 bg-[rgba(31,44,64,0.5)] rounded-lg overflow-hidden border border-white/1 hover:border-[rgba(235,203,142,0.5)] group hover:shadow-lg transition duration-300 no-underline cursor-pointer"
            >
              {image && (
                <div
                  className="w-120 bg-cover bg-center"
                  style={{ backgroundImage: `url(${image})` }}
                />
              )}
              <div className="flex flex-col justify-between p-3 text-left group-hover:text-[#EBCB8E]">
                <div className="text-sm font-semibold leading-snug line-clamp-2">{title}</div>
                <div className="text-xs text-[#99ACC7] mt-1 line-clamp-2">{description}</div>
                <div className="text-xs text-[#EBCB8E] mt-2">
                  {url?.replace(/^https?:\/\//, '')}
                </div>
              </div>
            </a>
          );
        })}
      </div>
    </div>
  );
};

export default SectionContent;
