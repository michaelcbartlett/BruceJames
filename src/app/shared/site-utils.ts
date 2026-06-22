// Shared site helpers used by the landing page and the downloads pages.
// OS detection + analytics mirror the original inline logic in LandingComponent
// so download/buy events land in the same GA dataLayer funnel.

import type { Product } from './plugin-catalog';

export type OS = 'win' | 'mac' | 'linux';

// Display order for the "other OS" buttons.
const OS_ORDER: OS[] = ['win', 'mac', 'linux'];

// Best guess at the visitor's OS so we can lead with the right demo download.
// Returns 'win' during prerender (no navigator); corrected on the client.
export function detectOS(): OS {
  if (typeof navigator === 'undefined') return 'win';
  const ua = ((navigator as any).userAgentData?.platform || navigator.platform || navigator.userAgent || '').toLowerCase();
  if (ua.includes('mac')) return 'mac';
  // "android" UAs also contain "linux"; those are handled by the handoff banner,
  // but exclude them so a phone never leads with the desktop Linux build.
  if (ua.includes('linux') && !ua.includes('android')) return 'linux';
  return 'win';
}

export function osLabel(os: OS): string {
  if (os === 'mac') return 'macOS';
  if (os === 'linux') return 'Linux';
  return 'Windows';
}

// GA event suffix, kept stable: buy_<slug>_click, dl_<slug>_<os>_click.
export function gaOS(os: OS): string {
  if (os === 'mac') return 'macos';
  if (os === 'linux') return 'linux';
  return 'windows';
}

// The demo download URL for a given OS, or undefined if there's no build.
export function osDemoUrl(p: Product, os: OS): string | undefined {
  if (os === 'mac') return p.demoMac;
  if (os === 'linux') return p.demoLinux;
  return p.demoWin;
}

// The OSes this product actually ships a build for, in display order.
// Deduped by URL so free utilities that reuse one file across Win/Mac
// (e.g. YouAreNotCrazy) only surface a single button.
export function availableOSes(p: Product): OS[] {
  const seen = new Set<string>();
  const out: OS[] = [];
  for (const os of OS_ORDER) {
    const url = osDemoUrl(p, os);
    if (url && !seen.has(url)) { seen.add(url); out.push(os); }
  }
  return out;
}

// Lead with the visitor's OS when there's a build for it, else fall back to
// the first available (Windows) so a Linux visitor never downloads a Win build.
export function resolvePrimaryOS(detected: OS, p: Product): OS {
  const avail = availableOSes(p);
  return avail.includes(detected) ? detected : (avail[0] ?? 'win');
}

// The remaining OSes to offer as smaller secondary buttons.
export function otherOSes(detected: OS, p: Product): OS[] {
  const primary = resolvePrimaryOS(detected, p);
  return availableOSes(p).filter(os => os !== primary);
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
