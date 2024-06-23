import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Country } from '../countries/country/country.model';

@Injectable({ providedIn: 'root' })
export class CountriesService {
  public _isSingleCountryDisplay = signal<boolean>(false);
  public _displayedSingleCountry = signal<string>('');

  constructor(private http: HttpClient) {}

  public fetchData(): Observable<Country[]> {
    return this.http.get<Country[]>('https://restcountries.com/v3.1/all').pipe(
      tap((response: Country[]) => {
        return response;
      }),
      catchError((error) => {
        throw error;
      })
    );
  }

  get isSingleCountryDisplay() {
    return this._isSingleCountryDisplay();
  }

  switchSingleCountryDisplay(): void {
    const newDisplay = this._isSingleCountryDisplay() === false ? true : false;
    this._isSingleCountryDisplay.set(newDisplay);
  }

  setDisplayedSingleCountry(countryName: string) {
    this._displayedSingleCountry.set(countryName);
  }
}
