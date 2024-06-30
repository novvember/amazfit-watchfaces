const lang = DeviceRuntimeCore.HmUtils.getLanguage();
export const isRusLang = ['ru-RU', 'uk-UA'].includes(lang);

const { width, height } = hmSetting.getDeviceInfo();

export const SCREEN = {
  width,
  height,
  centerX: width / 2,
  centerY: height / 2,
};

export const dateWeekArray = new Array(7)
  .fill(null)
  .map((_, i) => `date_week${isRusLang ? '_rus' : ''}/${i}.png`);

export const dateNumberArray = new Array(10)
  .fill(null)
  .map((_, i) => `date_number/${i}.png`);
