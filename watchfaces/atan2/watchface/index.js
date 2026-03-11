import { BatteryWidget } from './BatteryWidget';
import { DateWidget } from './DateWidget';
import {
  BACKGROUND_IMAGE_PROPS,
  OVERLAY_CIRCLE_AOD_PROPS,
} from './index.r.layout';
import { TimeWidget } from './TimeWidget';

WatchFace({
  onInit() {
    console.log('watchface initing');
  },

  build() {
    console.log('watchface building');

    this._timeSensor = hmSensor.createSensor(hmSensor.id.TIME);

    hmUI.createWidget(hmUI.widget.IMG, BACKGROUND_IMAGE_PROPS);

    this.buildDate();
    this.buildBattery();
    this.buildTime();

    hmUI.createWidget(hmUI.widget.CIRCLE, OVERLAY_CIRCLE_AOD_PROPS);
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
    new BatteryWidget();
  },
});
