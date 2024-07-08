import { Component, computed, input } from '@angular/core';
import { Country } from '../country/country.model';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-single-country-display',
  standalone: true,
  imports: [DecimalPipe],
  templateUrl: './single-country-display.component.html',
  styleUrl: './single-country-display.component.css',
})
export class SingleCountryDisplayComponent {
  //public allCountries = input.required<Country[]>();
  public singleCountryData = input.required<Country>();
  public singleCountryImagePath = input.required<string>();
  public singleCountryCurrencies = input.required<string[]>();
  public singleCountryLanguages = input.required<string[]>();
  public singleCountryBorderingCountries = input.required<string[] | string>();
}
