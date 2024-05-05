import {
  ARC,
  CALENDAR,
  DIGITS,
  GRID,
  SCREEN,
  SECONDS_PROGRESS_BAR,
  CONNECTION_STATUS,
  isRusLang
} from '../utils/constants';

// CELL
export function getCellBackgroundImageProps(centerPosition, status) {
  return {
    x: centerPosition.x - GRID.cell.width / 2,
    y: centerPosition.y - GRID.cell.height / 2,
    w: GRID.cell.width,
    h: GRID.cell.height,
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
    x: cellToRight.centerPosition.x - GRID.cell.width / 2 - CALENDAR.year.width,
    y: cellToRight.centerPosition.y - CALENDAR.year.height / 2,
    src: `year/${value}.png`,
    show_level: hmUI.show_level.ONLY_NORMAL,
  };
}

// MONTH
export function getMonthImageProps(cellToLeft, value) {
  return {
    x: cellToLeft.centerPosition.x + GRID.cell.width / 2,
    y: cellToLeft.centerPosition.y - CALENDAR.month.height / 2,
    src: CALENDAR.month.images[value],
    show_level: hmUI.show_level.ONLY_NORMAL,
  };
}

// WEEKDAY
export function getWeekDayImageProps(cellToBottom, index) {
  return {
    x: cellToBottom.centerPosition.x - CALENDAR.weekDay.width / 2,
    y: cellToBottom.centerPosition.y - CALENDAR.date.height / 2 - CALENDAR.weekDay.height,
    src: CALENDAR.weekDay.images[index],
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
  const ANGLE_START = 130;
  const ANGLE_END = 50;

  return {
    center_x: SCREEN.centerX,
    center_y: SCREEN.centerY,
    radius: ARC.radius,
    start_angle: ANGLE_START,
    end_angle: ANGLE_END,
    color: ARC.colorBackground,
    line_width: ARC.width,
    level: 100,
    show_level: hmUI.show_level.ONLY_NORMAL,
  };
}

export function getStepsArcActiveProps() {
  const ANGLE_START = 130;
  const ANGLE_END = 50;

  return {
    center_x: SCREEN.centerX,
    center_y: SCREEN.centerY,
    radius: ARC.radius,
    start_angle: ANGLE_START,
    end_angle: ANGLE_END,
    color: ARC.colorActive,
    line_width: ARC.width,
    type: hmUI.data_type.STEP,
    show_level: hmUI.show_level.ONLY_NORMAL,
  };
}

// BATTERY
export function getBatteryTextImageProps() {
  return {
    x: 32,
    y: 255,
    type: hmUI.data_type.BATTERY,
    font_array: DIGITS.images,
    unit_en: 'percent.png',
    align_h: hmUI.align.LEFT,
    show_level: hmUI.show_level.ONLY_NORMAL,
  };
}

export function getBatteryArcBackgroundProps() {
  const ANGLE_START = 230;
  const ANGLE_END = 265;

  return {
    center_x: SCREEN.centerX,
    center_y: SCREEN.centerY,
    radius: ARC.radius,
    start_angle: ANGLE_START,
    end_angle: ANGLE_END,
    color: ARC.colorBackground,
    line_width: ARC.width,
    level: 100,
    show_level: hmUI.show_level.ONLY_NORMAL,
  };
}

export function getBatteryArcActiveProps() {
  const ANGLE_START = 230;
  const ANGLE_END = 265;

  return {
    center_x: SCREEN.centerX,
    center_y: SCREEN.centerY,
    start_angle: ANGLE_START,
    end_angle: ANGLE_END,
    radius: ARC.radius,
    line_width: ARC.width,
    corner_flag: 0,
    color: ARC.colorActive,
    type: hmUI.data_type.BATTERY,
    show_level: hmUI.show_level.ONLY_NORMAL,
  };
}

// UVI
export function getUvImageProps() {
  const x = 32;
  const y = 143;

  return {
    x,
    y,
    src: isRusLang ? 'uvi_rus.png' : 'uvi.png',
    show_level: hmUI.show_level.ONLY_NORMAL,
  };
}

export function getUvTextImageProps() {
  const x = 32;
  const y = 143;

  return {
    x: x + 30,
    y,
    type: hmUI.data_type.UVI,
    font_array: DIGITS.images,
    show_level: hmUI.show_level.ONLY_NORMAL,
  };
}

export function getUvArcBackgroundProps() {
  const ANGLE_START = 275;
  const ANGLE_END = 310;

  return {
    center_x: SCREEN.centerX,
    center_y: SCREEN.centerY,
    radius: ARC.radius,
    start_angle: ANGLE_START,
    end_angle: ANGLE_END,
    color: ARC.colorBackground,
    line_width: ARC.width,
    level: 100,
    show_level: hmUI.show_level.ONLY_NORMAL,
  };
}

export function getUvArcActiveProps() {
  const ANGLE_START = 275;
  const ANGLE_END = 310;

  return {
    center_x: SCREEN.centerX,
    center_y: SCREEN.centerY,
    start_angle: ANGLE_START,
    end_angle: ANGLE_END,
    radius: ARC.radius,
    line_width: ARC.width,
    corner_flag: 0,
    color: ARC.colorActive,
    type: hmUI.data_type.UVI,
    show_level: hmUI.show_level.ONLY_NORMAL,
  };
}

// CONNECTION STATUS
export function getConnectImageProps() {
  const x = 30;
  const y = SCREEN.centerY - CONNECTION_STATUS.height / 2;

  return {
    x,
    y,
    w: CONNECTION_STATUS.width,
    h: CONNECTION_STATUS.height,
    src: 'connect/connect.png',
    show_level: hmUI.show_level.ONLY_NORMAL,
  }
}

export function getDisconnectImageProps() {
  const x = 30;
  const y = SCREEN.centerY - CONNECTION_STATUS.height / 2;

  return {
    x,
    y,
    type: hmUI.system_status.DISCONNECT,
    src: 'connect/disconnect.png',
    show_level: hmUI.show_level.ONLY_NORMAL,
  };
}