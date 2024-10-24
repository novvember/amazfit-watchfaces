import {
  BATTERY,
  COLORS,
  DATE_TEXT,
  DATE_WEEK,
  DISCONNECT,
  FONT_FAMILY,
  FONT_SIZE,
  PULSE,
  SECONDS,
  SLEEP,
  STEPS,
  TIME,
  WEATHER,
} from '../utils/constants';

export const SLEEP_NO_DATA_IMAGE_PROPS = {
  x: SLEEP.x,
  y: SLEEP.y,
  w: SLEEP.width,
  h: SLEEP.height,
  src: 'sleep/no_data.png',
  show_level: hmUI.show_level.ONLY_NORMAL,
  alpha: 255,
};

export const SLEEP_TEXT_PROPS = {
  x: SLEEP.x,
  y: SLEEP.y,
  w: SLEEP.width,
  h: SLEEP.height,
  color: COLORS.textSecondary,
  text_size: FONT_SIZE.secondary,
  align_h: hmUI.align.CENTER_H,
  align_v: hmUI.align.CENTER_V,
  font: FONT_FAMILY.primary,
  text: '00:00\nsleep',
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const SLEEP_ARC_PROPS = {
  center_x: SLEEP.x + SLEEP.width / 2,
  center_y: SLEEP.y + SLEEP.height / 2,
  radius: (SLEEP.width - SLEEP.lineWidth) / 2,
  start_angle: 0,
  end_angle: 270,
  color: COLORS.accent,
  line_width: SLEEP.lineWidth,
  level: 100,
  corner_flag: 3,
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const SLEEP_WAKE_STAGE_ARC_PROPS = {
  ...SLEEP_ARC_PROPS,
  radius: SLEEP.wakeStagesArcRadius,
  color: COLORS.bgOnAccent,
  line_width: SLEEP.wakeStagesArcWidth,
  start_angle: 0,
  end_angle: 0,
};

export const DATE_WEEK_PROPS = {
  x: DATE_WEEK.x,
  y: DATE_WEEK.y,
  week_en: DATE_WEEK.weeksArray,
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const DATE_TEXT_PROPS = {
  x: DATE_TEXT.x,
  y: DATE_TEXT.y,
  w: DATE_TEXT.width,
  h: DATE_TEXT.height,
  color: COLORS.accent,
  text_size: FONT_SIZE.secondary,
  align_h: hmUI.align.CENTER_H,
  align_v: hmUI.align.CENTER_V,
  font: FONT_FAMILY.primary,
  text: 'Jan\n00',
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const SECONDS_BACKGROUND_PROPS = {
  x: SECONDS.x,
  y: SECONDS.y,
  w: SECONDS.width,
  h: SECONDS.height,
  src: 'seconds/background.png',
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const SECONDS_POINTER_PROPS = {
  second_centerX: SECONDS.x + SECONDS.width / 2,
  second_centerY: SECONDS.y + SECONDS.height / 2,
  second_posX: px(1.5),
  second_posY: px(59),
  second_path: 'seconds/pointer.png',
  second_cover_path: 'seconds/cover.png',
  second_cover_x: SECONDS.x + SECONDS.cover.x,
  second_cover_y: SECONDS.y + SECONDS.cover.y,
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const TIME_BACKGROUND_PROPS = {
  x: TIME.x,
  y: TIME.y,
  w: TIME.width,
  h: TIME.height,
  radius: TIME.radius,
  color: COLORS.bgPrimary,
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const TIME_TEXT_PROPS = {
  x: TIME.x,
  y: TIME.y,
  w: TIME.width,
  h: TIME.height,
  color: COLORS.textPrimary,
  text_size: FONT_SIZE.primary,
  align_h: hmUI.align.CENTER_H,
  align_v: hmUI.align.CENTER_V,
  font: FONT_FAMILY.primary,
  text: '00:00',
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const WEATHER_BACKGROUND_PROPS = {
  x: WEATHER.x,
  y: WEATHER.y,
  w: WEATHER.width,
  h: WEATHER.height,
  radius: WEATHER.radius,
  color: COLORS.bgSecondary,
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const WEATHER_ICON_PROPS = {
  x: WEATHER.icon.x,
  y: WEATHER.icon.y,
  src: '',
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const WEATHER_TEXT_PROPS = {
  x: WEATHER.text.x,
  y: WEATHER.y,
  w: WEATHER.text.width,
  h: WEATHER.height,
  align_h: hmUI.align.LEFT,
  align_v: hmUI.align.CENTER_V,
  text_size: FONT_SIZE.primary,
  color: COLORS.textSecondary,
  type: hmUI.data_type.WEATHER_CURRENT,
  unit_type: 1,
  font: FONT_FAMILY.primary,
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const WEATHER_NO_ICON_TEXT_PROPS = {
  ...WEATHER_TEXT_PROPS,
  x: WEATHER.x,
  w: WEATHER.width,
  align_h: hmUI.align.CENTER_H,
};

export const STEPS_TEXT_PROPS = {
  x: STEPS.x,
  y: STEPS.y,
  w: STEPS.width,
  h: STEPS.height,
  color: COLORS.textSecondary,
  text_size: FONT_SIZE.secondary,
  align_h: hmUI.align.CENTER_H,
  align_v: hmUI.align.CENTER_V,
  font: FONT_FAMILY.primary,
  text: '00000\nsteps',
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const STEPS_ARC_PROPS = {
  center_x: STEPS.x + STEPS.width / 2,
  center_y: STEPS.y + STEPS.height / 2,
  radius: STEPS.width / 4,
  start_angle: 0,
  end_angle: 360,
  color: COLORS.accent,
  line_width: STEPS.width / 2,
  level: 100,
  corner_flag: 3,
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const STEPS_BACKGROUND_PROPS = {
  center_x: STEPS.x + STEPS.width / 2,
  center_y: STEPS.y + STEPS.height / 2,
  radius: STEPS.width / 2,
  color: COLORS.bgTertiary,
  line_width: STEPS.width / 2,
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const PULSE_TEXT_PROPS = {
  x: PULSE.x,
  y: PULSE.y,
  w: PULSE.width,
  h: PULSE.height,
  color: COLORS.textSecondary,
  text_size: FONT_SIZE.secondary,
  align_h: hmUI.align.CENTER_H,
  align_v: hmUI.align.BOTTOM,
  font: FONT_FAMILY.primary,
  text: '—',
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const PULSE_ICON_PROPS = {
  x: PULSE.icon.x,
  y: PULSE.icon.y,
  src: 'pulse/heart.png',
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const PULSE_CURRENT_POINTER_PROPS = {
  x: PULSE.x,
  y: PULSE.y,
  w: PULSE.width,
  h: PULSE.height,
  pos_x: (PULSE.width - PULSE.pointer.size) / 2,
  pos_y: 0,
  center_x: PULSE.width / 2,
  center_y: PULSE.height / 2,
  angle: PULSE.angleStart,
  src: 'pulse/currentPointer.png',
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const PULSE_PREV_POINTER_PROPS = {
  ...PULSE_CURRENT_POINTER_PROPS,
  src: 'pulse/prevPointer.png',
};

export const PULSE_ARC_PROPS = {
  center_x: PULSE.x + PULSE.width / 2,
  center_y: PULSE.y + PULSE.height / 2,
  radius: (PULSE.width - PULSE.lineWidth) / 2,
  start_angle: PULSE.angleStart,
  end_angle: PULSE.angleEnd,
  color: COLORS.bgTertiary,
  line_width: PULSE.lineWidth,
  level: 100,
  corner_flag: 3,
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const BATTERY_TEXT_PROPS = {
  x: BATTERY.x,
  y: BATTERY.y,
  w: BATTERY.width,
  h: BATTERY.height,
  color: COLORS.textSecondary,
  text_size: FONT_SIZE.secondary,
  align_h: hmUI.align.CENTER_H,
  align_v: hmUI.align.CENTER_V,
  font: FONT_FAMILY.primary,
  text: '000\nbattery',
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const BATTERY_PROGRESS_PROPS = {
  x: BATTERY.x,
  y: BATTERY.y,
  src: 'battery/0.png',
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const DISCONNECT_PROPS = {
  x: DISCONNECT.x,
  y: DISCONNECT.y,
  type: hmUI.system_status.DISCONNECT,
  src: 'disconnect/disconnect.png',
  show_level: hmUI.show_level.ONLY_NORMAL,
};
