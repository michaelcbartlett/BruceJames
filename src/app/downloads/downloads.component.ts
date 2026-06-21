import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser';
import { PRODUCTS, DEEP_DIVES, DEFAULT_PROMO, BUNDLE, Product, DeepDive } from '../shared/plugin-catalog';
import { OS, detectOS, osLabel, isHandoffDevice, pushEvent, buyHref } from '../shared/site-utils';

@Component({
  selector: 'app-downloads',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './downloads.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class DownloadsComponent implements OnInit {
  readonly products = PRODUCTS;
  readonly bundle = BUNDLE;
  readonly promo = DEFAULT_PROMO;

  detectedOS: OS = 'win';
  isMobile = false;
  copied = false;
  emailHref = '#';
  pageUrl = 'https://brucejames.studio/downloads';

  constructor(private titleService: Title, private metaService: Meta) {}

  ngOnInit(): void {
    this.titleService.setTitle('Download the demos · BruceJames');
    this.metaService.updateTag({
      name: 'description',
      content: 'Every BruceJames plugin, free to demo. The demo is the full plugin; it just drops to silence now and then until you buy. VST3 · AU · CLAP · Windows & macOS. No account, no card.',
    });

    this.detectedOS = detectOS();
    this.isMobile = isHandoffDevice();
    if (typeof location !== 'undefined') {
      this.pageUrl = location.href.split('#')[0];
      const subject = encodeURIComponent('BruceJames plugin demos');
      const body = 'The BruceJames plugin demos (free, full versions). Open this on your desktop to install:%0D%0A%0D%0A' + encodeURIComponent(this.pageUrl);
      this.emailHref = `mailto:?subject=${subject}&body=${body}`;
    }
  }

  dd(slug: string): DeepDive { return DEEP_DIVES[slug]; }

  get primaryOS(): OS { return this.detectedOS; }
  get otherOS(): OS { return this.detectedOS === 'mac' ? 'win' : 'mac'; }
  osLabel = osLabel;
  buyHref = buyHref;

  demoUrl(p: Product, os: OS): string { return os === 'mac' ? p.demoMac : p.demoWin; }
  hasOtherOS(p: Product): boolean { return p.demoWin !== p.demoMac; }

  demoLabel(p: Product, os: OS): string {
    return `${p.free ? 'Download free' : 'Download demo'} · ${osLabel(os)}`;
  }

  trackDemo(p: Product, os: OS): void {
    pushEvent(`dl_${p.slug}_${os === 'mac' ? 'macos' : 'windows'}_click`, `${p.name} demo (${osLabel(os)})`);
  }

  trackBuy(p: Product): void {
    pushEvent(`buy_${p.slug}_click`, `${p.name} buy`);
  }

  trackBundle(): void {
    pushEvent('buy_everything_click', 'Everything bundle');
  }

  copyLink(): void {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(this.pageUrl).then(() => {
        this.copied = true;
        setTimeout(() => (this.copied = false), 1800);
      });
    }
    pushEvent('handoff_copy_link', 'Downloads hub');
  }

  scrollTop(): void {
    if (typeof window !== 'undefined') window.scrollTo({ top: 0, behavior: 'smooth' });
    pushEvent('cta_click', 'Back to the demos');
  }
}
