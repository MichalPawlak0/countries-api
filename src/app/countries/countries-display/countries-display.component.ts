import { Component, input, computed, inject } from '@angular/core';
import COUNTRIES from '../../../../data.json';
import { CountryComponent } from '../country/country.component';
import { FormsModule } from '@angular/forms';
import { AppService } from 'src/app/app.service';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-countries-display',
  standalone: true,
  imports: [CountryComponent, FormsModule, DecimalPipe],
  templateUrl: './countries-display.component.html',
  styleUrl: './countries-display.component.css',
})
export class CountriesDisplayComponent {
  private appService = inject(AppService);
  selectedRegion = input<string>();
  searchQuery = input<string>('');
  isSingleCountryDisplay = computed(() => {
    return this.appService._isSingleCountryDisplay();
  });
  displayedSingleCountry = computed(() => {
    return this.appService._displayedSingleCountry();
  });

  filteredCountries = computed(() => {
    if (this.selectedRegion() === 'All') {
      return COUNTRIES;
    }
    return COUNTRIES.filter((country) => {
      return country.region === this.selectedRegion();
    });
  });

  countriesToDisplay = computed(() => {
    if (this.searchQuery() != '') {
      return this.filteredCountries().filter((filtCountry) => {
        return filtCountry.name
          .toLocaleLowerCase()
          .includes(this.searchQuery().toLocaleLowerCase());
      });
    } else {
      return this.filteredCountries();
    }
  });

  singleCountryData = computed(() => {
    return COUNTRIES.find((country) => {
      return country.name === this.appService._displayedSingleCountry();
    });
  });

  singleCountryImagePath = computed(() => {
    let imgUrl = `url("${this.singleCountryData()?.flag}")`;
    return imgUrl;
  });

  singleCountryCurrencies = computed(() => {
    return this.singleCountryData()
      ?.currencies?.map((currency) => {
        return currency.name;
      })
      .join(', ');
  });

  singleCountryLanguages = computed(() => {
    return this.singleCountryData()
      ?.languages?.map((lang) => {
        return lang.name;
      })
      .join(', ');
  });

  singleCountryBorderingCountries = computed(() => {
    let borCountriesArr: string[] = [];

    this.singleCountryData()?.borders?.map((borderingCountry) => {
      COUNTRIES.map((country) => {
        if (country.alpha3Code === borderingCountry) {
          borCountriesArr.push(country.name);
          return;
        }
      });
    });

    return borCountriesArr;
  });

  onBorderingCountryClick(borderingCountry: string) {
    this.appService.setDisplayedSingleCountry(borderingCountry);
  }
}
