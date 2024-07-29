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
  primary: 0xd8d8d8,
  background: 0x28282b,
};

export const FONTS = {
  primary: 'fonts/Tomorrow-SemiBold.ttf',
  secondary: 'fonts/Handjet-Light.ttf',
};

export const FONT_SIZE = {
  time: px(88),
  seconds: px(56),
  secondary: px(34),
  tertiary: px(28),
  today: px(32),
};

export const WEEKDAYS = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];
