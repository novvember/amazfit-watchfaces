/**
 * @typedef {Object} ColorTheme
 * @property {number} primary
 * @property {number} secondary
 * @property {number} [tertiary]
 * @property {number} [aod]
 */

/** @type {Record<string, ColorTheme>} */
export const COLORS = {
  common: {
    primary: 0xffffff,
    secondary: 0xd0d0d0,
    tertiary: 0x1c1c1c,

    aod: 0xffffff,
  },

  blue: {
    primary: 0x60c7f4,
    secondary: 0x34596d,
  },

  orange: {
    primary: 0xf56900,
    secondary: 0x6c2e00,
  },
};

export const FONTS = {
  time: 'fonts/SofiaSansExtraCondensed-Regular.ttf',
  widget: 'fonts/SofiaSans-SemiBold.ttf',
  aod: 'fonts/SofiaSansExtraCondensed-Thin.ttf',
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
