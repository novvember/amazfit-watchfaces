import {
  COLOR_ACCENT,
  COLOR_TEXT,
  FONT,
  FONT_SIZE,
  FONT_SIZE_LARGE,
} from './index.const';

const X = px(55);
const Y = px(70);

/** @satisfies {HmWidgetProps} */
export const DATE_GROUP_PROPS = {
  x: X,
  y: Y,
  w: px(300),
  h: px(60),
};

/** @satisfies {HmWidgetProps} */
export const DATE_WEEKDAY_TEXT_PROPS = {
  x: 0,
  y: 0,
  w: px(76),
  h: px(60),
  color: COLOR_TEXT,
  text_size: FONT_SIZE,
  align_h: hmUI.align.LEFT,
  align_v: hmUI.align.CENTER_V,
  font: FONT,
  text: '',
  show_level: hmUI.show_level.ONLY_NORMAL,
};

/** @satisfies {HmWidgetProps} */
export const DATE_DAY_TEXT_PROPS = {
  x: px(88),
  y: 0,
  w: px(76),
  h: px(60),
  color: 0x000000,
  text_size: FONT_SIZE_LARGE,
  align_h: hmUI.align.LEFT,
  align_v: hmUI.align.CENTER_V,
  font: FONT,
  type: hmUI.data_type.DAY,
  padding: true,
  show_level: hmUI.show_level.ONLY_NORMAL,
};

/** @satisfies {HmWidgetProps} */
export const DATE_DAY_RECT_PROPS = {
  x: DATE_DAY_TEXT_PROPS.x - px(11),
  y: px(9),
  w: px(68),
  h: px(40),
  color: COLOR_ACCENT,
  radius: px(22),
  show_level: hmUI.show_level.ONLY_NORMAL,
};

/** @satisfies {HmWidgetProps} */
export const DATE_MONTH_TEXT_PROPS = {
  x: px(156),
  y: 0,
  w: px(76),
  h: px(60),
  color: COLOR_TEXT,
  text_size: FONT_SIZE,
  align_h: hmUI.align.LEFT,
  align_v: hmUI.align.CENTER_V,
  font: FONT,
  text: '',
  show_level: hmUI.show_level.ONLY_NORMAL,
};

/** @satisfies {HmWidgetProps} */
export const DATE_MONTH_RECT_PROPS = {
  x: DATE_MONTH_TEXT_PROPS.x - px(12),
  y: px(8),
  w: px(90),
  h: px(42),
  color: COLOR_ACCENT,
  line_width: px(1),
  radius: px(22),
  show_level: hmUI.show_level.ONLY_NORMAL,
};
