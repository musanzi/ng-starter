import { ISignInPayload } from '@/app/domains/auth/modules/sign-in/interfaces';

export interface ISignUpPayload extends ISignInPayload {
  name: string;
}
