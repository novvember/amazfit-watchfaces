import { COLOR_ACCENT_SECONDARY, FONT_SECONDARY } from './index.layout';

export const SECONDARY_DIGIT_WIDTH = px(25);

const SECONDARY_DIGITS = new Array(10)
  .fill(null)
  .map((_, i) => `digits/${i}.png`);

export const SECONDARY_TITLE_PROPS = {
  x: 0,
  y: 0,
  w: px(100),
  h: px(20),
  align_h: hmUI.align.LEFT,
  align_v: hmUI.align.CENTER_V,
  text_size: px(15),
  color: COLOR_ACCENT_SECONDARY,
  font: FONT_SECONDARY,
  text: '',
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const SECONDARY_DIGIT_EMPTY_PROPS = {
  x: 0,
  y: 0,
  src: 'digits/empty.png',
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const SECONDARY_IMAGE_TEXT_PROPS = {
  x: 0,
  y: 0,
  type: undefined,
  font_array: SECONDARY_DIGITS,
  negative_image: 'digits/colon.png',
  align_h: hmUI.align.LEFT,
  show_level: hmUI.show_level.ONLY_NORMAL,
};
