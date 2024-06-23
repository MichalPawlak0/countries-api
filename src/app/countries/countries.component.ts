import { Component, OnInit, Signal, computed, inject } from '@angular/core';

import { NavigationComponent } from './navigation/navigation.component';
import { CountriesDisplayComponent } from './countries-display/countries-display.component';
import { CountriesService } from '../shared/countries.service';
import { ThemeService } from '../shared/theme.service';
import { Country } from './country/country.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-countries',
  standalone: true,
  imports: [CountriesDisplayComponent, NavigationComponent, CommonModule],
  templateUrl: './countries.component.html',
  styleUrl: './countries.component.css',
})
export class CountriesComponent implements OnInit {
  private CountriesService = inject(CountriesService);
  private themeService = inject(ThemeService);
  public COUNTRIES: Country[] = [];

  constructor(private countriesService: CountriesService) {}

  ngOnInit(): void {
    this.CountriesService.fetchData().subscribe({
      next: (data: Country[]) => {
        this.COUNTRIES = data;
        //console.log(this.COUNTRIES);
      },
      error: (error) => {
        console.log(error);
      },
    });
  } // I think I should throttle the data pulling, cause I think the rest of the code is getting executed before the data is fully pulled

  selectedRegion = 'All';
  searchQuery = '';
  theme = computed(() => this.themeService.theme);
  isSingleCountry = computed(() =>
    this.countriesService._isSingleCountryDisplay()
  );

  onRegionChange(reg: string) {
    this.selectedRegion = reg;
  }
  onSearchInput(query: string) {
    this.searchQuery = query;
  }
}
