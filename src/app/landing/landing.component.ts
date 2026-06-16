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
