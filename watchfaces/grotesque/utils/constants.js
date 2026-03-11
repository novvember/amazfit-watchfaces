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
  'uvi/uvi_0.png',
  'uvi/uvi_0.png',
  isRusLang ? 'uvi/uvi_1_ru.png' : 'uvi/uvi_1.png',
  isRusLang ? 'uvi/uvi_2_ru.png' : 'uvi/uvi_2.png',
  isRusLang ? 'uvi/uvi_2_ru.png' : 'uvi/uvi_2.png',
];
