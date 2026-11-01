/**
 * @param {string} text - text string
 * @param {number} textSize - font size
 * @returns {number} Text length
 */
export function calculateTextWidth(text, textSize) {
  const charWidth = textSize * 0.6;
  const textLength = text.length ?? 0;

  return Math.round(textLength * charWidth);
}
