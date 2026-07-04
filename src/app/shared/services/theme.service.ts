import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private isDark = false;

  constructor() {
    const saved = localStorage.getItem('theme');
    if (saved === 'dark') {
      this.enableDarkTheme();
    } else {
      this.enableLightTheme();
    }
  }

  toggleTheme() {
    if (this.isDark) {
      this.enableLightTheme();
    } else {
      this.enableDarkTheme();
    }
  }

  isDarkTheme(): boolean {
    return this.isDark;
  }

  private enableDarkTheme() {
    this.isDark = true;
    document.body.classList.add('dark-theme');
    localStorage.setItem('theme', 'dark');
  }

  private enableLightTheme() {
    this.isDark = false;
    document.body.classList.remove('dark-theme');
    localStorage.setItem('theme', 'light');
  }
}
