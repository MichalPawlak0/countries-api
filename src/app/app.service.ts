import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AppService {
  public _theme = signal<string>('dark');
  public _isSingleCountryDisplay = signal<boolean>(false);

  constructor() {
    const lsTheme = localStorage.getItem('theme');
    if (lsTheme) {
      this._theme.set(JSON.parse(lsTheme));
    }
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

  private saveTheme(): void {
    localStorage.setItem('theme', JSON.stringify(this.theme));
  }
}
