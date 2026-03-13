export const BACKGROUND_IMAGE_PROPS = {
  x: px(180),
  y: px(429),
  w: px(120),
  h: px(60),
  radius: 0,
  color: 0x000000,
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const ICON_IMAGE_PROPS = {
  x: px(209),
  y: px(447),
  w: px(28),
  h: px(28),
  src: 'battery/icon.png',
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const TEXT_PROPS = {
  x: px(237),
  y: px(441),
  w: px(100),
  h: px(40),
  color: 0xffffff,
  text_size: px(40),
  align_h: hmUI.align.LEFT,
  align_v: hmUI.align.CENTER_V,
  font: 'fonts/FiraSansExtraCondensed-Regular.ttf',
  type: hmUI.data_type.BATTERY,
  unit_type: 0,
  show_level: hmUI.show_level.ONLY_NORMAL,
};
