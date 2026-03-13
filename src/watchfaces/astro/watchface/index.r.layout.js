const { width, height } = hmSetting.getDeviceInfo();

export const SCREEN = {
  width,
  height,
  centerX: width / 2,
  centerY: height / 2,
};

export const BACKGROUND_IMAGE_PROPS = {
  x: 0,
  y: 0,
  w: px(480),
  h: px(480),
  src: 'time/background.png',
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const TIME_POINTER_PROPS = {
  hour_centerX: SCREEN.centerX,
  hour_centerY: SCREEN.centerY,
  hour_posX: px(140 / 2),
  hour_posY: px(240),
  hour_path: 'time/hour.png',

  minute_centerX: SCREEN.centerX,
  minute_centerY: SCREEN.centerY,
  minute_posX: px(140 / 2),
  minute_posY: px(240),
  minute_path: 'time/minute.png',

  second_centerX: SCREEN.centerX,
  second_centerY: SCREEN.centerY,
  second_posX: px(140 / 2),
  second_posY: px(240),
  second_path: 'time/second.png',

  second_cover_path: 'time/cover.png',
  second_cover_x: SCREEN.centerX - px(264 / 2),
  second_cover_y: SCREEN.centerY - px(264 / 2),

  fresh_frequency: 10,

  show_level: hmUI.show_level.ONLY_NORMAL,
};


export const AOD_TIME_POINTER_PROPS = {
  hour_centerX: SCREEN.centerX,
  hour_centerY: SCREEN.centerY,
  hour_posX: px(140 / 2),
  hour_posY: px(240),
  hour_path: 'time/hour.png',

  minute_centerX: SCREEN.centerX,
  minute_centerY: SCREEN.centerY,
  minute_posX: px(140 / 2),
  minute_posY: px(240),
  minute_path: 'time/minute.png',

  minute_cover_path: 'time/cover.png',
  minute_cover_x: SCREEN.centerX - px(264 / 2),
  minute_cover_y: SCREEN.centerY - px(264 / 2),

  show_level: hmUI.show_level.ONAL_AOD,
};
