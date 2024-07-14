import { Component } from '@angular/core';

import { HeaderComponent } from './header/header.component';
import { CountriesComponent } from './countries/countries.component';
import { RouterOutlet } from '@angular/router';

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
