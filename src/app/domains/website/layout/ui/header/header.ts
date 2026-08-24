import { Component, computed, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NAVIGATION_LINKS } from '../../data';

@Component({
  selector: 'app-header',
  imports: [MatButtonModule, MatIcon, RouterLink, RouterLinkActive],
  host: {
    '(window:scroll)': 'updateScrolledState()'
  },
  templateUrl: './header.html'
})
export class Header {
  protected isScrolled = signal(false);
  protected isMenuOpen = signal(false);

  protected links = NAVIGATION_LINKS;
  protected solidHeader = computed(() => this.isScrolled());

  protected toggleMenu(): void {
    this.isMenuOpen.update((isOpen) => !isOpen);
  }

  protected closeMenu(): void {
    this.isMenuOpen.set(false);
  }

  protected navLinkClasses(active: boolean): string {
    if (!this.isScrolled()) {
      return active
        ? 'border-neutral-950 text-neutral-950  '
        : 'border-transparent text-neutral-700 hover:border-neutral-400 hover:text-neutral-950   ';
    }

    return active
      ? 'border-primary-500 text-neutral-950 '
      : 'border-transparent text-neutral-700 hover:border-neutral-300 hover:text-neutral-950   ';
  }

  protected mobileNavLinkClasses(active: boolean): string {
    return active
      ? 'bg-primary-50 text-primary-700  '
      : 'text-neutral-700 hover:bg-neutral-100 hover:text-neutral-950   ';
  }

  protected updateScrolledState(): void {
    this.isScrolled.set(window.scrollY > 0);
  }
}
