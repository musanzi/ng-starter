import { environment } from '../../../environments/environment';

export function getProfileAvatarUrl(avatar: string | null | undefined): string | null {
  return avatar ? `${environment.apiUrl}/uploads/profiles/${avatar}` : null;
}
