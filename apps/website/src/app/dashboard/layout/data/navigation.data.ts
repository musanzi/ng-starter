import { INavigationItem } from '@libs/utils';

export const NAVIGATION: INavigationItem[] = [
  {
    id: 'account',
    label: 'Mon compte',
    description: 'Gestion du compte',
    children: [
      {
        id: 'account/info',
        label: 'Mon compte',
        icon: 'settings',
        route: '/dashboard/account'
      },
      {
        id: 'account/security',
        label: 'Mot de passe',
        icon: 'lock',
        route: '/dashboard/security'
      }
    ]
  }
];
