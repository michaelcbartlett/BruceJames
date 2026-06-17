import { Routes } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { ManageLicenseComponent } from './manage-license/manage-license.component';
import { MusicComponent } from './music/music.component';
import { PrivacyComponent } from './privacy/privacy.component';
import { ContactComponent } from './contact/contact.component';
import { MerchComponent } from './merch/merch.component';

export const routes: Routes = [
    { path: '',             component: LandingComponent },
    { path: 'merch',        component: MerchComponent, title: 'Numbered Merch | BruceJames' },
    { path: 'manage-license', component: ManageLicenseComponent },
    { path: 'music',        component: MusicComponent },
    { path: 'privacy',      component: PrivacyComponent, title: 'Privacy Policy | BruceJames' },
    { path: 'contact',      component: ContactComponent, title: 'Contact | BruceJames' },
];
