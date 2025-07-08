import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { ThemeService } from '../../services/theme.service';
import { ButtonComponent } from '../ui/button/button.component';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, RouterModule, ButtonComponent],
  template: `
    <div class="min-h-screen bg-background">
      <!-- Navigation -->
      <nav class="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div class="flex h-16 items-center justify-between">
            <!-- Logo and Navigation Links -->
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <h1 class="text-xl font-bold text-foreground">Dashboard</h1>
              </div>
              <div class="hidden md:block">
                <div class="ml-10 flex items-baseline space-x-4">
                  <a
                    routerLink="/dashboard"
                    routerLinkActive="bg-primary text-primary-foreground"
                    class="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
                  >
                    Dashboard
                  </a>
                  <a
                    routerLink="/users"
                    routerLinkActive="bg-primary text-primary-foreground"
                    class="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
                  >
                    Users
                  </a>
                  <a
                    routerLink="/tasks"
                    routerLinkActive="bg-primary text-primary-foreground"
                    class="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
                  >
                    Tasks
                  </a>
                </div>
              </div>
            </div>

            <!-- Theme Toggle and Mobile Menu Button -->
            <div class="flex items-center space-x-4">
              <ui-button
                variant="ghost"
                size="icon"
                (onClick)="toggleTheme()"
                [ariaLabel]="themeService.isDarkMode() ? 'Switch to light mode' : 'Switch to dark mode'"
              >
                @if (themeService.isDarkMode()) {
                  <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                } @else {
                  <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                }
              </ui-button>

              <!-- Mobile menu button -->
              <div class="md:hidden">
                <ui-button
                  variant="ghost"
                  size="icon"
                  (onClick)="toggleMobileMenu()"
                  ariaLabel="Open main menu"
                >
                  @if (!mobileMenuOpen()) {
                    <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                  } @else {
                    <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  }
                </ui-button>
              </div>
            </div>
          </div>
        </div>

        <!-- Mobile menu -->
        @if (mobileMenuOpen()) {
          <div class="md:hidden">
            <div class="space-y-1 px-2 pb-3 pt-2 sm:px-3">
              <a
                routerLink="/dashboard"
                routerLinkActive="bg-primary text-primary-foreground"
                class="block rounded-md px-3 py-2 text-base font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
                (click)="closeMobileMenu()"
              >
                Dashboard
              </a>
              <a
                routerLink="/users"
                routerLinkActive="bg-primary text-primary-foreground"
                class="block rounded-md px-3 py-2 text-base font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
                (click)="closeMobileMenu()"
              >
                Users
              </a>
              <a
                routerLink="/tasks"
                routerLinkActive="bg-primary text-primary-foreground"
                class="block rounded-md px-3 py-2 text-base font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
                (click)="closeMobileMenu()"
              >
                Tasks
              </a>
            </div>
          </div>
        }
      </nav>

      <!-- Main Content -->
      <main class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <router-outlet></router-outlet>
      </main>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LayoutComponent {
  mobileMenuOpen = signal(false);

  constructor(
    protected themeService: ThemeService,
    private router: Router
  ) {}

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }

  toggleMobileMenu(): void {
    this.mobileMenuOpen.update(current => !current);
  }

  closeMobileMenu(): void {
    this.mobileMenuOpen.set(false);
  }
}