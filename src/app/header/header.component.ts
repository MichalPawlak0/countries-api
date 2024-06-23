import { Component, computed, inject } from '@angular/core';
import { ThemeService } from '../shared/theme.service';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  private themeService = inject(ThemeService);
  theme = computed(() => this.themeService.theme);

  onThemeSwitcherClick() {
    this.themeService.switchTheme();
  }
}
