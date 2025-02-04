import {
  FONTS,
  SCREEN,
  ARCS,
  WIDGETS,
  COLORS,
  isRusLang,
  FONT_SIZE,
} from '../utils/constants';

export const TIME_TEXT_PROPS = {
  x: SCREEN.centerX - px(320) / 2,
  y: SCREEN.centerY - px(140) / 2,
  w: px(320),
  h: px(140),
  color: COLORS.primary,
  text_size: FONT_SIZE.time,
  align_h: hmUI.align.CENTER_H,
  align_v: hmUI.align.CENTER_V,
  font: FONTS.time,
  text: '--:--',
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const STEPS_ARC_PROPS = {
  center_x: SCREEN.centerX,
  center_y: SCREEN.centerY,
  radius: SCREEN.centerX - px(30) / 2,
  start_angle: ARCS.steps.angleStart,
  end_angle: ARCS.steps.angleEnd,
  color: COLORS.accentSecondary,
  line_width: px(30),
  level: 100,
  corner_flag: 3,
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const HEART_ARC_PROPS = {
  ...STEPS_ARC_PROPS,
  start_angle: ARCS.heart.angleStart,
  end_angle: ARCS.heart.angleEnd,
};

export const STEPS_LINES_IMAGE_PROPS = {
  x: 0,
  y: 0,
  src: isRusLang ? 'scale/left_ru.png' : 'scale/left.png',
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const HEART_LINES_IMAGE_PROPS = {
  ...STEPS_LINES_IMAGE_PROPS,
  src: isRusLang ? 'scale/right_ru.png' : 'scale/right.png',
};

export const STEPS_TEXT_PROPS = {
  x: -1 * px(6),
  y: -1 * px(6),
  w: SCREEN.width + px(12),
  h: SCREEN.height + px(12),
  text_size: FONT_SIZE.scale,
  color: COLORS.secondary,
  text: '---',
  align_h: hmUI.align.LEFT,
  align_v: hmUI.align.TOP,
  char_space: 0,
  line_space: 0,
  start_angle: -45,
  end_angle: 0,
  font: FONTS.widget,
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const HEART_TEXT_PROPS = {
  ...STEPS_TEXT_PROPS,
  align_h: hmUI.align.RIGHT,
  start_angle: 0,
  end_angle: 45,
};

export const MARK_IMAGE_PROPS = {
  x: 0,
  y: 0,
  w: SCREEN.width,
  h: SCREEN.height,
  pos_x: SCREEN.centerX - px(12) / 2,
  pox_y: 0,
  center_x: SCREEN.centerX,
  center_y: SCREEN.centerY,
  angle: 0,
  src: 'scale/mark.png',
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const DISTANCE_TEXT_PROPS = {
  x: px(150),
  y: px(442),
  w: px(180),
  h: px(28),
  color: COLORS.accent,
  text_size: FONT_SIZE.bottom,
  align_h: hmUI.align.CENTER_H,
  align_v: hmUI.align.CENTER_V,
  font: FONTS.widget,
  text: '---',
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const SLEEP_TEXT_PROPS = {
  ...DISTANCE_TEXT_PROPS,
  y: px(412),
  color: COLORS.accentSecondary,
};

export const WIDGET_BACKGROUND_CIRCLE_PROPS = {
  center_x: 0,
  center_y: 0,
  radius: 0,
  color: COLORS.tertiary,
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const WIDGET_BACKGROUND_ARC_PROPS = {
  center_x: 0,
  center_y: 0,
  radius: px(40),
  start_angle: 0,
  end_angle: 360,
  color: COLORS.accentSecondary,
  line_width: px(10),
  level: 100,
  corner_flag: 0,
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const WIDGET_ACTIVE_ARC_PROPS = {
  ...WIDGET_BACKGROUND_ARC_PROPS,
  color: COLORS.accent,
};

export const WIDGET_TEXT_L_PROPS = {
  x: 0,
  y: 0,
  w: 0,
  h: 0,
  color: COLORS.primary,
  text_size: FONT_SIZE.widgetL,
  align_h: hmUI.align.CENTER_H,
  align_v: hmUI.align.CENTER_V,
  font: FONTS.widget,
  text: '--',
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const WIDGET_TEXT_S_PROPS = {
  ...WIDGET_TEXT_L_PROPS,
  text_size: FONT_SIZE.widgetS,
};

export const WIDGET_TEXT_XS_PROPS = {
  ...WIDGET_TEXT_L_PROPS,
  text_size: FONT_SIZE.widgetXs,
};

export const WIDGET_DOT_PROPS = {
  center_x: 0,
  center_y: 0,
  radius: px(40),
  start_angle: 0,
  end_angle: 0,
  color: COLORS.primary,
  line_width: px(10),
  level: 100,
  corner_flag: 0,
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const WIDGET_DOT_BACKGROUND_PROPS = {
  ...WIDGET_DOT_PROPS,
  line_width: px(14),
  color: 0x000000,
};

export const SUN_ICON_IMAGE_PROPS = {
  x: 0,
  y: 0,
  src: 'sun/sunrise.png',
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const UVI_IMAGE_LEVEL_PROPS = {
  x: 0,
  y: 0,
  image_array: new Array(5).fill(null).map((_, i) => `uvi/uvi_${i}.png`),
  image_length: 5,
  w: 0,
  h: 0,
  type: hmUI.data_type.UVI,
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const WIND_IMAGE_LEVEL_PROPS = {
  x: 0,
  y: 0,
  image_array: new Array(8).fill(null).map((_, i) => `wind/wind_${i}.png`),
  image_length: 8,
  w: 0,
  h: 0,
  type: hmUI.data_type.WIND_DIRECTION,
  show_level: hmUI.show_level.ONLY_NORMAL,
};
