import { FONT, SCREEN } from '../utils/constants';

export const POINTER_PROPS = {
  hour_centerX: SCREEN.centerX,
  hour_centerY: SCREEN.centerY,
  hour_posX: SCREEN.centerX,
  hour_posY: SCREEN.centerY,
  hour_path: 'time/hour.png',

  minute_centerX: SCREEN.centerX,
  minute_centerY: SCREEN.centerY,
  minute_posX: SCREEN.centerX,
  minute_posY: SCREEN.centerY,
  minute_path: 'time/minute.png',

  second_centerX: SCREEN.centerX,
  second_centerY: SCREEN.centerY,
  second_posX: SCREEN.centerX,
  second_posY: SCREEN.centerY,
  second_path: 'time/second.png',

  second_cover_path: 'time/cover.png',
  second_cover_x: SCREEN.centerX - px(22 / 2),
  second_cover_y: SCREEN.centerY - px(22 / 2),

  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const TEXT_PROPS = {
  x: SCREEN.centerX - px(280 / 2),
  y: px(108),
  w: px(280),
  h: px(36),
  color: 0xffffff,
  text_size: px(22),
  char_space: px(4),
  align_h: hmUI.align.CENTER_H,
  align_v: hmUI.align.CENTER_V,
  font: FONT,
  text: '',
  show_level: hmUI.show_level.ONLY_NORMAL,
};
