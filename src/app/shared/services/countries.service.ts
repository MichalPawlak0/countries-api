import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { Country } from '../../countries/country/country.model';

@Injectable({ providedIn: 'root' })
export class CountriesService {
  public _isSingleCountryDisplay = signal<boolean>(false);
  public _displayedSingleCountry = signal<string>('');

  constructor(private http: HttpClient) {}

  public fetchData(): Observable<Country[]> {
    return this.http.get<Country[]>('https://restcountries.com/v3.1/all');
  }

  public switchSingleCountryDisplay(): void {
    const newDisplay: boolean =
      this._isSingleCountryDisplay() === false ? true : false;
    this._isSingleCountryDisplay.set(newDisplay);
  }

  public setDisplayedSingleCountry(countryName: string): void {
    this._displayedSingleCountry.set(countryName);
  }
}
