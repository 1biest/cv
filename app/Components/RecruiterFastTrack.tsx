'use client';

import React, { useState } from 'react';
import { trackRecruiterAction, trackEvent } from '../lib/analytics';

const EMAIL = 'logan.biesterfeldt@gmail.com';
const MAILTO = `mailto:${EMAIL}?subject=${encodeURIComponent('Interview Opportunity — Senior Design Engineer')}&body=${encodeURIComponent("Hi Logan,\n\nI reviewed your portfolio and would love to connect regarding an opportunity at [Company Name].\n\nRole:\nLocation/Work Type:\nTimeline:\n\nLooking forward to speaking!")}`;

const RECRUITER_SUMMARY_BLURB = `Logan Biesterfeldt — Senior Design Engineer & Frontend Lead
• 10+ years experience bridging UI/UX in Figma to production TypeScript / Next.js codebases.
• Flagship: Built and shipped frontend for Neptune Finance ($300M+ volume, multi-asset lending protocol).
• Core: React 19, TypeScript, Next.js, Tailwind, CosmWasm/EVM, Design Systems & high-throughput state machines.
• Availability: Calgary, AB · Remote Worldwide · Open to Relocation.
• Portfolio: https://logan-cv.vercel.app · Email: logan.biesterfeldt@gmail.com · GitHub: github.com/1biest`;

interface RecruiterFastTrackProps {
  isOpen: boolean;
  onClose?: () => void;
}

export default function RecruiterFastTrack({ isOpen, onClose }: RecruiterFastTrackProps) {
  const [copiedBlurb, setCopiedBlurb] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyBlurb = async () => {
    trackRecruiterAction('copy_packet', { format: 'text_blurb' });
    try {
      await navigator.clipboard.writeText(RECRUITER_SUMMARY_BLURB);
      setCopiedBlurb(true);
      setTimeout(() => setCopiedBlurb(false), 2500);
    } catch {
      // fallback
    }
  };

  const handleCopyEmail = async () => {
    trackRecruiterAction('copy_email', { location: 'recruiter_hud' });
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2500);
    } catch {
      // fallback
    }
  };

  if (!isOpen) return null;

  return (
    <aside
      aria-label="Recruiter Fast-Track Dossier"
      className="bg-neutral-900 border-b border-amber-500/30 text-neutral-100 shadow-2xl relative z-30 transition-all duration-300 animate-in fade-in slide-in-from-top-3"
    >
      <div className="max-w-6xl mx-auto px-5 md:px-8 py-6">
        {/* Header Ribbon */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-neutral-800">
          <div className="flex items-center gap-2.5">
            <span className="flex h-2.5 w-2.5 rounded-full bg-amber-400 ring-4 ring-amber-400/20 animate-pulse" />
            <h3 className="text-xs font-mono uppercase tracking-widest text-amber-300 font-bold">
              {'Recruiter Fast-Track Dossier // 60-Second Candidate Snapshot'}
            </h3>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-[11px] font-mono text-neutral-400">
              STATUS: <strong className="text-emerald-400">ACTIVELY INTERVIEWING</strong>
            </span>
            {onClose && (
              <button
                onClick={onClose}
                className="text-neutral-400 hover:text-white text-xs font-mono px-2 py-0.5 rounded border border-neutral-800 hover:border-neutral-700"
                aria-label="Close dossier"
              >
                CLOSE ✕
              </button>
            )}
          </div>
        </div>

        {/* 3-Column Dossier Grid */}
        <div className="grid gap-6 md:grid-cols-3 pt-5">
          {/* Column 1: Core Role & Availability */}
          <div className="bg-neutral-950/60 p-4 rounded-xl border border-neutral-800/80 flex flex-col justify-between">
            <div>
              <p className="text-[10px] font-mono uppercase text-amber-400/90 tracking-wider">
                Target Roles
              </p>
              <h4 className="text-base font-bold text-white mt-1">
                Senior Design Engineer · Frontend Lead
              </h4>
              <p className="text-xs text-neutral-400 mt-2 leading-relaxed">
                Staff / Senior IC owning the entire pipeline from design system tokens in Figma to production React &amp; TypeScript systems.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-neutral-800/80 text-[11px] text-neutral-300 flex flex-col gap-1">
              <div>
                <span className="text-neutral-500">Location:</span> Calgary, Canada
              </div>
              <div>
                <span className="text-neutral-500">Work Type:</span> Remote Worldwide / Relocation Open
              </div>
              <div>
                <span className="text-neutral-500">Notice Period:</span> Immediate / Flexible
              </div>
            </div>
          </div>

          {/* Column 2: Hard Metrics & Proven ROI */}
          <div className="bg-neutral-950/60 p-4 rounded-xl border border-neutral-800/80 flex flex-col justify-between">
            <div>
              <p className="text-[10px] font-mono uppercase text-amber-400/90 tracking-wider">
                Production Proof Points
              </p>
              <ul className="mt-2 space-y-2 text-xs text-neutral-300">
                <li className="flex items-start gap-2">
                  <span className="text-amber-400 font-bold">✓</span>
                  <span>
                    <strong className="text-white">$300M+ Volume</strong>: Shipped Neptune Finance on Injective with contract-aware state machine.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-400 font-bold">✓</span>
                  <span>
                    <strong className="text-white">Zero Handoff Waste</strong>: Full design &amp; code ownership reduces delivery timelines by ~40%.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-400 font-bold">✓</span>
                  <span>
                    <strong className="text-white">8+ Production Apps</strong>: CosmWasm, EVM, Monad, and high-frequency real-time webapps.
                  </span>
                </li>
              </ul>
            </div>
            <div className="mt-4 pt-3 border-t border-neutral-800/80 text-[11px] text-neutral-400">
              Stack: React 19, TypeScript, Next.js, Tailwind, CosmWasm, Viem
            </div>
          </div>

          {/* Column 3: Instant Recruiter Actions */}
          <div className="bg-gradient-to-br from-neutral-950/90 to-amber-950/20 p-4 rounded-xl border border-amber-500/30 flex flex-col justify-between">
            <div>
              <p className="text-[10px] font-mono uppercase text-amber-400 tracking-wider">
                Direct Conversion Actions
              </p>
              <div className="mt-3 flex flex-col gap-2">
                <a
                  href={MAILTO}
                  onClick={() => trackRecruiterAction('email_click', { location: 'recruiter_hud' })}
                  className="flex items-center justify-center gap-2 w-full py-2 px-3 rounded-lg bg-amber-400 hover:bg-amber-300 text-neutral-950 font-bold text-xs transition shadow-sm"
                >
                  <span>✉</span> Schedule Interview / Email Logan
                </a>

                <a
                  href="/Logan Biesterfeldt Resume 2026.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackRecruiterAction('resume_download', { location: 'recruiter_hud' })}
                  className="flex items-center justify-center gap-2 w-full py-2 px-3 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-white font-medium text-xs border border-neutral-700 transition"
                >
                  <span>📄</span> Download Official 2026 Résumé (PDF)
                </a>

                <div className="grid grid-cols-2 gap-2 mt-1">
                  <button
                    type="button"
                    onClick={handleCopyBlurb}
                    className="flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-neutral-300 text-[11px] border border-neutral-800 transition"
                  >
                    <span>📋</span> {copiedBlurb ? 'Copied Blurb!' : 'Copy ATS Blurb'}
                  </button>

                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    className="flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-neutral-300 text-[11px] border border-neutral-800 transition"
                  >
                    <span>@</span> {copiedEmail ? 'Copied Email!' : 'Copy Email'}
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-3 text-[10px] text-neutral-400 flex items-center justify-between">
              <span>Avg. response time: &lt; 4 hours</span>
              <span className="text-amber-400 font-mono">Calgary (MT)</span>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
