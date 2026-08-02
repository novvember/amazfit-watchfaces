import { COLORS, FONTS } from './index.const';

export const TIME_TEXT_PROPS = {
  x: px(240) - px(420) / 2,
  y: px(240) - px(140) / 2,
  w: px(420),
  h: px(140),
  color: COLORS.primary,
  text_size: px(180),
  align_h: hmUI.align.CENTER_H,
  align_v: hmUI.align.CENTER_V,
  font: FONTS.time,
  text: '',
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const TIME_AOD_TEXT_PROPS = {
  ...TIME_TEXT_PROPS,
  font: FONTS.aod,
  color: COLORS.aod,
  show_level: hmUI.show_level.ONAL_AOD,
};

export const TIME_TEXT_2_PROPS = {
  ...TIME_TEXT_PROPS,
  x: px(24),
  w: px(270),
  text_size: px(160),
  align_h: hmUI.align.RIGHT,
};

export const TIME_SECONDS_COLON_PROPS = {
  ...TIME_TEXT_PROPS,
  x: px(294),
  w: px(30),
  color: COLORS.accentSecondary,
  text_size: px(160),
  align_h: hmUI.align.LEFT,
  text: ':',
};

export const TIME_SECONDS_TEXT_PROPS = {
  ...TIME_TEXT_PROPS,
  x: px(319),
  w: px(130),
  color: COLORS.accentSecondary,
  text_size: px(160),
  align_h: hmUI.align.LEFT,
  type: hmUI.data_type.SECOND,
  padding: true,
  text: undefined,
};
