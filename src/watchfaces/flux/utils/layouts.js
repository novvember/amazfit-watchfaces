const DIGIT_WIDE_WIDTH = px(188);
const DIGIT_NARROW_WIDTH = px(108);
const DIGIT_HALF_WIDE_WIDTH = DIGIT_WIDE_WIDTH / 2;

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

// Full-height H1 on the left; H2 above the minute pair on the right.
const DIGIT_LAYOUT_13 = [
  [
    {
      x: X0,
      y: Y0,
      digitType: 'w108h370',
    },
    {
      x: X0 + DIGIT_NARROW_WIDTH,
      y: Y0,
      digitType: 'w188h224',
    },
  ],
  [
    {
      x: X0 + DIGIT_NARROW_WIDTH,
      y: Y0 + DIGIT_HIGH_HEIGHT,
      digitType: 'w94h146',
    },
    {
      x: X0 + DIGIT_NARROW_WIDTH + DIGIT_HALF_WIDE_WIDTH,
      y: Y0 + DIGIT_HIGH_HEIGHT,
      digitType: 'w94h146',
    },
  ],
];

// Full-height M1 on the left; the hour pair above M2 on the right.
const DIGIT_LAYOUT_14 = [
  [
    {
      x: X0 + DIGIT_NARROW_WIDTH,
      y: Y0,
      digitType: 'w94h224',
    },
    {
      x: X0 + DIGIT_NARROW_WIDTH + DIGIT_HALF_WIDE_WIDTH,
      y: Y0,
      digitType: 'w94h224',
    },
  ],
  [
    {
      x: X0,
      y: Y0,
      digitType: 'w108h370',
    },
    {
      x: X0 + DIGIT_NARROW_WIDTH,
      y: Y0 + DIGIT_HIGH_HEIGHT,
      digitType: 'w188h146',
    },
  ],
];

// Full-height H2 on the right; H1 above the minute pair on the left.
const DIGIT_LAYOUT_15 = [
  [
    {
      x: X0,
      y: Y0,
      digitType: 'w188h224',
    },
    {
      x: X0 + DIGIT_WIDE_WIDTH,
      y: Y0,
      digitType: 'w108h370',
    },
  ],
  [
    {
      x: X0,
      y: Y0 + DIGIT_HIGH_HEIGHT,
      digitType: 'w94h146',
    },
    {
      x: X0 + DIGIT_HALF_WIDE_WIDTH,
      y: Y0 + DIGIT_HIGH_HEIGHT,
      digitType: 'w94h146',
    },
  ],
];

// Full-height M2 on the right; the hour pair above M1 on the left.
const DIGIT_LAYOUT_16 = [
  [
    {
      x: X0,
      y: Y0,
      digitType: 'w94h224',
    },
    {
      x: X0 + DIGIT_HALF_WIDE_WIDTH,
      y: Y0,
      digitType: 'w94h224',
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
      y: Y0,
      digitType: 'w108h370',
    },
  ],
];

// Full-height hours on the left; short M1 above tall M2 (Apple: 11:22).
const DIGIT_LAYOUT_17 = [
  [
    {
      x: X0,
      y: Y0,
      digitType: 'w94h370',
    },
    {
      x: X0 + DIGIT_HALF_WIDE_WIDTH,
      y: Y0,
      digitType: 'w94h370',
    },
  ],
  [
    {
      x: X0 + DIGIT_WIDE_WIDTH,
      y: Y0,
      digitType: 'w108h146',
    },
    {
      x: X0 + DIGIT_WIDE_WIDTH,
      y: Y0 + DIGIT_SHORT_HEIGHT,
      digitType: 'w108h224',
    },
  ],
];

// Full-height hours on the left; tall M1 above short M2 (Apple: 11:27).
const DIGIT_LAYOUT_18 = [
  [
    {
      x: X0,
      y: Y0,
      digitType: 'w94h370',
    },
    {
      x: X0 + DIGIT_HALF_WIDE_WIDTH,
      y: Y0,
      digitType: 'w94h370',
    },
  ],
  [
    {
      x: X0 + DIGIT_WIDE_WIDTH,
      y: Y0,
      digitType: 'w108h224',
    },
    {
      x: X0 + DIGIT_WIDE_WIDTH,
      y: Y0 + DIGIT_HIGH_HEIGHT,
      digitType: 'w108h146',
    },
  ],
];

// Tall H1 above short H2 on the left; full-height minutes (Apple: 00:01).
const DIGIT_LAYOUT_19 = [
  [
    {
      x: X0,
      y: Y0,
      digitType: 'w108h224',
    },
    {
      x: X0,
      y: Y0 + DIGIT_HIGH_HEIGHT,
      digitType: 'w108h146',
    },
  ],
  [
    {
      x: X0 + DIGIT_NARROW_WIDTH,
      y: Y0,
      digitType: 'w94h370',
    },
    {
      x: X0 + DIGIT_NARROW_WIDTH + DIGIT_HALF_WIDE_WIDTH,
      y: Y0,
      digitType: 'w94h370',
    },
  ],
];

// Short H1 above tall H2 on the left; full-height minutes on the right.
const DIGIT_LAYOUT_20 = [
  [
    {
      x: X0,
      y: Y0,
      digitType: 'w108h146',
    },
    {
      x: X0,
      y: Y0 + DIGIT_SHORT_HEIGHT,
      digitType: 'w108h224',
    },
  ],
  [
    {
      x: X0 + DIGIT_NARROW_WIDTH,
      y: Y0,
      digitType: 'w94h370',
    },
    {
      x: X0 + DIGIT_NARROW_WIDTH + DIGIT_HALF_WIDE_WIDTH,
      y: Y0,
      digitType: 'w94h370',
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
  DIGIT_LAYOUT_13,
  // DIGIT_LAYOUT_14, Too complicated for the user to understand, so we don't use it.
  // DIGIT_LAYOUT_15, Too complicated for the user to understand, so we don't use it.
  DIGIT_LAYOUT_16,
  DIGIT_LAYOUT_17,
  DIGIT_LAYOUT_18,
  DIGIT_LAYOUT_19,
  DIGIT_LAYOUT_20,
];

/** @param {[string[], string[]]} digitValues */
export function getDigitLayout(digitValues) {
  const layouts = DIGIT_LAYOUTS.filter((layout) =>
    digitValues.every((row, yIndex) =>
      row.every((digit, xIndex) => {
        if (digit !== '1') {
          return true;
        }

        const { digitType } = layout[yIndex][xIndex];
        const width = Number(digitType.slice(1).split('h')[0]);
        return width < 188;
      }),
    ),
  );

  const value = Number(digitValues.flat().join(''));
  const hash = Math.imul(value, 0x9e3779b1) >>> 0;
  const i = Math.floor((hash / 0x100000000) * layouts.length);

  return layouts[i];
}
