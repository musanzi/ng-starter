import { Component, computed, effect, inject, signal, untracked } from '@angular/core';
import { email, form, FormField, minLength, required, submit, validate } from '@angular/forms/signals';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { AuthStore } from '@/app/domains/auth/data-access';
import { IUpdateProfilePayload } from '@/app/domains/auth/interfaces';
import { Message } from '@/app/shared/ui/app-message/app-message';
import { environment } from '@/environments/environment';
import { ProfileStore } from '../../data-access/profile.store';
import { IProfileFormModel, IUpdatePasswordFormModel } from '../../interfaces';

@Component({
  imports: [Message, FormField, MatButtonModule, MatCardModule, MatFormFieldModule, MatIconModule, MatInputModule],
  templateUrl: './profile.html',
  providers: [ProfileStore]
})
export default class Profile {
  protected readonly authStore = inject(AuthStore);
  protected readonly store = inject(ProfileStore);

  private readonly user = this.authStore.user();

  protected readonly profileImageUrl = computed(() => {
    const avatar = this.authStore.user()?.avatar;
    return avatar ? `${environment.apiUrl}/uploads/profiles/${avatar}` : '/images/avatar.webp';
  });

  protected readonly profileModel = signal<IProfileFormModel>({
    name: this.user?.name ?? '',
    email: this.user?.email ?? ''
  });

  protected readonly profileForm = form(this.profileModel, (schemaPath) => {
    required(schemaPath.name, { message: 'Name is required.' });
    required(schemaPath.email, { message: 'Email address is required.' });
    email(schemaPath.email, { message: 'Email address is invalid.' });
  });

  protected readonly passwordModel = signal<IUpdatePasswordFormModel>({
    password: '',
    confirmPassword: ''
  });

  protected readonly passwordForm = form(this.passwordModel, (schemaPath) => {
    required(schemaPath.password, { message: 'Password is required.' });
    minLength(schemaPath.password, 6, { message: 'The password must contain at least 6 characters.' });
    required(schemaPath.confirmPassword, { message: 'Confirmation is required.' });
    validate(schemaPath.confirmPassword, ({ value, valueOf }) =>
      value() !== valueOf(schemaPath.password)
        ? { kind: 'password-match', message: 'Passwords do not match.' }
        : undefined
    );
  });

  protected hidePassword = true;
  protected hidePasswordConfirmation = true;

  constructor() {
    effect(() => {
      if (this.store.passwordUpdated()) {
        untracked(() => {
          this.passwordModel.set({ password: '', confirmPassword: '' });
          this.passwordForm().reset();
        });
      }
    });
  }

  protected onUpdateProfile(): void {
    submit(this.profileForm, async (formState) => {
      const value = formState().value();
      const payload: IUpdateProfilePayload = {
        name: value.name.trim(),
        email: value.email.trim()
      };

      this.store.updateProfile(payload);
    });
  }

  protected onUpdatePassword(): void {
    submit(this.passwordForm, async (formState) => {
      this.store.updatePassword({ password: formState().value().password });
    });
  }
}
