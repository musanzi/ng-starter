import { ICreateRoleDto, IRoleResponse, IRolesControllerFindAllResponse, IUpdateRoleDto } from '@/app/core/api';

export interface IUpdateRoleCommand {
  id: IRoleResponse['id'];
  payload: IUpdateRoleDto;
}

export type IRemoveRoleCommand = Pick<IRoleResponse, 'id'>;

export interface IRoleDialogData {
  role?: IRoleResponse;
}

export interface IRoleDialogResult {
  payload: ICreateRoleDto;
}

export interface IRemoveRoleDialogData {
  role: IRoleResponse;
}

export interface IRolesState {
  roles: IRolesControllerFindAllResponse['data'][0];
  isLoading: boolean;
  isSaving: boolean;
  removingRoleId: string;
  error: string;
}
