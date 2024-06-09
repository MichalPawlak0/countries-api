import { Component, computed, inject } from '@angular/core';
import { AppService } from '../app.service';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  private appService = inject(AppService);
  theme = computed(() => this.appService.theme);

  onThemeSwitcherClick() {
    console.log(this.theme);
    this.appService.switchTheme();
  }
}
