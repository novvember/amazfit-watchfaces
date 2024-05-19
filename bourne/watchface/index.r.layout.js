import { GRID_POSITIONS, SYMBOLS, DISCONNECT, TEXTS } from '../utils/constants';

export const TEXTS_PROPS = {
  x: TEXTS.x,
  y: TEXTS.y,
  src: TEXTS.src,
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const HEART_VALUE_PROPS = {
  x: GRID_POSITIONS.columnsX[1],
  y: GRID_POSITIONS.rowsY[0],
  type: hmUI.data_type.HEART,
  font_array: SYMBOLS.accent.digits,
  align_h: hmUI.align.RIGHT,
  invalid_image: SYMBOLS.accent.minus,
  unit_en: SYMBOLS.accent.heart, // show static heart icon instead of animation
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const TIME_COLON_PROPS = {
  second_zero: 1,
  second_startX: GRID_POSITIONS.columnsX[1],
  second_startY: GRID_POSITIONS.rowsY[1],
  second_array: new Array(10)
    .fill(null)
    .map((_, i) => (i % 2 === 0 ? SYMBOLS.primary.colon : SYMBOLS.empty)),
  show_level: hmUI.show_level.ONLY_NORMAL,
};
export const TIME_COLON_AOD_PROPS = {
  x: GRID_POSITIONS.columnsX[2],
  y: GRID_POSITIONS.rowsY[1],
  src: SYMBOLS.primary.colon,
  show_level: hmUI.show_level.ONAL_AOD,
};

export const TIME_HOURS_PROPS = {
  hour_zero: 1,
  hour_startX: GRID_POSITIONS.columnsX[0],
  hour_startY: GRID_POSITIONS.rowsY[1],
  hour_array: SYMBOLS.primary.digits,
  show_level: hmUI.show_level.ONLY_NORMAL | hmUI.show_level.ONAL_AOD,
};

export const TIME_MINUTES_PROPS = {
  minute_zero: 1,
  minute_startX: GRID_POSITIONS.columnsX[3],
  minute_startY: GRID_POSITIONS.rowsY[1],
  minute_array: SYMBOLS.primary.digits,
  show_level: hmUI.show_level.ONLY_NORMAL | hmUI.show_level.ONAL_AOD,
};

export const DATE_DAY_PROPS = {
  day_startX: GRID_POSITIONS.columnsX[0],
  day_startY: GRID_POSITIONS.rowsY[2],
  day_align: hmUI.align.RIGHT,
  day_zero: 0,
  day_en_array: SYMBOLS.secondary.digits,
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const DATE_DOT_PROPS = {
  x: GRID_POSITIONS.columnsX[2],
  y: GRID_POSITIONS.rowsY[2],
  src: SYMBOLS.secondary.dot,
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const DATE_MONTH_PROPS = {
  month_startX: GRID_POSITIONS.columnsX[3],
  month_startY: GRID_POSITIONS.rowsY[2],
  month_align: hmUI.align.LEFT,
  month_zero: 1,
  month_en_array: SYMBOLS.secondary.digits,
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const TEMP_VALUE_PROPS = {
  x: GRID_POSITIONS.columnsX[0],
  y: GRID_POSITIONS.rowsY[3],
  type: hmUI.data_type.WEATHER_CURRENT,
  font_array: SYMBOLS.secondary.digits,
  align_h: hmUI.align.RIGHT,
  unit_en: SYMBOLS.secondary.degree,
  negative_image: SYMBOLS.secondary.minus,
  invalid_image: SYMBOLS.secondary.minus,
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const STEPS_VALUE_PROPS = {
  x: GRID_POSITIONS.columnsX[0],
  y: GRID_POSITIONS.rowsY[4],
  type: hmUI.data_type.STEP,
  font_array: SYMBOLS.secondary.digits,
  align_h: hmUI.align.RIGHT,
  invalid_image: SYMBOLS.secondary.minus,
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const DISCONNECT_STATUS_PROPS = {
  x: DISCONNECT.x,
  y: DISCONNECT.y,
  type: hmUI.system_status.DISCONNECT,
  src: DISCONNECT.src,
};
