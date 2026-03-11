import { isRusLang } from '../utils/constants';

const TIME_DIGITS = new Array(10)
  .fill(null)
  .map((_, i) => `time_digits/${i}.png`);

const AOD_TIME_DIGITS = new Array(10)
  .fill(null)
  .map((_, i) => `time_digits_aod/${i}.png`);

const COLON_ARRAY = new Array(10)
  .fill(null)
  .map((_, i) =>
    i % 2 === 0 ? 'time_digits/colon.png' : 'time_digits/empty.png',
  );

const WEEKDAY_IMAGES_EN = new Array(7)
  .fill(null)
  .map((_, i) => `week/${i}.png`);
const WEEKDAY_IMAGES_RU = new Array(7)
  .fill(null)
  .map((_, i) => `week_rus/${i}.png`);
const WEEKDAY_IMAGES = isRusLang ? WEEKDAY_IMAGES_RU : WEEKDAY_IMAGES_EN;

const SMALL_DIGITS = new Array(10)
  .fill(null)
  .map((_, i) => `small_digits/${i}.png`);

export const SUN_POSITION_IMAGES = new Array(21)
  .fill(null)
  .map((_, i) => `sun_position/${i}.png`);

export const PROGRESS_BAR_IMAGES = new Array(12)
  .fill(null)
  .map((_, i) => `progress_bar/${i}.png`);

export const BACKGROUND_IMAGE_PROPS = {
  x: 0,
  y: 0,
  src: 'common/background.png',
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const TIME_HOUR_IMAGE_PROPS = {
  hour_zero: 1,
  hour_startX: px(33),
  hour_startY: px(159),
  hour_array: TIME_DIGITS,
  hour_space: 0,
  hour_align: hmUI.align.RIGHT,
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const TIME_MINUTE_IMAGE_PROPS = {
  minute_zero: 1,
  minute_startX: px(249),
  minute_startY: px(159),
  minute_array: TIME_DIGITS,
  minute_space: 0,
  minute_align: hmUI.align.RIGHT,
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const TIME_COLON_PROPS = {
  second_zero: 1,
  second_startX: px(105),
  second_startY: px(159),
  second_array: COLON_ARRAY,
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const AOD_TIME_COLON_PROPS = {
  x: px(195),
  y: px(159),
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

export const BLUETOOTH_IMAGE_PROPS = {
  x: px(195),
  y: px(123),
  type: hmUI.system_status.DISCONNECT,
  src: 'bluetooth/bluetooth.png',
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const DATE_WEEK_PROPS = {
  x: px(105),
  y: px(321),
  week_en: WEEKDAY_IMAGES,
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const DATE_DAY_PROPS = {
  day_startX: px(249),
  day_startY: px(321),
  day_align: hmUI.align.LEFT,
  day_zero: 0,
  day_space: px(18),
  day_en_array: SMALL_DIGITS,
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const WEATHER_TEXT_IMAGE_PROPS = {
  x: px(105),
  y: px(321),
  font_array: SMALL_DIGITS,
  type: hmUI.data_type.WEATHER_CURRENT,
  negative_image: 'small_digits/minus.png',
  unit_en: 'small_digits/degree.png',
  invalid_image: 'small_digits/minus.png',
  align_h: hmUI.align.RIGHT,
  h_space: px(18),
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const BATTERY_TEXT_IMAGE_PROPS = {
  x: px(87),
  y: px(321),
  h_space: px(18),
  font_array: SMALL_DIGITS,
  type: hmUI.data_type.BATTERY,
  unit_en: 'small_digits/percent.png',
  invalid_image: 'small_digits/minus.png',
  align_h: hmUI.align.RIGHT,
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const HEART_TEXT_IMAGE_PROPS = {
  x: px(87),
  y: px(321),
  h_space: px(18),
  font_array: SMALL_DIGITS,
  type: hmUI.data_type.HEART,
  unit_en: 'small_digits/heart.png',
  invalid_image: 'small_digits/minus.png',
  align_h: hmUI.align.RIGHT,
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const PROGRESS_IMAGE_LEVEL_PROPS = {
  x: px(123),
  y: px(339),
  w: px(234),
  h: px(90),
  image_array: PROGRESS_BAR_IMAGES,
  image_length: PROGRESS_BAR_IMAGES.length,
  show_level: hmUI.show_level.ONLY_NORMAL,
  level: 1,
};

export const SUN_POSITION_LEVEL_PROPS = {
  x: 0,
  y: 0,
  w: px(480),
  h: px(159),
  image_array: SUN_POSITION_IMAGES,
  image_length: SUN_POSITION_IMAGES.length,
  show_level: hmUI.show_level.ONLY_NORMAL,
  level: 0,
};
