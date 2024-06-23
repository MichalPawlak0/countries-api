import {
  Component,
  Signal,
  computed,
  inject,
  input,
  output,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CountriesService } from 'src/app/shared/countries.service';
import { CountriesComponent } from '../countries.component';
import { Country } from '../country/country.model';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [FormsModule, CountriesComponent],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.css',
})
export class NavigationComponent {
  private countriesService = inject(CountriesService);
  selectedRegionNav = 'All';
  searchQueryNav = '';
  isSingleCountryDisplay = computed(() =>
    this.countriesService._isSingleCountryDisplay()
  );

  public allCountries = input.required<Country[]>();

  public allRegions: Signal<string[]> = computed((): string[] => {
    console.log(this.allCountries());
    let regions = this.allCountries()
      .map((country: Country) => {
        return country.region;
      })
      .filter((val: string, ind: number, arr: string[]) => {
        return ind === arr.indexOf(val);
      });

    return ['All', ...regions];
  });

  selectedRegionEvent = output<string>();
  searchQueryEvent = output<string>();

  onOptionChange() {
    this.selectedRegionEvent.emit(this.selectedRegionNav);
  }
  onSearchQueryInput() {
    this.searchQueryEvent.emit(this.searchQueryNav);
  }
  onBackClick() {
    if (this.countriesService._isSingleCountryDisplay()) {
      this.countriesService.switchSingleCountryDisplay();
    }
  }
}
