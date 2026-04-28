import { clamp } from '../../../utils/clamp';
import { ArcIconWidget } from './ArcIconWidget';
import {
  STEPS_BACKGROUND_ARC_PROPS,
  STEPS_CURRENT_ARC_PROPS,
  STEPS_TEXT_PROPS,
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

    hmUI.createWidget(hmUI.widget.ARC_PROGRESS, STEPS_BACKGROUND_ARC_PROPS);
    this._arc = hmUI.createWidget(
      hmUI.widget.ARC_PROGRESS,
      STEPS_CURRENT_ARC_PROPS,
    );

    new ArcIconWidget({
      name: 'steps',
      angle: -31,
      isExternal: false,
    });

    this._textWidget = hmUI.createWidget(hmUI.widget.TEXT, STEPS_TEXT_PROPS);

    this._update = this._update.bind(this);
    this._bindHandlers();
  }

  _update() {
    const { current = 0, target = 10000 } = this._stepSensor;
    const level = clamp(0, Math.round((100 * current) / target), 100);

    this._arc.setProperty(hmUI.prop.LEVEL, level);
    this._textWidget.setProperty(hmUI.prop.TEXT, current.toString());
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
