import { BatteryWidget } from './BatteryWidget';
import { DateWidget } from './DateWidget';
import { HeartRateWidget } from './HeartRateWidget';
import { DISCONNECT_ICON_PROPS } from './index.r.layout';
import { SleepWidget } from './SleepWidget';
import { StepWidget } from './StepWidget';
import { TimeWidget } from './TimeWidget';

WatchFace({
  onInit() {
    console.log('watchface initing');
  },

  build() {
    console.log('watchface building');

    this._timeSensor = hmSensor.createSensor(hmSensor.id.TIME);

    this.buildTime();
    this.buildDate();
    this.buildBattery();
    this.buildHeartRate();
    this.buildSteps();
    this.buildSleepTime();
    this.buildDisconnectStatus();
  },

  onDestroy() {
    console.log('watchface destroying');
  },

  buildTime() {
    new TimeWidget({
      timeSensor: this._timeSensor,
    });
  },

  buildDate() {
    new DateWidget({
      timeSensor: this._timeSensor,
    });
  },

  buildBattery() {
    const batterySensor = hmSensor.createSensor(hmSensor.id.BATTERY);

    new BatteryWidget({ batterySensor });
  },

  buildHeartRate() {
    const heartSensor = hmSensor.createSensor(hmSensor.id.HEART);

    new HeartRateWidget({ heartSensor });
  },

  buildSteps() {
    const stepSensor = hmSensor.createSensor(hmSensor.id.STEP);

    new StepWidget({ stepSensor });
  },

  buildSleepTime() {
    const timeSensor = this._timeSensor;
    const sleepSensor = hmSensor.createSensor(hmSensor.id.SLEEP);
    const weatherSensor = hmSensor.createSensor(hmSensor.id.WEATHER);

    new SleepWidget({
      sleepSensor,
      weatherSensor,
      timeSensor,
    });
  },

  buildDisconnectStatus() {
    hmUI.createWidget(hmUI.widget.IMG_STATUS, DISCONNECT_ICON_PROPS);
  },
});
