import { FONTS, UVI_IMAGES } from '../utils/constants';
import { MINUTE_TEXT } from './timeSlide.r.layout';

const { width, height } = hmSetting.getDeviceInfo();

export const SCREEN = {
  width,
  height,
  centerX: width / 2,
  centerY: height / 2,
};
export const TOP_RECT_PROPS = {
  x: 0,
  y: 0,
  w: SCREEN.width,
  h: px(70),
  color: 0x000000,
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const BOTTOM_RECT_PROPS = {
  ...TOP_RECT_PROPS,
  y: SCREEN.height - px(70),
};

export const AOD_MINUTE_TEXT_PROPS = {
  x: MINUTE_TEXT.x,
  y: MINUTE_TEXT.y - px(35),
  w: MINUTE_TEXT.width,
  h: MINUTE_TEXT.height,
  color: 0xb1b1b1,
  text_size: px(150),
  align_h: hmUI.align.CENTER_H,
  align_v: hmUI.align.CENTER_V,
  font: FONTS.aod,
  text: '00',
  text_style: hmUI.text_style.ELLIPSIS,
  show_level: hmUI.show_level.ONAL_AOD,
};

export const AOD_MINUTE_NEXT_TEXT_PROPS = {
  ...AOD_MINUTE_TEXT_PROPS,
  color: 0x4b4b4b,
  y: MINUTE_TEXT.y + px(95),
};

export const AOD_HOUR_TEXT_PROPS = {
  ...AOD_MINUTE_TEXT_PROPS,
  x: px(40),
  y: MINUTE_TEXT.y,
};

export const TEMPERATURE_TEXT_PROPS = {
  x: px(150),
  y: px(410),
  w: px(120),
  h: px(30),
  align_h: hmUI.align.LEFT,
  align_v: hmUI.align.CENTER_V,
  text_size: px(26),
  color: 0xffffff,
  type: hmUI.data_type.WEATHER_CURRENT,
  unit_type: 1,
  font: FONTS.data,
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const UVI_IMAGE_LEVEL_PROPS = {
  x: px(150),
  y: px(440),
  image_array: UVI_IMAGES,
  image_length: UVI_IMAGES.length,
  w: px(120),
  h: px(30),
  type: hmUI.data_type.UVI,
  show_level: hmUI.show_level.ONLY_NORMAL,
};
