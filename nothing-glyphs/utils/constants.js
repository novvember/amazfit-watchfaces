const { width, height } = hmSetting.getDeviceInfo();

export const SCREEN = {
  width,
  height,
  centerX: width / 2,
  centerY: height / 2,
};

export const COLORS = {
  primary: 0xd1d1d9,
  aod: 0x767578,
};

export const FONT_FAMILY = {
  primary: 'fonts/ndot-55.ttf',
};

export const FONT_SIZE = {
  time: px(120),
  data: px(36),
};

export const TIME_DIGITS = {
  height: px(140),
  colon: {
    width: px(30),
  },
  hours: {
    width: px(200),
  },
  mins: {
    width: px(200),
  },
};

export const DATE = {
  width: px(140),
  height: px(38),
  y: px(315),
  weekDays: ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'],
};

export const DISCONNECT = {
  width: px(50),
  height: px(50),
};

export const BATTERY = {
  x: px(76),
  y: px(335),
  height: px(32),
  width: px(100),
  poiner: {
    angleStart: 222,
    angleEnd: 244,
    radius: px(213),
    width: px(26),
    height: px(26),
  },
};

export const SLEEP = {
  x: px(86),
  y: px(99),
  height: px(32),
  width: px(100),
  poiner: {
    angleStart: 290,
    angleEnd: 334,
    radius: px(213),
    width: px(26),
    height: px(26),
  },
};

export const STEPS = {
  x: px(305),
  y: px(145),
  height: px(32),
  width: px(120),
  poiner: {
    yStart: px(304),
    yEnd: px(150),
    x: px(440),
    width: px(26),
    height: px(26),
  },
};
