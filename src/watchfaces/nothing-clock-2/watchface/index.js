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

    this._buildTime();
    this._buildDate();
    this._buildSeconds();
    this._buildWeather();
    this._buildSteps();
    this._buildBattery();
    this._buildSleep();
  },

  onDestroy() {
    console.log('watchface destroying');
  },

  _buildTime() {
    this._timeSensor =
      this._timeSensor || hmSensor.createSensor(hmSensor.id.TIME);

    new TimeTextWidget({ timeSensor: this._timeSensor });
  },

  _buildDate() {
    this._timeSensor =
      this._timeSensor || hmSensor.createSensor(hmSensor.id.TIME);

    new DateWidget({
      timeSensor: this._timeSensor,
    });
  },

  _buildSeconds() {
    new SecondsWidget();
  },

  _buildWeather() {
    this._weatherSensor =
      this._weatherSensor || hmSensor.createSensor(hmSensor.id.WEATHER);

    new WeatherWidget({
      weatherSensor: this._weatherSensor,
    });
  },

  _buildSteps() {
    this._stepSensor =
      this._stepSensor || hmSensor.createSensor(hmSensor.id.STEP);

    this._distanceSensor =
      this._distanceSensor || hmSensor.createSensor(hmSensor.id.DISTANCE);

    new StepsWidget({
      stepSensor: this._stepSensor,
      distanceSensor: this._distanceSensor,
    });
  },

  _buildBattery() {
    this._batterySensor =
      this._batterySensor || hmSensor.createSensor(hmSensor.id.BATTERY);

    new BatteryWidget({
      batterySensor: this._batterySensor,
    });
  },

  _buildSleep() {
    this._sleepSensor =
      this._sleepSensor || hmSensor.createSensor(hmSensor.id.SLEEP);

    new SleepWidget({
      sleepSensor: this._sleepSensor,
    });
  },
});
