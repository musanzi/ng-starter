import { computed, inject } from '@angular/core';
import { getApiErrorMessage } from '@libs/utils';
import { patchState, signalStore, withComputed, withMethods, withProps, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { catchError, exhaustMap, finalize, of, pipe, tap } from 'rxjs';
import { IRoleQuery, IRolesState, ISaveRolePayload } from '../interfaces';
import { RolesService } from './roles.service';

interface IDeleteRolePayload {
  query: IRoleQuery;
  roleId: string;
}

const initialState: IRolesState = {
  data: [[], 0],
  error: null,
  isLoading: false,
  success: null
};

export const RolesStore = signalStore(
  withState(initialState),
  withComputed(({ data }) => ({
    roles: computed(() => data()[0]),
    rolesById: computed(() => new Map(data()[0].map((role) => [role.id, role.name]))),
    total: computed(() => data()[1])
  })),
  withProps(() => ({
    rolesService: inject(RolesService)
  })),
  withMethods(({ rolesService, ...store }) => ({
    loadRoles: rxMethod<IRoleQuery>(
      pipe(
        tap(() => patchState(store, { error: null, isLoading: true })),
        exhaustMap((query) =>
          rolesService.findAll(query).pipe(
            tap((data) => patchState(store, { data })),
            catchError((error: Error) => {
              patchState(store, { error: getApiErrorMessage(error, 'Impossible de charger les rôles') });
              return of(null);
            }),
            finalize(() => patchState(store, { isLoading: false }))
          )
        )
      )
    )
  })),
  withMethods(({ loadRoles, rolesService, ...store }) => ({
    clearMessages(): void {
      patchState(store, { error: null, success: null });
    },
    deleteRole: rxMethod<IDeleteRolePayload>(
      pipe(
        tap(() => patchState(store, { error: null, success: null })),
        exhaustMap(({ query, roleId }) =>
          rolesService.delete(roleId).pipe(
            tap(() => {
              patchState(store, { success: 'Rôle supprimé.' });
              loadRoles(query);
            }),
            catchError((error: Error) => {
              patchState(store, { error: getApiErrorMessage(error, 'Impossible de supprimer le rôle') });
              return of(null);
            })
          )
        )
      )
    ),
    saveRole: rxMethod<ISaveRolePayload>(
      pipe(
        tap(() => patchState(store, { error: null, success: null })),
        exhaustMap(({ payload, query, roleId }) => {
          const request = roleId ? rolesService.update(roleId, payload) : rolesService.create(payload);

          return request.pipe(
            tap(() => {
              patchState(store, { success: roleId ? 'Rôle modifié.' : 'Rôle créé.' });
              loadRoles(query);
            }),
            catchError((error: Error) => {
              patchState(store, {
                error: getApiErrorMessage(
                  error,
                  roleId ? 'Impossible de modifier le rôle' : 'Impossible de créer le rôle'
                )
              });
              return of(null);
            })
          );
        })
      )
    )
  }))
);
