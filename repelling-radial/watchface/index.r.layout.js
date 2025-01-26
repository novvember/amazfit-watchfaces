import { SCREEN } from '../utils/constants';

export const BACKGROUND_IMAGE_PROPS = {
  x: 0,
  y: 0,
  src: 'background.png',
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const HOUR_ARC_PROPS = {
  center_x: SCREEN.centerX,
  center_y: SCREEN.centerY,
  radius: px(115),
  start_angle: 0,
  color: 0x000000,
  line_width: px(50),
  level: 100,
  corner_flag: 3,
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const MINUTE_ARC_PROPS = {
  ...HOUR_ARC_PROPS,
  radius: px(165),
};

export const SECOND_ARC_PROPS = {
  ...HOUR_ARC_PROPS,
  radius: px(215),
};

export const GRID_IMAGE_PROPS = {
  x: 0,
  y: 0,
  src: 'grid.png',
  show_level: hmUI.show_level.ONLY_NORMAL,
};
