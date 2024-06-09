import { Component, computed, input } from '@angular/core';

@Component({
  selector: 'app-country',
  standalone: true,
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.css']
})
export class CountryComponent {
selectedCountryName = input.required<string>();
backgroundImageUrl = input.required<string>();
selectedCountryPopulation = input.required<number|string>();
selectedCountryRegion = input.required<string>();
selectedCountryCapital = input.required<any>();
backgroundImage = computed(()=>`url("${this.backgroundImageUrl()}")`);
}
