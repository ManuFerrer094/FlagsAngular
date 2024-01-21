import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { PrivacyPolicyPageComponent } from './shared/pages/privacy-policy-page/privacy-policy-page.component';
import { LegalAdviseComponent } from './shared/pages/legal-advise/legal-advise.component';

@NgModule({
  declarations: [
    AppComponent,
    PrivacyPolicyPageComponent,
    LegalAdviseComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,

    SharedModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
