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
  primary: 0xd9d9d9,
  secondary: 0x343334,
};

export const FONT = 'fonts/Alatsi-Regular.ttf';

export const GRID = {
  size: {
    columns: 7,
    rows: 11,
  },
  cell: {
    width: px(27),
    height: px(27),
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
    dotY: px(28),
  },
  year: {
    width: GRID.cell.width,
    height: GRID.cell.height,
    gap: px(2),
  },
  month: {
    width: px(42),
    height: GRID.cell.height,
    images: new Array(12)
      .fill(null)
      .map((_, i) => `${isRusLang ? 'month_rus' : 'month'}/${i}.png`),
    gap: px(2),
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
  degree: {
    src: 'special_chars/degree.png',
    width: px(9),
  },
  minus: {
    src: 'special_chars/minus.png',
    width: px(9),
  },
};

export const SECONDS_PROGRESS_BAR = {
  height: GRID.cell.height,
  width: px(196),
  gapTop: px(2),
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
  y: px(290),
  angleStart: 230,
  angleEnd: 265,
};

export const SLEEP = {
  x: px(35),
  y: px(160),
  angleStart: 275,
  angleEnd: 310,
  width: px(50),
  height: px(30),
  textSize: px(21),
};

export const CONNECTION_STATUS = {
  width: px(28),
  height: px(28),
  x: px(27),
  y: SCREEN.centerY - px(28) / 2,
};

export const ALARM_STATUS = {
  width: px(28),
  height: px(28),
  x: px(58),
  y: SCREEN.centerY - px(28) / 2,
};

export const WEATHER_ICON = {
  x: px(8),
  y: px(224),
  height: px(32),
  width: px(32),
};

export const WEATHER_TEXT = {
  x: px(46),
  y: px(231),
};

export const TIME_DIGITS_AOD = {
  images: new Array(10).fill(null).map((_, i) => `time_digits_aod/${i}.png`),
  width: px(120),
  height: px(180),
};
