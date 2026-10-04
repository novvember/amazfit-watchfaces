import * as ui from '@zos/ui';
import { localStorage } from '@zos/storage';
import { px } from '@zos/utils';
import {
  IMAGE_WIDTHS,
  TEXT_AOD_BASE_PROPS,
  TEXT_BASE_PROPS,
} from './TimeTextWidget.layout';

const CENTER_X = px(240);
const CENTER_Y = px(240);
const COLUMN_GAP = px(6);

const CHARS_LENGTH = 5;

const LOCALSTORAGE_CHARS__KEY = 'unlikeables-prev-chars';
const LOCALSTORAGE_IMAGE_IDS__KEY = 'unlikeables-prev-image-ids';

export class TimeTextWidget {
  constructor() {
    this._textWidgets = new Array(CHARS_LENGTH)
      .fill(null)
      .map(() => ui.createWidget(ui.widget.IMG, TEXT_BASE_PROPS));

    this._textAodWidgets = new Array(CHARS_LENGTH)
      .fill(null)
      .map(() => ui.createWidget(ui.widget.IMG, TEXT_AOD_BASE_PROPS));
  }

  /** @returns {number} */
  _getImageHeight() {
    return px(100);
  }

  /**
   * @param {string} imageId
   * @returns {number}
   */
  _getImageWidth(imageId) {
    return px(IMAGE_WIDTHS[imageId] ?? 100);
  }

  /**
   * @param {number} min
   * @param {number} max
   * @returns {number}
   */
  _calculateRandomInt(min, max) {
    return Math.round(min + Math.random() * (max - min));
  }

  /** @returns {[unknown[], unknown[]]} */
  _getPrevValues() {
    const chars = localStorage.getItem(LOCALSTORAGE_CHARS__KEY, []);
    const imageIds = localStorage.getItem(LOCALSTORAGE_IMAGE_IDS__KEY, []);

    return [
      Array.isArray(chars) ? chars : [],
      Array.isArray(imageIds) ? imageIds : [],
    ];
  }

  /**
   * @param {unknown[]} chars
   * @param {string[]} imageIds
   */
  _setPrevValues(chars, imageIds) {
    localStorage.setItem(LOCALSTORAGE_CHARS__KEY, chars);
    localStorage.setItem(LOCALSTORAGE_IMAGE_IDS__KEY, imageIds);
  }

  /**
   * @param {string} char
   * @param {string[]} otherImageIds
   * @returns {string}
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
   * @param {string[]} chars
   * @returns {string[]}
   */
  _getImageIds(chars) {
    const [prevChars, prevImageIds] = this._getPrevValues();
    /** @type {string[]} */
    const imageIds = [];
    let shouldUpdate = false;

    for (let i = 0; i < chars.length; i++) {
      const previousImageId = prevImageIds[i];

      if (
        chars[i] === prevChars[i] &&
        !shouldUpdate &&
        typeof previousImageId === 'string'
      ) {
        imageIds.push(previousImageId);
        continue;
      }

      prevChars[i] = chars[i];
      shouldUpdate = true;
      imageIds.push(this._getRandomImageId(chars[i], imageIds));
    }

    this._setPrevValues(prevChars, imageIds);
    return imageIds;
  }

  /**
   * @param {string[]} imageIds
   * @returns {number[]}
   */
  _calculateXCoords(imageIds) {
    /** @type {{start: number, end: number}[]} */
    const relativePositions = [];

    for (let i = 0; i < imageIds.length; i++) {
      const start = i === 0
        ? px(0)
        : relativePositions[i - 1].end + COLUMN_GAP;

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
   * @param {string} text
   */
  set(text) {
    const chars = text.split('').slice(0, CHARS_LENGTH);
    const imageIds = this._getImageIds(chars);
    const y = CENTER_Y - this._getImageHeight() / 2;
    const xCoords = this._calculateXCoords(imageIds);

    for (let i = 0; i < CHARS_LENGTH; i++) {
      if (i >= chars.length) {
        this._textWidgets[i].setProperty(ui.prop.VISIBLE, false);
        this._textAodWidgets[i].setProperty(ui.prop.VISIBLE, false);
        continue;
      }

      const imageId = imageIds[i];
      const x = xCoords[i];

      this._textWidgets[i].setProperty(ui.prop.MORE, {
        ...TEXT_BASE_PROPS,
        x,
        y,
        src: `digits/${imageId}.png`,
      });
      this._textWidgets[i].setProperty(ui.prop.VISIBLE, true);

      this._textAodWidgets[i].setProperty(ui.prop.MORE, {
        ...TEXT_AOD_BASE_PROPS,
        x,
        y,
        src: `digits_inverse/${imageId}.png`,
      });
      this._textAodWidgets[i].setProperty(ui.prop.VISIBLE, true);
    }
  }
}
