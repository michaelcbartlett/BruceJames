import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
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
}
