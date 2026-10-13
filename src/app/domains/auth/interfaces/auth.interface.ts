import { IUserResponse } from '@/app/core/api';

export interface IAuthState {
  user: IUserResponse | null;
}
