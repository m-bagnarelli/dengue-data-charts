import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import * as Papa from 'papaparse';
import { ChartModule } from 'primeng/chart';
import { IData, IDataSetResponse } from '../core/interfaces/dataset.interface';
import { BACKGROUND_COLORS, BORDER_COLORS } from '../core/constants/chart-colors';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ChartModule],
  template: `
    <div class="card">
      <p-chart
        type="bar"
        width="8"
        height="2"
        [data]="basicData"
        [options]="basicOptions"
      />
    </div>
  `,
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'dengue';
  data: IData[] = [];
  dataGroupedByAgeGroups: Record<string, number> = {};
  basicData: any;
  basicOptions: any;

  constructor() {
    Papa.parse<IDataSetResponse>('https://docs.google.com/spreadsheets/d/e/2PACX-1vRlt4Ixb-3iURHIGYU7CcP8SHn9t4RRhG3fmnnfzjzmwAp_eycUOzIIA_IL4CwqLQ/pub?gid=546462883&single=true&output=csv', {
      download: true,
      complete: ({ data: response }) => {
        this.data = this.parseResponse(response);
        this.data.forEach(item => {
          if (this.dataGroupedByAgeGroups[item.age_group]) {
            this.dataGroupedByAgeGroups[item.age_group] += item.total;
          } else {
            this.dataGroupedByAgeGroups[item.age_group] = item.total;
          }
        });
        this.basicData = {
          labels: Object.keys(this.dataGroupedByAgeGroups),
          datasets: [
            {
              label: 'Casos',
              data: Object.values(this.dataGroupedByAgeGroups),
              backgroundColor: BACKGROUND_COLORS.slice(0, Object.keys(this.dataGroupedByAgeGroups).length),
              borderColor: BORDER_COLORS.slice(0, Object.keys(this.dataGroupedByAgeGroups).length),
              borderWidth: 1,
            }
          ]
        };
      },
      header: true,
    });
  }

  parseResponse(response: IDataSetResponse[]) {
    return response.map(item => (
      {
        year: item['ANIO_MIN'],
        department: item['DEPARTAMENTO_RESIDENCIA'],
        event: item['EVENTO'],
        age_group: item['GRUPO_ETARIO'],
        age_group_id: item['ID_GRUPO_ETARIO'],
        province: item['PROVINCIA_RESIDENCIA'],
        total: +item['Total'],
      }
    ));
  }
}
