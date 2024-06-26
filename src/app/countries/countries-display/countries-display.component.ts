import { Component, input, computed, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule, DecimalPipe } from '@angular/common';

import { ObserveElementDirective } from 'src/app/shared/directives/observe-element.directive';
import { CountryComponent } from '../country/country.component';
import { CountriesService } from 'src/app/shared/services/countries.service';
import { Country } from '../country/country.model';
import { CountriesComponent } from '../countries.component';

@Component({
  selector: 'app-countries-display',
  standalone: true,
  imports: [
    CountryComponent,
    FormsModule,
    DecimalPipe,
    CommonModule,
    CountriesComponent,
    ObserveElementDirective,
  ],
  templateUrl: './countries-display.component.html',
  styleUrl: './countries-display.component.css',
})
export class CountriesDisplayComponent {
  private CountriesService = inject(CountriesService);

  public allCountries = input.required<Country[]>();
  public selectedRegion = input<string>('All');
  public searchQuery = input<string>('');
  public isSingleCountryDisplay = computed((): boolean => {
    return this.CountriesService._isSingleCountryDisplay();
  });
  public displayedSingleCountry = computed((): string => {
    return this.CountriesService._displayedSingleCountry();
  });
  public filteredCountries = computed((): Country[] => {
    if (this.selectedRegion() === 'All') {
      return this.allCountries();
    }
    return this.allCountries().filter((country) => {
      return country.region === this.selectedRegion();
    });
  });
  public countriesToDisplay = computed((): Country[] => {
    if (this.searchQuery() != '') {
      return this.filteredCountries().filter((filteredCountry) => {
        return filteredCountry.name.common
          .toLocaleLowerCase()
          .includes(this.searchQuery().toLocaleLowerCase());
      });
    } else {
      return this.filteredCountries();
    }
  });
  public singleCountryData = computed((): Country => {
    return (
      this.allCountries().find((country) => {
        return (
          country.name.common ===
          this.CountriesService._displayedSingleCountry()
        );
      }) ?? this.allCountries()[0]
    );
  });
  public singleCountryImagePath = computed((): string => {
    return `url("${this.singleCountryData().flags.svg}")`;
  });
  public singleCountryCurrencies = computed((): string[] => {
    const country: Country = this.singleCountryData();
    if (country && country.currencies) {
      return Object.keys(country.currencies);
    }
    return [];
  });
  public singleCountryLanguages = computed((): string[] => {
    const languages: { [key: string]: string } =
      this.singleCountryData().languages;
    return languages ? Object.values(languages) : [];
  });
  public singleCountryBorderingCountries = computed((): string[] | string => {
    let borCountriesArr: string[] = [];
    if (this.singleCountryData().borders) {
      this.singleCountryData().borders.map((borderingCountry) => {
        this.allCountries().map((country: Country) => {
          if (country.cca3 === borderingCountry) {
            borCountriesArr.push(country.name.common);
            return;
          }
        });
      });
      return borCountriesArr;
    }
    return 'No bordering countries';
  });
  public onBorderingCountryClick(borderingCountry: string): void {
    this.CountriesService.setDisplayedSingleCountry(borderingCountry);
  }
}
