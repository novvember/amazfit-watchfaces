import {
  BATTERY,
  COLORS,
  DATE,
  DISCONNECT,
  FONT_FAMILY,
  FONT_SIZE,
  SCREEN,
  SLEEP,
  STEPS,
  TIME_DIGITS,
} from '../utils/constants';

export const BACKGROUND_IMAGE_PROPS = {
  x: 0,
  y: 0,
  src: 'background/background.png',
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const GLYPHS_IMAGE_PROPS = {
  x: 0,
  y: 0,
  src: 'glyphs/glyphs.png',
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const GLYPHS_IMAGE_AOD_PROPS = {
  x: 0,
  y: 0,
  src: 'glyphs/glyphs_aod.png',
  show_level: hmUI.show_level.ONAL_AOD,
};

export const TIME_COLON_PROPS = {
  x: SCREEN.centerX - TIME_DIGITS.colon.width / 2,
  y: SCREEN.centerY - TIME_DIGITS.height / 2,
  w: TIME_DIGITS.colon.width,
  h: TIME_DIGITS.height,
  color: COLORS.primary,
  text_size: FONT_SIZE.time,
  align_h: hmUI.align.CENTER_H,
  align_v: hmUI.align.CENTER_V,
  font: FONT_FAMILY.primary,
  text: ':',
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const TIME_COLON_AOD_PROPS = {
  ...TIME_COLON_PROPS,
  color: COLORS.aod,
  show_level: hmUI.show_level.ONAL_AOD,
};

export const TIME_HOURS_PROPS = {
  x: SCREEN.centerX - TIME_DIGITS.colon.width / 2 - TIME_DIGITS.hours.width,
  y: SCREEN.centerY - TIME_DIGITS.height / 2,
  w: TIME_DIGITS.hours.width,
  h: TIME_DIGITS.height,
  color: COLORS.primary,
  text_size: FONT_SIZE.time,
  align_h: hmUI.align.RIGHT,
  align_v: hmUI.align.CENTER_V,
  font: FONT_FAMILY.primary,
  text: '00',
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const TIME_HOURS_AOD_PROPS = {
  ...TIME_HOURS_PROPS,
  color: COLORS.aod,
  show_level: hmUI.show_level.ONAL_AOD,
};

export const TIME_MINUTES_PROPS = {
  x: SCREEN.centerX + TIME_DIGITS.colon.width / 2,
  y: SCREEN.centerY - TIME_DIGITS.height / 2,
  w: TIME_DIGITS.mins.width,
  h: TIME_DIGITS.height,
  color: COLORS.primary,
  text_size: FONT_SIZE.time,
  align_h: hmUI.align.LEFT,
  align_v: hmUI.align.CENTER_V,
  font: FONT_FAMILY.primary,
  text: '00',
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const TIME_MINUTES_AOD_PROPS = {
  ...TIME_MINUTES_PROPS,
  color: COLORS.aod,
  show_level: hmUI.show_level.ONAL_AOD,
};

export const DATE_BACKGROUND_PROPS = {
  x: SCREEN.centerX - DATE.width / 2,
  y: DATE.y - px(2),
  src: 'background/background_date.png',
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const DATE_TEXT_PROPS = {
  x: SCREEN.centerX - DATE.width / 2,
  y: DATE.y,
  w: DATE.width,
  h: DATE.height,
  color: COLORS.primary,
  text_size: FONT_SIZE.data,
  align_h: hmUI.align.CENTER_H,
  align_v: hmUI.align.CENTER_V,
  font: FONT_FAMILY.primary,
  text: 'XXX 00',
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const DISCONNECT_PROPS = {
  x: SCREEN.centerX - DISCONNECT.width / 2,
  y: px(117),
  type: hmUI.system_status.DISCONNECT,
  src: 'disconnect/disconnect.png',
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const BATTERY_TEXT_PROPS = {
  x: BATTERY.x,
  y: BATTERY.y,
  w: BATTERY.width,
  h: BATTERY.height,
  color: COLORS.primary,
  text_size: FONT_SIZE.data,
  align_h: hmUI.align.LEFT,
  align_v: hmUI.align.CENTER_V,
  font: FONT_FAMILY.primary,
  text: 'XX%',
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const BATTERY_POINTER_PROPS = {
  x: 0,
  y: 0,
  pos_x: SCREEN.centerX - BATTERY.poiner.width / 2,
  pos_y: SCREEN.centerY - BATTERY.poiner.radius - BATTERY.poiner.height / 2,
  w: SCREEN.centerX * 2,
  h: SCREEN.centerY * 2,
  src: 'target_pointer/general.png',
  center_x: SCREEN.centerX,
  center_y: SCREEN.centerX,
  angle: 0,
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const SLEEP_TEXT_PROPS = {
  x: SLEEP.x,
  y: SLEEP.y,
  w: SLEEP.width,
  h: SLEEP.height,
  color: COLORS.primary,
  text_size: FONT_SIZE.data,
  align_h: hmUI.align.LEFT,
  align_v: hmUI.align.CENTER_V,
  font: FONT_FAMILY.primary,
  text: 'XX:XX',
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const SLEEP_POINTER_PROPS = {
  x: 0,
  y: 0,
  pos_x: SCREEN.centerX - BATTERY.poiner.width / 2,
  pos_y: SCREEN.centerY - BATTERY.poiner.radius - BATTERY.poiner.height / 2,
  w: SCREEN.centerX * 2,
  h: SCREEN.centerY * 2,
  src: 'target_pointer/general.png',
  center_x: SCREEN.centerX,
  center_y: SCREEN.centerX,
  angle: 0,
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const STEPS_TEXT_PROPS = {
  x: STEPS.x,
  y: STEPS.y,
  w: STEPS.width,
  h: STEPS.height,
  color: COLORS.primary,
  text_size: FONT_SIZE.data,
  align_h: hmUI.align.RIGHT,
  align_v: hmUI.align.CENTER_V,
  font: FONT_FAMILY.primary,
  text: '00000',
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const STEPS_POINTER_PROPS = {
  x: STEPS.poiner.x - STEPS.poiner.width / 2,
  y: 0,
  src: 'target_pointer/general.png',
  angle: 0,
  show_level: hmUI.show_level.ONLY_NORMAL,
};
