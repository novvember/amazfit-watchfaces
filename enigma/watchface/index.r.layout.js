const { width, height } = hmSetting.getDeviceInfo();

export const SCREEN = {
  width,
  height,
  centerX: width / 2,
  centerY: height / 2,
};

export const BACKGROUND_RECT_PROPS = {
  x: 0,
  y: px(480 / 2 - 106 / 2),
  w: px(480),
  h: px(106),
  radius: 0,
  color: 0x17739c,
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const FADE_IMAGE_PROPS = {
  x: 0,
  y: 0,
  src: 'fade.png',
  show_level: hmUI.show_level.ONLY_NORMAL,
};
