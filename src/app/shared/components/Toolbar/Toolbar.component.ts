import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ThemeManagerService, Themes } from '../../../core/services/theme-manager.service';
import { AsyncPipe } from '@angular/common';

const MATERIAL_MODULES = [
  MatToolbarModule,
  MatIconModule,
  MatButtonModule,
];

@Component({
  selector: 'toolbar',
  standalone: true,
  imports: [AsyncPipe, ...MATERIAL_MODULES],
  template: `
    <mat-toolbar class="mat-elevation-z8" color="primary">
      <span>Dengue Tracker</span>
      @if ((themeManager.theme$ | async) === 'dark') {
        <button class="theme-button" mat-icon-button aria-label="Light mode icon" (click)="switchTheme('light')">
          <mat-icon>light_mode</mat-icon>
        </button>
      } @else {
        <button class="theme-button" mat-icon-button aria-label="Dark mode icon" (click)="switchTheme('dark')">
          <mat-icon>dark_mode</mat-icon>
        </button>
      }
    </mat-toolbar>
  `,
  styles: `
    .theme-button {
      margin-left: auto;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToolbarComponent {
  themeManager = inject(ThemeManagerService);
  switchTheme(themeName: Themes) {
    this.themeManager.switchTheme(themeName);
  }
}
