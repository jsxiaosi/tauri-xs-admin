import { deffHttp } from '@/utils/axios';
import type { AppConfig } from '@/store/types';

enum Api {
  ROUTE_CONFIG_INFO = '/serverConfig.json',
}

export const getConfigInfo = () => deffHttp.get<AppConfig>({ url: Api.ROUTE_CONFIG_INFO });
