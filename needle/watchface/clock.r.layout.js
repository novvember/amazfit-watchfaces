import ui from '@zos/ui';
import { px } from '@zos/utils';
import { COLORS, FONT } from '../utils/constants';

const centerX = px(480 / 2);
const centerY = px(480 / 2);

export const TIME_BACKGROUND_IMAGE_PROPS = {
  x: 0,
  y: 0,
  w: px(480),
  h: px(480),
  src: 'time/background.png',
  show_level: ui.show_level.ONLY_NORMAL,
};
export const AOD_TIME_BACKGROUND_IMAGE_PROPS = {
  x: 0,
  y: 0,
  w: px(480),
  h: px(480),
  src: 'time/background_aod.png',
  show_level: ui.show_level.ONAL_AOD,
};

export const TIME_POINTERS_PROPS = {
  minute_centerX: centerX,
  minute_centerY: centerY,
  minute_posX: px(48 / 2),
  minute_posY: px(156),
  minute_path: 'time/minute.png',

  second_centerX: centerX,
  second_centerY: centerY,
  second_posX: px(48 / 2),
  second_posY: px(156),
  second_path: 'time/second.png',

  hour_centerX: centerX,
  hour_centerY: centerY,
  hour_posX: px(48 / 2),
  hour_posY: px(156),
  hour_path: 'time/hour.png',

  minute_cover_path: 'time/top.png',
  minute_cover_y: centerX - px(32 / 2),
  minute_cover_x: centerY - px(32 / 2),

  show_level: ui.show_level.ONLY_NORMAL,
};

export const AOD_TIME_POINTERS_PROPS = {
  minute_centerX: centerX,
  minute_centerY: centerY,
  minute_posX: px(48 / 2),
  minute_posY: px(156),
  minute_path: 'time/minute_aod.png',

  hour_centerX: centerX,
  hour_centerY: centerY,
  hour_posX: px(48 / 2),
  hour_posY: px(156),
  hour_path: 'time/hour_aod.png',

  minute_cover_path: 'time/top_aod.png',
  minute_cover_y: centerX - px(32 / 2),
  minute_cover_x: centerY - px(32 / 2),

  show_level: ui.show_level.ONAL_AOD,
};

export const DATE_TEXT_PROPS = {
  x: px(180),
  y: px(151),
  w: px(120),
  h: px(40),
  color: COLORS.primary,
  text_size: px(30),
  align_h: ui.align.CENTER_H,
  align_v: ui.align.CENTER_V,
  font: FONT,
  text: '00',
  char_space: 0,
  show_level: ui.show_level.ONLY_NORMAL,
};
