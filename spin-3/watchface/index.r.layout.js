import {
  COLORS,
  SCREEN,
  FONTS,
  TEXT_SIZE,
  MINUTE,
  MOON_PHASE_IMAGES,
  MARK_SRC,
} from '../utils/constants';

export const BACKGROUND_IMAGE_PROPS = {
  x: 0,
  y: 0,
  src: 'common/background.png',
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const MARK_IMAGE_PROPS = {
  x: 0,
  y: 0,
  pos_x: SCREEN.centerX - px(10) / 2,
  pos_y: px(114),
  w: SCREEN.width,
  h: SCREEN.height,
  src: MARK_SRC.general,
  center_x: SCREEN.centerX,
  center_y: SCREEN.centerX,
  angle: 0,
  alpha: 255,
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const MARK_AOD_IMAGE_PROPS = {
  ...MARK_IMAGE_PROPS,
  src: MARK_SRC.aod,
  show_level: hmUI.show_level.ONAL_AOD,
};

export const HOUR_TEXT_PROPS = {
  x: SCREEN.centerX - px(140) / 2,
  y: SCREEN.centerY - px(140) / 2,
  w: px(140),
  h: px(140),
  color: COLORS.accent,
  text_size: TEXT_SIZE.hour,
  align_h: hmUI.align.CENTER_H,
  align_v: hmUI.align.CENTER_V,
  font: FONTS.hour,
  text: '00',
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const HOUR_AOD_TEXT_PROPS = {
  ...HOUR_TEXT_PROPS,
  color: COLORS.aod,
  show_level: hmUI.show_level.ONAL_AOD,
};

export const MINUTE_TEXT_PROPS = {
  x: 0,
  y: 0,
  w: MINUTE.size,
  h: MINUTE.size,
  color: COLORS.minute,
  text_size: TEXT_SIZE.minute,
  align_h: hmUI.align.CENTER_H,
  align_v: hmUI.align.CENTER_V,
  font: FONTS.minute,
  text: '00',
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const MINUTE_AOD_TEXT_PROPS = {
  ...MINUTE_TEXT_PROPS,
  color: COLORS.aod,
  show_level: hmUI.show_level.ONAL_AOD,
};

export const DATE_TEXT_PROPS = {
  x: px(66),
  y: px(60),
  w: px(160),
  h: px(60),
  color: COLORS.data,
  text_size: TEXT_SIZE.data,
  align_h: hmUI.align.LEFT,
  align_v: hmUI.align.CENTER_V,
  font: FONTS.data,
  text: '00 XXX',
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const WEEKDAY_TEXT_PROPS = {
  x: px(253),
  y: px(60),
  w: px(160),
  h: px(60),
  color: COLORS.data,
  text_size: TEXT_SIZE.data,
  align_h: hmUI.align.RIGHT,
  align_v: hmUI.align.CENTER_V,
  font: FONTS.data,
  text: 'XXX',
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const STEPS_TEXT_PROPS = {
  x: px(66),
  y: px(363),
  w: px(160),
  h: px(60),
  color: COLORS.data,
  text_size: TEXT_SIZE.data,
  align_h: hmUI.align.LEFT,
  align_v: hmUI.align.CENTER_V,
  font: FONTS.data,
  text: '00.000.',
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const SLEEP_TEXT_PROPS = {
  x: px(253),
  y: px(363),
  w: px(160),
  h: px(60),
  color: COLORS.data,
  text_size: TEXT_SIZE.data,
  align_h: hmUI.align.RIGHT,
  align_v: hmUI.align.CENTER_V,
  font: FONTS.data,
  text: '00:00',
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const MOON_LEVEL_PROPS = {
  x: px(436),
  y: px(226),
  image_array: MOON_PHASE_IMAGES,
  image_length: MOON_PHASE_IMAGES.length,
  type: hmUI.data_type.MOON,
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const DISCONNECT_STATUS_PROPS = {
  x: px(16),
  y: px(225),
  type: hmUI.system_status.DISCONNECT,
  src: 'common/disconnect.png',
  show_level: hmUI.show_level.ONLY_NORMAL,
};
