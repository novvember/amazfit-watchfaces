import { OPTIONAL_TYPES, SCREEN } from '../utils/constants';

export const BACKGROUND_IMAGE_PROPS = {
  x: 0,
  y: 0,
  src: 'common/background.png',
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const EDIT_BACKGROUND_IMAGE_PROPS = {
  ...BACKGROUND_IMAGE_PROPS,
  src: 'edit/background.png',
  show_level: hmUI.show_level.ONLY_EDIT,
};

export const MARKS_IMAGE_PROPS = {
  x: 0,
  y: 0,
  src: 'common/marks.png',
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const SECOND_POINTER_PROPS = {
  second_centerX: 0,
  second_centerY: 0,
  second_posX: 0,
  second_posY: 0,
  second_path: 'common/empty.png',
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const HOUR_POINTER_PROPS = {
  hour_centerX: SCREEN.centerX,
  hour_centerY: SCREEN.centerY,
  hour_posX: SCREEN.centerX,
  hour_posY: SCREEN.centerY,
  hour_path: 'common/hour.png',
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const MINUTE_POINTER_PROPS = {
  minute_centerX: SCREEN.centerX,
  minute_centerY: SCREEN.centerY,
  minute_posX: SCREEN.centerX,
  minute_posY: SCREEN.centerY,
  minute_path: 'common/minute.png',
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const TIME_TEXT_PROPS = {
  x: 0,
  y: SCREEN.centerY - px(156) / 2,
  w: SCREEN.width,
  h: px(156),
  color: 0xffffff,
  text_size: px(90),
  align_h: hmUI.align.CENTER_H,
  align_v: hmUI.align.CENTER_V,
  font: 'fonts/Inter_18pt-Regular.ttf',
  text: '',
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const TIME_TEXT_EDIT_GROUP_PROPS = {
  edit_id: 101,
  x: px(100),
  y: px(195),
  w: px(280),
  h: px(90),
  select_image: 'edit/text_select.png',
  un_select_image: 'edit/text_unselect.png',
  default_type: OPTIONAL_TYPES.disabled,
  optional_types: [
    {
      type: OPTIONAL_TYPES.disabled,
      preview: 'edit/text_off.png',
      title_en: 'Off',
    },
    {
      type: OPTIONAL_TYPES.enabled,
      preview: 'edit/text_on.png',
      title_en: 'On',
    },
  ],
  count: 2,
  tips_BG: 'edit/text_tip.png',
  tips_x: px(280) / 2 - px(100) / 2,
  tips_y: px(-40),
  tips_width: px(100),
  tips_margin: px(30),
};

export const MARKS_EDIT_GROUP_PROPS = {
  edit_id: 102,
  x: px(50),
  y: px(390),
  w: px(380),
  h: px(90),
  select_image: 'edit/marks_select.png',
  un_select_image: 'edit/marks_unselect.png',
  default_type: OPTIONAL_TYPES.disabled,
  optional_types: [
    {
      type: OPTIONAL_TYPES.disabled,
      preview: 'edit/marks_off.png',
      title_en: 'Off',
    },
    {
      type: OPTIONAL_TYPES.enabled,
      preview: 'edit/marks_on.png',
      title_en: 'On',
    },
  ],
  count: 2,
  tips_BG: 'edit/text_tip.png',
  tips_x: px(380) / 2 - px(100) / 2,
  tips_y: px(-40),
  tips_width: px(100),
  tips_margin: px(30),
};
