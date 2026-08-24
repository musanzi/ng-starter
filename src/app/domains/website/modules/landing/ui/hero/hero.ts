import { Component, input, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'hero',
  imports: [RouterLink, MatButtonModule, MatIconModule],
  templateUrl: './hero.html'
})
export class Hero {
  isAuthenticated = input(false);
  isLoading = input(false);

  signOut = output<void>();
}
