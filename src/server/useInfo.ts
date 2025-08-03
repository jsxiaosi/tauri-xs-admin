import type { RoleEnum } from '@/enum/role';
import { deffHttp } from '@/utils/axios';

export interface UseInfoType {
  name: string;
  userid: string;
  email: string;
  signature: string;
  introduction: string;
  title: string;
  token: string;
  role: RoleEnum;
}

export interface UserParams {
  username: string;
  password: string;
}

export const getUserInfo = (user: string, pwd: string) =>
  deffHttp.post<UseInfoType, UserParams>(
    {
      url: '/mock_api/login',
      data: { username: user, password: pwd },
    },
    { errorMessageMode: 'modal', withToken: false },
  );
