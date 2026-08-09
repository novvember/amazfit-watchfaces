import { UVI_IMAGE_LEVEL_PROPS } from './UviSlotWidget.layout';

/**
 * @typedef {Object} UviSlotWidgetParams
 * @property {number} x
 * @property {number} y
 * @property {number} w
 * @property {number} h
 * @property {string} colorTheme
 */

export class UviSlotWidget {
  /**
   * @param {UviSlotWidgetParams} params
   */
  constructor({ x, y, w, h, colorTheme }) {
    hmUI.createWidget(hmUI.widget.IMG_LEVEL, {
      ...UVI_IMAGE_LEVEL_PROPS,
      x,
      y,
      w,
      h,
      image_array: this._buildImages(colorTheme),
    });
  }

  /**
   * @param {string} colorTheme
   */
  _buildImages(colorTheme) {
    return new Array(5)
      .fill(null)
      .map((_, i) => `uvi/${colorTheme}/uvi_${i}.png`);
  }
}
