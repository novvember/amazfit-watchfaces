import {
  ACCENT_COLORS,
  COLORS,
  DATE_TYPES,
  DOT_SIZE,
  FONT,
} from '../utils/constants';

export const HOUR_DOT_PROPS = {
  center_x: 1,
  center_y: 1,
  radius: DOT_SIZE.l / 2,
  color: COLORS.dotHour,
  colorDisabled: COLORS.dotHourDisabled,
};

export const MINUTE_BIG_DOT_PROPS = {
  center_x: 1,
  center_y: 1,
  radius: DOT_SIZE.l / 2,
  color: COLORS.dotMinute,
};

export const MINUTE_SMALL_DOT_PROPS = {
  center_x: 1,
  center_y: 1,
  radius: DOT_SIZE.s / 2,
  radiusDisabled: DOT_SIZE.disabled / 2,
  color: COLORS.dotMinute,
  colorDisabled: COLORS.dotMinuteDisabled,
};

export const TIME_TEXT_PROPS = {
  x: px(240),
  y: px(308),
  w: px(166),
  h: px(46),
  color: COLORS.text,
  text_size: px(38),
  align_h: hmUI.align.RIGHT,
  align_v: hmUI.align.CENTER_V,
  font: FONT,
  text: '',
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const DATE_TEXT_PROPS = {
  ...TIME_TEXT_PROPS,
  y: px(359),
};

export const DATA_1_TEXT_PROPS = {
  ...TIME_TEXT_PROPS,
  x: px(74),
  color: COLORS.textAccent,
  align_h: hmUI.align.LEFT,
};

export const DATA_2_TEXT_PROPS = {
  ...DATA_1_TEXT_PROPS,
  y: px(359),
};

export const EDIT_BACKGROUND_IMAGE_PROPS = {
  x: 0,
  y: 0,
  src: 'edit/background.png',
  show_level: hmUI.show_level.ONLY_EDIT,
};

export const COLOR_EDIT_GROUP_PROPS = {
  edit_id: 101,
  x: px(65),
  y: px(175),
  w: px(351),
  h: px(118),
  select_image: 'edit/color_select.png',
  un_select_image: 'edit/color_unselect.png',
  default_type: ACCENT_COLORS[0].type,
  optional_types: ACCENT_COLORS,
  count: ACCENT_COLORS.length,
  tips_BG: 'edit/tip.png',
  tips_x: px(10),
  tips_y: px(-35),
  tips_width: px(90),
  tips_margin: px(5),
};

export const DATA_1_EDIT_GROUP_PROPS = {
  edit_id: 102,
  x: px(65),
  y: px(307),
  w: px(150),
  h: px(50),
  select_image: 'edit/data_select.png',
  un_select_image: 'edit/data_unselect.png',
  default_type: hmUI.edit_type.HEART,
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
  count: 7,
  tips_BG: 'edit/tip.png',
  tips_x: px(10),
  tips_y: px(-35),
  tips_width: px(90),
  tips_margin: px(5),
};

export const DATA_2_EDIT_GROUP_PROPS = {
  ...DATA_1_EDIT_GROUP_PROPS,
  edit_id: 103,
  default_type: hmUI.edit_type.STEP,
  y: px(357),
};

export const DATE_EDIT_GROUP_PROPS = {
  edit_id: 104,
  x: px(266),
  y: px(357),
  w: px(150),
  h: px(50),
  select_image: 'edit/data_select.png',
  un_select_image: 'edit/data_unselect.png',
  default_type: DATE_TYPES[0].type,
  optional_types: DATE_TYPES,
  count: DATE_TYPES.length,
  tips_BG: 'edit/tip.png',
  tips_x: px(10),
  tips_y: px(-35),
  tips_width: px(90),
  tips_margin: px(5),
};
