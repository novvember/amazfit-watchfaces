import { createDataTextProps } from '../utils/createDataTextProps';
import { COLORS, DATA_ARC_WIDTH, DATA_RADIUS } from './index.const';

export const BATTERY_TEXT_PROPS = createDataTextProps(90, 133, true);

export const BATTERY_BACKGROUND_ARC_PROPS = {
  center_x: px(240),
  center_y: px(240),
  radius: DATA_RADIUS,
  start_angle: 135,
  end_angle: 170,
  color: COLORS.tertiary,
  line_width: DATA_ARC_WIDTH,
  level: 100,
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const BATTERY_CURRENT_ARC_PROPS = {
  ...BATTERY_BACKGROUND_ARC_PROPS,
  color: COLORS.primary,
};
