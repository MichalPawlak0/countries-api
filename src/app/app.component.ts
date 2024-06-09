import { Component, computed, input } from '@angular/core';
import { HeaderComponent } from './header/header.component';

import { CountriesComponent } from './countries/countries.component';

//let selectedRegionElVal = (<HTMLSelectElement>document.getElementById("regionSelection"))?.value

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeaderComponent, CountriesComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'countries-api';
}
