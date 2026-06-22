import { IRoleQuery } from './role-query.interface';

export interface IDeleteRolePayload {
  query: IRoleQuery;
  roleId: string;
}
