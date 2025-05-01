const lang = DeviceRuntimeCore.HmUtils.getLanguage();
const isRusLang = ['ru-RU', 'uk-UA'].includes(lang);

export const FONTS = {
  time: 'fonts/HankenGrotesk-Medium.ttf',
  data: isRusLang
    ? 'fonts/Overpass-Light.ttf'
    : 'fonts/HankenGrotesk-Light.ttf',
  aod: 'fonts/HankenGrotesk-Thin.ttf',
};

export const UVI_IMAGES = [
  'uvi/uvi_no.png',
  'uvi/uvi_no.png',
  isRusLang ? 'uvi/uvi_yes_ru.png' : 'uvi/uvi_yes.png',
  isRusLang ? 'uvi/uvi_yes_ru.png' : 'uvi/uvi_yes.png',
  isRusLang ? 'uvi/uvi_yes_ru.png' : 'uvi/uvi_yes.png',
];
