import { COLORS } from '../index.const';

export const SCALE_ARC_PROPS = {
  center_x: px(240),
  center_y: px(240),
  radius: px(240) - px(30) / 2,
  start_angle: 0,
  end_angle: 0,
  color: COLORS.accentSecondary,
  line_width: px(30),
  level: 100,
  corner_flag: 3,
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const SCALE_TICK_IMAGE_PROPS = {
  x: 0,
  y: 0,
  w: px(480),
  h: px(480),
  pos_x: px(240) - px(12) / 2,
  pos_y: px(6),
  center_x: px(240),
  center_y: px(240),
  angle: 0,
  src: 'scale/tick_major.png',
  show_level: hmUI.show_level.ONLY_NORMAL,
};
