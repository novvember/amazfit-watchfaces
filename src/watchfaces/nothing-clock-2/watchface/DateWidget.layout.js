import { COLOR_ACCENT, COLOR_TEXT, FONT, FONT_SIZE } from './index.const';

const X = px(55);
const Y = px(121);

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
  x: px(90),
  y: 0,
  w: px(76),
  h: px(60),
  color: 0x000000,
  text_size: FONT_SIZE,
  align_h: hmUI.align.LEFT,
  align_v: hmUI.align.CENTER_V,
  font: FONT,
  type: hmUI.data_type.DAY,
  padding: true,
  show_level: hmUI.show_level.ONLY_NORMAL,
};

/** @satisfies {HmWidgetProps} */
export const DATE_DAY_RECT_PROPS = {
  x: DATE_DAY_TEXT_PROPS.x - px(13),
  y: px(9),
  w: px(70),
  h: px(40),
  color: COLOR_ACCENT,
  radius: px(22),
  show_level: hmUI.show_level.ONLY_NORMAL,
};

/** @satisfies {HmWidgetProps} */
export const DATE_MONTH_TEXT_PROPS = {
  x: px(158),
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
  x: DATE_MONTH_TEXT_PROPS.x - px(13),
  y: px(8),
  w: px(92),
  h: px(42),
  color: COLOR_ACCENT,
  line_width: px(2),
  radius: px(22),
  show_level: hmUI.show_level.ONLY_NORMAL,
};
