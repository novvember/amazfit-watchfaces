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
  time: 0xb1b1b1,
  data: 0xffffff,
};

export const FONTS = {
  time: 'fonts/HankenGrotesk-Medium.ttf',
  data: isRusLang
    ? 'fonts/Overpass-Light.ttf'
    : 'fonts/HankenGrotesk-Light.ttf',
};

export const TEXT_SIZE = {
  time: px(170),
  data: px(22),
};

export const MINUTE_TEXT = {
  x: px(240),
  y: px(175),
  lineSpace: px(10),
  width: px(200),
  height: px(130),
};

export const HEART_POSTFIX = isRusLang ? 'пульс' : 'bpm';
export const STEPS_POSTFIX = isRusLang ? 'шаги' : 'steps';
export const BATTERY_POSTFIX = isRusLang ? 'заряд' : 'battery';

export const WEEKDAYS = isRusLang
  ? ['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс']
  : ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];

export const MONTHS = isRusLang
  ? [
      'январь',
      'февраль',
      'март',
      'апрель',
      'май',
      'июнь',
      'июль',
      'август',
      'сентябрь',
      'октябрь',
      'ноябрь',
      'декабрь',
    ]
  : [
      'january',
      'february',
      'march',
      'april',
      'may',
      'june',
      'july',
      'august',
      'september',
      'october',
      'november',
      'december',
    ];
