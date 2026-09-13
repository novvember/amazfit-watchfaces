import {
  IMAGE_WIDTHS,
  TEXT_AOD_BASE_PROPS,
  TEXT_BASE_PROPS,
} from './TimeTextWidget.layout';

const CENTER_X = px(240);
const CENTER_Y = px(240);
const COLUMN_GAP = px(-4);
const LENGTH = 4;

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
   * @param {Number} imageId
   * @returns {Number}
   */
  _getImageWidth(imageId) {
    return px(IMAGE_WIDTHS[imageId]) || px(112);
  }

  /**
   * @param {String[]} chars
   * @returns {String[]}
   */
  _getImageIds(chars) {
    const imageIds = [];

    for (let i = 0; i < chars.length; i++) {
      imageIds.push(this._getRandomImageId(chars[i], imageIds));
    }

    this._setPrevValues(prevChars, imageIds);
    return imageIds;
  }

  /**
   * @param {String[]} digits
   */
  _calculateXCoords(digits) {
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
   * @param {String} text
   */
  set(text) {
    const digits = text.split('').slice(0, LENGTH);

    const y = CENTER_Y - this._getImageHeight() / 2;
    const xCoords = this._calculateXCoords(digits);

    digits.forEach((digit, i) => {
      const x = xCoords[i];

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
    });
  }
}
