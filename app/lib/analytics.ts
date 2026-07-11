import { track } from '@vercel/analytics';

export function trackEvent(name: string, properties?: Record<string, string | number | boolean>) {
  // 1. Track in Vercel Analytics
  try {
    track(name, properties);
  } catch (err) {
    // Fail silently in environment where track might not be initialized
  }

  // 2. Track in Google Analytics (gtag)
  try {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', name, properties);
    }
  } catch (err) {
    // Fail silently
  }
}
