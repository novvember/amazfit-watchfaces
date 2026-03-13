import {
  COLORS,
  FONT,
  LINE_Y,
  SCREEN,
  TEXT_HEIGHT,
  TEXT_SIZE,
  WIDTH,
} from '../utils/constants';

export const TIME_HOUR_0_TEXT_PROPS = {
  x: SCREEN.centerY - WIDTH / 2,
  y: LINE_Y[0],
  w: WIDTH,
  h: TEXT_HEIGHT,
  color: COLORS.primary,
  text_size: TEXT_SIZE,
  align_h: hmUI.align.RIGHT,
  align_v: hmUI.align.CENTER_V,
  font: FONT,
  text: '',
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const TIME_HOUR_1_TEXT_PROPS = {
  ...TIME_HOUR_0_TEXT_PROPS,
  y: LINE_Y[1],
};

export const TIME_MINUTE_0_TEXT_PROPS = {
  ...TIME_HOUR_0_TEXT_PROPS,
  y: LINE_Y[2],
};

export const TIME_MINUTE_1_TEXT_PROPS = {
  ...TIME_HOUR_0_TEXT_PROPS,
  y: LINE_Y[3],
};

export const TIME_SECOND_0_TEXT_PROPS = {
  ...TIME_HOUR_0_TEXT_PROPS,
  y: LINE_Y[4],
  color: COLORS.accent,
};

export const TIME_SECOND_1_TEXT_PROPS = {
  ...TIME_SECOND_0_TEXT_PROPS,
  y: LINE_Y[5],
};

export const HEART_TEXT_PROPS = {
  ...TIME_HOUR_0_TEXT_PROPS,
  y: LINE_Y[6],
  color: COLORS.accentFaded,
};

export const DATE_TEXT_PROPS = {
  ...TIME_HOUR_0_TEXT_PROPS,
  y: LINE_Y[0],
  color: COLORS.secondary,
  align_h: hmUI.align.LEFT,
  align_v: hmUI.align.CENTER_V,
};

export const WEEKDAY_TEXT_PROPS = {
  ...DATE_TEXT_PROPS,
  y: LINE_Y[1],
};

export const CAL_TEXT_PROPS = {
  ...DATE_TEXT_PROPS,
  y: LINE_Y[2],
};

export const ACTIVITY_TEXT_PROPS = {
  ...DATE_TEXT_PROPS,
  y: LINE_Y[3],
};

export const STEPS_TEXT_PROPS = {
  ...DATE_TEXT_PROPS,
  y: LINE_Y[4],
};

export const DISTANCE_TEXT_PROPS = {
  ...DATE_TEXT_PROPS,
  y: LINE_Y[5],
};

export const BATTERY_TEXT_PROPS = {
  ...DATE_TEXT_PROPS,
  y: LINE_Y[6],
};
