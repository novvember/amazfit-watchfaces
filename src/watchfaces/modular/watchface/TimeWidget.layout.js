import { COLORS, FONTS } from './index.const';

export const TIME_TEXT_PROPS = {
  x: px(240) - px(320) / 2,
  y: px(240) - px(140) / 2,
  w: px(320),
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
