import { COLOR_TEXT, FONT, FONT_SIZE } from './index.const';

export const ARROW_GAP = px(12);

const X = px(55);
const Y = px(298);

/** @satisfies {HmWidgetProps} */
export const STEPS_GROUP_PROPS = {
  x: X,
  y: Y,
  w: px(300),
  h: px(60),
};

/** @satisfies {HmWidgetProps} */
export const STEPS_ICON_IMAGE_PROPS = {
  x: px(-2),
  y: px(10),
  w: px(36),
  h: px(40),
  src: 'steps/icon.png',
  show_level: hmUI.show_level.ONLY_NORMAL,
};

/** @satisfies {HmWidgetProps} */
const VALUE_TEXT_STYLE = {
  y: 0,
  w: px(400),
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
export const STEPS_VALUE_TEXT_PROPS = {
  ...VALUE_TEXT_STYLE,
  x: px(42),
};

/** @satisfies {HmWidgetProps} */
export const STEPS_ARROW_IMAGE_PROPS = {
  x: 0,
  y: px(10),
  w: px(60),
  h: px(40),
  src: 'steps/arrow.png',
  show_level: hmUI.show_level.ONLY_NORMAL,
};

/** @satisfies {HmWidgetProps} */
export const DISTANCE_VALUE_TEXT_PROPS = {
  ...VALUE_TEXT_STYLE,
  x: 0,
};

// Preserve the original offset, including rounding on scaled screens.
export const DISTANCE_GAP = px(86) - ARROW_GAP - STEPS_ARROW_IMAGE_PROPS.w;
