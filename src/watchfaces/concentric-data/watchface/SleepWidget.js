import { getClosestSunEvent } from '../../../watchfaces/regarder/adapters/getClosestSunEvent';
import { getSleepTime } from '../../../adapters/getSleepTime';
import { CircleTextWidget } from './CircleTextWidget';
import { SLEEP_CIRCLE_TEXT_PROPS } from './SleepWidget.layout';

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

    this._circleTextWidget = new CircleTextWidget(SLEEP_CIRCLE_TEXT_PROPS);

    this._update = this._update.bind(this);
    this._bindHandlers();
  }

  /**
   * @param {string} sleepTimeString
   */
  _showSleepTime(sleepTimeString) {
    this._circleTextWidget.updateText(`${sleepTimeString}✱`);
  }

  _showSunriseSunset() {
    const closestSunEvent = getClosestSunEvent(
      this._weatherSensor,
      this._timeSensor,
    );

    if (!closestSunEvent) {
      this._circleTextWidget.updateText('');
      return;
    }

    const { type, time } = closestSunEvent;
    const icon = type === 'sunrise' ? '☀' : '☼';
    this._circleTextWidget.updateText(`${time}${icon}`);
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
