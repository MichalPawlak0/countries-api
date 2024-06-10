import { Component, computed, inject, input } from '@angular/core';

import { NavigationComponent } from './navigation/navigation.component';
import { CountriesDisplayComponent } from './countries-display/countries-display.component';
import { AppService } from '../app.service';

@Component({
  selector: 'app-countries',
  standalone: true,
  imports: [CountriesDisplayComponent, NavigationComponent],
  templateUrl: './countries.component.html',
  styleUrl: './countries.component.css',
})
export class CountriesComponent {
  private appService = inject(AppService);
  selectedRegion = 'All';
  searchQuery = '';
  theme = computed(() => this.appService.theme);
  isSingleCountry = computed(() => this.appService._isSingleCountryDisplay());

  onRegionChange(reg: string) {
    this.selectedRegion = reg;
  }
  onSearchInput(query: string) {
    this.searchQuery = query;
  }
}
