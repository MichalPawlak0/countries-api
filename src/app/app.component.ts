import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { HeaderComponent } from './header/header.component';
import { CountriesComponent } from './countries/countries.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeaderComponent, CountriesComponent, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Countries';
}
