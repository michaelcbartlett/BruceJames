import { Component, OnInit, ViewEncapsulation, Inject } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-landing',
  imports: [],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class LandingComponent implements OnInit {

  supportEmail = 'support@brucejames.studio';

  constructor(
    private titleService: Title,
    private metaService: Meta,
    @Inject(DOCUMENT) private doc: Document
  ) {}

  ngOnInit() {
    this.titleService.setTitle('DeepPerfection by BruceJames');

    this.metaService.updateTag({ name: 'description', content: 'Perfect phase correction with no effort. Take the guesswork out of your low end and feel the chest-thumping bass again. $49.99. Windows available now.' });

    this.metaService.updateTag({ property: 'og:title', content: 'DeepPerfection by BruceJames' });
    this.metaService.updateTag({ property: 'og:description', content: 'Perfect phase correction with no effort. Take the guesswork out of your low end and feel the chest-thumping bass again.' });

    this.metaService.updateTag({ name: 'twitter:title', content: 'DeepPerfection by BruceJames' });
    this.metaService.updateTag({ name: 'twitter:description', content: 'Perfect phase correction with no effort. Take the guesswork out of your low end and feel the chest-thumping bass again.' });
  }

  private pushEvent(event: string, label: string) {
    if (typeof window !== 'undefined' && (window as any).dataLayer) {
      (window as any).dataLayer.push({
        event,
        event_category: 'engagement',
        event_label: label,
        value: 1
      });
    }
  }

  handleBuyDeepPerfectionClick()              { this.pushEvent('buy_deepperfection_click', 'Buy DeepPerfection Button'); }
  handleDownloadDeepPerfectionWindowsClick()  { this.pushEvent('dl_deepperfection_windows_click', 'Download DeepPerfection Windows Button'); }
  handleDownloadDeepPerfectionMacOSClick()    { this.pushEvent('dl_deepperfection_macos_click', 'Download DeepPerfection macOS Button'); }
  handleBuyMarcoClick()          { this.pushEvent('buy_marco_click', 'Buy Marco Button'); }
  handleBuySlushBusClick()       { this.pushEvent('buy_slushbus_click', 'Buy SlushBus Button'); }
  handleDownloadWindowsClick()   { this.pushEvent('dl_marco_windows_click', 'Download Marco Windows Button'); }
  handleDownloadmacOSClick()     { this.pushEvent('dl_marco_macos_click', 'Download Marco macOS Button'); }
  handleDownloadSlushBusWindowsClick() { this.pushEvent('dl_slushbus_windows_click', 'Download SlushBus Windows Button'); }
  handleDownloadSlushBusmacOSClick()   { this.pushEvent('dl_slushbus_macos_click', 'Download SlushBus macOS Button'); }
}
