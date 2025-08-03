import { _storage } from '@jsxiaosi/utils';
import { defineStore } from 'pinia';
import type { RoleEnum } from '@/enum/role';
import type { UseInfoType } from '@/server/useInfo';
import { store } from '..';

export interface UserState {
  userInfo: UseInfoType | null;
  roles: RoleEnum | null;
}

const getStorageUserInfo = (): UserState => {
  const userInfo = _storage.getStorage<UseInfoType>('userInfo');

  if (userInfo) {
    return {
      userInfo,
      roles: userInfo.role,
    };
  }
  return {
    userInfo: null,
    roles: null,
  };
};

const useUserInfoStore = defineStore('userInfo', {
  state: (): UserState => getStorageUserInfo(),
  actions: {
    setUserInfo(value: UseInfoType) {
      _storage.setStorage<UseInfoType>('userInfo', value);
      this.userInfo = value;
      this.roles = value.role;
    },
    setRoles(value: RoleEnum) {
      this.roles = value;
    },
    removeUserInfo() {
      this.userInfo = null;
      this.roles = null;
      _storage.removeStorage('userInfo');
    },
  },
});

export const useUserInfoStoreHook = () => {
  return useUserInfoStore(store);
};
