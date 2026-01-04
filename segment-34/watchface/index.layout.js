const TIME_X0 = px(20);
const TIME_Y0 = px(145);
const TIME_DIGIT_WIDTH = px(88);

const TIME_DIGITS = new Array(10).fill(null).map((_, i) => `time/${i}.png`);
const TIME_AOD_DIGITS = new Array(10)
  .fill(null)
  .map((_, i) => `time_aod/${i}.png`);

const COLOR_PRIMARY = 0xffffff;
const COLOR_ACCENT = 0xffa300;
const COLOR_ACCENT_SECONDARY = 0xe64b00;
const COLOR_AOD = 0xb1b1b1;

const FONT_PRIMARY = 'fonts/JetBrainsMono-Light.ttf';
const FONT_SECONDARY = 'fonts/JetBrainsMono-Medium.ttf';

export const SECONDARY_DIGIT_WIDTH = px(25);

const SECONDARY_DIGITS = new Array(10)
  .fill(null)
  .map((_, i) => `digits/${i}.png`);

export const SUNRISE_TEXT_PROPS = {
  x: px(110),
  y: px(32),
  w: px(100),
  h: px(30),
  align_h: hmUI.align.RIGHT,
  align_v: hmUI.align.CENTER_V,
  text_size: px(30),
  color: COLOR_PRIMARY,
  font: FONT_PRIMARY,
  text: '',
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const SUNSET_TEXT_PROPS = {
  ...SUNRISE_TEXT_PROPS,
  x: px(270),
  align_h: hmUI.align.LEFT,
};

export const MOON_IMAGE_PROPS = {
  x: px(224),
  y: px(31),
  image_array: new Array(31).fill(null).map((_, i) => `moon/${i + 1}.png`),
  image_length: 31,
  type: hmUI.data_type.MOON,
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const WEATHER_TEXT_PROPS = {
  x: px(30),
  y: px(104),
  w: px(420),
  h: px(30),
  align_h: hmUI.align.CENTER_H,
  align_v: hmUI.align.CENTER_V,
  text_size: px(30),
  color: COLOR_PRIMARY,
  font: FONT_PRIMARY,
  text: '',
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const WEATHER_TEMP_TEXT_PROPS = {
  x: px(115),
  y: px(68),
  w: px(80),
  h: px(30),
  align_h: hmUI.align.RIGHT,
  align_v: hmUI.align.CENTER_V,
  text_size: px(30),
  color: COLOR_PRIMARY,
  font: FONT_PRIMARY,
  type: hmUI.data_type.WEATHER_CURRENT,
  unit_type: 1,
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const WEATHER_WIND_IMAGE_PROPS = {
  x: px(210),
  y: px(68),
  image_array: new Array(8).fill(null).map((_, i) => `wind/${i}.png`),
  image_length: 8,
  w: px(20),
  h: px(30),
  type: hmUI.data_type.WIND_DIRECTION,
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const WEATHER_WIND_TEXT_PROPS = {
  ...WEATHER_TEMP_TEXT_PROPS,
  x: px(231),
  align_h: hmUI.align.LEFT,
  type: hmUI.data_type.WIND,
  unit_type: 0,
};

export const WEATHER_HUMIDUTY_TEXT_PROPS = {
  ...WEATHER_TEMP_TEXT_PROPS,
  x: px(280),
  align_h: hmUI.align.LEFT,
  type: hmUI.data_type.HUMIDITY,
  unit_type: 1,
};

export const TIME_PROPS = {
  hour_zero: 1,
  hour_startX: TIME_X0,
  hour_startY: TIME_Y0,
  hour_array: TIME_DIGITS,
  hour_space: 0,
  hour_align: hmUI.align.LEFT,

  hour_unit_sc: 'time/colon.png',
  hour_unit_tc: 'time/colon.png',
  hour_unit_en: 'time/colon.png',

  minute_zero: 1,
  minute_startX: TIME_X0 + 3 * TIME_DIGIT_WIDTH,
  minute_startY: TIME_Y0,
  minute_array: TIME_DIGITS,
  minute_space: 0,
  minute_align: hmUI.align.LEFT,

  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const TIME_AOD_PROPS = {
  ...TIME_PROPS,
  hour_array: TIME_AOD_DIGITS,
  minute_array: TIME_AOD_DIGITS,
  hour_unit_sc: 'time_aod/colon.png',
  hour_unit_tc: 'time_aod/colon.png',
  hour_unit_en: 'time_aod/colon.png',
  show_level: hmUI.show_level.ONAL_AOD,
};

export const TIME_GRADIENT_PROPS = {
  x: TIME_X0,
  y: TIME_Y0,
  src: 'time/gradient.png',
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const TIME_AOD_GRADIENT_PROPS = {
  ...TIME_GRADIENT_PROPS,
  src: 'time_aod/gradient.png',
  show_level: hmUI.show_level.ONAL_AOD,
};

export const DATE_TEXT_PROPS = {
  x: px(27),
  y: px(313),
  w: px(330),
  h: px(30),
  align_h: hmUI.align.LEFT,
  align_v: hmUI.align.CENTER_V,
  text_size: px(30),
  color: COLOR_ACCENT,
  font: FONT_PRIMARY,
  text: '',
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const DATE_AOD_TEXT_PROPS = {
  ...DATE_TEXT_PROPS,
  color: COLOR_AOD,
  show_level: hmUI.show_level.ONAL_AOD,
};

export const SECOND_TEXT_PROPS = {
  ...DATE_TEXT_PROPS,
  x: px(372),
  w: px(80),
  align_h: hmUI.align.RIGHT,
  type: hmUI.data_type.SECOND,
  padding: true,
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const SECOND_DECORATIVE_TEXT_PROPS = {
  ...DATE_TEXT_PROPS,
  align_h: hmUI.align.RIGHT,
  x: px(369),
  w: px(30),
  text: '→',
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const SECONDARY_TITLE_PROPS = {
  x: 0,
  y: 0,
  w: px(100),
  h: px(20),
  align_h: hmUI.align.LEFT,
  align_v: hmUI.align.CENTER_V,
  text_size: px(15),
  color: COLOR_ACCENT_SECONDARY,
  font: FONT_SECONDARY,
  text: '',
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const SECONDARY_DIGIT_EMPTY_PROPS = {
  x: 0,
  y: 0,
  src: 'digits/empty.png',
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const SECONDARY_IMAGE_TEXT_PROPS = {
  x: 0,
  y: 0,
  type: undefined,
  font_array: SECONDARY_DIGITS,
  align_h: hmUI.align.LEFT,
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const BATTERY_ICON_PROPS = {
  x: px(220),
  y: px(443),
  src: 'battery/battery.png',
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const BATTERY_PROGRESS_PROPS = {
  x: px(223),
  y: px(452),
  w: px(32),
  h: px(22),
  color: COLOR_ACCENT_SECONDARY,
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const CONNECT_IMAGE_PROPS = {
  x: px(261),
  y: px(450),
  src: 'connect/connect_on.png',
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const CONNECT_STATUS_PROPS = {
  x: px(261),
  y: px(450),
  type: hmUI.system_status.DISCONNECT,
  src: 'connect/connect_off.png',
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const ALARM_IMAGE_PROPS = {
  x: px(188),
  y: px(450),
  src: 'alarm/alarm_off.png',
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const ALARM_STATUS_PROPS = {
  x: px(188),
  y: px(450),
  type: hmUI.system_status.CLOCK,
  src: 'alarm/alarm_on.png',
  show_level: hmUI.show_level.ONLY_NORMAL,
};
