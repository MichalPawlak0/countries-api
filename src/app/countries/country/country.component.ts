import { Component, computed, inject, input } from '@angular/core';
import { DecimalPipe } from '@angular/common';

import { CountriesService } from 'src/app/shared/countries.service';

@Component({
  selector: 'app-country',
  standalone: true,
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.css'],
  imports: [DecimalPipe],
})
export class CountryComponent {
  private countriesService = inject(CountriesService);

  public selectedCountryName = input.required<string>();
  public backgroundImageUrl = input.required<string>();
  public selectedCountryPopulation = input.required<number | string>();
  public selectedCountryRegion = input.required<string>();
  public selectedCountryCapital = input.required<string[]>();
  public backgroundImage = computed(
    (): string => `url("${this.backgroundImageUrl()}")`
  );

  public onCountryClick(): void {
    this.countriesService.setDisplayedSingleCountry(this.selectedCountryName());
    this.countriesService.switchSingleCountryDisplay();
  }
}
