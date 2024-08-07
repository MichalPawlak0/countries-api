import {
  Component,
  Injectable,
  OnDestroy,
  OnInit,
  computed,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { catchError, takeUntil, tap } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { NavigationComponent } from './navigation/navigation.component';
import { CountriesDisplayComponent } from './countries-display/countries-display.component';
import { CountriesService } from '../shared/services/countries.service';
import { ThemeService } from '../shared/services/theme.service';
import { Country } from './country/country.model';

@Component({
  selector: 'app-countries',
  standalone: true,
  imports: [CountriesDisplayComponent, NavigationComponent, CommonModule],
  templateUrl: './countries.component.html',
  styleUrl: './countries.component.css',
})
@Injectable({ providedIn: 'root' })
export class CountriesComponent implements OnInit, OnDestroy {
  private countriesService = inject(CountriesService);
  private themeService = inject(ThemeService);
  private destroyed = new Subject();

  public COUNTRIES: Country[] = [];
  public selectedRegion: string = 'All';
  public searchQuery: string = '';

  public theme = computed((): string => this.themeService._theme());

  public ngOnInit(): void {
    this.countriesService
      .fetchData()
      .pipe(
        tap((response: Country[]) => {
          return response;
        }),
        takeUntil(this.destroyed),
        catchError((error) => {
          throw error;
        })
      )
      .subscribe({
        next: (countries: Country[]) => {
          this.COUNTRIES = countries;
        },
        error: (error) => {
          console.log(error);
        },
      });
  }
  public ngOnDestroy() {
    this.destroyed.next(true);
    this.destroyed.complete();
  }

  public onRegionChange(region: string): void {
    this.selectedRegion = region;
  }
  public onSearchInput(query: string): void {
    this.searchQuery = query;
  }
}
