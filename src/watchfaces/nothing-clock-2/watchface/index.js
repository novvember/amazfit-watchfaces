import { getTimeTexts } from '../../../adapters/getTimeTexts';
import { BatteryWidget } from './BatteryWidget';
import { DateWidget } from './DateWidget';
import { SecondsWidget } from './SecondsWidget';
import { SleepWidget } from './SleepWidget';
import { StepsWidget } from './StepsWidget';

import { TimeTextWidget } from './TimeTextWidget';
import { WeatherWidget } from './WeatherWidget';

WatchFace({
  onInit() {
    console.log('watchface initing');
  },

  build() {
    console.log('watchface building');

    this.buildTime();
    this.buildDate();
    this.buildSeconds();
    this.buildWeather();
    this.buildSteps();
    this.buildBattery();
    this.buildSleep();
  },

  onDestroy() {
    console.log('watchface destroying');
  },

  buildTime() {
    const timeSensor = hmSensor.createSensor(hmSensor.id.TIME);
    const textWidget = new TimeTextWidget();

    let prevTime = '';

    const update = () => {
      const { hourText, minuteText } = getTimeTexts(timeSensor);
      const timeText = `${hourText}${minuteText}`;

      if (prevTime === timeText) {
        return;
      }

      prevTime = timeText;

      textWidget.set(timeText);
    };

    hmUI.createWidget(hmUI.widget.WIDGET_DELEGATE, {
      resume_call: () => {
        if (
          hmSetting.getScreenType() == hmSetting.screen_type.WATCHFACE ||
          hmSetting.getScreenType() === hmSetting.screen_type.AOD
        ) {
          timeSensor.addEventListener?.(timeSensor.event.MINUTEEND, update);
          update();
        }
      },
      pause_call: () => {
        timeSensor.removeEventListener?.(timeSensor.event.MINUTEEND, update);
      },
    });
  },

  buildDate() {
    this._timeSensor =
      this._timeSensor || hmSensor.createSensor(hmSensor.id.TIME);

    new DateWidget({
      timeSensor: this._timeSensor,
    });
  },

  buildSeconds() {
    new SecondsWidget();
  },

  buildWeather() {
    this._weatherSensor =
      this._weatherSensor || hmSensor.createSensor(hmSensor.id.WEATHER);

    new WeatherWidget({
      weatherSensor: this._weatherSensor,
    });
  },

  buildSteps() {
    this._stepSensor =
      this._stepSensor || hmSensor.createSensor(hmSensor.id.STEP);

    this._distanceSensor =
      this._distanceSensor || hmSensor.createSensor(hmSensor.id.DISTANCE);

    new StepsWidget({
      stepSensor: this._stepSensor,
      distanceSensor: this._distanceSensor,
    });
  },

  buildBattery() {
    this._batterySensor =
      this._batterySensor || hmSensor.createSensor(hmSensor.id.BATTERY);

    new BatteryWidget({
      batterySensor: this._batterySensor,
    });
  },

  buildSleep() {
    this._sleepSensor =
      this._sleepSensor || hmSensor.createSensor(hmSensor.id.SLEEP);

    new SleepWidget({
      sleepSensor: this._sleepSensor,
    });
  },
});
