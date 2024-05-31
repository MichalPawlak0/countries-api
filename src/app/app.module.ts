import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NavigationComponent } from './navigation/navigation.component';
import { CountryComponent } from './country/country.component';

@NgModule({
  imports: [
    AppComponent
  ],
  providers: [],
  declarations: [
    NavigationComponent,
    CountryComponent
  ],
})
export class AppModule { }