'use client';

import { track } from '@vercel/analytics';

/**
 * Standardized Google Analytics 4 & Vercel Analytics event names
 */
export type AnalyticsEventName =
  | 'page_view'
  | 'view_section'
  | 'view_scene'
  | 'filmstrip_nav_click'
  | 'filmstrip_scrub'
  | 'recruiter_hud_toggle'
  | 'recruiter_copy_packet'
  | 'recruiter_cta_click'
  | 'resume_download'
  | 'contact_email_click'
  | 'contact_email_copy'
  | 'social_link_click'
  | 'open_case_study'
  | 'close_case_study'
  | 'navigate_case_study'
  | 'share_case_study'
  | 'reel_filter_select'
  | 'external_project_click'
  | 'scroll_depth'
  | 'engagement_time';

export type EventProperties = Record<string, string | number | boolean | null | undefined>;

declare global {
  interface Window {
    gtag?: (
      command: 'event' | 'config' | 'set' | 'js',
      action: string,
      params?: Record<string, unknown>
    ) => void;
    dataLayer?: unknown[];
  }
}

/**
 * Enhanced universal event dispatcher: pushes to GA4 (gtag) and Vercel Analytics
 */
export function trackEvent(name: AnalyticsEventName | string, properties?: EventProperties) {
  // Clean up undefined/null values
  const sanitizedProps: Record<string, string | number | boolean> = {};
  if (properties) {
    Object.entries(properties).forEach(([key, val]) => {
      if (val !== undefined && val !== null) {
        sanitizedProps[key] = val;
      }
    });
  }

  // 1. Track in Vercel Analytics
  try {
    track(name, sanitizedProps);
  } catch {
    // Fail silently in environments where Vercel Analytics is not active
  }

  // 2. Track in Google Analytics 4 (gtag)
  try {
    if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
      window.gtag('event', name, {
        ...sanitizedProps,
        // Standard GA4 parameters
        event_category: sanitizedProps.category || 'Engagement',
        event_label: sanitizedProps.label || name,
        send_to: process.env.NEXT_PUBLIC_GA_ID || 'G-X4G4BGPMJX',
        timestamp: new Date().toISOString(),
      });
    }
  } catch (err) {
    console.debug('GA4 dispatch error:', err);
  }
}

/**
 * Recruiter conversion tracker
 */
export function trackRecruiterAction(
  action: 'resume_download' | 'email_click' | 'copy_email' | 'copy_packet' | 'view_summary' | 'intro_call',
  meta?: EventProperties
) {
  trackEvent('recruiter_cta_click', {
    action_type: action,
    recruiter_intent: true,
    category: 'Recruiter_Conversion',
    ...meta,
  });
}

/**
 * Film strip navigation tracker
 */
export function trackFilmstripNav(
  targetFrameId: string,
  frameNumber: number | string,
  frameLabel: string,
  method: 'click' | 'keyboard' | 'scrub' = 'click'
) {
  trackEvent('filmstrip_nav_click', {
    target_id: targetFrameId,
    frame_number: frameNumber,
    frame_label: frameLabel,
    interaction_method: method,
    category: 'Navigation',
  });
}

/**
 * Case study deep-dive tracker
 */
export function trackCaseStudyEvent(
  event: 'open' | 'close' | 'navigate' | 'share' | 'external_link',
  projectId: string,
  details?: EventProperties
) {
  const eventMap: Record<string, AnalyticsEventName> = {
    open: 'open_case_study',
    close: 'close_case_study',
    navigate: 'navigate_case_study',
    share: 'share_case_study',
    external_link: 'external_project_click',
  };

  trackEvent(eventMap[event] || 'open_case_study', {
    project_id: projectId,
    category: 'Case_Study',
    ...details,
  });
}
