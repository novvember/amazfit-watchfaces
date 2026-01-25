import { DIGIT_HEIGHT, DIGIT_WIDTH } from '../utils/constants';

export const TIME_DIGIT_IMAGE_PROPS = {
  x: 0,
  y: 0,
  pos_x: 0,
  pos_y: 0,
  w: DIGIT_WIDTH,
  h: DIGIT_HEIGHT,
  src: '',
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const TIME_DIGIT_AOD_IMAGE_PROPS = {
  ...TIME_DIGIT_IMAGE_PROPS,
  show_level: hmUI.show_level.ONAL_AOD,
};

export const BACKGROUND_RECT_PROPS = {
  x: 0,
  y: 0,
  w: px(480),
  h: px(480),
  radius: 0,
  color: 0x000000,
  show_level: hmUI.show_level.ONLY_NORMAL,
};
