import { getHasCustomFontSupport } from './getHasCustomFontSupport';

const lang = DeviceRuntimeCore.HmUtils.getLanguage();
const isRusLang = ['ru-RU', 'uk-UA'].includes(lang);

const { width, height } = hmSetting.getDeviceInfo();

export const SCREEN = {
  width,
  height,
  centerX: width / 2,
  centerY: height / 2,
};

export const COLORS = {
  text: 0xffffff,
};

const hasCustomFontSupport = getHasCustomFontSupport();

export const FONT = hasCustomFontSupport
  ? 'fonts/FiraSans-SemiBold.ttf'
  : undefined;
export const FONT_SIZE = hasCustomFontSupport ? px(20) : px(19);

const WEEKDAYS_EN = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];
const WEEKDAYS_RU = ['ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ', 'ВС'];
export const WEEKDAYS = isRusLang ? WEEKDAYS_RU : WEEKDAYS_EN;

const STEPS_POSTFIX_EN = ['STEP', 'STEPS', 'STEPS'];
const STEPS_POSTFIX_RU = ['ШАГ', 'ШАГА', 'ШАГОВ'];
export const STEPS_POSTFIX = isRusLang ? STEPS_POSTFIX_RU : STEPS_POSTFIX_EN;

const HEART_TEXT_EN = '%s BPM';
const HEART_TEXT_RU = 'ЧСС %s';
export const HEART_TEXT = isRusLang ? HEART_TEXT_RU : HEART_TEXT_EN;

const SLEEP_TEXT_EN = 'SLEEP %s';
const SLEEP_TEXT_RU = 'СОН %s';
export const SLEEP_TEXT = isRusLang ? SLEEP_TEXT_RU : SLEEP_TEXT_EN;

const CALORIE_TEXT_EN = '%s KCAL';
const CALORIE_TEXT_RU = '%s ККАЛ';
export const CALORIE_TEXT = isRusLang ? CALORIE_TEXT_RU : CALORIE_TEXT_EN;

const KILOMETER_TEXT_EN = '%s KM';
const KILOMETER_TEXT_RU = '%s КМ';
export const KILOMETER_TEXT = isRusLang ? KILOMETER_TEXT_RU : KILOMETER_TEXT_EN;

const METER_TEXT_EN = '%s M';
const METER_TEXT_RU = '%s М';
export const METER_TEXT = isRusLang ? METER_TEXT_RU : METER_TEXT_EN;
