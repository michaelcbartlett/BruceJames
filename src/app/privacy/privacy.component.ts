import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-privacy',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './privacy.component.html',
  styleUrls: ['./privacy.component.scss']
})
export class PrivacyComponent {
  supportEmail = 'support@brucejames.studio';

  get analyticsConsent(): string {
    try {
      const v = localStorage.getItem('bj-consent');
      if (v === 'granted') return 'accepted';
      if (v === 'denied') return 'declined';
    } catch {}
    return 'not set';
  }

  resetConsent() {
    try { localStorage.removeItem('bj-consent'); } catch {}
    location.reload();
  }
}
