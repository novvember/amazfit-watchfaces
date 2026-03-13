import { FONTS } from '../utils/constants';

export const COLORS = {
  regular: 0xffffff,
  highlight: 0xf67615,
};

export const TOP_LEFT_WIDGET_COORDS = {
  x: px(95),
  y: px(10),
};

export const TOP_RIGHT_WIDGET_COORDS = {
  x: px(265),
  y: px(10),
};

export const BOTTOM_LEFT_WIDGET_COORDS = {
  x: px(72),
  y: px(410),
};

export const BOTTOM_RIGHT_WIDGET_COORDS = {
  x: px(255),
  y: px(410),
};

export const BOTTOM_CENTER_WIDGET_COORDS = {
  x: px(195),
  y: px(410),
};

export const WIDGET_GROUP_PROPS = {
  x: 0,
  y: 0,
  w: px(120),
  h: px(60),
};

export const WIDGET_TEXT_TOP_PROPS = {
  x: 0,
  y: px(0),
  w: WIDGET_GROUP_PROPS.w,
  h: WIDGET_GROUP_PROPS.h / 2,
  color: COLORS.regular,
  text_size: px(26),
  align_h: hmUI.align.LEFT,
  align_v: hmUI.align.CENTER_V,
  font: FONTS.data,
  text: '---',
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const WIDGET_TEXT_BOTTOM_PROPS = {
  ...WIDGET_TEXT_TOP_PROPS,
  y: WIDGET_GROUP_PROPS.h / 2,
};
