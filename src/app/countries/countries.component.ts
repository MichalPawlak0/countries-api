import { Component, input, signal } from '@angular/core';

import { NavigationComponent } from './navigation/navigation.component';
import { CountriesDisplayComponent } from './countries-display/countries-display.component';

@Component({
  selector: 'app-countries',
  standalone: true,
  imports: [CountriesDisplayComponent, NavigationComponent],
  templateUrl: './countries.component.html',
  styleUrl: './countries.component.css',
})
export class CountriesComponent {
  selectedRegion = 'All';
  searchQuery = '';

  onRegionChange(reg: string) {
    this.selectedRegion = reg;
  }
  onSearchInput(query: string) {
    this.searchQuery = query;
  }
}
