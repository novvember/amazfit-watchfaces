const lang = DeviceRuntimeCore.HmUtils.getLanguage();
const isRusLang = ['ru-RU', 'uk-UA'].includes(lang);

const { width, height } = hmSetting.getDeviceInfo();

export const SCREEN = {
  centerX: width / 2,
  centerY: height / 2,
};

export const COLORS = {
  primary: 0xd9d9d9,
  secondary: 0x3b3a3b,
};

export const FONT = 'fonts/Alatsi-Regular.ttf';

export const GRID = {
  size: {
    columns: 7,
    rows: 11,
  },
  cell: {
    width: px(32),
    height: px(32),
  },
};

export const CALENDAR = {
  currentWeekIndex: 3,
  date: {
    width: GRID.cell.width,
    height: GRID.cell.height,
  },
  weekDay: {
    width: GRID.cell.width,
    height: GRID.cell.height,
    images: new Array(7)
      .fill(null)
      .map((_, i) => `${isRusLang ? 'week_rus' : 'week'}/${i}.png`),
  },
  year: {
    width: GRID.cell.width,
    height: GRID.cell.height,
  },
  month: {
    width: px(40),
    height: GRID.cell.height,
    images: new Array(12)
      .fill(null)
      .map((_, i) => `${isRusLang ? 'month_rus' : 'month'}/${i}.png`),
  },
};

export const DIGITS = {
  width: px(12),
  height: px(18),
  images: new Array(10).fill(null).map((_, i) => `digits/${i}.png`),
};

export const SPECIAL_CHARS = {
  percent: {
    width: px(19),
    src: 'special_chars/percent.png',
  },
};

export const SECONDS_PROGRESS_BAR = {
  width: px(224),
  height: GRID.cell.height,
};

export const ARC = {
  colorBackground: COLORS.secondary,
  colorActive: COLORS.primary,
  radius: px(231),
  width: px(14),
};

export const STEPS = {
  angleStart: 130,
  angleEnd: 50,
};

export const BATTERY = {
  x: px(37),
  y: px(294),
  angleStart: 230,
  angleEnd: 265,
};

export const SLEEP = {
  x: px(35),
  y: px(156),
  angleStart: 275,
  angleEnd: 310,
  width: px(50),
  height: px(32),
  textSize: px(21),
};

export const CONNECTION_STATUS = {
  width: px(28),
  height: px(28),
  x: px(27),
};

export const ALARM_STATUS = {
  width: px(28),
  height: px(28),
  x: px(58),
};
