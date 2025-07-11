import { Component } from '@angular/core';

declare function gtag(command: 'event', eventName: string, params?: { [key: string]: any }): void;

@Component({
  selector: 'app-landing',
  imports: [],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss'
})
export class LandingComponent {
  handleBuyMarcoClick() {
    if (typeof window !== 'undefined' && Array.isArray((window as any).dataLayer)) {
        (window as any).dataLayer.push({
          event: 'buy_marco',
          event_category: 'engagement',
          event_label: 'Buy Marco Button',
          value: 1
        });
      } else {
        console.warn('dataLayer is not defined');
      }

      setTimeout(() => {
        window.location.href = 'https://brucejames.gumroad.com/l/marco?wanted=true';
      }, 300);
  }
}
