import { COLORS } from '../index.const';
import {
  WIDGET_ACTIVE_ARC_PROPS,
  WIDGET_BACKGROUND_ARC_PROPS,
  WIDGET_TEXT_L_PROPS,
} from '../index.r.layout';

/**
 * @typedef {Object} BatterySlotWidgetParams
 * @property {number} x
 * @property {number} y
 * @property {number} w
 * @property {number} h
 * @property {string} colorTheme
 */

export class BatterySlotWidget {
  /**
   * @param {BatterySlotWidgetParams} params
   */
  constructor({ x, y, w, h, colorTheme }) {
    const centerX = x + w / 2;
    const centerY = y + h / 2;

    hmUI.createWidget(hmUI.widget.ARC_PROGRESS, {
      ...WIDGET_BACKGROUND_ARC_PROPS,
      center_x: centerX,
      center_y: centerY,
      color: COLORS[colorTheme].secondary,
    });

    hmUI.createWidget(hmUI.widget.ARC_PROGRESS, {
      ...WIDGET_ACTIVE_ARC_PROPS,
      center_x: centerX,
      center_y: centerY,
      type: hmUI.data_type.BATTERY,
      color: COLORS[colorTheme].primary,
    });

    hmUI.createWidget(hmUI.widget.TEXT_FONT, {
      ...WIDGET_TEXT_L_PROPS,
      x,
      y,
      w,
      h,
      type: hmUI.data_type.BATTERY,
    });
  }
}
