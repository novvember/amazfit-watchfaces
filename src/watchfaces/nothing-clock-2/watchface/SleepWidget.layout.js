import { COLOR_TEXT, FONT, FONT_SIZE_SMALL } from './index.const';

const X = px(180);
const Y = px(349);

/** @satisfies {HmWidgetProps} */
export const SLEEP_GROUP_PROPS = {
  x: X,
  y: Y,
  w: px(300),
  h: px(60),
};

export const SLEEP_HAND_IMAGE_PROPS = {
  x: 0,
  y: px(10),
  w: px(40),
  h: px(40),
  src: 'hands/5.png',
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const SLEEP_BACKGROUND_PROPS = {
  x: 0,
  y: px(15),
  h: px(40),
  w: px(94),
  src: `sleep/background.png`,
  show_level: hmUI.show_level.ONLY_NORMAL,
};

/** @satisfies {HmWidgetProps} */
export const SLEEP_VALUE_PROPS = {
  x: 0,
  y: px(6),
  w: px(92),
  h: px(36),
  color: COLOR_TEXT,
  text_size: FONT_SIZE_SMALL,
  align_h: hmUI.align.CENTER_H,
  align_v: hmUI.align.CENTER_V,
  font: FONT,
  text: '',
  show_level: hmUI.show_level.ONLY_NORMAL,
};
