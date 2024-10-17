import type { LocalesEnum } from '@/enum/locales';
import type en from './modules/en.json';

export type MessageSchema = typeof en;

export type localeKey = (typeof LocalesEnum)[keyof typeof LocalesEnum];

export interface LocalesType {
  name: string;
  locale: localeKey;
}

export type LocaleMessages = {
  [K in localeKey]: MessageSchema;
};
