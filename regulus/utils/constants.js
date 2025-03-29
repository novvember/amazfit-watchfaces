import { getHasCustomFontSupport } from './getHasCustomFontSupport';

const hasCustomFontSupport = getHasCustomFontSupport();

const lang = DeviceRuntimeCore.HmUtils.getLanguage();
const isRusLang = ['ru-RU', 'uk-UA'].includes(lang);

const { width, height } = hmSetting.getDeviceInfo();

export const SCREEN = {
  width,
  height,
  centerX: width / 2,
  centerY: height / 2,
};

export const FONT = hasCustomFontSupport ? 'fonts/PTSans-Bold.ttf' : undefined;

export const COLORS = {
  primary: 0xd6ecf0,
  secondary: 0x22262a,
};

export const DIGITS_BIG_EMPTY_IMAGE = 'digits_big/empty.png';
export const DIGITS_BIG_EXTRA_EMPTY_IMAGE = 'digits_big_extra/empty.png';
export const DIGITS_SMALL_EMPTY_IMAGE = 'digits_small/empty.png';
export const COLON_BIG_EMPTY_IMAGE = 'colon_big/colon_empty.png';
export const COLON_BIG_IMAGE = 'colon_big/colon.png';

export const DIGITS_BIG_IMAGES = new Array(10)
  .fill(null)
  .map((_, i) => `digits_big/${i}.png`);
export const DIGITS_SMALL_IMAGES = new Array(10)
  .fill(null)
  .map((_, i) => `digits_small/${i}.png`);
export const DIGITS_BIG_EXTRA_IMAGES = new Array(10)
  .fill(null)
  .map((_, i) => `digits_big_extra/${i}.png`);

const WEEKDAYS_BIG_EXTRA_IMAGES_EN = new Array(7)
  .fill(null)
  .map((_, i) => `weekdays_big_extra/${i}.png`);
const WEEKDAYS_BIG_EXTRA_IMAGES_RU = new Array(7)
  .fill(null)
  .map((_, i) => `weekdays_big_extra_ru/${i}.png`);
export const WEEKDAYS_BIG_EXTRA_IMAGES = isRusLang
  ? WEEKDAYS_BIG_EXTRA_IMAGES_RU
  : WEEKDAYS_BIG_EXTRA_IMAGES_EN;

const ALARM_ON_IMAGE_EN = 'alarm/alarm_on.png';
const ALARM_ON_IMAGE_RU = 'alarm_ru/alarm_on.png';
export const ALARM_ON_IMAGE = isRusLang ? ALARM_ON_IMAGE_RU : ALARM_ON_IMAGE_EN;

const ALARM_OFF_IMAGE_EN = 'alarm/alarm_off.png';
const ALARM_OFF_IMAGE_RU = 'alarm_ru/alarm_off.png';
export const ALARM_OFF_IMAGE = isRusLang
  ? ALARM_OFF_IMAGE_RU
  : ALARM_OFF_IMAGE_EN;

const SILENT_ON_IMAGE_EN = 'silent/silent_on.png';
const SILENT_ON_IMAGE_RU = 'silent_ru/silent_on.png';
export const SILENT_ON_IMAGE = isRusLang
  ? SILENT_ON_IMAGE_RU
  : SILENT_ON_IMAGE_EN;

const SILENT_OFF_IMAGE_EN = 'silent/silent_off.png';
const SILENT_OFF_IMAGE_RU = 'silent_ru/silent_off.png';
export const SILENT_OFF_IMAGE = isRusLang
  ? SILENT_OFF_IMAGE_RU
  : SILENT_OFF_IMAGE_EN;

const CITY_1_DEFAULT_RU = 'ВРЕМЯ 1';
const CITY_1_DEFAULT_EN = 'TIME 1';
export const CITY_1_DEFAULT = isRusLang ? CITY_1_DEFAULT_RU : CITY_1_DEFAULT_EN;

const CITY_2_DEFAULT_RU = 'ВРЕМЯ 2';
const CITY_2_DEFAULT_EN = 'TIME 2';
export const CITY_2_DEFAULT = isRusLang ? CITY_2_DEFAULT_RU : CITY_2_DEFAULT_EN;

export const TOPLINE_DIGITS_BIG_COORDS = [
  [px(62), px(113)],
  [px(62 + 66), px(113)],
  [px(212), px(113)],
  [px(212 + 66), px(113)],
];

export const TOPLINE_DIGITS_SMALL_COORDS = [
  [px(348), px(115)],
  [px(348 + 32 + 1), px(115)],
];

export const TOPLINE_COLONS_COORDS = [[px(170), px(113)]];

export const BOTTOMLINE_DIGITS_BIG_COORDS = [
  [px(62), px(270)],
  [px(62 + 66), px(270)],
  [px(212), px(270)],
  [px(212 + 66), px(270)],
];

export const BOTTOMLINE_DIGITS_SMALL_COORDS = [
  [px(348), px(272)],
  [px(348 + 32 + 1), px(272)],
];

export const BOTTOMLINE_COLONS_COORDS = [[px(170), px(272)]];

export const BOTTOM_OPTIONAL_TYPES = [
  {
    type: 100201,
    title_en: isRusLang ? 'Дата' : 'Date',
    preview: 'edit/bottom_preview_date.png',
    data: {
      type: 'date',
    },
  },
  {
    type: 100202,
    title_en: isRusLang ? 'Мировое время' : 'World Time',
    preview: 'edit/bottom_preview_world_time.png',
    data: {
      type: 'world_time',
    },
  },
];

export const CENTRAL_OPTIONAL_TYPES = [
  {
    type: 100001,
    title_en: isRusLang ? 'Закат' : 'Sunset',
    preview: 'edit/center_preview_time.png',
    data: {
      type: 'sunset',
    },
  },
  {
    type: 100002,
    title_en: isRusLang ? 'Рассвет' : 'Sunrise',
    preview: 'edit/center_preview_time.png',
    data: {
      type: 'sunrise',
    },
  },
  {
    type: 100003,
    title_en: isRusLang ? 'Сон' : 'Sleep',
    preview: 'edit/center_preview_time.png',
    data: {
      type: 'sleep',
    },
  },
  {
    type: 100004,
    title_en: isRusLang ? 'Погода' : 'Weather',
    preview: 'edit/center_preview_weather.png',
    data: {
      type: 'weather',
    },
  },
  {
    type: 100005,
    title_en: isRusLang ? 'Пульс' : 'Heart Rate',
    preview: 'edit/center_preview_heart.png',
    data: {
      type: 'heart',
    },
  },
  {
    type: 100006,
    title_en: isRusLang ? 'Шаги' : 'Steps',
    preview: 'edit/center_preview_steps.png',
    data: {
      type: 'steps',
    },
  },
  {
    type: 100007,
    title_en: isRusLang ? 'Калории' : 'Calories',
    preview: 'edit/center_preview_long.png',
    data: {
      type: 'calories',
    },
  },
  {
    type: 100008,
    title_en: isRusLang ? 'Расстояние' : 'Distance',
    preview: 'edit/center_preview_long.png',
    data: {
      type: 'distance',
    },
  },
];
