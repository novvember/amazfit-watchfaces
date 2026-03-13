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
  secondary: 0xd9d9d9,
};

export const FONT_FAMILY = {
  primary: 'fonts/ndot-55.ttf',
  secondary: 'fonts/ubuntu-regular.ttf',
};

export const FONT_SIZE = {
  primary: px(94),
  secondary: px(28),
};

export const WEEKDAYS = isRusLang
  ? ['ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ', 'ВС']
  : ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];

export const ARC_SIZE = px(36);

export const SOLAR_SIZE = {
  paddingTop: px(22),
  paddingBottom: px(21),
};

export const LUNAR_SIZE = {
  paddingTop: px(30),
  paddingBottom: px(30),
};
