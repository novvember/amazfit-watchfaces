import { gettext } from 'i18n';

export const WIDGET_OPTIONAL_TYPES = [
  {
    type: 100001,
    title_en: gettext('Steps'),
    preview: 'edit/widget_preview_steps.png',
    data: {
      type: 'steps',
    },
  },
  {
    type: 100002,
    title_en: gettext('Date'),
    preview: 'edit/widget_preview_date.png',
    data: {
      type: 'date',
    },
  },
  {
    type: 100003,
    title_en: gettext('Weather'),
    preview: 'edit/widget_preview_weather.png',
    data: {
      type: 'weather',
    },
  },
  {
    type: 100004,
    title_en: gettext('Battery'),
    preview: 'edit/widget_preview_battery.png',
    data: {
      type: 'battery',
    },
  },
  {
    type: 100005,
    title_en: gettext('Heart Rate'),
    preview: 'edit/widget_preview_heart.png',
    data: {
      type: 'heart',
    },
  },
  {
    type: 100100,
    title_en: gettext('Empty'),
    preview: 'edit/widget_preview_empty.png',
    data: {
      type: 'empty',
    },
  },
];

export const EDIT_SCREEN_BACKGROUND_PROPS = {
  x: 0,
  y: 0,
  src: 'edit/background.png',
  show_level: hmUI.show_level.ONLY_EDIT,
};

export const WIDGET_EDIT_GROUP_PROPS = {
  edit_id: 2,
  x: px(104),
  y: px(320),
  w: px(272),
  h: px(110),
  select_image: 'edit/widget_select.png',
  un_select_image: 'edit/widget_unselect.png',
  optional_types: WIDGET_OPTIONAL_TYPES,
  default_type: WIDGET_OPTIONAL_TYPES[0].type,
  count: WIDGET_OPTIONAL_TYPES.length,
  tips_BG: 'edit/tip.png',
  tips_x: px(10),
  tips_y: px(-40),
  tips_width: px(120),
  tips_margin: px(6),
};
