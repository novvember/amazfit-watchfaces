import { FONT, FONT_SIZE, LINE_SPACE } from './index.r.layout';

export const SUN_CHARS_COUNT = 21;

export const SUN_TEXT_PROPS = {
  x: 0,
  y: px(62),
  w: px(480),
  h: px(200),
  color: 0x8c8c8b,
  text_size: FONT_SIZE,
  line_space: LINE_SPACE,
  align_h: hmUI.align.CENTER_H,
  align_v: hmUI.align.TOP,
  font: FONT,
  text: '',
  show_level: hmUI.show_level.ONLY_NORMAL,
};
