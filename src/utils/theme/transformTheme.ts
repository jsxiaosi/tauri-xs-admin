import type { AppConfig } from '@/store/types';

const body = document.documentElement as HTMLElement;

// hex转rgb
function hexToRgb(str: string) {
  const hxs: string[] = str.replace('#', '').match(/../g) || [];
  const newHxs: number[] = [];
  for (let i = 0; i < 3; i++) newHxs[i] = parseInt(hxs[i], 16);
  return newHxs;
}

// rgb转hex
function rgbToHex(a: number, b: number, c: number) {
  const hexs = [a.toString(16), b.toString(16), c.toString(16)];
  for (let i = 0; i < 3; i++) {
    if (hexs[i].length == 1) hexs[i] = `0${hexs[i]}`;
  }
  return `#${hexs.join('')}`;
}

// 参考element style 计算
function mix(color1: string, color2: string, weight: number) {
  weight = Math.max(Math.min(Number(weight), 1), 0);
  const mainColor = hexToRgb(color1);
  const mixColor = hexToRgb(color2);
  const hex = [];
  for (let i = 0; i < mainColor.length; i++)
    hex[i] = Math.round(mainColor[i] * (1 - weight) + mixColor[i] * weight);
  return rgbToHex(hex[0], hex[1], hex[2]);
}

export function updateColor(primaryColor: string, themeMode: 'light' | 'dark') {
  if (!primaryColor) return;

  const style = document.getElementById('admin-style-root-color');

  const mixColor = themeMode === 'dark' ? '#141414' : '#ffffff';
  let innerHTML = `html${
    themeMode === 'dark' ? '.dark' : ''
  }:root{ --el-color-primary: ${primaryColor};\n`;

  // body.style.setProperty('--el-color-primary', primaryColor);
  for (let i = 1; i <= 9; i++) {
    // body.style.setProperty(`--el-color-primary-light-${i}`, mix(primaryColor, mixWhite, i * 0.1));
    innerHTML += `--el-color-primary-light-${i}: ${mix(primaryColor, mixColor, i * 0.1)};\n`;
  }

  if (style) style.innerHTML = innerHTML + '}';
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
