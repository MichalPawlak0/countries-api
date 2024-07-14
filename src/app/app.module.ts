import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { ObserveElementDirective } from './shared/directives/observe-element.directive';
import { AppComponent } from './app.component';
import { CountriesDisplayComponent } from './countries/countries-display/countries-display.component';
import { NgIncludeDirective } from './shared/directives/ng-include.directive';

@NgModule({
  declarations: [
    NgIncludeDirective, // Declare NgIncludeDirective here
  ],
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
