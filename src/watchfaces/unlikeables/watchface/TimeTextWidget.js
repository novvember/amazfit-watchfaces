import {
  IMAGE_WIDTHS,
  TEXT_AOD_BASE_PROPS,
  TEXT_BASE_PROPS,
} from './TimeTextWidget.layout';

const CENTER_X = px(240);
const CENTER_Y = px(240);
const COLUMN_GAP = px(6);
const LENGTH = 5;

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
    return px(100);
  }

  /**
   * @param {String} imageId
   * @returns {Number}
   */
  _getImageWidth(imageId) {
    return px(IMAGE_WIDTHS[imageId]) || px(100);
  }

  /**
   * @param {Number} min
   * @param {Number} max
   * @returns {Number}
   */
  _calculateRandomInt(min, max) {
    return Math.round(min + Math.random() * (max - min));
  }

  _getPrevValues() {
    const chars = JSON.parse(
      hmFS.SysProGetChars('unlikeables-prev-chars') || '[]',
    );

    const imageIds = JSON.parse(
      hmFS.SysProGetChars('unlikeables-prev-image-ids') || '[]',
    );

    return [chars, imageIds];
  }

  _setPrevValues(chars, imageIds) {
    hmFS.SysProSetChars('unlikeables-prev-chars', JSON.stringify(chars));
    hmFS.SysProSetChars('unlikeables-prev-image-ids', JSON.stringify(imageIds));
  }

  /**
   *
   * @param {String} char
   * @param {String[]} otherImageIds
   * @returns {String}
   */
  _getRandomImageId(char, otherImageIds) {
    if (char === ':') {
      return 'dots';
    }

    while (true) {
      const imageVariant = this._calculateRandomInt(0, 9);
      const imageId = `${char}_${imageVariant}`;

      if (!otherImageIds.some((otherImageId) => otherImageId === imageId)) {
        return imageId;
      }
    }
  }

  /**
   * @param {String[]} chars
   * @returns {String[]}
   */
  _getImageIds(chars) {
    const [prevChars, prevImageIds] = this._getPrevValues();

    const imageIds = [];
    let shouldUpdate = false;

    for (let i = 0; i < chars.length; i++) {
      if (chars[i] === prevChars[i] && !shouldUpdate) {
        imageIds.push(prevImageIds[i]);
        continue;
      }

      prevChars[i] = chars[i];
      shouldUpdate = true;

      imageIds.push(this._getRandomImageId(chars[i], imageIds));
    }

    this._setPrevValues(prevChars, imageIds);
    return imageIds;
  }

  _calculateXCoords(imageIds) {
    const relativePositions = [];

    for (let i = 0; i < imageIds.length; i++) {
      const start = i === 0 ? px(0) : relativePositions[i - 1].end + COLUMN_GAP;

      relativePositions.push({
        start,
        end: start + this._getImageWidth(imageIds[i]),
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
    const chars = text.split('').slice(0, LENGTH);
    const imageIds = this._getImageIds(chars);

    const y = CENTER_Y - this._getImageHeight() / 2;
    const xCoords = this._calculateXCoords(imageIds);

    chars.forEach((_char, i) => {
      const imageId = imageIds[i];
      const x = xCoords[i];

      this._textWidgets[i].setProperty(hmUI.prop.MORE, {
        ...TEXT_BASE_PROPS,
        x,
        y,
        src: `digits/${imageId}.png`,
      });

      this._textAodWidgets[i].setProperty(hmUI.prop.MORE, {
        ...TEXT_AOD_BASE_PROPS,
        x,
        y,
        src: `digits_inverse/${imageId}.png`,
      });
    });
  }
}
