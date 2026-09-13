import {
  BATTERY_GROUP_PROPS,
  BATTERY_LEVEL_PROPS,
  BATTERY_VALUE_PROPS,
} from './BatteryWidget.layout';

export class BatteryWidget {
  /**
   * @param {{ batterySensor: HmSensorInstance }} params
   */
  constructor({ batterySensor }) {
    this._batterySensor = batterySensor;

    const group = hmUI.createWidget(hmUI.widget.GROUP, BATTERY_GROUP_PROPS);

    group.createWidget(hmUI.widget.IMG_LEVEL, BATTERY_LEVEL_PROPS);

    this._valueWidget = group.createWidget(
      hmUI.widget.TEXT,
      BATTERY_VALUE_PROPS,
    );

    this._update = this._update.bind(this);

    this._bindHandlers();
  }

  _update() {
    const { current = 0 } = this._batterySensor;
    const text = `${current}%`.slice(0, 3);

    this._valueWidget.setProperty(hmUI.prop.TEXT, text);
  }

  _bindHandlers() {
    const update = this._update;
    const batterySensor = this._batterySensor;

    hmUI.createWidget(hmUI.widget.WIDGET_DELEGATE, {
      resume_call: () => {
        if (hmSetting.getScreenType() == hmSetting.screen_type.WATCHFACE) {
          batterySensor.addEventListener?.(hmSensor.event.CHANGE, update);
          update();
        }
      },
      pause_call: () => {
        batterySensor.removeEventListener?.(hmSensor.event.CHANGE, update);
      },
    });
  }
}
