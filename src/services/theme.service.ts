import { Injectable, signal, effect } from '@angular/core';
import { StorageService } from '../lib/storage.service';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private readonly STORAGE_KEY = 'dashboard_theme';
  private darkModeSignal = signal<boolean>(false);

  isDarkMode = this.darkModeSignal.asReadonly();

  constructor(private storage: StorageService) {
    this.loadTheme();
    this.setupThemeEffect();
  }

  private loadTheme(): void {
    const stored = this.storage.getItem<boolean>(this.STORAGE_KEY);
    if (stored !== null) {
      this.darkModeSignal.set(stored);
    } else {
      // Check system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      this.darkModeSignal.set(prefersDark);
    }
  }

  private setupThemeEffect(): void {
    effect(() => {
      const isDark = this.darkModeSignal();
      if (isDark) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      this.storage.setItem(this.STORAGE_KEY, isDark);
    });
  }

  toggleTheme(): void {
    this.darkModeSignal.update(current => !current);
  }

  setTheme(isDark: boolean): void {
    this.darkModeSignal.set(isDark);
  }
}