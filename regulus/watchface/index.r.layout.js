import {
  BOTTOMLINE_DIGITS_BIG_COORDS,
  BOTTOMLINE_DIGITS_SMALL_COORDS,
  COLORS,
  FONT,
  TOPLINE_COLONS_COORDS,
  TOPLINE_DIGITS_BIG_COORDS,
  TOPLINE_DIGITS_SMALL_COORDS,
} from '../utils/constants';

export const DIGIT_BIG_EMPTY_PROPS = {
  x: 0,
  y: 0,
  src: 'digits_big/empty.png',
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const DIGITS_BIG_EXTRA_EMPTY_PROPS = {
  x: 0,
  y: 0,
  src: 'digits_big_extra/empty.png',
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const DIGITS_SMALL_EMPTY_PROPS = {
  x: 0,
  y: 0,
  src: 'digits_small/empty.png',
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const COLON_BIG_EMPTY_PROPS = {
  x: 0,
  y: 0,
  src: 'colon_big/colon_empty.png',
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const TIME_COLON_PROPS = {
  x: TOPLINE_COLONS_COORDS[0][0],
  y: TOPLINE_COLONS_COORDS[0][1],
  w: px(66),
  h: px(96),
  src: 'colon_big/colon.png',
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const TIME_HOUR_PROPS = {
  hour_zero: 0,
  hour_startX: TOPLINE_DIGITS_BIG_COORDS[0][0],
  hour_startY: TOPLINE_DIGITS_BIG_COORDS[0][1],
  hour_array: new Array(10).fill(null).map((_, i) => `digits_big/${i}.png`),
  hour_space: 0,
  hour_align: hmUI.align.RIGHT,
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const TIME_MINUTE_PROPS = {
  minute_zero: 1,
  minute_startX: TOPLINE_DIGITS_BIG_COORDS[2][0],
  minute_startY: TOPLINE_DIGITS_BIG_COORDS[2][1],
  minute_array: new Array(10).fill(null).map((_, i) => `digits_big/${i}.png`),
  minute_space: 0,
  minute_align: hmUI.align.LEFT,
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const TIME_SECOND_PROPS = {
  second_zero: 1,
  second_startX: TOPLINE_DIGITS_SMALL_COORDS[0][0],
  second_startY: TOPLINE_DIGITS_SMALL_COORDS[0][1],
  second_array: new Array(10).fill(null).map((_, i) => `digits_small/${i}.png`),
  second_space: px(1),
  second_align: hmUI.align.LEFT,
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const TIME_AMPM_BACKGROUND_PROPS = {
  x: px(345),
  y: px(161),
  src: 'ampm/empty.png',
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const TIME_AMPM_PROPS = {
  am_x: px(345),
  am_y: px(161),
  am_sc_path: 'ampm/am.png',
  am_en_path: 'ampm/am.png',
  pm_x: px(345),
  pm_y: px(161),
  pm_sc_path: 'ampm/pm.png',
  pm_en_path: 'ampm/pm.png',
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const DATE_WEEK_PROPS = {
  x: BOTTOMLINE_DIGITS_BIG_COORDS[0][0],
  y: BOTTOMLINE_DIGITS_BIG_COORDS[0][1],
  week_en: new Array(7).fill(null).map((_, i) => `weekdays_big_extra/${i}.png`),
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const DATE_DAY_PROPS = {
  day_startX: BOTTOMLINE_DIGITS_BIG_COORDS[2][0],
  day_startY: BOTTOMLINE_DIGITS_BIG_COORDS[2][1],
  day_align: hmUI.align.RIGHT,
  day_space: 0,
  day_zero: 0,
  day_en_array: new Array(10).fill(null).map((_, i) => `digits_big/${i}.png`),
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const DATE_MONTH_PROPS = {
  month_startX: BOTTOMLINE_DIGITS_SMALL_COORDS[0][0],
  month_startY: BOTTOMLINE_DIGITS_SMALL_COORDS[0][1],
  month_align: hmUI.align.RIGHT,
  month_space: px(1),
  month_zero: 0,
  month_en_array: new Array(10)
    .fill(null)
    .map((_, i) => `digits_small/${i}.png`),
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const CITY1_TEXT_PROPS = {
  x: px(72),
  y: px(88),
  w: px(250),
  h: px(24),
  color: COLORS.primary,
  text_size: px(18),
  text_style: hmUI.text_style.ELLIPSIS,
  char_space: px(2),
  align_h: hmUI.align.LEFT,
  align_v: hmUI.align.CENTER_V,
  font: FONT,
  text: '',
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const CITY2_TEXT_PROPS = {
  ...CITY1_TEXT_PROPS,
  y: px(367),
};

export const ALARM_IMAGE_PROPS = {
  x: px(340),
  y: px(88),
  src: 'alarm/alarm_off.png',
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const ALARM_STATUS_PROPS = {
  x: px(340),
  y: px(88),
  type: hmUI.system_status.DISCONNECT,
  src: 'alarm/alarm_on.png',
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const DND_IMAGE_PROPS = {
  x: px(340),
  y: px(367),
  src: 'silent/silent_off.png',
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const DND_STATUS_PROPS = {
  x: px(340),
  y: px(367),
  type: hmUI.system_status.DISTURB,
  src: 'silent/silent_on.png',
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const DISCONNECT_IMAGE_PROPS = {
  x: px(380),
  y: px(328),
  src: 'disconnect/disconnect_off.png',
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const DISCONNECT_STATUS_PROPS = {
  x: px(380),
  y: px(328),
  type: hmUI.system_status.DISCONNECT,
  src: 'disconnect/disconnect_on.png',
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const LOCK_IMAGE_PROPS = {
  x: px(350),
  y: px(328),
  src: 'lock/lock_off.png',
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const LOCK_STATUS_PROPS = {
  x: px(350),
  y: px(328),
  type: hmUI.system_status.LOCK,
  src: 'lock/lock_on.png',
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const BATTERY_LEVEL_IMAGE_PROPS = {
  x: px(390),
  y: px(162),
  image_array: new Array(4).fill(null).map((_, i) => `battery/${i}.png`),
  image_length: 4,
  type: hmUI.data_type.BATTERY,
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const FIELD_IMAGE_PROPS = {
  x: px(192),
  y: px(218),
  src: 'field/field.png',
  show_level: hmUI.show_level.ONLY_NORMAL,
};
