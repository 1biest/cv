'use client';

import { track } from '@vercel/analytics';

/**
 * Standardized Google Analytics 4 & Vercel Analytics event names
 */
export type AnalyticsEventName =
  | 'page_view'
  | 'session_start_attribution'
  | 'view_section'
  | 'view_scene'
  | 'section_dwell'
  | 'engagement_milestone'
  | 'engagement_time'
  | 'scroll_depth'
  | 'filmstrip_nav_click'
  | 'filmstrip_scrub'
  | 'subpage_nav_click'
  | 'role_lens_select'
  | 'role_proof_click'
  | 'recruiter_hud_toggle'
  | 'recruiter_hud_lens_select'
  | 'recruiter_copy_packet'
  | 'recruiter_cta_click'
  | 'resume_download'
  | 'contact_email_click'
  | 'contact_email_copy'
  | 'content_copy'
  | 'social_link_click'
  | 'preview_deck_select'
  | 'craft_triangle_pin'
  | 'craft_triangle_hover'
  | 'open_case_study'
  | 'close_case_study'
  | 'navigate_case_study'
  | 'share_case_study'
  | 'case_study_gallery_select'
  | 'case_study_image_expand'
  | 'reel_filter_select'
  | 'external_project_click'
  | 'click_case_study_link'
  | 'lightbox_open'
  | 'lightbox_navigate'
  | 'lightbox_zoom_toggle';

export type EventProperties = Record<string, string | number | boolean | null | undefined>;

type GtagCommand = 'event' | 'config' | 'set' | 'js';

interface QueuedGtagCall {
  command: GtagCommand;
  action: string;
  params: Record<string, unknown>;
}

interface SessionAttribution {
  referrer_host: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
  ref_param?: string;
  initial_project?: string;
  viewport_bucket: 'mobile' | 'tablet' | 'desktop' | 'wide';
  entry_page: string;
}

declare global {
  interface Window {
    gtag?: (
      command: GtagCommand,
      action: string,
      params?: Record<string, unknown>
    ) => void;
    dataLayer?: unknown[];
  }
}

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID || 'G-X4G4BGPMJX';

let sessionStartTime = Date.now();
let interactionCount = 0;
let currentRoleLens = 'all';
let currentSection = 'overview';
let sessionInitialized = false;
let cachedAttribution: SessionAttribution | null = null;
let flushTimer: ReturnType<typeof setTimeout> | null = null;
let flushAttempts = 0;
const pendingGtagCalls: QueuedGtagCall[] = [];

function getViewportBucket(width: number): SessionAttribution['viewport_bucket'] {
  if (width < 640) return 'mobile';
  if (width < 1024) return 'tablet';
  if (width < 1440) return 'desktop';
  return 'wide';
}

function getAttribution(): SessionAttribution {
  if (cachedAttribution) return cachedAttribution;

  if (typeof window === 'undefined') {
    return {
      referrer_host: 'server',
      viewport_bucket: 'desktop',
      entry_page: '/',
    };
  }

  let referrerHost = 'direct';
  if (document.referrer) {
    try {
      const refUrl = new URL(document.referrer);
      referrerHost = refUrl.hostname || 'external';
    } catch {
      referrerHost = 'external';
    }
  }

  const search = new URLSearchParams(window.location.search);
  const attribution: SessionAttribution = {
    referrer_host: referrerHost,
    viewport_bucket: getViewportBucket(window.innerWidth),
    entry_page: window.location.pathname || '/',
  };

  const utmSource = search.get('utm_source');
  const utmMedium = search.get('utm_medium');
  const utmCampaign = search.get('utm_campaign');
  const utmTerm = search.get('utm_term');
  const utmContent = search.get('utm_content');
  const refParam = search.get('ref');
  const initialProject = search.get('project');

  if (utmSource) attribution.utm_source = utmSource;
  if (utmMedium) attribution.utm_medium = utmMedium;
  if (utmCampaign) attribution.utm_campaign = utmCampaign;
  if (utmTerm) attribution.utm_term = utmTerm;
  if (utmContent) attribution.utm_content = utmContent;
  if (refParam) attribution.ref_param = refParam;
  if (initialProject) attribution.initial_project = initialProject;

  cachedAttribution = attribution;
  return attribution;
}

function scheduleFlush(): void {
  if (flushTimer || typeof window === 'undefined') return;
  flushTimer = setTimeout(() => {
    flushTimer = null;
    flushAttempts += 1;

    if (typeof window.gtag === 'function') {
      const queued = pendingGtagCalls.splice(0, pendingGtagCalls.length);
      queued.forEach((call) => {
        window.gtag?.(call.command, call.action, call.params);
      });
      flushAttempts = 0;
      return;
    }

    if (flushAttempts < 50 && pendingGtagCalls.length > 0) {
      scheduleFlush();
    }
  }, 100);
}

function dispatchGtag(command: GtagCommand, action: string, params: Record<string, unknown>): void {
  if (typeof window === 'undefined') return;

  if (typeof window.gtag === 'function') {
    if (pendingGtagCalls.length > 0) {
      const queued = pendingGtagCalls.splice(0, pendingGtagCalls.length);
      queued.forEach((call) => {
        window.gtag?.(call.command, call.action, call.params);
      });
    }
    window.gtag(command, action, params);
    return;
  }

  if (pendingGtagCalls.length < 50) {
    pendingGtagCalls.push({ command, action, params });
    scheduleFlush();
  }
}

export function setAnalyticsRoleLens(lens: string): void {
  currentRoleLens = lens;
}

export function setAnalyticsActiveSection(sectionId: string): void {
  currentSection = sectionId;
}

/**
 * Initialize GA4 recruiter attribution and session context once on mount
 */
export function initRecruiterSessionAnalytics(): void {
  if (typeof window === 'undefined' || sessionInitialized) return;
  sessionInitialized = true;
  sessionStartTime = Date.now();

  const attribution = getAttribution();
  const trafficSource =
    attribution.utm_source || attribution.ref_param || attribution.referrer_host;

  try {
    dispatchGtag('set', 'user_properties', {
      traffic_source: trafficSource,
      referrer_host: attribution.referrer_host,
      initial_role_lens: currentRoleLens,
      viewport_bucket: attribution.viewport_bucket,
      entry_page: attribution.entry_page,
    });
  } catch (err) {
    console.debug('GA4 user_properties error:', err);
  }

  const sessionProps: EventProperties = {
    traffic_source: trafficSource,
    referrer_host: attribution.referrer_host,
    viewport_bucket: attribution.viewport_bucket,
    entry_page: attribution.entry_page,
    utm_source: attribution.utm_source,
    utm_medium: attribution.utm_medium,
    utm_campaign: attribution.utm_campaign,
    utm_term: attribution.utm_term,
    utm_content: attribution.utm_content,
    ref_param: attribution.ref_param,
    deep_linked_project: attribution.initial_project,
    category: 'Session_Attribution',
  };

  trackEvent('session_start_attribution', sessionProps);
}

/**
 * Enhanced universal event dispatcher: pushes to GA4 (gtag) and Vercel Analytics
 */
export function trackEvent(name: AnalyticsEventName | string, properties?: EventProperties): void {
  interactionCount += 1;

  const attribution = getAttribution();
  const sanitizedProps: Record<string, string | number | boolean> = {
    active_lens: currentRoleLens,
    active_section: currentSection,
    session_elapsed_sec: Math.max(0, Math.round((Date.now() - sessionStartTime) / 1000)),
    interaction_seq: interactionCount,
    referrer_host: attribution.referrer_host,
  };

  if (attribution.utm_source) {
    sanitizedProps.utm_source = attribution.utm_source;
  }

  if (typeof window !== 'undefined') {
    sanitizedProps.page_path = window.location.pathname || '/';
  }

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

  // 2. Track in Google Analytics 4 (gtag with zero-drop startup queue)
  try {
    dispatchGtag('event', name, {
      ...sanitizedProps,
      event_category: sanitizedProps.category || 'Engagement',
      event_label: sanitizedProps.label || name,
      send_to: GA_MEASUREMENT_ID,
      timestamp: new Date().toISOString(),
    });
  } catch (err) {
    console.debug('GA4 dispatch error:', err);
  }
}

/**
 * Recruiter conversion tracker: fires dedicated GA4 key events plus generic conversion rollup
 */
export function trackRecruiterAction(
  action:
    | 'resume_download'
    | 'email_click'
    | 'copy_email'
    | 'copy_packet'
    | 'view_summary'
    | 'intro_call'
    | 'lens_select'
    | 'proof_click',
  meta?: EventProperties
): void {
  const ctaLocation = (meta?.location || meta?.source || 'unknown') as string;
  const roleTrack = (meta?.lens || currentRoleLens) as string;

  if (action === 'resume_download') {
    trackEvent('resume_download', {
      file_name: meta?.resume_file || 'unknown',
      role_track: roleTrack,
      cta_location: ctaLocation,
      value: 10,
      currency: 'USD',
      category: 'Recruiter_Conversion',
      ...meta,
    });
    trackEvent('recruiter_cta_click', {
      action_type: action,
      recruiter_intent: true,
      category: 'Recruiter_Conversion',
      ...meta,
    });
    return;
  }

  if (action === 'email_click') {
    trackEvent('contact_email_click', {
      cta_location: ctaLocation,
      subject_preset: meta?.subject_preset || 'default',
      value: 15,
      currency: 'USD',
      category: 'Recruiter_Conversion',
      ...meta,
    });
    trackEvent('recruiter_cta_click', {
      action_type: action,
      recruiter_intent: true,
      category: 'Recruiter_Conversion',
      ...meta,
    });
    return;
  }

  if (action === 'copy_email') {
    trackEvent('contact_email_copy', {
      cta_location: ctaLocation,
      value: 15,
      currency: 'USD',
      category: 'Recruiter_Conversion',
      ...meta,
    });
    trackEvent('recruiter_cta_click', {
      action_type: action,
      recruiter_intent: true,
      category: 'Recruiter_Conversion',
      ...meta,
    });
    return;
  }

  if (action === 'copy_packet') {
    trackEvent('recruiter_copy_packet', {
      lens: roleTrack,
      cta_location: ctaLocation,
      value: 12,
      currency: 'USD',
      category: 'Recruiter_Conversion',
      ...meta,
    });
    trackEvent('recruiter_cta_click', {
      action_type: action,
      recruiter_intent: true,
      category: 'Recruiter_Conversion',
      ...meta,
    });
    return;
  }

  if (action === 'lens_select') {
    trackEvent('role_lens_select', {
      category: 'Recruiter_Intent',
      ...meta,
    });
    return;
  }

  if (action === 'proof_click') {
    trackEvent('role_proof_click', {
      category: 'Recruiter_Intent',
      ...meta,
    });
    return;
  }

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
): void {
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
  event:
    | 'open'
    | 'close'
    | 'navigate'
    | 'share'
    | 'external_link'
    | 'gallery_select'
    | 'image_expand'
    | 'preview_select',
  projectId: string,
  details?: EventProperties
): void {
  const eventMap: Record<string, AnalyticsEventName> = {
    open: 'open_case_study',
    close: 'close_case_study',
    navigate: 'navigate_case_study',
    share: 'share_case_study',
    external_link: 'external_project_click',
    gallery_select: 'case_study_gallery_select',
    image_expand: 'case_study_image_expand',
    preview_select: 'preview_deck_select',
  };

  trackEvent(eventMap[event] || 'open_case_study', {
    project_id: projectId,
    category: 'Case_Study',
    ...details,
  });
}
