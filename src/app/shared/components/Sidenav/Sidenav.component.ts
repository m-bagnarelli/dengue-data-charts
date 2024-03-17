import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';

const MATERIAL_MODULES = [
  MatSidenavModule,
  MatDividerModule,
  MatListModule,
  MatIconModule,
  MatCardModule,
]

@Component({
  selector: 'sidenav',
  standalone: true,
  imports: [RouterLink, RouterOutlet, RouterLinkActive, ...MATERIAL_MODULES],
  template: `
    <mat-sidenav-container class="sidenav-container">

      <mat-sidenav mode="side" opened class="sidenav">
        <mat-nav-list class="nav-list">
          <a
            mat-list-item
            routerLink="/by-age-group"
            routerLinkActive="active-link"
            ariaCurrentWhenActive="page">
            Por grupo etario
          </a>
          <a
            mat-list-item
            routerLink="/by-year"
            routerLinkActive="active-link"
            ariaCurrentWhenActive="page">
            Por año
          </a>
          <a
            mat-list-item
            routerLink="#"
            routerLinkActive="active-link"
            ariaCurrentWhenActive="page">
            Por provincia
          </a>
          <a
            mat-list-item
            routerLink="/heat-map"
            routerLinkActive="active-link"
            ariaCurrentWhenActive="page">
            Mapa de calor
          </a>
        </mat-nav-list>
        <mat-divider />
      </mat-sidenav>

      <mat-sidenav-content>
        <main class="main-content">
          <mat-card class="main-card">
            <mat-card-content>
              <router-outlet />
            </mat-card-content>
          </mat-card>
          <aside class="aside-content">
          <mat-card class="example-card">
  <mat-card-header>
    <mat-card-subtitle>Dog Breed</mat-card-subtitle>
    <mat-card-title>Shiba Inu</mat-card-title>
  </mat-card-header>
  <mat-card-content>
    <p>This card has divider and indeterminate progress as footer</p>
    <p>{{ longText }}</p>
    <mat-divider></mat-divider>
  </mat-card-content>
  <mat-card-actions>
    <button mat-button>LIKE</button>
    <button mat-button>SHARE</button>
  </mat-card-actions>
  <mat-card-footer>
  </mat-card-footer>
</mat-card>
<mat-card class="example-card">
  <mat-card-header>
    <mat-card-subtitle>Dog Breed</mat-card-subtitle>
    <mat-card-title>Shiba Inu</mat-card-title>
  </mat-card-header>
  <mat-card-content>
    <p>This card has divider and indeterminate progress as footer</p>
    <p>{{ longText }}</p>
    <mat-divider></mat-divider>
  </mat-card-content>
  <mat-card-actions>
    <button mat-button>LIKE</button>
    <button mat-button>SHARE</button>
  </mat-card-actions>
  <mat-card-footer>
  </mat-card-footer>
</mat-card>
<!-- <mat-card class="example-card">
  <mat-card-header>
    <mat-card-subtitle>Dog Breed</mat-card-subtitle>
    <mat-card-title>Shiba Inu</mat-card-title>
  </mat-card-header>
  <mat-card-content>
    <p>This card has divider and indeterminate progress as footer</p>
    <p>{{ longText }}</p>
    <mat-divider></mat-divider>
  </mat-card-content>
  <mat-card-actions>
    <button mat-button>LIKE</button>
    <button mat-button>SHARE</button>
  </mat-card-actions>
  <mat-card-footer>
  </mat-card-footer>
</mat-card> -->
          </aside>
        </main>
      </mat-sidenav-content>

    </mat-sidenav-container>
  `,
  styles: `
    .sidenav-container {
      height: calc(100% - 64px);
    }
    .nav-list {
      padding: 0;
    }
    .sidenav {
      height: 100%;
      width: 15%;
      display: flex;
      flex-direction: column;
    }
    .main-content {
      width: 100%;
      display: flex;
      justify-content: space-between;
      margin: 2rem;
    }
    .main-card {
      width: 65%;
    }
    .aside-content {
      display: flex;
      width: 20%;
      flex-direction: column;
      justify-content: space-between;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidenavComponent {
  longText = `The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog
  from Japan. A small, agile dog that copes very well with mountainous terrain.`;
}
