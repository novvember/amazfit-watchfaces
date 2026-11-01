import { formatNumber } from '../../../utils/formatNumber';
import { calculateTextWidth } from '../utils/calculateTextWidth';
import {
  STEPS_VALUE_PROPS,
  STEPS_GROUP_PROPS,
  STEPS_ICON_PROPS,
  STEPS_ARROW_PROPS,
  DISTANCE_VALUE_PROPS,
} from './StepsWidget.layout';

export class StepsWidget {
  /**
   * @param {{ stepSensor: HmSensorInstance, distanceSensor:  HmSensorInstance}} params
   */
  constructor({ stepSensor, distanceSensor }) {
    this._stepSensor = stepSensor;
    this._distanceSensor = distanceSensor;

    const group = hmUI.createWidget(hmUI.widget.GROUP, STEPS_GROUP_PROPS);

    group.createWidget(hmUI.widget.IMG, STEPS_ICON_PROPS);

    this._valueWidget = group.createWidget(hmUI.widget.TEXT, STEPS_VALUE_PROPS);
    this._arrowWidget = group.createWidget(hmUI.widget.IMG, STEPS_ARROW_PROPS);
    this._distanceValueWidget = group.createWidget(
      hmUI.widget.TEXT,
      DISTANCE_VALUE_PROPS,
    );

    this._update = this._update.bind(this);

    this._bindHandlers();
  }

  _update() {
    this._updateStepsValue();
    this._updateDistanceValue();
    this._updatePositions();
  }

  _updateStepsValue() {
    const { current = 0 } = this._stepSensor;
    const text = formatNumber(current, ',');

    this._stepValue = text;

    this._valueWidget.setProperty(hmUI.prop.TEXT, text);
  }

  _getDistanceText(meters) {
    if (meters < 10000) {
      return `${meters}M`;
    }

    const kilometers = Math.floor(meters / 1000);

    return `${kilometers}KM`;
  }

  _updateDistanceValue() {
    const { current = 0 } = this._distanceSensor;
    const text = this._getDistanceText(current);

    this._distanceValueWidget.setProperty(hmUI.prop.TEXT, text);
  }

  _updatePositions() {
    const stepTextWidth = calculateTextWidth(
      this._stepValue || '',
      STEPS_VALUE_PROPS.text_size,
    );
    const stepValueEndX = STEPS_VALUE_PROPS.x + stepTextWidth;

    const arrowX = stepValueEndX + px(12);
    const distanceX = stepValueEndX + px(86);

    this._arrowWidget.setProperty(hmUI.prop.X, arrowX);
    this._distanceValueWidget.setProperty(hmUI.prop.X, distanceX);
  }

  _bindHandlers() {
    const update = this._update;
    const stepSensor = this._stepSensor;

    hmUI.createWidget(hmUI.widget.WIDGET_DELEGATE, {
      resume_call: () => {
        if (hmSetting.getScreenType() == hmSetting.screen_type.WATCHFACE) {
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
