import { FONT, FONT_SIZE, TEXT_COLOR } from './index.const';

export const STEPS_TEXT_PROPS = {
  x: px(224),
  y: px(287),
  w: px(200),
  h: px(40),
  color: TEXT_COLOR,
  text_size: FONT_SIZE,
  align_h: hmUI.align.LEFT,
  align_v: hmUI.align.CENTER_V,
  font: FONT,
  text: '',
  show_level: hmUI.show_level.ONLY_NORMAL,
}

export const STEPS_ICON_PROPS = {
  x: STEPS_TEXT_PROPS.x + px(10),
  y: STEPS_TEXT_PROPS.y + px(3),
  w: px(30),
  h: px(30),
  src: 'steps/icon.png',
  show_level: hmUI.show_level.ONLY_NORMAL,
}
