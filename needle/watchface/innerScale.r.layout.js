import hmUI from '@zos/ui';
import { px } from '@zos/utils';
import { COLORS } from '../utils/constants';

const centerX = px(480 / 2);
const centerY = px(480 / 2);

export const INNER_PROGRESS_ARC_PROPS = {
  center_x: centerX,
  center_y: centerY,
  radius: px(354 / 2),
  start_angle: -144,
  end_angle: 144,
  color: COLORS.accent,
  line_width: px(18),
  level: 100,
  corner_flag: 3,
  show_level: hmUI.show_level.ONLY_NORMAL,
};
