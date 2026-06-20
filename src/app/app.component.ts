import { Component } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { HeaderComponent } from "./header/header.component";
import { ConsentBannerComponent } from "./consent-banner/consent-banner.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, ConsentBannerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'BruceJames';

  // The downloads pages ship their own promo bar + sticky header (the
  // conversion-tuned "the demo is the full plugin" design), so the global
  // site header is suppressed on those routes to avoid a double header.
  showGlobalHeader = true;

  constructor(router: Router) {
    router.events
      .pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd))
      .subscribe(e => {
        this.showGlobalHeader = !e.urlAfterRedirects.startsWith('/downloads');
      });
  }
}
