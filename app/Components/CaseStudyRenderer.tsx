'use client';

import React, { useEffect, useState } from 'react';
import ImageGallery from './ImageGallery';
import { ProjectHero } from './case-study/ProjectHero';
import { SnapshotGrid } from './case-study/SnapshotGrid';
import { SectionWrapper } from './case-study/SectionWrapper';
import { BulletList } from './case-study/BulletList';
import { useLinkPreviews } from '../hooks/useOpenGraph';
import { ThemeAccentColor } from '../config';
import { Project } from '../types/projects';
import NeptuneFinance from '../projects/neptune-finance/page';
import Dyve from '../projects/dyve/page';

interface CaseStudyRendererProps {
  project: Project;
}

export default function CaseStudyRenderer({ project }: CaseStudyRendererProps) {
  const {
    id,
    title,
    roleDescriptor,
    content,
    content2,
    content3,
    highlights,
    ctas,
    ctaPanelOverrides,
    images = [],
    role,
    stack,
    domain,
    scope = [],
    context = [],
    problemSpace = [],
    approach = [],
    outcomes = [],
  } = project;

  // Fetch link previews for CTAs
  const { data: previews, loading } = useLinkPreviews(ctas || []);
  const [hiddenCta, setHiddenCta] = useState(true);

  useEffect(() => {
    setHiddenCta(true);
  }, [id]);

  useEffect(() => {
    if (!loading) {
      setHiddenCta(false);
    }
  }, [loading]);

  // If it's Neptune Finance or Dyve, return the custom page component directly
  if (id === 'neptune-finance') {
    return <NeptuneFinance />;
  }
  if (id === 'dyve') {
    return <Dyve />;
  }

  // Otherwise, render using the premium unified template
  const heroLinks =
    ctas?.map((cta, index) => ({
      label: cta.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, ''),
      url: cta,
      primary: index === 0,
    })) || [];

  // Parse generic description for hero summary (remove simple tags for safety in text prop)
  const heroSummary = content ? content.replace(/<\/?[^>]+(>|$)/g, '') : roleDescriptor || '';

  return (
    <div className="min-h-0 pb-4">
      {/* 1. Hero Section */}
      <ProjectHero
        title={title}
        subtitle={roleDescriptor || role || 'Contributor'}
        summary={heroSummary}
        links={heroLinks}
      />

      {/* 2. Snapshot */}
      <SnapshotGrid
        role={role || roleDescriptor || 'Contributor'}
        stack={stack || highlights.join(', ')}
        domain={domain || 'Blockchain Ecosystem'}
        scope={scope.length > 0 ? scope : highlights}
      />

      {/* 3. Context & Overview */}
      {(context.length > 0 || content2 || content3) && (
        <SectionWrapper title="Context">
          {context.length > 0 ? (
            context.map((paragraph, index) => <p key={index}>{paragraph}</p>)
          ) : (
            <>
              {content2 && <p dangerouslySetInnerHTML={{ __html: content2 }} />}
              {content3 && <p dangerouslySetInnerHTML={{ __html: content3 }} />}
            </>
          )}

          {images && images.length > 0 && (
            <div className="mt-8">
              <ImageGallery images={images} />
            </div>
          )}
        </SectionWrapper>
      )}

      {/* 4. Problem Space */}
      {problemSpace.length > 0 && (
        <SectionWrapper title="Problem Space">
          <BulletList items={problemSpace} />
        </SectionWrapper>
      )}

      {/* 5. Approach */}
      {approach.length > 0 && (
        <SectionWrapper title="Approach">
          <BulletList items={approach} />
        </SectionWrapper>
      )}

      {/* 6. Outcomes & Impact */}
      {outcomes.length > 0 && (
        <SectionWrapper title="Impact">
          <BulletList items={outcomes} />
        </SectionWrapper>
      )}

      {/* 7. Link Previews */}
      {previews && previews.length > 0 && !hiddenCta && (
        <SectionWrapper title="Project Links">
          <div className="flex flex-wrap gap-4 mt-4">
            {previews.map((preview, index) => {
              if (!preview) return null;

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
        </SectionWrapper>
      )}
    </div>
  );
}
