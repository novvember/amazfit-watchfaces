import { getHasCustomFontSupport } from '../utils/getHasCustomFontSupport';

const hasCustomFontSupport = getHasCustomFontSupport();

const COLOR_PRIMARY = 0xffffff;

const FONT_PRIMARY = hasCustomFontSupport
  ? 'fonts/FiraSans-Medium.ttf'
  : undefined;

export const TIME_DIGITS = new Array(10)
  .fill(null)
  .map((_, i) => `time/${i}.png`);

export const TIME_AOD_DIGITS = new Array(10)
  .fill(null)
  .map((_, i) => `time_aod/${i}.png`);

const TIME_DIGIT_WIDTH = px(200);
const TIME_DIGIT_HEIGHT = px(230);

const TIME_LINE_HEIGHT_GAP = px(-52);
const TIME_CHAR_WIDTH_GAP = px(-60);

const TIME_X = px(480 / 2) - TIME_DIGIT_WIDTH - TIME_CHAR_WIDTH_GAP / 2;
const TIME_Y = [
  px(480 / 2) - 1.5 * TIME_DIGIT_HEIGHT - TIME_LINE_HEIGHT_GAP,
  px(480 / 2) - 0.5 * TIME_DIGIT_HEIGHT,
  px(480 / 2) + 0.5 * TIME_DIGIT_HEIGHT + TIME_LINE_HEIGHT_GAP,
];

export const TIME_IMG_PROPS = {
  hour_zero: 1,
  hour_startX: TIME_X,
  hour_startY: TIME_Y[0],
  hour_array: TIME_DIGITS,
  hour_space: TIME_CHAR_WIDTH_GAP,
  hour_align: hmUI.align.LEFT,

  minute_zero: 1,
  minute_startX: TIME_X,
  minute_startY: TIME_Y[1],
  minute_array: TIME_DIGITS,
  minute_space: TIME_CHAR_WIDTH_GAP,
  minute_align: hmUI.align.LEFT,

  second_zero: 1,
  second_startX: TIME_X,
  second_startY: TIME_Y[2],
  second_array: TIME_DIGITS,
  second_space: TIME_CHAR_WIDTH_GAP,
  second_align: hmUI.align.LEFT,

  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const TIME_AOD_IMG_PROPS = {
  hour_zero: 1,
  hour_startX: TIME_X,
  hour_startY: TIME_Y[0],
  hour_array: TIME_AOD_DIGITS,
  hour_space: TIME_CHAR_WIDTH_GAP,
  hour_align: hmUI.align.LEFT,

  minute_zero: 1,
  minute_startX: TIME_X,
  minute_startY: TIME_Y[1],
  minute_array: TIME_AOD_DIGITS,
  minute_space: TIME_CHAR_WIDTH_GAP,
  minute_align: hmUI.align.LEFT,

  show_level: hmUI.show_level.ONAL_AOD,
};

export const SECOND_FAKE_AOD_PROPS = {
  x: TIME_X,
  y: TIME_Y[2],
  font_array: TIME_AOD_DIGITS,
  h_space: TIME_CHAR_WIDTH_GAP,
  align_h: hmUI.align.LEFT,
  text: '00',
  show_level: hmUI.show_level.ONAL_AOD,
};

const DATA_TEXT_PROPS = {
  x: 0,
  y: px(330),
  w: px(180),
  h: px(40),
  color: COLOR_PRIMARY,
  text_size: px(32),
  align_h: hmUI.align.CENTER_H,
  align_v: hmUI.align.CENTER_V,
  font: FONT_PRIMARY,
  text: '',
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const LEFT_TEXT_PROPS = {
  ...DATA_TEXT_PROPS,
  x: px(0),
};

export const CENTER_TEXT_PROPS = {
  ...DATA_TEXT_PROPS,
  x: px(150),
};

export const RIGHT_TEXT_PROPS = {
  ...DATA_TEXT_PROPS,
  x: px(300),
};
