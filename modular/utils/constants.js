const lang = DeviceRuntimeCore.HmUtils.getLanguage();

const { width, height } = hmSetting.getDeviceInfo();

export const SCREEN = {
  width,
  height,
  centerX: width / 2,
  centerY: height / 2,
};

export const FONTS = {
  time: 'fonts/SofiaSansExtraCondensed-Regular.ttf',
  widget: 'fonts/SofiaSans-SemiBold.ttf',
};

export const COLORS = {
  primary: 0xffffff,
  secondary: 0x8a8a8a,
  tertiary: 0x1c1c1c,
  accent: 0x60c7f4,
  accentSecondary: 0x34596d,
};

export const ARCS = {
  steps: {
    angleStart: 229,
    angleEnd: 311,
    angleGap: 3,
  },
  heart: {
    angleStart: 131,
    angleEnd: 49,
    angleGap: 3,
  },
};

export const WIDGETS = [
  {
    x: px(95),
    y: px(70),
    w: px(90),
    h: px(90),
  },
  {
    x: px(195),
    y: px(70),
    w: px(90),
    h: px(90),
  },
  {
    x: px(295),
    y: px(70),
    w: px(90),
    h: px(90),
  },
  {
    x: px(95),
    y: px(312),
    w: px(90),
    h: px(90),
  },
  {
    x: px(195),
    y: px(312),
    w: px(90),
    h: px(90),
  },
  {
    x: px(295),
    y: px(312),
    w: px(90),
    h: px(90),
  },
];

const WEEKDAYS_EN = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];
export const WEEKDAYS = WEEKDAYS_EN;
