import {
  COLORS,
  FONT_SIZE,
  FONT_FAMILY,
  SCREEN,
  TIME_SIZE,
} from '../utils/constants';

export const TIME_TEXT_PROPS = {
  x: SCREEN.centerX - TIME_SIZE.width / 2,
  y: SCREEN.centerY - TIME_SIZE.height / 2,
  w: TIME_SIZE.width,
  h: TIME_SIZE.height,
  color: COLORS.text,
  text_size: FONT_SIZE.text,
  align_h: hmUI.align.CENTER_H,
  align_v: hmUI.align.CENTER_V,
  font: FONT_FAMILY.text,
  text: 'Сколько времени?',
  text_style: hmUI.text_style.WRAP,
  show_level: hmUI.show_level.ONLY_NORMAL,
};
