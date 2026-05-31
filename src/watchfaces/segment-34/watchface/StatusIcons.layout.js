import { COLOR_PRIMARY, FONT_SECONDARY } from './index.layout';

export const CONNECT_IMAGE_PROPS = {
  x: px(261),
  y: px(450),
  src: 'connect/connect_on.png',
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const CONNECT_STATUS_PROPS = {
  x: px(261),
  y: px(450),
  type: hmUI.system_status.DISCONNECT,
  src: 'connect/connect_off.png',
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const ALARM_IMAGE_PROPS = {
  x: px(188),
  y: px(450),
  src: 'alarm/alarm_off.png',
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const ALARM_STATUS_PROPS = {
  x: px(188),
  y: px(450),
  type: hmUI.system_status.CLOCK,
  src: 'alarm/alarm_on.png',
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const BATTERY_ICON_PROPS = {
  x: px(220),
  y: px(443),
  src: 'battery/battery.png',
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const BATTERY_PROGRESS_PROPS = {
  x: px(223),
  y: px(452),
  w: px(32),
  h: px(22),
  color: COLOR_PRIMARY,
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const BATTERY_TEXT_PROPS = {
  x: px(222),
  y: px(452),
  w: px(32),
  h: px(22),
  align_h: hmUI.align.CENTER_H,
  align_v: hmUI.align.CENTER_V,
  color: COLOR_PRIMARY,
  text_size: px(16),
  font: FONT_SECONDARY,
  type: hmUI.data_type.BATTERY,
  show_level: hmUI.show_level.ONLY_NORMAL,
};
