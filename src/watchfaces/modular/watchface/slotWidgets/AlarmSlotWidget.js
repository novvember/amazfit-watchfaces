import { COLORS } from '../index.const';
import {
  WIDGET_BACKGROUND_CIRCLE_PROPS,
  WIDGET_ICON_IMAGE_PROPS,
  WIDGET_TEXT_S_PROPS,
} from '../index.r.layout';

/**
 * @typedef {Object} AlarmSlotWidgetParams
 * @property {number} x
 * @property {number} y
 * @property {number} w
 * @property {number} h
 */

export class AlarmSlotWidget {
  /**
   * @param {AlarmSlotWidgetParams} params
   */
  constructor({ x, y, w, h }) {
    const centerX = x + w / 2;
    const centerY = y + h / 2;

    hmUI.createWidget(hmUI.widget.CIRCLE, {
      ...WIDGET_BACKGROUND_CIRCLE_PROPS,
      center_x: centerX,
      center_y: centerY,
      radius: w / 2,
    });

    hmUI.createWidget(hmUI.widget.IMG, {
      ...WIDGET_ICON_IMAGE_PROPS,
      x,
      y: y - 0.15 * h,
      src: 'alarm/alarm_off.png',
    });

    hmUI.createWidget(hmUI.widget.IMG_STATUS, {
      ...WIDGET_ICON_IMAGE_PROPS,
      x,
      y: y - 0.15 * h,
      src: 'alarm/alarm_on.png',
      type: hmUI.system_status.CLOCK,
    });

    hmUI.createWidget(hmUI.widget.TEXT_FONT, {
      ...WIDGET_TEXT_S_PROPS,
      x,
      y: y + 0.15 * h,
      w,
      h,
      color: COLORS.primary,
      type: hmUI.data_type.ALARM_CLOCK,
      padding: true, // time format 00:00
    });
  }
}
