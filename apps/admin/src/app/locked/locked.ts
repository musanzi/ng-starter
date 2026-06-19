import { Location } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { AuthStore } from '../auth/data-access';

@Component({
  selector: 'locked-page',
  imports: [MatButton, MatIcon],
  templateUrl: './locked.html'
})
export class Locked {
  protected authStore = inject(AuthStore);
  private location = inject(Location);

  protected goBack(): void {
    this.location.back();
  }

  protected refreshAccess(): void {
    this.authStore.getProfile();
  }
}
