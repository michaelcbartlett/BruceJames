import { Routes } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { ManageLicenseComponent } from './manage-license/manage-license.component';
import { MusicComponent } from './music/music.component';

export const routes: Routes = [
    { path: '',             component: LandingComponent },
    { path: 'manage-license', component: ManageLicenseComponent },
    { path: 'music',        component: MusicComponent },
];
