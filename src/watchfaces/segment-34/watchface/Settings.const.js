import { gettext } from 'i18n';

export const DATA_EDIT_GROUPS_PARAMS = [
  {
    name: 'data-1',
    props: {
      x: px(62),
      y: px(372),
      edit_id: 0,
    },
  },
  {
    name: 'data-2',
    props: {
      x: px(190),
      y: px(372),
      edit_id: 1,
    },
  },
  {
    name: 'data-3',
    props: {
      x: px(318),
      y: px(372),
      edit_id: 2,
    },
  },
];

export const DATA_EDIT_OPTIONAL_TYPES = [
  {
    type: 100001,
    title_en: gettext('heart_rate'),
    preview: 'edit/data_slot_preview.png',
    data: {
      type: 'heart_rate',
    },
  },
  {
    type: 100002,
    title_en: gettext('calories'),
    preview: 'edit/data_slot_preview.png',
    data: {
      type: 'calories',
    },
  },
  {
    type: 100003,
    title_en: gettext('sleep_time'),
    preview: 'edit/data_slot_preview.png',
    data: {
      type: 'sleep_time',
    },
  },
  {
    type: 100004,
    title_en: gettext('distance'),
    preview: 'edit/data_slot_preview.png',
    data: {
      type: 'distance',
    },
  },
  {
    type: 100005,
    title_en: gettext('pai'),
    preview: 'edit/data_slot_preview.png',
    data: {
      type: 'pai',
    },
  },
  {
    type: 100006,
    title_en: gettext('fat_burning'),
    preview: 'edit/data_slot_preview.png',
    data: {
      type: 'fat_burning',
    },
  },
  {
    type: 100007,
    title_en: gettext('stress'),
    preview: 'edit/data_slot_preview.png',
    data: {
      type: 'stress',
    },
  },
  {
    type: 100008,
    title_en: gettext('floors'),
    preview: 'edit/data_slot_preview.png',
    data: {
      type: 'floors',
    },
  },
  {
    type: 100009,
    title_en: gettext('recovery_time'),
    preview: 'edit/data_slot_preview.png',
    data: {
      type: 'recovery_time',
    },
  },
  {
    type: 100010,
    title_en: gettext('readiness'),
    preview: 'edit/data_slot_preview.png',
    data: {
      type: 'readiness',
    },
  },
  {
    type: 100011,
    title_en: gettext('biocharge'),
    preview: 'edit/data_slot_preview.png',
    data: {
      type: 'biocharge',
    },
  },
];

export const BATTERY_EDIT_GROUPS_PARAMS = [
  {
    name: 'type',
    props: {
      x: px(215),
      y: px(450),
      edit_id: 3,
    },
  },
];

export const BATTERY_EDIT_OPTIONAL_TYPES = [
  {
    type: 100201,
    title_en: gettext('progress_bar'),
    preview: 'edit/battery_slot_preview_progress.png',
    data: {
      type: 'progress',
    },
  },
  {
    type: 100202,
    title_en: gettext('text'),
    preview: 'edit/battery_slot_preview_text.png',
    data: {
      type: 'text',
    },
  },
];
