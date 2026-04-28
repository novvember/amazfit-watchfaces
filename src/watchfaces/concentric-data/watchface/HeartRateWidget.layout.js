import { createDataTextProps } from '../utils/createDataTextProps';
import { COLORS, DATA_ARC_WIDTH, DATA_RADIUS } from './index.const';

export const HEART_TEXT_PROPS = createDataTextProps(180, 204, true);

export const HEART_BACKGROUND_ARC_PROPS = {
  center_x: px(240),
  center_y: px(240),
  radius: DATA_RADIUS,
  start_angle: 215,
  end_angle: 250,
  color: COLORS.tertiary,
  line_width: DATA_ARC_WIDTH,
  level: 100,
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const HEART_CURRENT_ARC_PROPS = {
  ...HEART_BACKGROUND_ARC_PROPS,
  color: COLORS.primary,
};

export const HEART_DOT_PROPS = {
  x: 0,
  y: 0,
  w: px(22),
  h: px(22),
  src: 'data/dot.png',
  show_level: hmUI.show_level.ONLY_NORMAL,
};
