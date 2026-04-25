import {
  CIRCLE_TEXT_PARAMS,
  COLORS,
  DATA_ARC_WIDTH,
  DATA_RADIUS,
} from './index.const';

export const BATTERY_CIRCLE_TEXT_PROPS = {
  radius: DATA_RADIUS - CIRCLE_TEXT_PARAMS.imageHeight / 2,
  gap: px(0.1),
  charImages: CIRCLE_TEXT_PARAMS.charImages,
  imageWidth: CIRCLE_TEXT_PARAMS.imageWidth,
  imageHeight: CIRCLE_TEXT_PARAMS.imageHeight,
  isTextReversed: true,
  maxLength: 4,
  text: '100%',
  angleStart: 51,
};

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
