import { SECONDARY_TITLE_PROPS } from './CommonDataWidget.layout';
import { COLOR_PRIMARY, FONT_PRIMARY } from './index.layout';

export const SUNRISE_TITLE_PROPS = {
  ...SECONDARY_TITLE_PROPS,
  x: px(110),
  y: px(14),
  align_h: hmUI.align.RIGHT,
};

export const SUNSET_TITLE_PROPS = {
  ...SECONDARY_TITLE_PROPS,
  x: px(270),
  y: px(14),
};

export const SUNRISE_TEXT_PROPS = {
  x: px(110),
  y: px(32),
  w: px(100),
  h: px(30),
  align_h: hmUI.align.RIGHT,
  align_v: hmUI.align.CENTER_V,
  text_size: px(30),
  color: COLOR_PRIMARY,
  font: FONT_PRIMARY,
  text: '',
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const SUNSET_TEXT_PROPS = {
  ...SUNRISE_TEXT_PROPS,
  x: px(270),
  align_h: hmUI.align.LEFT,
};
