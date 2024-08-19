import {
  ARC,
  DIGITS,
  SPECIAL_CHARS,
  SCREEN,
  STEPS,
  BATTERY,
  SLEEP,
  CONNECTION_STATUS,
  ALARM_STATUS,
  FONT,
  COLORS,
  WEATHER_ICON,
  WEATHER_TEXT,
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
export const STEPS_TEXT_IMAGE_PROPS = {
  x: SCREEN.centerX + ARC.radius - ARC.width - DIGITS.width * 5,
  y: SCREEN.centerY - DIGITS.height / 2,
  type: hmUI.data_type.STEP,
  font_array: DIGITS.images,
  align_h: hmUI.align.RIGHT,
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const STEPS_ARC_BACKGROUND_PROPS = {
  center_x: SCREEN.centerX,
  center_y: SCREEN.centerY,
  radius: ARC.radius,
  start_angle: STEPS.angleStart,
  end_angle: STEPS.angleEnd,
  color: ARC.colorBackground,
  line_width: ARC.width,
  level: 100,
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const STEPS_ARC_ACTIVE_PROPS = {
  center_x: SCREEN.centerX,
  center_y: SCREEN.centerY,
  radius: ARC.radius,
  start_angle: STEPS.angleStart,
  end_angle: STEPS.angleEnd,
  color: ARC.colorActive,
  line_width: ARC.width,
  type: hmUI.data_type.STEP,
  show_level: hmUI.show_level.ONLY_NORMAL,
};

// BATTERY
export const BATTERY_TEXT_IMAGE_PROPS = {
  x: BATTERY.x,
  y: BATTERY.y,
  type: hmUI.data_type.BATTERY,
  font_array: DIGITS.images,
  unit_en: SPECIAL_CHARS.percent.src,
  align_h: hmUI.align.LEFT,
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const BATTERY_ARC_BACKGROUND_PROPS = {
  center_x: SCREEN.centerX,
  center_y: SCREEN.centerY,
  radius: ARC.radius,
  start_angle: BATTERY.angleStart,
  end_angle: BATTERY.angleEnd,
  color: ARC.colorBackground,
  line_width: ARC.width,
  level: 100,
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const BATTERY_ARC_ACTIVE_PROPS = {
  center_x: SCREEN.centerX,
  center_y: SCREEN.centerY,
  start_angle: BATTERY.angleStart,
  end_angle: BATTERY.angleEnd,
  radius: ARC.radius,
  line_width: ARC.width,
  corner_flag: 0,
  color: ARC.colorActive,
  type: hmUI.data_type.BATTERY,
  show_level: hmUI.show_level.ONLY_NORMAL,
};

// SLEEP TIME
export const SLEEP_ARC_BACKGROUND_PROPS = {
  center_x: SCREEN.centerX,
  center_y: SCREEN.centerY,
  radius: ARC.radius,
  start_angle: SLEEP.angleStart,
  end_angle: SLEEP.angleEnd,
  color: ARC.colorBackground,
  line_width: ARC.width,
  level: 100,
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const SLEEP_ARC_ACTIVE_PROPS = {
  center_x: SCREEN.centerX,
  center_y: SCREEN.centerY,
  start_angle: SLEEP.angleStart,
  end_angle: SLEEP.angleEnd,
  radius: ARC.radius,
  line_width: ARC.width,
  corner_flag: 0,
  color: ARC.colorActive,
  type: hmUI.data_type.SLEEP,
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
  align_v: hmUI.align.CENTER_V,
  font: FONT,
  text: '',
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

// WEATHER
export const WEATHER_ICON_PROPS = {
  x: WEATHER_ICON.x,
  y: WEATHER_ICON.y,
  src: '',
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const WEATHER_TEXT_PROPS = {
  x: WEATHER_TEXT.x,
  y: WEATHER_TEXT.y,
  type: hmUI.data_type.WEATHER_CURRENT,
  font_array: DIGITS.images,
  align_h: hmUI.align.LEFT,
  unit_en: SPECIAL_CHARS.degree.src,
  negative_image: SPECIAL_CHARS.minus.src,
  invalid_image: 'empty.png',
  show_level: hmUI.show_level.ONLY_NORMAL,
};
