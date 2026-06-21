import { Component, Input, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { ComparisonSet } from '../plugin-catalog';
import { pushEvent } from '../site-utils';

// Single-plugin A/B stem player. The landing page has its own multi-plugin
// (tabbed) version; this one renders one ComparisonSet and is dropped into the
// product deep-dive "Hear it" section. Both play from the same COMPARISONS data.
@Component({
  selector: 'app-compare-player',
  standalone: true,
  imports: [NgFor, NgIf],
  templateUrl: './compare-player.component.html',
  styleUrl: './compare-player.component.scss',
})
export class ComparePlayerComponent implements OnDestroy {
  @Input({ required: true }) comparison!: ComparisonSet;
  @ViewChild('playerAudio') audioEl!: ElementRef<HTMLAudioElement>;

  activeTrack = 0;
  isPlaying = false;
  progress = 0;
  currentTimeStr = '0:00';
  durationStr = '0:00';

  private savedTime = 0;

  get tracks() { return this.comparison.tracks; }

  ngOnDestroy() {
    this.audioEl?.nativeElement?.pause();
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
    a.src = this.tracks[i].src;
    a.load();
    pushEvent('compare_track_select', `${this.comparison.plugin} — ${this.tracks[i].label}`);
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
      pushEvent('compare_pause', `${this.comparison.plugin} — ${this.tracks[this.activeTrack].label}`);
    } else {
      a.play().catch(() => {});
      this.isPlaying = true;
      pushEvent('compare_play', `${this.comparison.plugin} — ${this.tracks[this.activeTrack].label}`);
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
    pushEvent('compare_seek', `${this.comparison.plugin} — ${this.tracks[this.activeTrack].label}`);
  }

  trackSourceClick() {
    pushEvent('compare_full_track_click', this.comparison.plugin);
  }

  private fmtTime(t: number): string {
    if (!t || !isFinite(t)) return '0:00';
    const m = Math.floor(t / 60);
    const s = Math.floor(t % 60);
    return `${m}:${s.toString().padStart(2, '0')}`;
  }
}
