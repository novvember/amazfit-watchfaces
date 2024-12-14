import { getHasCustomFontSupport } from './getHasCustomFontSupport';

const { width, height } = hmSetting.getDeviceInfo();

export const SCREEN = {
  width,
  height,
  centerX: width / 2,
  centerY: height / 2,
};

export const COLORS = {
  text: 0xd9d9d9,
};

export const FONT_FAMILY = {
  text: getHasCustomFontSupport() ? 'fonts/handjet-medium.ttf' : undefined,
};

export const FONT_SIZE = {
  text: getHasCustomFontSupport() ? px(56) : px(42),
};

export const TIME_SIZE = {
  width: px(400),
  height: px(400),
};
