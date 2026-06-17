import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Title, Meta } from '@angular/platform-browser';

interface NumberResponse {
  status: 'member' | 'prospect' | 'invalid';
  number?: number;
}

interface MerchItem {
  name: string;
  tagline: string;
  placement: string;
  price: string;
  buyUrl: string;
  img: string;
}

@Component({
  selector: 'app-merch',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './merch.component.html',
  styleUrl: './merch.component.scss',
})
export class MerchComponent {
  private readonly API = 'https://api.brucejames.studio/api';

  email = '';
  loading = false;
  checked = false;
  error = '';
  result: { status: string; number: number } | null = null;

  // Product photos are placeholders until real mockups are added to /public.
  brokenImg = new Set<string>();
  imgError(name: string): void { this.brokenImg.add(name); }

  // Prices and buy links are placeholders until the Gumroad merch listings exist.
  items: MerchItem[] = [
    //{
    //  name: 'Serial Tee',
    //  tagline: 'Quiet on the body. Your number lives on the sleeve like a maker’s mark.',
    //  placement: 'Number on the right sleeve',
    //  price: '$34',
    //  buyUrl: '#',
    //  img: '/merch-serial-tee.png',
    //},
    //{
    //  name: 'Maker’s Mark Tee',
    //  tagline: 'Bold two-ink graphic on the back. Your number stamped at the back neck.',
    //  placement: 'Number at the back neck',
    //  price: '$34',
    //  buyUrl: '#',
    //  img: '/merch-makers-mark-tee.png',
    //},
    //{
    //  name: 'Workshop Hoodie',
    //  tagline: 'Heavyweight and minimal. Your number sits on the cuff like a toolmark.',
    //  placement: 'Number on the left cuff',
    //  price: '$58',
    //  buyUrl: '#',
    //  img: '/merch-workshop-hoodie.png',
    //},
    {
      name: 'Customer Numbered Pint Glass',
      tagline: 'A shaker pint glass printed with your permanent BruceJames customer number.',
      placement: 'Number below logo',
      price: '$19.45',
      buyUrl: 'https://brucejames.gumroad.com/l/pintglass',
      img: '/shaker-pint-glass.png',
    },
  ];

  constructor(private http: HttpClient, title: Title, meta: Meta) {
    title.setTitle('Numbered Merch | BruceJames');
    meta.updateTag({
      name: 'description',
      content: 'Numbered BruceJames merch. Your customer number, by order of your first purchase, printed on every piece. Check yours.',
    });
  }

  /** "№ 00042" */
  fmt(n: number): string {
    return '№ ' + String(n).padStart(5, '0');
  }

  checkNumber(): void {
    const email = this.email.trim().toLowerCase();
    this.error = '';
    if (!email || !email.includes('@')) {
      this.error = 'Enter a valid email address.';
      return;
    }
    this.loading = true;
    this.checked = false;
    this.result = null;
    this.http.post<NumberResponse>(`${this.API}/merch/number/`, { email }).subscribe({
      next: (r) => {
        this.loading = false;
        this.checked = true;
        this.result = { status: r.status, number: r.number ?? 0 };
      },
      error: () => {
        this.loading = false;
        this.error = 'Could not check right now. Try again in a moment.';
      },
    });
  }

  reset(): void {
    this.checked = false;
    this.result = null;
    this.email = '';
    this.error = '';
  }
}
