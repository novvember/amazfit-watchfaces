import { ARC_SIZE, COLORS, FONT_FAMILY, FONT_SIZE } from '../utils/constants';

export const SOLAR_IMAGE_PROPS = {
  x: px(0),
  y: px(480),
  src: 'background/solar.png',
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const LUNAR_IMAGE_PROPS = {
  x: px(0),
  y: px(480),
  src: 'background/lunar.png',
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const HOURS_TEXT_PROPS = {
  x: px(96),
  y: px(88),
  w: px(126),
  h: px(80),
  color: COLORS.primary,
  text_size: FONT_SIZE.primary,
  align_h: hmUI.align.CENTER_H,
  align_v: hmUI.align.CENTER_V,
  font: FONT_FAMILY.primary,
  text: '00',
  show_level: hmUI.show_level.ONLY_NORMAL | hmUI.show_level.ONAL_AOD,
};

export const MINS_TEXT_PROPS = {
  x: px(96),
  y: px(168),
  w: px(126),
  h: px(80),
  color: COLORS.primary,
  text_size: FONT_SIZE.primary,
  align_h: hmUI.align.CENTER_H,
  align_v: hmUI.align.CENTER_V,
  font: FONT_FAMILY.primary,
  text: '00',
  show_level: hmUI.show_level.ONLY_NORMAL | hmUI.show_level.ONAL_AOD,
};

export const TIME_POSTFIX_TEXT_PROPS = {
  x: px(222),
  y: px(84),
  w: px(60),
  h: px(36),
  color: COLORS.primary,
  text_size: FONT_SIZE.secondary,
  align_h: hmUI.align.LEFT,
  align_v: hmUI.align.CENTER_V,
  font: FONT_FAMILY.secondary,
  text: '',
  show_level: hmUI.show_level.ONLY_NORMAL | hmUI.show_level.ONAL_AOD,
};

export const WEEKDAY_TEXT_PROPS = {
  x: px(124),
  y: px(295),
  w: px(100),
  h: px(36),
  color: COLORS.primary,
  text_size: FONT_SIZE.secondary,
  align_h: hmUI.align.LEFT,
  align_v: hmUI.align.CENTER_V,
  font: FONT_FAMILY.secondary,
  text: 'xxx',
  show_level: hmUI.show_level.ONLY_NORMAL | hmUI.show_level.ONAL_AOD,
};

export const DATE_TEXT_PROPS = {
  x: px(124),
  y: px(330),
  w: px(100),
  h: px(36),
  color: COLORS.primary,
  text_size: FONT_SIZE.secondary,
  align_h: hmUI.align.LEFT,
  align_v: hmUI.align.CENTER_V,
  font: FONT_FAMILY.secondary,
  text: '00',
  show_level: hmUI.show_level.ONLY_NORMAL | hmUI.show_level.ONAL_AOD,
};

export const STEPS_ARC_PROPS = {
  center_x: px(271) + ARC_SIZE / 2,
  center_y: px(311) + ARC_SIZE / 2,
  radius: ARC_SIZE / 4,
  start_angle: 0,
  end_angle: 360,
  color: COLORS.secondary,
  line_width: ARC_SIZE / 2,
  level: 100,
  corner_flag: 3,
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const STEPS_TEXT_PROPS = {
  x: px(324),
  y: px(313),
  w: px(100),
  h: px(36),
  color: COLORS.secondary,
  text_size: FONT_SIZE.secondary,
  align_h: hmUI.align.LEFT,
  align_v: hmUI.align.CENTER_V,
  font: FONT_FAMILY.secondary,
  text: '00000',
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const SLEEP_ARC_PROPS = {
  center_x: px(271) + ARC_SIZE / 2,
  center_y: px(255) + ARC_SIZE / 2,
  radius: ARC_SIZE / 4,
  start_angle: 0,
  end_angle: 360,
  color: COLORS.secondary,
  line_width: ARC_SIZE / 2,
  level: 100,
  corner_flag: 3,
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const SLEEP_TEXT_PROPS = {
  x: px(324),
  y: px(257),
  w: px(100),
  h: px(36),
  color: COLORS.secondary,
  text_size: FONT_SIZE.secondary,
  align_h: hmUI.align.LEFT,
  align_v: hmUI.align.CENTER_V,
  font: FONT_FAMILY.secondary,
  text: '00:00',
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const BATTERY_ARC_PROPS = {
  center_x: px(271) + ARC_SIZE / 2,
  center_y: px(367) + ARC_SIZE / 2,
  radius: ARC_SIZE / 4,
  start_angle: 0,
  end_angle: 360,
  color: COLORS.secondary,
  line_width: ARC_SIZE / 2,
  level: 100,
  corner_flag: 3,
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const BATTERY_TEXT_PROPS = {
  x: px(324),
  y: px(369),
  w: px(100),
  h: px(36),
  color: COLORS.secondary,
  text_size: FONT_SIZE.secondary,
  align_h: hmUI.align.LEFT,
  align_v: hmUI.align.CENTER_V,
  font: FONT_FAMILY.secondary,
  text: '00%',
  show_level: hmUI.show_level.ONLY_NORMAL,
};
