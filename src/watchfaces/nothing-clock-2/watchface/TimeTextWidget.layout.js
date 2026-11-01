export const CENTER_X = px(240);
export const CENTER_Y = px(240);
export const DIGIT_GAP = px(-4);
export const DIGIT_HEIGHT = px(112);
export const DEFAULT_DIGIT_WIDTH = 112;

/** @satisfies {HmWidgetProps} */
export const DIGIT_IMAGE_PROPS = {
  x: 0,
  y: 0,
  src: '',
  show_level: hmUI.show_level.ONLY_NORMAL | hmUI.show_level.ONLY_EDIT,
};

/** @satisfies {HmWidgetProps} */
export const AOD_DIGIT_IMAGE_PROPS = {
  x: 0,
  y: 0,
  src: '',
  show_level: hmUI.show_level.ONAL_AOD,
};

/** @type {Record<string, number | undefined>} */
export const IMAGE_WIDTHS = {
  0: 112,
  1: 72,
  2: 112,
  3: 112,
  4: 112,
  5: 112,
  6: 112,
  7: 112,
  8: 112,
  9: 112,
};
