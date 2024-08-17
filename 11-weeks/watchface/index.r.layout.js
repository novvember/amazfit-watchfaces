import {
  ARC,
  CALENDAR,
  DIGITS,
  SPECIAL_CHARS,
  GRID,
  SCREEN,
  SECONDS_PROGRESS_BAR,
  STEPS,
  BATTERY,
  SLEEP,
  CONNECTION_STATUS,
  ALARM_STATUS,
  FONT,
  GRID_RECT,
} from '../utils/constants';

// CELL
export function getCellBackgroundImageProps(centerPosition, status) {
  return {
    x: centerPosition.x - GRID.cell.width / 2,
    y: centerPosition.y - GRID.cell.height / 2,
    src: `cell/${status}.png`,
    show_level: hmUI.show_level.ONLY_NORMAL,
  };
}

export function getCellDateImageProps(centerPosition, text, isPartOfBigDigit) {
  return {
    x: centerPosition.x - CALENDAR.date.width / 2,
    y: centerPosition.y - CALENDAR.date.height / 2,
    src: `${isPartOfBigDigit ? 'date_dark' : 'date'}/${text}.png`,
    show_level: hmUI.show_level.ONLY_NORMAL,
  };
}

// YEAR
export function getYearImageProps(cellToRight, value) {
  return {
    x:
      cellToRight.centerPosition.x -
      GRID.cell.width / 2 -
      CALENDAR.year.width -
      px(2),
    y: cellToRight.centerPosition.y - CALENDAR.year.height / 2,
    src: `year/${value}.png`,
    show_level: hmUI.show_level.ONLY_NORMAL,
  };
}

export function getYearDotImageProps(cellToRight) {
  return {
    x:
      cellToRight.centerPosition.x -
      GRID.cell.width / 2 -
      CALENDAR.year.width -
      px(2),
    y: cellToRight.centerPosition.y - CALENDAR.year.height / 2,
    src: `dot/dot.png`,
    show_level: hmUI.show_level.ONLY_NORMAL,
  };
}

// MONTH
export function getMonthImageProps(cellToLeft, value) {
  return {
    x: cellToLeft.centerPosition.x + GRID.cell.width / 2 + px(2),
    y: cellToLeft.centerPosition.y - CALENDAR.month.height / 2,
    src: CALENDAR.month.images[value],
    show_level: hmUI.show_level.ONLY_NORMAL,
  };
}

export function getMonthDotImageProps(cellToLeft) {
  return {
    x: cellToLeft.centerPosition.x + GRID.cell.width / 2 + px(2),
    y: cellToLeft.centerPosition.y - CALENDAR.month.height / 2,
    src: `dot/dot.png`,
    show_level: hmUI.show_level.ONLY_NORMAL,
  };
}

// WEEKDAY
export function getWeekDayImageProps(cellToBottom, index) {
  return {
    x: cellToBottom.centerPosition.x - CALENDAR.weekDay.width / 2,
    y:
      cellToBottom.centerPosition.y -
      CALENDAR.date.height / 2 -
      CALENDAR.weekDay.height,
    src: CALENDAR.weekDay.images[index],
    show_level: hmUI.show_level.ONLY_NORMAL,
  };
}

export function getweekDayDotImageProps(column) {
  return {
    x: GRID_RECT.xLeft + GRID.cell.width * column,
    y: GRID_RECT.yTop - GRID.cell.height * 1.7,
    src: `dot/dot.png`,
    show_level: hmUI.show_level.ONLY_NORMAL,
  };
}

// SECONDS
export function getSecondsImageTimeProps(x, y) {
  return {
    second_zero: 0,
    second_startX: x,
    second_startY: y,
    second_array: DIGITS.images,
    second_align: hmUI.align.CENTER_H,
    show_level: hmUI.show_level.ONLY_NORMAL,
  };
}

export function getSecondProgressBarImageProps(x, y, value) {
  return {
    x,
    y,
    w: SECONDS_PROGRESS_BAR.width,
    h: SECONDS_PROGRESS_BAR.height,
    src: `seconds_progress_bar/${value}.png`,
    show_level: hmUI.show_level.ONLY_NORMAL,
  };
}

// STEPS
export function getStepsTextImageProps() {
  return {
    x: SCREEN.centerX + ARC.radius - ARC.width - DIGITS.width * 5,
    y: SCREEN.centerY - DIGITS.height / 2,
    type: hmUI.data_type.STEP,
    font_array: DIGITS.images,
    align_h: hmUI.align.RIGHT,
    show_level: hmUI.show_level.ONLY_NORMAL,
  };
}

export function getStepsArcBackgroundProps() {
  return {
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
}

export function getStepsArcActiveProps() {
  return {
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
}

// BATTERY
export function getBatteryTextImageProps() {
  return {
    x: BATTERY.x,
    y: BATTERY.y,
    type: hmUI.data_type.BATTERY,
    font_array: DIGITS.images,
    unit_en: SPECIAL_CHARS.percent.src,
    align_h: hmUI.align.LEFT,
    show_level: hmUI.show_level.ONLY_NORMAL,
  };
}

export function getBatteryArcBackgroundProps() {
  return {
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
}

export function getBatteryArcActiveProps() {
  return {
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
}

// SLEEP TIME
export function getSleepArcBackgroundProps() {
  return {
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
}

export function getSleepArcActiveProps() {
  return {
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
}

export function getSleepTimeProps() {
  return {
    x: SLEEP.x,
    y: SLEEP.y,
    w: SLEEP.width,
    h: SLEEP.height,
    color: 0x000000,
    text_size: SLEEP.textSize,
    align_h: hmUI.align.LEFT,
    align_v: hmUI.align.CENTER_V,
    font: FONT,
    text: '',
    show_level: hmUI.show_level.ONLY_NORMAL,
  };
}

// CONNECTION STATUS
export function getConnectImageProps() {
  return {
    x: CONNECTION_STATUS.x,
    y: SCREEN.centerY - CONNECTION_STATUS.height / 2,
    w: CONNECTION_STATUS.width,
    h: CONNECTION_STATUS.height,
    src: 'connect/connect.png',
    show_level: hmUI.show_level.ONLY_NORMAL,
  };
}

export function getDisconnectImageProps() {
  return {
    x: CONNECTION_STATUS.x,
    y: SCREEN.centerY - CONNECTION_STATUS.height / 2,
    type: hmUI.system_status.DISCONNECT,
    src: 'connect/disconnect.png',
    show_level: hmUI.show_level.ONLY_NORMAL,
  };
}

// ALARM STATUS
export function getAlarmOffImageProps() {
  return {
    x: ALARM_STATUS.x,
    y: SCREEN.centerY - ALARM_STATUS.height / 2,
    w: ALARM_STATUS.width,
    h: ALARM_STATUS.height,
    src: 'alarm/alarm_off.png',
    show_level: hmUI.show_level.ONLY_NORMAL,
  };
}

export function getAlarmOnImageProps() {
  return {
    x: ALARM_STATUS.x,
    y: SCREEN.centerY - ALARM_STATUS.height / 2,
    type: hmUI.system_status.CLOCK,
    src: 'alarm/alarm_on.png',
    show_level: hmUI.show_level.ONLY_NORMAL,
  };
}
