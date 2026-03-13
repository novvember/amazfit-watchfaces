import { getHasCustomFontSupport } from '../utils/getHasCustomFontSupport';

const hasCustomFontSupport = getHasCustomFontSupport();

const COLOR_PRIMARY = 0xffffff;

const FONT_PRIMARY = hasCustomFontSupport ? 'fonts/Rubik-Light.ttf' : undefined;

export const DATE_TEXT_PROPS = {
  x: px(140),
  y: px(400),
  w: px(200),
  h: px(60),
  color: COLOR_PRIMARY,
  text_size: px(40),
  align_h: hmUI.align.CENTER_H,
  align_v: hmUI.align.CENTER_V,
  font: FONT_PRIMARY,
  text: '',
  show_level: hmUI.show_level.ONLY_NORMAL | hmUI.show_level.ONAL_AOD,
};

export const OVERLAY_CIRCLE_AOD_PROPS = {
  center_x: px(240),
  center_y: px(240),
  radius: px(310),
  color: 0x000000,
  alpha: 80,
  show_level: hmUI.show_level.ONAL_AOD,
};
