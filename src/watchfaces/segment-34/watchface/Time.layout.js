import { COLOR_ACCENT, COLOR_AOD, FONT_PRIMARY } from './index.layout';

const TIME_DIGIT_WIDTH = px(88);

const TIME_DIGITS = new Array(10).fill(null).map((_, i) => `time/${i}.png`);
const TIME_AOD_DIGITS = new Array(10)
  .fill(null)
  .map((_, i) => `time_aod/${i}.png`);

const TIME_X0 = px(20);
const TIME_Y0 = px(145);

export const TIME_PROPS = {
  hour_zero: 1,
  hour_startX: TIME_X0,
  hour_startY: TIME_Y0,
  hour_array: TIME_DIGITS,
  hour_space: 0,
  hour_align: hmUI.align.LEFT,

  hour_unit_sc: 'time/colon.png',
  hour_unit_tc: 'time/colon.png',
  hour_unit_en: 'time/colon.png',

  minute_zero: 1,
  minute_startX: TIME_X0 + 3 * TIME_DIGIT_WIDTH,
  minute_startY: TIME_Y0,
  minute_array: TIME_DIGITS,
  minute_space: 0,
  minute_align: hmUI.align.LEFT,

  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const TIME_AOD_PROPS = {
  ...TIME_PROPS,
  hour_array: TIME_AOD_DIGITS,
  minute_array: TIME_AOD_DIGITS,
  hour_unit_sc: 'time_aod/colon.png',
  hour_unit_tc: 'time_aod/colon.png',
  hour_unit_en: 'time_aod/colon.png',
  show_level: hmUI.show_level.ONAL_AOD,
};

export const TIME_GRADIENT_PROPS = {
  x: TIME_X0,
  y: TIME_Y0,
  src: 'time/gradient.png',
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const TIME_AOD_GRADIENT_PROPS = {
  ...TIME_GRADIENT_PROPS,
  src: 'time_aod/gradient.png',
  show_level: hmUI.show_level.ONAL_AOD,
};

export const DATE_TEXT_PROPS = {
  x: px(27),
  y: px(313),
  w: px(330),
  h: px(30),
  align_h: hmUI.align.LEFT,
  align_v: hmUI.align.CENTER_V,
  text_size: px(30),
  color: COLOR_ACCENT,
  font: FONT_PRIMARY,
  text: '',
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const DATE_AOD_TEXT_PROPS = {
  ...DATE_TEXT_PROPS,
  color: COLOR_AOD,
  show_level: hmUI.show_level.ONAL_AOD,
};

export const SECOND_TEXT_PROPS = {
  ...DATE_TEXT_PROPS,
  x: px(372),
  w: px(80),
  align_h: hmUI.align.RIGHT,
  type: hmUI.data_type.SECOND,
  padding: true,
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const SECOND_DECORATIVE_TEXT_PROPS = {
  ...DATE_TEXT_PROPS,
  align_h: hmUI.align.RIGHT,
  x: px(369),
  w: px(30),
  text: '→',
  show_level: hmUI.show_level.ONLY_NORMAL,
};
