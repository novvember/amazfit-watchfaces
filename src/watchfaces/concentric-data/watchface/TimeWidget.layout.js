import { MINUTE, SCREEN } from '../utils/constants';

export const SECOND_IMAGE_PROPS = {
  second_centerX: px(240),
  second_centerY: px(240),
  second_posX: px(240),
  second_posY: px(240),
  second_path: 'time/second.png',

  fresh_frequency: 10,

  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const SECOND_AOD_IMAGE_PROPS = {
  x: 0,
  y: 0,
  src: 'time/second_aod.png',
  show_level: hmUI.show_level.ONAL_AOD,
};

export const MINUTE_IMAGE_PROPS = {
  x: 0,
  y: 0,
  pos_x: SCREEN.centerX - MINUTE.image.size / 2,
  pos_y: SCREEN.centerY - MINUTE.image.size / 2,
  w: SCREEN.width,
  h: SCREEN.height,
  src: MINUTE.image.src,
  center_x: SCREEN.centerX,
  center_y: SCREEN.centerX,
  angle: 0,
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const MINUTE_AOD_IMAGE_PROPS = {
  x: px(84),
  y: px(84),
  src: 'time/minute_aod.png',
  show_level: hmUI.show_level.ONAL_AOD,
};

export const MINUTE_TEXT_PROPS = {
  x: 0,
  y: 0,
  w: MINUTE.text.width,
  h: MINUTE.text.height,
  src: 'minute/%s.png',
  show_level: hmUI.show_level.ONLY_NORMAL,
};
