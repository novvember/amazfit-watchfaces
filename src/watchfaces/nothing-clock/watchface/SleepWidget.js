import { getSleepTime } from '../../../adapters/getSleepTime';
import { SLEEP_TEXT_PROPS } from './SleepWidget.layout';

export class SleepWidget {
  /**
   * @param {{ sleepSensor: HmSensorInstance }} params
   */
  constructor({ sleepSensor }) {
    this._sleepSensor = sleepSensor;
    this._textWidget = hmUI.createWidget(hmUI.widget.TEXT, SLEEP_TEXT_PROPS);
    this._update = this._update.bind(this);
    this._bindHandlers();
  }

  _update() {
    const { text = '-:--' } = getSleepTime(this._sleepSensor);
    this._textWidget.setProperty(hmUI.prop.TEXT, text);
  }

  _bindHandlers() {
    const update = this._update;

    hmUI.createWidget(hmUI.widget.WIDGET_DELEGATE, {
      resume_call: () => {
        if (hmSetting.getScreenType() == hmSetting.screen_type.WATCHFACE) {
          update();
        }
      },
    });
  }
}
