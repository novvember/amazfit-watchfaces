import { getClosestSunEvent } from '../../../watchfaces/regarder/adapters/getClosestSunEvent';
import { getSleepTime } from '../../../adapters/getSleepTime';
import { SLEEP_TEXT_PROPS } from './SleepWidget.layout';
import { ArcIconWidget } from './ArcIconWidget';

/**
 * @typedef {Object} SleepWidgetParams
 * @property {HmSensorInstance} sleepSensor
 * @property {HmSensorInstance} weatherSensor
 * @property {HmSensorInstance} timeSensor
 */

export class SleepWidget {
  /**
   * @param {SleepWidgetParams} Params
   */
  constructor({ sleepSensor, weatherSensor, timeSensor }) {
    this._sleepSensor = sleepSensor;
    this._weatherSensor = weatherSensor;
    this._timeSensor = timeSensor;

    this._iconWidget = new ArcIconWidget({
      name: '',
      angle: 30,
      isExternal: false,
    });

    this._textWidget = hmUI.createWidget(hmUI.widget.TEXT, SLEEP_TEXT_PROPS);

    this._update = this._update.bind(this);
    this._bindHandlers();
  }

  /**
   * @param {string} sleepTimeString
   */
  _showSleepTime(sleepTimeString) {
    this._iconWidget.setName('sleep');
    this._textWidget.setProperty(hmUI.prop.TEXT, sleepTimeString);
  }

  _showSunriseSunset() {
    const closestSunEvent = getClosestSunEvent(
      this._weatherSensor,
      this._timeSensor,
    );

    if (!closestSunEvent) {
      this._textWidget.setProperty(hmUI.prop.TEXT, '');
      return;
    }

    const { type, time } = closestSunEvent;
    this._iconWidget.setName(type);
    this._textWidget.setProperty(hmUI.prop.TEXT, time.time);
  }

  _update() {
    const { text = '' } = getSleepTime(this._sleepSensor);

    if (text) {
      this._showSleepTime(text);
    } else {
      this._showSunriseSunset();
    }
  }

  _bindHandlers() {
    hmUI.createWidget(hmUI.widget.WIDGET_DELEGATE, {
      resume_call: () => {
        if (hmSetting.getScreenType() == hmSetting.screen_type.WATCHFACE) {
          this._update();
        }
      },
    });
  }
}
