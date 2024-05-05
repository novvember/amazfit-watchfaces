const { width, height } = hmSetting.getDeviceInfo();

export const SCREEN = {
  centerX: width / 2,
  centerY: height / 2,
};

const lang = DeviceRuntimeCore.HmUtils.getLanguage();
export const isRusLang = ['ru-RU', 'uk-UA'].includes(lang);

export const GRID = {
  size: {
    columns: 7,
    rows: 11,
  },
  cell: {
    width: px(28),
    height: px(28),
  },
}

export const CALENDAR = {
  currentWeekIndex: 3,
  date: {
    width: px(26),
    height: px(26),
  },
  weekDay: {
    width: px(26),
    height: px(26),
    images: new Array(7).fill(null).map((_, i) => `${isRusLang ? 'week_rus' : 'week'}/${i}.png`),
  },
  year: {
    width: px(26),
    height: px(26),
  },
  month: {
    width: px(31),
    height: px(26),
    images: new Array(12).fill(null).map((_, i) => `${isRusLang ? 'month_rus' : 'month'}/${i}.png`),
  }
}

export const DIGITS = {
  width: px(10),
  height: px(16),
  images: new Array(10).fill(null).map((_, i) => `digits/${i}.png`),
}

export const SECONDS_PROGRESS_BAR = {
  width: px(196),
  height: px(26),
}

export const ARC = {
  colorBackground: 0x3B3A3B,
  colorActive: 0xD9D9D9,
  radius: px(200),
  width: px(12),
};

export const STEPS = {
  angleStart: 130,
  angleEnd: 50,
};

export const BATTERY = {
  x: px(32),
  y: px(255),
  angleStart: 230,
  angleEnd: 265,
};

export const UVI = {
  x: px(32),
  y: px(143),
  angleStart: 275,
  angleEnd: 310,
};

export const CONNECTION_STATUS = {
  width: px(24),
  height: px(24),
  x: px(30),
};

