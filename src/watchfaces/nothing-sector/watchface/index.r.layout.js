import {
  SCREEN,
  dateNumberArray,
  dateWeekArray,
  isRusLang,
} from '../utils/constants';

export const GAUGE_IMAGE_PROPS = {
  x: 0,
  y: 0,
  src: 'background/gauge.png',
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const HOURS_IMAGE_PROPS = {
  x: 0,
  y: 0,
  src: 'background/hours.png',
  show_level: hmUI.show_level.ONLY_NORMAL | hmUI.show_level.ONAL_AOD,
};

export const BATTERY_TEXT_PROPS = {
  x: 0,
  y: 0,
  src: `battery/text${isRusLang ? '_rus' : ''}.png`,
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const BATTERY_PROGRESS_PROPS = {
  x: 0,
  y: 0,
  src: '',
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const STEPS_TEXT_PROPS = {
  x: 0,
  y: 0,
  src: `steps/text${isRusLang ? '_rus' : ''}.png`,
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const STEPS_PROGRESS_PROPS = {
  x: 0,
  y: 0,
  src: '',
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const DATE_WEEK_PROPS = {
  x: px(264),
  y: px(226),
  week_en: dateWeekArray,
  week_tc: dateWeekArray,
  week_sc: dateWeekArray,
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const DATE_DAY_PROPS = {
  day_startX: px(328),
  day_startY: px(226),
  day_align: hmUI.align.LEFT,
  day_zero: 0,
  day_en_array: dateNumberArray,
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const DISCONNECT_PROPS = {
  x: px(130),
  y: px(226),
  type: hmUI.system_status.DISCONNECT,
  src: 'disconnect/disconnect.png',
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const HOUR_POINTER_PROPS = {
  hour_centerX: SCREEN.centerX,
  hour_centerY: SCREEN.centerY,
  hour_posX: SCREEN.centerX,
  hour_posY: SCREEN.centerY,
  hour_path: 'pointers/hour.png',
  show_level: hmUI.show_level.ONLY_NORMAL | hmUI.show_level.ONAL_AOD,
};

export const MINUTE_POINTER_PROPS = {
  minute_centerX: SCREEN.centerX,
  minute_centerY: SCREEN.centerY,
  minute_posX: SCREEN.centerX,
  minute_posY: SCREEN.centerY,
  minute_path: 'pointers/minute.png',
  show_level: hmUI.show_level.ONLY_NORMAL | hmUI.show_level.ONAL_AOD,
};

export const SECOND_POINTER_PROPS = {
  second_centerX: SCREEN.centerX,
  second_centerY: SCREEN.centerY,
  second_posX: SCREEN.centerX,
  second_posY: SCREEN.centerY,
  second_path: 'pointers/second.png',
  show_level: hmUI.show_level.ONLY_NORMAL,
};
