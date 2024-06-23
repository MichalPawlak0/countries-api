import { Component, input, computed, inject, OnInit } from '@angular/core';
import { CountryComponent } from '../country/country.component';
import { FormsModule } from '@angular/forms';
import { CommonModule, DecimalPipe } from '@angular/common';
import { CountriesService } from 'src/app/shared/countries.service';
import { Observable } from 'rxjs/internal/Observable';
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
  ],
  templateUrl: './countries-display.component.html',
  styleUrl: './countries-display.component.css',
})
export class CountriesDisplayComponent {
  private CountriesService = inject(CountriesService);
  public allCountries = input.required<Country[]>();

  selectedRegion = input<string>();
  searchQuery = input<string>('');
  isSingleCountryDisplay = computed(() => {
    return this.CountriesService._isSingleCountryDisplay();
  });
  displayedSingleCountry = computed(() => {
    return this.CountriesService._displayedSingleCountry();
  });

  filteredCountries = computed(() => {
    if (this.selectedRegion() === 'All') {
      return this.allCountries();
    }
    return this.allCountries().filter((country) => {
      return country.region === this.selectedRegion();
    });
  });

  countriesToDisplay = computed(() => {
    if (this.searchQuery() != '') {
      return this.filteredCountries().filter((filtCountry: Country) => {
        return filtCountry.name.common
          .toLocaleLowerCase()
          .includes(this.searchQuery().toLocaleLowerCase());
      });
    } else {
      return this.filteredCountries();
    }
  });

  singleCountryData = computed((): Country => {
    return (
      this.allCountries().find((country) => {
        return (
          country.name.common ===
          this.CountriesService._displayedSingleCountry()
        );
      }) ?? this.allCountries()[0]
    );
  });

  singleCountryImagePath = computed((): string => {
    let imgUrl = `url("${this.singleCountryData().flags.svg}")`;
    return imgUrl;
  });

  singleCountryCurrencies = computed((): string[] => {
    const country = this.singleCountryData();
    if (country && country.currencies) {
      return Object.keys(country.currencies);
    }
    return [];
  });

  singleCountryLanguages = computed((): string[] => {
    const languages = this.singleCountryData()?.languages;
    return languages ? Object.values(languages) : [];
  });

  singleCountryBorderingCountries = computed((): string[] | string => {
    let borCountriesArr: string[] = [];

    if (this.singleCountryData().borders) {
      this.singleCountryData().borders.map((borderingCountry: string) => {
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

  onBorderingCountryClick(borderingCountry: string) {
    this.CountriesService.setDisplayedSingleCountry(borderingCountry);
  }
}
