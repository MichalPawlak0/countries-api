import { Routes } from '@angular/router';

import { CountriesDisplayComponent } from './countries/countries-display/countries-display.component';
import { CountryComponent } from './countries/country/country.component';
import { SingleCountryDisplayComponent } from './countries/single-country-display/single-country-display.component';
import { CountriesComponent } from './countries/countries.component';

export const routes: Routes = [
  {
    path: '',
    component: CountriesComponent,
  },
  {
    path: 'country/:countryName',
    component: SingleCountryDisplayComponent,
  },
];
