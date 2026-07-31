import { WIDGET_TEXT_L_PROPS, WIDGET_TEXT_XS_PROPS } from '../index.r.layout';
import { WIND_IMAGE_LEVEL_PROPS } from './WindSlotWidget.layout';
import { gettext } from 'i18n';

/**
 * @typedef {Object} WindSlotWidgetParams
 * @property {number} x
 * @property {number} y
 * @property {number} w
 * @property {number} h
 */

const DIRECTION_SIZE = px(96);

export class WindSlotWidget {
  /**
   * @param {WindSlotWidgetParams} params
   */
  constructor({ x, y, w, h }) {
    const centerX = x + w / 2;
    const centerY = y + h / 2;

    hmUI.createWidget(hmUI.widget.IMG_LEVEL, {
      ...WIND_IMAGE_LEVEL_PROPS,
      x: centerX - DIRECTION_SIZE / 2,
      y: centerY - DIRECTION_SIZE / 2,
      w: DIRECTION_SIZE,
      h: DIRECTION_SIZE,
    });

    hmUI.createWidget(hmUI.widget.TEXT_FONT, {
      ...WIDGET_TEXT_L_PROPS,
      x,
      y: y - 0.07 * h,
      w,
      h,
      type: hmUI.data_type.WIND,
    });

    hmUI.createWidget(hmUI.widget.TEXT, {
      ...WIDGET_TEXT_XS_PROPS,
      x,
      y: y + 0.17 * h,
      w,
      h,
      text: gettext('mps'),
    });
  }
}
