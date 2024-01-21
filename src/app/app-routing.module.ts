import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AboutPageComponent } from './shared/pages/about-page/about-page.component';
import { ContactPageComponent } from './shared/pages/contact-page/contact-page.component';
import { HomePageComponent } from './shared/pages/home-page/home-page.component';
import { CountryPageComponent } from './countries/pages/country-page/country-page.component';
import { PrivacyPolicyPageComponent } from './shared/pages/privacy-policy-page/privacy-policy-page.component';
import { CookieAdvisePageComponent } from './shared/pages/cookie-advise-page/cookie-policy-page.component';
import { LegalAdviseComponent } from './shared/pages/legal-advise/legal-advise.component';

const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
  },
  {
    path: 'about',
    component: AboutPageComponent
  },
  {
    path: 'privacy-policy',
    component: PrivacyPolicyPageComponent
  },
  {
    path: 'cookie-policy',
    component: CookieAdvisePageComponent
  },
  {
    path: 'legal-advise',
    component: LegalAdviseComponent
  },
  {
    path: 'contact',
    component: ContactPageComponent
  },
  {
    path: 'countries',
    loadChildren: () => import('./countries/countries.module').then( m => m.CountriesModule )
  },
  {
    path: '**',
    redirectTo: 'countries'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot( routes ),
  ],
  exports: [
    RouterModule,
  ]
})
export class AppRoutingModule { }
