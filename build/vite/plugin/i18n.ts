import path from 'path';
import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite';

export function configVueI18nPlugin() {
  return VueI18nPlugin({
    include: [path.resolve(__dirname, '../../../', './src/locales/modules/**')],
  });
}
