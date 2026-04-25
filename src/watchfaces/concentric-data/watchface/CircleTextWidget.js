import { radiansToDegrees } from '../../../utils/degrees';

/**
 * @typedef {Object} CircleTextWidgetParams
 * @property {number} maxLength
 * @property {string} text
 * @property {number} angleStart
 * @property {number} radius
 * @property {number} gap
 * @property {Record<string, string>} charImages
 * @property {number} imageWidth
 * @property {number} imageHeight
 * @property {boolean} isTextReversed
 */

const SCREEN_SIZE = px(480);

/**
 * Calculates angular length of element
 * @param {Number} r - radius of circle, where element is
 * @param {Number} length - size of elenet
 * @returns {Number} - angle in degrees
 */
function calculateAnglularLength(r, length) {
  return radiansToDegrees(Math.acos((2 * r ** 2 - length ** 2) / (2 * r ** 2)));
}

export class CircleTextWidget {
  /**
   * @param {CircleTextWidgetParams} Params
   */
  constructor({
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
    this._maxLength = maxLength;
    this._charImages = charImages;

    if (isTextReversed) {
      angleStart *= -1;
    }

    this._chars = text
      .toLowerCase()
      .slice(0, maxLength)
      .padEnd(maxLength, ' ')
      .split('');

    const imageAngle = calculateAnglularLength(radius, imageWidth);

    let gapAngle = calculateAnglularLength(radius, gap);

    if (gap < 0) {
      gapAngle *= -1;
    }

    this._widgets = this._chars.map((char, i) =>
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
  }

  /**
   * @param {string} newText
   */
  updateText(newText) {
    const newTextChars = newText
      .toLowerCase()
      .slice(0, this._maxLength)
      .padEnd(this._maxLength, ' ')
      .split('');

    for (let i = 0; i < this._chars.length; i++) {
      if (this._chars[i] === newTextChars[i]) continue;

      this._widgets[i].setProperty(
        hmUI.prop.SRC,
        this._charImages[newTextChars[i]] || this._charImages[' '],
      );

      this._chars[i] = newTextChars[i];
    }
  }
}
