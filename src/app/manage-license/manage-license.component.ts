import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

interface Activation {
  id: number;
  fingerprint: string;
  alias: string | null;
  hostname: string;
  os_name: string;
  activated_at: string;
}

interface LookupResponse {
  status: string;
  product?: string;
  max_activations?: number;
  activations?: Activation[];
}

@Component({
  selector: 'app-manage-license',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './manage-license.component.html',
  styleUrl: './manage-license.component.scss'
})
export class ManageLicenseComponent {
  private readonly API = 'https://api.brucejames.studio/api';

  email       = '';
  licenseKey  = '';
  loading     = false;
  error       = '';

  product        = '';
  maxActivations = 0;
  activations: Activation[] = [];
  deactivating: number | null = null;
  successMessage = '';

  get looked_up() { return this.activations.length > 0 || this.product !== ''; }

  constructor(private http: HttpClient) {}

  lookup() {
    this.error = '';
    this.successMessage = '';
    this.product = '';
    this.activations = [];
    if (!this.email.trim() || !this.licenseKey.trim()) {
      this.error = 'Please enter both your email and license key.';
      return;
    }
    this.loading = true;
    this.http.post<LookupResponse>(`${this.API}/license/lookup/`, {
      email: this.email.trim(),
      license_key: this.licenseKey.trim()
    }).subscribe({
      next: (res) => {
        this.loading = false;
        if (res.status === 'ok') {
          this.product        = res.product ?? '';
          this.maxActivations = res.max_activations ?? 0;
          this.activations    = res.activations ?? [];
        } else {
          this.error = 'License not found. Please check your email and license key.';
        }
      },
      error: () => {
        this.loading = false;
        this.error = 'License not found. Please check your email and license key.';
      }
    });
  }

  deactivate(activation: Activation) {
    this.error = '';
    this.successMessage = '';
    this.deactivating = activation.id;
    this.http.post<{ status: string }>(`${this.API}/license/deactivate/`, {
      email: this.email.trim(),
      license_key: this.licenseKey.trim(),
      activation_id: activation.id
    }).subscribe({
      next: (res) => {
        this.deactivating = null;
        if (res.status === 'ok') {
          this.activations = this.activations.filter(a => a.id !== activation.id);
          this.successMessage = 'Activation removed. That slot is now free for a new machine.';
        } else {
          this.error = 'Could not remove that activation. Please try again.';
        }
      },
      error: () => {
        this.deactivating = null;
        this.error = 'Could not remove that activation. Please try again.';
      }
    });
  }

  reset() {
    this.product = '';
    this.activations = [];
    this.error = '';
    this.successMessage = '';
  }
}
