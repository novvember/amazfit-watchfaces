import { COLORS, DOT_SIZE, FONT } from '../utils/constants';

export const HOUR_DOT_PROPS = {
  center_x: 1,
  center_y: 1,
  radius: DOT_SIZE.l / 2,
  color: COLORS.dotHour,
  colorDisabled: COLORS.dotHourDisabled,
};

export const MINUTE_BIG_DOT_PROPS = {
  center_x: 1,
  center_y: 1,
  radius: DOT_SIZE.l / 2,
  color: COLORS.dotMinute,
};

export const MINUTE_SMALL_DOT_PROPS = {
  center_x: 1,
  center_y: 1,
  radius: DOT_SIZE.s / 2,
  radiusDisabled: DOT_SIZE.disabled / 2,
  color: COLORS.dotMinute,
  colorDisabled: COLORS.dotMinuteDisabled,
};

export const TIME_TEXT_PROPS = {
  x: px(240),
  y: px(308),
  w: px(166),
  h: px(46),
  color: COLORS.text,
  text_size: px(38),
  align_h: hmUI.align.RIGHT,
  align_v: hmUI.align.CENTER_V,
  font: FONT,
  text: '',
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const DATE_TEXT_PROPS = {
  ...TIME_TEXT_PROPS,
  y: px(359),
};

export const HEART_TEXT_PROPS = {
  ...TIME_TEXT_PROPS,
  x: px(74),
  color: COLORS.textAccent,
  align_h: hmUI.align.LEFT,
};

export const STEPS_TEXT_PROPS = {
  ...HEART_TEXT_PROPS,
  y: px(359),
};
