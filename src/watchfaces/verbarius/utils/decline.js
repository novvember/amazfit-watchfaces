/**
 * Gets declined noun due to number
 * @param {Number} number
 * @param {[String, String, String]} strings - nouns for differnr number [1, 2, many]
 */

export function decline(number, strings) {
  const string = number.toString();
  const last = string[string.length - 1];
  const prev = string[string.length - 2];

  if (prev === '1') return strings[2];

  if (last === '1') return strings[0];
  if (last === '2') return strings[1];
  if (last === '3') return strings[1];
  if (last === '4') return strings[1];
  return strings[2];
}
