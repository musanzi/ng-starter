import {
  ICreateUserDto,
  IRoleResponse,
  IRolesControllerFindAllResponse,
  IUpdateUserDto,
  IUserResponse,
  IUsersControllerFindAllResponse
} from '@/app/core/api';

// Local list controls and store commands reference generated API models.
export interface IUsersQueryParams {
  page: number;
  q: string;
}

export interface IUpdateUserCommand {
  id: IUserResponse['id'];
  payload: IUpdateUserDto;
}

export type IRemoveUserCommand = Pick<IUserResponse, 'id'>;

export type IUserFormModel = Required<Pick<ICreateUserDto, 'email' | 'name' | 'roles'>>;

export interface IUserDialogData {
  roles: IRoleResponse[];
  user?: IUserResponse;
}

export interface IUserDialogResult {
  payload: ICreateUserDto;
}

export interface IRemoveUserDialogData {
  user: IUserResponse;
}

export interface IUsersState {
  users: IUsersControllerFindAllResponse['data'][0];
  usersCount: IUsersControllerFindAllResponse['data'][1];
  roles: IRolesControllerFindAllResponse['data'][0];
  isLoading: boolean;
  isLoadingRoles: boolean;
  isSaving: boolean;
  isExporting: boolean;
  removingUserId: string;
  error: string;
}
