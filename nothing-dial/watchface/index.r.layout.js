import {
  BACKGROUND_CIRCLE,
  BATTERY,
  COLORS,
  DATE,
  DISCONNECT,
  FONT_FAMILY,
  FONT_SIZE,
  MINUTE_CENTER,
  SCREEN,
  SECOND,
  STEPS,
  TIME,
  WEATHER_ICON,
  WEATHER_TEMP,
} from '../utils/constants';

export const BACKGROUND_CIRCLE_PROPS = {
  center_x: SCREEN.centerX,
  center_y: SCREEN.centerY,
  radius: BACKGROUND_CIRCLE.radius,
  color: COLORS.background,
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const BACKGROUND_CIRCLE_AOD_PROPS = {
  x: SCREEN.centerX - BACKGROUND_CIRCLE.radius,
  y: SCREEN.centerY - BACKGROUND_CIRCLE.radius,
  w: BACKGROUND_CIRCLE.radius * 2,
  h: BACKGROUND_CIRCLE.radius * 2,
  radius: BACKGROUND_CIRCLE.radius,
  line_width: px(3),
  color: COLORS.aod,
  show_level: hmUI.show_level.ONAL_AOD,
};

export const MINUTE_POINTER_PROPS = {
  minute_centerX: SCREEN.centerX,
  minute_centerY: SCREEN.centerY,
  minute_posX: SCREEN.centerX,
  minute_posY: SCREEN.centerY,
  minute_path: 'time_pointers/minute.png',
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const MINUTE_POINTER_AOD_PROPS = {
  minute_centerX: SCREEN.centerX,
  minute_centerY: SCREEN.centerY,
  minute_posX: SCREEN.centerX,
  minute_posY: SCREEN.centerY,
  minute_path: 'time_pointers/minute_aod.png',
  show_level: hmUI.show_level.ONAL_AOD,
};

export const MINUTE_CENTER_PROPS = {
  center_x: SCREEN.centerX,
  center_y: SCREEN.centerY,
  radius: MINUTE_CENTER.radius,
  color: COLORS.primary,
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const MINUTE_CENTER_AOD_PROPS = {
  center_x: SCREEN.centerX,
  center_y: SCREEN.centerY,
  radius: MINUTE_CENTER.radius,
  color: COLORS.aod,
  show_level: hmUI.show_level.ONAL_AOD,
};

export const HOUR_POINTER_PROPS = {
  hour_centerX: SCREEN.centerX,
  hour_centerY: SCREEN.centerY,
  hour_posX: SCREEN.centerX,
  hour_posY: SCREEN.centerY,
  hour_path: 'time_pointers/hour.png',
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const HOUR_POINTER_AOD_PROPS = {
  hour_centerX: SCREEN.centerX,
  hour_centerY: SCREEN.centerY,
  hour_posX: SCREEN.centerX,
  hour_posY: SCREEN.centerY,
  hour_path: 'time_pointers/hour_aod.png',
  show_level: hmUI.show_level.ONAL_AOD,
};

export const SECOND_POINTER_PROPS = {
  second_centerX: SCREEN.centerX,
  second_centerY: SCREEN.centerY,
  second_posX: SCREEN.centerX,
  second_posY: SCREEN.centerY,
  second_path: 'time_pointers/second.png',
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const getSecondAnimationProps = (angleFrom, angleTo) => ({
  anim_steps: [
    {
      anim_rate: 'linear',
      anim_duration: SECOND.animationDuration,
      anim_from: angleFrom,
      anim_to: angleTo,
      anim_key: 'angle',
    },
  ],
  anim_fps: 25,
  anim_auto_start: 1,
  anim_auto_destroy: 1,
  anim_repeat: 1,
});

export const TIME_TEXT_PROPS = {
  x: TIME.x,
  y: TIME.y,
  w: TIME.width,
  h: TIME.height,
  color: COLORS.primary,
  text_size: FONT_SIZE.primary,
  align_h: hmUI.align.LEFT,
  align_v: hmUI.align.CENTER_V,
  font: FONT_FAMILY.primary,
  text: '00:00',
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const TIME_TEXT_AOD_PROPS = {
  x: TIME.x,
  y: TIME.y,
  w: TIME.width,
  h: TIME.height,
  color: COLORS.aod,
  text_size: FONT_SIZE.primary,
  align_h: hmUI.align.LEFT,
  align_v: hmUI.align.CENTER_V,
  font: FONT_FAMILY.primary,
  text: '00:00',
  show_level: hmUI.show_level.ONAL_AOD,
};

export const DATE_TEXT_PROPS = {
  x: DATE.x,
  y: DATE.y,
  w: DATE.width,
  h: DATE.height,
  color: COLORS.primary,
  text_size: FONT_SIZE.secondary,
  align_h: hmUI.align.LEFT,
  align_v: hmUI.align.CENTER_V,
  font: FONT_FAMILY.secondary,
  text: 'XXX 00',
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const STEPS_TEXT_PROPS = {
  x: STEPS.x,
  y: STEPS.y,
  w: STEPS.width,
  h: STEPS.height,
  color: COLORS.secondary,
  text_size: FONT_SIZE.secondary,
  align_h: hmUI.align.LEFT,
  align_v: hmUI.align.CENTER_V,
  font: FONT_FAMILY.secondary,
  text: '00000 xxxxx',
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const BATTERY_TEXT_PROPS = {
  x: BATTERY.x,
  y: BATTERY.y,
  w: BATTERY.width,
  h: BATTERY.height,
  color: COLORS.secondary,
  text_size: FONT_SIZE.secondary,
  align_h: hmUI.align.LEFT,
  align_v: hmUI.align.CENTER_V,
  font: FONT_FAMILY.secondary,
  text: '00%',
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const DISCONNECT_STATUS_PROPS = {
  x: SCREEN.centerX - DISCONNECT.width / 2,
  y: DISCONNECT.y,
  type: hmUI.system_status.DISCONNECT,
  src: 'disconnect.png',
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const WEATHER_ICON_PROPS = {
  x: WEATHER_ICON.x,
  y: WEATHER_ICON.y,
  src: '',
  show_level: hmUI.show_level.ONLY_NORMAL,
};

export const WEATHER_TEMP_PROPS = {
  x: WEATHER_TEMP.x,
  y: WEATHER_TEMP.y,
  w: WEATHER_TEMP.width,
  h: WEATHER_TEMP.height,
  align_h: hmUI.align.LEFT,
  align_v: hmUI.align.CENTER_V,
  text_size: FONT_SIZE.secondary,
  color: COLORS.secondary,
  text: '+00',
  font: FONT_FAMILY.secondary,
  show_level: hmUI.show_level.ONLY_NORMAL,
};
