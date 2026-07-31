import {
  WIDGET_ACTIVE_ARC_PROPS,
  WIDGET_BACKGROUND_ARC_PROPS,
} from '../index.r.layout';

/**
 * @typedef {Object} ActivityRingsSlotWidgetParams
 * @property {number} x
 * @property {number} y
 * @property {number} w
 * @property {number} h
 */

const LINE_WIDTH = px(10);
const GAP = px(3);

export class ActivityRingsSlotWidget {
  /**
   * @param {ActivityRingsSlotWidgetParams} params
   */
  constructor({ x, y, w, h }) {
    const centerX = x + w / 2;
    const centerY = y + h / 2;

    const dataTypes = [
      hmUI.data_type.CAL,
      hmUI.data_type.FAT_BURNING,
      hmUI.data_type.STAND,
    ];

    dataTypes.forEach((dataType, i) => {
      const radius = WIDGET_ACTIVE_ARC_PROPS.radius - i * (LINE_WIDTH + GAP);

      hmUI.createWidget(hmUI.widget.ARC_PROGRESS, {
        ...WIDGET_BACKGROUND_ARC_PROPS,
        center_x: centerX,
        center_y: centerY,
        radius,
      });

      hmUI.createWidget(hmUI.widget.ARC_PROGRESS, {
        ...WIDGET_ACTIVE_ARC_PROPS,
        center_x: centerX,
        center_y: centerY,
        radius,
        type: dataType,
      });
    });
  }
}
