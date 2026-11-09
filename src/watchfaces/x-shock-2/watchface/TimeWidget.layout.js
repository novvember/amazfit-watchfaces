import { DIGITS_BIG, DIGITS_SMALL } from './index.const';

export const TIME_COLON_PROPS = {
  x: px(160),
  y: px(242),
  src: 'digits-big/colon.png',
  show_level: hmUI.show_level.ONLY_NORMAL | hmUI.show_level.ONAL_AOD,
};

export const TIME_HOUR_PROPS = {
  hour_zero: 1,
  hour_startX: px(59),
  hour_startY: px(242),
  hour_array: DIGITS_BIG,
  hour_space: 0,
  hour_align: hmUI.align.RIGHT,
  show_level: hmUI.show_level.ONLY_NORMAL | hmUI.show_level.ONAL_AOD,
};

export const TIME_MINUTE_PROPS = {
  minute_zero: 1,
  minute_startX: px(199),
  minute_startY: px(242),
  minute_array: DIGITS_BIG,
  minute_space: 0,
  minute_align: hmUI.align.RIGHT,
  show_level: hmUI.show_level.ONLY_NORMAL | hmUI.show_level.ONAL_AOD,
};

export const TIME_SECOND_PROPS = {
  second_zero: 1,
  second_startX: px(324),
  second_startY: px(266),
  second_array: DIGITS_SMALL,
  second_space: 0,
  second_align: hmUI.align.RIGHT,
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const TIME_SECOND_AOD_LEFT_PROPS = {
  x: px(324),
  y: px(266),
  src: 'digits-small/-.png',
  show_level: hmUI.show_level.ONAL_AOD,
};

export const TIME_SECOND_AOD_RIGHT_PROPS = {
  x: px(369),
  y: px(266),
  src: 'digits-small/-.png',
  show_level: hmUI.show_level.ONAL_AOD,
};

export const TIME_AM_PM_PROPS = {
  pm_x: px(70),
  pm_y: px(214),
  pm_en_path: 'icons/pm.png',
  pm_sc_path: 'icons/pm.png',

  am_x: px(75),
  am_y: px(212),
  am_en_path: 'icons/am.png',
  am_sc_path: 'icons/am.png',

  show_level: hmUI.show_level.ONLY_NORMAL | hmUI.show_level.ONAL_AOD,
};

export const TIME_24_HOUR_PROPS = {
  x: px(119),
  y: px(214),
  src: 'icons/24.png',
  show_level: hmUI.show_level.ONLY_NORMAL | hmUI.show_level.ONAL_AOD,
};
