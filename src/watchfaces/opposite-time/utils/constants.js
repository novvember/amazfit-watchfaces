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
  primary: 0xffffff,
  secondary: 0x6b6c70,
  accent: 0xfea308,
  accentFaded: 0xce7f00,
};

export const FONT = 'fonts/FiraSans-Black.ttf';

export const WIDTH = isRusLang ? px(364) : px(324);

export const TEXT_HEIGHT = px(44);
export const TEXT_SIZE = px(52);

export const LINE_Y = new Array(7)
  .fill(null)
  .map((_, i) => px(82) + i * TEXT_HEIGHT);

const DIGITS_EN = [
  'ZERO',
  'ONE',
  'TWO',
  'THREE',
  'FOUR',
  'FIVE',
  'SIX',
  'SEVEN',
  'EIGHT',
  'NINE',
];

const DIGITS_RU = [
  'НОЛЬ',
  'ОДИН',
  'ДВА',
  'ТРИ',
  'ЧЕТЫРЕ',
  'ПЯТЬ',
  'ШЕСТЬ',
  'СЕМЬ',
  'ВОСЕМЬ',
  'ДЕВЯТЬ',
];

export const DIGITS = isRusLang ? DIGITS_RU : DIGITS_EN;

const WEEKDAYS_EN = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];
const WEEKDAYS_RU = ['ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ', 'ВС'];
export const WEEKDAYS = isRusLang ? WEEKDAYS_RU : WEEKDAYS_EN;

export const M_TEXT = isRusLang ? 'м' : 'm';
export const KM_TEXT = isRusLang ? 'км' : 'km';
