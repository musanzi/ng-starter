import { Routes } from '@angular/router';
import { authGuard } from '../auth/data-access';

export const profileRoutes: Routes = [
  {
    path: '',
    canActivate: [authGuard],
    loadComponent: () => import('./layout/layout').then((c) => c.SettingsLayout),
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'account'
      },
      {
        path: 'account',
        loadComponent: () => import('./features/account/account')
      },
      {
        path: 'security',
        loadComponent: () => import('./features/security/security')
      }
    ]
  }
];
