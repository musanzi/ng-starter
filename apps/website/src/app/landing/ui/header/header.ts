import { Component, input, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { SchemeSwitcher } from '@libs/ui';

@Component({
  selector: 'landing-header',
  imports: [RouterLink, MatButtonModule, MatIconModule, SchemeSwitcher],
  templateUrl: './header.html'
})
export class LandingHeader {
  userName = input<string | null>(null);
  isLoading = input(false);

  signOut = output<void>();
}
