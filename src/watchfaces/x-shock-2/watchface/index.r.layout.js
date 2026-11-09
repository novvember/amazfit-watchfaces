export const BACKGROUND_PROPS = {
  x: 0,
  y: 0,
  w: px(480),
  h: px(480),
  src: 'background/background.png',
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const MENU_PROPS = {
  x: px(428),
  y: px(124),
  src: 'background/menu.png',
  show_level: hmUI.show_level.ONLY_NORMAL | hmUI.show_level.ONAL_AOD,
};

export const ALARM_STATUS_PROPS = {
  x: px(65),
  y: px(152),
  type: hmUI.system_status.CLOCK,
  src: 'icons/alm.png',
  show_level: hmUI.show_level.ONLY_NORMAL | hmUI.show_level.ONAL_AOD,
};

export const BATTERY_STATUS_PROPS = {
  x: px(65),
  y: px(179),
  src: 'icons/batt.png',
  show_level: hmUI.show_level.ONLY_NORMAL | hmUI.show_level.ONAL_AOD,
};

export const CONNECTION_STATUS_PROPS = {
  x: px(350),
  y: px(214),
  type: hmUI.system_status.DISCONNECT,
  src: 'icons/disconnect.png',
  show_level: hmUI.show_level.ONLY_NORMAL | hmUI.show_level.ONAL_AOD,
};
