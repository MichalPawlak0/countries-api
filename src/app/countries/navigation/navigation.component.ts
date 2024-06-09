import { Component, computed, inject, output, signal } from '@angular/core';

import COUNTRIES from '../../../../data.json';
import { FormsModule } from '@angular/forms';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.css',
})
export class NavigationComponent {
  private appService = inject(AppService);
  selectedRegionNav = 'All';
  searchQueryNav = '';
  isSingleCountryDisplay = computed(
    () => this.appService.isSingleCountryDisplay
  );

  get allRegions() {
    let Arr = COUNTRIES.map((country) => {
      return country.region;
    }).filter((val, ind, arr) => {
      return ind === arr.indexOf(val);
    });

    Arr.unshift('All');
    return Arr;
  }

  selectedRegionEvent = output<string>();
  searchQueryEvent = output<string>();

  onOptionChange() {
    this.selectedRegionEvent.emit(this.selectedRegionNav);
  }
  onSearchQueryInput() {
    this.searchQueryEvent.emit(this.searchQueryNav);
  }
}
