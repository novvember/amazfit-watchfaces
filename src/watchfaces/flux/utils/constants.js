/** @satisfies {Record<number, [number, string][]>} */
export const COLOR_THEMES = {
  1: [
    [0x567bff, 'white'],
    [0x00e674, 'black'],
  ],
  2: [
    [0x5e7aff, 'white'],
    [0xcdeb01, 'black'],
  ],
  3: [
    [0xff35b5, 'white'],
    [0xffef28, 'black'],
  ],
  4: [
    [0xfe3869, 'white'],
    [0x00bcd2, 'black'],
  ],
  5: [
    [0xa652ff, 'white'],
    [0x01e381, 'black'],
  ],
  6: [
    [0xff35b5, 'white'],
    [0x01e381, 'black'],
  ],
  7: [
    [0xff743f, 'white'],
    [0xcdeb01, 'black'],
  ],
  8: [
    [0xff743f, 'white'],
    [0x0093fd, 'black'],
  ],
  9: [
    [0x4d1c34, 'white'],
    [0x805769, 'black'],
  ],
  10: [
    [0x000000, 'white'],
    [0xd16942, 'black'],
  ],
  11: [
    [0x000000, 'white'],
    [0x414141, 'black'],
  ],
};

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
      digitType: 'w108h224',
    },
    {
      x: X0 + DIGIT_NARROW_WIDTH,
      y: Y0,
      digitType: 'w188h146',
    },
  ],
  [
    {
      x: X0,
      y: Y0 + DIGIT_HIGH_HEIGHT,
      digitType: 'w108h146',
    },
    {
      x: X0 + DIGIT_NARROW_WIDTH,
      y: Y0 + DIGIT_SHORT_HEIGHT,
      digitType: 'w188h224',
    },
  ],
];

const DIGIT_LAYOUT_2 = [
  [
    {
      x: X0,
      y: Y0,
      digitType: 'w108h146',
    },
    {
      x: X0 + DIGIT_NARROW_WIDTH,
      y: Y0,
      digitType: 'w188h224',
    },
  ],
  [
    {
      x: X0,
      y: Y0 + DIGIT_SHORT_HEIGHT,
      digitType: 'w108h224',
    },
    {
      x: X0 + DIGIT_NARROW_WIDTH,
      y: Y0 + DIGIT_HIGH_HEIGHT,
      digitType: 'w188h146',
    },
  ],
];

const DIGIT_LAYOUT_3 = [
  [
    {
      x: X0,
      y: Y0,
      digitType: 'w188h146',
    },
    {
      x: X0 + DIGIT_WIDE_WIDTH,
      y: Y0,
      digitType: 'w108h224',
    },
  ],
  [
    {
      x: X0,
      y: Y0 + DIGIT_SHORT_HEIGHT,
      digitType: 'w188h224',
    },
    {
      x: X0 + DIGIT_WIDE_WIDTH,
      y: Y0 + DIGIT_HIGH_HEIGHT,
      digitType: 'w108h146',
    },
  ],
];

const DIGIT_LAYOUT_4 = [
  [
    {
      x: X0,
      y: Y0,
      digitType: 'w188h224',
    },
    {
      x: X0 + DIGIT_WIDE_WIDTH,
      y: Y0,
      digitType: 'w108h146',
    },
  ],
  [
    {
      x: X0,
      y: Y0 + DIGIT_HIGH_HEIGHT,
      digitType: 'w188h146',
    },
    {
      x: X0 + DIGIT_WIDE_WIDTH,
      y: Y0 + DIGIT_SHORT_HEIGHT,
      digitType: 'w108h224',
    },
  ],
];

const DIGIT_LAYOUT_5 = [
  [
    {
      x: X0,
      y: Y0,
      digitType: 'w188h224',
    },
    {
      x: X0 + DIGIT_WIDE_WIDTH,
      y: Y0,
      digitType: 'w108h224',
    },
  ],
  [
    {
      x: X0,
      y: Y0 + DIGIT_HIGH_HEIGHT,
      digitType: 'w108h146',
    },
    {
      x: X0 + DIGIT_NARROW_WIDTH,
      y: Y0 + DIGIT_HIGH_HEIGHT,
      digitType: 'w188h146',
    },
  ],
];

const DIGIT_LAYOUT_6 = [
  [
    {
      x: X0,
      y: Y0,
      digitType: 'w108h224',
    },
    {
      x: X0 + DIGIT_NARROW_WIDTH,
      y: Y0,
      digitType: 'w188h224',
    },
  ],
  [
    {
      x: X0,
      y: Y0 + DIGIT_HIGH_HEIGHT,
      digitType: 'w188h146',
    },
    {
      x: X0 + DIGIT_WIDE_WIDTH,
      y: Y0 + DIGIT_HIGH_HEIGHT,
      digitType: 'w108h146',
    },
  ],
];

const DIGIT_LAYOUT_7 = [
  [
    {
      x: X0,
      y: Y0,
      digitType: 'w108h146',
    },
    {
      x: X0 + DIGIT_NARROW_WIDTH,
      y: Y0,
      digitType: 'w188h146',
    },
  ],
  [
    {
      x: X0,
      y: Y0 + DIGIT_SHORT_HEIGHT,
      digitType: 'w188h224',
    },
    {
      x: X0 + DIGIT_WIDE_WIDTH,
      y: Y0 + DIGIT_SHORT_HEIGHT,
      digitType: 'w108h224',
    },
  ],
];

const DIGIT_LAYOUT_8 = [
  [
    {
      x: X0,
      y: Y0,
      digitType: 'w188h146',
    },
    {
      x: X0 + DIGIT_WIDE_WIDTH,
      y: Y0,
      digitType: 'w108h146',
    },
  ],
  [
    {
      x: X0,
      y: Y0 + DIGIT_SHORT_HEIGHT,
      digitType: 'w108h224',
    },
    {
      x: X0 + DIGIT_NARROW_WIDTH,
      y: Y0 + DIGIT_SHORT_HEIGHT,
      digitType: 'w188h224',
    },
  ],
];

const DIGIT_LAYOUT_9 = [
  [
    {
      x: X0,
      y: Y0,
      digitType: 'w108h224',
    },
    {
      x: X0 + DIGIT_NARROW_WIDTH,
      y: Y0,
      digitType: 'w188h224',
    },
  ],
  [
    {
      x: X0,
      y: Y0 + DIGIT_HIGH_HEIGHT,
      digitType: 'w108h146',
    },
    {
      x: X0 + DIGIT_NARROW_WIDTH,
      y: Y0 + DIGIT_HIGH_HEIGHT,
      digitType: 'w188h146',
    },
  ],
];

const DIGIT_LAYOUT_10 = [
  [
    {
      x: X0,
      y: Y0,
      digitType: 'w188h224',
    },
    {
      x: X0 + DIGIT_WIDE_WIDTH,
      y: Y0,
      digitType: 'w108h224',
    },
  ],
  [
    {
      x: X0,
      y: Y0 + DIGIT_HIGH_HEIGHT,
      digitType: 'w188h146',
    },
    {
      x: X0 + DIGIT_WIDE_WIDTH,
      y: Y0 + DIGIT_HIGH_HEIGHT,
      digitType: 'w108h146',
    },
  ],
];

const DIGIT_LAYOUT_11 = [
  [
    {
      x: X0,
      y: Y0,
      digitType: 'w108h146',
    },
    {
      x: X0 + DIGIT_NARROW_WIDTH,
      y: Y0,
      digitType: 'w188h146',
    },
  ],
  [
    {
      x: X0,
      y: Y0 + DIGIT_SHORT_HEIGHT,
      digitType: 'w108h224',
    },
    {
      x: X0 + DIGIT_NARROW_WIDTH,
      y: Y0 + DIGIT_SHORT_HEIGHT,
      digitType: 'w188h224',
    },
  ],
];

const DIGIT_LAYOUT_12 = [
  [
    {
      x: X0,
      y: Y0,
      digitType: 'w188h146',
    },
    {
      x: X0 + DIGIT_WIDE_WIDTH,
      y: Y0,
      digitType: 'w108h146',
    },
  ],
  [
    {
      x: X0,
      y: Y0 + DIGIT_SHORT_HEIGHT,
      digitType: 'w188h224',
    },
    {
      x: X0 + DIGIT_WIDE_WIDTH,
      y: Y0 + DIGIT_SHORT_HEIGHT,
      digitType: 'w108h224',
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
  DIGIT_LAYOUT_9,
  DIGIT_LAYOUT_10,
  DIGIT_LAYOUT_11,
  DIGIT_LAYOUT_12,
];
