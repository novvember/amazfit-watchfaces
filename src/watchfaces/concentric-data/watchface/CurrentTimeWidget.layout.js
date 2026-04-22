import { getIs12HourFormat } from '../../../adapters/getIs12HourFormat';
import { COLORS, FONTS } from './index.const';

export const FRAME_IMAGE_PROPS = {
  x: px(296),
  y: px(196),
  src: 'time/frame.png',
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const FRAME_AOD_IMAGE_PROPS = {
  x: px(297),
  y: px(198),
  src: 'time/frame_aod.png',
  show_level: hmUI.show_level.ONAL_AOD,
};

export const CURRENT_HOUR_TEXT_PROPS = {
  x: px(180),
  y: px(185),
  w: px(120),
  h: px(110),
  color: COLORS.primary,
  text_size: px(110),
  align_h: hmUI.align.CENTER_H,
  align_v: hmUI.align.CENTER_V,
  font: FONTS.primary,
  type: hmUI.data_type.HOUR,
  padding: getIs12HourFormat() ? false : true,
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const CURRENT_HOUR_AOD_TEXT_PROPS = {
  ...CURRENT_HOUR_TEXT_PROPS,
  font: FONTS.aod,
  color: COLORS.aod,
  show_level: hmUI.show_level.ONAL_AOD,
};

export const CURRENT_MINUTE_TEXT_PROPS = {
  x: px(312),
  y: px(210),
  w: px(60),
  h: px(60),
  color: COLORS.primary,
  text_size: px(54),
  align_h: hmUI.align.CENTER_H,
  align_v: hmUI.align.CENTER_V,
  font: FONTS.primary,
  type: hmUI.data_type.MINUTE,
  padding: true,
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const CURRENT_MINUTE_AOD_TEXT_PROPS = {
  ...CURRENT_MINUTE_TEXT_PROPS,
  font: FONTS.aod,
  color: COLORS.aod,
  show_level: hmUI.show_level.ONAL_AOD,
};

export const CURRENT_SECOND_TEXT_PROPS = {
  x: px(398),
  y: px(210),
  w: px(60),
  h: px(60),
  align_h: hmUI.align.CENTER_H,
  align_v: hmUI.align.CENTER_V,
  text_size: px(48),
  color: COLORS.primary,
  type: hmUI.data_type.SECOND,
  padding: true,
  font: FONTS.aod,
  show_level: hmUI.show_level.ONLY_NORMAL,
};
