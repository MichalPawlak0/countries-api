import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { CountriesDisplayComponent } from './countries/countries-display/countries-display.component';

@NgModule({
  imports: [
    HttpClientModule,
    BrowserModule,
    AppComponent,
    CountriesDisplayComponent,
  ],
  providers: [HttpClientModule],
})
export class AppModule {}
