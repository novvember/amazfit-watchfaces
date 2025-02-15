import { getHasCustomFontSupport } from './getHasCustomFontSupport';

const lang = DeviceRuntimeCore.HmUtils.getLanguage();
const isRusLang = ['ru-RU', 'uk-UA'].includes(lang);

const { width, height } = hmSetting.getDeviceInfo();

export const hasCustomFontSupport = getHasCustomFontSupport();

export const SCREEN = {
  width,
  height,
  centerX: width / 2,
  centerY: height / 2,
};

export const COLORS = {
  primary: 0x000000,
  secondary: 0xebebed,
  background: 0x767578,
  aod: 0xb1b1b1,
};

export const FONT_FAMILY = {
  primary: hasCustomFontSupport ? 'fonts/ndot-55.ttf' : undefined,
  secondary: hasCustomFontSupport
    ? 'fonts/martian-mono-regular.ttf'
    : undefined,
};

export const FONT_SIZE = {
  primary: hasCustomFontSupport ? px(48) : px(40),
  secondary: hasCustomFontSupport ? px(21) : px(24),
};

export const BOTTOM_WIDGET_COORDS = [
  {
    x: px(224),
    y: px(286),
  },
  {
    x: px(224),
    y: px(322),
  },
  {
    x: px(224),
    y: px(358),
  },
  {
    x: px(224),
    y: px(394),
  },
];

const WEEKDAYS_RU = ['ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ', 'ВС'];
const WEEKDAYS_EN = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];
export const WEEKDAYS = isRusLang ? WEEKDAYS_RU : WEEKDAYS_EN;

const STEPS_TEXT_RU = ['шаг', 'шага', 'шагов', 'шагов'];
const STEPS_TEXT_EN = ['step', 'steps'];
export const STEPS_TEXT = isRusLang ? STEPS_TEXT_RU : STEPS_TEXT_EN;

const HEART_TEXT_RU = '%s уд/мин';
const HEART_TEXT_EN = '%s bpm';
export const HEART_TEXT = isRusLang ? HEART_TEXT_RU : HEART_TEXT_EN;

const SLEEP_TEXT_RU = '%s сон';
const SLEEP_TEXT_EN = '%s sleep';
export const SLEEP_TEXT = isRusLang ? SLEEP_TEXT_RU : SLEEP_TEXT_EN;

const CALORIE_TEXT_RU = '%s ккал';
const CALORIE_TEXT_EN = '%s kcal';
export const CALORIE_TEXT = isRusLang ? CALORIE_TEXT_RU : CALORIE_TEXT_EN;

const DISTANCE_M_TEXT_RU = '%s м';
const DISTANCE_M_TEXT_EN = '%s m';
export const DISTANCE_M_TEXT = isRusLang
  ? DISTANCE_M_TEXT_RU
  : DISTANCE_M_TEXT_EN;

const DISTANCE_KM_TEXT_RU = '%s км';
const DISTANCE_KM_TEXT_EN = '%s km';
export const DISTANCE_KM_TEXT = isRusLang
  ? DISTANCE_KM_TEXT_RU
  : DISTANCE_KM_TEXT_EN;
