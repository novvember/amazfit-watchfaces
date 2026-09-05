import { FONT, FONT_SIZE, TEXT_COLOR, LEVEL_IMAGES } from './index.const';

export const BATTERY_IMAGE_LEVEL_PROPS = {
  x: px(223),
  y: px(377),
  w: px(36),
  h: px(40),
  image_array: LEVEL_IMAGES,
  image_length: LEVEL_IMAGES.length,
  type: hmUI.data_type.BATTERY,
  show_level: hmUI.show_level.ONLY_NORMAL,
}

export const BATTERY_TEXT_PROPS = {
  x: px(263),
  y: px(377),
  w: px(200),
  h: px(40),
  color: TEXT_COLOR,
  text_size: FONT_SIZE,
  align_h: hmUI.align.LEFT,
  align_v: hmUI.align.CENTER_V,
  font: FONT,
  type: hmUI.data_type.BATTERY,
  unit_type: 1,
  padding: false,
  show_level: hmUI.show_level.ONLY_NORMAL,
}
