import { HttpClientModule, provideHttpClient } from '@angular/common/http';
import { Component, computed, inject, output, signal } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [FormsModule, HttpClientModule],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.css',
})
export class NavigationComponent {
  private appService = inject(AppService);
  COUNTRIES = this.appService.DATA;
  selectedRegionNav = 'All';
  searchQueryNav = '';
  isSingleCountryDisplay = computed(() =>
    this.appService._isSingleCountryDisplay()
  );

  get allRegions() {
    let Arr = this.COUNTRIES.map((country: any) => {
      return country.region;
    }).filter((val: string, ind: number, arr: string[]) => {
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
  onBackClick() {
    if (this.appService._isSingleCountryDisplay()) {
      this.appService.switchSingleCountryDisplay();
    }
  }
}
