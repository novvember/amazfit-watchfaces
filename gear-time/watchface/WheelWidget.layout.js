import { getHasCustomFontSupport } from '../utils/getHasCustomFontSupport';

const hasCustomFontSupport = getHasCustomFontSupport();

export const WHEEL_SIZE = px(340);

const FONT_CAPTION = hasCustomFontSupport ? 'fonts/Rubik-Light.ttf' : undefined;
const FONT_VALUE = hasCustomFontSupport ? 'fonts/Rubik-Regular.ttf' : undefined;

const COLOR_CAPTION = 0x848484;
const COLOR_VALUE = 0xffffff;
const COLOR_ACCENT = 0xf67615;

export const WHEEL_IMAGE_PROPS = {
  x: (-1 * WHEEL_SIZE) / 2,
  y: (-1 * WHEEL_SIZE) / 2,
  w: WHEEL_SIZE,
  h: WHEEL_SIZE,
  center_x: WHEEL_SIZE / 2,
  center_y: WHEEL_SIZE / 2,
  src: 'wheel/wheel.png',
  angle: 0,
  show_level: hmUI.show_level.ONLY_NORMAL | hmUI.show_level.ONAL_AOD,
};

export const WHEEL_CAPTION_RADIUS = px(270 / 2);

export const WHEEL_CAPTION_TEXT_PROPS = {
  x: 0,
  y: 0,
  w: px(50),
  h: px(40),
  color: COLOR_CAPTION,
  text_size: px(28),
  align_h: hmUI.align.CENTER_H,
  align_v: hmUI.align.CENTER_V,
  font: FONT_CAPTION,
  text: '',
  show_level: hmUI.show_level.ONLY_NORMAL | hmUI.show_level.ONAL_AOD,
};

export const WHEEL_CAPTION_ACCENT_TEXT_PROPS = {
  ...WHEEL_CAPTION_TEXT_PROPS,
  color: COLOR_ACCENT,
};

const WHEEL_VALUE_TEXT_WIDTH = px(96);
const WHEEL_VALUE_TEXT_HEIGHT = px(60);

const WHEEL_VALUE_TEXT_PROPS = {
  x: 0,
  y: (-1 * WHEEL_VALUE_TEXT_HEIGHT) / 2,
  w: WHEEL_VALUE_TEXT_WIDTH,
  h: WHEEL_VALUE_TEXT_HEIGHT,
  color: COLOR_VALUE,
  text_size: px(52),
  align_h: hmUI.align.CENTER_H,
  align_v: hmUI.align.CENTER_V,
  font: FONT_VALUE,
  text: '',
  show_level: hmUI.show_level.ONLY_NORMAL | hmUI.show_level.ONAL_AOD,
};

export const WHEEL_VALUE_LEFT_TEXT_PROPS = {
  ...WHEEL_VALUE_TEXT_PROPS,
  x: px(2) - WHEEL_SIZE / 2,
};

export const WHEEL_VALUE_RIGHT_TEXT_PROPS = {
  ...WHEEL_VALUE_TEXT_PROPS,
  x: WHEEL_SIZE / 2 - px(2) - WHEEL_VALUE_TEXT_WIDTH,
};
