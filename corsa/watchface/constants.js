export const COLORS = {
  accent: 0xff942a,
  accentDimmed: 0x95591c,
  primary: 0xffffff,
  secondary: 0x848484,
  tertiary: 0x4b4b4b,
};

export const FONTS = {
  primary: 'fonts/EncodeSans-SemiBold.ttf',
  condensed: 'fonts/EncodeSans_Condensed-SemiBold.ttf',
};

const lang = DeviceRuntimeCore.HmUtils.getLanguage();
export const isRusLang = ['ru-RU', 'uk-UA'].includes(lang);
