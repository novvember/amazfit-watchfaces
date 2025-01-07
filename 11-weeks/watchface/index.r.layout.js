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
  SCREEN,
} from '../utils/constants';

// #region Cell
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

// #region Year
export const YEAR_IMAGE_PROPS = {
  x: 0,
  y: 0,
  src: '',
  show_level: hmUI.show_level.ONLY_NORMAL,
};

// #region Month
export const MONTH_IMAGE_PROPS = {
  x: 0,
  y: 0,
  src: '',
  show_level: hmUI.show_level.ONLY_NORMAL,
};

// #region Weekday
export const WEEKDAY_IMAGE_PROPS = {
  x: 0,
  y: 0,
  src: '',
  show_level: hmUI.show_level.ONLY_NORMAL,
};

// #region Dot
export const DOT_IMAGE_PROPS = {
  x: 0,
  y: 0,
  src: `dot/dot.png`,
  show_level: hmUI.show_level.ONLY_NORMAL,
};

// #region Seconds
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

// #region Steps
export const STEPS_PROGRESS_PROPS = {
  x: STEPS.progressImage.x,
  y: STEPS.progressImage.y,
  src: 'steps/0.png',
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const STEPS_TEXT_IMAGE_PROPS = {
  x: STEPS.text.x,
  y: STEPS.text.y,
  type: hmUI.data_type.STEP,
  font_array: DIGITS.images,
  align_h: hmUI.align.RIGHT,
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const STEPS_ICON_IMAGE_PROPS = {
  x: STEPS.icon.x,
  y: STEPS.icon.y,
  src: SPECIAL_CHARS.walk.src,
  show_level: hmUI.show_level.ONLY_NORMAL,
};

// #region Pulse
export const PULSE_BACKGROUND_ARC_PROPS = {
  center_x: SCREEN.centerX,
  center_y: SCREEN.centerY,
  radius: PULSE.progressArc.radius,
  start_angle: PULSE.progressArc.angleStart,
  end_angle: PULSE.progressArc.angleEnd,
  color: COLORS.secondary,
  line_width: PULSE.progressArc.lineWidth,
  level: 100,
  corner_flag: 3,
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const PULSE_TODAY_ARC_PROPS = {
  ...PULSE_BACKGROUND_ARC_PROPS,
  color: COLORS.primary,
  corner_flag: 0,
};

export const PULSE_LAST_ARC_PROPS = {
  ...PULSE_BACKGROUND_ARC_PROPS,
  color: COLORS.accent,
  line_width: PULSE.progressArc.lineWidth - 2,
  corner_flag: 0,
};

export const PULSE_TEXT_IMAGE_PROPS = {
  x: PULSE.text.x,
  y: PULSE.text.y,
  type: hmUI.data_type.HEART,
  font_array: DIGITS.images,
  align_h: hmUI.align.RIGHT,
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const PULSE_ICON_IMAGE_PROPS = {
  x: PULSE.icon.x,
  y: PULSE.icon.y,
  src: SPECIAL_CHARS.heart.src,
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const PULSE_MIN_TEXT_PROPS = {
  x: PULSE.minText.x,
  y: PULSE.minText.y,
  w: PULSE.text.width,
  h: PULSE.text.height,
  color: COLORS.primary,
  text_size: PULSE.text.textSize,
  align_h: hmUI.align.RIGHT,
  align_v: hmUI.align.TOP,
  font: FONTS.digits,
  text: '',
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const PULSE_MAX_TEXT_PROPS = {
  ...PULSE_MIN_TEXT_PROPS,
  x: PULSE.maxText.x,
  y: PULSE.maxText.y,
};

// #region Battery
export const BATTERY_PROGRESS_PROPS = {
  x: BATTERY.progressImage.x,
  y: BATTERY.progressImage.y,
  src: 'battery/0.png',
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const BATTERY_TEXT_IMAGE_PROPS = {
  x: BATTERY.text.x,
  y: BATTERY.text.y,
  type: hmUI.data_type.BATTERY,
  font_array: DIGITS.images,
  unit_en: SPECIAL_CHARS.percent.src,
  align_h: hmUI.align.LEFT,
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const BATTERY_ICON_IMAGE_PROPS = {
  x: BATTERY.icon.x,
  y: BATTERY.icon.y,
  src: SPECIAL_CHARS.battery.src,
  show_level: hmUI.show_level.ONLY_NORMAL,
};

// #region Sleep time
export const SLEEP_PROGRESS_PROPS = {
  x: SLEEP.progressImage.x,
  y: SLEEP.progressImage.y,
  src: 'sleep/0.png',
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const SLEEP_TEXT_PROPS = {
  x: SLEEP.text.x,
  y: SLEEP.text.y,
  w: SLEEP.text.width,
  h: SLEEP.text.height,
  color: COLORS.primary,
  text_size: SLEEP.text.textSize,
  align_h: hmUI.align.LEFT,
  align_v: hmUI.align.TOP,
  font: FONTS.digits,
  text: '',
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const SLEEP_ICON_IMAGE_PROPS = {
  x: SLEEP.icon.x,
  y: SLEEP.icon.y,
  src: SPECIAL_CHARS.moon.src,
  alpha: 255,
  show_level: hmUI.show_level.ONLY_NORMAL,
};

// #region Connection status
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

// #region Alarm status
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

// #region AOD
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

export const AOD_DATE_IMAGE_PROPS = {
  x: 0,
  y: 0,
  src: 'cell_aod/0.png',
  show_level: hmUI.show_level.ONAL_AOD,
};
