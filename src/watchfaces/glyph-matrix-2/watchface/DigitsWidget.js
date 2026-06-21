/**
 * @typedef {Object} DigitsWidgetParams
 * @property {Number} type
 */

import { DIGITS_IMAGE_TEXT_PROPS } from './DigitsWidget.layout';

const X = px(93);
const Y = px(345);

export class DigitsWidget {
  /**
   * @param {DigitsWidgetParams} Params
   */
  constructor({ type }) {
    hmUI.createWidget(hmUI.widget.TEXT_IMG, {
      ...DIGITS_IMAGE_TEXT_PROPS,
      x: X,
      y: Y,
      type,
    });
  }
}
