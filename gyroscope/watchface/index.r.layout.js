import { FONT } from '../utils/constants';

const { width, height } = hmSetting.getDeviceInfo();

export const SCREEN = {
  width,
  height,
  centerX: width / 2,
  centerY: height / 2,
};

export const POINTER_PROPS = {
  hour_centerX: SCREEN.centerX,
  hour_centerY: SCREEN.centerY,
  hour_posX: SCREEN.centerX,
  hour_posY: SCREEN.centerY,
  hour_path: 'time/hour.png',

  minute_centerX: SCREEN.centerX,
  minute_centerY: SCREEN.centerY,
  minute_posX: px(24 / 2),
  minute_posY: px(240),
  minute_path: 'time/minute.png',

  second_centerX: SCREEN.centerX,
  second_centerY: SCREEN.centerY,
  second_posX: px(24 / 2),
  second_posY: px(240),
  second_path: 'time/second.png',

  fresh_frequency: 10,

  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const TOP_COVER_IMAGE_PROPS = {
  x: 0,
  y: 0,
  w: px(480),
  h: px(480),
  src: 'time/top.png',
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const TEXT_PROPS = {
  x: SCREEN.centerX - px(140 / 2),
  y: px(438),
  w: px(140),
  h: px(42),
  color: 0xe0e7e7,
  text_size: px(28),
  align_h: hmUI.align.CENTER_H,
  align_v: hmUI.align.CENTER_V,
  font: FONT,
  text: '',
  show_level: hmUI.show_level.ONLY_NORMAL,
};
