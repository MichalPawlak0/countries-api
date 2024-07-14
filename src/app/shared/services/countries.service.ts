import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Country } from '../../countries/country/country.model';

@Injectable({ providedIn: 'root' })
export class CountriesService {
  public _isSingleCountryDisplay = signal<boolean>(false);
  public _displayedSingleCountry = signal<string>('');

  constructor(private http: HttpClient) {}

  public fetchData(): Observable<Country[]> {
    return this.http.get<Country[]>('https://restcountries.com/v3.1/all');
  }
}
