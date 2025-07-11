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
    // gtag('event', 'buy_marco', {
    //   event_category: 'engagement',
    //   event_label: 'Buy Marco Button',
    //   value: 1
    // });

    // // Wait 300ms to ensure GA logs the event before redirecting
    // setTimeout(function () {
    //   window.location.href = "https://brucejames.gumroad.com/l/marco?wanted=true";
    // }, 300);
  }
}
