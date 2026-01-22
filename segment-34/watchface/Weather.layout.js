import { COLOR_PRIMARY, FONT_PRIMARY } from './index.layout';

export const WEATHER_TEMP_TEXT_PROPS = {
  x: px(115),
  y: px(68),
  w: px(80),
  h: px(30),
  align_h: hmUI.align.RIGHT,
  align_v: hmUI.align.CENTER_V,
  text_size: px(30),
  color: COLOR_PRIMARY,
  font: FONT_PRIMARY,
  type: hmUI.data_type.WEATHER_CURRENT,
  unit_type: 1,
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const WEATHER_WIND_IMAGE_PROPS = {
  x: px(210),
  y: px(68),
  image_array: new Array(8).fill(null).map((_, i) => `wind/${i}.png`),
  image_length: 8,
  w: px(20),
  h: px(30),
  type: hmUI.data_type.WIND_DIRECTION,
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const WEATHER_WIND_TEXT_PROPS = {
  ...WEATHER_TEMP_TEXT_PROPS,
  x: px(231),
  align_h: hmUI.align.LEFT,
  type: hmUI.data_type.WIND,
  unit_type: 0,
};

export const WEATHER_HUMIDUTY_TEXT_PROPS = {
  ...WEATHER_TEMP_TEXT_PROPS,
  x: px(280),
  align_h: hmUI.align.LEFT,
  type: hmUI.data_type.HUMIDITY,
  unit_type: 1,
};

export const WEATHER_TEXT_PROPS = {
  x: px(30),
  y: px(104),
  w: px(420),
  h: px(30),
  align_h: hmUI.align.CENTER_H,
  align_v: hmUI.align.CENTER_V,
  text_size: px(30),
  color: COLOR_PRIMARY,
  font: FONT_PRIMARY,
  text: '',
  show_level: hmUI.show_level.ONLY_NORMAL,
};
