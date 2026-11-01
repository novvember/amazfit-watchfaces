import { COLOR_ACCENT, COLOR_TEXT, FONT, FONT_SIZE } from './index.const';

const X = px(308);
const Y = px(70);

/** @satisfies {HmWidgetProps} */
export const SECONDS_GROUP_PROPS = {
  x: X,
  y: Y,
  w: px(300),
  h: px(60),
};

/** @satisfies {HmWidgetProps} */
export const SECONDS_COLON_TEXT_PROPS = {
  x: 0,
  y: 0,
  w: px(76),
  h: px(60),
  color: COLOR_TEXT,
  text_size: FONT_SIZE,
  align_h: hmUI.align.LEFT,
  align_v: hmUI.align.CENTER_V,
  font: FONT,
  text: ':',
  show_level: hmUI.show_level.ONLY_NORMAL,
};

/** @satisfies {HmWidgetProps} */
export const SECONDS_VALUE_TEXT_PROPS = {
  x: px(22),
  y: 0,
  w: px(76),
  h: px(60),
  color: COLOR_TEXT,
  text_size: FONT_SIZE,
  align_h: hmUI.align.LEFT,
  align_v: hmUI.align.CENTER_V,
  font: FONT,
  type: hmUI.data_type.SECOND,
  padding: true,
  show_level: hmUI.show_level.ONLY_NORMAL,
};

/** @satisfies {HmWidgetProps} */
export const SECONDS_RECT_PROPS = {
  x: px(76),
  y: px(15),
  w: px(16),
  h: px(30),
  color: COLOR_ACCENT,
  show_level: hmUI.show_level.ONLY_NORMAL,
};
