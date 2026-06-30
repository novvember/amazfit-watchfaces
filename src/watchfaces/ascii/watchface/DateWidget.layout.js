import { DATA_TEXT_PROPS, FONT, FONT_SIZE, LINE_SPACE } from './index.r.layout';

export const DATE_TEXT_PROPS = {
  x: px(65),
  y: px(270),
  w: px(240),
  h: px(200),
  color: 0x00a2e0,
  text_size: FONT_SIZE,
  line_space: LINE_SPACE,
  align_h: hmUI.align.LEFT,
  align_v: hmUI.align.CENTER_V,
  font: FONT,
  text: '',
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const WEEKDAY_TEXT_PROPS = {
  ...DATA_TEXT_PROPS,
  y: px(288),
  color: 0xb2b900,
};
