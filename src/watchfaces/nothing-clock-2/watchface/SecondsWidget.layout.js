import { COLOR_ACCENT, COLOR_TEXT, FONT, FONT_SIZE } from './index.const';

const X = px(314);
const Y = px(121);

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
  x: px(74),
  y: px(16),
  w: px(15),
  h: px(26),
  color: COLOR_ACCENT,
  show_level: hmUI.show_level.ONLY_NORMAL,
};
