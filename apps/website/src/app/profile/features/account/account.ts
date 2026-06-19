import { Component, inject, signal } from '@angular/core';
import { email, form, FormField, required, submit } from '@angular/forms/signals';
import { MatButton } from '@angular/material/button';
import { MatDivider } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { AuthStore } from '@website/app/auth/data-access';
import { ProfileStore } from '../../data-access';

@Component({
  selector: 'account-settings',
  providers: [ProfileStore],
  imports: [MatButton, MatDivider, MatIcon, MatFormFieldModule, MatInputModule, FormField],
  templateUrl: './account.html'
})
export default class AccountSettings {
  private authStore = inject(AuthStore);
  protected profileStore = inject(ProfileStore);

  protected accountSettingsModel = signal(this.getUserFormValue());
  protected accountSettingsForm = form(this.accountSettingsModel, (schema) => {
    required(schema.name, { message: 'Le nom est obligatoire' });
    required(schema.email, { message: "L'adresse e-mail est obligatoire" });
    email(schema.email, { message: 'Adresse e-mail invalide' });
  });

  constructor() {
    this.profileStore.clearMessages();
  }

  protected save(event: Event): void {
    event.preventDefault();
    this.profileStore.clearMessages();

    submit(this.accountSettingsForm, async () => {
      this.profileStore.updateProfile(this.accountSettingsModel());
    });
  }

  private getUserFormValue(): { name: string; email: string } {
    const user = this.authStore.user();

    return {
      name: user?.name ?? '',
      email: user?.email ?? ''
    };
  }
}
