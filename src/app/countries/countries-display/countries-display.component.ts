import { Component, input, computed, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule, DecimalPipe } from '@angular/common';
import { RouterOutlet } from '@angular/router';

import { ObserveElementDirective } from 'src/app/shared/directives/observe-element.directive';
import { CountryComponent } from '../country/country.component';
import { CountriesService } from 'src/app/shared/services/countries.service';
import { Country } from '../country/country.model';
import { CountriesComponent } from '../countries.component';
import { SingleCountryDisplayComponent } from '../single-country-display/single-country-display.component';

@Component({
  selector: 'app-countries-display',
  standalone: true,
  imports: [
    CountryComponent,
    SingleCountryDisplayComponent,
    FormsModule,
    DecimalPipe,
    CommonModule,
    CountriesComponent,
    ObserveElementDirective,
    RouterOutlet,
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

  public onBorderingCountryClick(borderingCountry: string): void {
    this.CountriesService.setDisplayedSingleCountry(borderingCountry);
  }
}
