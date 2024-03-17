import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { Observable, filter, map } from 'rxjs';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { DataService } from '../../shared/services/Data.service';
import { IData } from '../../core/interfaces/dataset.interface';

interface IAgeGroupData {
  name: string;
  value: number;
}

@Component({
  selector: 'age-group',
  standalone: true,
  imports: [AsyncPipe, NgxChartsModule],
  template: `
    @if (ageGroupData$ | async; as ageGroupData) {
      <ngx-charts-bar-horizontal
        xAxisLabel="Cantidad de casos"
        yAxisLabel="Grupo etario"
        [showXAxisLabel]="true"
        [showYAxisLabel]="true"
        [results]="ageGroupData"
        [showGridLines]="false"
        [xAxis]="true"
        [yAxis]="true"
        [maxXAxisTickLength]="50"
      />
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AgeGroupComponent implements OnInit {
  ageGroupData$!: Observable<IAgeGroupData[]>;

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.ageGroupData$ = this.dataService.data$
      .pipe(
        filter(data => !!data),
        map(
          (data) => {
            let ageGroupData: IAgeGroupData[] = [];
            data
              ?.sort((groupA: IData, groupB: IData) => groupA.age_group_id - groupB.age_group_id)
              .forEach(item => {
              if (item.age_group === 'Sin Especificar') return ;
              const ageGroupIndex = ageGroupData.findIndex(ageGroup => ageGroup.name === item.age_group);
              if (ageGroupIndex !== -1) {
                ageGroupData[ageGroupIndex].value += item.total;
              } else {
                ageGroupData.push({
                  name: item.age_group,
                  value: item.total,
                });
              }
            });
            return ageGroupData;
          }
        )
      )
  }
}
