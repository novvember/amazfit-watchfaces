import { HUMIDITY_ICON_IMAGE_PROPS } from './HumiditySlotWidget.layout';
import {
  WIDGET_ACTIVE_ARC_PROPS,
  WIDGET_BACKGROUND_ARC_PROPS,
  WIDGET_TEXT_L_PROPS,
} from '../index.r.layout';

/**
 * @typedef {Object} HumiditySlotWidgetParams
 * @property {number} x
 * @property {number} y
 * @property {number} w
 * @property {number} h
 */

export class HumiditySlotWidget {
  /**
   * @param {HumiditySlotWidgetParams} params
   */
  constructor({ x, y, w, h }) {
    const centerX = x + w / 2;
    const centerY = y + h / 2;

    hmUI.createWidget(hmUI.widget.IMG, {
      ...HUMIDITY_ICON_IMAGE_PROPS,
      x,
      y: y + 0.35 * h,
    });

    hmUI.createWidget(hmUI.widget.ARC_PROGRESS, {
      ...WIDGET_BACKGROUND_ARC_PROPS,
      center_x: centerX,
      center_y: centerY,
      start_angle: -145,
      end_angle: 145,
    });

    hmUI.createWidget(hmUI.widget.ARC_PROGRESS, {
      ...WIDGET_ACTIVE_ARC_PROPS,
      center_x: centerX,
      center_y: centerY,
      start_angle: -145,
      end_angle: 145,
      type: hmUI.data_type.HUMIDITY,
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
