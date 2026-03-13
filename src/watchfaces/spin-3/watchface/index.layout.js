import {
  COLORS,
  FONTS,
  TEXT_SIZE,
  MINUTE,
  MARK_SRC,
  BATTERY_PHASE_IMAGES,
} from '../utils/constants';

const { width, height } = hmSetting.getDeviceInfo();

export const SCREEN = {
  width,
  height,
  centerX: width / 2,
  centerY: height / 2,
};

const BACKGROUND_SIZE = px(480);

export const BACKGROUND_IMAGE_PROPS = {
  x: SCREEN.centerX - BACKGROUND_SIZE / 2,
  y: SCREEN.centerY - BACKGROUND_SIZE / 2,
  src: 'raw/common/background.png',
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const BACKGROUND_AOD_IMAGE_PROPS = {
  ...BACKGROUND_IMAGE_PROPS,
  src: 'raw/common/background_aod.png',
  show_level: hmUI.show_level.ONAL_AOD,
};

export const MARK_IMAGE_PROPS = {
  x: 0,
  y: SCREEN.centerY - px(240),
  pos_x: SCREEN.centerX - px(10) / 2,
  pos_y: px(114),
  w: px(480),
  h: px(480),
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
  font: FONTS.aod,
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
  font: FONTS.aod,
  show_level: hmUI.show_level.ONAL_AOD,
};

export const DATE_TEXT_PROPS = {
  x: px(253),
  y: px(60) + SCREEN.centerY - px(240),
  w: px(160),
  h: px(60),
  color: COLORS.data,
  text_size: TEXT_SIZE.data,
  align_h: hmUI.align.RIGHT,
  align_v: hmUI.align.CENTER_V,
  font: FONTS.data,
  text: 'XXX 00',
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const WEATHER_TEXT_PROPS = {
  x: px(66),
  y: px(60) + SCREEN.centerY - px(240),
  w: px(160),
  h: px(60),
  align_h: hmUI.align.LEFT,
  align_v: hmUI.align.CENTER_V,
  text_size: TEXT_SIZE.data,
  color: COLORS.data,
  font: FONTS.data,
  type: hmUI.data_type.WEATHER_CURRENT,
  unit_type: 1,
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const STEPS_TEXT_PROPS = {
  x: px(66),
  y: px(363) + SCREEN.centerY - px(240),
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
  y: px(363) + SCREEN.centerY - px(240),
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

const BATTERY_SIZE = px(28);

export const BATTERY_LEVEL_PROPS = {
  x: px(436),
  y: SCREEN.centerY - BATTERY_SIZE / 2,
  image_array: BATTERY_PHASE_IMAGES,
  image_length: BATTERY_PHASE_IMAGES.length,
  type: hmUI.data_type.BATTERY,
  show_level: hmUI.show_level.ONLY_NORMAL,
};

const DISCONNECT_SIZE = px(40);

export const DISCONNECT_STATUS_PROPS = {
  x: px(11),
  y: SCREEN.centerY - DISCONNECT_SIZE / 2,
  type: hmUI.system_status.DISCONNECT,
  src: 'raw/common/disconnect.png',
  show_level: hmUI.show_level.ONLY_NORMAL,
};
