const { width, height } = hmSetting.getDeviceInfo();

const lang = DeviceRuntimeCore.HmUtils.getLanguage();
const isRusLang = ['ru-RU', 'uk-UA'].includes(lang);

export const SCREEN = {
  width,
  height,
  centerX: width / 2,
  centerY: height / 2,
};

export const COLORS = {
  sun: 0x000000,
  text: 0xffffff,
  time: 0xffdc37,
  sleep: 0xceb12a,
};

export const FONT = 'fonts/Inter_24pt-SemiBold.ttf';

const WEEKDAYS_EN = [
  'MONDAY',
  'TUESDAY',
  'WEDNESDAY',
  'THURSDAY',
  'FRIDAY',
  'SATURDAY',
  'SUNDAY',
];
const WEEKDAYS_RU = [
  'ПОНЕДЕЛЬНИК',
  'ВТОРНИК',
  'СРЕДА',
  'ЧЕТВЕРГ',
  'ПЯТНИЦА',
  'СУББОТА',
  'ВОСКРЕСЕНЬЕ',
];
export const WEEKDAYS = isRusLang ? WEEKDAYS_RU : WEEKDAYS_EN;

const MONTHS_EN = [
  'JANUARY',
  'FEBRUARY',
  'MARCH',
  'APRIL',
  'MAY',
  'JUNE',
  'JULY',
  'AUGUST',
  'SEPTEMBER',
  'OCTOBER',
  'NOVEMBER',
  'DECEMBER',
];
const MONTHS_RU = [
  'ЯНВАРЬ',
  'ФЕВРАЛЬ',
  'МАРТ',
  'АПРЕЛЬ',
  'МАЙ',
  'ИЮНЬ',
  'ИЮЛЬ',
  'АВГУСТ',
  'СЕНТЯБРЬ',
  'ОКТЯБРЬ',
  'НОЯБРЬ',
  'ДЕКАБРЬ',
];
export const MONTHS = isRusLang ? MONTHS_RU : MONTHS_EN;

const STEPS_TEXT_RU = ['шаг', 'шага', 'шагов', 'шагов'];
const STEPS_TEXT_EN = ['step', 'steps'];
export const STEPS_TEXT = isRusLang ? STEPS_TEXT_RU : STEPS_TEXT_EN;

const HEART_TEXT_RU = 'ЧСС %s';
const HEART_TEXT_EN = '%s BPM';
export const HEART_TEXT = isRusLang ? HEART_TEXT_RU : HEART_TEXT_EN;
