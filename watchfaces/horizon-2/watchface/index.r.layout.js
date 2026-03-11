import { COLORS, FONTS } from '../utils/constants';

const { width, height } = hmSetting.getDeviceInfo();

/** Gets magic number to increase text area size so that arc text would render well */
const getArcTextDiff = () => (480 - px(480)) / 6.4;

const SCREEN = {
  width,
  height,
  centerX: width / 2,
  centerY: height / 2,
};

export const SUN_BACKGROUND_IMAGE_PROPS = {
  x: 0,
  y: 0,
  src: 'common/background.png',
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const SUN_ARC_PROPS = {
  center_x: SCREEN.centerX,
  center_y: SCREEN.centerY,
  radius: SCREEN.width / 4,
  start_angle: 0,
  end_angle: 360,
  color: 0x000000,
  line_width: SCREEN.width / 2,
  level: 100,
  corner_flag: 3,
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const SLEEP_ARC_PROPS = {
  center_x: SCREEN.centerX,
  center_y: SCREEN.centerY,
  radius: (px(410) - px(10)) / 2,
  start_angle: 0,
  end_angle: 0,
  color: COLORS.accentDimmed,
  line_width: px(10),
  level: 100,
  corner_flag: 3,
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const SCALE_IMAGE_PROPS = {
  x: 0,
  y: 0,
  src: 'common/scale.png',
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const TIME_POINTER_IMAGE_PROPS = {
  x: 0,
  y: 0,
  w: px(480),
  h: px(480),
  pos_x: px(480 - 60) / 2,
  pos_y: 0,
  center_x: px(480) / 2,
  center_y: px(480) / 2,
  angle: 0,
  src: 'common/time-pointer.png',
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const TIME_TEXT_PROPS = {
  x: (px(480) - (px(480) + getArcTextDiff())) / 2,
  y: (px(480) - (px(480) + getArcTextDiff())) / 2,
  w: (px(480) + getArcTextDiff()),
  h: (px(480) + getArcTextDiff()),
  text_size: px(21),
  color: 0x000000,
  text: '00',
  align_h: hmUI.align.CENTER_H,
  align_v: hmUI.align.TOP,
  char_space: 0,
  line_space: 0,
  start_angle: -15,
  end_angle: 15,
  font: FONTS.minute,
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const INNER_TEXT_PROPS = {
  x: (px(480 - 260)) / 2,
  y: (px(480 - 260)) / 2,
  w: px(260),
  h: px(260),
  text_size: px(18),
  color: 0xffffff,
  text: '',
  align_h: hmUI.align.CENTER_H,
  align_v: hmUI.align.TOP,
  char_space: px(3),
  line_space: 0,
  start_angle: 0,
  end_angle: 0,
  font: FONTS.text,
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const OUTER_TEXT_PROPS = {
  x: (px(480) - (px(480) + getArcTextDiff())) / 2,
  y: (px(480) - (px(480) + getArcTextDiff())) / 2,
  w: (px(480) + getArcTextDiff()),
  h: (px(480) + getArcTextDiff()),
  text_size: px(26),
  color: 0xffffff,
  text: '--',
  align_h: hmUI.align.CENTER_H,
  align_v: hmUI.align.TOP,
  char_space: px(5),
  line_space: 0,
  start_angle: 0,
  end_angle: 0,
  font: FONTS.text,
  show_level: hmUI.show_level.ONLY_NORMAL,
};
