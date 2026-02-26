export const WIDGET_WIDTH = px(120);
export const WIDGET_HEIGHT = px(60);

const FONT = 'fonts/Inter_18pt-Regular.ttf';

export const SECONDARY_TEXT_PROPS = {
  x: 0,
  y: 0,
  w: WIDGET_WIDTH,
  h: px(20),
  color: 0x808080,
  text_size: px(18),
  align_h: hmUI.align.CENTER_H,
  align_v: hmUI.align.CENTER_V,
  font: FONT,
  text: '',
  char_space: px(2),
  text_style: hmUI.text_style.ELLIPSIS,
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const PRIMARY_TEXT_PROPS = {
  x: 0,
  y: px(20),
  w: WIDGET_WIDTH,
  h: px(32),
  align_h: hmUI.align.CENTER_H,
  align_v: hmUI.align.CENTER_V,
  text_size: px(24),
  color: 0xffffff,
  font: FONT,
  type: undefined,
  text: undefined,
  show_level: hmUI.show_level.ONLY_NORMAL,
};
