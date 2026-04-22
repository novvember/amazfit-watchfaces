import { MINUTE, SCREEN, SECOND } from '../utils/constants';

export const SECOND_IMAGE_PROPS = {
  x: 0,
  y: 0,
  pos_x: SCREEN.centerX - SECOND.image.size / 2,
  pos_y: SCREEN.centerY - SECOND.image.size / 2,
  w: SCREEN.width,
  h: SCREEN.height,
  src: SECOND.image.src,
  center_x: SCREEN.centerX,
  center_y: SCREEN.centerX,
  angle: 0,
  show_level: hmUI.show_level.ONLY_NORMAL,
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

export const MINUTE_TEXT_PROPS = {
  x: 0,
  y: 0,
  w: MINUTE.text.width,
  h: MINUTE.text.height,
  src: 'minute/%s.png',
  show_level: hmUI.show_level.ONLY_NORMAL,
};
