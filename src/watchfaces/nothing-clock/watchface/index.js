import {
  BACKGROUND_AOD_IMAGE_PROPS,
  BACKGROUND_IMAGE_PROPS,
} from './index.r.layout';
import { TimeWidget } from './TimeWidget';
import { DateWidget } from './DateWidget';
import { StepsWidget } from './StepsWidget';
import { SleepWidget } from './SleepWidget';
import { BatteryWidget } from './BatteryWidget';
import { ColorSettings } from './settings/ColorSettings';
import { InfoWidget } from './settings/InfoWidget';

WatchFace({
  onInit() {
    console.log('watchface initing');
  },

  build() {
    console.log('watchface building');

    this._buildSettings();

    this.buildBackground();

    this._buildDate();
    this._buildSteps();
    this._buildSleep();
    this._buildBattery();

    this._buildTime();
  },

  onDestroy() {
    console.log('watchface destroying');
  },

  _buildSettings() {
    const colorSettings = new ColorSettings();

    this._colorAccent = colorSettings.settings?.accent || 'red';

    new InfoWidget();
  },

  buildBackground() {
    hmUI.createWidget(hmUI.widget.IMG, BACKGROUND_IMAGE_PROPS);
    hmUI.createWidget(hmUI.widget.IMG, BACKGROUND_AOD_IMAGE_PROPS);
  },

  _buildTime() {
    new TimeWidget({
      colorAccent: this._colorAccent,
    });
  },

  _buildDate() {
    this._timeSensor =
      this._timeSensor || hmSensor.createSensor(hmSensor.id.TIME);

    new DateWidget({
      timeSensor: this._timeSensor,
      colorAccent: this._colorAccent,
    });
  },

  _buildSteps() {
    this._stepSensor =
      this._stepSensor || hmSensor.createSensor(hmSensor.id.STEP);

    new StepsWidget({
      stepSensor: this._stepSensor,
    });
  },

  _buildSleep() {
    this._sleepSensor =
      this._sleepSensor || hmSensor.createSensor(hmSensor.id.SLEEP);

    new SleepWidget({
      sleepSensor: this._sleepSensor,
    });
  },

  _buildBattery() {
    new BatteryWidget();
  },
});
