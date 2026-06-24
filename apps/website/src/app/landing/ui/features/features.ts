import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'landing-features',
  imports: [MatIconModule],
  templateUrl: './features.html'
})
export class LandingFeatures {
  protected readonly features = [
    {
      icon: 'route',
      title: 'Parcours applicatif cohérent',
      description: 'Pages publiques, authentification et tableau de bord suivent une structure claire dès le départ.'
    },
    {
      icon: 'palette',
      title: 'Interface sobre et thémable',
      description: 'Angular Material, Tailwind et le changement de thème sont déjà combinés dans une base simple.'
    },
    {
      icon: 'layers',
      title: 'Architecture lisible',
      description: 'Les pages composent des sections UI, pendant que les services et stores restent dans data-access.'
    }
  ];
}
