import { Component, computed, input } from '@angular/core';
import { HeaderComponent } from "./header/header.component";
import { NavigationComponent } from "./navigation/navigation.component";
import { CountryComponent } from "./country/country.component";

import COUNTRIES from "../../data.json";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeaderComponent, NavigationComponent, CountryComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'countries-api';
  // selectedRegion = 
  selectedRegion = input("Europe");

  allRegions = computed(()=>{return COUNTRIES.
    map((country)=>{return country.region})
    .filter((val, ind, arr)=>{
      return ind === arr.indexOf(val);
    })
})

filteredCountries = computed(()=>{
  return COUNTRIES.filter((country)=>{
    return country.region === this.selectedRegion();
  })
})

}