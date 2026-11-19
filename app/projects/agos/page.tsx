'use client';

import React from 'react';
import { ProjectHero } from '../../Components/case-study/ProjectHero';
import { SnapshotGrid } from '../../Components/case-study/SnapshotGrid';
import { SectionWrapper } from '../../Components/case-study/SectionWrapper';
import { BulletList } from '../../Components/case-study/BulletList';
import ImageGallery from '../../Components/ImageGallery';
import { trackCaseStudyEvent } from '../../lib/analytics';

export default function AgOSPage() {
  return (
    <div className="min-h-0 pb-4">
      {/* 1. Hero Section */}
      <ProjectHero
        title="AgOS — Agricultural Operating System"
        subtitle="Design Engineer & Full-Stack Interface Lead"
        summary="A connected operating system bringing crop planning, custom 3D grain storage, shipping logistics, contracts, equipment, and farm finances into one unified spatial interface."
        links={[
          { label: 'Live Platform Demo', url: 'https://ag-os.pro/', primary: true },
        ]}
        badge="In Development"
      />

      {/* 2. Snapshot */}
      <SnapshotGrid
        role="Design Engineer / Frontend Developer"
        stack="React 19, TypeScript, Next.js / vinext, Tailwind CSS, Three.js, Leaflet, Recharts, Nivo, Auth.js, Neon PostgreSQL, Drizzle ORM"
        domain="Agricultural Tech / Spatial Interfaces / 3D Graphics"
        scope={[
          'Full-stack interface architecture and connected agricultural workspaces',
          'Custom Three.js 3D spatial grain storage and interactive bin yard management',
          'Field Signal design system: tokens, serif headings, mono metadata, and amber interactions',
          'Financial charts, Sankey diagrams, and real-time shipping route maps',
          'Organization-owned records, multi-tenant roles, and isolated guest demo sandbox',
          'Tabular and keyboard-operable accessibility alternatives for all visual scenes',
        ]}
      />

      <div className="py-8">
        {/* 3. Context */}
        <SectionWrapper title="Context">
          <p className="leading-relaxed text-[var(--text-muted)]">
            AgOS is an ongoing product design and frontend engineering platform addressing a fundamental challenge:
            making a complex, multi-million dollar physical agricultural enterprise understandable and operable in real time.
            Farms operate with massive physical assets (grain bins, combines, freight logistics) that must correlate directly with
            forward contracts, cash-flow requirements, and agronomic field activities.
          </p>
          <p className="mt-4 leading-relaxed text-[var(--text-muted)]">
            Dedicated workspaces share unified interface primitives and a persistent organizational, production-year, and navigation context.
            A purpose-built demo layer adapts navigation, session presentation, and data requests so visitors, partners, and recruiters can
            explore the platform live without compromising operational records.
          </p>
          <div className="mt-8">
            <h3 className="mb-2 text-lg font-semibold tracking-tight text-[#0a2540]">
              Core Spatial &amp; System Views
            </h3>
            <p className="text-sm text-[var(--text-muted)]">
              End-to-end architecture paired with live production views for 3D storage yards, satellite field planning, and time-series inventory analytics.
            </p>
            <ImageGallery
              images={[
                {
                  src: '/screenshots/AgOS-screenshot (2).png',
                  alt: 'AgOS 3D Storage Yard (Home Yard — Main Setup) and Selected Bin D-02 Inspector',
                  type: 'image',
                },
                {
                  src: '/screenshots/AgOS-screenshot (3).png',
                  alt: 'AgOS Fields & Crops Satellite Map and 4,800-Acre Crop Plan',
                  type: 'image',
                },
                {
                  src: '/screenshots/AgOS-screenshot (4).png',
                  alt: 'AgOS Storage Overview — Inventory Mix and Accessible Stacked Time-Series Chart',
                  type: 'image',
                },
                {
                  src: '/diagrams/agos-architecture.svg',
                  alt: 'AgOS Full-Stack Architecture: Field Discovery to 3D Spatial Engine & PostgreSQL',
                  type: 'image',
                },
              ]}
            />
          </div>
        </SectionWrapper>

        {/* 4. Problem Space */}
        <SectionWrapper title="Problem Space">
          <BulletList
            items={[
              'Disjointed data silos: Physical grain in bins has historically been tracked on whiteboards or spreadsheets, disconnected from forward sales contracts and banking lines of credit.',
              'Spatial visualization gaps: Operators need to see capacity, fill percentages, grain slope, and commodity types across multiple yard locations at a glance without decoding tabular rows.',
              'Complex dense operational records: Supporting high-frequency field activity alongside spatial views, charts, and routing maps requires strict layout hierarchy without losing year context.',
              'WebGL reliability & GPU lifecycle: Custom 3D scenes must run smoothly across mobile and low-spec field tablets, with graceful context restoration and accessibility fallbacks.',
            ]}
          />
        </SectionWrapper>

        {/* 5. Approach */}
        <SectionWrapper title="Approach">
          <BulletList
            items={[
              'Build typed, reusable workspaces with React 19 and TypeScript, backed by Neon PostgreSQL, Drizzle ORM, and Auth.js for role-based organizational security.',
              'Model physical assets (round bins, hopper bottoms, bulk flat storage, rings, and grain bags) using custom Three.js geometry driven directly by database record attributes.',
              'Integrate yard navigation with drag-and-drop and keyboard reordering, managing pixel density, resize observation, texture lifecycles, and WebGL context recovery.',
              'Decouple typed economic calculations from visual presentations so Recharts, Nivo Sankey diagrams, and tabular grids always reflect identical production costs and revenue.',
              'Establish the Field Signal design system: serif headings for orientation, high-density sans-serif data tables, and high-visibility amber focus/selection rings.',
            ]}
          />
        </SectionWrapper>

        {/* 6. Architecture & Implementation */}
        <SectionWrapper title="Architecture & Implementation">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] glass-surface p-6 shadow-[var(--shadow-sm)]">
              <h3 className="mb-4 text-lg font-semibold tracking-tight text-[#0a2540]">
                3D Spatial &amp; Yard Engine
              </h3>
              <BulletList
                items={[
                  {
                    title: 'Parametric Geometry',
                    description:
                      'Generates procedural bin geometry matching physical diameter, eave height, hopper angle, and grain heap levels.',
                  },
                  {
                    title: 'Resource Lifecycle Management',
                    description:
                      'Strict GPU resource cleanup, texture disposal, and devicePixelRatio capping for battery-efficient mobile operation.',
                  },
                  {
                    title: 'Spatial Interactive Yard',
                    description:
                      'Click-to-inspect bins, yard drag-and-drop rearrangement, and smooth camera transitions to contextual detail panels.',
                  },
                ]}
              />
            </div>

            <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] glass-surface p-6 shadow-[var(--shadow-sm)]">
              <h3 className="mb-4 text-lg font-semibold tracking-tight text-[#0a2540]">
                Data Architecture &amp; Design System
              </h3>
              <BulletList
                items={[
                  {
                    title: 'Field Signal Token System',
                    description:
                      'Custom design system bridging Figma tokens with Tailwind CSS utility classes and fluid typography.',
                  },
                  {
                    title: 'Economic Flow Visualizations',
                    description:
                      'Nivo Sankey diagrams mapping revenue flows from field harvest to elevator settlements and debt obligations.',
                  },
                  {
                    title: 'Full Tabular Accessibility',
                    description:
                      'Every 3D spatial scene has a 1:1 accessible tabular grid with full keyboard navigation and screen-reader semantics.',
                  },
                ]}
              />
            </div>
          </div>

          <div className="mt-10">
            <h3 className="mb-2 text-lg font-semibold tracking-tight text-[#0a2540]">
              Financial, Pricing &amp; Multi-Tenant Workflows
            </h3>
            <p className="text-sm text-[var(--text-muted)]">
              Production economics Sankey visualizations, commodity market benchmarks, field-to-bin shipping ticket intake, and isolated organization workspaces.
            </p>
            <ImageGallery
              images={[
                {
                  src: '/screenshots/AgOS-screenshot (5).png',
                  alt: 'AgOS Cash Flow Ledger and Production Economics Nivo Sankey Diagram',
                  type: 'image',
                },
                {
                  src: '/screenshots/AgOS-screenshot (1).png',
                  alt: 'AgOS Markets Page — Durum Wheat Price History and Live Commodity Board',
                  type: 'image',
                },
                {
                  src: '/screenshots/AgOS-screenshot (7).png',
                  alt: 'AgOS Field-to-Bin Shipping Ticket Modal with Manual Entry and Upload & Extract Intake',
                  type: 'image',
                },
                {
                  src: '/screenshots/AgOS-screenshot (6).png',
                  alt: 'AgOS Multi-Tenant Organization and Legal Land Location Settings',
                  type: 'image',
                },
              ]}
            />
          </div>
        </SectionWrapper>

        {/* 7. Outcomes */}
        <SectionWrapper title="Current Outcomes & Trajectory">
          <div className="rounded-xl border border-[var(--border)] border-l-3 border-l-[#0a2540] bg-[var(--surface)] glass-surface p-6 shadow-[var(--shadow-sm)]">
            <p className="text-sm font-semibold text-[#0a2540]">
              Transforming Physical Operations into Digital Clarity
            </p>
            <p className="mt-2 text-sm leading-relaxed text-[var(--text-muted)]">
              AgOS demonstrates how modern frontend architecture—combining React 19, TypeScript, parametric 3D graphics,
              and design system rigor—can turn cumbersome physical enterprise workflows into an intuitive, elegant software product.
              The platform continues active development, with live interactive previews available at <a href="https://ag-os.pro/" target="_blank" rel="noopener noreferrer" onClick={() => trackCaseStudyEvent('external_link', 'agos', { link_label: 'ag-os.pro inline', url: 'https://ag-os.pro/', source: 'agos_outcomes_callout' })} className="font-semibold text-[#0a2540] underline decoration-[#0a2540]/30 underline-offset-4 hover:decoration-[#0a2540]">ag-os.pro</a>.
            </p>
          </div>
        </SectionWrapper>
      </div>
    </div>
  );
}
