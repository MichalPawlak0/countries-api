import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CountriesDisplayComponent } from './countries/countries-display/countries-display.component';

@NgModule({
  imports: [BrowserModule, AppComponent, CountriesDisplayComponent],
  providers: [],
})
export class AppModule {}
