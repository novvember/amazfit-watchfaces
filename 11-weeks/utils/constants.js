const lang = DeviceRuntimeCore.HmUtils.getLanguage();
const isRusLang = ['ru-RU', 'uk-UA'].includes(lang);

const { width, height } = hmSetting.getDeviceInfo();

// Needed to scale images and fonts properly
const scaleRatio = width / 480;
// Cells must have no gap between
const GRID_CELL_SIZE = scaleRatio < 1 ? px(27) : px(28);
// Texts with custom fonts mast have the same visual size as text with images
const TEXT_SIZE = scaleRatio < 1 ? px(20) : px(21);

export const SCREEN = {
  width,
  height,
  centerX: width / 2,
  centerY: height / 2,
};

export const COLORS = {
  primary: 0xd9d9d9,
  secondary: 0x343334,
  accent: 0xF54A1B,
};

export const FONTS = {
  digits: 'fonts/Alatsi-Regular.ttf',
};

export const GRID = {
  size: {
    columns: 7,
    rows: 11,
  },
  cell: {
    width: GRID_CELL_SIZE,
    height: GRID_CELL_SIZE,
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
    dotY: px(40),
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
  dot: {
    src: 'special_chars/dot.png',
    width: px(6),
  },
  heart: {
    src: 'special_chars/heart.png',
    width: px(22),
  },
  moon: {
    src: 'special_chars/moon.png',
    width: px(20),
  },
};

export const SECONDS_PROGRESS_BAR = {
  height: GRID.cell.height,
  width: px(196),
  gapTop: px(2),
};

export const STEPS = {
  x: px(380),
  y: px(147),
  progressImage: {
    x: px(382),
    y: px(84),
    count: 10,
  },
};

export const PULSE = {
  x: px(402),
  y: px(315),
  textSize: TEXT_SIZE,
  width: px(50),
  height: px(30),

  min: {
    x: px(358),
    y: px(382),
  },
  max: {
    x: px(406),
    y: px(242),
  },
  progressArc: {
    radius: px(230),
    lineWidth: px(10),
    angleStart: 130,
    angleEnd: 93,
  }
};

export const BATTERY = {
  x: px(43),
  y: px(315),
  progressImage: {
    x: px(0),
    y: px(240),
  },
};

export const SLEEP = {
  x: px(39),
  y: px(144),
  width: px(60),
  height: px(30),
  textSize: TEXT_SIZE,
  progressImage: {
    x: px(0),
    y: px(84),
  },
};

export const CONNECTION_STATUS = {
  width: px(28),
  height: px(28),
  x: px(41),
  y: px(226),
};

export const ALARM_STATUS = {
  width: px(28),
  height: px(28),
  x: px(72),
  y: px(226),
};

export const TIME_DIGITS_AOD = {
  images: new Array(10).fill(null).map((_, i) => `aod/${i}.png`),
  width: px(112),
  height: px(168),
};
