export const GROUP_PROPS = {
  x: 0,
  y: 0,
  w: px(150),
  h: px(40),
};

export const WEEKDAY_TEXT_PROPS = {
  x: px(0),
  y: px(0),
  w: px(80),
  h: px(40),
  color: 0xffffff,
  text_size: px(40),
  align_h: hmUI.align.RIGHT,
  align_v: hmUI.align.CENTER_V,
  font: 'fonts/FiraSansExtraCondensed-Regular.ttf',
  text: '',
  show_level: hmUI.show_level.ONLY_NORMAL | hmUI.show_level.ONAL_AOD,
};

export const DOT_IMAGE_PROPS = {
  x: px(74),
  y: px(4),
  w: px(32),
  h: px(32),
  src: 'common/dot.png',
  show_level: hmUI.show_level.ONLY_NORMAL | hmUI.show_level.ONAL_AOD,
};

export const DATE_TEXT_PROPS = {
  ...WEEKDAY_TEXT_PROPS,
  align_h: hmUI.align.LEFT,
  x: px(100),
  w: px(50),
};
