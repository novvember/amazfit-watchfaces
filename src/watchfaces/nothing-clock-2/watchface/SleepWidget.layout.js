import { COLOR_TEXT, FONT, FONT_SIZE } from './index.const';

const X = px(240);
const Y = px(349);

const LEVEL_IMAGES = new Array(9).fill(null).map((_, i) => `sleep/${i}.png`);

/** @satisfies {HmWidgetProps} */
export const SLEEP_GROUP_PROPS = {
  x: X,
  y: Y,
  w: px(300),
  h: px(60),
};

/** @satisfies {HmWidgetProps} */
export const SLEEP_VALUE_PROPS = {
  x: 0,
  y: 0,
  w: px(400),
  h: px(60),
  color: COLOR_TEXT,
  text_size: FONT_SIZE,
  align_h: hmUI.align.LEFT,
  align_v: hmUI.align.CENTER_V,
  font: FONT,
  text: '',
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const SLEEP_LEVEL_PROPS = {
  x: px(0),
  y: px(10),
  w: px(70),
  h: px(40),
  image_array: LEVEL_IMAGES,
  image_length: LEVEL_IMAGES.length,
  level: 0,
  show_level: hmUI.show_level.ONLY_NORMAL,
};
