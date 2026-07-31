import { WIDGET_ICON_IMAGE_PROPS } from '../index.r.layout';

/**
 * @typedef {Object} MoonSlotWidgetParams
 * @property {number} x
 * @property {number} y
 * @property {number} w
 * @property {number} h
 */

export const MOON_IMAGES = new Array(29)
  .fill(null)
  .map((_, i) => `moon/${i + 1}.png`);

export class MoonSlotWidget {
  /**
   * @param {MoonSlotWidgetParams} params
   */
  constructor({ x, y }) {
    hmUI.createWidget(hmUI.widget.IMG_LEVEL, {
      ...WIDGET_ICON_IMAGE_PROPS,
      x,
      y,
      image_array: MOON_IMAGES,
      image_length: MOON_IMAGES.length,
      type: hmUI.data_type.MOON,
    });
  }
}
