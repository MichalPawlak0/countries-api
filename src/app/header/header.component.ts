import { Component, computed, inject } from '@angular/core';

import { ThemeService } from '../shared/services/theme.service';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  private themeService = inject(ThemeService);

  public theme = computed((): string => this.themeService._theme());

  public onThemeSwitcherClick(): void {
    this.themeService.switchTheme();
  }
}
