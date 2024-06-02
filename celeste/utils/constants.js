import { radiansToDegrees } from './degrees';

const { width, height } = hmSetting.getDeviceInfo();

export const SCREEN = {
  width,
  height,
  centerX: width / 2,
  centerY: height / 2,
};

const TIME_SRCS = {
  1: {
    minute: 'minute/01.png',
    hour: 'hour/01.png',
    'minute-pointer': 'minute-pointer/01.png',
  },
  2: {
    minute: 'minute/02.png',
    hour: 'hour/02.png',
    'minute-pointer': 'minute-pointer/02.png',
  },
  3: {
    minute: 'minute/03.png',
    hour: 'hour/03.png',
    'minute-pointer': 'minute-pointer/03.png',
  },
};

export const TIME_SRC = TIME_SRCS[1];

export const TARGET = {
  imageSize: px(254),
  outerDiam: px(126),
  innerDiam: px(58),
  radius: (px(58) + (px(126) - px(58)) / 2) / 2,
  width: (px(126) - px(58)) / 2,
};

export const TARGET_DOT_SIZE = {
  angleStart: -1 * Math.floor(radiansToDegrees(Math.atan(TARGET.width / 2 / TARGET.radius))),
  angleEnd: Math.floor(radiansToDegrees(Math.atan(TARGET.width / 2 / TARGET.radius))),
};

export const DIGITS = {
  width: px(18),
  height: px(32),
  images: new Array(10).fill(null).map((_, i) => `digits/${i}.png`),
};
