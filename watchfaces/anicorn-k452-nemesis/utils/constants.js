const lang = DeviceRuntimeCore.HmUtils.getLanguage();
const isRusLang = ['ru-RU', 'uk-UA'].includes(lang);

const { width, height } = hmSetting.getDeviceInfo();

export const SCREEN = {
  width,
  height,
  centerX: width / 2,
  centerY: height / 2,
};

export const WEEKDAYS = isRusLang
  ? [
      'ПОНЕДЕЛЬНИК',
      'ВТОРНИК',
      'СРЕДА',
      'ЧЕТВЕРГ',
      'ПЯТНИЦА',
      'СУББОТА',
      'ВОСКРЕСЕНЬЕ',
    ]
  : [
      'MONDAY',
      'TUESDAY',
      'WEDNESDAY',
      'THURSDAY',
      'FRIDAY',
      'SATURDAY',
      'SUNDAY',
    ];

export const TEXT_CHARS_PARAMS = {
  gap: px(1.5),
  radius: px(218),
};

export const BEZEL_TEXT = {
  text: isRusLang ? '→→ИНДИКАТОР→→' : '→→INDICATOR→→',
  maxLength: '→→INDICATOR→→'.length,
};

export const DATE_TEXT = {
  textTemplate: '%date %weekday',
  maxLength: isRusLang ? '00 ПОНЕДЕЛЬНИК'.length : '00 WEDNESDAY'.length,
};

export const STEPS_TEXT = {
  textTemplate: isRusLang ? 'ШАГИ %s' : 'STEPS %s',
  maxLength: isRusLang ? 'ШАГИ 00000'.length : 'STEPS 00000'.length,
};

export const BATTERY_TEXT = {
  textTemplate: isRusLang ? 'БАТАРЕЯ %s%' : 'BATTERY %s%',
  maxLength: isRusLang ? 'БАТАРЕЯ 000%'.length : 'BATTERY 000%'.length,
};

export const SLEEP_TEXT = {
  textTemplate: isRusLang ? 'СОН %s' : 'SLEEP %s',
  maxLength: isRusLang ? 'СОН 00:00'.length : 'SLEEP 00:00'.length,
};
