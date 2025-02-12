import { COLORS, FONT_FAMILY, FONT_SIZE, SCREEN } from '../utils/constants';

export const BACKGROUND_CIRCLE_PROPS = {
  center_x: SCREEN.centerX,
  center_y: SCREEN.centerY,
  radius: px(370 / 2),
  color: COLORS.background,
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const BACKGROUND_CIRCLE_AOD_PROPS = {
  x: SCREEN.centerX - px(370 / 2),
  y: SCREEN.centerY - px(370 / 2),
  w: px(370),
  h: px(370),
  radius: px(370 / 2),
  line_width: px(1),
  color: COLORS.aod,
  show_level: hmUI.show_level.ONAL_AOD,
};

export const TIME_POINTER_PROPS = {
  hour_centerX: SCREEN.centerX,
  hour_centerY: SCREEN.centerY,
  hour_posX: px(48 / 2),
  hour_posY: SCREEN.centerY,
  hour_path: 'time_pointers/hour.png',

  minute_centerX: SCREEN.centerX,
  minute_centerY: SCREEN.centerY,
  minute_posX: px(48 / 2),
  minute_posY: SCREEN.centerY,
  minute_path: 'time_pointers/minute.png',

  second_centerX: SCREEN.centerX,
  second_centerY: SCREEN.centerY,
  second_posX: px(48 / 2),
  second_posY: SCREEN.centerY,
  second_path: 'time_pointers/empty.png',

  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const TIME_AOD_POINTER_PROPS = {
  hour_centerX: SCREEN.centerX,
  hour_centerY: SCREEN.centerY,
  hour_posX: px(48 / 2),
  hour_posY: SCREEN.centerY,
  hour_path: 'time_pointers/hour_aod.png',

  minute_centerX: SCREEN.centerX,
  minute_centerY: SCREEN.centerY,
  minute_posX: px(48 / 2),
  minute_posY: SCREEN.centerY,
  minute_path: 'time_pointers/minute_aod.png',

  show_level: hmUI.show_level.ONAL_AOD,
};

export const TIME_CENTER_PROPS = {
  center_x: SCREEN.centerX,
  center_y: SCREEN.centerY,
  radius: px(32 / 2),
  color: COLORS.primary,
  show_level: hmUI.show_level.ONLY_NORMAL | hmUI.show_level.ONAL_AOD,
};

export const TIME_AOD_CENTER_PROPS = {
  x: SCREEN.centerX - px(32 / 2),
  y: SCREEN.centerY - px(32 / 2),
  w: px(32),
  h: px(32),
  radius: px(32 / 2),
  line_width: px(1),
  color: COLORS.aod,
  show_level: hmUI.show_level.ONAL_AOD,
};

export const TIME_TEXT_PROPS = {
  x: px(220),
  y: px(151),
  w: px(220),
  h: px(40),
  color: COLORS.primary,
  text_size: FONT_SIZE.primary,
  align_h: hmUI.align.LEFT,
  align_v: hmUI.align.CENTER_V,
  font: FONT_FAMILY.primary,
  text: '00:00',
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const TIME_TEXT_AOD_PROPS = {
  ...TIME_TEXT_PROPS,
  color: COLORS.aod,
  show_level: hmUI.show_level.ONAL_AOD,
};

export const BOTTOM_WIDGET_TEXT_PROPS = {
  x: 0,
  y: 0,
  w: px(200),
  h: px(25),
  color: COLORS.secondary,
  text_size: FONT_SIZE.secondary,
  align_h: hmUI.align.LEFT,
  align_v: hmUI.align.CENTER_V,
  font: FONT_FAMILY.secondary,
  text: '',
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const WEATHER_ICON_PROPS = {
  x: 0,
  y: 0,
  w: px(32),
  h: px(32),
  src: '',
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const DISCONNECT_STATUS_PROPS = {
  x: SCREEN.centerX - px(40 / 2),
  y: px(90),
  type: hmUI.system_status.DISCONNECT,
  src: 'disconnect.png',
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const EDIT_BACKGROUND_PROPS = {
  x: 0,
  y: 0,
  w: SCREEN.width,
  h: SCREEN.height,
  src: 'edit/background.png',
  show_level: hmUI.show_level.ONLY_EDIT,
};

export const DATA_1_EDIT_GROUP_PROPS = {
  edit_id: 101,
  x: px(216),
  y: px(314),
  w: px(200),
  h: px(34),
  select_image: 'edit/data_select.png',
  un_select_image: 'edit/data_unselect.png',
  optional_types: [
    {
      type: hmUI.edit_type.HEART,
      preview: 'edit/data_preview_heart.png',
    },
    {
      type: hmUI.edit_type.STEP,
      preview: 'edit/data_preview_step.png',
    },
    {
      type: hmUI.edit_type.SLEEP,
      preview: 'edit/data_preview_sleep.png',
    },
    {
      type: hmUI.edit_type.CAL,
      preview: 'edit/data_preview_calorie.png',
    },
    {
      type: hmUI.edit_type.DISTANCE,
      preview: 'edit/data_preview_distance.png',
    },
    {
      type: hmUI.edit_type.BATTERY,
      preview: 'edit/data_preview_battery.png',
    },
    {
      type: hmUI.edit_type.WEATHER,
      preview: 'edit/data_preview_weather.png',
    },
  ],
  default_type: hmUI.edit_type.STEP,
  count: 7,
  tips_BG: 'edit/tip.png',
  tips_x: px(-130),
  tips_y: px(0),
  tips_width: px(120),
  tips_margin: px(5),
};

export const DATA_2_EDIT_GROUP_PROPS = {
  ...DATA_1_EDIT_GROUP_PROPS,
  edit_id: 102,
  y: px(352),
  default_type: hmUI.edit_type.WEATHER,
};

export const DATA_3_EDIT_GROUP_PROPS = {
  ...DATA_1_EDIT_GROUP_PROPS,
  edit_id: 103,
  y: px(390),
  default_type: hmUI.edit_type.BATTERY,
};
