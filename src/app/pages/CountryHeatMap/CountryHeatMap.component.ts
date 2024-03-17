import { AfterViewInit, ChangeDetectionStrategy, Component, ViewEncapsulation, inject } from '@angular/core';
import * as L from 'leaflet';
import { HttpClient } from '@angular/common/http';
import { DataService } from '../../shared/services/Data.service';
import { combineLatest, map, skip } from 'rxjs';

@Component({
  selector: 'app-country-heat-map',
  standalone: true,
  imports: [],
  template: `
    <div class="map-container">
      <div class="map-frame">
        <div id="map"></div>
      </div>
    </div>
  `,
  styles: `
    .map-container {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      margin: 3rem 8rem;
    }

    .map-frame {
      height: 100%;
    }

    #map {
      height: 100%;
    }

    .info {
      padding: 6px 8px;
      font: 14px/16px Arial, Helvetica, sans-serif;
      background: white;
      background: rgba(255,255,255,0.8);
      box-shadow: 0 0 15px rgba(0,0,0,0.2);
      border-radius: 5px;
      color: #777;
    }

    .info h4 {
      margin: 0 0 5px;
    }

    .legend {
      line-height: 18px;
      color: #555;
    }

    .legend i {
      width: 18px;
      height: 18px;
      float: left;
      margin-right: 8px;
      opacity: 0.7;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class CountryHeatMapComponent implements AfterViewInit {
  http = inject(HttpClient);
  dataService = inject(DataService);
  geoJson$ = this.http.get('assets/argentina.geojson');
  data$ = this.dataService.data$;
  stream$ = combineLatest([ this.data$, this.geoJson$ ])
  private map!: L.Map;
  infoDiv: any;

  private initMap(geoJson: any): void {
    if (this.map) return ;
    this.map = L.map('map', {
      center: [ -38.4161, -63.6167],
      zoom: 5
    });

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 6,
      minZoom: 4,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    tiles.addTo(this.map);
    let geoJsonVar: any;
    geoJsonVar = L.geoJson(geoJson, {
      style: function(feature: any) {
        return {
          fillColor: getColor(feature.properties.total),
          weight: 2,
          opacity: 1,
          color: 'white',
          dashArray: '3',
          fillOpacity: 0.7
        };
      },
      onEachFeature,
    })
    .addTo(this.map);

    function getColor(casesAmount: number) {
      return casesAmount > 10000 ? '#800026' :
      casesAmount > 5000  ? '#BD0026' :
      casesAmount > 1000  ? '#E31A1C' :
      casesAmount > 500   ? '#FC4E2A' :
      casesAmount > 250   ? '#FD8D3C' :
      casesAmount > 100   ? '#FEB24C' :
      casesAmount > 50    ? '#FED976' :
                            '#FFEDA0';
    }

    const info = new L.Control();
    let infoDiv: HTMLDivElement;
    info.onAdd = function () {
      infoDiv = L.DomUtil.create('div', 'info');
      infoDiv.innerHTML = `<h4>Cantidad de casos por provincia</h4>`;
      return infoDiv;
    };

    function update(props?: any) {
      infoDiv.innerHTML = `<h4>Cantidad de casos por provincia</h4>`;
      if (props) {
        infoDiv.innerHTML += `<b> ${props?.nombre}</b><br />${props?.total ? props.total : 'Sin'} casos`;
      }
      if (!props) {
        infoDiv.innerHTML = `<h4>Cantidad de casos por provincia</h4>`
      } else {
        infoDiv.innerHTML = `<h4>Cantidad de casos por provincia</h4>
        <b> ${props?.nombre}</b><br />${props?.total ? props.total : 'Sin'} casos`;
      }
    }

    function highlightFeature(e: any) {
      const layer = e.target;
      layer.setStyle({
          weight: 2,
          color: '#666',
          dashArray: '',
          fillOpacity: 0.7
      });
      update(layer.feature.properties);
      layer.bringToFront();
    }

    function resetHighlight(e: any) {
      geoJsonVar.resetStyle(e.target);
      update();
    }

    function onEachFeature(feature: any, layer: any) {
      layer.on({
          mouseover: highlightFeature,
          mouseout: resetHighlight,
      });
    }

    info.addTo(this.map);


    const legend = new L.Control();
    legend.setPosition('bottomright');
    legend.onAdd = function(map: L.Map) {
      const div = L.DomUtil.create('div', 'info legend'),
      grades = [50, 100, 250, 500, 1000, 5000, 10000],
      labels = [];
      for (let i = 0; i < grades.length; i++) {
        div.innerHTML +=
            '<i style="background:' + getColor(grades[i] + 1) + '"></i> ' +
            grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
    }

      return div;
    };

    legend.addTo(this.map);
  }

  ngAfterViewInit(): void {
    this.stream$.pipe(
      skip(1),
      map(([ data, geoJson ]) => {
        data?.forEach(item => {
          if (!item.province) return ;
          const province = (geoJson as any).features.find((feature: any) => feature.properties.nombre === item.province);
          if (!province) return ;
          if (!province.properties.total) {
            province.properties.total = item.total;
          } else {
            province.properties.total += item.total;
          }
        });
        return geoJson;
      }),
    )
    .subscribe(geoJson => this.initMap(geoJson));
  }
}
