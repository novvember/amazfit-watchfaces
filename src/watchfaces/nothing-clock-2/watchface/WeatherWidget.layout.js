import {
  COLOR_ACCENT,
  COLOR_TEXT,
  FONT,
  FONT_SIZE,
  FONT_SIZE_LARGE,
} from './index.const';

const X = px(55);
const Y = px(122);

const LEVEL_IMAGES = new Array(14)
  .fill(null)
  .map((_, i) => `level/${i + 1}.png`);

/** @satisfies {HmWidgetProps} */
export const WEATHER_GROUP_PROPS = {
  x: X,
  y: Y,
  w: px(300),
  h: px(60),
};

export const WEATHER_LEVEL_BACKGROUND_PROPS = {
  x: px(0),
  y: px(10),
  w: px(36),
  h: px(40),
  src: 'level/0.png',
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const WEATHER_LEVEL_PROPS = {
  x: px(0),
  y: px(10),
  w: px(36),
  h: px(40),
  image_array: LEVEL_IMAGES,
  image_length: LEVEL_IMAGES.length,
  type: hmUI.data_type.WEATHER_CURRENT,
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const WEATHER_VALUE_PROPS = {
  x: px(40),
  y: px(0),
  w: px(100),
  h: px(60),
  align_h: hmUI.align.LEFT,
  align_v: hmUI.align.CENTER_V,
  text_size: FONT_SIZE_LARGE,
  color: COLOR_TEXT,
  text: '',
  font: FONT,
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const WEATHER_DEGREE_PROPS = {
  x: px(132),
  y: px(0),
  w: px(80),
  h: px(60),
  align_h: hmUI.align.LEFT,
  align_v: hmUI.align.CENTER_V,
  text_size: FONT_SIZE,
  color: COLOR_TEXT,
  font: FONT,
  text: 'C',
  show_level: hmUI.show_level.ONLY_NORMAL,
};

/** @satisfies {HmWidgetProps} */
export const WEATHER_DEGREE_RECT_PROPS = {
  x: WEATHER_DEGREE_PROPS.x - px(7),
  y: px(10),
  w: px(40),
  h: px(40),
  color: COLOR_ACCENT,
  radius: px(20),
  line_width: px(1),
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const WEATHER_CONDITION_PROPS = {
  x: px(14),
  y: px(0),
  w: px(200),
  h: px(60),
  align_h: hmUI.align.LEFT,
  align_v: hmUI.align.CENTER_V,
  text_size: FONT_SIZE,
  color: 0x000000,
  font: FONT,
  text: '123456789',
  show_level: hmUI.show_level.ONLY_NORMAL,
};

/** @satisfies {HmWidgetProps} */
export const WEATHER_CONDITION_RECT_PROPS = {
  x: 0,
  y: px(9),
  w: px(68),
  h: px(40),
  color: COLOR_ACCENT,
  radius: px(22),
  show_level: hmUI.show_level.ONLY_NORMAL,
};

/** @satisfies {HmWidgetProps} */
export const WEATHER_CONDITION_RECT_TAIL_PROPS = {
  x: px(-1),
  y: px(9),
  w: px(40),
  h: px(40),
  src: 'weather/tail.png',
  show_level: hmUI.show_level.ONLY_NORMAL,
};
