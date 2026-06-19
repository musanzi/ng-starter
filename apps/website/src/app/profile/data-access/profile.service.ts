import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { IAuthProfile } from '@website/app/auth/interfaces';
import { environment } from '../../../environments/environment';
import { IUpdatePasswordPayload, IUpdateProfilePayload } from '../interfaces';

@Service()
export class ProfileService {
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl;

  updateProfile(dto: IUpdateProfilePayload) {
    return this.http.patch<IAuthProfile>(this.apiUrl + '/auth/me', dto);
  }

  updatePassword(dto: IUpdatePasswordPayload) {
    return this.http.patch<void>(this.apiUrl + '/auth/password', dto);
  }
}
