import { Component, signal } from '@angular/core';

import COUNTRIES from "../../../data.json";

const randomIndex = Math.floor(Math.random() * COUNTRIES.length);

@Component({
  selector: 'app-country',
  standalone: true,
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.css']
})
export class CountryComponent {
  selectedCountry = COUNTRIES[randomIndex];
  backgroundImage = `url("${this.selectedCountry.flag}")`;
}
