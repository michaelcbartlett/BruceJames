import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-consent-banner',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './consent-banner.component.html',
  styleUrls: ['./consent-banner.component.scss']
})
export class ConsentBannerComponent implements OnInit {
  visible = false;

  ngOnInit() {
    try {
      this.visible = localStorage.getItem('bj-consent') === null;
    } catch {
      this.visible = false;
    }
  }

  accept() {
    try { localStorage.setItem('bj-consent', 'granted'); } catch {}
    (window as any).bjLoadGtm?.();
    this.visible = false;
  }

  decline() {
    try { localStorage.setItem('bj-consent', 'denied'); } catch {}
    this.visible = false;
  }
}
