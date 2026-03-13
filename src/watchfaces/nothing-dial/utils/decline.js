/**
 * Gets declined noun due to number
 * @param {Number} number
 * @param {String[]} words - nouns for different number [1, 2, 5, 0]
 */
export function decline(number, words) {
  if (!words || !words.length) {
    return '';
  }
  if (number === 0 && words[3]) {
    return words[3];
  }
  if (!words[1] && !words[2]) {
    return words[0];
  }
  if (!words[2]) {
    if (number > 0 && number <= 1) {
      return words[0];
    }
    return words[1];
  }
  number %= 100;
  if (number >= 20) {
    number %= 10;
  }
  if (number === 1) {
    return words[0];
  }
  if (number > 1 && number < 5) {
    return words[1];
  }
  return words[2];
}
