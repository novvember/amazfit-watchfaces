/**
 * Converts radian angle value to degrees
 * @param {number} rad - radian value
 * @returns {number} - degrees value
 */
function radiansToDegrees(rad) {
  return (rad * 180) / Math.PI;
}

/**
 * Calculates angular length of element
 * @param {Number} r - radius of circle, where element is
 * @param {Number} length - size of elenet
 * @returns {Number} - angle in degrees
 */
function calculateAnglularLength(r, length) {
  return radiansToDegrees(Math.acos((2 * r ** 2 - length ** 2) / (2 * r ** 2)));
}

/**
 * Builds circle text, where every char is hmUI.widget.IMG widget
 * - center of text rotation is the center of the screen of w480 size
 * @param {Object} params
 * @returns {Objcet}
 */
export function createCircleTextWidget({
  maxLength,
  text,
  angleStart,
  radius,
  gap,
  charImages,
  imageWidth,
  imageHeight,
  isTextReversed,
}) {
  const SCREEN_SIZE = px(480);

  if (isTextReversed) {
    angleStart *= -1;
  }

  const chars = text
    .toLowerCase()
    .slice(0, maxLength)
    .padEnd(maxLength, ' ')
    .split('');
  const imageAngle = calculateAnglularLength(radius, imageWidth);
  let gapAngle = calculateAnglularLength(radius, gap);

  if (gap < 0) {
    gapAngle *= -1;
  }

  const widgets = chars.map((char, i) =>
    hmUI.createWidget(hmUI.widget.IMG, {
      src: charImages[char] || charImages[' '],
      w: SCREEN_SIZE,
      h: SCREEN_SIZE,
      x: 0,
      y: 0,
      pos_x: SCREEN_SIZE / 2 - imageWidth / 2,
      pos_y: isTextReversed
        ? SCREEN_SIZE / 2 + radius
        : SCREEN_SIZE / 2 - radius - imageHeight,
      center_x: SCREEN_SIZE / 2,
      center_y: SCREEN_SIZE / 2,
      angle: isTextReversed
        ? angleStart - i * imageAngle - i * gapAngle
        : angleStart + i * imageAngle + i * gapAngle,
      show_level: hmUI.show_level.ONLY_NORMAL,
    }),
  );

  const updateText = (newText) => {
    const newTextChars = newText
    .toLowerCase()
    .slice(0, maxLength)
    .padEnd(maxLength, ' ')
    .split('');

    for (let i = 0; i < chars.length; i++) {
      if (chars[i] === newTextChars[i]) continue;

      widgets[i].setProperty(
        hmUI.prop.SRC,
        charImages[newTextChars[i]] || charImages[' '],
      );

      chars[i] = newTextChars[i];
    }
  };

  return { updateText };
}
