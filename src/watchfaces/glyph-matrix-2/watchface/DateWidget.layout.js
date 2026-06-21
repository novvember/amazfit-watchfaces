import { SMALL_DIGITS } from './index.const';

export const DATE_GROUP_PROPS = {
  x: 0,
  y: 0,
  w: px(126),
  h: px(112),
};

export const DATE_DAY_PROPS = {
  day_startX: px(0),
  day_startY: px(0),
  day_align: hmUI.align.CENTER_H,
  day_zero: 1,
  day_space: px(0),
  day_en_array: SMALL_DIGITS,
  show_level: hmUI.show_level.ONLY_NORMAL,
};
