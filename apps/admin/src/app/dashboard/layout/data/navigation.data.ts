import { INavigationItem } from '@libs/utils';

export const NAVIGATION: INavigationItem[] = [
  {
    id: 'account',
    label: 'Mon compte',
    description: 'Gestion du compte',
    children: [
      {
        id: 'account/info',
        label: 'Mes informations',
        icon: 'settings',
        route: '/account'
      },
      {
        id: 'account/security',
        label: 'Mot de passe',
        icon: 'lock',
        route: '/security'
      }
    ]
  },
  {
    id: 'general',
    label: 'Géneral',
    description: 'Gestion des ressources',
    children: []
  }
];
