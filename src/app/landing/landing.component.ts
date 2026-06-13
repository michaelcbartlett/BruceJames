import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild, ElementRef, ViewEncapsulation, Inject } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';

const BA_CONFIG = {
  before: { meta: "Drummer's room mics · raw bus · −6.2 dB peak · phase OFF", color: "var(--bj-teal-tint)", seed: 7,  scale: 1 },
  after:  { meta: "Drummer's room mics · corrected · −6.2 dB peak · phase ON",  color: "var(--bj-pink-tint)", seed: 42, scale: 1 },
  diff:   { meta: "Difference · only the low end DeepPerfection put back",       color: "var(--bj-brass)",     seed: 88, scale: 0.42 },
} as const;

@Component({
  selector: 'app-landing',
  imports: [],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class LandingComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('baWave')     baWaveEl!: ElementRef<HTMLElement>;
  @ViewChild('baMeta')     baMetaEl!: ElementRef<HTMLElement>;
  @ViewChild('explainWave1') wave1!: ElementRef<HTMLElement>;
  @ViewChild('explainWave2') wave2!: ElementRef<HTMLElement>;
  @ViewChild('explainWave3') wave3!: ElementRef<HTMLElement>;

  baMode: 'before' | 'after' | 'diff' = 'before';
  supportEmail = 'support@brucejames.studio';

  private observer: IntersectionObserver | null = null;

  constructor(
    private titleService: Title,
    private metaService: Meta,
    @Inject(DOCUMENT) private doc: Document
  ) {}

  ngOnInit() {
    this.titleService.setTitle('BruceJames — Plugins that should exist but don\'t');
    this.metaService.updateTag({ name: 'description', content: 'Deep, specific audio plugins for mixing engineers. Phase correction, spatial placement, dynamic movement. VST3 · AU · CLAP — Windows & macOS.' });
    this.metaService.updateTag({ property: 'og:title', content: 'BruceJames — Plugins that should exist but don\'t' });
    this.metaService.updateTag({ name: 'twitter:title', content: 'BruceJames — Plugins that should exist but don\'t' });
  }

  ngAfterViewInit() {
    this.buildWave(this.baWaveEl.nativeElement, 64, BA_CONFIG.before.seed, 1, BA_CONFIG.before.color);
    this.buildExplainWaves();

    this.observer = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in-view'); this.observer!.unobserve(e.target); } }),
      { threshold: 0.1 }
    );
    this.doc.querySelectorAll('.reveal').forEach(el => this.observer!.observe(el));
  }

  ngOnDestroy() { this.observer?.disconnect(); }

  setBA(mode: 'before' | 'after' | 'diff') {
    this.baMode = mode;
    const cfg = BA_CONFIG[mode];
    this.baMetaEl.nativeElement.textContent = cfg.meta;
    this.buildWave(this.baWaveEl.nativeElement, 64, cfg.seed, cfg.scale, cfg.color);
  }

  togglePlay(e: Event) {
    const btn = e.currentTarget as HTMLButtonElement;
    btn.innerHTML = btn.innerHTML.includes('9654') ? '&#10074;&#10074;' : '&#9654;';
  }

  private buildWave(el: HTMLElement, n: number, seed: number, scale: number, color: string) {
    el.innerHTML = '';
    let s = seed;
    const rnd = () => { s = (s * 9301 + 49297) % 233280; return s / 233280; };
    for (let i = 0; i < n; i++) {
      const b = this.doc.createElement('i');
      const env = Math.sin((i / n) * Math.PI);
      b.style.height = Math.max(4, (8 + rnd() * 48 * (0.4 + env)) * scale) + '%';
      b.style.background = color;
      el.appendChild(b);
    }
  }

  private buildExplainWaves() {
    [this.wave1, this.wave2, this.wave3].forEach((ref, idx) => {
      if (!ref) return;
      ref.nativeElement.innerHTML = '';
      for (let i = 0; i < 28; i++) {
        const b = this.doc.createElement('i');
        const phase = idx === 2 ? 0 : idx * 0.6;
        const h = 50 + 45 * Math.sin(i / 2.2 + phase);
        b.style.height = Math.max(8, idx === 1 && i % 2 ? h * 0.4 : h) + '%';
        ref.nativeElement.appendChild(b);
      }
    });
  }

  private pushEvent(event: string, label: string) {
    if (typeof window !== 'undefined' && (window as any).dataLayer) {
      (window as any).dataLayer.push({ event, event_category: 'engagement', event_label: label, value: 1 });
    }
  }

  handleBuyDeepPerfectionClick()             { this.pushEvent('buy_deepperfection_click', 'Buy DeepPerfection Button'); }
  handleDownloadDeepPerfectionWindowsClick() { this.pushEvent('dl_deepperfection_windows_click', 'Download DeepPerfection Windows Button'); }
  handleDownloadDeepPerfectionMacOSClick()   { this.pushEvent('dl_deepperfection_macos_click', 'Download DeepPerfection macOS Button'); }
  handleBuyMarcoClick()                      { this.pushEvent('buy_marco_click', 'Buy Marco Button'); }
  handleBuySlushBusClick()                   { this.pushEvent('buy_slushbus_click', 'Buy SlushBus Button'); }
  handleDownloadWindowsClick()               { this.pushEvent('dl_marco_windows_click', 'Download Marco Windows Button'); }
  handleDownloadmacOSClick()                 { this.pushEvent('dl_marco_macos_click', 'Download Marco macOS Button'); }
  handleDownloadSlushBusWindowsClick()       { this.pushEvent('dl_slushbus_windows_click', 'Download SlushBus Windows Button'); }
  handleDownloadSlushBusmacOSClick()         { this.pushEvent('dl_slushbus_macos_click', 'Download SlushBus macOS Button'); }
  handleDownloadYouAreNotCrazyWindowsClick() { this.pushEvent('dl_youarenotcrazy_windows_click', 'Download YouAreNotCrazy Windows Button'); }
  handleDownloadYouAreNotCrazyMacOSClick()   { this.pushEvent('dl_youarenotcrazy_macos_click', 'Download YouAreNotCrazy macOS Button'); }
  handleNotifyLongDivisionClick()            { this.pushEvent('notify_longdivision_click', 'longDivision Get Notified Button'); }
  handleBuyLongDivisionClick()               { this.pushEvent('buy_longdivision_click', 'longDivision Get It Button'); }
  handleDownloadLongDivisionWindowsClick()   { this.pushEvent('dl_longdivision_windows_click', 'Download longDivision Windows Button'); }
  handleDownloadLongDivisionMacOSClick()     { this.pushEvent('dl_longdivision_macos_click', 'Download longDivision macOS Button'); }
  handleCtaClick(label: string)              { this.pushEvent('cta_click', label); }
  handleNewsletterSubmit()                   { this.pushEvent('newsletter_signup', 'Mailing List Signup Form'); }
}
