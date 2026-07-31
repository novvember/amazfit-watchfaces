/**
 * Checks if one of locales is used
 *
 * @param {string[]} langs
 * @returns {boolean}
 */
export function checkLang(langs) {
  const lang = DeviceRuntimeCore.HmUtils.getLanguage();
  return langs.includes(lang);
}
