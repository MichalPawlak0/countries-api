import { Component, computed, inject, input } from '@angular/core';
import { DecimalPipe } from '@angular/common';

import { CountriesService } from 'src/app/shared/services/countries.service';

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
  public isInView = input.required<boolean>();
  public displayedBackgroundImage = computed((): string => {
    if (this.isInView()) {
      return `url("${this.backgroundImageUrl()}")`;
    } else {
      return '';
    }
  });

  public onCountryClick(): void {
    this.countriesService.setDisplayedSingleCountry(this.selectedCountryName());
    this.countriesService.switchSingleCountryDisplay();
  }
}
