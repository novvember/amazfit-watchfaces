import { COLORS, FONTS } from './index.const';

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
  text_size: px(36),
  align_h: hmUI.align.CENTER_H,
  align_v: hmUI.align.CENTER_V,
  font: FONTS.widget,
  text: '--',
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const WIDGET_TEXT_S_PROPS = {
  ...WIDGET_TEXT_L_PROPS,
  text_size: px(22),
};

export const WIDGET_TEXT_XS_PROPS = {
  ...WIDGET_TEXT_L_PROPS,
  text_size: px(14),
};

export const WIDGET_DOT_IMAGE_PROPS = {
  x: 0,
  y: 0,
  w: 0,
  h: 0,
  pos_x: 0,
  pos_y: 0,
  center_x: 0,
  center_y: 0,
  angle: 0,
  src: 'widget/dot.png',
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const WIDGET_ICON_IMAGE_PROPS = {
  x: 0,
  y: 0,
  src: '',
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const WIDGET_BAR_PROPS = {
  x: 0,
  y: 0,
  w: 0,
  h: 0,
  radius: 0,
  color: COLORS.primary,
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const WIDGET_BUTTON_PROPS = {
  x: 0,
  y: 0,
  text: '',
  w: 0,
  h: 0,
  normal_src: 'empty.png',
  press_src: 'empty.png',
  click_func: () => {},
  show_level: hmUI.show_level.ONLY_NORMAL,
};
