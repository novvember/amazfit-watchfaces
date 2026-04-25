import { getBatteryLevel } from '../../../adapters/getBatteryLevel';
import {
  BATTERY_BACKGROUND_ARC_PROPS,
  BATTERY_CIRCLE_TEXT_PROPS,
  BATTERY_CURRENT_ARC_PROPS,
} from './BatteryWidget.layout';
import { CircleTextWidget } from './CircleTextWidget';

/**
 * @typedef {Object} BatteryWidgetParams
 * @property {HmSensorInstance} batterySensor
 */

export class BatteryWidget {
  /**
   * @param {BatteryWidgetParams} Params
   */
  constructor({ batterySensor }) {
    this._batterySensor = batterySensor;

    this._circleTextWidget = new CircleTextWidget(BATTERY_CIRCLE_TEXT_PROPS);

    hmUI.createWidget(hmUI.widget.ARC_PROGRESS, BATTERY_BACKGROUND_ARC_PROPS);

    this._arc = hmUI.createWidget(
      hmUI.widget.ARC_PROGRESS,
      BATTERY_CURRENT_ARC_PROPS,
    );

    this._update = this._update.bind(this);
    this._bindHandlers();
  }

  _update() {
    const level = getBatteryLevel(this._batterySensor);
    this._circleTextWidget.updateText(`${level}%`);
    this._arc.setProperty(hmUI.prop.LEVEL, level);
  }

  _bindHandlers() {
    const batterySensor = this._batterySensor;

    hmUI.createWidget(hmUI.widget.WIDGET_DELEGATE, {
      resume_call: () => {
        if (hmSetting.getScreenType() == hmSetting.screen_type.WATCHFACE) {
          batterySensor.addEventListener?.(hmSensor.event.CHANGE, this._update);
          this._update();
        }
      },
      pause_call: () => {
        batterySensor.removeEventListener?.(
          hmSensor.event.CHANGE,
          this._update,
        );
      },
    });
  }
}
