import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { ObserveElementDirective } from './shared/directives/observe-element.directive';
import { AppComponent } from './app.component';
import { CountriesDisplayComponent } from './countries/countries-display/countries-display.component';

@NgModule({
  imports: [
    BrowserModule,
    AppComponent,
    CountriesDisplayComponent,
    ObserveElementDirective,
  ],
  providers: [],
})
export class AppModule {}
