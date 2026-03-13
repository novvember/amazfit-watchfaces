import { COLOR_TYPES, SCREEN } from '../utils/constants';

export const BACKGROUND_IMAGE_PROPS = {
  x: 0,
  y: 0,
  src: 'background/background_white.png',
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const BACKGROUND_AOD_IMAGE_PROPS = {
  x: 0,
  y: 0,
  src: 'background/background_aod.png',
  show_level: hmUI.show_level.ONAL_AOD,
};

export const HOUR_ARC_PROPS = {
  center_x: SCREEN.centerX,
  center_y: SCREEN.centerY,
  radius: px(115),
  start_angle: 0,
  color: 0x000000,
  line_width: px(50),
  level: 100,
  corner_flag: 3,
  show_level: hmUI.show_level.ONLY_NORMAL | hmUI.show_level.ONAL_AOD,
};

export const MINUTE_ARC_PROPS = {
  ...HOUR_ARC_PROPS,
  radius: px(165),
};

export const SECOND_ARC_PROPS = {
  ...HOUR_ARC_PROPS,
  radius: px(215),
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const GRID_IMAGE_PROPS = {
  x: 0,
  y: 0,
  src: 'grid/grid_white.png',
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const GRID_AOD_IMAGE_PROPS = {
  x: 0,
  y: 0,
  src: 'grid/grid_aod.png',
  show_level: hmUI.show_level.ONAL_AOD,
};

export const COLOR_EDIT_GROUP_PROPS = {
  edit_id: 101,
  x: SCREEN.centerX - px(140) / 2,
  y: SCREEN.centerY - px(140) / 2,
  w: px(140),
  h: px(140),
  select_image: 'edit/color_select.png',
  un_select_image: 'edit/color_unselect.png',
  default_type: COLOR_TYPES[0].type,
  optional_types: COLOR_TYPES,
  count: COLOR_TYPES.length,
  tips_BG: 'edit/tip.png',
  tips_x: px(20),
  tips_y: px(55),
  tips_width: px(100),
  tips_margin: px(5),
};
