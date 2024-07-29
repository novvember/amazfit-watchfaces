import { COLORS, FONTS, FONT_SIZE } from '../utils/constants';

export const BACKGROUND_IMAGE_PROPS = {
  x: 0,
  y: 0,
  src: 'common/background.png',
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const HOUR_TEXT_PROPS = {
  x: px(53),
  y: px(294),
  w: px(130),
  h: px(80),
  color: COLORS.primary,
  text_size: FONT_SIZE.time,
  align_h: hmUI.align.RIGHT,
  align_v: hmUI.align.CENTER_V,
  font: FONTS.primary,
  text: '00',
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const TIME_COLON_TEXT_PROPS = {
  x: px(182),
  y: px(294),
  w: px(24),
  h: px(80),
  color: COLORS.primary,
  text_size: FONT_SIZE.time,
  align_h: hmUI.align.CENTER_H,
  align_v: hmUI.align.CENTER_V,
  font: FONTS.primary,
  text: ':',
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const MINUTE_TEXT_PROPS = {
  x: px(203),
  y: px(294),
  w: px(130),
  h: px(80),
  color: COLORS.primary,
  text_size: FONT_SIZE.time,
  align_h: hmUI.align.LEFT,
  align_v: hmUI.align.CENTER_V,
  font: FONTS.primary,
  text: '00',
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const SECOND_TEXT_PROPS = {
  x: px(333),
  y: px(325),
  w: px(90),
  h: px(46),
  color: COLORS.primary,
  text_size: FONT_SIZE.seconds,
  align_h: hmUI.align.LEFT,
  align_v: hmUI.align.CENTER_V,
  font: FONTS.primary,
  text: '00',
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const TIME_POSTFIX_TEXT_PROPS = {
  x: px(32),
  y: px(294),
  w: px(30),
  h: px(80),
  color: COLORS.primary,
  text_size: FONT_SIZE.secondary,
  align_h: hmUI.align.RIGHT,
  align_v: hmUI.align.CENTER_V,
  font: FONTS.primary,
  text: 'P',
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const DATE_TEXT_PROPS = {
  x: px(337),
  y: px(302),
  w: px(130),
  h: px(24),
  color: COLORS.primary,
  text_size: FONT_SIZE.secondary,
  align_h: hmUI.align.LEFT,
  align_v: hmUI.align.CENTER_V,
  font: FONTS.secondary,
  text: 'SUN 00/31',
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const CITY_TEXT_PROPS = {
  x: px(28),
  y: px(266),
  w: px(332),
  h: px(36),
  color: COLORS.primary,
  text_size: FONT_SIZE.secondary,
  align_h: hmUI.align.CENTER_H,
  align_v: hmUI.align.CENTER_V,
  font: FONTS.secondary,
  text: 'CITY',
  text_style: hmUI.text_style.ELLIPSIS,
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const STATUS_LIGHT_PROPS = {
  x: px(121),
  y: px(383),
  src: 'status/lt.png',
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const STATUS_VIB_PROPS = {
  x: px(161),
  y: px(380),
  src: 'status/vib.png',
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const STATUS_VIB_OFF_PROPS = {
  x: px(161),
  y: px(380),
  src: 'status/vib_off.png',
  type: hmUI.system_status.DISTURB,
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const STATUS_ALARM_PROPS = {
  x: px(191),
  y: px(372),
  src: 'status/alarm.png',
  type: hmUI.system_status.CLOCK,
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const STATUS_DND_PROPS = {
  x: px(252),
  y: px(375),
  type: hmUI.system_status.DISTURB,
  src: 'status/mute.png',
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const STATUS_LOCK_PROPS = {
  x: px(293),
  y: px(381),
  type: hmUI.system_status.LOCK,
  src: 'status/lock.png',
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const STATUS_BATTERY_PROPS = {
  x: px(335),
  y: px(381),
  src: 'status/battery_alarm.png',
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const SUN_IMAGE_PROPS = {
  x: px(47),
  y: px(108),
  src: 'sun/sun.png',
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const SUNRISE_TEXT_PROPS = {
  x: px(132),
  y: px(108),
  w: px(100),
  h: px(26),
  color: COLORS.primary,
  text_size: FONT_SIZE.secondary,
  align_h: hmUI.align.LEFT,
  align_v: hmUI.align.CENTER_V,
  font: FONTS.secondary,
  text: '00:00 P',
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const SUNSET_TEXT_PROPS = {
  ...SUNRISE_TEXT_PROPS,
  y: px(136),
};

export const STATUS_CONNECTED_PROPS = {
  x: px(73),
  y: px(72),
  src: 'status/connected.png',
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const STATUS_DISCONNECTED_PROPS = {
  x: px(73),
  y: px(72),
  src: 'status/disconnected.png',
  type: hmUI.system_status.DISCONNECT,
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const BATTERY_IMAGE_PROPS = {
  x: px(117),
  y: px(74),
  src: 'battery/battery.png',
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const BATTERY_TEXT_PROPS = {
  x: px(117),
  y: px(74),
  w: px(60),
  h: px(24),
  color: COLORS.background,
  text_size: FONT_SIZE.tertiary,
  align_h: hmUI.align.CENTER_H,
  align_v: hmUI.align.CENTER_V,
  font: FONTS.secondary,
  text: '100%',
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const HEART_IMAGE_PROPS = {
  x: px(203),
  y: px(72),
  src: 'heart/heart.png',
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const HEART_TEXT_PROPS = {
  x: px(238),
  y: px(72),
  w: px(100),
  h: px(27),
  color: COLORS.primary,
  text_size: FONT_SIZE.secondary,
  align_h: hmUI.align.LEFT,
  align_v: hmUI.align.CENTER_V,
  font: FONTS.secondary,
  text: '--',
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const TODAY_RECT_PROPS = {
  x: px(300),
  y: px(72),
  w: px(100),
  h: px(28),
  radius: px(4),
  color: COLORS.primary,
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const TODAY_TEXT_PROPS = {
  x: px(300),
  y: px(72),
  w: px(100),
  h: px(28),
  color: COLORS.background,
  text_size: FONT_SIZE.secondary,
  align_h: hmUI.align.CENTER_H,
  align_v: hmUI.align.CENTER_V,
  font: FONTS.secondary,
  text: 'TODAY',
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const TODAY_STEPS_PROPS = {
  x: px(217),
  y: px(100),
  w: px(216),
  h: px(40),
  color: COLORS.primary,
  text_size: FONT_SIZE.today,
  align_h: hmUI.align.RIGHT,
  align_v: hmUI.align.CENTER_V,
  font: FONTS.primary,
  text: '00000 steps',
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const TODAY_PAI_PROPS = {
  x: px(178),
  y: px(129),
  w: px(216),
  h: px(40),
  color: COLORS.primary,
  text_size: FONT_SIZE.today,
  align_h: hmUI.align.RIGHT,
  align_v: hmUI.align.CENTER_V,
  font: FONTS.primary,
  text: '000 pai',
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const MOON_LEVEL_PROPS = {
  x: px(54),
  y: px(174),
  image_array: new Array(28).fill(null).map((_, i) => `moon/${i + 1}.png`),
  image_length: 29,
  type: hmUI.data_type.MOON,
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const DIAGRAM_BACKGROUND_PROPS = {
  x: px(123),
  y: px(162),
  src: 'diagram/background.png',
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const DIAGRAM_MARK_PROPS = {
  x: 0,
  y: px(248),
  src: 'diagram/mark.png',
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const DIAGRAM_TEXT_PROPS = {
  x: 0,
  y: px(228),
  w: px(32),
  h: px(32),
  color: COLORS.primary,
  text_size: FONT_SIZE.secondary,
  align_h: hmUI.align.CENTER_H,
  align_v: hmUI.align.CENTER_V,
  font: FONTS.secondary,
  text: '00',
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const DIAGRAM_BAR_PROPS = {
  x: 0,
  y: px(172),
  w: px(32),
  h: px(56),
  color: COLORS.primary,
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const DIAGRAM_BAR_EMPTY_PROPS = {
  x: 0,
  y: px(172),
  src: 'diagram/empty_bar.png',
  show_level: hmUI.show_level.ONLY_NORMAL,
};
