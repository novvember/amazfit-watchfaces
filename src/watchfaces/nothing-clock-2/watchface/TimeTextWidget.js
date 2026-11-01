import {
  IMAGE_WIDTHS,
  TEXT_AOD_BASE_PROPS,
  TEXT_BASE_PROPS,
} from './TimeTextWidget.layout';

const CENTER_X = px(240);
const CENTER_Y = px(240);
const COLUMN_GAP = px(-4);
const LENGTH = 4;

/**
 * @typedef {object} DigitPosition
 * @property {number} start
 * @property {number} end
 */

export class TimeTextWidget {
  constructor() {
    this._textWidgets = new Array(LENGTH)
      .fill(null)
      .map(() => hmUI.createWidget(hmUI.widget.IMG, TEXT_BASE_PROPS));

    this._textAodWidgets = new Array(LENGTH)
      .fill(null)
      .map(() => hmUI.createWidget(hmUI.widget.IMG, TEXT_AOD_BASE_PROPS));
  }

  _getImageHeight() {
    return px(112);
  }

  /**
   * @param {string} imageId
   * @returns {number}
   */
  _getImageWidth(imageId) {
    return px(IMAGE_WIDTHS[imageId] ?? 112) || px(112);
  }

  /**
   * @param {string[]} digits
   */
  _calculateXCoords(digits) {
    /** @type {DigitPosition[]} */
    const relativePositions = [];

    for (let i = 0; i < digits.length; i++) {
      const start = i === 0 ? px(0) : relativePositions[i - 1].end + COLUMN_GAP;

      relativePositions.push({
        start,
        end: start + this._getImageWidth(digits[i]),
      });
    }

    const startX = Math.floor(
      CENTER_X - relativePositions[relativePositions.length - 1].end / 2,
    );

    return relativePositions.map(
      (relativePosition) => startX + relativePosition.start,
    );
  }

  /**
   * @param {string} text
   */
  set(text) {
    // Expect a numeric time string; pad to three digits and truncate to four.
    const digits = text.padStart(3, '0').slice(0, LENGTH).split('');

    const y = CENTER_Y - this._getImageHeight() / 2;
    const xCoords = this._calculateXCoords(digits);

    for (let i = 0; i < LENGTH; i++) {
      const x = xCoords[i] ?? 0;
      // empty.png is intentionally absent: leave the fourth position blank.
      const digit = digits[i] ?? 'empty';

      this._textWidgets[i].setProperty(hmUI.prop.MORE, {
        ...TEXT_BASE_PROPS,
        x,
        y,
        src: `digits/${digit}.png`,
      });

      this._textAodWidgets[i].setProperty(hmUI.prop.MORE, {
        ...TEXT_AOD_BASE_PROPS,
        x,
        y,
        src: `digits_aod/${digit}.png`,
      });
    }
  }
}
