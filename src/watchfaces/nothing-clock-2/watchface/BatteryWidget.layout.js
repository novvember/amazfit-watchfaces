import { COLOR_TEXT, FONT, FONT_SIZE } from './index.const';

const X = px(55);
const Y = px(349);

const LEVEL_IMAGES = new Array(19).fill(null).map((_, i) => `battery/${i}.png`);

/** @satisfies {HmWidgetProps} */
export const BATTERY_GROUP_PROPS = {
  x: X,
  y: Y,
  w: px(300),
  h: px(60),
};

export const BATTERY_LEVEL_PROPS = {
  x: px(0),
  y: px(11),
  w: px(80),
  h: px(40),
  image_array: LEVEL_IMAGES,
  image_length: LEVEL_IMAGES.length,
  type: hmUI.data_type.BATTERY,
  show_level: hmUI.show_level.ONLY_NORMAL,
};

/** @satisfies {HmWidgetProps} */
export const BATTERY_VALUE_PROPS = {
  x: px(86),
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
