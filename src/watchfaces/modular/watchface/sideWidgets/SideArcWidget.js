import { clamp } from '../../../../utils/clamp';
import { flipAngle } from '../../utils/flipAngle';
import { ScaleWidget } from './ScaleWidget';
import {
  SIDE_ARC_MARK_IMAGE_PROPS,
  SIDE_ARC_TITLE_LEFT_TEXT_PROPS,
  SIDE_ARC_TITLE_RIGHT_TEXT_PROPS,
  SIDE_ARC_VALUE_LEFT_TEXT_PROPS,
  SIDE_ARC_VALUE_RIGHT_TEXT_PROPS,
} from './SideArcWidget.layout';
import { SIDE_ARC_MAX_ANGLE, SIDE_ARC_MIN_ANGLE } from './SideWidget.const';

/**
 * @typedef {Object} SideArcWidgetParams
 * @property {'left' | 'right'} side
 * @property {String} title
 */

/**
 * @typedef {Object} SideArcWidgetSetParams
 * @property {string} [valueText]
 * @property {number} [value]
 * @property {[number, number]} [selection]
 */

const SCALE_TICK_COUNT = 21;

export class SideArcWidget {
  /**
   * @param {SideArcWidgetParams} params
   */
  constructor({ side, title }) {
    this._side = side;

    this._scaleWidget = new ScaleWidget({
      angleStart: this._prepareAngle(SIDE_ARC_MIN_ANGLE),
      angleEnd: this._prepareAngle(SIDE_ARC_MAX_ANGLE),
      count: SCALE_TICK_COUNT,
    });

    this._markWidget = hmUI.createWidget(
      hmUI.widget.IMG,
      SIDE_ARC_MARK_IMAGE_PROPS,
    );

    this._valueText = hmUI.createWidget(
      hmUI.widget.TEXT,
      side === 'right'
        ? SIDE_ARC_VALUE_RIGHT_TEXT_PROPS
        : SIDE_ARC_VALUE_LEFT_TEXT_PROPS,
    );

    this._titleText = hmUI.createWidget(
      hmUI.widget.TEXT,
      side === 'right'
        ? SIDE_ARC_TITLE_RIGHT_TEXT_PROPS
        : SIDE_ARC_TITLE_LEFT_TEXT_PROPS,
    );

    this._titleText.setProperty(hmUI.prop.TEXT, title.toUpperCase());

    this.set({
      valueText: '-',
      value: 0,
      selection: [0, 0],
    });
  }

  /**
   * @param {number} angle
   */
  _prepareAngle(angle) {
    if (this._side === 'left') {
      return flipAngle(angle);
    }

    return angle;
  }

  /**
   * @param {number} value
   */
  _getAngle(value) {
    return (
      SIDE_ARC_MIN_ANGLE - value * (SIDE_ARC_MIN_ANGLE - SIDE_ARC_MAX_ANGLE)
    );
  }

  /**
   * @param {SideArcWidgetSetParams} params
   */
  set({ valueText, value, selection }) {
    if (valueText !== undefined) {
      this._valueText.setProperty(hmUI.prop.TEXT, valueText);
    }

    if (value !== undefined) {
      const valueClamped = clamp(0, value, 1);
      const angle = this._getAngle(valueClamped);
      this._markWidget.setProperty(hmUI.prop.ANGLE, this._prepareAngle(angle));
    }

    if (selection !== undefined) {
      const minClamped = clamp(0, selection[0], 1);
      const maxClamped = clamp(0, selection[1], 1);

      this._scaleWidget.setSelection([minClamped, maxClamped]);
    }
  }
}
