import { Route } from '@angular/router';

export const routes: Route[] = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.routes').then((r) => r.authRoutes)
  },
  {
    path: 'profile',
    loadChildren: () => import('./profile/profile.routes').then((r) => r.profileRoutes)
  },
  {
    path: '',
    loadChildren: () => import('./landing/landing.routes').then((r) => r.landingRoutes)
  }
];
