import { COLOR_PRIMARY, FONT } from './index.const';

const HOUR_FONT_SIZE = px(110);
const MINUTE_FONT_SIZE = px(64);

const FONT_OFFSET_Y = 0.1;

const MINUTE_SIZE = px(90);

export const HOUR_TEXT_PROPS = {
  x: px(150),
  y: px(165) + HOUR_FONT_SIZE * FONT_OFFSET_Y,
  w: px(180),
  h: px(150),
  color: COLOR_PRIMARY,
  text_size: HOUR_FONT_SIZE,
  align_h: hmUI.align.CENTER_H,
  align_v: hmUI.align.CENTER_V,
  font: FONT,
  text: '',
  padding: false,
  show_level: hmUI.show_level.ONLY_NORMAL | hmUI.show_level.ONAL_AOD,
};

export const MINUTE_TEXT_PROPS = {
  x: 0,
  y: 0 + MINUTE_FONT_SIZE * FONT_OFFSET_Y,
  w: MINUTE_SIZE,
  h: MINUTE_SIZE,
  color: COLOR_PRIMARY,
  text_size: MINUTE_FONT_SIZE,
  align_h: hmUI.align.CENTER_H,
  align_v: hmUI.align.CENTER_V,
  font: FONT,
  text: '',
  show_level: hmUI.show_level.ONLY_NORMAL | hmUI.show_level.ONAL_AOD,
};

export const MINUTE_BACKGROUND_CIRCLE_PROPS = {
  center_x: MINUTE_SIZE / 2,
  center_y: MINUTE_SIZE / 2,
  radius: MINUTE_SIZE / 2,
  color: 0x000000,
  show_level: hmUI.show_level.ONLY_NORMAL | hmUI.show_level.ONAL_AOD,
};

export const MINUTE_GROUP_PROPS = {
  x: 0,
  y: 0,
  w: MINUTE_SIZE,
  h: MINUTE_SIZE,
};

export const TIME_BACKGROUND_PROPS = {
  x: 0,
  y: 0,
  src: 'time/background.png',
  show_level: hmUI.show_level.ONLY_NORMAL | hmUI.show_level.ONAL_AOD,
};
