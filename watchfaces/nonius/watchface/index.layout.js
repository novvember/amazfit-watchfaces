export const DISK_IMAGE_SIZE = px(675);
export const DISK_IMAGE_CENTER_RADIUS = px(550);

export const SCREEN_SIZE = px(480);

export const LINE_IMAGE_PROPS = {
  x: 0,
  y: 0,
  w: SCREEN_SIZE,
  h: SCREEN_SIZE,
  pos_x: 0,
  pos_y: 0,
  center_x: SCREEN_SIZE / 2,
  center_y: SCREEN_SIZE / 2,
  angle: 0,
  src: 'time/line.png',
  show_level: hmUI.show_level.ONLY_NORMAL | hmUI.show_level.ONAL_AOD,
};

export const DISK_IMAGE_PROPS = {
  x: 0,
  y: 0,
  w: DISK_IMAGE_SIZE,
  h: DISK_IMAGE_SIZE,
  pos_x: 0,
  pos_y: 0,
  center_x: 0,
  center_y: 0,
  angle: 0,
  src: 'time/disk_1.png',
  show_level: hmUI.show_level.ONLY_NORMAL | hmUI.show_level.ONAL_AOD,
};

export const WIDGET_BACKGROUND_PROPS = {
  x: 0,
  y: 0,
  w: 0,
  h: px(48),
  radius: px(24),
  color: 0x000000,
  alpha: 190,
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const WIDGET_AOD_BACKGROUND_PROPS = {
  ...WIDGET_BACKGROUND_PROPS,
  alpha: 255,
  show_level: hmUI.show_level.ONLY_NORMAL | hmUI.show_level.ONAL_AOD,
};

export const WIDGET_TEXT_PROPS = {
  x: 0,
  y: 0,
  w: 0,
  h: px(48),
  color: 0xffffff,
  text_size: px(40),
  align_h: hmUI.align.CENTER_H,
  align_v: hmUI.align.CENTER_V,
  font: 'fonts/Basic-Regular.ttf',
  text: '----',
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const WIDGET_AOD_TEXT_PROPS = {
  ...WIDGET_TEXT_PROPS,
  show_level: hmUI.show_level.ONLY_NORMAL | hmUI.show_level.ONAL_AOD,
};

export const OVERLAY_CIRCLE_AOD_PROPS = {
  center_x: SCREEN_SIZE / 2,
  center_y: SCREEN_SIZE / 2,
  radius: SCREEN_SIZE + 0.6,
  color: 0x000000,
  alpha: 78,
  show_level: hmUI.show_level.ONAL_AOD,
};
