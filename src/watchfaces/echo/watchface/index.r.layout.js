const digits = new Array(10).fill(null).map((_, i) => `time/${i}.png`);

const FONT = 'fonts/MartianMono-Light.ttf';

export const IMAGE_TIME_PROPS = {
  hour_zero: 1,
  hour_startX: px(40),
  hour_startY: px(162),
  hour_array: digits,
  hour_align: hmUI.align.LEFT,

  minute_zero: 1,
  minute_startX: px(248),
  minute_startY: px(162),
  minute_array: digits,
  minute_align: hmUI.align.LEFT,
  show_level: hmUI.show_level.ONLY_NORMAL | hmUI.show_level.ONAL_AOD,
};

export const DATE_TEXT_PROPS = {
  x: 0,
  y: px(95),
  text: '',
  w: px(480),
  h: px(40),
  text_size: px(24),
  char_space: px(8),
  align_h: hmUI.align.CENTER_H,
  align_v: hmUI.align.CENTER_V,
  color: 0xffffff,
  font: FONT,
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const STEPS_PROGRESS_IMAGE_PROPS = {
  x: px(68),
  y: px(352),
  src: 'progress/progress_0.png',
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const STEPS_VALUE_TEXT_PROPS = {
  x: px(271),
  y: px(345),
  text: '',
  w: px(140),
  h: px(40),
  text_size: px(24),
  char_space: px(8),
  align_h: hmUI.align.RIGHT,
  align_v: hmUI.align.CENTER_V,
  color: 0xffffff,
  font: FONT,
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const OVERLAY_CIRCLE_AOD_PROPS = {
  center_x: px(240),
  center_y: px(240),
  radius: px(310),
  color: 0x000000,
  alpha: 90,
  show_level: hmUI.show_level.ONAL_AOD,
};
