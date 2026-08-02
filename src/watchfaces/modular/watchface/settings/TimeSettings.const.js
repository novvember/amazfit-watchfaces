import { gettext } from 'i18n';

export const SETTINGS_TIME_OPTIONAL_TYPES = [
  {
    type: 100101,
    title_en: gettext('time-default'),
    title_tc: gettext('time-default'),
    title_sc: gettext('time-default'),
    preview: 'edit/time_preview_default.png',
    data: {
      type: 'default',
    },
  },
  {
    type: 100102,
    title_en: gettext('time-seconds'),
    title_tc: gettext('time-seconds'),
    title_sc: gettext('time-seconds'),
    preview: 'edit/time_preview_seconds.png',
    data: {
      type: 'seconds',
    },
  },
];
