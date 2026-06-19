import { inject } from '@angular/core';
import { getApiErrorMessage } from '@libs/utils';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { AuthStore } from '@website/app/auth/data-access';
import { catchError, exhaustMap, finalize, of, pipe, tap } from 'rxjs';
import { IProfileState, IUpdatePasswordPayload, IUpdateProfilePayload } from '../interfaces';
import { ProfileService } from './profile.service';

const initialState: IProfileState = {
  isLoading: false,
  error: null,
  success: null
};

export const ProfileStore = signalStore(
  withState(initialState),
  withMethods((store, profileService = inject(ProfileService), authStore = inject(AuthStore)) => ({
    updateProfile: rxMethod<IUpdateProfilePayload>(
      pipe(
        tap(() => patchState(store, { isLoading: true, error: null, success: null })),
        exhaustMap((payload) =>
          profileService.updateProfile(payload).pipe(
            tap((user) => {
              authStore.setUser(user);
              patchState(store, { success: 'Informations du compte mises à jour.' });
            }),
            catchError((error: Error) => {
              patchState(store, {
                error: getApiErrorMessage(error, 'Impossible de mettre à jour les informations du compte')
              });
              return of(null);
            }),
            finalize(() => patchState(store, { isLoading: false }))
          )
        )
      )
    ),
    updatePassword: rxMethod<IUpdatePasswordPayload>(
      pipe(
        tap(() => patchState(store, { isLoading: true, error: null, success: null })),
        exhaustMap((payload) =>
          profileService.updatePassword(payload).pipe(
            tap(() => patchState(store, { success: 'Mot de passe mis à jour.' })),
            catchError((error: Error) => {
              patchState(store, {
                error: getApiErrorMessage(error, 'Impossible de mettre à jour le mot de passe')
              });
              return of(null);
            }),
            finalize(() => patchState(store, { isLoading: false }))
          )
        )
      )
    ),
    clearMessages(): void {
      patchState(store, { error: null, success: null });
    }
  }))
);
