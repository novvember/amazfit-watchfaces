import * as ui from '@zos/ui';
import { px } from '@zos/utils';

export const FONT = 'fonts/Inter_28pt-Light.ttf';
export const FONT_SIZE = px(32);

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
  show_level: ui.show_level.ONLY_NORMAL | ui.show_level.ONLY_EDIT,
};

export const BACKGROUND_GRADIENT_IMAGE_PROPS = {
  x: 0,
  y: 0,
  src: 'backgrounds/gradient.png',
  show_level: ui.show_level.ONLY_NORMAL | ui.show_level.ONLY_EDIT,
};

export const DISCONNECT_STATUS_PROPS = {
  x: px(260),
  y: px(414),
  type: ui.system_status.DISCONNECT,
  src: 'status/bluetooth.png',
  show_level: ui.show_level.ONLY_NORMAL,
};

export const BATTERY_STATUS_PROPS = {
  x: px(216),
  y: px(414),
  src: 'status/battery.png',
  show_level: ui.show_level.ONLY_NORMAL,
};
