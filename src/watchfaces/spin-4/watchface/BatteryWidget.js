import { getDataWidgetProps } from '../utils/getDataWidgetProps';

/**
 * @typedef {Object} BatteryWidgetParams
 * @property {'top' | 'bottom'} position
 */

export class BatteryWidget {
  /**
   * @param {BatteryWidgetParams} params
   */
  constructor({ position }) {
    hmUI.createWidget(hmUI.widget.TEXT_FONT, {
      ...getDataWidgetProps(position),
      type: hmUI.data_type.BATTERY,
      padding: false,
      unit_type: 1,
    });
  }
}
