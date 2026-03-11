import { FONTS } from '../utils/constants';

export const BACKGROUND_IMAGE_PROPS = {
  x: px(0),
  y: px(0),
  src: 'background/background.png',
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const BACKGROUND_AOD_IMAGE_PROPS = {
  x: px(0),
  y: px(0),
  src: 'background/background_aod.png',
  show_level: hmUI.show_level.ONAL_AOD,
};

export const TIME_POINTERS_PROPS = {
  hour_centerX: px(240),
  hour_centerY: px(240),
  hour_posX: px(10),
  hour_posY: px(240),
  hour_path: 'time/hour.png',

  minute_centerX: px(240),
  minute_centerY: px(240),
  minute_posX: px(10),
  minute_posY: px(240),
  minute_path: 'time/minute.png',

  second_centerX: px(240),
  second_centerY: px(240),
  second_posX: px(10),
  second_posY: px(240),
  second_path: 'time/second.png',

  second_cover_y: px(240 - 16),
  second_cover_x: px(240 - 16),
  second_cover_path: 'time/top.png',

  fresh_frequency: 10,

  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const TIME_SHADOW_POINTERS_PROPS = {
  hour_centerX: px(240 + 4),
  hour_centerY: px(240 + 4),
  hour_posX: px(10),
  hour_posY: px(240),
  hour_path: 'time_shadow/hour.png',

  minute_centerX: px(240 + 4),
  minute_centerY: px(240 + 4),
  minute_posX: px(10),
  minute_posY: px(240),
  minute_path: 'time_shadow/minute.png',

  second_centerX: px(240 + 4),
  second_centerY: px(240 + 4),
  second_posX: px(10),
  second_posY: px(240),
  second_path: 'time_shadow/second.png',

  second_cover_y: px(240 - 16 + 4),
  second_cover_x: px(240 - 16 + 4),
  second_cover_path: 'time_shadow/top.png',

  fresh_frequency: 10,

  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const TIME_AOD_POINTERS_PROPS = {
  hour_centerX: px(240),
  hour_centerY: px(240),
  hour_posX: px(10),
  hour_posY: px(240),
  hour_path: 'time_aod/hour.png',

  minute_centerX: px(240),
  minute_centerY: px(240),
  minute_posX: px(10),
  minute_posY: px(240),
  minute_path: 'time_aod/minute.png',

  minute_cover_y: px(240 - 16),
  minute_cover_x: px(240 - 16),
  minute_cover_path: 'time_aod/top.png',

  show_level: hmUI.show_level.ONAL_AOD,
};

export const TEXT_PROPS = {
  x: px(30),
  y: 0,
  w: px(420),
  h: 0,
  color: 0xffffff,
  text_size: 0,
  align_h: hmUI.align.CENTER_H,
  align_v: hmUI.align.CENTER_V,
  font: FONTS.primary,
  text: '',
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const TEXT_AOD_PROPS = {
  x: px(30),
  y: 0,
  w: px(420),
  h: 0,
  color: 0xb1b1b1,
  text_size: 0,
  align_h: hmUI.align.CENTER_H,
  align_v: hmUI.align.CENTER_V,
  font: FONTS.aod,
  text: '',
  show_level: hmUI.show_level.ONAL_AOD,
};

export const BATTERY_TEXT_PROPS = {
  ...TEXT_PROPS,
  y: px(355),
  h: px(30),
  text_size: px(30),
  type: hmUI.data_type.BATTERY,
  unit_type: 0,
};

export const BATTERY_ARC_PROPS = {
  color: 0xffffff,
  center_x: px(240),
  center_y: px(370),
  radius: px(30),
  start_angle: 0,
  end_angle: 360,
  line_width: px(6),
  corner_flag: 1,
  type: hmUI.data_type.BATTERY,
  show_level: hmUI.show_level.ONLY_NORMAL,
};
