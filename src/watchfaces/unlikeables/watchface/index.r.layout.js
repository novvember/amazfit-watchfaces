const FONT = 'fonts/Inter_28pt-Light.ttf';
const FONT_SIZE = px(32);

const BACKGROUNDS = new Array(6).fill(null).map((_, i) => ({
  id: i + 1,
  preview: `backgrounds/${i + 1}.png`,
  path: `backgrounds/${i + 1}.png`,
}));

export const EDIT_BACKGROUND_PROPS = {
  edit_id: 101,
  x: 0,
  y: 0,
  bg_config: BACKGROUNDS,
  count: BACKGROUNDS.length,
  default_id: 1,
  fg: 'null.png',
  tips_x: px(180),
  tips_y: px(50),
  tips_bg: 'edit/tip.png',
  show_level: hmUI.show_level.ONLY_NORMAL | hmUI.show_level.ONLY_EDIT,
};

export const BACKGROUND_GRADIENT_IMAGE_PROPS = {
  x: 0,
  y: 0,
  src: 'backgrounds/gradient.png',
  show_level: hmUI.show_level.ONLY_NORMAL | hmUI.show_level.ONLY_EDIT,
};

export const DATE_TEXT_PROPS = {
  x: 0,
  y: px(320),
  w: px(480),
  h: px(82),
  color: 0xffffff,
  text_size: px(32),
  align_h: hmUI.align.CENTER_H,
  align_v: hmUI.align.CENTER_V,
  font: FONT,
  text: '',
  show_level:
    hmUI.show_level.ONLY_NORMAL |
    hmUI.show_level.ONAL_AOD |
    hmUI.show_level.ONLY_EDIT,
};

export const DATA_TEXT_PROPS = {
  x: 0,
  y: px(78),
  w: px(480),
  h: px(82),
  color: 0xffffff,
  text_size: FONT_SIZE,
  align_h: hmUI.align.CENTER_H,
  align_v: hmUI.align.CENTER_V,
  font: FONT,
  text: '',
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const DISCONNECT_STATUS_PROPS = {
  x: px(260),
  y: px(414),
  type: hmUI.system_status.DISCONNECT,
  src: 'status/bluetooth.png',
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const BATTERY_STATUS_PROPS = {
  x: px(216),
  y: px(414),
  src: 'status/battery.png',
  show_level: hmUI.show_level.ONLY_NORMAL,
};
