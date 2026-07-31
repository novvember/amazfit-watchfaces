import { COLORS } from '../index.const';
import {
  WIDGET_ACTIVE_ARC_PROPS,
  WIDGET_BACKGROUND_ARC_PROPS,
  WIDGET_TEXT_L_PROPS,
  WIDGET_TEXT_S_PROPS,
} from '../index.r.layout';

/**
 * @typedef {Object} TemperatureSlotWidgetParams
 * @property {number} x
 * @property {number} y
 * @property {number} w
 * @property {number} h
 */

export class TemperatureSlotWidget {
  /**
   * @param {TemperatureSlotWidgetParams} params
   */
  constructor({ x, y, w, h }) {
    const centerX = x + w / 2;
    const centerY = y + h / 2;

    hmUI.createWidget(hmUI.widget.ARC_PROGRESS, {
      ...WIDGET_BACKGROUND_ARC_PROPS,
      center_x: centerX,
      center_y: centerY,
      start_angle: -120,
      end_angle: 120,
    });

    hmUI.createWidget(hmUI.widget.ARC_PROGRESS, {
      ...WIDGET_ACTIVE_ARC_PROPS,
      center_x: centerX,
      center_y: centerY,
      start_angle: -120,
      end_angle: 120,
      type: hmUI.data_type.WEATHER_CURRENT,
    });

    hmUI.createWidget(hmUI.widget.TEXT_FONT, {
      ...WIDGET_TEXT_L_PROPS,
      x,
      y,
      w,
      h,
      type: hmUI.data_type.WEATHER_CURRENT,
      unit_type: 1,
    });

    hmUI.createWidget(hmUI.widget.TEXT_FONT, {
      ...WIDGET_TEXT_S_PROPS,
      color: COLORS.accent,
      x: x + 0.1 * w,
      y: y + 0.4 * h,
      w,
      h,
      align_h: hmUI.align.LEFT,
      type: hmUI.data_type.WEATHER_LOW,
    });

    hmUI.createWidget(hmUI.widget.TEXT_FONT, {
      ...WIDGET_TEXT_S_PROPS,
      color: COLORS.accent,
      x: x - 0.1 * w,
      y: y + 0.4 * h,
      w,
      h,
      align_h: hmUI.align.RIGHT,
      type: hmUI.data_type.WEATHER_HIGH,
    });
  }
}
