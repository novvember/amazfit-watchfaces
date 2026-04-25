export const SECOND_IMAGE_PROPS = {
  second_centerX: px(240),
  second_centerY: px(240),
  second_posX: px(240),
  second_posY: px(240),
  second_path: 'second/wheel.png',

  fresh_frequency: 10,

  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const SECOND_AOD_IMAGE_PROPS = {
  x: 0,
  y: 0,
  src: 'second_aod/wheel.png',
  show_level: hmUI.show_level.ONAL_AOD,
};

export const MINUTE_IMAGE_PROPS = {
  x: 0,
  y: 0,
  pos_x: px(84),
  pos_y: px(84),
  w: px(480),
  h: px(480),
  src: 'minute/wheel.png',
  center_x: px(240),
  center_y: px(240),
  angle: 0,
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const MINUTE_AOD_IMAGE_PROPS = {
  ...MINUTE_IMAGE_PROPS,
  src: 'minute_aod/wheel.png',
  show_level: hmUI.show_level.ONAL_AOD,
};

export const MINUTE_TEXT_PROPS = {
  x: 0,
  y: 0,
  w: px(34),
  h: px(24),
  src: 'minute/%s.png',
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const MINUTE_AOD_TEXT_PROPS = {
  ...MINUTE_TEXT_PROPS,
  src: 'minute_aod/%s.png',
  show_level: hmUI.show_level.ONAL_AOD,
};
