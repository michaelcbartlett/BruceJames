import { Component, ViewEncapsulation } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-music',
  imports: [],
  templateUrl: './music.component.html',
  styleUrl: './music.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class MusicComponent {
  constructor(private titleService: Title, private metaService: Meta) {
    this.titleService.setTitle('Bruce James — Music');
    this.metaService.updateTag({ name: 'description', content: 'Bruce James is Michael Bartlett and Andrew Goodwin. Warm, strange, handmade music. Listen on Spotify, Apple Music, YouTube.' });
  }
}
