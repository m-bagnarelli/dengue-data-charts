import { Component, inject } from '@angular/core';
import { SidenavComponent } from './shared/components/Sidenav/Sidenav.component';
import { ToolbarComponent } from './shared/components/Toolbar/Toolbar.component';
import { DataService } from './shared/services/Data.service';

@Component({
    selector: 'app-root',
    standalone: true,
    template: `
      <toolbar />
      <sidenav />
    `,
    imports: [
      SidenavComponent,
      ToolbarComponent
    ]
})
export class AppComponent {
  title = 'Dengue Tracker';
  dataService = inject(DataService);

  constructor() {
    this.dataService.getData();
  }
}
