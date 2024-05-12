const lang = DeviceRuntimeCore.HmUtils.getLanguage();
const isRusLang = ['ru-RU', 'uk-UA'].includes(lang);

const { width, height } = hmSetting.getDeviceInfo();

export const SCREEN = {
  centerX: width / 2,
  centerY: height / 2,
};

export const COLORS = {
  textPrimary: 0x000000,
  textSecondary: 0x767578,
  bgPrimary: 0xd9d9d9,
  bgSecondary: 0x767578,
  bgAccent: 0xf54a1b,
  bgTertiary: 0x272627,
};

export const FONTS = {
  primary: 'fonts/ndot-55.ttf',
  secondary: 'fonts/roboto-mono-regular.ttf',
};

export const DIGITS = {
  width: px(12),
  height: px(20),
  images: new Array(10).fill(null).map((_, i) => `digits/${i}.png`),
};

export const HOURS = {
  radius: px(92),
  textSize: px(116),
  offsetY: px(3),
};

export const MINUTES = {
  radius: px(35),
  textSize: px(46),
  orbitRadius: px(115),
  offsetY: px(1),
};

export const SECONDS = {
  radius: px(18),
  orbitRadius: px(161),
  animationDuration: 1000,
};

export const DATE = {
  radius: px(15),
  orbitRadius: px(213),
  textSize: px(22),
  gap: px(8),
  textWidth: px(50),
  texts: isRusLang
    ? ['ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ', 'ВС']
    : ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'],
};

export const UVI = {
  radius: px(15),
  x: px(107),
  y: px(43),
  textSize: px(22),
  gap: px(8),
  textWidth: px(50),
  text: isRusLang ? 'УФИ' : 'UVI',
};

export const DISCONNECT = {
  orbitRadius: px(213),
  width: px(32),
  height: px(32),
};

export const STEPS = {
  orbitRadius: px(213),
  angleStart: 210,
  angleEnd: 250,
  width: px(17),
  valueX: px(25),
  valueY: px(273),
  valueTextSize: px(22),
  valueWidth: px(100),
  valueHeight: px(30),
};
