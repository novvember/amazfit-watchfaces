import { COLORS, DATA, DATE, FONTS, SCREEN } from '../utils/constants';

export const DATE_DAY_TEXT_PROPS = {
  x: SCREEN.centerX - DATA.radius - DATE.width / 2,
  y: SCREEN.centerY,
  w: DATE.width,
  h: DATE.height,
  color: COLORS.primary,
  text_size: DATE.textSize,
  align_h: hmUI.align.CENTER_H,
  align_v: hmUI.align.CENTER_V,
  font: FONTS.primary,
  text: '00',
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const DATE_WEEK_TEXT_PROPS = {
  x: SCREEN.centerX - DATA.radius - DATE.width / 2,
  y: SCREEN.centerY - DATE.height,
  w: DATE.width,
  h: DATE.height,
  color: COLORS.primary,
  text_size: DATE.textSize,
  align_h: hmUI.align.CENTER_H,
  align_v: hmUI.align.CENTER_V,
  font: FONTS.primary,
  text: 'XX',
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const BATTERY_CIRCLE_TEXT_PROPS = {
  radius: DATA.radius - DATA.circleText.imageHeight / 2,
  gap: px(0.1),
  charImages: DATA.circleText.charImages,
  imageWidth: DATA.circleText.imageWidth,
  imageHeight: DATA.circleText.imageHeight,
  isTextReversed: true,
  maxLength: 4,
  text: '100%',
  angleStart: 51,
};

export const BATTERY_BACKGROUND_ARC_PROPS = {
  center_x: SCREEN.centerX,
  center_y: SCREEN.centerY,
  radius: DATA.radius,
  start_angle: 135,
  end_angle: 170,
  color: COLORS.tertiary,
  line_width: DATA.arc.width,
  level: 100,
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const BATTERY_CURRENT_ARC_PROPS = {
  ...BATTERY_BACKGROUND_ARC_PROPS,
  color: COLORS.primary,
};

export const HEART_CIRCLE_TEXT_PROPS = {
  ...BATTERY_CIRCLE_TEXT_PROPS,
  maxLength: 4,
  text: '000→',
  angleStart: -30,
};

export const HEART_BACKGROUND_ARC_PROPS = {
  center_x: SCREEN.centerX,
  center_y: SCREEN.centerY,
  radius: DATA.radius,
  start_angle: 215,
  end_angle: 250,
  color: COLORS.tertiary,
  line_width: DATA.arc.width,
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

export const STEPS_CIRCLE_TEXT_PROPS = {
  ...BATTERY_CIRCLE_TEXT_PROPS,
  maxLength: 6,
  text: '00000→',
  angleStart: -30,
  isTextReversed: false,
};

export const STEPS_BACKGROUND_ARC_PROPS = {
  center_x: SCREEN.centerX,
  center_y: SCREEN.centerY,
  radius: DATA.radius,
  start_angle: 290,
  end_angle: 325,
  color: COLORS.tertiary,
  line_width: DATA.arc.width,
  level: 100,
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const STEPS_CURRENT_ARC_PROPS = {
  ...STEPS_BACKGROUND_ARC_PROPS,
  color: COLORS.primary,
};

export const SLEEP_CIRCLE_TEXT_PROPS = {
  ...BATTERY_CIRCLE_TEXT_PROPS,
  maxLength: 6,
  text: '00:00 ',
  angleStart: 30,
  isTextReversed: false,
};

export const DISCONNECT_ICON_PROPS = {
  x: px(220),
  y: px(443),
  type: hmUI.system_status.DISCONNECT,
  src: 'connect/disconnect.png',
  show_level: hmUI.show_level.ONLY_NORMAL,
};
