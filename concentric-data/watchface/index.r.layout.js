import {
  COLORS,
  CURRENT_HOUR,
  CURRENT_MINUTE,
  DATA,
  FONTS,
  MINUTE,
  SCREEN,
  SECOND,
} from '../utils/constants';

export const SECOND_IMAGE_PROPS = {
  x: 0,
  y: 0,
  pos_x: SCREEN.centerX - SECOND.image.size / 2,
  pos_y: SCREEN.centerY - SECOND.image.size / 2,
  w: SCREEN.width,
  h: SCREEN.height,
  src: SECOND.image.src,
  center_x: SCREEN.centerX,
  center_y: SCREEN.centerX,
  angle: 0,
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const SECOND_TEXT_PROPS = {
  x: 0,
  y: 0,
  w: SECOND.text.width,
  h: SECOND.text.height,
  color: SECOND.text.color,
  text_size: SECOND.text.textSize,
  align_h: hmUI.align.CENTER_H,
  align_v: hmUI.align.CENTER_V,
  font: FONTS.tertiary,
  text: '00',
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const MINUTE_IMAGE_PROPS = {
  x: 0,
  y: 0,
  pos_x: SCREEN.centerX - MINUTE.image.size / 2,
  pos_y: SCREEN.centerY - MINUTE.image.size / 2,
  w: SCREEN.width,
  h: SCREEN.height,
  src: MINUTE.image.src,
  center_x: SCREEN.centerX,
  center_y: SCREEN.centerX,
  angle: 0,
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const MINUTE_TEXT_PROPS = {
  x: 0,
  y: 0,
  w: MINUTE.text.width,
  h: MINUTE.text.height,
  color: MINUTE.text.color,
  text_size: MINUTE.text.textSize,
  align_h: hmUI.align.CENTER_H,
  align_v: hmUI.align.CENTER_V,
  font: FONTS.secondary,
  text: '00',
  show_level: hmUI.show_level.ONLY_NORMAL,
};

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

export const DATE_DAY_CIRCLE_TEXT_PROPS = {
  maxLength: 2,
  text: '00',
  angleStart: -11,
  radius: DATA.radius - DATA.circleText.imageHeight / 2,
  gap: px(-1),
  charImages: DATA.circleText.charImages,
  imageWidth: DATA.circleText.imageWidth,
  imageHeight: DATA.circleText.imageHeight,
  isTextReversed: true,
};

export const DATE_WEEK_CIRCLE_TEXT_PROPS = {
  maxLength: 3,
  text: 'XXX',
  angleStart: 3,
  radius: DATA.radius - DATA.circleText.imageHeight / 2,
  gap: px(-2),
  charImages: DATA.circleText.charImages,
  imageWidth: px(19),
  imageHeight: DATA.circleText.imageHeight,
  isTextReversed: true,
};

export const BATTERY_CIRCLE_TEXT_PROPS = {
  ...DATE_DAY_CIRCLE_TEXT_PROPS,
  maxLength: 4,
  text: '100%',
  angleStart: 57,
};

export const BATTERY_BACKGROUND_ARC_PROPS = {
  center_x: SCREEN.centerX,
  center_y: SCREEN.centerY,
  radius: DATA.radius,
  start_angle: 129,
  end_angle: 155,
  color: COLORS.tertiary,
  line_width: DATA.arc.width,
  level: 100,
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const BATTERY_CURRENT_ARC_PROPS = {
  ...BATTERY_BACKGROUND_ARC_PROPS,
  color: COLORS.primary,
};

export const HEART_CIRCLE_TEXT_PROPS = {
  ...DATE_DAY_CIRCLE_TEXT_PROPS,
  maxLength: 4,
  text: '000→',
  angleStart: -40,
};

export const HEART_BACKGROUND_ARC_PROPS = {
  center_x: SCREEN.centerX,
  center_y: SCREEN.centerY,
  radius: DATA.radius,
  start_angle: 225,
  end_angle: 260,
  color: COLORS.tertiary,
  line_width: DATA.arc.width,
  level: 100,
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const HEART_CURRENT_ARC_PROPS = {
  ...HEART_BACKGROUND_ARC_PROPS,
  color: COLORS.primary,
};

export const HEART_DOT_PROPS = {
  x: 0,
  y: 0,
  w: px(22),
  h: px(22),
  src: 'data/dot.png',
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const STEPS_CIRCLE_TEXT_PROPS = {
  ...DATE_DAY_CIRCLE_TEXT_PROPS,
  maxLength: 6,
  text: '00000→',
  angleStart: -30,
  isTextReversed: false,
};

export const STEPS_BACKGROUND_ARC_PROPS = {
  center_x: SCREEN.centerX,
  center_y: SCREEN.centerY,
  radius: DATA.radius,
  start_angle: 280,
  end_angle: 325,
  color: COLORS.tertiary,
  line_width: DATA.arc.width,
  level: 100,
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const STEPS_CURRENT_ARC_PROPS = {
  ...STEPS_BACKGROUND_ARC_PROPS,
  color: COLORS.primary,
};

export const SLEEP_CIRCLE_TEXT_PROPS = {
  ...DATE_DAY_CIRCLE_TEXT_PROPS,
  maxLength: 6,
  text: '00:00 ',
  angleStart: 30,
  isTextReversed: false,
};
