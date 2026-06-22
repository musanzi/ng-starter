import { Route } from '@angular/router';

export const dashboardRoutes: Route[] = [
  {
    path: '',
    title: 'Stats',
    loadComponent: () => import('./features/stats/stats').then((c) => c.Stats)
  },
  {
    path: 'roles',
    title: 'Rôles',
    loadComponent: () => import('./features/roles/features/roles').then((c) => c.Roles)
  },
  {
    path: 'users',
    title: 'Utilisateurs',
    loadComponent: () => import('./features/users/features/users').then((c) => c.Users)
  }
];
