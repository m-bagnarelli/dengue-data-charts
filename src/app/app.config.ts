import { ApplicationConfig, PLATFORM_INITIALIZER, inject } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { ThemeManagerService } from './core/services/theme-manager.service';
import { MATERIAL_SANITY_CHECKS } from '@angular/material/core';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimationsAsync(),
    provideHttpClient(),
    {
      provide: PLATFORM_INITIALIZER,
      useFactory: () => inject(ThemeManagerService).theme$
    },
    {
      provide: MATERIAL_SANITY_CHECKS,
      useValue: {
        theme: false
      }
    }
  ]
};
