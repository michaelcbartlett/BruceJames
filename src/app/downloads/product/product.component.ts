import { Component, OnInit, ViewEncapsulation, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser';
import { getProduct, getComparison, DEEP_DIVES, DEFAULT_PROMO, Product, DeepDive, ComparisonSet } from '../../shared/plugin-catalog';
import { OS, detectOS, osLabel, gaOS, pushEvent, buyHref, osDemoUrl, resolvePrimaryOS, otherOSes, recordDownloadClick, recordBuyClick } from '../../shared/site-utils';
import { TrafficSourceService } from '../../shared/traffic-source.service';
import { ComparePlayerComponent } from '../../shared/compare-player/compare-player.component';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [RouterLink, ComparePlayerComponent],
  templateUrl: './product.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class ProductComponent implements OnInit {
  product!: Product;
  deep!: DeepDive;
  comparison?: ComparisonSet;
  readonly promoDefault = DEFAULT_PROMO;

  detectedOS: OS = 'win';
  osLabel = osLabel;

  buyHref(url: string | undefined, content: string): string {
    return buyHref(url, content, this.trafficSource.source, this.trafficSource.medium);
  }

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private titleService: Title,
    private metaService: Meta,
    @Inject(DOCUMENT) private doc: Document,
    private trafficSource: TrafficSourceService,
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
    this.comparison = getComparison(slug);
    this.detectedOS = detectOS();

    this.setSeo(slug, product, deep);
  }

  // Per-route SEO: title, description, canonical, Open Graph / Twitter cards
  // (so each deep dive previews with its own image + copy), plus Product JSON-LD.
  private setSeo(slug: string, p: Product, deep: DeepDive): void {
    const base = 'https://brucejames.studio';
    const url = `${base}/downloads/${slug}`;
    const image = `${base}${p.img}`;

    this.titleService.setTitle(deep.title);
    this.metaService.updateTag({ name: 'description', content: deep.metaDescription });

    this.metaService.updateTag({ property: 'og:type', content: 'product' });
    this.metaService.updateTag({ property: 'og:title', content: deep.title });
    this.metaService.updateTag({ property: 'og:description', content: deep.metaDescription });
    this.metaService.updateTag({ property: 'og:url', content: url });
    this.metaService.updateTag({ property: 'og:image', content: image });
    this.metaService.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.metaService.updateTag({ name: 'twitter:title', content: deep.title });
    this.metaService.updateTag({ name: 'twitter:description', content: deep.metaDescription });
    this.metaService.updateTag({ name: 'twitter:image', content: image });

    // Canonical <link> (Meta service only handles <meta>, so set the link directly).
    let canonical = this.doc.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonical) {
      canonical = this.doc.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      this.doc.head.appendChild(canonical);
    }
    canonical.setAttribute('href', url);

    // Product JSON-LD with offer, for rich results on the deep-dive page.
    const ld = {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: p.name,
      brand: { '@type': 'Brand', name: 'BruceJames' },
      image: [image],
      description: deep.metaDescription,
      offers: {
        '@type': 'Offer',
        price: p.free ? '0' : (p.price ?? '').replace(/[^0-9.]/g, ''),
        priceCurrency: 'USD',
        url: p.free ? url : buyHref(p.buyUrl, 'product_schema').split('?')[0],
        availability: 'https://schema.org/InStock',
      },
    };
    this.injectJsonLd('product-jsonld', ld);

    // FAQPage JSON-LD — what answer engines (ChatGPT, Perplexity, Google AI
    // Overviews) extract to quote your plugin's answers directly.
    if (deep.faq?.length) {
      this.injectJsonLd('faq-jsonld', {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: deep.faq.map(f => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a },
        })),
      });
    } else {
      this.doc.getElementById('faq-jsonld')?.remove();
    }
  }

  private injectJsonLd(id: string, data: unknown): void {
    this.doc.getElementById(id)?.remove();
    const script = this.doc.createElement('script');
    script.id = id;
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(data);
    this.doc.head.appendChild(script);
  }

  get promo(): string { return this.deep.promo ?? this.promoDefault; }

  get primaryOS(): OS { return resolvePrimaryOS(this.detectedOS, this.product); }
  get otherOSes(): OS[] { return otherOSes(this.detectedOS, this.product); }

  demoUrl(os: OS): string { return osDemoUrl(this.product, os) ?? this.product.demoWin; }

  demoLabel(os: OS): string {
    return `${this.product.free ? 'Download free' : 'Download demo'} · ${osLabel(os)}`;
  }

  trackDemo(os: OS): void {
    pushEvent(`dl_${this.product.slug}_${gaOS(os)}_click`, `${this.product.name} demo (${osLabel(os)})`);
    recordDownloadClick(this.product.slug, os);
  }

  trackBuy(): void {
    pushEvent(`buy_${this.product.slug}_click`, `${this.product.name} buy`);
    recordBuyClick(this.product.slug);
  }

  trackHearFullTrack(): void {
    pushEvent('compare_full_track_click', this.product.name);
  }
}
