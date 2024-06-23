import { Component, OnInit, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NavigationComponent } from './navigation/navigation.component';
import { CountriesDisplayComponent } from './countries-display/countries-display.component';
import { CountriesService } from '../shared/countries.service';
import { ThemeService } from '../shared/theme.service';
import { Country } from './country/country.model';

@Component({
  selector: 'app-countries',
  standalone: true,
  imports: [CountriesDisplayComponent, NavigationComponent, CommonModule],
  templateUrl: './countries.component.html',
  styleUrl: './countries.component.css',
})
export class CountriesComponent implements OnInit {
  private countriesService = inject(CountriesService);
  private themeService = inject(ThemeService);

  public COUNTRIES: Country[] = [];
  public selectedRegion: string = 'All';
  public searchQuery: string = '';
  public theme = computed((): string => this.themeService._theme());
  public isSingleCountry = computed((): boolean =>
    this.countriesService._isSingleCountryDisplay()
  );

  constructor(countriesService: CountriesService) {}

  public ngOnInit(): void {
    this.countriesService.fetchData().subscribe({
      next: (countries: Country[]) => {
        this.COUNTRIES = countries;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  public onRegionChange(region: string): void {
    this.selectedRegion = region;
  }
  public onSearchInput(query: string): void {
    this.searchQuery = query;
  }
}
