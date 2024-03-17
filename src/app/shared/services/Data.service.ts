import { Injectable } from '@angular/core';
import * as Papa from 'papaparse';
import { IData, IDataSetResponse } from '../../core/interfaces/dataset.interface';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private datasetUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRlt4Ixb-3iURHIGYU7CcP8SHn9t4RRhG3fmnnfzjzmwAp_eycUOzIIA_IL4CwqLQ/pub?gid=546462883&single=true&output=csv';
  private _data$ = new BehaviorSubject<IData[] | undefined>(undefined);

  getData() {
    Papa.parse<IDataSetResponse>(this.datasetUrl, {
      download: true,
      complete: ({ data: response }) => {
        const data = this.parseResponse(response);
        this.data = data;
      },
      header: true,
    });
  }

  get data$(): Observable<IData[] | undefined> {
    return this._data$.asObservable();
  }

  private set data(data: any) {
    this._data$.next(data);
  }

  private parseResponse(response: IDataSetResponse[]): IData[] {
    return response.map(item => (
      {
        year: item['ANIO_MIN'],
        department: item['DEPARTAMENTO_RESIDENCIA'],
        event: item['EVENTO'],
        age_group: item['GRUPO_ETARIO'],
        age_group_id: +item['ID_GRUPO_ETARIO'],
        province: item['PROVINCIA_RESIDENCIA'],
        total: +item['Total'],
      }
    ));
  }
}
