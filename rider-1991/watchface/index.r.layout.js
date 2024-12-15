import { SCREEN } from '../utils/constants';

export const BACKGROUND_IMAGE_PROPS = {
  x: 0,
  y: 0,
  src: 'background/background.png',
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const TIME_POINTER_PROPS = {
  second_centerX: SCREEN.centerX,
  second_centerY: SCREEN.centerY,
  second_posX: px(60) / 2,
  second_posY: px(190),
  second_path: 'time/second.png',

  second_cover_path: 'time/center.png',
  second_cover_x: SCREEN.centerX - px(18) / 2,
  second_cover_y: SCREEN.centerY - px(18) / 2,

  minute_centerX: SCREEN.centerX,
  minute_centerY: SCREEN.centerY,
  minute_posX: px(60) / 2,
  minute_posY: px(190),
  minute_path: 'time/minute.png',

  hour_centerX: SCREEN.centerX,
  hour_centerY: SCREEN.centerY,
  hour_posX: px(60) / 2,
  hour_posY: px(190),
  hour_path: 'time/hour.png',

  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const DATE_TEXT_PROPS = {
  x: px(355),
  y: px(76),
  w: px(60),
  h: px(40),
  color: 0xffffff,
  text_size: px(38),
  align_h: hmUI.align.RIGHT,
  align_v: hmUI.align.CENTER_V,
  font: 'fonts/Jost-Regular.ttf',
  text: '',
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const STEPS_ARC_PROPS = {
  center_x: SCREEN.centerX,
  center_y: SCREEN.centerY,
  radius: px(116) + px(16) / 2,
  start_angle: 0,
  end_angle: 90,
  color: 0xffffff,
  line_width: px(16),
  level: 0,
  corner_flag: 3,
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const BATTERY_ARC_PROPS = {
  center_x: SCREEN.centerX,
  center_y: SCREEN.centerY,
  radius: px(91) + px(10) / 2,
  start_angle: 180,
  end_angle: 270,
  color: 0xffffff,
  line_width: px(10),
  level: 0,
  corner_flag: 3,
  show_level: hmUI.show_level.ONLY_NORMAL,
};
