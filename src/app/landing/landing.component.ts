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
          event: 'buy_marco_click',
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

  handleDownloadWindowsClick() {
        if (typeof window !== 'undefined' && Array.isArray((window as any).dataLayer)) {
        (window as any).dataLayer.push({
          event: 'dl_marco_windows_click',
          event_category: 'engagement',
          event_label: 'Download Marco Windows Button',
          value: 1
        });
      } else {
        console.warn('dataLayer is not defined');
      }

      setTimeout(() => {
        window.location.href = 'https://f005.backblazeb2.com/file/BruceJames-Marco/Marco_v1_1_7_Windows.zip';
      }, 300);

  }

  handleDownloadmacOSClick() {
    if (typeof window !== 'undefined' && Array.isArray((window as any).dataLayer)) {
        (window as any).dataLayer.push({
          event: 'dl_marco_macos_click',
          event_category: 'engagement',
          event_label: 'Download Marco macOS Button',
          value: 1
        });
      } else {
        console.warn('dataLayer is not defined');
      }

      setTimeout(() => {
        window.location.href = 'https://f005.backblazeb2.com/file/BruceJames-Marco/Marco_v1_1_7_macOS.zip';
      }, 300);
  }
}
