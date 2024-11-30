import { getMatrixCoords } from './getMatrixCoords';

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
  dotHour: 0xbfc2c9,
  dotHourDisabled: 0x4b4b4b,
  dotMinute: 0xf41d09,
  dotMinuteDisabled: 0x4b4b4b,
  text: 0xffffff,
  textAccent: 0xf41d09,
};

export const FONT = 'fonts/FiraSans-SemiBold.ttf';

export const DOT_SIZE = {
  s: px(12),
  l: px(42),
  disabled: px(8),
};

const GAP_X = px(14);
const GAP_Y = px(14);

export const MINUTE_SMALL_DOT_GAP = px(14);

export const HOUR_COORD = getMatrixCoords(
  [6, 2],
  [DOT_SIZE.l + GAP_X, DOT_SIZE.l + GAP_Y],
  [SCREEN.centerX - 2.5 * (DOT_SIZE.l + GAP_X), px(68) + DOT_SIZE.l / 2],
);

export const MINUTE_COORD = getMatrixCoords(
  [6, 2],
  [DOT_SIZE.l + GAP_X, DOT_SIZE.l + GAP_Y],
  [
    SCREEN.centerX - 2.5 * (DOT_SIZE.l + GAP_X),
    HOUR_COORD[0][1] + 2 * (DOT_SIZE.l + GAP_Y),
  ],
);
