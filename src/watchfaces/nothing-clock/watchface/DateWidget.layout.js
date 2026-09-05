import { FONT, FONT_SIZE, TEXT_COLOR } from './index.const';

export const WEEKDAY_TEXT_PROPS = {
  x: px(257),
  y: px(220),
  w: px(100),
  h: px(40),
  color: TEXT_COLOR,
  text_size: FONT_SIZE,
  align_h: hmUI.align.RIGHT,
  align_v: hmUI.align.CENTER_V,
  font: FONT,
  text: '',
  show_level: hmUI.show_level.ONLY_NORMAL,
}

export const DATE_RECT_PROPS = {
  x: px(365),
  y: px(217),
  w: px(70),
  h: px(44),
  color: 0x000000,
  line_width: px(2),
  radius: px(22),
  show_level: hmUI.show_level.ONLY_NORMAL,
}

export const DATE_TEXT_PROPS = {
  x: px(367),
  y: px(220),
  w: px(66),
  h: px(40),
  color: TEXT_COLOR,
  text_size: FONT_SIZE,
  align_h: hmUI.align.CENTER_H,
  align_v: hmUI.align.CENTER_V,
  font: FONT,
  type: hmUI.data_type.DAY,
  padding: true,
  show_level: hmUI.show_level.ONLY_NORMAL,
}
