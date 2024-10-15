import { colorPalette } from '@jsxiaosi/utils';
import type { AppConfig } from '@/store/types';

const body = document.documentElement as HTMLElement;

export function updateColor(primaryColor: string, themeMode: 'light' | 'dark') {
  if (!primaryColor) return;

  const style = document.getElementById('admin-style-root-color');

  const mixColor = themeMode === 'dark' ? '#141414' : '#ffffff';
  let innerHTML = `html${themeMode === 'dark' ? '.dark' : ''}:root{ --el-color-primary: ${primaryColor};\n`;

  for (let i = 1; i <= 9; i++) {
    innerHTML += `--el-color-primary-light-${i}: ${colorPalette(primaryColor, mixColor, i * 0.1)};\n`;
  }

  if (style) style.innerHTML = `${innerHTML}}`;
}

export function themeHtmlClassName(className: string, isShow: boolean) {
  if (isShow) {
    body.classList.add(className);
  } else {
    body.classList.remove(className);
  }
}

export function configTheme(appConfig: AppConfig) {
  if (!appConfig) return;
  const { primaryColor, themeMode, colorWeaknessMode, greyMode } = appConfig;

  updateColor(primaryColor, themeMode);
  if (greyMode || colorWeaknessMode) {
    if (greyMode) themeHtmlClassName('html-grey', greyMode);
    else if (colorWeaknessMode) themeHtmlClassName('html-weakness', colorWeaknessMode);
  }
}
