import { COLORS, DATA_RADIUS, FONTS } from './index.const';

export const DATE_DAY_TEXT_PROPS = {
  x: px(240) - DATA_RADIUS - px(60 / 2),
  y: px(240),
  w: px(60),
  h: px(30),
  color: COLORS.primary,
  text_size: px(32),
  align_h: hmUI.align.CENTER_H,
  align_v: hmUI.align.CENTER_V,
  font: FONTS.primary,
  text: '00',
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const DATE_WEEK_TEXT_PROPS = {
  x: px(240) - DATA_RADIUS - px(60 / 2),
  y: px(240) - px(30),
  w: px(60),
  h: px(30),
  color: COLORS.primary,
  text_size: px(32),
  align_h: hmUI.align.CENTER_H,
  align_v: hmUI.align.CENTER_V,
  font: FONTS.primary,
  text: 'XX',
  show_level: hmUI.show_level.ONLY_NORMAL,
};
