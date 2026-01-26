export const COLOR_THEMES = [
  [
    [0x567bff, 'white'],
    [0x00e674, 'black'],
  ],
];

const DIGIT_WIDE_WIDTH = px(188);
const DIGIT_NARROW_WIDTH = px(108);

const DIGIT_HIGH_HEIGHT = px(224);
const DIGIT_SHORT_HEIGHT = px(146);

const X0 = px(240) - (DIGIT_NARROW_WIDTH + DIGIT_WIDE_WIDTH) / 2;
const Y0 = px(240) - (DIGIT_SHORT_HEIGHT + DIGIT_HIGH_HEIGHT) / 2;

const DIGIT_LAYOUT_1 = [
  [
    {
      x: X0,
      y: Y0,
      digitType: 'narrow-high',
    },
    {
      x: X0 + DIGIT_NARROW_WIDTH,
      y: Y0,
      digitType: 'wide-short',
    },
  ],
  [
    {
      x: X0,
      y: Y0 + DIGIT_HIGH_HEIGHT,
      digitType: 'narrow-short',
    },
    {
      x: X0 + DIGIT_NARROW_WIDTH,
      y: Y0 + DIGIT_SHORT_HEIGHT,
      digitType: 'wide-high',
    },
  ],
];

const DIGIT_LAYOUT_2 = [
  [
    {
      x: X0,
      y: Y0,
      digitType: 'narrow-short',
    },
    {
      x: X0 + DIGIT_NARROW_WIDTH,
      y: Y0,
      digitType: 'wide-high',
    },
  ],
  [
    {
      x: X0,
      y: Y0 + DIGIT_SHORT_HEIGHT,
      digitType: 'narrow-high',
    },
    {
      x: X0 + DIGIT_NARROW_WIDTH,
      y: Y0 + DIGIT_HIGH_HEIGHT,
      digitType: 'wide-short',
    },
  ],
];

const DIGIT_LAYOUT_3 = [
  [
    {
      x: X0,
      y: Y0,
      digitType: 'wide-short',
    },
    {
      x: X0 + DIGIT_WIDE_WIDTH,
      y: Y0,
      digitType: 'narrow-high',
    },
  ],
  [
    {
      x: X0,
      y: Y0 + DIGIT_SHORT_HEIGHT,
      digitType: 'wide-high',
    },
    {
      x: X0 + DIGIT_WIDE_WIDTH,
      y: Y0 + DIGIT_HIGH_HEIGHT,
      digitType: 'narrow-short',
    },
  ],
];

const DIGIT_LAYOUT_4 = [
  [
    {
      x: X0,
      y: Y0,
      digitType: 'wide-high',
    },
    {
      x: X0 + DIGIT_WIDE_WIDTH,
      y: Y0,
      digitType: 'narrow-short',
    },
  ],
  [
    {
      x: X0,
      y: Y0 + DIGIT_HIGH_HEIGHT,
      digitType: 'wide-short',
    },
    {
      x: X0 + DIGIT_WIDE_WIDTH,
      y: Y0 + DIGIT_SHORT_HEIGHT,
      digitType: 'narrow-high',
    },
  ],
];

const DIGIT_LAYOUT_5 = [
  [
    {
      x: X0,
      y: Y0,
      digitType: 'wide-high',
    },
    {
      x: X0 + DIGIT_WIDE_WIDTH,
      y: Y0,
      digitType: 'narrow-high',
    },
  ],
  [
    {
      x: X0,
      y: Y0 + DIGIT_HIGH_HEIGHT,
      digitType: 'narrow-short',
    },
    {
      x: X0 + DIGIT_NARROW_WIDTH,
      y: Y0 + DIGIT_HIGH_HEIGHT,
      digitType: 'wide-short',
    },
  ],
];

const DIGIT_LAYOUT_6 = [
  [
    {
      x: X0,
      y: Y0,
      digitType: 'narrow-high',
    },
    {
      x: X0 + DIGIT_NARROW_WIDTH,
      y: Y0,
      digitType: 'wide-high',
    },
  ],
  [
    {
      x: X0,
      y: Y0 + DIGIT_HIGH_HEIGHT,
      digitType: 'wide-short',
    },
    {
      x: X0 + DIGIT_WIDE_WIDTH,
      y: Y0 + DIGIT_HIGH_HEIGHT,
      digitType: 'narrow-short',
    },
  ],
];

const DIGIT_LAYOUT_7 = [
  [
    {
      x: X0,
      y: Y0,
      digitType: 'narrow-short',
    },
    {
      x: X0 + DIGIT_NARROW_WIDTH,
      y: Y0,
      digitType: 'wide-short',
    },
  ],
  [
    {
      x: X0,
      y: Y0 + DIGIT_SHORT_HEIGHT,
      digitType: 'wide-high',
    },
    {
      x: X0 + DIGIT_WIDE_WIDTH,
      y: Y0 + DIGIT_SHORT_HEIGHT,
      digitType: 'narrow-high',
    },
  ],
];

const DIGIT_LAYOUT_8 = [
  [
    {
      x: X0,
      y: Y0,
      digitType: 'wide-short',
    },
    {
      x: X0 + DIGIT_WIDE_WIDTH,
      y: Y0,
      digitType: 'narrow-short',
    },
  ],
  [
    {
      x: X0,
      y: Y0 + DIGIT_SHORT_HEIGHT,
      digitType: 'narrow-high',
    },
    {
      x: X0 + DIGIT_NARROW_WIDTH,
      y: Y0 + DIGIT_SHORT_HEIGHT,
      digitType: 'wide-high',
    },
  ],
];

export const DIGIT_LAYOUTS = [
  DIGIT_LAYOUT_1,
  DIGIT_LAYOUT_2,
  DIGIT_LAYOUT_3,
  DIGIT_LAYOUT_4,
  DIGIT_LAYOUT_5,
  DIGIT_LAYOUT_6,
  DIGIT_LAYOUT_7,
  DIGIT_LAYOUT_8,
];
