import { createDataTextProps } from '../utils/createDataTextProps';
import { COLORS, DATA_ARC_WIDTH, DATA_RADIUS } from './index.const';

export const STEPS_TEXT_PROPS = createDataTextProps(-26, 20);

export const STEPS_BACKGROUND_ARC_PROPS = {
  center_x: px(240),
  center_y: px(240),
  radius: DATA_RADIUS,
  start_angle: 290,
  end_angle: 325,
  color: COLORS.tertiary,
  line_width: DATA_ARC_WIDTH,
  level: 100,
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const STEPS_CURRENT_ARC_PROPS = {
  ...STEPS_BACKGROUND_ARC_PROPS,
  color: COLORS.primary,
};
