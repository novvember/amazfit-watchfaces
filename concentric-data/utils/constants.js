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
  secondary: 0xbdbdbd,
  tertiary: 0x525457,
};

export const FONTS = {
  primary: 'fonts/FiraSansCondensed-Medium.ttf',
  secondary: 'fonts/FiraSans-Regular.ttf',
  tertiary: 'fonts/FiraSans-Medium.ttf',
};

export const SECOND = {
  image: {
    src: 'time/second.png',
  },
  text: {
    width: px(30),
    height: px(30),
    textSize: px(22),
    color: COLORS.secondary,
    radius: px(224),
  },
};

export const MINUTE = {
  image: {
    src: 'time/minute.png',
  },
  text: {
    width: px(40),
    height: px(40),
    textSize: px(28),
    color: COLORS.secondary,
    radius: px(112),
  },
};

export const CURRENT_HOUR = {
  width: px(140),
  height: px(140),
  textSize: px(110),
  color: COLORS.primary,
};

export const CURRENT_MINUTE = {
  width: px(70),
  height: px(70),
  textSize: px(54),
  color: COLORS.primary,
  radius: px(100),
};

export const MIN_ANGLE_TO_UPDATE_WHEEL = 0.7;

export const DATA = {
  radius: px(186),
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
  : ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];
