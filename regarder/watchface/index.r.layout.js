export const EDIT_BACKGROUND_PROPS = {
  edit_id: 103,
  x: 0,
  y: 0,
  bg_config: [
    {
      id: 1,
      preview: 'background/1.png',
      path: 'background/1.png',
    },
    {
      id: 2,
      preview: 'background/2.png',
      path: 'background/2.png',
    },
    {
      id: 3,
      preview: 'background/3.png',
      path: 'background/3.png',
    },
  ],
  count: 3,
  default_id: 1,
  fg: 'null.png',
  tips_x: px(180),
  tips_y: px(100),
  tips_bg: 'edit/tip.png',
};

export const BACKGROUND_AOD_IMAGE_PROPS = {
  x: 0,
  y: 0,
  src: 'background/2.png',
  show_level: hmUI.show_level.ONAL_AOD,
};

export const TIME_POINTER_PROPS = {
  hour_centerX: px(240),
  hour_centerY: px(240),
  hour_posX: px(16),
  hour_posY: px(240),
  hour_path: 'time/hour.png',

  minute_centerX: px(240),
  minute_centerY: px(240),
  minute_posX: px(16),
  minute_posY: px(240),
  minute_path: 'time/minute.png',

  second_centerX: px(240),
  second_centerY: px(240),
  second_posX: px(16),
  second_posY: px(240),
  second_path: 'time/second.png',

  second_cover_path: 'time/top.png',
  second_cover_x: px(240 - 16),
  second_cover_y: px(240 - 16),

  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const TIME_POINTER_AOD_PROPS = {
  hour_centerX: px(240),
  hour_centerY: px(240),
  hour_posX: px(16),
  hour_posY: px(240),
  hour_path: 'time/hour.png',

  minute_centerX: px(240),
  minute_centerY: px(240),
  minute_posX: px(16),
  minute_posY: px(240),
  minute_path: 'time/minute.png',

  minute_cover_path: 'time/top.png',
  minute_cover_x: px(240 - 16),
  minute_cover_y: px(240 - 16),

  show_level: hmUI.show_level.ONAL_AOD,
};

export const OVERLAY_CIRCLE_AOD_PROPS = {
  center_x: px(240),
  center_y: px(240),
  radius: px(310),
  color: 0x000000,
  alpha: 90,
  show_level: hmUI.show_level.ONAL_AOD,
};

export const DISCONNECT_STATUS_PROPS = {
  x: px(219),
  y: px(430),
  type: hmUI.system_status.DISCONNECT,
  src: 'disconnect/disconnect.png',
  show_level: hmUI.show_level.ONLY_NORMAL,
};