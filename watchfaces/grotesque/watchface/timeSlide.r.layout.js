import { FONTS } from '../utils/constants';

const { width, height } = hmSetting.getDeviceInfo();

export const SCREEN = {
  width,
  height,
  centerX: width / 2,
  centerY: height / 2,
};

export const MINUTE_TEXT = {
  x: px(240),
  y: px(175),
  lineSpace: px(10),
  width: px(200),
  height: px(130),
};

export const TIME_TEXT_PROPS = {
  x: MINUTE_TEXT.x,
  y: MINUTE_TEXT.y,
  w: MINUTE_TEXT.width,
  h: MINUTE_TEXT.height,
  color: 0xb1b1b1,
  text_size: px(170),
  align_h: hmUI.align.CENTER_H,
  align_v: hmUI.align.CENTER_V,
  font: FONTS.time,
  text: '00',
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const HOUR_GROUP_PROPS = {
  x: px(40),
  y: MINUTE_TEXT.y,
  w: MINUTE_TEXT.width,
  h: MINUTE_TEXT.height,
};

export const HOUR_TEXT_PROPS = {
  ...TIME_TEXT_PROPS,
  x: 0,
  y: 0,
};

export const HOUR_BG_PROPS = {
  x: 0,
  y: 0,
  w: HOUR_GROUP_PROPS.w,
  h: HOUR_GROUP_PROPS.h,
  color: 0x000000,
  show_level: hmUI.show_level.ONLY_NORMAL,
};
