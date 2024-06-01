import { Component } from '@angular/core';
import { HeaderComponent } from "./header/header.component";
import { NavigationComponent } from "./navigation/navigation.component";
import { CountryComponent } from "./country/country.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeaderComponent, NavigationComponent, CountryComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'countries-api';
}
