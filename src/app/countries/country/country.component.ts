import { Component, computed, input } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-country',
  standalone: true,
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.css'],
  imports: [DecimalPipe, RouterLink],
})
export class CountryComponent {
  public countryName: string = '';
  public selectedCountryName = input.required<string>();
  public backgroundImageUrl = input.required<string>();
  public selectedCountryPopulation = input.required<number | string>();
  public selectedCountryRegion = input.required<string>();
  public selectedCountryCapital = input.required<string[]>();
  public isInView = input.required<boolean>();

  public displayedBackgroundImage = computed((): string => {
    if (this.isInView()) {
      return `url("${this.backgroundImageUrl()}")`;
    } else {
      return '';
    }
  });
}
