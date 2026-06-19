import { Location } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatCard } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'auth-forgot-password-sent',
  templateUrl: './forgot-password-sent.html',
  imports: [RouterLink, MatCard, MatIconModule],
})
export class AuthForgotPasswordSent {
  private location = inject(Location);

  goBack() {
    this.location.back();
  }
}
