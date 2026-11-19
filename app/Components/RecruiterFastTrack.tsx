'use client';

import { useState } from 'react';
import {
  ROLE_LENSES,
  ROLE_LENS_ORDER,
  type RoleLens,
} from '../lib/roleLenses';
import { setAnalyticsRoleLens, trackEvent, trackRecruiterAction } from '../lib/analytics';

interface RecruiterFastTrackProps {
  isOpen: boolean;
  onClose: () => void;
  activeLens: RoleLens;
  onSelectLens: (lens: RoleLens) => void;
}

export default function RecruiterFastTrack({
  isOpen,
  onClose,
  activeLens,
  onSelectLens,
}: RecruiterFastTrackProps) {
  const [copiedBlurb, setCopiedBlurb] = useState(false);

  if (!isOpen) return null;

  const current = ROLE_LENSES[activeLens];

  const handleCopyBlurb = async () => {
    try {
      await navigator.clipboard.writeText(current.packetBlurb);
      setCopiedBlurb(true);
      trackRecruiterAction('copy_packet', { lens: activeLens });
      setTimeout(() => setCopiedBlurb(false), 2500);
    } catch {
      // Fallback ignored safely in non-clipboard contexts
    }
  };

  return (
    <section
      aria-label="Hiring Team 60-Second Executive Brief"
      className="bg-gradient-to-br from-[#0a2540] via-[#0d2d4d] to-[#081b30] border-b border-white/15 text-slate-100 shadow-2xl relative z-30 transition-all duration-300"
    >
      <div className="max-w-6xl mx-auto px-5 md:px-8 py-6">
        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-white/15">
          <div className="flex items-center gap-3">
            <span className="flex h-2.5 w-2.5 rounded-full bg-[#e5c488] ring-4 ring-[#e5c488]/20" />
            <h3 className="text-xs font-mono uppercase tracking-widest text-[#e5c488] font-bold">
              60-Second Hiring Evaluation Brief
            </h3>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {ROLE_LENS_ORDER.map((lensId) => (
              <button
                key={lensId}
                type="button"
                onClick={() => {
                  const previousLens = activeLens;
                  setAnalyticsRoleLens(lensId);
                  onSelectLens(lensId);
                  trackEvent('recruiter_hud_lens_select', {
                    lens_selected: lensId,
                    previous_lens: previousLens,
                    source: 'fast_track_hud',
                    category: 'Recruiter_Conversion',
                  });
                }}
                className={`px-3 py-1 rounded-full text-xs font-medium transition cursor-pointer ${
                  activeLens === lensId
                    ? 'bg-[#fafaf8] text-[#0a2540] font-semibold shadow-xs'
                    : 'bg-white/10 text-slate-200 hover:bg-white/15'
                }`}
              >
                {ROLE_LENSES[lensId].shortLabel}
              </button>
            ))}

            <button
              type="button"
              onClick={handleCopyBlurb}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 hover:bg-white/15 border border-white/20 text-xs text-white transition cursor-pointer"
            >
              <span>{copiedBlurb ? '✓ Packet Copied' : 'Copy ATS Summary'}</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              className="px-2.5 py-1 rounded-full text-xs text-slate-300 hover:text-white hover:bg-white/10 transition cursor-pointer"
              aria-label="Close Hiring Brief"
            >
              Close ✕
            </button>
          </div>
        </div>

        <div className="mt-5 grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="space-y-2.5">
            <p className="text-[11px] font-mono uppercase text-[#e5c488] tracking-wider">
              Role Focus &amp; Track
            </p>
            <p className="text-sm font-semibold text-white">{current.headline}</p>
            <p className="text-xs leading-relaxed text-slate-300">
              {current.summary}
            </p>
            <p className="text-xs text-slate-400">
              Calgary, AB (<span className="text-[#e5c488] font-mono">MT</span>) · Open to Remote &amp; Relocation · <span className="font-mono text-slate-200">biest.ca</span>
            </p>
          </div>

          <div className="space-y-2.5">
            <p className="text-[11px] font-mono uppercase text-[#e5c488] tracking-wider">
              Verified Signal
            </p>
            <ul className="space-y-2 text-xs text-slate-200">
              {current.highlights.map((highlight) => (
                <li key={highlight} className="flex items-start gap-2">
                  <span className="text-[#e5c488] font-bold shrink-0">✓</span>
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white/[0.06] p-4 rounded-xl border border-white/15 flex flex-col justify-between gap-3">
            <div>
              <p className="text-[11px] font-mono uppercase text-[#e5c488] tracking-wider font-semibold">
                Role-Tailored 1-Page Resumes
              </p>
              <p className="mt-1 text-xs text-slate-300">
                Download the targeted 1-page ATS resume or schedule a conversation directly.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-2">
              <a
                href={current.resumeHref}
                download
                onClick={() =>
                  trackRecruiterAction('resume_download', {
                    source: 'fast_track_hud',
                    lens: activeLens,
                    resume_file: current.resumeHref,
                    resume_label: current.resumeLabel,
                  })
                }
                className="flex items-center justify-center gap-2 w-full py-2 px-3 rounded-full bg-[#fafaf8] hover:bg-white text-[#0a2540] font-semibold text-xs transition shadow-xs"
              >
                <span>Download {current.resumeLabel} ↗</span>
              </a>
              <a
                href="mailto:logan.biesterfeldt@gmail.com?subject=Engineering%20%2F%20Product%20Role%20Inquiry"
                onClick={() => trackRecruiterAction('email_click', { source: 'fast_track_hud' })}
                className="flex items-center justify-center gap-2 w-full py-2 px-3 rounded-full border border-white/20 bg-white/5 hover:bg-white/10 text-white text-xs font-medium transition"
              >
                Email logan.biesterfeldt@gmail.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
