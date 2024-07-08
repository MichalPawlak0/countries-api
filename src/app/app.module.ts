import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { ObserveElementDirective } from './shared/directives/observe-element.directive';
import { AppComponent } from './app.component';
import { CountriesDisplayComponent } from './countries/countries-display/countries-display.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    BrowserModule,
    AppComponent,
    CountriesDisplayComponent,
    ObserveElementDirective,
    RouterModule,
  ],
  providers: [],
})
export class AppModule {}
