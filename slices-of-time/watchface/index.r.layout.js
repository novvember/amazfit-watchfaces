import ui from '@zos/ui';
import { px } from '@zos/utils';
import { COLORS, DOT_GRID_PARAMS } from '../utils/constants';

const SEPARATOR_CIRCE_PROPS = {
  center_x: 0,
  center_y: px(480 / 2),
  radius: px(8),
  color: COLORS.activeDot,
  show_level: ui.show_level.ONLY_NORMAL,
};

export const LEFT_SEPARATOR_CIRCE_PROPS = {
  ...SEPARATOR_CIRCE_PROPS,
  center_x: px(78),
};

export const RIGHT_SEPARATOR_CIRCE_PROPS = {
  ...SEPARATOR_CIRCE_PROPS,
  center_x: px(480 - 78),
};

export const DOT_CIRCLE_PROPS = {
  center_x: 0,
  center_y: 0,
  radius: DOT_GRID_PARAMS.r,
  color: COLORS.emptyDot,
  show_level: ui.show_level.ONLY_NORMAL,
};

export const AOD_DOT_STROKE_TECT_PROPS = {
  x: 0,
  y: 0,
  w: DOT_GRID_PARAMS.rAod * 2,
  h: DOT_GRID_PARAMS.rAod * 2,
  radius: DOT_GRID_PARAMS.rAod,
  line_width: px(1),
  color: COLORS.aod,
  show_level: ui.show_level.ONAL_AOD,
};

export const AOD_DOT_SMALL_STROKE_TECT_PROPS = {
  ...AOD_DOT_STROKE_TECT_PROPS,
  w: DOT_GRID_PARAMS.rAod * 2 / 3,
  h: DOT_GRID_PARAMS.rAod * 2 / 3,
};

export const MINUTE_BACKGROUND_CIRCLE_PROPS = {
  ...DOT_CIRCLE_PROPS,
  color: COLORS.emptyDot,
  radius: DOT_GRID_PARAMS.r - 1,
};

export const DOT_ARC_PROGRESS_PROPS = {
  center_x: 0,
  center_y: 0,
  radius: DOT_GRID_PARAMS.r / 2,
  start_angle: 0,
  end_angle: 360,
  color: COLORS.activeDot,
  line_width: DOT_GRID_PARAMS.r,
  level: 100,
  corner_flag: 3,
  show_level: ui.show_level.ONLY_NORMAL,
};

export const TIME_TEXT_PROPS = {
  x: 0,
  y: 0,
  w: DOT_GRID_PARAMS.r * 2,
  h: DOT_GRID_PARAMS.r * 2,
  color: COLORS.text,
  text_size: px(36),
  align_h: ui.align.CENTER_H,
  align_v: ui.align.CENTER_V,
  font: 'fonts/MartianMono-ExtraLight.ttf',
  text: '--',
  show_level: ui.show_level.ONLY_NORMAL,
};

export const AOD_TIME_TEXT_PROPS = {
  ...TIME_TEXT_PROPS,
  color: COLORS.aod,
  show_level: ui.show_level.ONAL_AOD,
};
