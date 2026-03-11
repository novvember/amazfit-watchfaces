const lang = DeviceRuntimeCore.HmUtils.getLanguage();
const isRusLang = ['ru-RU', 'uk-UA'].includes(lang);

const { width, height } = hmSetting.getDeviceInfo();

export const SCREEN = {
  centerX: width / 2,
  centerY: height / 2,
};

const WEEKDAY_EN = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];
const WEEKDAY_RU = ['ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ', 'ВС'];
export const WEEKDAYS = isRusLang ? WEEKDAY_RU : WEEKDAY_EN;

export const HEART_TEXT = isRusLang ? 'ЧСС %s' : '%s BPM';

export const SLEEP_TEXT = isRusLang ? 'СОН %s' : 'SLEEP %s';

const STEPS_POSTFIX_RU = ['шаг', 'шага', 'шагов'];
const STEPS_POSTFIX_EN = ['step', 'steps', 'steps'];
export const STEPS_POSTFIX = isRusLang ? STEPS_POSTFIX_RU : STEPS_POSTFIX_EN;
