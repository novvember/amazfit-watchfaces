import {
  DIGITS,
  SPECIAL_CHARS,
  STEPS,
  BATTERY,
  SLEEP,
  CONNECTION_STATUS,
  ALARM_STATUS,
  FONTS,
  COLORS,
  TIME_DIGITS_AOD,
  PULSE,
} from '../utils/constants';

// CELL
export const CELL_IMAGE_PROPS = {
  x: 0,
  y: 0,
  src: '',
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const CELL_DATE_IMAGE_PROPS = {
  x: 0,
  y: 0,
  src: '',
  show_level: hmUI.show_level.ONLY_NORMAL,
};

// YEAR
export const YEAR_IMAGE_PROPS = {
  x: 0,
  y: 0,
  src: '',
  show_level: hmUI.show_level.ONLY_NORMAL,
};

// MONTH
export const MONTH_IMAGE_PROPS = {
  x: 0,
  y: 0,
  src: '',
  show_level: hmUI.show_level.ONLY_NORMAL,
};

// WEEKDAY
export const WEEKDAY_IMAGE_PROPS = {
  x: 0,
  y: 0,
  src: '',
  show_level: hmUI.show_level.ONLY_NORMAL,
};

// DOT
export const DOT_IMAGE_PROPS = {
  x: 0,
  y: 0,
  src: `dot/dot.png`,
  show_level: hmUI.show_level.ONLY_NORMAL,
};

// SECONDS
export const SECONDS_IMAGE_TIME_PROPS = {
  second_zero: 0,
  second_startX: 0,
  second_startY: 0,
  second_array: DIGITS.images,
  second_align: hmUI.align.CENTER_H,
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const SECONDS_PROGRESS_BAR_PROPS = {
  x: 0,
  y: 0,
  src: '',
  show_level: hmUI.show_level.ONLY_NORMAL,
};

// STEPS
export const STEPS_PROGRESS_PROPS = {
  x: STEPS.progressImage.x,
  y: STEPS.progressImage.y,
  src: 'steps/0.png',
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const STEPS_TEXT_IMAGE_PROPS = {
  x: STEPS.x,
  y: STEPS.y,
  type: hmUI.data_type.STEP,
  font_array: DIGITS.images,
  align_h: hmUI.align.RIGHT,
  show_level: hmUI.show_level.ONLY_NORMAL,
};

// PULSE
export const PULSE_PROGRESS_PROPS = {
  x: PULSE.progressImage.x,
  y: PULSE.progressImage.y,
  src: 'pulse/0.png',
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const PULSE_TEXT_IMAGE_PROPS = {
  x: PULSE.x,
  y: PULSE.y,
  type: hmUI.data_type.HEART,
  font_array: DIGITS.images,
  align_h: hmUI.align.RIGHT,
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const PULSE_ICON_IMAGE_PROPS = {
  x: PULSE.x + px(14),
  y: PULSE.y - px(22),
  src: SPECIAL_CHARS.heart.src,
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const PULSE_MIN_TEXT_PROPS = {
  x: PULSE.min.x,
  y: PULSE.min.y,
  w: PULSE.width,
  h: PULSE.height,
  color: COLORS.primary,
  text_size: PULSE.textSize,
  align_h: hmUI.align.RIGHT,
  align_v: hmUI.align.TOP,
  font: FONTS.digits,
  text: '',
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const PULSE_MAX_TEXT_PROPS = {
  ...PULSE_MIN_TEXT_PROPS,
  x: PULSE.max.x,
  y: PULSE.max.y,
};

// BATTERY
export const BATTERY_PROGRESS_PROPS = {
  x: BATTERY.progressImage.x,
  y: BATTERY.progressImage.y,
  src: 'battery/0.png',
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const BATTERY_TEXT_IMAGE_PROPS = {
  x: BATTERY.x,
  y: BATTERY.y,
  type: hmUI.data_type.BATTERY,
  font_array: DIGITS.images,
  unit_en: SPECIAL_CHARS.percent.src,
  align_h: hmUI.align.LEFT,
  show_level: hmUI.show_level.ONLY_NORMAL,
};

// SLEEP TIME
export const SLEEP_PROGRESS_PROPS = {
  x: SLEEP.progressImage.x,
  y: SLEEP.progressImage.y,
  src: 'sleep/0.png',
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const SLEEP_TEXT_PROPS = {
  x: SLEEP.x,
  y: SLEEP.y,
  w: SLEEP.width,
  h: SLEEP.height,
  color: COLORS.primary,
  text_size: SLEEP.textSize,
  align_h: hmUI.align.LEFT,
  align_v: hmUI.align.TOP,
  font: FONTS.digits,
  text: '',
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const SLEEP_ICON_IMAGE_PROPS = {
  x: SLEEP.x,
  y: SLEEP.y + px(28),
  src: SPECIAL_CHARS.moon.src,
  alpha: 255,
  show_level: hmUI.show_level.ONLY_NORMAL,
};

// CONNECTION STATUS
export const CONNECT_IMAGE_PROPS = {
  x: CONNECTION_STATUS.x,
  y: CONNECTION_STATUS.y,
  w: CONNECTION_STATUS.width,
  h: CONNECTION_STATUS.height,
  src: 'connect/connect.png',
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const DISCONNECT_IMAGE_PROPS = {
  x: CONNECTION_STATUS.x,
  y: CONNECTION_STATUS.y,
  type: hmUI.system_status.DISCONNECT,
  src: 'connect/disconnect.png',
  show_level: hmUI.show_level.ONLY_NORMAL,
};

// ALARM STATUS
export const ALARM_OFF_IMAGE_PROPS = {
  x: ALARM_STATUS.x,
  y: ALARM_STATUS.y,
  w: ALARM_STATUS.width,
  h: ALARM_STATUS.height,
  src: 'alarm/alarm_off.png',
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const ALARM_ON_IMAGE_PROPS = {
  x: ALARM_STATUS.x,
  y: ALARM_STATUS.y,
  type: hmUI.system_status.CLOCK,
  src: 'alarm/alarm_on.png',
  show_level: hmUI.show_level.ONLY_NORMAL,
};

// AOD
export const AOD_BACKGROUND_PROPS = {
  x: px(114),
  y: px(58),
  src: 'aod/background.png',
  show_level: hmUI.show_level.ONAL_AOD,
};

export const AOD_HOURS_PROPS = {
  hour_zero: 1,
  hour_startX: px(128),
  hour_startY: px(72),
  hour_array: TIME_DIGITS_AOD.images,
  hour_align: hmUI.align.LEFT,
  show_level: hmUI.show_level.ONAL_AOD,
};

export const AOD_MINUTES_PROPS = {
  minute_zero: 1,
  minute_startX: px(128),
  minute_startY: px(240),
  minute_array: TIME_DIGITS_AOD.images,
  minute_align: hmUI.align.LEFT,
  show_level: hmUI.show_level.ONAL_AOD,
};
