const TIME_DIGITS = new Array(10)
  .fill(null)
  .map((_, i) => `time_digits/${i}.png`);

const AOD_TIME_DIGITS = new Array(10)
  .fill(null)
  .map((_, i) => `time_digits_aod/${i}.png`);

const COLON_ARRAY = new Array(10)
  .fill(null)
  .map((_, i) =>
    i % 2 === 0 ? 'time_digits/colon.png' : 'time_digits/colon_empty.png',
  );

export const TIME_GROUP_PROPS = {
  x: 0,
  y: 0,
  w: px(308),
  h: px(126),
};

export const TIME_HOUR_IMAGE_PROPS = {
  hour_zero: 1,
  hour_startX: px(0),
  hour_startY: px(0),
  hour_array: TIME_DIGITS,
  hour_space: 0,
  hour_align: hmUI.align.RIGHT,
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const TIME_MINUTE_IMAGE_PROPS = {
  minute_zero: 1,
  minute_startX: px(168),
  minute_startY: px(0),
  minute_array: TIME_DIGITS,
  minute_space: 0,
  minute_align: hmUI.align.RIGHT,
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const TIME_COLON_PROPS = {
  second_zero: 1,
  second_startX: px(56),
  second_startY: px(0),
  second_array: COLON_ARRAY,
  show_level: hmUI.show_level.ONLY_NORMAL,
};
export const AOD_TIME_COLON_PROPS = {
  x: px(126),
  y: px(0),
  src: 'time_digits_aod/colon.png',
  show_level: hmUI.show_level.ONAL_AOD,
};

export const AOD_TIME_HOUR_IMAGE_PROPS = {
  ...TIME_HOUR_IMAGE_PROPS,
  hour_array: AOD_TIME_DIGITS,
  show_level: hmUI.show_level.ONAL_AOD,
};

export const AOD_TIME_MINUTE_IMAGE_PROPS = {
  ...TIME_MINUTE_IMAGE_PROPS,
  minute_array: AOD_TIME_DIGITS,
  show_level: hmUI.show_level.ONAL_AOD,
};
