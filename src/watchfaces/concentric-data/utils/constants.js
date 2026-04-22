import {
  TEXT_CHAR_HEIGHT,
  TEXT_CHAR_WIDTH,
  TEXT_CHARS,
} from '../utils/textChars';

import { getHasCustomFontSupport } from '../../../adapters/getHasCustomFontSupport';

const hasCustomFontSupport = getHasCustomFontSupport();

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
  aod: 0xb1b1b1,
};

export const FONTS = {
  primary: hasCustomFontSupport
    ? 'fonts/FiraSansCondensed-Medium.ttf'
    : undefined,
  aod: hasCustomFontSupport
    ? 'fonts/FiraSansCondensed-ExtraLight.ttf'
    : undefined,
};

export const SECOND = {
  image: {
    src: 'time/second.png',
    size: px(480),
  },
  text: {
    width: px(28),
    height: px(20),
    radius: px(224),
  },
};

export const MINUTE = {
  image: {
    src: 'time/minute.png',
    size: px(312),
  },
  text: {
    width: px(34),
    height: px(24),
  },
};

export const CURRENT_HOUR = {
  width: px(110),
  height: px(110),
  textSize: hasCustomFontSupport ? px(110) : px(100),
  color: COLORS.primary,
};

export const CURRENT_MINUTE = {
  width: px(60),
  height: px(60),
  textSize: hasCustomFontSupport ? px(54) : px(48),
  color: COLORS.primary,
  radius: px(102),
};

export const DATE = {
  width: px(60),
  height: px(30),
  textSize: px(32),
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
