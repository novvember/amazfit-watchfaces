import { getText } from '@zos/i18n';

export const COLORS = {
  accent: 0xff4433,
  primary: 0xffffff,
};

export const FONT = 'fonts/Play-Regular.ttf';

export const OUTER_SCALE_OPTIONAL_TYPES = [
  {
    type: 100001,
    title_en: getText('steps'),
    preview: '',
    data: {
      type: 'steps',
    },
  },
  {
    type: 100002,
    title_en: getText('calories'),
    preview: '',
    data: {
      type: 'calories',
    },
  },
  {
    type: 100003,
    title_en: getText('stand'),
    preview: '',
    data: {
      type: 'stand',
    },
  },
  {
    type: 100004,
    title_en: getText('fat_burning'),
    preview: '',
    data: {
      type: 'fat_burning',
    },
  },
];

export const BOTTOM_INFO_OPTIONAL_TYPES = [
  {
    type: 100101,
    title_en: getText('steps'),
    preview: 'edit/bottom_preview_steps.png',
    data: {
      type: 'steps',
    },
  },
  {
    type: 100102,
    title_en: getText('calories'),
    preview: 'edit/bottom_preview_calories.png',
    data: {
      type: 'calories',
    },
  },
  {
    type: 100103,
    title_en: getText('stand'),
    preview: 'edit/bottom_preview_stand.png',
    data: {
      type: 'stand',
    },
  },
  {
    type: 100104,
    title_en: getText('fat_burning'),
    preview: 'edit/bottom_preview_fat-burning.png',
    data: {
      type: 'fat_burning',
    },
  },
  {
    type: 100105,
    title_en: getText('battery'),
    preview: 'edit/bottom_preview_battery.png',
    data: {
      type: 'battery',
    },
  },
  {
    type: 100106,
    title_en: getText('heart_rate'),
    preview: 'edit/bottom_preview_heart-rate.png',
    data: {
      type: 'heart_rate',
    },
  },
  {
    type: 100107,
    title_en: getText('total_pai'),
    preview: 'edit/bottom_preview_total-pai.png',
    data: {
      type: 'total_pai',
    },
  },
  {
    type: 100108,
    title_en: getText('distance'),
    preview: 'edit/bottom_preview_distance.png',
    data: {
      type: 'distance',
    },
  },
  // {
  //   type: 100109,
  //   title_en: getText('weather'),
  //   preview: 'edit/bottom_preview_weather.png',
  //   data: {
  //     type: 'weather',
  //   },
  // },
];
