import { COLORS, FONTS, MINUTE_TEXT, SCREEN, TEXT_SIZE } from '../utils/constants';

export const TIME_TEXT_PROPS = {
  x: MINUTE_TEXT.x,
  y: MINUTE_TEXT.y,
  w: MINUTE_TEXT.width,
  h: MINUTE_TEXT.height,
  color: COLORS.time,
  text_size: TEXT_SIZE.time,
  align_h: hmUI.align.CENTER_H,
  align_v: hmUI.align.CENTER_V,
  font: FONTS.time,
  text: '00',
  show_level: hmUI.show_level.ONLY_NORMAL,
}

export const HOUR_TEXT_PROPS = {
  ...TIME_TEXT_PROPS,
  x: px(40),
  y: MINUTE_TEXT.y,
};

export const HOUR_BG_PROPS = {
  x: px(40),
  y: SCREEN.height,
  w: MINUTE_TEXT.width,
  h: MINUTE_TEXT.height,
  color: 0x000000,
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const TOP_RECT_PROPS = {
  x: 0,
  y: 0,
  w: SCREEN.width,
  h: px(70),
  color: 0x000000,
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const BOTTOM_RECT_PROPS = {
  ...TOP_RECT_PROPS,
  y: SCREEN.height - px(70),
};

export const HEART_TEXT_PROPS = {
  x: px(148),
  y: px(14),
  w: px(100),
  h: px(54),
  color: COLORS.data,
  text_size: TEXT_SIZE.data,
  line_space: px(-10),
  align_h: hmUI.align.LEFT,
  align_v: hmUI.align.BOTTOM,
  font: FONTS.data,
  text: '',
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const STEPS_TEXT_PROPS = {
  ...HEART_TEXT_PROPS,
  x: px(272),
};

export const DATE_TEXT_PROPS = {
  ...HEART_TEXT_PROPS,
  y: px(408),
  align_v: hmUI.align.TOP,
};

export const BATTERY_TEXT_PROPS = {
  ...DATE_TEXT_PROPS,
  x: px(272),
};
