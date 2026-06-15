import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild, ElementRef, ViewEncapsulation, Inject } from '@angular/core';
import { NgFor } from '@angular/common';
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
}

@Component({
  selector: 'app-landing',
  imports: [NgFor],
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
      tracks: [
        { label: 'Without DeepPerfection', src: '/deepPerfectionComparisons/without%20DeepPerfection.mp3' },
        { label: 'With DeepPerfection',    src: '/deepPerfectionComparisons/With%20DeepPerfection.mp3' },
        { label: "Null (what's added)",    src: '/deepPerfectionComparisons/DeepPerfection%20Null.mp3' },
        { label: 'Just Drums',             src: '/deepPerfectionComparisons/just%20drums.mp3' },
        { label: 'Just Instruments',       src: '/deepPerfectionComparisons/just%20inst.mp3' },
      ],
    },
  ];

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
  handleBuyLongDivisionClick()              { this.pushEvent('buy_longdivision_click', 'longDivision Get It Button'); }
  handleDownloadLongDivisionWindowsClick()   { this.pushEvent('dl_longdivision_windows_click', 'Download longDivision Windows Button'); }
  handleDownloadLongDivisionMacOSClick()     { this.pushEvent('dl_longdivision_macos_click', 'Download longDivision macOS Button'); }
  handleBuySlurshClick()                     { this.pushEvent('buy_slursh_click', 'Buy Slursh Button'); }
  handleDownloadSlurshWindowsClick()         { this.pushEvent('dl_slursh_windows_click', 'Download Slursh Windows Button'); }
  handleDownloadSlurshMacOSClick()           { this.pushEvent('dl_slursh_macos_click', 'Download Slursh macOS Button'); }
  handleCtaClick(label: string)              { this.pushEvent('cta_click', label); }
  handleNewsletterSubmit()                   { this.pushEvent('newsletter_signup', 'Mailing List Signup Form'); }
}
