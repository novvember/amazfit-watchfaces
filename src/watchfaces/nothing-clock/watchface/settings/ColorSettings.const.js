import { gettext } from 'i18n';

export const SETTINGS_COLOR_OPTIONAL_TYPES = [
  {
    type: 100101,
    title_en: gettext('red'),
    title_tc: gettext('red'),
    title_sc: gettext('red'),
    preview: 'edit/color_preview_red.png',
    data: { type: 'red' },
  },
  {
    type: 100102,
    title_en: gettext('blue'),
    title_tc: gettext('blue'),
    title_sc: gettext('blue'),
    preview: 'edit/color_preview_blue.png',
    data: { type: 'blue' },
  },
  {
    type: 100103,
    title_en: gettext('green'),
    title_tc: gettext('green'),
    title_sc: gettext('green'),
    preview: 'edit/color_preview_green.png',
    data: { type: 'green' },
  },
  {
    type: 100104,
    title_en: gettext('yellow'),
    title_tc: gettext('yellow'),
    title_sc: gettext('yellow'),
    preview: 'edit/color_preview_yellow.png',
    data: { type: 'yellow' },
  },
];
