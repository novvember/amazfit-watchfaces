import { FONT, FONT_SIZE, LINE_SPACE } from './index.r.layout';

export const TIME_TEXT_PROPS = {
  x: 0,
  y: px(120),
  w: px(480),
  h: px(240),
  color: 0xbfecfc,
  text_size: FONT_SIZE,
  line_space: LINE_SPACE,
  align_h: hmUI.align.CENTER_H,
  align_v: hmUI.align.CENTER_V,
  font: FONT,
  text: '',
  show_level: hmUI.show_level.ONLY_NORMAL | hmUI.show_level.ONAL_AOD,
};
