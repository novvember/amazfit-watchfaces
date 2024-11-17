import {
  TEXT_CHAR_HEIGHT,
  TEXT_CHAR_WIDTH,
  TEXT_CHARS,
} from '../utils/textChars';

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
  primary: 0xffffff,
  secondary: 0x848484,
  tertiary: 0x525252,
};

export const FONTS = {
  primary: 'fonts/FiraSansCondensed-Medium.ttf',
  secondary: 'fonts/FiraSans-Regular.ttf',
  tertiary: 'fonts/FiraSans-Medium.ttf',
};

export const TIME_TEXTS = [
  '00',
  '05',
  '10',
  '15',
  '20',
  '25',
  '30',
  '35',
  '40',
  '45',
  '50',
  '55',
];

export const SECOND = {
  image: {
    src: 'time/second.png',
    size: px(480),
  },
  text: {
    width: px(28),
    height: px(20),
    textSize: px(22),
    color: COLORS.secondary,
    radius: px(224),
  },
};

export const MINUTE = {
  image: {
    src: 'time/minute.png',
    size: px(310),
  },
  text: {
    width: px(34),
    height: px(24),
    textSize: px(28),
    color: COLORS.secondary,
    radius: px(110),
  },
};

export const CURRENT_HOUR = {
  width: px(110),
  height: px(110),
  textSize: px(110),
  color: COLORS.primary,
};

export const CURRENT_MINUTE = {
  width: px(60),
  height: px(60),
  textSize: px(54),
  color: COLORS.primary,
  radius: px(102),
};

export const MIN_ANGLE_TO_UPDATE_WHEEL = 0.7;

export const DATE = {
  width: px(60),
  height: px(30),
  textSize: px(28),
};

export const DATA = {
  radius: px(185),
  circleText: {
    charImages: TEXT_CHARS,
    imageWidth: TEXT_CHAR_WIDTH,
    imageHeight: TEXT_CHAR_HEIGHT,
  },
  arc: {
    width: px(5),
  },
};

export const WEEKDAYS = isRusLang
  ? ['ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ', 'ВС']
  : ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];
