import { COLOR_PRIMARY, FONT_SECONDARY } from './index.const';

export const OVERLAY_CIRCLE_AOD_PROPS = {
  center_x: px(240),
  center_y: px(240),
  radius: px(310),
  color: 0x000000,
  alpha: 90,
  show_level: hmUI.show_level.ONAL_AOD,
};

export const DATA_TEXT_PROPS = {
  x: 0,
  y: 0,
  w: px(170),
  h: px(46),
  color: COLOR_PRIMARY,
  text_size: px(40),
  align_h: hmUI.align.CENTER_H,
  align_v: hmUI.align.CENTER_V,
  font: FONT_SECONDARY,
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const BACKGROUND_EDIT_IMAGE_PROPS = {
  edit_id: 101,
  x: 0,
  y: 0,
  bg_config: [
    {
      id: 1,
      preview: 'background/white.png',
      path: 'background/white.png',
    },
    {
      id: 2,
      preview: 'background/red.png',
      path: 'background/red.png',
    },
    {
      id: 3,
      preview: 'background/yellow.png',
      path: 'background/yellow.png',
    },
    {
      id: 4,
      preview: 'background/blue.png',
      path: 'background/blue.png',
    },
  ],
  count: 4,
  default_id: 1,
  fg: 'null.png',
  tips_x: px(180),
  tips_y: px(120),
  tips_bg: 'edit/tip.png',
};

export const BACKGROUND_AOD_IMAGE_PROPS = {
  x: 0,
  y: 0,
  src: 'background/aod.png',
  show_level: hmUI.show_level.ONAL_AOD,
};