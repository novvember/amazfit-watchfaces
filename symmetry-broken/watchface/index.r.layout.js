import { FONT, SCREEN } from '../utils/constants';

export const TIME_TEXT_PROPS = {
  x: 0,
  y: 0,
  w: SCREEN.width,
  h: SCREEN.height,
  color: 0xffffff,
  text_size: px(160),
  align_h: hmUI.align.CENTER_H,
  align_v: hmUI.align.CENTER_V,
  char_space: 0,
  font: FONT,
  text: '',
  show_level: hmUI.show_level.ONLY_NORMAL,
};
