import { Component, input, computed } from '@angular/core';
import COUNTRIES from '../../../../data.json';
import { CountryComponent } from '../country/country.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-countries-display',
  standalone: true,
  imports: [CountryComponent, FormsModule],
  templateUrl: './countries-display.component.html',
  styleUrl: './countries-display.component.css',
})
export class CountriesDisplayComponent {
  selectedRegion = input<string>();
  searchQuery = input<string>('');

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
}
