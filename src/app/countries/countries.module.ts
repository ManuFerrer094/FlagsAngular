import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ByCapitalPageComponent } from './pages/by-capital-page/by-capital-page.component';
import { ByCountryPageComponent } from './pages/by-country-page/by-country-page.component';
import { ByRegionPageComponent } from './pages/by-region-page/by-region-page.component';
import { CountryPageComponent } from './pages/country-page/country-page.component';
import { CountriesRoutingModule } from './countries-routing.module';
import { SharedModule } from '../shared/shared.module';
import { CountryTableComponent } from './components/country-table/country-table.component';
import { GoogleMapsModule } from '@angular/google-maps'


@NgModule({
  declarations: [
    ByCapitalPageComponent,
    ByCountryPageComponent,
    ByRegionPageComponent,
    CountryPageComponent,
    CountryTableComponent
  ],
  imports: [
    CommonModule,
    CountriesRoutingModule,
    SharedModule,
    GoogleMapsModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CountriesModule { }
