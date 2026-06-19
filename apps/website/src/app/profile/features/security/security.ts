import { Component, effect, inject, signal } from '@angular/core';
import { form, FormField, required, submit, validate } from '@angular/forms/signals';
import { MatButton } from '@angular/material/button';
import { MatDivider } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ProfileStore } from '../../data-access';

@Component({
  selector: 'security-settings',
  providers: [ProfileStore],
  imports: [MatButton, MatDivider, MatIcon, MatFormFieldModule, MatInputModule, FormField],
  templateUrl: './security.html'
})
export default class SecuritySettings {
  protected profileStore = inject(ProfileStore);

  protected securitySettingsModel = signal({
    password: '',
    confirmPassword: ''
  });
  protected securitySettingsForm = form(this.securitySettingsModel, (schema) => {
    required(schema.password, { message: 'Le mot de passe est obligatoire' });
    required(schema.confirmPassword, { message: 'Confirmez votre mot de passe' });

    validate(schema.confirmPassword, ({ value, valueOf }) => {
      if (value() !== valueOf(schema.password)) {
        return {
          kind: 'passwordMismatch',
          message: 'Le mot de passe et sa confirmation ne correspondent pas.'
        };
      }

      return null;
    });
  });

  constructor() {
    this.profileStore.clearMessages();

    effect(() => {
      if (this.profileStore.success() === 'Mot de passe mis à jour.') {
        this.securitySettingsModel.set({
          password: '',
          confirmPassword: ''
        });
      }
    });
  }

  protected save(event: Event): void {
    event.preventDefault();
    this.profileStore.clearMessages();

    submit(this.securitySettingsForm, async () => {
      this.profileStore.updatePassword({ password: this.securitySettingsModel().password });
    });
  }
}
