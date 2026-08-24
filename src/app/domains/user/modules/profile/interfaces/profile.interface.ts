import { IUser } from '@/app/shared/interfaces';

export interface IProfileFormModel {
  name: string;
  email: string;
}

export interface IUpdatePasswordFormModel {
  password: string;
  confirmPassword: string;
}

export interface IUpdatePasswordPayload {
  password: string;
}

export type IProfileResponse = IUser;

export interface IProfileState {
  isUpdatingProfile: boolean;
  isUpdatingPassword: boolean;
  profileUpdated: boolean;
  passwordUpdated: boolean;
  profileError: string;
  passwordError: string;
}
