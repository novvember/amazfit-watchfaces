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

const STEPS_TEXT_RU = ['шаг', 'шага', 'шагов'];
const STEPS_TEXT_EN = ['step', 'steps', 'steps'];
export const STEPS_TEXT = isRusLang ? STEPS_TEXT_RU : STEPS_TEXT_EN;
