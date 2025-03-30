import { getHasCustomFontSupport } from './getHasCustomFontSupport';

const lang = DeviceRuntimeCore.HmUtils.getLanguage();
export const isRusLang = ['ru-RU', 'uk-UA'].includes(lang);

const hasCustomFontSupport = getHasCustomFontSupport();

const { width, height } = hmSetting.getDeviceInfo();

export const SCREEN = {
  width,
  height,
  centerX: width / 2,
  centerY: height / 2,
};

export const FONTS = {
  time: hasCustomFontSupport
    ? 'fonts/SofiaSansExtraCondensed-Regular.ttf'
    : undefined,
  widget: hasCustomFontSupport ? 'fonts/SofiaSans-SemiBold.ttf' : undefined,
  aod: hasCustomFontSupport
    ? 'fonts/SofiaSansExtraCondensed-Thin.ttf'
    : undefined,
};

export const FONT_SIZE = {
  time: hasCustomFontSupport ? px(180) : px(120),
  scale: hasCustomFontSupport ? px(24) : px(22),
  bottom: hasCustomFontSupport ? px(24) : px(22),
  widgetL: hasCustomFontSupport ? px(36) : px(32),
  widgetS: hasCustomFontSupport ? px(22) : px(20),
  widgetXs: hasCustomFontSupport ? px(14) : px(12),
};

export const COLORS = {
  primary: 0xffffff,
  secondary: 0xd0d0d0,
  tertiary: 0x1c1c1c,
  accent: 0x60c7f4,
  accentSecondary: 0x34596d,
  aod: 0xb1b1b1,
};

export const ARCS = {
  steps: {
    angleStart: 229,
    angleEnd: 311,
    angleGap: 1.7,
  },
  heart: {
    angleStart: 131,
    angleEnd: 49,
    angleGap: 1.7,
  },
};

export const WIDGETS = [
  {
    x: px(95),
    y: px(70),
    w: px(90),
    h: px(90),
  },
  {
    x: px(195),
    y: px(70),
    w: px(90),
    h: px(90),
  },
  {
    x: px(295),
    y: px(70),
    w: px(90),
    h: px(90),
  },
  {
    x: px(95),
    y: px(312),
    w: px(90),
    h: px(90),
  },
  {
    x: px(195),
    y: px(312),
    w: px(90),
    h: px(90),
  },
  {
    x: px(295),
    y: px(312),
    w: px(90),
    h: px(90),
  },
];

const SLEEP_TEXT_EN = 'SLEEP %s';
const SLEEP_TEXT_RU = 'СОН %s';
export const SLEEP_TEXT = isRusLang ? SLEEP_TEXT_RU : SLEEP_TEXT_EN;

const WEEKDAYS_EN = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];
const WEEKDAYS_RU = ['ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ', 'ВС'];
export const WEEKDAYS = isRusLang ? WEEKDAYS_RU : WEEKDAYS_EN;

const WIND_POSTFIX_EN = 'MPS';
const WIND_POSTFIX_RU = 'М/С';
export const WIND_POSTFIX = isRusLang ? WIND_POSTFIX_RU : WIND_POSTFIX_EN;

export const WIDGET_OPTIONAL_TYPES = [
  {
    type: 100001,
    title_en: isRusLang ? 'Температура' : 'Temperature',
    preview: 'edit/widget_preview_temperature.png',
    data: {
      type: 'temperature',
    },
  },
  {
    type: 100002,
    title_en: isRusLang ? 'UV-индекс' : 'UV Index',
    preview: 'edit/widget_preview_uvi.png',
    data: {
      type: 'uvi',
    },
  },
  {
    type: 100003,
    title_en: isRusLang ? 'Солнце' : 'Sun',
    preview: 'edit/widget_preview_sun.png',
    data: {
      type: 'sun',
    },
  },
  {
    type: 100004,
    title_en: isRusLang ? 'Ветер' : 'Wind',
    preview: 'edit/widget_preview_wind.png',
    data: {
      type: 'wind',
    },
  },
  {
    type: 100005,
    title_en: isRusLang ? 'Дата' : 'Date',
    preview: 'edit/widget_preview_date.png',
    data: {
      type: 'date',
    },
  },
  {
    type: 100006,
    title_en: isRusLang ? 'Батарея' : 'Battery',
    preview: 'edit/widget_preview_battery.png',
    data: {
      type: 'battery',
    },
  },

  {
    type: 100000,
    title_en: isRusLang ? 'Выключить' : 'Disable',
    preview: 'edit/widget_preview_empty.png',
    data: {
      type: 'empty',
    },
  },
];
