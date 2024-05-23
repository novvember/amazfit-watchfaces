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
  secondary: 'fonts/fira-sans-regular.ttf',
};

export const DIGITS = {
  width: px(14),
  height: px(22),
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
  radius: px(18),
  orbitRadius: px(215),
  textSize: px(28),
  gap: px(5),
  textWidth: px(70),
  texts: isRusLang
    ? ['ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ', 'ВС']
    : ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'],
};

export const UVI = {
  radius: px(18),
  x: px(104),
  y: px(42),
  textSize: px(28),
  gap: px(5),
  textWidth: px(50),
  text: isRusLang ? 'УФ' : 'UV',
};

export const DISCONNECT = {
  width: px(40),
  height: px(40),
  x: px(365),
  y: px(375),
};

export const STEPS = {
  orbitRadius: px(219),
  angleStart: 110,
  angleEnd: 70,
  width: px(14),
  valueX: px(348),
  valueY: px(126),
  valueTextSize: px(28),
  valueWidth: px(100),
  valueHeight: px(30),
};

export const SLEEP_TIME = {
  orbitRadius: px(219),
  angleStart: 210,
  angleEnd: 250,
  width: px(14),
  valueX: px(20),
  valueY: px(275),
  valueTextSize: px(28),
  valueWidth: px(100),
  valueHeight: px(30),
};
