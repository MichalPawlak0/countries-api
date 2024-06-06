import { Component, input } from '@angular/core';
import { HeaderComponent } from "./header/header.component";
import { NavigationComponent } from "./navigation/navigation.component";
import { CountryComponent } from "./country/country.component";

import COUNTRIES from "../../data.json";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeaderComponent, NavigationComponent, CountryComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'countries-api';
  selectedRegion = input.required<string>();
  countries = COUNTRIES.filter(country => {return country.region === this.selectedRegion()});
}
