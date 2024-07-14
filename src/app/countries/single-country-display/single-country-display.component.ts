import {
  Component,
  computed,
  inject,
  Inject,
  input,
  OnInit,
  Signal,
} from '@angular/core';
import { Country } from '../country/country.model';
import { DecimalPipe } from '@angular/common';
import { CountryComponent } from '../country/country.component';
import { CountriesComponent } from '../countries.component';
import { CountriesDisplayComponent } from '../countries-display/countries-display.component';
import { CountriesService } from 'src/app/shared/services/countries.service';
import { catchError, Subject, takeUntil, tap } from 'rxjs';
import { RouterLink } from '@angular/router';

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

  public countryName = input.required<string>();
  public parentElement = inject(CountriesComponent);
  public allCountries: Country[] = new Array();
  public singleCountryData!: Signal<Country>;
  public singleCountryImagePath!: Signal<string>;
  public singleCountryCurrencies!: Signal<{}>;
  public singleCountryLanguages!: Signal<string[]>;
  public singleCountryBorderingCountries: any = ['Poland'];

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

  ngOnDestroy() {
    this.destroyed.next(true);
    this.destroyed.complete();
  }
}
