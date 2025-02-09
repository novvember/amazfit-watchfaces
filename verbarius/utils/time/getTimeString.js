import { getTimeStringEng } from './getTimeStringEng';
import { getTimeStringRus } from './getTimeStringRus';

export function getTimeString(...args) {
  const lang = DeviceRuntimeCore.HmUtils.getLanguage();

  const FN_MAP = {
    'ru-RU': getTimeStringRus,
    'uk-UA': getTimeStringRus,
    'en-US': getTimeStringEng,
  };

  const fn = FN_MAP[lang] || FN_MAP['en-US'];
  return fn(...args);
}
