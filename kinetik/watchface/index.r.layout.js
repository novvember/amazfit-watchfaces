import { COLORS, FONT, FONT_SIZE, SCREEN } from '../utils/constants';

export const BACKGROUND_IMAGE_PROPS = {
  x: 0,
  y: 0,
  src: 'background/background.png',
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const BACKGROUND_AOD_IMAGE_PROPS = {
  x: 0,
  y: 0,
  src: 'background/background_aod.png',
  show_level: hmUI.show_level.ONAL_AOD,
};

export const BACKGROUND_EDIT_IMAGE_PROPS = {
  x: 0,
  y: 0,
  src: 'edit/background.png',
  show_level: hmUI.show_level.ONLY_EDIT,
};

export const TIME_HANDS_PROPS = {
  hour_centerX: SCREEN.centerX,
  hour_centerY: SCREEN.centerY,
  hour_posX: px(22),
  hour_posY: SCREEN.centerY,
  hour_path: 'time/hour.png',

  minute_centerX: SCREEN.centerX,
  minute_centerY: SCREEN.centerY,
  minute_posX: px(22),
  minute_posY: SCREEN.centerY,
  minute_path: 'time/minute.png',

  second_centerX: SCREEN.centerX,
  second_centerY: SCREEN.centerY,
  second_posX: px(22),
  second_posY: SCREEN.centerY,
  second_path: 'time/second.png',

  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const TIME_AOD_HANDS_PROPS = {
  hour_centerX: SCREEN.centerX,
  hour_centerY: SCREEN.centerY,
  hour_posX: px(22),
  hour_posY: SCREEN.centerY,
  hour_path: 'time/hour_aod.png',

  minute_centerX: SCREEN.centerX,
  minute_centerY: SCREEN.centerY,
  minute_posX: px(22),
  minute_posY: SCREEN.centerY,
  minute_path: 'time/minute_aod.png',

  show_level: hmUI.show_level.ONAL_AOD,
};

export const TOP_TEXT_PROPS = {
  x: px(115),
  y: px(142),
  w: px(250),
  h: px(32),
  color: COLORS.text,
  text_size: FONT_SIZE,
  align_h: hmUI.align.CENTER_H,
  align_v: hmUI.align.CENTER_V,
  char_space: px(2),
  font: FONT,
  text: '',
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const BOTTOM_TEXT_PROPS = {
  ...TOP_TEXT_PROPS,
  x: px(115),
  y: px(306),
};

export const DATA_EDIT_GROUP_PROPS = {
  edit_id: 101,
  x: px(127),
  y: px(282),
  w: px(226),
  h: px(80),
  select_image: 'edit/data_select.png',
  un_select_image: 'edit/data_unselect.png',
  default_type: hmUI.edit_type.STEP,
  optional_types: [
    {
      type: hmUI.edit_type.STEP,
      preview: 'edit/data_preview_step.png',
    },
    {
      type: hmUI.edit_type.HEART,
      preview: 'edit/data_preview_heart.png',
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
  count: 7,
  tips_BG: 'edit/tip.png',
  tips_x: px(10),
  tips_y: px(-35),
  tips_width: px(90),
  tips_margin: px(5),
};
