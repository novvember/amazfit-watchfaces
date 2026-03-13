import { TIME_DIGITS_AOD } from './calendarGrid.constants';

export const DOT_IMAGE_PROPS = {
  x: 0,
  y: 0,
  src: `dot/dot.png`,
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const YEAR_IMAGE_PROPS = {
  x: 0,
  y: 0,
  src: '',
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const MONTH_IMAGE_PROPS = {
  x: 0,
  y: 0,
  src: '',
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const WEEKDAY_IMAGE_PROPS = {
  x: 0,
  y: 0,
  src: '',
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const CELL_IMAGE_PROPS = {
  x: 0,
  y: 0,
  src: '',
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const AOD_BACKGROUND_PROPS = {
  x: px(114),
  y: px(58),
  src: 'aod/background.png',
  show_level: hmUI.show_level.ONAL_AOD,
};

export const AOD_HOURS_PROPS = {
  hour_zero: 1,
  hour_startX: px(128),
  hour_startY: px(72),
  hour_array: TIME_DIGITS_AOD.images,
  hour_align: hmUI.align.LEFT,
  show_level: hmUI.show_level.ONAL_AOD,
};

export const AOD_MINUTES_PROPS = {
  minute_zero: 1,
  minute_startX: px(128),
  minute_startY: px(240),
  minute_array: TIME_DIGITS_AOD.images,
  minute_align: hmUI.align.LEFT,
  show_level: hmUI.show_level.ONAL_AOD,
};

export const AOD_DATE_IMAGE_PROPS = {
  x: 0,
  y: 0,
  src: 'cell_aod/0.png',
  show_level: hmUI.show_level.ONAL_AOD,
};
