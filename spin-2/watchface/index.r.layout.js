import {
  COLORS,
  HOURS,
  SCREEN,
  FONTS,
  MINUTES,
  SECONDS,
  DATE,
  UVI,
  DISCONNECT,
  STEPS,
  DIGITS,
  SLEEP_TIME,
} from '../utils/constants';

// HOURS
export function getHoursCircleProps() {
  return {
    center_x: SCREEN.centerX,
    center_y: SCREEN.centerY,
    radius: HOURS.radius,
    color: COLORS.bgSecondary,
    show_level: hmUI.show_level.ONLY_NORMAL,
  };
}

export function getHoursCircleAODProps() {
  return {
    x: SCREEN.centerX - HOURS.radius,
    y: SCREEN.centerY - HOURS.radius,
    w: HOURS.radius * 2,
    h: HOURS.radius * 2,
    radius: HOURS.radius,
    line_width: 1,
    color: COLORS.aod,
    show_level: hmUI.show_level.ONAL_AOD,
  };
}

export function getHoursTextProps() {
  return {
    x: SCREEN.centerX - HOURS.radius,
    y: SCREEN.centerY - HOURS.radius + HOURS.offsetY,
    w: HOURS.radius * 2,
    h: HOURS.radius * 2,
    color: COLORS.textPrimary,
    text_size: HOURS.textSize,
    align_h: hmUI.align.CENTER_H,
    align_v: hmUI.align.CENTER_V,
    font: FONTS.primary,
    text: '',
    show_level: hmUI.show_level.ONLY_NORMAL,
  };
}

export function getHoursTextAODProps() {
  return {
    x: SCREEN.centerX - HOURS.radius,
    y: SCREEN.centerY - HOURS.radius + HOURS.offsetY,
    w: HOURS.radius * 2,
    h: HOURS.radius * 2,
    color: COLORS.aod,
    text_size: HOURS.textSize,
    align_h: hmUI.align.CENTER_H,
    align_v: hmUI.align.CENTER_V,
    font: FONTS.primary,
    text: '',
    show_level: hmUI.show_level.ONAL_AOD,
  };
}

// MINUTES
export function getMinutesCircleProps(x = 0, y = 0) {
  return {
    center_x: x,
    center_y: y,
    radius: MINUTES.radius,
    color: COLORS.bgPrimary,
    show_level: hmUI.show_level.ONLY_NORMAL,
  };
}

export function getMinutesCircleAODProps(x = 0, y = 0) {
  return {
    center_x: x,
    center_y: y,
    radius: MINUTES.radius,
    color: 0x000000,
    show_level: hmUI.show_level.ONAL_AOD,
  };
}

export function getMinutesCircleExternalAODProps(x = 0, y = 0) {
  return {
    x: x - MINUTES.radius,
    y: y - MINUTES.radius,
    w: MINUTES.radius * 2,
    h: MINUTES.radius * 2,
    radius: MINUTES.radius,
    line_width: 1,
    color: COLORS.aod,
    show_level: hmUI.show_level.ONAL_AOD,
  };
}

export function getMinutesTextProps(x = 0, y = 0, text = '') {
  return {
    x,
    y: y + MINUTES.offsetY,
    w: MINUTES.radius * 2,
    h: MINUTES.radius * 2,
    color: COLORS.textPrimary,
    text_size: MINUTES.textSize,
    align_h: hmUI.align.CENTER_H,
    align_v: hmUI.align.CENTER_V,
    font: FONTS.primary,
    text,
    show_level: hmUI.show_level.ONLY_NORMAL,
  };
}

export function getMinutesTextAODProps(x = 0, y = 0, text = '') {
  return {
    x,
    y: y + MINUTES.offsetY,
    w: MINUTES.radius * 2,
    h: MINUTES.radius * 2,
    color: COLORS.aod,
    text_size: MINUTES.textSize,
    align_h: hmUI.align.CENTER_H,
    align_v: hmUI.align.CENTER_V,
    font: FONTS.primary,
    text,
    show_level: hmUI.show_level.ONAL_AOD,
  };
}

// SECONDS
export function getSecondsFakePointerProps() {
  return {
    second_centerX: 0,
    second_centerY: 0,
    second_posX: 0,
    second_posY: 0,
    second_path: 'empty.png',
    show_level: hmUI.show_level.ONLY_NORMAL,
  };
}

export function getSecondsImageProps() {
  return {
    x: 0,
    y: 0,
    pos_x: SCREEN.centerX - SECONDS.radius,
    pos_y: SCREEN.centerY - SECONDS.orbitRadius - SECONDS.radius,
    w: SCREEN.centerX * 2,
    h: SCREEN.centerY * 2,
    src: 'second.png',
    center_x: SCREEN.centerX,
    center_y: SCREEN.centerX,
    angle: 0,
    show_level: hmUI.show_level.ONLY_NORMAL,
  };
}

export function getSecondsAnimationProps(angle, nextAngle) {
  return {
    anim_steps: [
      {
        anim_rate: 'linear',
        anim_duration: SECONDS.animationDuration,
        anim_from: angle,
        anim_to: nextAngle,
        anim_key: 'angle',
      },
    ],
    anim_fps: 25,
    anim_auto_start: 1,
    anim_auto_destroy: 1,
    anim_repeat: 1,
  };
}

// DATE
export function getDateCircleProps() {
  return {
    center_x: SCREEN.centerX,
    center_y: SCREEN.centerY + DATE.orbitRadius,
    radius: DATE.radius,
    color: COLORS.bgTertiary,
    show_level: hmUI.show_level.ONLY_NORMAL,
  };
}

export function getDateTextProps(text = '') {
  return {
    x: SCREEN.centerX - DATE.radius,
    y: SCREEN.centerY + DATE.orbitRadius - DATE.radius,
    w: DATE.radius * 2,
    h: DATE.radius * 2,
    color: COLORS.textSecondary,
    text_size: DATE.textSize,
    align_h: hmUI.align.CENTER_H,
    align_v: hmUI.align.CENTER_V,
    font: FONTS.secondary,
    text,
    show_level: hmUI.show_level.ONLY_NORMAL,
  };
}

export function getWeekdayTextProps(text = '') {
  return {
    x: SCREEN.centerX + DATE.radius + DATE.gap,
    y: SCREEN.centerY + DATE.orbitRadius - DATE.radius,
    w: DATE.textWidth,
    h: DATE.radius * 2,
    color: COLORS.textSecondary,
    text_size: DATE.textSize,
    align_h: hmUI.align.LEFT,
    align_v: hmUI.align.CENTER_V,
    font: FONTS.secondary,
    text,
    show_level: hmUI.show_level.ONLY_NORMAL,
  };
}

// UVI
export function getUVICircleProps() {
  return {
    center_x: UVI.x + UVI.radius,
    center_y: UVI.y + UVI.radius,
    radius: UVI.radius,
    color: COLORS.bgTertiary,
    show_level: hmUI.show_level.ONLY_NORMAL,
  };
}

export function getUVIValueProps() {
  return {
    x: UVI.x + UVI.radius - DIGITS.width / 2,
    y: UVI.y + UVI.radius - DIGITS.height / 2,
    type: hmUI.data_type.UVI,
    font_array: DIGITS.images,
    show_level: hmUI.show_level.ONLY_NORMAL,
  };
}

export function getUVITextProps() {
  return {
    x: UVI.x + UVI.radius * 2 + UVI.gap,
    y: UVI.y,
    w: UVI.textWidth,
    h: UVI.radius * 2,
    color: COLORS.textSecondary,
    text_size: UVI.textSize,
    align_h: hmUI.align.LEFT,
    align_v: hmUI.align.CENTER_V,
    font: FONTS.secondary,
    text: UVI.text,
    show_level: hmUI.show_level.ONLY_NORMAL,
  };
}

// DISCONNECT
export function getDisconnectProps() {
  return {
    x: DISCONNECT.x,
    y: DISCONNECT.y,
    type: hmUI.system_status.DISCONNECT,
    src: 'disconnect.png',
    show_level: hmUI.show_level.ONLY_NORMAL,
  };
}

// STEPS
export function getStepsArcBackgroundProps() {
  return {
    center_x: SCREEN.centerX,
    center_y: SCREEN.centerY,
    radius: STEPS.orbitRadius,
    start_angle: STEPS.angleStart,
    end_angle: STEPS.angleEnd,
    color: COLORS.bgTertiary,
    line_width: STEPS.width,
    level: 100,
    show_level: hmUI.show_level.ONLY_NORMAL,
  };
}

export function getStepsArcActiveProps() {
  return {
    center_x: SCREEN.centerX,
    center_y: SCREEN.centerY,
    radius: STEPS.orbitRadius,
    start_angle: STEPS.angleStart,
    end_angle: STEPS.angleEnd,
    color: COLORS.bgSecondary,
    line_width: STEPS.widthActive,
    level: 0,
    show_level: hmUI.show_level.ONLY_NORMAL,
  };
}

export function getStepsValueProps(text = '') {
  return {
    x: STEPS.valueX,
    y: STEPS.valueY,
    w: STEPS.valueWidth,
    h: STEPS.valueHeight,
    color: COLORS.textSecondary,
    text_size: STEPS.valueTextSize,
    align_h: hmUI.align.RIGHT,
    align_v: hmUI.align.CENTER_V,
    font: FONTS.secondary,
    text,
    show_level: hmUI.show_level.ONLY_NORMAL,
  };
}

// SLEEP TIME
export function getSleepArcBackgroundProps() {
  return {
    center_x: SCREEN.centerX,
    center_y: SCREEN.centerY,
    radius: SLEEP_TIME.orbitRadius,
    start_angle: SLEEP_TIME.angleStart,
    end_angle: SLEEP_TIME.angleEnd,
    color: COLORS.bgTertiary,
    line_width: SLEEP_TIME.width,
    level: 100,
    show_level: hmUI.show_level.ONLY_NORMAL,
  };
}

export function getSleepArcActiveProps() {
  return {
    center_x: SCREEN.centerX,
    center_y: SCREEN.centerY,
    start_angle: SLEEP_TIME.angleStart,
    end_angle: SLEEP_TIME.angleEnd,
    radius: SLEEP_TIME.orbitRadius,
    line_width: SLEEP_TIME.widthActive,
    color: COLORS.bgSecondary,
    type: hmUI.data_type.SLEEP,
    show_level: hmUI.show_level.ONLY_NORMAL,
  };
}

export function getSleepValueProps(text = '') {
  return {
    x: SLEEP_TIME.valueX,
    y: SLEEP_TIME.valueY,
    w: SLEEP_TIME.valueWidth,
    h: SLEEP_TIME.valueHeight,
    color: COLORS.textSecondary,
    text_size: SLEEP_TIME.valueTextSize,
    align_h: hmUI.align.LEFT,
    align_v: hmUI.align.CENTER_V,
    font: FONTS.secondary,
    text,
    show_level: hmUI.show_level.ONLY_NORMAL,
  };
}
