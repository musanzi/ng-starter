import { Component, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'cta',
  imports: [RouterLink, MatButtonModule, MatIconModule],
  templateUrl: './cta.html'
})
export class Cta {
  isAuthenticated = input(false);
}
