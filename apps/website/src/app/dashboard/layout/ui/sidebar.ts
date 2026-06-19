import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DashboardNavigation } from '@libs/ui';
import { NAVIGATION } from '../data/navigation.data';

@Component({
  selector: 'dashboard-sidebar',
  imports: [DashboardNavigation, RouterLink],
  host: {
    class: 'flex w-full flex-auto flex-col'
  },
  template: `
    <div class="relative flex items-center gap-x-2.5 pt-5 pr-4 pb-0 pl-6">
      <a class="flex flex-col" routerLink="/">
        <div class="text-on-surface text-lg leading-none font-bold tracking-wider">Dashboard</div>
      </a>
    </div>

    <dashboard-navigation class="mt-8 mb-4 flex-auto" [navItems]="navItems" />
  `
})
export class DashboardSidebar {
  navItems = NAVIGATION;
}
