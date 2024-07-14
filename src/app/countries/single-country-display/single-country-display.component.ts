import {
  Component,
  computed,
  inject,
  input,
  OnInit,
  Signal,
} from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { catchError, Subject, takeUntil, tap } from 'rxjs';

import { Country } from '../country/country.model';
import { CountriesComponent } from '../countries.component';
import { CountriesService } from 'src/app/shared/services/countries.service';
import { ThemeService } from 'src/app/shared/services/theme.service';

@Component({
  selector: 'app-single-country-display',
  standalone: true,
  imports: [DecimalPipe, RouterLink],
  templateUrl: './single-country-display.component.html',
  styleUrl: './single-country-display.component.css',
})
export class SingleCountryDisplayComponent implements OnInit {
  private countriesService = inject(CountriesService);
  private destroyed = new Subject();
  private themeService = inject(ThemeService);

  public theme = computed((): string => this.themeService._theme());
  public countryName = input.required<string>();
  public parentElement = inject(CountriesComponent);
  public allCountries: Country[] = new Array();
  public singleCountryData!: Signal<Country>;
  public singleCountryImagePath!: Signal<string>;
  public singleCountryCurrencies!: Signal<{}>;
  public singleCountryLanguages!: Signal<string[]>;
  public singleCountryBorderingCountries!: Signal<string | string[]>;

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
          this.allCountries = countries;

          this.singleCountryData = computed((): Country => {
            return (
              countries.find((country) => {
                return country.name.common === this.countryName();
              }) ?? countries[0]
            );
          });

          this.singleCountryImagePath = computed(() => {
            return `url("${this.singleCountryData().flags.svg}")`;
          });

          this.singleCountryCurrencies = computed(() => {
            return Object.keys(this.singleCountryData().currencies);
          });

          this.singleCountryLanguages = computed(() => {
            return Object.keys(this.singleCountryData().languages);
          });

          this.singleCountryBorderingCountries = computed(
            (): string[] | string => {
              let borCountriesArr: string[] = [];
              if (this.singleCountryData().borders) {
                this.singleCountryData().borders.map(
                  (borderingCountry: any) => {
                    this.allCountries.map((country: Country) => {
                      if (country.cca3 === borderingCountry) {
                        borCountriesArr.push(country.name.common);
                        return;
                      }
                    });
                  }
                );
                return borCountriesArr;
              }
              return 'No bordering countries';
            }
          );
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
}
