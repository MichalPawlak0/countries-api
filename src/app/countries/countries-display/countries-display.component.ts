import { Component, input, computed } from '@angular/core';

import { ObserveElementDirective } from 'src/app/shared/directives/observe-element.directive';
import { CountryComponent } from '../country/country.component';
import { Country } from '../country/country.model';

@Component({
  selector: 'app-countries-display',
  standalone: true,
  imports: [CountryComponent, ObserveElementDirective],
  templateUrl: './countries-display.component.html',
  styleUrl: './countries-display.component.css',
})
export class CountriesDisplayComponent {
  public allCountries = input.required<Country[]>();
  public selectedRegion = input<string>('All');
  public searchQuery = input<string>('');

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
}
