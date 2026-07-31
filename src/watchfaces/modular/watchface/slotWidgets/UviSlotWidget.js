import { UVI_IMAGE_LEVEL_PROPS } from './UviSlotWidget.layout';

/**
 * @typedef {Object} UviSlotWidgetParams
 * @property {number} x
 * @property {number} y
 * @property {number} w
 * @property {number} h
 */

export class UviSlotWidget {
  /**
   * @param {UviSlotWidgetParams} params
   */
  constructor({ x, y, w, h }) {
    hmUI.createWidget(hmUI.widget.IMG_LEVEL, {
      ...UVI_IMAGE_LEVEL_PROPS,
      x,
      y,
      w,
      h,
    });
  }
}
