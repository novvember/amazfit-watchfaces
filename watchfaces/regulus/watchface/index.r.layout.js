import {
  ALARM_OFF_IMAGE,
  ALARM_ON_IMAGE,
  BOTTOM_OPTIONAL_TYPES,
  BOTTOMLINE_COLONS_COORDS,
  BOTTOMLINE_DIGITS_BIG_COORDS,
  BOTTOMLINE_DIGITS_SMALL_COORDS,
  CENTRAL_OPTIONAL_TYPES,
  COLON_BIG_AOD_IMAGE,
  COLON_BIG_EMPTY_IMAGE,
  COLON_BIG_IMAGE,
  COLORS,
  DIGITS_BIG_AOD_IMAGES,
  DIGITS_BIG_EMPTY_IMAGE,
  DIGITS_BIG_EXTRA_EMPTY_IMAGE,
  DIGITS_BIG_EXTRA_IMAGES,
  DIGITS_BIG_IMAGES,
  DIGITS_SMALL_EMPTY_IMAGE,
  DIGITS_SMALL_IMAGES,
  FONT,
  SILENT_OFF_IMAGE,
  SILENT_ON_IMAGE,
  TOPLINE_COLONS_COORDS,
  TOPLINE_DIGITS_BIG_COORDS,
  TOPLINE_DIGITS_SMALL_COORDS,
  WEEKDAYS_BIG_EXTRA_IMAGES,
} from '../utils/constants';

export const DIGIT_BIG_EMPTY_PROPS = {
  x: 0,
  y: 0,
  src: DIGITS_BIG_EMPTY_IMAGE,
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const DIGITS_BIG_EXTRA_EMPTY_PROPS = {
  x: 0,
  y: 0,
  src: DIGITS_BIG_EXTRA_EMPTY_IMAGE,
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const DIGITS_SMALL_EMPTY_PROPS = {
  x: 0,
  y: 0,
  src: DIGITS_SMALL_EMPTY_IMAGE,
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const COLON_BIG_EMPTY_PROPS = {
  x: 0,
  y: 0,
  src: COLON_BIG_EMPTY_IMAGE,
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const TIME_COLON_PROPS = {
  x: TOPLINE_COLONS_COORDS[0][0],
  y: TOPLINE_COLONS_COORDS[0][1],
  w: px(66),
  h: px(96),
  src: COLON_BIG_IMAGE,
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const TIME_AOD_COLON_PROPS = {
  x: TOPLINE_COLONS_COORDS[0][0],
  y: TOPLINE_COLONS_COORDS[0][1],
  w: px(66),
  h: px(96),
  src: COLON_BIG_AOD_IMAGE,
  show_level: hmUI.show_level.ONAL_AOD,
};

export const WORLD_CLOCK_COLON_PROPS = {
  ...TIME_COLON_PROPS,
  x: BOTTOMLINE_COLONS_COORDS[0][0],
  y: BOTTOMLINE_COLONS_COORDS[0][1],
};

export const TIME_HOUR_PROPS = {
  hour_zero: 0,
  hour_startX: TOPLINE_DIGITS_BIG_COORDS[0][0],
  hour_startY: TOPLINE_DIGITS_BIG_COORDS[0][1],
  hour_array: DIGITS_BIG_IMAGES,
  hour_space: 0,
  hour_align: hmUI.align.RIGHT,
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const TIME_MINUTE_PROPS = {
  minute_zero: 1,
  minute_startX: TOPLINE_DIGITS_BIG_COORDS[2][0],
  minute_startY: TOPLINE_DIGITS_BIG_COORDS[2][1],
  minute_array: DIGITS_BIG_IMAGES,
  minute_space: 0,
  minute_align: hmUI.align.LEFT,
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const TIME_AOD_HOUR_PROPS = {
  hour_zero: 0,
  hour_startX: TOPLINE_DIGITS_BIG_COORDS[0][0],
  hour_startY: TOPLINE_DIGITS_BIG_COORDS[0][1],
  hour_array: DIGITS_BIG_AOD_IMAGES,
  hour_space: 0,
  hour_align: hmUI.align.RIGHT,
  show_level: hmUI.show_level.ONAL_AOD,
};

export const TIME_AOD_MINUTE_PROPS = {
  minute_zero: 1,
  minute_startX: TOPLINE_DIGITS_BIG_COORDS[2][0],
  minute_startY: TOPLINE_DIGITS_BIG_COORDS[2][1],
  minute_array: DIGITS_BIG_AOD_IMAGES,
  minute_space: 0,
  minute_align: hmUI.align.LEFT,
  show_level: hmUI.show_level.ONAL_AOD,
};

export const TIME_SECOND_PROPS = {
  second_zero: 1,
  second_startX: TOPLINE_DIGITS_SMALL_COORDS[0][0],
  second_startY: TOPLINE_DIGITS_SMALL_COORDS[0][1],
  second_array: DIGITS_SMALL_IMAGES,
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
  week_en: WEEKDAYS_BIG_EXTRA_IMAGES,
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const DATE_DAY_PROPS = {
  day_startX: BOTTOMLINE_DIGITS_BIG_COORDS[2][0],
  day_startY: BOTTOMLINE_DIGITS_BIG_COORDS[2][1],
  day_align: hmUI.align.RIGHT,
  day_space: 0,
  day_zero: 0,
  day_en_array: DIGITS_BIG_IMAGES,
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const DATE_MONTH_PROPS = {
  month_startX: BOTTOMLINE_DIGITS_SMALL_COORDS[0][0],
  month_startY: BOTTOMLINE_DIGITS_SMALL_COORDS[0][1],
  month_align: hmUI.align.RIGHT,
  month_space: px(1),
  month_zero: 0,
  month_en_array: DIGITS_SMALL_IMAGES,
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const CITY1_TEXT_PROPS = {
  x: px(72),
  y: px(88),
  w: px(210),
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
  x: px(288),
  y: px(88),
  src: ALARM_OFF_IMAGE,
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const ALARM_STATUS_PROPS = {
  x: px(288),
  y: px(88),
  type: hmUI.system_status.CLOCK,
  src: ALARM_ON_IMAGE,
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const DND_IMAGE_PROPS = {
  x: px(288),
  y: px(367),
  src: SILENT_OFF_IMAGE,
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const DND_STATUS_PROPS = {
  x: px(288),
  y: px(367),
  type: hmUI.system_status.DISTURB,
  src: SILENT_ON_IMAGE,
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
  image_array: new Array(10).fill(null).map((_, i) => `battery/${i}.png`),
  image_length: 10,
  type: hmUI.data_type.BATTERY,
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const FIELD_IMAGE_PROPS = {
  x: px(192),
  y: px(218),
  src: 'field/field.png',
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const FIELD_ICON_IMAGE_PROPS = {
  x: 0,
  y: 0,
  src: '',
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const WORLD_CLOCK_HOUR_PROPS = {
  x: BOTTOMLINE_DIGITS_BIG_COORDS[0][0],
  y: BOTTOMLINE_DIGITS_BIG_COORDS[0][1],
  w: px(66) * 2,
  h: px(96),
  font_array: DIGITS_BIG_EXTRA_IMAGES,
  align_h: hmUI.align.RIGHT,
  h_space: 0,
  text: '',
  alpha: 255,
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const WORLD_CLOCK_MINUTE_PROPS = {
  x: BOTTOMLINE_DIGITS_BIG_COORDS[2][0],
  y: BOTTOMLINE_DIGITS_BIG_COORDS[2][1],
  w: px(66) * 2,
  h: px(96),
  font_array: DIGITS_BIG_IMAGES,
  align_h: hmUI.align.LEFT,
  h_space: 0,
  text: '',
  alpha: 255,
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const BACKGROUND_AOD_IMAGE_PROPS = {
  x: 0,
  y: 0,
  src: 'edit/background.png',
  show_level: hmUI.show_level.ONLY_EDIT,
};

export const BOTTOMLINE_EDIT_GROUP_PROPS = {
  edit_id: 101,
  x: px(58),
  y: px(266),
  w: px(360),
  h: px(126),
  select_image: 'edit/bottom_select.png',
  un_select_image: 'edit/bottom_unselect.png',
  optional_types: BOTTOM_OPTIONAL_TYPES,
  default_type: BOTTOM_OPTIONAL_TYPES[0].type,
  count: BOTTOM_OPTIONAL_TYPES.length,
  tips_BG: 'edit/tip.png',
  tips_x: px(10),
  tips_y: px(-35),
  tips_width: px(110),
  tips_margin: px(5),
};

export const CENTRALLINE_LEFT_EDIT_GROUP_PROPS = {
  edit_id: 102,
  x: px(58),
  y: px(212),
  w: px(130),
  h: px(52),
  select_image: 'edit/central_select.png',
  un_select_image: 'edit/central_unselect.png',
  optional_types: CENTRAL_OPTIONAL_TYPES,
  default_type: CENTRAL_OPTIONAL_TYPES[1].type,
  count: CENTRAL_OPTIONAL_TYPES.length,
  tips_BG: 'edit/tip.png',
  tips_x: px(10),
  tips_y: px(-35),
  tips_width: px(110),
  tips_margin: px(5),
};

export const CENTRALLINE_RIGHT_EDIT_GROUP_PROPS = {
  ...CENTRALLINE_LEFT_EDIT_GROUP_PROPS,
  edit_id: 103,
  x: px(290),
  default_type: CENTRAL_OPTIONAL_TYPES[0].type,
};
