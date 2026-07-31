import { gettext } from 'i18n';

export const SETTINGS_EDIT_GROUP_SIZE = px(100);
export const SETTINGS_WIDGET_EDIT_GROUP_OFFSET = px(5);

export const SETTINGS_WIDGET_OPTIONAL_TYPES = [
  {
    type: 100001,
    title_en: gettext('temperature'),
    title_tc: gettext('temperature'),
    title_sc: gettext('temperature'),
    preview: 'edit/widget_preview_temperature.png',
    data: {
      type: 'temperature',
    },
  },
  {
    type: 100002,
    title_en: gettext('uv-index'),
    title_tc: gettext('uv-index'),
    title_sc: gettext('uv-index'),
    preview: 'edit/widget_preview_uvi.png',
    data: {
      type: 'uvi',
    },
  },
  {
    type: 100003,
    title_en: gettext('the-sun'),
    title_tc: gettext('the-sun'),
    title_sc: gettext('the-sun'),
    preview: 'edit/widget_preview_sun.png',
    data: {
      type: 'sun',
    },
  },
  {
    type: 100004,
    title_en: gettext('wind'),
    title_tc: gettext('wind'),
    title_sc: gettext('wind'),
    preview: 'edit/widget_preview_wind.png',
    data: {
      type: 'wind',
    },
  },
  {
    type: 100005,
    title_en: gettext('date'),
    title_tc: gettext('date'),
    title_sc: gettext('date'),
    preview: 'edit/widget_preview_date.png',
    data: {
      type: 'date',
    },
  },
  {
    type: 100006,
    title_en: gettext('battery'),
    title_tc: gettext('battery'),
    title_sc: gettext('battery'),
    preview: 'edit/widget_preview_battery.png',
    data: {
      type: 'battery',
    },
  },
  {
    type: 100007,
    title_en: gettext('seconds'),
    title_tc: gettext('seconds'),
    title_sc: gettext('seconds'),
    preview: 'edit/widget_preview_seconds.png',
    data: {
      type: 'seconds',
    },
  },
  {
    type: 100008,
    title_en: gettext('humidity'),
    title_tc: gettext('humidity'),
    title_sc: gettext('humidity'),
    preview: 'edit/widget_preview_humidity.png',
    data: {
      type: 'humidity',
    },
  },
  {
    type: 100009,
    title_en: gettext('world-time'),
    title_tc: gettext('world-time'),
    title_sc: gettext('world-time'),
    preview: 'edit/widget_preview_worldtime.png',
    data: {
      type: 'worldtime',
    },
  },
  {
    type: 100010,
    title_en: gettext('weather'),
    title_tc: gettext('weather'),
    title_sc: gettext('weather'),
    preview: 'edit/widget_preview_weather.png',
    data: {
      type: 'weather',
    },
  },
  {
    type: 100011,
    title_en: gettext('moon'),
    title_tc: gettext('moon'),
    title_sc: gettext('moon'),
    preview: 'edit/widget_preview_moon.png',
    data: {
      type: 'moon',
    },
  },
  {
    type: 100012,
    title_en: gettext('activity-rings'),
    title_tc: gettext('activity-rings'),
    title_sc: gettext('activity-rings'),
    preview: 'edit/widget_preview_rings.png',
    data: {
      type: 'rings',
    },
  },
  {
    type: 100013,
    title_en: gettext('air-pressure'),
    title_tc: gettext('air-pressure'),
    title_sc: gettext('air-pressure'),
    preview: 'edit/widget_preview_pressure.png',
    data: {
      type: 'pressure',
    },
  },
  {
    type: 100014,
    title_en: gettext('air-quality-index'),
    title_tc: gettext('air-quality-index'),
    title_sc: gettext('air-quality-index'),
    preview: 'edit/widget_preview_aqi.png',
    data: {
      type: 'aqi',
    },
  },
  {
    type: 100015,
    title_en: gettext('pai'),
    title_tc: gettext('pai'),
    title_sc: gettext('pai'),
    preview: 'edit/widget_preview_pai.png',
    data: {
      type: 'pai',
    },
  },
  {
    type: 100116,
    title_en: gettext('calories'),
    title_tc: gettext('calories'),
    title_sc: gettext('calories'),
    preview: 'edit/widget_preview_calories.png',
    data: {
      type: 'calories',
    },
  },
  {
    type: 100216,
    title_en: gettext('recovery-time'),
    title_tc: gettext('recovery-time'),
    title_sc: gettext('recovery-time'),
    preview: 'edit/widget_preview_recovery-time.png',
    data: {
      type: 'recovery-time',
    },
  },
  {
    type: 100016,
    title_en: gettext('alarm'),
    title_tc: gettext('alarm'),
    title_sc: gettext('alarm'),
    preview: 'edit/widget_preview_alarm.png',
    data: {
      type: 'alarm',
    },
  },
  {
    type: 100017,
    title_en: gettext('clicker'),
    title_tc: gettext('clicker'),
    title_sc: gettext('clicker'),
    preview: 'edit/widget_preview_clicker.png',
    data: {
      type: 'clicker',
    },
  },

  {
    type: 100000,
    title_en: gettext('disable'),
    title_tc: gettext('disable'),
    title_sc: gettext('disable'),
    preview: 'edit/widget_preview_empty.png',
    data: {
      type: 'empty',
    },
  },
];
