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
  selectedCountryName = input.required<string>();
  backgroundImageUrl = input.required<string>();
  selectedCountryPopulation = input.required<number | string>();
  selectedCountryRegion = input.required<string>();
  selectedCountryCapital = input.required<any>();
  backgroundImage = computed(() => `url("${this.backgroundImageUrl()}")`);

  onCountryClick() {
    this.countriesService.setDisplayedSingleCountry(this.selectedCountryName());
    this.countriesService.switchSingleCountryDisplay();
  }
}
