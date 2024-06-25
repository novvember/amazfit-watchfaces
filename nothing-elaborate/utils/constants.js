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
  accent: 0xf54a1b,
  bgPrimary: 0xebebed,
  bgSecondary: 0x54575f,
  bgTertiary: 0x2d3134,
  textPrimary: 0x000000,
  textSecondary: 0xebebed,
};

export const FONT_FAMILY = {
  primary: 'fonts/martian-mono-regular.ttf',
};

export const FONT_SIZE = {
  primary: px(28),
  secondary: px(20),
};

export const SLEEP = {
  x: px(52),
  y: px(58),
  width: px(120),
  height: px(120),
  postfix: isRusLang ? 'сон' : 'sleep',
  lineWidth: px(10),
};

export const DATE_TEXT = {
  x: px(180),
  y: px(58),
  width: px(120),
  height: px(120),
  textSize: px(18),
  months: isRusLang
    ? [
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
      ]
    : [
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
      ],
};

export const DATE_WEEK = {
  x: px(172),
  y: px(51),
  weeksArray: isRusLang
    ? new Array(7).fill(null).map((_, i) => `date_week_rus/${i}.png`)
    : new Array(7).fill(null).map((_, i) => `date_week/${i}.png`),
};

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
  radius: px(40),
  textSize: px(28),
  icon: {
    x: px(92),
    y: px(226),
  },
  text: {
    x: px(139),
    width: px(97),
  },
};

export const TIME = {
  x: px(244),
  y: px(200),
  width: px(184),
  height: px(80),
  radius: px(15),
  textSize: px(28),
};

export const STEPS = {
  x: px(52),
  y: px(302),
  width: px(120),
  height: px(120),
  postfix: isRusLang ? ['шаг', 'шага', 'шагов'] : ['step', 'steps', 'steps'],
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
    minValue: 0,
    maxValue: 160,
    size: px(16),
  },
};

export const BATTERY = {
  x: px(308),
  y: px(302),
  width: px(120),
  height: px(120),
  postfix: isRusLang ? 'заряд' : 'battery',
};

export const DISCONNECT = {
  x: px(436),
  y: px(220),
};
