import { Injectable } from '@angular/core';

export interface TrafficSource {
  source: string;
  medium: string;
}

const STORAGE_KEY = 'bj-traffic-source';

@Injectable({ providedIn: 'root' })
export class TrafficSourceService {
  readonly source: string;
  readonly medium: string;

  constructor() {
    const detected = this.resolve();
    this.source = detected.source;
    this.medium = detected.medium;
  }

  private resolve(): TrafficSource {
    // Within the same session, preserve the entry-point source so navigating
    // between pages doesn't reset it to "direct".
    try {
      const stored = sessionStorage.getItem(STORAGE_KEY);
      if (stored) return JSON.parse(stored) as TrafficSource;
    } catch { /* sessionStorage blocked */ }

    const ts = this.detect();

    try { sessionStorage.setItem(STORAGE_KEY, JSON.stringify(ts)); } catch { /* ignore */ }
    return ts;
  }

  private detect(): TrafficSource {
    if (typeof window === 'undefined') {
      return { source: 'brucejames_site', medium: 'plugin_card' };
    }

    const params = new URLSearchParams(window.location.search);

    // Explicit UTM params (Instagram story links, YouTube descriptions, Google Ads
    // manual tags) take highest priority.
    const utmSource = params.get('utm_source');
    if (utmSource) {
      return {
        source: utmSource,
        medium: params.get('utm_medium') ?? 'unknown',
      };
    }

    // Google Ads auto-tag (gclid is appended automatically by Google Ads when
    // auto-tagging is on — no manual UTMs needed on your ad links).
    if (params.get('gclid')) {
      return { source: 'google', medium: 'cpc' };
    }

    // Referrer-based detection for organic/untagged traffic.
    const ref = document.referrer;
    if (ref) {
      // Same-site navigation: don't overwrite the original entry source.
      if (/brucejames\.studio/i.test(ref)) {
        return { source: 'direct', medium: 'none' };
      }
      if (/google\./i.test(ref))                        return { source: 'google',    medium: 'organic' };
      if (/instagram\.com|l\.instagram\.com/i.test(ref)) return { source: 'instagram', medium: 'social'  };
      if (/youtube\.com|youtu\.be/i.test(ref))           return { source: 'youtube',   medium: 'social'  };
      if (/t\.co|twitter\.com|x\.com/i.test(ref))        return { source: 'twitter',   medium: 'social'  };
      if (/reddit\.com/i.test(ref))                      return { source: 'reddit',    medium: 'social'  };
      if (/facebook\.com|fb\.me/i.test(ref))             return { source: 'facebook',  medium: 'social'  };
      if (/tiktok\.com/i.test(ref))                      return { source: 'tiktok',    medium: 'social'  };

      // Generic referral: use the hostname as the source.
      try {
        const host = new URL(ref).hostname.replace(/^www\./, '');
        return { source: host, medium: 'referral' };
      } catch { /* malformed referrer */ }
    }

    return { source: 'direct', medium: 'none' };
  }
}
