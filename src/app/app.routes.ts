import { Routes } from '@angular/router';

import { CountriesDisplayComponent } from './countries/countries-display/countries-display.component';
import { CountryComponent } from './countries/country/country.component';

export const routes: Routes = [
  { path: 'single-country-display', component: CountryComponent },
];
