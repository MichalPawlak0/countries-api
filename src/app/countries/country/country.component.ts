import {
  Component,
  computed,
  inject,
  input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { DecimalPipe } from '@angular/common';

import { CountriesService } from 'src/app/shared/services/countries.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-country',
  standalone: true,
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.css'],
  imports: [DecimalPipe, RouterLink],
})
export class CountryComponent {
  private countriesService = inject(CountriesService);
  private sub: any;

  public countryName: string = '';
  public selectedCountryName = input.required<string>();
  public backgroundImageUrl = input.required<string>();
  public selectedCountryPopulation = input.required<number | string>();
  public selectedCountryRegion = input.required<string>();
  public selectedCountryCapital = input.required<string[]>();
  public isInView = input.required<boolean>();

  constructor(private route: ActivatedRoute, private router: Router) {}

  // ngOnInit() {
  //   this.sub = this.route.params.subscribe((params) => {
  //     this.countryName = params['countryName']; // (+) converts string 'id' to a number

  //     // In a real app: dispatch action to load the details here.
  //   });
  // }

  // ngOnDestroy() {
  //   this.sub.unsubscribe();
  // }

  public displayedBackgroundImage = computed((): string => {
    if (this.isInView()) {
      return `url("${this.backgroundImageUrl()}")`;
    } else {
      return '';
    }
  });

  public onCountryClick(): void {
    this.countriesService.setDisplayedSingleCountry(this.selectedCountryName());
    this.countriesService.switchSingleCountryDisplay();
  }
}
