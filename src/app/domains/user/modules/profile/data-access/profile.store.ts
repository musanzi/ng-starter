import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthStore } from '@/app/domains/auth/data-access';
import { patchState, signalStore, withMethods, withProps, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { catchError, concatMap, EMPTY, finalize, pipe, tap } from 'rxjs';
import { IProfileResponse, IProfileState, IUpdatePasswordPayload, IUpdateProfilePayload } from '../interfaces';

const initialState: IProfileState = {
  isUpdatingProfile: false,
  isUpdatingPassword: false,
  profileUpdated: false,
  passwordUpdated: false,
  profileError: '',
  passwordError: ''
};

export const ProfileStore = signalStore(
  withState(initialState),
  withProps(() => ({
    _authStore: inject(AuthStore),
    _http: inject(HttpClient)
  })),
  withMethods(({ _authStore, _http, ...store }) => ({
    updateProfile: rxMethod<IUpdateProfilePayload>(
      pipe(
        concatMap((payload) => {
          patchState(store, { isUpdatingProfile: true, profileUpdated: false, profileError: '' });
          return _http.patch<IProfileResponse>('/auth/me/update', payload).pipe(
            tap((user) => {
              _authStore.setUser(user);
              patchState(store, { profileUpdated: true });
            }),
            catchError(() => {
              patchState(store, {
                profileError: 'Unable to update the profile. Please try again.'
              });
              return EMPTY;
            }),
            finalize(() => patchState(store, { isUpdatingProfile: false }))
          );
        })
      )
    ),
    updatePassword: rxMethod<IUpdatePasswordPayload>(
      pipe(
        concatMap((payload) => {
          patchState(store, { isUpdatingPassword: true, passwordUpdated: false, passwordError: '' });
          return _http.patch<void>('/auth/password/update', payload).pipe(
            tap(() => patchState(store, { passwordUpdated: true })),
            catchError(() => {
              patchState(store, {
                passwordError: 'Unable to update the password. Please try again.'
              });
              return EMPTY;
            }),
            finalize(() => patchState(store, { isUpdatingPassword: false }))
          );
        })
      )
    ),
    clearProfileMessage(): void {
      patchState(store, { profileUpdated: false, profileError: '' });
    },
    clearPasswordMessage(): void {
      patchState(store, { passwordUpdated: false, passwordError: '' });
    }
  }))
);
