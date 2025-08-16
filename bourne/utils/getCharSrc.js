const CHAR_NAMES = {
  0: '0',
  1: '1',
  2: '2',
  3: '3',
  4: '4',
  5: '5',
  6: '6',
  7: '7',
  8: '8',
  9: '9',
  ' ': 'empty',
  ':': 'colon',
  '.': 'dot',
  '-': 'minus',
  '♥': 'heart',
  '°C': 'degree',
  '/': 'slash',
  '%': 'percent',
};


/**
 * @param {String | Number} char - required character
 * @param {String} color - color scheme for cahracter
 * @returns Image file source for required character or empty character if not supported
 */
export function getCharSrc(char, color) {
  const charName = CHAR_NAMES[char] || CHAR_NAMES[' '];
  return `chars_${color}/${charName}.png`;
}
