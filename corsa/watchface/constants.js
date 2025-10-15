export const COLORS = {
  accent: 0xf5aa01,
  primary: 0xffffff,
  secondary: 0x848484,
  tertiary: 0x4b4b4b,
};

export const FONTS = {
  primary: 'fonts/Cabin-Regular.ttf',
  condensed: 'fonts/Cabin_Condensed-Regular.ttf',
};

const lang = DeviceRuntimeCore.HmUtils.getLanguage();
export const isRusLang = ['ru-RU', 'uk-UA'].includes(lang);
