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
  accent: 0xf54a1b,
  bgPrimary: 0xebebed,
  bgSecondary: 0x54575f,
  bgTertiary: 0x2d3134,
  bgOnAccent: 0x000000,
  textPrimary: 0x000000,
  textSecondary: 0xebebed,
  aod: 0xb1b1b1,
};

export const FONT_FAMILY = {
  primary: hasCustomFontSupport ? 'fonts/MartianMono-Regular.ttf' : undefined,
  primaryAod: hasCustomFontSupport ? 'fonts/MartianMono-ExtraLight.ttf' : undefined,
};

export const FONT_SIZE = {
  primary: hasCustomFontSupport ? px(28) : px(32),
  primaryAod: hasCustomFontSupport ? px(32) : px(36),
  secondary: hasCustomFontSupport ? px(20) : px(26),
};

export const SLEEP = {
  x: px(52),
  y: px(58),
  width: px(120),
  height: px(120),
  lineWidth: px(10),
  wakeStagesArcRadius: px(54),
  wakeStagesArcWidth: px(5),
};

const SLEEP_TEXT_RU = '%s\nсон';
const SLEEP_TEXT_EN = '%s\nsleep';
export const SLEEP_TEXT = isRusLang ? SLEEP_TEXT_RU : SLEEP_TEXT_EN;

export const SUN = {
  sunrise: isRusLang ? 'восход' : 'sunrise',
  sunset: isRusLang ? 'закат' : 'sunset',
};

const MONTH_TEXTS_RU = [
  'Янв',
  'Фев',
  'Мар',
  'Апр',
  'Май',
  'Июн',
  'Июл',
  'Авг',
  'Сен',
  'Окт',
  'Ноя',
  'Дек',
];
const MONTH_TEXTS_EN = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];
export const MONTH_TEXTS = isRusLang ? MONTH_TEXTS_RU : MONTH_TEXTS_EN;

const WEEKDAY_IMAGES_RU = new Array(7)
  .fill(null)
  .map((_, i) => `date_week_rus/${i}.png`);
const WEEKDAY_IMAGES_EN = new Array(7)
  .fill(null)
  .map((_, i) => `date_week/${i}.png`);
export const WEEKDAY_IMAGES = isRusLang ? WEEKDAY_IMAGES_RU : WEEKDAY_IMAGES_EN;

export const SECONDS = {
  x: px(308),
  y: px(58),
  width: px(120),
  height: px(120),
  cover: {
    x: px(54),
    y: px(54),
  },
};

export const WEATHER = {
  x: px(52),
  y: px(200),
  width: px(184),
  height: px(80),
};

export const TIME = {
  x: px(244),
  y: px(200),
  width: px(184),
  height: px(80),
};

const STEPS_POSTFIX_RU = ['шаг', 'шага', 'шагов', 'шагов'];
const STEPS_POSTFIX_EN = ['step', 'steps'];
export const STEPS_POSTFIX = isRusLang ? STEPS_POSTFIX_RU : STEPS_POSTFIX_EN;

export const STEPS = {
  x: px(52),
  y: px(302),
  width: px(120),
  height: px(120),
};

export const PULSE = {
  x: px(180),
  y: px(302),
  width: px(120),
  height: px(120),
  angleStart: -135,
  angleEnd: 135,
  lineWidth: px(16),
  icon: {
    x: px(221),
    y: px(343),
  },
  pointer: {
    minValue: 40,
    maxValue: 140,
    size: px(16),
  },
};

export const BATTERY = {
  x: px(308),
  y: px(302),
};

const BATTERY_TEXT_RU = '%s%\nзаряд';
const BATTERY_TEXT_EN = '%s%\nbattery';
export const BATTERY_TEXT = isRusLang ? BATTERY_TEXT_RU : BATTERY_TEXT_EN;
