import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild, ElementRef, ViewEncapsulation, Inject } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { Title, Meta } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';

interface ComparisonTrack {
  label: string;
  src: string;
}

interface ComparisonSet {
  plugin: string;
  description: string;
  tracks: ComparisonTrack[];
  sourceUrl?: string;
  sourceLabel?: string;
  downloadWin?: string;
  downloadMac?: string;
  buyUrl?: string;
  price?: string;
}

type OS = 'win' | 'mac';

interface Product {
  slug: string;        // matches GA event names: buy_<slug>_click, dl_<slug>_<os>_click
  name: string;
  category: string;
  img: string;
  imgContain?: boolean;
  badge?: string;
  blurb: string;
  free?: boolean;
  freeNote?: string;
  price?: string;
  buyUrl?: string;
  demoWin: string;
  demoMac: string;
}

@Component({
  selector: 'app-landing',
  imports: [NgFor, NgIf],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class LandingComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('playerAudio') audioEl!: ElementRef<HTMLAudioElement>;
  @ViewChild('explainWave1') wave1!: ElementRef<HTMLElement>;
  @ViewChild('explainWave2') wave2!: ElementRef<HTMLElement>;
  @ViewChild('explainWave3') wave3!: ElementRef<HTMLElement>;

  readonly comparisons: ComparisonSet[] = [
    {
      plugin: 'DeepPerfection',
      description: 'Five stems from the same session. Switch between them and hear exactly what DeepPerfection puts back.',
      sourceUrl: 'https://youtu.be/HeBwRGEeUCs?si=eHYd5mzpg2BISHll',
      sourceLabel: 'hear the full track',
      downloadWin: 'https://f005.backblazeb2.com/file/BruceJames-Marco/DeepPerfection_1.2.2.zip',
      downloadMac: 'https://f005.backblazeb2.com/file/BruceJames-Marco/DeepPerfection-1.2.2-mac.pkg',
      buyUrl: 'https://brucejames.gumroad.com/l/deepperfection?wanted=true',
      price: '$49.99',
      tracks: [
        { label: 'Without DeepPerfection', src: '/deepPerfectionComparisons/without%20DeepPerfection.mp3' },
        { label: 'With DeepPerfection',    src: '/deepPerfectionComparisons/With%20DeepPerfection.mp3' },
        { label: "Null (what's added)",    src: '/deepPerfectionComparisons/DeepPerfection%20Null.mp3' },
        { label: 'Just Drums',             src: '/deepPerfectionComparisons/just%20drums.mp3' },
        { label: 'Just Instruments',       src: '/deepPerfectionComparisons/just%20inst.mp3' },
      ],
    },
    {
      plugin: 'longDivision',
      description: 'Same drum loop, five widths. Hear the stereo field open up — and the LFO put it in motion.',
      downloadWin: 'https://f005.backblazeb2.com/file/BruceJames-Marco/LongDivision_1.0.0.zip',
      downloadMac: 'https://f005.backblazeb2.com/file/BruceJames-Marco/LongDivision_1.0.0_mac.zip',
      buyUrl: 'https://brucejames.gumroad.com/l/longDivision?wanted=true',
      price: '$29.99',
      tracks: [
        { label: 'Dry',                    src: '/longDivisionComparison/drums%20dry.mp3' },
        { label: 'Width 1',                src: '/longDivisionComparison/width%20at%201.mp3' },
        { label: 'Width 3',                src: '/longDivisionComparison/Width%20at%203.mp3' },
        { label: 'Width 3 + LFO',          src: '/longDivisionComparison/Width%20at%203%20with%20LFO.mp3' },
        { label: 'Width 3, Quiet Emphasis', src: '/longDivisionComparison/width%203%20quiet%20emphasis.mp3' },
      ],
    },
    {
      plugin: 'Slursh',
      description: 'Same loop, five settings. Hear the drive and collapse stack up.',
      downloadWin: 'https://f005.backblazeb2.com/file/BruceJames-Marco/Slursh_1.0.0.zip',
      downloadMac: 'https://f005.backblazeb2.com/file/BruceJames-Marco/Slursh_1.0.0_mac.zip',
      buyUrl: 'https://brucejames.gumroad.com/l/slursh?wanted=true',
      price: '$29.99',
      tracks: [
        { label: 'No Slursh',                      src: '/SlurshComparisons/No%20Slursh%20Added.mp3' },
        { label: 'Full Drive',                      src: '/SlurshComparisons/Full%20Slush.mp3' },
        { label: 'Half Drive',                      src: '/SlurshComparisons/Half%20Slush.mp3' },
        { label: 'Full Drive + Collapse',           src: '/SlurshComparisons/Full%20Slush%20plus%20COLLAPSE.mp3' },
        { label: 'Little Drive + Little Collapse',  src: '/SlurshComparisons/Little%20bit%20of%20Slush%20Little%20bit%20of%20Collapse.mp3' },
      ],
    },
  ];

  // Source of truth for the catalog cards. Order = display order.
  readonly products: Product[] = [
    {
      slug: 'deepperfection', name: 'DeepPerfection', category: 'Phase / Masking',
      img: '/plugin-deepperfection.png', badge: 'New',
      blurb: "Phase correction that just works, doesn't miss, and doesn't ruin your audio. It's as simple as that. It may sound too good to be true. Just try it.",
      price: '$49.99', buyUrl: 'https://brucejames.gumroad.com/l/deepperfection?wanted=true',
      demoWin: 'https://f005.backblazeb2.com/file/BruceJames-Marco/DeepPerfection_1.2.2.zip',
      demoMac: 'https://f005.backblazeb2.com/file/BruceJames-Marco/DeepPerfection-1.2.2-mac.pkg',
    },
    {
      slug: 'marco', name: 'Marco', category: 'Stereo / Space',
      img: '/plugin-marco.png',
      blurb: 'Place anything in the stereo field by hand. An XY space for width, depth and focus that feels real.',
      price: '$29.99', buyUrl: 'https://plugins.brucejames.studio?wanted=true',
      demoWin: 'https://f005.backblazeb2.com/file/BruceJames-Marco/Marco_1.1.14.zip',
      demoMac: 'https://f005.backblazeb2.com/file/BruceJames-Marco/Marco_1.1.14_mac.zip',
    },
    {
      slug: 'slushbus', name: 'SlushBus', category: 'Dynamics / Glue',
      img: '/plugin-slushbus.png',
      blurb: 'Bus glue with movement and more control than anything in its class. Dozens of parameters and live diagnostics that add tension and release.',
      price: '$14.99', buyUrl: 'https://brucejames.gumroad.com/l/slushbus?wanted=true',
      demoWin: 'https://f005.backblazeb2.com/file/BruceJames-Marco/SlushBus_1.1.2.zip',
      demoMac: 'https://f005.backblazeb2.com/file/BruceJames-Marco/SlushBus_1.1.2_mac.zip',
    },
    {
      slug: 'youarenotcrazy', name: 'YouAreNotCrazy', category: 'Utility / Diagnostics',
      img: '/plugin-youarenotcrazy.png', imgContain: true, badge: 'New',
      blurb: 'Something in your mix feels early? Late? Off? This measures the actual timing offset in milliseconds and shows you. Because you are not crazy, and now you can prove it.',
      free: true, freeNote: 'no demo nag, no account',
      demoWin: 'https://f005.backblazeb2.com/file/BruceJames-Marco/YouAreNotCrazy_1.0.0.zip',
      demoMac: 'https://f005.backblazeb2.com/file/BruceJames-Marco/YouAreNotCrazy_1.0.0_mac.zip',
    },
    {
      slug: 'longdivision', name: 'longDivision', category: 'Stereo / Width',
      img: '/plugin-longdivision.png', badge: 'New',
      blurb: 'A stereo widener that splits the spectrum into bands and widens only the correlation range you choose. Target the loud or the quiet, shape it with an LFO and envelopes, keep the rest untouched.',
      price: '$29.99', buyUrl: 'https://brucejames.gumroad.com/l/longDivision?wanted=true',
      demoWin: 'https://f005.backblazeb2.com/file/BruceJames-Marco/LongDivision_1.0.0.zip',
      demoMac: 'https://f005.backblazeb2.com/file/BruceJames-Marco/LongDivision_1.0.0_mac.zip',
    },
    {
      slug: 'slursh', name: 'Slursh', category: 'Saturator / Dynamics',
      img: '/plugin-slursh.png', badge: 'New',
      blurb: 'A clipper based on the depump section of SlushBus, plus a collapse section to make this plugin FEEL insane.',
      price: '$29.99', buyUrl: 'https://brucejames.gumroad.com/l/slursh?wanted=true',
      demoWin: 'https://f005.backblazeb2.com/file/BruceJames-Marco/Slursh_1.0.0.zip',
      demoMac: 'https://f005.backblazeb2.com/file/BruceJames-Marco/Slursh_1.0.0_mac.zip',
    },
  ];

  // Best guess at the visitor's OS so we can lead with the right demo download.
  // Stays 'win' during prerender (no navigator); corrected on the client in ngOnInit.
  detectedOS: OS = 'win';

  // Bump per pricing era so Gumroad attributes sales to the right campaign.
  private readonly utmCampaign = 'site_2026';

  activeComparison = 0;
  activeTrack = 0;
  isPlaying = false;
  progress = 0;
  currentTimeStr = '0:00';
  durationStr = '0:00';
  supportEmail = 'support@brucejames.studio';

  private savedTime = 0;
  private observer: IntersectionObserver | null = null;

  get currentTracks(): ComparisonTrack[] {
    return this.comparisons[this.activeComparison].tracks;
  }

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

    if (typeof navigator !== 'undefined') {
      const ua = ((navigator as any).userAgentData?.platform || navigator.platform || navigator.userAgent || '').toLowerCase();
      this.detectedOS = ua.includes('mac') ? 'mac' : 'win';
    }
  }

  get primaryOS(): OS { return this.detectedOS; }
  get otherOS(): OS { return this.detectedOS === 'mac' ? 'win' : 'mac'; }

  osLabel(os: OS): string { return os === 'mac' ? 'macOS' : 'Windows'; }

  demoUrl(p: Product, os: OS): string { return os === 'mac' ? p.demoMac : p.demoWin; }

  // Append UTM tags so Gumroad attributes the sale to the site/campaign/plugin.
  buyHref(url: string | undefined, content: string): string {
    if (!url) return '#';
    const sep = url.includes('?') ? '&' : '?';
    return `${url}${sep}utm_source=brucejames_site&utm_medium=plugin_card&utm_campaign=${this.utmCampaign}&utm_content=${content}`;
  }

  trackDemo(p: Product, os: OS) {
    this.pushEvent(`dl_${p.slug}_${os === 'mac' ? 'macos' : 'windows'}_click`, `${p.name} demo (${this.osLabel(os)})`);
  }

  trackBuy(p: Product) {
    this.pushEvent(`buy_${p.slug}_click`, `${p.name} buy`);
  }

  ngAfterViewInit() {
    this.buildExplainWaves();
    this.observer = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in-view'); this.observer!.unobserve(e.target); } }),
      { threshold: 0.1 }
    );
    this.doc.querySelectorAll('.reveal').forEach(el => this.observer!.observe(el));
  }

  ngOnDestroy() {
    this.observer?.disconnect();
    this.audioEl?.nativeElement?.pause();
  }

  selectComparison(i: number) {
    if (i === this.activeComparison) return;
    const a = this.audioEl.nativeElement;
    a.pause();
    this.isPlaying = false;
    this.activeComparison = i;
    this.activeTrack = 0;
    this.savedTime = 0;
    this.progress = 0;
    this.currentTimeStr = '0:00';
    this.durationStr = '0:00';
    a.removeAttribute('src');
    a.load();
    this.pushEvent('compare_plugin_switch', this.comparisons[i].plugin);
  }

  selectTrack(i: number) {
    if (i === this.activeTrack && this.audioEl.nativeElement.src) return;
    const a = this.audioEl.nativeElement;
    this.savedTime = a.currentTime;
    const wasPlaying = this.isPlaying;
    this.activeTrack = i;

    const onReady = () => {
      const target = Math.min(this.savedTime, a.duration || 0);
      if (target > 0) a.currentTime = target;
      this.durationStr = this.fmtTime(a.duration);
      if (wasPlaying) a.play().catch(() => {});
    };

    a.addEventListener('loadedmetadata', onReady, { once: true });
    a.src = this.currentTracks[i].src;
    a.load();
    this.pushEvent('compare_track_select', `${this.comparisons[this.activeComparison].plugin} — ${this.currentTracks[i].label}`);
  }

  togglePlay() {
    const a = this.audioEl.nativeElement;
    if (!a.src) {
      this.isPlaying = true;
      this.selectTrack(this.activeTrack);
      return;
    }
    if (this.isPlaying) {
      a.pause();
      this.isPlaying = false;
      this.pushEvent('compare_pause', `${this.comparisons[this.activeComparison].plugin} — ${this.currentTracks[this.activeTrack].label}`);
    } else {
      a.play().catch(() => {});
      this.isPlaying = true;
      this.pushEvent('compare_play', `${this.comparisons[this.activeComparison].plugin} — ${this.currentTracks[this.activeTrack].label}`);
    }
  }

  onTimeUpdate() {
    const a = this.audioEl.nativeElement;
    this.progress = a.duration ? (a.currentTime / a.duration) * 100 : 0;
    this.currentTimeStr = this.fmtTime(a.currentTime);
  }

  onPlaying() { this.isPlaying = true; }
  onPause()   { this.isPlaying = false; }

  onLoaded() {
    this.durationStr = this.fmtTime(this.audioEl.nativeElement.duration);
  }

  onEnded() {
    this.isPlaying = false;
    this.progress = 0;
    this.currentTimeStr = '0:00';
    this.savedTime = 0;
  }

  seek(e: Event) {
    const a = this.audioEl.nativeElement;
    if (!a.src) { this.selectTrack(this.activeTrack); return; }
    if (a.duration) {
      const t = (+(e.target as HTMLInputElement).value / 100) * a.duration;
      a.currentTime = t;
      this.savedTime = t;
    }
  }

  onSeekEnd() {
    this.pushEvent('compare_seek', `${this.comparisons[this.activeComparison].plugin} — ${this.currentTracks[this.activeTrack].label}`);
  }

  handleCompareFullTrackClick() {
    this.pushEvent('compare_full_track_click', this.comparisons[this.activeComparison].plugin);
  }

  handleCompareDownloadClick(os: 'win' | 'mac') {
    this.pushEvent(`compare_download_${os}`, this.comparisons[this.activeComparison].plugin);
  }

  handleCompareBuyClick() {
    this.pushEvent('compare_buy_click', this.comparisons[this.activeComparison].plugin);
  }

  private fmtTime(s: number): string {
    if (!s || isNaN(s)) return '0:00';
    return `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}`;
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

  handleCtaClick(label: string)              { this.pushEvent('cta_click', label); }
  handleNewsletterSubmit()                   { this.pushEvent('newsletter_signup', 'Mailing List Signup Form'); }
}
