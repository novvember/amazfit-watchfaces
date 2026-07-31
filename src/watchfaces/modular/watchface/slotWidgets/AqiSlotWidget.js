import { COLORS } from '../index.const';
import {
  WIDGET_ACTIVE_ARC_PROPS,
  WIDGET_BACKGROUND_ARC_PROPS,
  WIDGET_TEXT_L_PROPS,
  WIDGET_TEXT_XS_PROPS,
} from '../index.r.layout';
import { gettext } from 'i18n';

/**
 * @typedef {Object} AqiSlotWidgetParams
 * @property {number} x
 * @property {number} y
 * @property {number} w
 * @property {number} h
 */

export class AqiSlotWidget {
  /**
   * @param {AqiSlotWidgetParams} params
   */
  constructor({ x, y, w, h }) {
    const centerX = x + w / 2;
    const centerY = y + h / 2;

    hmUI.createWidget(hmUI.widget.TEXT, {
      ...WIDGET_TEXT_XS_PROPS,
      x,
      y: y + 0.35 * h,
      w,
      h,
      text: gettext('aqi'),
      color: COLORS.accent,
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
      type: hmUI.data_type.AQI,
    });

    hmUI.createWidget(hmUI.widget.TEXT_FONT, {
      ...WIDGET_TEXT_L_PROPS,
      x,
      y,
      w,
      h,
      type: hmUI.data_type.AQI,
      unit_type: 0,
    });
  }
}
