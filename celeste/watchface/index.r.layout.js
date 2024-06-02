import { DIGITS, SCREEN, TARGET, TARGET_DOT_SIZE, TIME_SRC } from '../utils/constants';

export const BACKGROUND_PROPS = {
  x: 0,
  y: 0,
  w: SCREEN.width,
  h: SCREEN.height,
  src: 'background/background.png',
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const MINUTE_POINTER_PROPS = {
  minute_centerX: SCREEN.centerX,
  minute_centerY: SCREEN.centerY,
  minute_posX: SCREEN.centerX,
  minute_posY: SCREEN.centerY,
  minute_path: TIME_SRC.minute,
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const MINUTE_POINTER_AOD_PROPS = {
  minute_centerX: SCREEN.centerX,
  minute_centerY: SCREEN.centerY,
  minute_posX: SCREEN.centerX,
  minute_posY: SCREEN.centerY,
  minute_path: 'minute/aod.png',
  show_level: hmUI.show_level.ONAL_AOD,
};

export const HOUR_POINTER_PROPS = {
  hour_centerX: SCREEN.centerX,
  hour_centerY: SCREEN.centerY,
  hour_posX: SCREEN.centerX,
  hour_posY: SCREEN.centerY,
  hour_path: TIME_SRC.hour,
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const HOUR_POINTER_AOD_PROPS = {
  hour_centerX: SCREEN.centerX,
  hour_centerY: SCREEN.centerY,
  hour_posX: SCREEN.centerX,
  hour_posY: SCREEN.centerY,
  hour_path: 'hour/aod.png',
  show_level: hmUI.show_level.ONAL_AOD,
};

export const DOTS_PROPS = {
  x: 0,
  y: 0,
  w: SCREEN.width,
  h: SCREEN.height,
  src: 'background/dots.png',
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const DOTS_AOD_PROPS = {
  x: 0,
  y: 0,
  w: SCREEN.width,
  h: SCREEN.height,
  src: 'background/dots_aod.png',
  show_level: hmUI.show_level.ONAL_AOD,
};

export const MINUTE_POINTER_LINE_PROPS = {
  minute_centerX: SCREEN.centerX,
  minute_centerY: SCREEN.centerY,
  minute_posX: px(4),
  minute_posY: SCREEN.centerY,
  minute_path: TIME_SRC['minute-pointer'],
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const CENTER_PROPS = {
  x: 0,
  y: 0,
  w: SCREEN.width,
  h: SCREEN.height,
  src: 'center.png',
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const CENTER_AOD_PROPS = {
  x: 0,
  y: 0,
  w: SCREEN.width,
  h: SCREEN.height,
  src: 'center_aod.png',
  show_level: hmUI.show_level.ONAL_AOD,
};

export const TARGET_ARC_PROGRESS_PROPS = {
  center_x: SCREEN.centerX,
  center_y: SCREEN.centerY,
  radius: TARGET.radius,
  start_angle: 360 + TARGET_DOT_SIZE.angleStart,
  color: 0x1c1c1c,
  line_width: TARGET.width,
  level: 100,
  end_angle: 360,
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const TARGET_TOP_IMAGE_PROPS = {
  x: SCREEN.centerX - TARGET.imageSize / 2,
  y: SCREEN.centerY - TARGET.imageSize / 2,
  w: TARGET.imageSize,
  h: TARGET.imageSize,
  center_x: TARGET.imageSize / 2,
  center_y: TARGET.imageSize / 2,
  src: 'target-top.png',
  angle: 360,
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const DATE_PROPS = {
  day_startX: SCREEN.centerX - DIGITS.width,
  day_startY: SCREEN.centerY - DIGITS.height / 2,
  day_align: hmUI.align.CENTER_H,
  day_zero: 0,
  day_en_array: DIGITS.images,
  show_level: hmUI.show_level.ONLY_NORMAL,
};
