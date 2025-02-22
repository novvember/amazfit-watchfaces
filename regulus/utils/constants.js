import { getHasCustomFontSupport } from './getHasCustomFontSupport';

const hasCustomFontSupport = getHasCustomFontSupport();

const { width, height } = hmSetting.getDeviceInfo();

export const SCREEN = {
  width,
  height,
  centerX: width / 2,
  centerY: height / 2,
};

export const FONT = hasCustomFontSupport ? 'fonts/PTSans-Bold.ttf' : undefined;

export const COLORS = {
  primary: 0xd6ecf0,
  secondary: 0x22262a,
};

export const TOPLINE_DIGITS_BIG_COORDS = [
  [px(62), px(113)],
  [px(62 + 66), px(113)],
  [px(212), px(113)],
  [px(212 + 66), px(113)],
];

export const TOPLINE_DIGITS_SMALL_COORDS = [
  [px(348), px(115)],
  [px(348 + 32 + 1), px(115)],
];

export const TOPLINE_COLONS_COORDS = [[px(170), px(113)]];

export const BOTTOMLINE_DIGITS_BIG_COORDS = [
  [px(62), px(270)],
  [px(62 + 66), px(270)],
  [px(212), px(270)],
  [px(212 + 66), px(270)],
];

export const BOTTOMLINE_DIGITS_SMALL_COORDS = [
  [px(348), px(272)],
  [px(348 + 32 + 1), px(272)],
];

export const BOTTOMLINE_COLONS_COORDS = [[px(170), px(272)]];
