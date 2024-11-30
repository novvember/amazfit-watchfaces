import { getMatrixCoords } from './getMatrixCoords';

const lang = DeviceRuntimeCore.HmUtils.getLanguage();
const isRusLang = ['ru-RU', 'uk-UA'].includes(lang);

const { width, height } = hmSetting.getDeviceInfo();

export const SCREEN = {
  width,
  height,
  centerX: width / 2,
  centerY: height / 2,
};

export const COLORS = {
  dotHour: 0xbfc2c9,
  dotHourDisabled: 0x4b4b4b,
  dotMinute: 0xf41d09,
  dotMinuteDisabled: 0x4b4b4b,
  text: 0xffffff,
  textAccent: 0xf41d09,
};

export const ACCENT_COLORS = [
  {
    type: 100001,
    preview: 'edit/color_preview_red.png',
    title_en: 'Red',
    color: 0xf41d09,
  },
  {
    type: 100002,
    preview: 'edit/color_preview_yellow.png',
    title_en: 'Yellow',
    color: 0xffa300,
  },
  {
    type: 100003,
    preview: 'edit/color_preview_blue.png',
    title_en: 'Blue',
    color: 0x004cff,
  },
  {
    type: 100004,
    preview: 'edit/color_preview_green.png',
    title_en: 'Green',
    color: 0x4ae300,
  },
  {
    type: 100005,
    preview: 'edit/color_preview_white.png',
    title_en: 'White',
    color: 0xffffff,
  },
];

export const DATE_TYPES = [
  {
    type: 100201,
    preview: 'edit/date_preview_month.png',
    title_en: 'Month',
  },
  {
    type: 100202,
    preview: 'edit/date_preview_weekday.png',
    title_en: 'Weekday',
  },
];

export const FONT = 'fonts/FiraSans-SemiBold.ttf';

export const DOT_SIZE = {
  s: px(12),
  l: px(42),
  disabled: px(8),
};

const GAP_X = px(14);
const GAP_Y = px(14);

export const MINUTE_SMALL_DOT_GAP = px(14);

export const HOUR_COORD = getMatrixCoords(
  [6, 2],
  [DOT_SIZE.l + GAP_X, DOT_SIZE.l + GAP_Y],
  [SCREEN.centerX - 2.5 * (DOT_SIZE.l + GAP_X), px(68) + DOT_SIZE.l / 2],
);

export const MINUTE_COORD = getMatrixCoords(
  [6, 2],
  [DOT_SIZE.l + GAP_X, DOT_SIZE.l + GAP_Y],
  [
    SCREEN.centerX - 2.5 * (DOT_SIZE.l + GAP_X),
    HOUR_COORD[0][1] + 2 * (DOT_SIZE.l + GAP_Y),
  ],
);

export const M_TEXT = isRusLang ? 'м' : 'm';
export const KM_TEXT = isRusLang ? 'км' : 'km';

const WEEKDAYS_EN = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];
const WEEKDAYS_RU = ['ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ', 'ВС'];
export const WEEKDAYS = isRusLang ? WEEKDAYS_RU : WEEKDAYS_EN;