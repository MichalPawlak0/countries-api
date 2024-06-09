import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AppService {
  public _theme = signal<string>('dark');

  constructor() {
    const lsTheme = localStorage.getItem('theme');
    if (lsTheme) {
      this._theme.set(JSON.parse(lsTheme));
    }
  }

  get theme() {
    return this._theme();
  }

  switchTheme(): void {
    const newTheme = this._theme() === 'light' ? 'dark' : 'light';
    this._theme.set(newTheme);
    this.saveTheme();
  }

  private saveTheme(): void {
    localStorage.setItem('theme', JSON.stringify(this.theme));
  }
}
