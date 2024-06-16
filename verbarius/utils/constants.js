const { width, height } = hmSetting.getDeviceInfo();

export const SCREEN = {
  width,
  height,
  centerX: width / 2,
  centerY: height / 2,
};

export const COLORS = {
  text: 0xd9d9d9,
};

export const FONT_FAMILY = {
  text: 'fonts/handjet-medium.ttf',
};

export const FONT_SIZE = {
  text: px(56),
};

export const TIME_SIZE = {
  width: px(400),
  height: px(400),
};
