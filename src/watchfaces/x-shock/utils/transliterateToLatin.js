const DICT = {
  а: 'a',
  б: 'b',
  в: 'v',
  г: 'g',
  д: 'd',
  е: 'e',
  ё: 'yo',
  ж: 'zh',
  з: 'z',
  и: 'i',
  й: 'y',
  к: 'k',
  л: 'l',
  м: 'm',
  н: 'n',
  о: 'o',
  п: 'p',
  р: 'r',
  с: 's',
  т: 't',
  у: 'u',
  ф: 'f',
  х: 'h',
  ц: 'ts',
  ч: 'ch',
  ш: 'sh',
  щ: 'sch',
  ъ: '',
  ы: 'i',
  ь: '',
  э: 'e',
  ю: 'yu',
  я: 'ya',
};

/**
 * Transliterates any text to latin characters text.
 * Will return '' if it is impossible to transliterate.
 * @param {String} text
 * @returns {String}
 */
export function transliterateToLatin(text) {
  const transliteratedText = text
    .toLowerCase()
    .split('')
    .map((char) => DICT[char] ?? char)
    .join('');

  if (!/^[a-zA-Z\-\s]+$/.test(transliteratedText)) {
    return '';
  }

  return transliteratedText;
}
