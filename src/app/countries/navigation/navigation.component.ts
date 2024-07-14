import { Component, computed, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { CountriesComponent } from '../countries.component';
import { Country } from '../country/country.model';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [FormsModule, CountriesComponent],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.css',
})
export class NavigationComponent {
  public selectedRegionEvent = output<string>();
  public searchQueryEvent = output<string>();
  public allCountries = input.required<Country[]>();

  public allRegions = computed((): string[] => {
    let regions = this.allCountries()
      .map((country: Country) => {
        return country.region;
      })
      .filter((value: string, index: number, array: string[]) => {
        return index === array.indexOf(value);
      });
    return ['All', ...regions];
  });

  public selectedRegion: string = 'All';
  public searchQuery: string = '';

  public onOptionChange(): void {
    this.selectedRegionEvent.emit(this.selectedRegion);
  }
  public onSearchQueryInput(): void {
    this.searchQueryEvent.emit(this.searchQuery);
  }
}
