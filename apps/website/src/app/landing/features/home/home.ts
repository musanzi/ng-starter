import { Component, inject } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { RouterLink } from '@angular/router';
import { Scheme, Theming } from '@libs/core';
import { AuthStore } from '@website/app/auth/data-access';

@Component({
  selector: 'landing-page',
  imports: [RouterLink, MatButton, MatButtonToggleModule],
  templateUrl: './home.html'
})
export default class Home {
  protected theming = inject(Theming);
  protected authStore = inject(AuthStore);

  protected setScheme(scheme: Scheme): void {
    this.theming.scheme.set(scheme);
  }

  protected signOut(): void {
    this.authStore.signOut();
  }
}
