import { withInstall } from '@/utils';
import appAccount from './AppAccount.vue';
import appLocale from './AppLocale.vue';
import appTheme from './AppTheme.vue';

export const AppLocale = withInstall(appLocale);
export const AppTheme = withInstall(appTheme);
export const AppAccount = withInstall(appAccount);
