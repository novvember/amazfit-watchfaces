import { COLOR_PRIMARY, COLOR_SECONDARY, FONT_SECONDARY } from './index.const';

export const OVERLAY_CIRCLE_AOD_PROPS = {
  center_x: px(240),
  center_y: px(240),
  radius: px(310),
  color: 0x000000,
  alpha: 90,
  show_level: hmUI.show_level.ONAL_AOD,
};

export const DATA_TEXT_PROPS = {
  x: 0,
  y: 0,
  w: px(170),
  h: px(46),
  color: COLOR_PRIMARY,
  text_size: px(40),
  align_h: hmUI.align.CENTER_H,
  align_v: hmUI.align.CENTER_V,
  font: FONT_SECONDARY,
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const DATE_BACKGROUND_RECT_PROPS = {
  x: px(319),
  y: px(210),
  w: px(60),
  h: px(60),
  radius: px(60 / 2),
  line_width: px(1) * 0.8,
  color: COLOR_SECONDARY,
  show_level: hmUI.show_level.ONLY_NORMAL,
};
