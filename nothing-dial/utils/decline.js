/**
 * Gets declined noun due to number
 * @param {Number} number
 * @param {String[]} strings - nouns for differnr number [1, 2, many]
 */

export function decline(number, strings) {
  const string = number.toString();
  const lastDigit = string[string.length - 1];

  if (lastDigit === '1') return strings[0];
  if (lastDigit === '2') return strings[1];
  if (lastDigit === '3') return strings[1];
  if (lastDigit === '4') return strings[1];
  return strings[2];
}
