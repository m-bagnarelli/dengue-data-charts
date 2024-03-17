import { Injectable } from '@angular/core';
import { Subject, fromEvent, map, merge, shareReplay, startWith, tap } from 'rxjs';

export type Themes = 'light' | 'dark';
export type ThemeUrls = `${Themes}-theme.css`;

@Injectable({
  providedIn: 'root'
})
export class ThemeManagerService {
  // Detect which theme user prefers
  #preferenceQuery = matchMedia(`(prefers-color-scheme: light)`);
  #themeSwitcher = new Subject<Themes>();
  #userEnvThemePreference = fromEvent<MediaQueryList>(this.#preferenceQuery, 'change').pipe(
    startWith(this.#preferenceQuery),
    map(resolvePreferredTheme),
  );
  theme$ = merge(
    this.#userEnvThemePreference,
    this.#themeSwitcher
  ).pipe(
    // Load the corresponding css file (Theme)
    tap(theme => loadTheme(getThemeLinkElement(), theme)),
    shareReplay()
  );

  switchTheme(themeName: Themes) {
    localStorage.setItem('preferredTheme', themeName);
    this.#themeSwitcher.next(themeName);
  }
}

function resolvePreferredTheme(query: MediaQueryList): Themes {
  const preferredTheme = localStorage.getItem('preferredTheme');
  if (preferredTheme) {
    return preferredTheme as Themes;
  } else {
    return query.matches ? 'light' : 'dark';
  }
}

function getThemeLinkElement(): HTMLLinkElement {
  const existingLinkEl = document.head.querySelector<HTMLLinkElement>(`#appTheme`);
  if (existingLinkEl) return existingLinkEl;

  const linkEl = document.createElement('link');
  linkEl.setAttribute('rel', 'stylesheet');
  linkEl.setAttribute('id', 'appTheme');
  document.head.querySelector(`link[rel="stylesheet"]:last-of-type`)?.after(linkEl);
  return linkEl;
}

function loadTheme(linkEl: HTMLLinkElement, theme: Themes) {
  linkEl.setAttribute('href', resolveThemeUrl(theme))
}

function resolveThemeUrl(themeName: Themes): ThemeUrls {
  return `${themeName}-theme.css`;
}
