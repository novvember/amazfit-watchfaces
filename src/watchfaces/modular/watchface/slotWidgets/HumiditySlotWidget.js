import {
  WIDGET_ACTIVE_ARC_PROPS,
  WIDGET_BACKGROUND_ARC_PROPS,
  WIDGET_ICON_IMAGE_PROPS,
  WIDGET_TEXT_L_PROPS,
} from '../index.r.layout';
import { COLORS } from '../index.const';

/**
 * @typedef {Object} HumiditySlotWidgetParams
 * @property {number} x
 * @property {number} y
 * @property {number} w
 * @property {number} h
 * @property {string} colorTheme
 */

export class HumiditySlotWidget {
  /**
   * @param {HumiditySlotWidgetParams} params
   */
  constructor({ x, y, w, h, colorTheme }) {
    const centerX = x + w / 2;
    const centerY = y + h / 2;

    hmUI.createWidget(hmUI.widget.IMG, {
      ...WIDGET_ICON_IMAGE_PROPS,
      x,
      y: y + 0.35 * h,
      src: `humidity/${colorTheme}/icon.png`,
    });

    hmUI.createWidget(hmUI.widget.ARC_PROGRESS, {
      ...WIDGET_BACKGROUND_ARC_PROPS,
      center_x: centerX,
      center_y: centerY,
      start_angle: -145,
      end_angle: 145,
      color: COLORS[colorTheme].secondary,
    });

    hmUI.createWidget(hmUI.widget.ARC_PROGRESS, {
      ...WIDGET_ACTIVE_ARC_PROPS,
      center_x: centerX,
      center_y: centerY,
      start_angle: -145,
      end_angle: 145,
      type: hmUI.data_type.HUMIDITY,
      color: COLORS[colorTheme].primary,
    });

    hmUI.createWidget(hmUI.widget.TEXT_FONT, {
      ...WIDGET_TEXT_L_PROPS,
      x,
      y,
      w,
      h,
      type: hmUI.data_type.HUMIDITY,
      unit_type: 0,
    });
  }
}
