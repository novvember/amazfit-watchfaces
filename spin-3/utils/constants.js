import { gettext } from 'i18n';

const { width, height } = hmSetting.getDeviceInfo();

export const SCREEN = {
  width,
  height,
  centerX: width / 2,
  centerY: height / 2,
};

export const COLORS = {
  minute: 0xffffff,
  data: 0xb1b1b1,
  accent: 0xf54a1b,
  aod: 0xb1b1b1,
};

export const FONTS = {
  minute: 'fonts/FiraSans-Medium.ttf',
  hour: 'fonts/FiraSans-Medium.ttf',
  data: 'fonts/FiraSansExtraCondensed-Light.ttf',
  aod: 'fonts/FiraSans-Light.ttf',
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

export const WEEKDAYS = [
  gettext('mon'),
  gettext('tue'),
  gettext('wed'),
  gettext('thu'),
  gettext('fri'),
  gettext('sat'),
  gettext('sun'),
];

export const BATTERY_PHASE_IMAGES = new Array(14)
  .fill(null)
  .map((_, i) => `battery/${i + 1}.png`);

export const MARK_SRC = {
  general: 'marks/general.png',
  accent: 'marks/accent.png',
  aod: 'marks/aod.png',
  aodAccent: 'marks/aod_accent.png',
};
