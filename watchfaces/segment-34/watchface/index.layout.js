import { getHasCustomFontSupport } from '../utils/getHasCustomFontSupport';

const hasCustomFontSupport = getHasCustomFontSupport();

export const COLOR_PRIMARY = 0xffffff;
export const COLOR_ACCENT = 0xffa300;
export const COLOR_ACCENT_SECONDARY = 0xe64b00;
export const COLOR_AOD = 0xb1b1b1;

export const FONT_PRIMARY = hasCustomFontSupport
  ? 'fonts/JetBrainsMono-Light.ttf'
  : undefined;
export const FONT_SECONDARY = hasCustomFontSupport
  ? 'fonts/JetBrainsMono-Medium.ttf'
  : undefined;
