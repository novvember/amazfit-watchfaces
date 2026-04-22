import {
  COLORS,
  CURRENT_HOUR,
  CURRENT_MINUTE,
  FONTS,
  SCREEN,
} from '../utils/constants';

export const FRAME_IMAGE_PROPS = {
  x: px(296),
  y: px(196),
  src: 'time/frame.png',
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const CURRENT_HOUR_TEXT_PROPS = {
  x: SCREEN.centerX - CURRENT_HOUR.width / 2,
  y: SCREEN.centerY - CURRENT_HOUR.height / 2,
  w: CURRENT_HOUR.width,
  h: CURRENT_HOUR.height,
  color: CURRENT_HOUR.color,
  text_size: CURRENT_HOUR.textSize,
  align_h: hmUI.align.CENTER_H,
  align_v: hmUI.align.CENTER_V,
  font: FONTS.primary,
  text: '00',
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const CURRENT_HOUR_AOD_TEXT_PROPS = {
  ...CURRENT_HOUR_TEXT_PROPS,
  font: FONTS.aod,
  color: COLORS.aod,
  show_level: hmUI.show_level.ONAL_AOD,
};

export const CURRENT_MINUTE_TEXT_PROPS = {
  x: SCREEN.centerX + CURRENT_MINUTE.radius - CURRENT_MINUTE.width / 2,
  y: SCREEN.centerY - CURRENT_MINUTE.height / 2,
  w: CURRENT_MINUTE.width,
  h: CURRENT_MINUTE.height,
  color: CURRENT_MINUTE.color,
  text_size: CURRENT_MINUTE.textSize,
  align_h: hmUI.align.CENTER_H,
  align_v: hmUI.align.CENTER_V,
  font: FONTS.primary,
  text: '00',
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const CURRENT_MINUTE_AOD_TEXT_PROPS = {
  ...CURRENT_MINUTE_TEXT_PROPS,
  font: FONTS.aod,
  color: COLORS.aod,
  show_level: hmUI.show_level.ONAL_AOD,
};
