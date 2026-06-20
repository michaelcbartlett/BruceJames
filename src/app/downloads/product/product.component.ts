import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser';
import { getProduct, DEEP_DIVES, DEFAULT_PROMO, Product, DeepDive } from '../../shared/plugin-catalog';
import { OS, detectOS, osLabel, pushEvent, buyHref } from '../../shared/site-utils';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './product.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class ProductComponent implements OnInit {
  product!: Product;
  deep!: DeepDive;
  readonly promoDefault = DEFAULT_PROMO;

  detectedOS: OS = 'win';
  osLabel = osLabel;
  buyHref = buyHref;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private titleService: Title,
    private metaService: Meta,
  ) {}

  ngOnInit(): void {
    const slug = this.route.snapshot.paramMap.get('slug') ?? '';
    const product = getProduct(slug);
    const deep = DEEP_DIVES[slug];

    // Unknown slug → back to the hub.
    if (!product || !deep) {
      this.router.navigate(['/downloads']);
      return;
    }

    this.product = product;
    this.deep = deep;
    this.detectedOS = detectOS();

    this.titleService.setTitle(deep.title);
    this.metaService.updateTag({ name: 'description', content: deep.metaDescription });
  }

  get promo(): string { return this.deep.promo ?? this.promoDefault; }

  get primaryOS(): OS { return this.detectedOS; }
  get otherOS(): OS { return this.detectedOS === 'mac' ? 'win' : 'mac'; }

  demoUrl(os: OS): string { return os === 'mac' ? this.product.demoMac : this.product.demoWin; }
  get hasOtherOS(): boolean { return this.product.demoWin !== this.product.demoMac; }

  demoLabel(os: OS): string {
    return `${this.product.free ? 'Download free' : 'Download demo'} · ${osLabel(os)}`;
  }

  trackDemo(os: OS): void {
    pushEvent(`dl_${this.product.slug}_${os === 'mac' ? 'macos' : 'windows'}_click`, `${this.product.name} demo (${osLabel(os)})`);
  }

  trackBuy(): void {
    pushEvent(`buy_${this.product.slug}_click`, `${this.product.name} buy`);
  }

  trackHearFullTrack(): void {
    pushEvent('compare_full_track_click', this.product.name);
  }
}
