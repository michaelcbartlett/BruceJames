// Shared site helpers used by the landing page and the downloads pages.
// OS detection + analytics mirror the original inline logic in LandingComponent
// so download/buy events land in the same GA dataLayer funnel.

export type OS = 'win' | 'mac';

// Best guess at the visitor's OS so we can lead with the right demo download.
// Returns 'win' during prerender (no navigator); corrected on the client.
export function detectOS(): OS {
  if (typeof navigator === 'undefined') return 'win';
  const ua = ((navigator as any).userAgentData?.platform || navigator.platform || navigator.userAgent || '').toLowerCase();
  return ua.includes('mac') ? 'mac' : 'win';
}

export function osLabel(os: OS): string {
  return os === 'mac' ? 'macOS' : 'Windows';
}

// True on phones / small touch screens, where a desktop plugin can't be installed.
// Drives the "send it to your desktop" handoff banner.
export function isHandoffDevice(): boolean {
  if (typeof navigator === 'undefined' || typeof window === 'undefined' || typeof screen === 'undefined') return false;
  const ua = (navigator.userAgent || '').toLowerCase();
  const isIOS = /iphone|ipad|ipod/.test(ua);
  return isIOS || (('ontouchstart' in window) && Math.min(screen.width, screen.height) < 820);
}

// Push the same shape of GA event the live site already uses.
export function pushEvent(event: string, label: string): void {
  if (typeof window !== 'undefined' && (window as any).dataLayer) {
    (window as any).dataLayer.push({ event, event_category: 'engagement', event_label: label, value: 1 });
  }
}

// Bump per pricing era so Gumroad attributes sales to the right campaign.
const UTM_CAMPAIGN = 'site_2026';

// Append UTM tags so Gumroad attributes the sale to the site/campaign/plugin.
export function buyHref(url: string | undefined, content: string): string {
  if (!url) return '#';
  const sep = url.includes('?') ? '&' : '?';
  return `${url}${sep}utm_source=brucejames_site&utm_medium=plugin_card&utm_campaign=${UTM_CAMPAIGN}&utm_content=${content}`;
}
