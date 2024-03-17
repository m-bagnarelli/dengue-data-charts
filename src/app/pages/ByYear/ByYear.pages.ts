import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-by-year',
  standalone: true,
  imports: [],
  template: `<p>ByYear works!</p>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ByYearComponent { }
