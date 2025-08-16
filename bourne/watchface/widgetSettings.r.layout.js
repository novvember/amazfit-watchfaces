import { gettext } from 'i18n';
import { CHAR_POSITIONS } from '../utils/constants';

export const ROW_OPTIONAL_TYPES = [
  {
    type: 100001,
    title_en: gettext('Heart Rate'),
    preview: 'edit/widget_preview_heart.png',
    data: {
      type: 'heart-rate',
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
    title_en: gettext('Temperature'),
    preview: 'edit/widget_preview_temperature.png',
    data: {
      type: 'temperature',
    },
  },
  {
    type: 100004,
    title_en: gettext('Steps'),
    preview: 'edit/widget_preview_steps.png',
    data: {
      type: 'steps',
    },
  },
];

export const ROW_EDIT_GROUP_PROPS = {
  edit_id: 0,
  x: CHAR_POSITIONS.columnsX[0],
  y: 0,
  w: px(310),
  h: px(75),
  select_image: 'edit/widget_select.png',
  un_select_image: 'edit/widget_unselect.png',
  optional_types: ROW_OPTIONAL_TYPES,
  default_type: 0,
  count: ROW_OPTIONAL_TYPES.length,
  tips_BG: 'edit/tip.png',
  tips_width: px(150),
  tips_margin: px(6),
  tips_x: px((310 - 150) / 2),
  tips_y: px((75 - 30) / 2),
};

export const COLORS_OPTIONAL_TYPES = [
  {
    type: 100101,
    title_en: gettext('Colors'),
    preview: 'edit/colors_preview_1.png',
    data: {
      type: '1',
    },
  },
  {
    type: 100102,
    title_en: gettext('Colors'),
    preview: 'edit/colors_preview_2.png',
    data: {
      type: '2',
    },
  },
  {
    type: 100103,
    title_en: gettext('Colors'),
    preview: 'edit/colors_preview_3.png',
    data: {
      type: '3',
    },
  },
  {
    type: 100104,
    title_en: gettext('Colors'),
    preview: 'edit/colors_preview_4.png',
    data: {
      type: '4',
    },
  },
];

export const COLORS_EDIT_GROUP_PROPS = {
  edit_id: 100,
  x: px(4),
  y: px(202),
  w: px(75),
  h: px(75),
  select_image: 'edit/colors_select.png',
  un_select_image: 'edit/colors_unselect.png',
  optional_types: COLORS_OPTIONAL_TYPES,
  default_type: COLORS_OPTIONAL_TYPES[0].type,
  count: COLORS_OPTIONAL_TYPES.length,
  tips_BG: 'edit/tip.png',
  tips_width: px(150),
  tips_margin: px(6),
  tips_x: px(75 + 10),
  tips_y: px((75 - 30) / 2),
};
