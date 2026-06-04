import { Routes } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { ManageLicenseComponent } from './manage-license/manage-license.component';

export const routes: Routes = [
    {
        path: '',
        component: LandingComponent
    },
    {
        path: 'manage-license',
        component: ManageLicenseComponent
    }
];