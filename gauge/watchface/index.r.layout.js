import { SCREEN } from '../utils/constants';

export const TIME_BACKGROUND_IMAGE_PROPS = {
  x: 0,
  y: 0,
  w: px(480),
  h: px(480),
  src: 'time/background.png',
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const TIME_HOUR_BACKGROUND_IMAGE_PROPS = {
  x: 0,
  y: 0,
  w: px(480),
  h: px(480),
  src: 'time/hour_background.png',
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const TIME_SECOND_BACKGROUND_IMAGE_PROPS = {
  x: SCREEN.centerX - px(90) / 2,
  y: SCREEN.centerY - px(90) / 2,
  w: px(90),
  h: px(90),
  src: 'time/second_background.png',
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const TIME_HOUR_POINTER_PROPS = {
  hour_centerX: SCREEN.centerX,
  hour_centerY: SCREEN.centerY,
  hour_posX: px(368) / 2,
  hour_posY: px(368) / 2,
  hour_path: 'time/hour.png',
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const TIME_MINUTE_POINTER_PROPS = {
  minute_centerX: SCREEN.centerX,
  minute_centerY: SCREEN.centerY,
  minute_posX: px(200) / 2,
  minute_posY: px(200) / 2,
  minute_path: 'time/minute.png',
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const TIME_SECOND_POINTER_PROPS = {
  second_centerX: SCREEN.centerX,
  second_centerY: SCREEN.centerY,
  second_posX: px(30) / 2,
  second_posY: px(88) / 2,
  second_path: 'time/second.png',
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const WEATHER_TEXT_IMAGE_PROPS = {
  x: px(104),
  y: px(25),
  font_array: new Array(10).fill(null).map((_, i) => `text_chars/${i}.png`),
  type: hmUI.data_type.WEATHER_CURRENT,
  negative_image: 'text_chars/minus.png',
  unit_en: 'text_chars/degree.png',
  align_h: hmUI.align.RIGHT,
  show_level: hmUI.show_level.ONLY_NORMAL,
  angle: -18,
  h_space: -1,
};
