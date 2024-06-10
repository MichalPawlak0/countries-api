import { Component, computed, inject, input } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-country',
  standalone: true,
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.css'],
  imports: [DecimalPipe],
})
export class CountryComponent {
  private appService = inject(AppService);
  selectedCountryName = input.required<string>();
  backgroundImageUrl = input.required<string>();
  selectedCountryPopulation = input.required<number | string>();
  selectedCountryRegion = input.required<string>();
  selectedCountryCapital = input.required<any>();
  backgroundImage = computed(() => `url("${this.backgroundImageUrl()}")`);

  onCountryClick() {
    this.appService.setDisplayedSingleCountry(this.selectedCountryName());
    this.appService.switchSingleCountryDisplay();
  }
}
