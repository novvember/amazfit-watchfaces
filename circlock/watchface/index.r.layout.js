import hmUI from '@zos/ui';
import { px } from '@zos/utils';

const centerX = px(480 / 2);
const centerY = px(480 / 2);

export const POINTERS_PROPS = {
  minute_centerX: centerX,
  minute_centerY: centerY,
  minute_posX: px(70 / 2),
  minute_posY: px(220),
  minute_path: 'pointers/minute.png',

  second_centerX: centerX,
  second_centerY: centerY,
  second_posX: px(70 / 2),
  second_posY: px(220),
  second_path: 'pointers/second.png',

  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const AOD_POINTERS_PROPS = {
  minute_centerX: centerX,
  minute_centerY: centerY,
  minute_posX: px(70 / 2),
  minute_posY: px(220),
  minute_path: 'pointers/minute_aod.png',

  show_level: hmUI.show_level.ONAL_AOD,
};

export const HOUR_IMAGE_PROPS = {
  x: 0,
  y: 0,
  w: px(480),
  h: px(480),
  src: 'hours/0.png',
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const AOD_HOUR_IMAGE_PROPS = {
  x: 0,
  y: 0,
  w: px(480),
  h: px(480),
  src: 'hours_aod/0.png',
  show_level: hmUI.show_level.ONAL_AOD,
};
