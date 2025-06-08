import { getHasCustomFontSupport } from './getHasCustomFontSupport';

const hasCustomFontSupport = getHasCustomFontSupport();

const { width, height } = hmSetting.getDeviceInfo();

export const SCREEN = {
  width,
  height,
  centerX: width / 2,
  centerY: height / 2,
};

export const COLORS = {
  primary: 0xd8d8d8,
  background: 0x28282b,
};

export const FONTS = {
  primary: hasCustomFontSupport ? 'fonts/Tomorrow-SemiBold.ttf' : undefined,
  secondary: hasCustomFontSupport ? 'fonts/Handjet-Light.ttf' : undefined,
};

export const FONT_SIZE = {
  time: hasCustomFontSupport ? px(88) : px(88),
  seconds: hasCustomFontSupport ? px(56) : px(48),
  secondary: hasCustomFontSupport ? px(34) : px(24),
  battery: hasCustomFontSupport ? px(28) : px(19),
  today: hasCustomFontSupport ? px(32) : px(34),
};

export const WEEKDAYS = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];
