import { DIGITS_DATA } from './index.const';

const WEEKDAYS = new Array(7).fill(0).map((_, i) => `weekdays/${i + 1}.png`);

export const DATE_WEEKDAY_PROPS = {
  x: px(114),
  y: px(152),
  week_en: WEEKDAYS,
  show_level: hmUI.show_level.ONLY_NORMAL | hmUI.show_level.ONAL_AOD,
};

export const DATE_SEPARATOR_PROPS = {
  x: px(300),
  y: px(152),
  src: 'digits-data/-.png',
  show_level: hmUI.show_level.ONLY_NORMAL | hmUI.show_level.ONAL_AOD,
};

export const DATE_DAY_PROPS = {
  day_startX: px(226),
  day_startY: px(152),
  day_align: hmUI.align.RIGHT,
  day_space: px(10),
  day_zero: 0,
  day_en_array: DIGITS_DATA,
  show_level: hmUI.show_level.ONLY_NORMAL | hmUI.show_level.ONAL_AOD,
};

export const DATE_MONTH_PROPS = {
  month_startX: px(328),
  month_startY: px(152),
  month_en_array: DIGITS_DATA,
  month_align: hmUI.align.RIGHT,
  month_space: px(10),
  month_zero: 0,
  show_level: hmUI.show_level.ONLY_NORMAL | hmUI.show_level.ONAL_AOD,
};
