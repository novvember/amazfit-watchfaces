import { getHasCustomFontSupport } from './getHasCustomFontSupport';

const hasCustomFontSupport = getHasCustomFontSupport();

const { width, height } = hmSetting.getDeviceInfo();

export const SCREEN = {
  width,
  height,
  centerX: width / 2,
  centerY: height / 2,
};

export const FONT = hasCustomFontSupport
  ? 'fonts/ZCOOLKuaiLe-Regular.ttf'
  : undefined;

export const DOT_SIZE = px(46);

export const DOT_COORDS = [
  [429, 217],
  [376, 217],
  [323, 217],
  [270, 217],
  [273, 12],
  [163, 12],
  [113, 33],
  [367, 67],
  [324, 33],
  [219, 5],
  [69, 67],
  [34, 110],
  [402, 111],
  [309, 163],
  [244, 171],
  [191, 170],
  [270, 124],
  [217, 111],
  [165, 124],
  [126, 163],
  [367, 162],
  [340, 115],
  [298, 79],
  [245, 60],
  [190, 60],
  [138, 78],
  [96, 114],
  [68, 162],
  [423, 162],
  [13, 162],
  [323, 400],
  [272, 421],
  [217, 429],
  [162, 421],
  [297, 354],
  [244, 373],
  [189, 373],
  [111, 400],
  [138, 354],
  [67, 366],
  [34, 322],
  [95, 319],
  [164, 308],
  [217, 322],
  [270, 308],
  [367, 367],
  [339, 319],
  [400, 323],
  [422, 271],
  [366, 271],
  [308, 270],
  [244, 262],
  [191, 262],
  [126, 269],
  [68, 271],
  [13, 271],
  [5, 217],
  [58, 217],
  [111, 217],
  [164, 217],
  [217, 217],
];
