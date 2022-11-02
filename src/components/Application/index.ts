import appLocale from './AppLocale.vue';
import appTheme from './AppTheme.vue';
import appAccount from './AppAccount.vue';
import { withInstall } from '@/utils';

export const AppLocale = withInstall(appLocale);
export const AppTheme = withInstall(appTheme);
export const AppAccount = withInstall(appAccount);
