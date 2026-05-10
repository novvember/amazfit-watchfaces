export const OVERLAY_CIRCLE_AOD_PROPS = {
  center_x: px(240),
  center_y: px(240),
  radius: px(310),
  color: 0x000000,
  alpha: 90,
  show_level: hmUI.show_level.ONAL_AOD,
};

export const BACKGROUND_EDIT_IMAGE_PROPS = {
  edit_id: 101,
  x: 0,
  y: 0,
  bg_config: [
    {
      id: 1,
      preview: 'background/white_preview.png',
      path: 'background/white.png',
    },
    {
      id: 2,
      preview: 'background/red_preview.png',
      path: 'background/red.png',
    },
    {
      id: 3,
      preview: 'background/yellow_preview.png',
      path: 'background/yellow.png',
    },
    {
      id: 4,
      preview: 'background/blue_preview.png',
      path: 'background/blue.png',
    },
  ],
  count: 4,
  default_id: 1,
  fg: 'null.png',
  tips_x: px(180),
  tips_y: px(100),
  tips_bg: 'edit/tip.png',
};

export const BACKGROUND_AOD_IMAGE_PROPS = {
  x: 0,
  y: 0,
  src: 'background/aod.png',
  show_level: hmUI.show_level.ONAL_AOD,
};

export const DISCONNECT_IMAGE_PROPS = {
    x: px(54),
    y: px(217),
    type: hmUI.system_status.DISCONNECT,
    src: 'status/disconnected.png',
    show_level: hmUI.show_level.ONLY_NORMAL,
}