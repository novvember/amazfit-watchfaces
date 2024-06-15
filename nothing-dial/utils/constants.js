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
  primary: 0x000000,
  secondary: 0xebebed,
  background: 0x767578,
  aod: 0x767578,
};

export const FONT_FAMILY = {
  primary: 'fonts/ndot-55.ttf',
  secondary: 'fonts/martian-mono-regular.ttf',
};

export const FONT_SIZE = {
  primary: px(48),
  secondary: px(21),
};

export const BACKGROUND_CIRCLE = {
  radius: px(370 / 2),
};

export const MINUTE_CENTER = {
  radius: px(32 / 2),
};

export const SECOND = {
  animationDuration: 5000,
  size: px(34),
  y: px(12),
};

export const TIME = {
  x: px(220),
  y: px(151),
  width: px(200),
  height: px(40),
};

export const DATE = {
  x: px(224),
  y: px(286),
  width: px(200),
  height: px(25),
  weekDays: isRusLang
    ? ['ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ', 'ВС']
    : ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'],
};

export const STEPS = {
  x: px(224),
  y: px(322),
  width: px(200),
  height: px(25),
  stepsString: isRusLang
    ? ['шаг', 'шага', 'шагов']
    : ['step', 'steps', 'steps'],
};

export const WEATHER_ICON = {
  x: px(224),
  y: px(354),
};

export const WEATHER_TEMP = {
  x: px(268),
  y: px(358),
  width: px(150),
  height: px(25),
};

export const BATTERY = {
  x: px(224),
  y: px(394),
  width: px(200),
  height: px(25),
};

export const DISCONNECT = {
  width: px(40),
  y: px(90),
};

