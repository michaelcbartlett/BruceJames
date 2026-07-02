import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { PRODUCTS } from '../shared/plugin-catalog';

@Component({
  selector: 'app-guides',
  standalone: true,
  imports: [],
  templateUrl: './guides.component.html',
  styleUrls: ['./guides.component.scss'],
})
export class GuidesComponent implements OnInit {
  readonly withGuide = PRODUCTS.filter(p => p.guideUrl);
  readonly withoutGuide = PRODUCTS.filter(p => !p.guideUrl);

  constructor(private titleService: Title, private metaService: Meta) {}

  ngOnInit(): void {
    this.titleService.setTitle('User Guides · BruceJames');
    this.metaService.updateTag({
      name: 'description',
      content: 'Read the manual for every BruceJames plugin: what it does, every control explained, workflows, and troubleshooting.',
    });
  }
}
