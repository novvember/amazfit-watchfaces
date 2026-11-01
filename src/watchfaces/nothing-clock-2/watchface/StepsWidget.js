import { formatNumber } from '../../../utils/formatNumber';
import { calculateTextWidth } from '../utils/calculateTextWidth';
import {
  ARROW_GAP,
  DISTANCE_GAP,
  STEPS_VALUE_TEXT_PROPS,
  STEPS_GROUP_PROPS,
  STEPS_ICON_IMAGE_PROPS,
  STEPS_ARROW_IMAGE_PROPS,
  DISTANCE_VALUE_TEXT_PROPS,
} from './StepsWidget.layout';

/**
 * @typedef {object} StepsWidgetParams
 * @property {HmSensorInstance} stepSensor
 * @property {HmSensorInstance} distanceSensor
 */

export class StepsWidget {
  /**
   * @param {StepsWidgetParams} params
   */
  constructor({ stepSensor, distanceSensor }) {
    this._stepSensor = stepSensor;
    this._distanceSensor = distanceSensor;

    const group = hmUI.createWidget(hmUI.widget.GROUP, STEPS_GROUP_PROPS);

    group.createWidget(hmUI.widget.IMG, STEPS_ICON_IMAGE_PROPS);

    this._valueTextWidget = group.createWidget(hmUI.widget.TEXT, STEPS_VALUE_TEXT_PROPS);
    this._arrowImageWidget = group.createWidget(hmUI.widget.IMG, STEPS_ARROW_IMAGE_PROPS);
    this._distanceTextWidget = group.createWidget(
      hmUI.widget.TEXT,
      DISTANCE_VALUE_TEXT_PROPS,
    );

    this._update = this._update.bind(this);

    this._bindHandlers();
  }

  _update() {
    const stepText = formatNumber(this._stepSensor.current ?? 0, ',');
    const distanceText = this._getDistanceText(this._distanceSensor.current ?? 0);

    this._valueTextWidget.setProperty(hmUI.prop.TEXT, stepText);
    this._distanceTextWidget.setProperty(hmUI.prop.TEXT, distanceText);
    this._updateLayout(stepText);
  }

  /** @param {number} meters */
  _getDistanceText(meters) {
    if (meters < 10000) {
      return `${meters}M`;
    }

    const kilometers = Math.floor(meters / 1000);

    return `${kilometers}KM`;
  }

  /** @param {string} stepText */
  _updateLayout(stepText) {
    const stepTextWidth = calculateTextWidth(
      stepText,
      STEPS_VALUE_TEXT_PROPS.text_size,
    );
    const stepValueEndX = STEPS_VALUE_TEXT_PROPS.x + stepTextWidth;

    const arrowX = stepValueEndX + ARROW_GAP;
    const distanceX = arrowX + STEPS_ARROW_IMAGE_PROPS.w + DISTANCE_GAP;

    this._arrowImageWidget.setProperty(hmUI.prop.X, arrowX);
    this._distanceTextWidget.setProperty(hmUI.prop.X, distanceX);
  }

  _bindHandlers() {
    const update = this._update;
    const stepSensor = this._stepSensor;

    hmUI.createWidget(hmUI.widget.WIDGET_DELEGATE, {
      resume_call: () => {
        if (hmSetting.getScreenType() === hmSetting.screen_type.WATCHFACE) {
          stepSensor.addEventListener?.(hmSensor.event.CHANGE, update);
          update();
        }
      },
      pause_call: () => {
        stepSensor.removeEventListener?.(hmSensor.event.CHANGE, update);
      },
    });
  }
}
