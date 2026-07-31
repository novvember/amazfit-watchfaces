import {
  SECONDS_BACKGROUND_PROPS,
  SECONDS_POINTER_PROPS,
} from './SecondsSlotWidget.layout';

/**
 * @typedef {Object} SecondsSlotWidgetParams
 * @property {number} x
 * @property {number} y
 * @property {number} w
 * @property {number} h
 */

export class SecondsSlotWidget {
  /**
   * @param {SecondsSlotWidgetParams} params
   */
  constructor({ x, y, w, h }) {
    const centerX = x + w / 2;
    const centerY = y + h / 2;

    hmUI.createWidget(hmUI.widget.IMG, {
      ...SECONDS_BACKGROUND_PROPS,
      x,
      y,
    });

    hmUI.createWidget(hmUI.widget.TIME_POINTER, {
      ...SECONDS_POINTER_PROPS,
      second_centerX: centerX,
      second_centerY: centerY,
      second_cover_x: x,
      second_cover_y: y,
    });
  }
}
