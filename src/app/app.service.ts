import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class AppService {
  public _theme = signal<string>('dark');
  public _isSingleCountryDisplay = signal<boolean>(false);
  public _displayedSingleCountry = signal<string>('');
  public DATA: any;

  //http2 = inject(HttpClient);

  private fetchData() {
    this.http.get('https://restcountries.com/v3.1/all').subscribe((data) => {
      this.DATA = data;
    });
  }

  constructor(private http: HttpClient) {
    const lsTheme = localStorage.getItem('theme');
    if (lsTheme) {
      this._theme.set(JSON.parse(lsTheme));
    }
    this.fetchData();
  }

  get theme() {
    return this._theme();
  }

  get isSingleCountryDisplay() {
    return this._isSingleCountryDisplay();
  }

  switchTheme(): void {
    const newTheme = this._theme() === 'light' ? 'dark' : 'light';
    this._theme.set(newTheme);
    this.saveTheme();
  }

  switchSingleCountryDisplay(): void {
    const newDisplay = this._isSingleCountryDisplay() === false ? true : false;
    this._isSingleCountryDisplay.set(newDisplay);
  }

  setDisplayedSingleCountry(countryName: string) {
    this._displayedSingleCountry.set(countryName);
  }

  private saveTheme(): void {
    localStorage.setItem('theme', JSON.stringify(this.theme));
  }
}
