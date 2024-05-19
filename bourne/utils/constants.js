const lang = DeviceRuntimeCore.HmUtils.getLanguage();
const isRusLang = ['ru-RU', 'uk-UA'].includes(lang);

const { width, height } = hmSetting.getDeviceInfo();

export const SCREEN = {
  centerX: width / 2,
  centerY: height / 2,
};

export const TEXTS = {
  x: px(367),
  y: px(114),
  src: isRusLang ? 'texts_rus.png' : 'texts.png',
};

export const SYMBOLS = {
  width: px(58),
  height: px(70),
  empty: 'symbols_accent/empty.png',
  accent: {
    digits: new Array(10).fill(null).map((_, i) => `symbols_accent/${i}.png`),
    colon: 'symbols_accent/colon.png',
    dot: 'symbols_accent/dot.png',
    minus: 'symbols_accent/minus.png',
    heart: 'symbols_accent/heart.png',
    degree: 'symbols_accent/degree.png',
  },
  primary: {
    digits: new Array(10).fill(null).map((_, i) => `symbols_primary/${i}.png`),
    colon: 'symbols_primary/colon.png',
    dot: 'symbols_primary/dot.png',
    minus: 'symbols_primary/minus.png',
    heart: 'symbols_primary/heart.png',
    degree: 'symbols_primary/degree.png',
  },
  secondary: {
    digits: new Array(10)
      .fill(null)
      .map((_, i) => `symbols_secondary/${i}.png`),
    colon: 'symbols_secondary/colon.png',
    dot: 'symbols_secondary/dot.png',
    minus: 'symbols_secondary/minus.png',
    heart: 'symbols_secondary/heart.png',
    degree: 'symbols_secondary/degree.png',
  },
};

const FIRST_COLUMN_X = px(72);

export const GRID_POSITIONS = {
  rowsY: [
    Math.ceil(SCREEN.centerY - 2.5 * SYMBOLS.height),
    Math.ceil(SCREEN.centerY - 1.5 * SYMBOLS.height),
    Math.ceil(SCREEN.centerY - 0.5 * SYMBOLS.height),
    Math.ceil(SCREEN.centerY + 0.5 * SYMBOLS.height),
    Math.ceil(SCREEN.centerY + 1.5 * SYMBOLS.height),
  ],

  columnsX: [
    Math.ceil(FIRST_COLUMN_X + 0 * SYMBOLS.width),
    Math.ceil(FIRST_COLUMN_X + 1 * SYMBOLS.width),
    Math.ceil(FIRST_COLUMN_X + 2 * SYMBOLS.width),
    Math.ceil(FIRST_COLUMN_X + 3 * SYMBOLS.width),
    Math.ceil(FIRST_COLUMN_X + 4 * SYMBOLS.width),
  ],
};

export const DISCONNECT = {
  x: px(9),
  y: px(210),
  src: 'disconnect.png',
};
