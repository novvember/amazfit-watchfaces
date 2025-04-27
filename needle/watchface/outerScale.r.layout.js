import hmUI from '@zos/ui';
import { px } from '@zos/utils';
import { COLORS, FONT } from '../utils/constants';

const centerX = px(480 / 2);
const centerY = px(480 / 2);

export const OUTER_BACKGROUND_IMAGE_PROPS = {
  x: 0,
  y: 0,
  w: px(480),
  h: px(480),
  src: 'outer/background.png',
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const OUTER_TICKS_IMAGE_PROPS = {
  x: 0,
  y: 0,
  w: px(480),
  h: px(480),
  src: 'outer/ticks.png',
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const OUTER_PROGRESS_ARC_PROPS = {
  center_x: centerX,
  center_y: centerY,
  radius: px(208),
  start_angle: 144,
  end_angle: -144,
  color: 0x000000,
  line_width: px(30),
  level: 100,
  corner_flag: 3,
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const OUTER_TICKS_PARAMS = [
  {
    x: px(444),
    y: px(205),
    value: 80,
  },
  {
    x: px(326),
    y: px(26),
    value: 60,
  },
  {
    x: px(120),
    y: px(26),
    value: 40,
  },
  {
    x: px(0),
    y: px(205),
    value: 20,
  },
];

export const OUTER_TICK_GROUP_PROPS = {
  x: 0,
  y: 0,
  w: px(36),
  h: px(36),
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const OUTER_TICK_TEXT_PROPS = {
  x: 0,
  y: 0,
  w: px(36),
  h: px(36),
  color: COLORS.accent,
  text_size: px(28),
  align_h: hmUI.align.CENTER_H,
  align_v: hmUI.align.CENTER_V,
  font: FONT,
  text: '00',
  char_space: 0,
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const OUTER_TICK_BACKGROUND_CIRCLE_PROPS = {
  center_x: px(18),
  center_y: px(18),
  radius: px(18),
  color: 0x000000,
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const ACTIVITY_ICON_IMAGE_PROPS = {
  x: px(107),
  y: px(406),
  w: px(48),
  h: px(48),
  src: 'activity/icon.png',
  show_level: hmUI.show_level.ONLY_NORMAL,
};
