import { clamp } from '../../../utils/clamp';
import { CircleTextWidget } from './CircleTextWidget';
import {
  STEPS_BACKGROUND_ARC_PROPS,
  STEPS_CIRCLE_TEXT_PROPS,
  STEPS_CURRENT_ARC_PROPS,
} from './StepWidget.layout';

/**
 * @typedef {Object} StepWidgetParams
 * @property {HmSensorInstance} stepSensor
 */

export class StepWidget {
  /**
   * @param {StepWidgetParams} Params
   */
  constructor({ stepSensor }) {
    this._stepSensor = stepSensor;

    this._circleTextWidget = new CircleTextWidget(STEPS_CIRCLE_TEXT_PROPS);
    hmUI.createWidget(hmUI.widget.ARC_PROGRESS, STEPS_BACKGROUND_ARC_PROPS);
    this._arc = hmUI.createWidget(
      hmUI.widget.ARC_PROGRESS,
      STEPS_CURRENT_ARC_PROPS,
    );

    this._update = this._update.bind(this);
    this._bindHandlers();
  }

  _update() {
    const { current = 0, target = 10000 } = this._stepSensor;
    const level = clamp(0, Math.round((100 * current) / target), 100);

    this._circleTextWidget.updateText(`${current}▲`);
    this._arc.setProperty(hmUI.prop.LEVEL, level);
  }

  _bindHandlers() {
    const stepSensor = this._stepSensor;

    hmUI.createWidget(hmUI.widget.WIDGET_DELEGATE, {
      resume_call: () => {
        if (hmSetting.getScreenType() == hmSetting.screen_type.WATCHFACE) {
          stepSensor.addEventListener?.(hmSensor.event.CHANGE, this._update);
          this._update();
        }
      },
      pause_call: () => {
        stepSensor.removeEventListener?.(hmSensor.event.CHANGE, this._update);
      },
    });
  }
}
