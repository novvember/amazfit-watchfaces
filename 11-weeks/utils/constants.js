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
    width: px(32),
    height: px(32),
  },
}

export const CALENDAR = {
  currentWeekIndex: 3,
  date: {
    width: px(32),
    height: px(32),
  },
  weekDay: {
    width: px(32),
    height: px(32),
    images: new Array(7).fill(null).map((_, i) => `${isRusLang ? 'week_rus' : 'week'}/${i}.png`),
  },
  year: {
    width: px(32),
    height: px(32),
  },
  month: {
    width: px(36),
    height: px(32),
    images: new Array(12).fill(null).map((_, i) => `${isRusLang ? 'month_rus' : 'month'}/${i}.png`),
  }
}

export const DIGITS = {
  width: px(12),
  height: px(18),
  images: new Array(10).fill(null).map((_, i) => `digits/${i}.png`),
}

export const SPECIAL_CHARS = {
  colon: {
    width: px(4),
    src: 'special_chars/colon.png',
  },
  minus: {
    width: px(12),
    src: 'special_chars/minus.png',
  },
  percent: {
    width: px(19),
    src: 'special_chars/percent.png',
  },
};

export const SECONDS_PROGRESS_BAR = {
  width: px(224),
  height: px(32),
}

export const ARC = {
  colorBackground: 0x3B3A3B,
  colorActive: 0xD9D9D9,
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

export const UVI = {
  x: px(37),
  y: px(165),
  angleStart: 275,
  angleEnd: 310,
};

export const SLEEP = {
  x: px(30),
  y: px(165),
  angleStart: 275,
  angleEnd: 310,
}

export const CONNECTION_STATUS = {
  width: px(28),
  height: px(28),
  x: px(35),
};

export const ALARM_STATUS = {
  width: px(28),
  height: px(28),
  x: px(66),
};
