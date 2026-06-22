import { computed, inject } from '@angular/core';
import { decrementTotal, getApiErrorMessage } from '@libs/utils';
import { patchState, signalStore, withComputed, withMethods, withProps, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { catchError, exhaustMap, finalize, of, pipe, tap } from 'rxjs';
import { ICreateUserPayload, IDeleteUserPayload, IImportCsvPayload, IUserQuery, IUsersState } from '../interfaces';
import { UsersService } from './users.service';

const initialState: IUsersState = {
  error: null,
  isExporting: false,
  isImporting: false,
  isLoading: false,
  success: null,
  data: [[], 0]
};

export const UsersStore = signalStore(
  withState(initialState),
  withComputed(({ data }) => ({
    total: computed(() => data()[1]),
    users: computed(() => data()[0])
  })),
  withProps(() => ({
    usersService: inject(UsersService)
  })),
  withMethods(({ usersService, ...store }) => {
    const loadUsers = rxMethod<IUserQuery>(
      pipe(
        tap(() => patchState(store, { error: null, isLoading: true })),
        exhaustMap((query) =>
          usersService.findAll(query).pipe(
            tap((data) => patchState(store, { data })),
            catchError((error: Error) => {
              patchState(store, { error: getApiErrorMessage(error, 'Impossible de charger les utilisateurs') });
              return of(null);
            }),
            finalize(() => patchState(store, { isLoading: false }))
          )
        )
      )
    );

    return {
      loadUsers,
      deleteUser: rxMethod<IDeleteUserPayload>(
        pipe(
          tap(() => patchState(store, { error: null, success: null })),
          exhaustMap(({ userId }) =>
            usersService.delete(userId).pipe(
              tap(() => {
                const [users, total] = store.data();
                const nextUsers = users.filter((user) => user.id !== userId);
                const wasDeleted = nextUsers.length !== users.length;

                patchState(store, {
                  data: [nextUsers, wasDeleted ? decrementTotal(total) : total],
                  success: 'Utilisateur supprimé.'
                });
              }),
              catchError((error: Error) => {
                patchState(store, {
                  error: getApiErrorMessage(error, "Impossible de supprimer l'utilisateur")
                });
                return of(null);
              })
            )
          )
        )
      ),
      exportCsv: rxMethod<IUserQuery>(
        pipe(
          tap(() => patchState(store, { error: null, isExporting: true, success: null })),
          exhaustMap((query) =>
            usersService.exportCsv(query).pipe(
              tap((blob) => {
                const url = URL.createObjectURL(blob);
                const anchor = document.createElement('a');
                anchor.href = url;
                anchor.download = 'users.csv';
                anchor.click();
                URL.revokeObjectURL(url);
                patchState(store, { success: 'Export CSV généré.' });
              }),
              catchError((error: Error) => {
                patchState(store, {
                  error: getApiErrorMessage(error, "Impossible d'exporter les utilisateurs")
                });
                return of(null);
              }),
              finalize(() => patchState(store, { isExporting: false }))
            )
          )
        )
      ),
      importCsv: rxMethod<IImportCsvPayload>(
        pipe(
          tap(() => patchState(store, { error: null, isImporting: true, success: null })),
          exhaustMap(({ file, query }) =>
            usersService.importCsv(file).pipe(
              tap(() => {
                patchState(store, { success: 'Import CSV terminé.' });
                loadUsers(query);
              }),
              catchError((error: Error) => {
                patchState(store, {
                  error: getApiErrorMessage(error, "Impossible d'importer les utilisateurs")
                });
                return of(null);
              }),
              finalize(() => patchState(store, { isImporting: false }))
            )
          )
        )
      ),
      saveUser: rxMethod<ICreateUserPayload>(
        pipe(
          tap(() => patchState(store, { error: null, success: null })),
          exhaustMap(({ payload, userId }) => {
            const request = userId ? usersService.update(userId, payload) : usersService.create(payload);

            return request.pipe(
              tap((savedUser) => {
                const [users, total] = store.data();

                if (userId) {
                  patchState(store, {
                    data: [users.map((user) => (user.id === userId ? savedUser : user)), total],
                    success: 'Utilisateur modifié.'
                  });

                  return;
                }

                patchState(store, {
                  data: [[savedUser, ...users], total + 1],
                  success: 'Utilisateur créé.'
                });
              }),
              catchError((error: Error) => {
                patchState(store, {
                  error: getApiErrorMessage(
                    error,
                    userId ? "Impossible de modifier l'utilisateur" : "Impossible de créer l'utilisateur"
                  )
                });
                return of(null);
              })
            );
          })
        )
      ),
      clearMessages(): void {
        patchState(store, { error: null, success: null });
      }
    };
  })
);
