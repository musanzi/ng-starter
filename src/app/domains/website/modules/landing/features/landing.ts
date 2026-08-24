import { AuthStore } from '@/app/domains/auth/data-access/auth.store';
import { Component, inject } from '@angular/core';
import { Cta } from '../ui/cta/cta';
import { Features } from '../ui/features/features';
import { Hero } from '../ui/hero/hero';

@Component({
  selector: 'app-landing',
  imports: [Hero, Features, Cta],
  templateUrl: './landing.html'
})
export class Landing {
  protected authStore = inject(AuthStore);

  protected signOut(): void {
    this.authStore.signOut();
  }
}
