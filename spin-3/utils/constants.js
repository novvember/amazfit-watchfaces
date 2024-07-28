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
  minute: 0xffffff,
  data: 0x838383,
  accent: 0xf54a1b,
  aod: 0xd3d3d3,
};

export const FONTS = {
  minute: 'fonts/FiraSans-Medium.ttf',
  hour: 'fonts/FiraSans-Medium.ttf',
  data: 'fonts/FiraSansExtraCondensed-Light.ttf',
};

export const TEXT_SIZE = {
  hour: px(76),
  minute: px(46),
  data: px(36),
};

export const MINUTE = {
  // Orbit radius for text to move
  radius: px(98),
  // Width/height of text container
  size: px(60),
  // Angle to hida other elements under the item
  angleSize: 40,
};

export const MONTHS = isRusLang
  ? [
      'ЯНВ',
      'ФЕВ',
      'МАР',
      'АПР',
      'МАЙ',
      'ИЮН',
      'ИЮЛ',
      'АВГ',
      'СЕН',
      'ОКТ',
      'НОЯ',
      'ДЕК',
    ]
  : [
      'JAN',
      'FEB',
      'MAR',
      'APR',
      'MAY',
      'JUN',
      'JUL',
      'AUG',
      'SEP',
      'OCT',
      'NOV',
      'DEC',
    ];

export const WEEKDAYS = isRusLang
  ? ['ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ', 'ВС']
  : ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];

export const MOON_PHASE_IMAGES = new Array(27)
  .fill(null)
  .map((_, i) => `moon_phase/${i + 1}.png`);

export const MARK_SRC = {
  general: 'marks/general.png',
  accent: 'marks/accent.png',
  aod: 'marks/aod.png',
};
