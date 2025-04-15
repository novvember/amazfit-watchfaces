import { COLORS, FONT, SCREEN } from '../utils/constants';

export const BACKGROUND_IMAGE_PROPS = {
  x: 0,
  y: 0,
  src: 'background.png',
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const OUTER_IMAGE_PROPS = {
  x: 0,
  y: 0,
  src: 'time/outer.png',
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const INNER_IMAGE_PROPS = {
  x: 0,
  y: 0,
  w: SCREEN.width,
  h: SCREEN.height,
  center_x: SCREEN.centerX,
  center_y: SCREEN.centerY,
  src: 'time/inner.png',
  angle: 0,
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const SUN_ARC_PROPS = {
  center_x: SCREEN.centerX,
  center_y: SCREEN.centerY,
  radius: SCREEN.width / 4,
  start_angle: 0,
  end_angle: 360,
  color: COLORS.sun,
  line_width: SCREEN.width / 2,
  level: 100,
  corner_flag: 3,
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const SLEEP_ARC_PROPS = {
  center_x: SCREEN.centerX,
  center_y: SCREEN.centerY,
  radius: (px(410) - px(10)) / 2,
  start_angle: 0,
  end_angle: 0,
  color: COLORS.sleep,
  line_width: px(10),
  level: 100,
  corner_flag: 3,
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const HOUR_TEXT_PROPS = {
  x: px(180),
  y: px(446),
  w: px(50),
  h: px(30),
  color: COLORS.time,
  text_size: px(26),
  align_h: hmUI.align.RIGHT,
  align_v: hmUI.align.CENTER_V,
  font: FONT,
  text: '00',
  char_space: px(5),
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const MINUTE_TEXT_PROPS = {
  ...HOUR_TEXT_PROPS,
  x: px(250),
  align_h: hmUI.align.LEFT,
};

export const OUTER_TEXT_PROPS = {
  x: -1 * px(6),
  y: -1 * px(6),
  w: SCREEN.width + px(12),
  h: SCREEN.height + px(12),
  text_size: px(26),
  color: 0xffffff,
  text: '',
  align_h: hmUI.align.CENTER_H,
  align_v: hmUI.align.TOP,
  char_space: px(5),
  line_space: 0,
  start_angle: -135,
  end_angle: -45,
  font: FONT,
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const INNER_TEXT_PROPS = {
  x: (px(480) - px(260)) / 2,
  y: (px(480) - px(260)) / 2,
  w: px(260),
  h: px(260),
  text_size: px(18),
  color: COLORS.time,
  text: '',
  align_h: hmUI.align.CENTER_H,
  align_v: hmUI.align.TOP,
  char_space: px(3),
  line_space: 0,
  start_angle: 0,
  end_angle: 0,
  font: FONT,
  show_level: hmUI.show_level.ONLY_NORMAL,
};
