import { BEZEL_TEXT, SCREEN } from '../utils/constants';
import {
  TEXT_CHARS,
  TEXT_CHAR_HEIGHT,
  TEXT_CHAR_WIDTH,
} from '../utils/textChars';

export const HOUR_POINTER_PROPS = {
  hour_centerX: SCREEN.centerX,
  hour_centerY: SCREEN.centerY,
  hour_posX: SCREEN.centerX,
  hour_posY: SCREEN.centerY,
  hour_path: 'hours/pointer.png',
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const MINUTE_BACKGROUND_PROPS = {
  x: 0,
  y: 0,
  src: 'minutes/background.png',
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const MINUTE_POINTER_PROPS = {
  minute_centerX: SCREEN.centerX,
  minute_centerY: SCREEN.centerY,
  minute_posX: SCREEN.centerX,
  minute_posY: SCREEN.centerY,
  minute_path: 'minutes/pointer.png',
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const SECOND_BACKGROUND_PROPS = {
  x: 0,
  y: 0,
  src: 'seconds/background.png',
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const SECOND_POINTER_PROPS = {
  second_centerX: SCREEN.centerX,
  second_centerY: SCREEN.centerY,
  second_posX: SCREEN.centerX,
  second_posY: SCREEN.centerY,
  second_path: 'seconds/pointer.png',
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const BEZEL_BACKGROUND_PROPS = {
  x: 0,
  y: 0,
  src: 'bezel/background.png',
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const BEZEL_CIRCLE_TEXT_PROPS = {
  maxLength: '→→ INDICATOR →→'.length,
  text: '→→INDICATOR→→',
  angleStart: -67,
  radius: BEZEL_TEXT.radius,
  gap: BEZEL_TEXT.gap,
  charImages: TEXT_CHARS,
  imageWidth: TEXT_CHAR_WIDTH,
  imageHeight: TEXT_CHAR_HEIGHT,
};

export const DATE_CIRCLE_TEXT_PROPS = {
  maxLength: '00 WEDNESDAY'.length,
  text: '',
  angleStart: 7,
  radius: BEZEL_TEXT.radius,
  gap: BEZEL_TEXT.gap,
  charImages: TEXT_CHARS,
  imageWidth: TEXT_CHAR_WIDTH,
  imageHeight: TEXT_CHAR_HEIGHT,
};

export const STEPS_CIRCLE_TEXT_PROPS = {
  maxLength: 'STEPS 00000'.length,
  text: '',
  angleStart: -20,
  radius: BEZEL_TEXT.radius,
  gap: BEZEL_TEXT.gap,
  charImages: TEXT_CHARS,
  imageWidth: TEXT_CHAR_WIDTH,
  imageHeight: TEXT_CHAR_HEIGHT,
  isTextReversed: true,
};

export const BATTERY_CIRCLE_TEXT_PROPS = {
  maxLength: 'BATTERY 000%'.length,
  text: '',
  angleStart: 55,
  radius: BEZEL_TEXT.radius,
  gap: BEZEL_TEXT.gap,
  charImages: TEXT_CHARS,
  imageWidth: TEXT_CHAR_WIDTH,
  imageHeight: TEXT_CHAR_HEIGHT,
  isTextReversed: true,
};

export const SLEEP_CIRCLE_TEXT_PROPS = {
  maxLength: 'SLEEP 00:00'.length,
  text: '',
  angleStart: -90,
  radius: BEZEL_TEXT.radius,
  gap: BEZEL_TEXT.gap,
  charImages: TEXT_CHARS,
  imageWidth: TEXT_CHAR_WIDTH,
  imageHeight: TEXT_CHAR_HEIGHT,
  isTextReversed: true,
};
