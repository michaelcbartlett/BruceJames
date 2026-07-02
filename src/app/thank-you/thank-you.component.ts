import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { getProduct, BUNDLE } from '../shared/plugin-catalog';
import { pushPurchase } from '../shared/site-utils';

// Landing point for Gumroad's "redirect to a URL after purchase" setting, e.g.
// https://brucejames.studio/thank-you?product=deepperfection (or ?product=everything
// for the bundle). Fires the GA4 purchase event that the Google Ads Conversion
// Tracking tag in GTM triggers off of, since checkout itself happens off-domain
// on Gumroad and can never fire a tag directly.
@Component({
  selector: 'app-thank-you',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './thank-you.component.html',
  styleUrls: ['./thank-you.component.scss'],
})
export class ThankYouComponent implements OnInit {
  productName = '';

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    const slug = (this.route.snapshot.queryParamMap.get('product') || '').trim().toLowerCase();
    const isBundle = slug === 'everything';
    const name = isBundle ? BUNDLE.name : getProduct(slug)?.name;
    const priceStr = isBundle ? BUNDLE.price : getProduct(slug)?.price;
    if (!name || !priceStr) return; // unknown or free product: nothing to report

    this.productName = name;

    // Guard against a page refresh double-firing the conversion.
    const guardKey = `bj-purchase-fired-${slug}`;
    try {
      if (sessionStorage.getItem(guardKey)) return;
      sessionStorage.setItem(guardKey, '1');
    } catch { /* sessionStorage blocked */ }

    const value = parseFloat(priceStr.replace(/[^0-9.]/g, '')) || 0;
    const transactionId = (typeof crypto !== 'undefined' && crypto.randomUUID)
      ? crypto.randomUUID()
      : `${slug}-${Date.now()}`;
    pushPurchase(transactionId, slug, name, value);
  }
}
