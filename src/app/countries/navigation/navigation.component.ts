import { Component, computed, inject, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { CountriesService } from 'src/app/shared/services/countries.service';
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
  private countriesService = inject(CountriesService);

  public selectedRegionEvent = output<string>();
  public searchQueryEvent = output<string>();
  public allCountries = input.required<Country[]>();
  public isSingleCountryDisplay = computed((): boolean => {
    return this.countriesService._isSingleCountryDisplay();
  });
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
  public onBackClick(): void {
    if (this.countriesService._isSingleCountryDisplay()) {
      this.countriesService.switchSingleCountryDisplay();
    }
  }
}
