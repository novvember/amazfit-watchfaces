export const FONT = 'fonts/LucidaConsole.ttf';
export const FONT_SIZE = px(24);
export const LINE_SPACE = FONT_SIZE * 0.9;

export const DATA_TEXT_PROPS = {
  x: px(165),
  y: 0,
  w: px(240),
  h: px(100),
  text_size: FONT_SIZE,
  line_space: FONT_SIZE,
  char_space: px(2),
  align_h: hmUI.align.RIGHT,
  align_v: hmUI.align.CENTER_V,
  font: FONT,
  text: '',
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const STEPS_TEXT_PROPS = {
  ...DATA_TEXT_PROPS,
  y: px(318),
  color: 0xffbd06,
};

export const BATTERY_TEXT_PROPS = {
  ...DATA_TEXT_PROPS,
  y: px(348),
  color: 0xfb4300,
  text: undefined,
  type: hmUI.data_type.BATTERY,
  unit_type: 1,
};
