import { getTimeString as getTimeStringEng } from './en-US';
import { getTimeString as getTimeStringRus } from './ru-RU';
import { getTimeString as getTimeStringEsp } from './es-ES';

export function getTimeString(...args) {
  const lang = DeviceRuntimeCore.HmUtils.getLanguage();

  const FN_MAP = {
    'ru-RU': getTimeStringRus,
    'uk-UA': getTimeStringRus,
    'en-US': getTimeStringEng,
    'es-ES': getTimeStringEsp,
  };

  const fn = FN_MAP[lang] || FN_MAP['en-US'];
  return fn(...args);
}
