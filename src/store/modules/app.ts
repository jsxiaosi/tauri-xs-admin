import { defineStore } from 'pinia';
import { getConfig } from '@/config';
import { store } from '@/store';
import type { AppConfig, AppState } from '../types';

const useAppStore = defineStore('app', {
  state: (): AppState => ({
    appConfigMode: getConfig(),
  }),
  getters: {
    getAppConfigMode(): AppConfig {
      return this.appConfigMode;
    },
  },
  actions: {
    setAppConfigMode(data: AppConfig): void {
      const newData = data;
      localStorage.setItem('appConfigMode', JSON.stringify(newData));
      this.appConfigMode = newData;
    },
  },
});

export function useAppStoreHook() {
  return useAppStore(store);
}
