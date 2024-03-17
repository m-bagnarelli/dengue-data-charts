import { Routes } from '@angular/router';
import { AgeGroupComponent } from './pages/AgeGroup/AgeGroup.pages';
import { ByYearComponent } from './pages/ByYear/ByYear.pages';
import { CountryHeatMapComponent } from './pages/CountryHeatMap/CountryHeatMap.component';

export const routes: Routes = [
  {
    path: 'by-age-group',
    component: AgeGroupComponent,
  },
  {
    path: 'by-year',
    component: ByYearComponent,
  },
  {
    path: 'heat-map',
    component: CountryHeatMapComponent
  }
];
