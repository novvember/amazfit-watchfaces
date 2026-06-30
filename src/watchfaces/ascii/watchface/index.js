import { BATTERY_TEXT_PROPS, STEPS_TEXT_PROPS } from './index.r.layout';
import { formatNumber } from '../../../utils/formatNumber';
import { TimeWidget } from './TimeWidget';
import { DateWidget } from './DateWidget';
import { SunWidget } from './SunWidget';

WatchFace({
  onInit() {
    console.log('watchface initing');
  },

  build() {
    console.log('watchface building');

    this._timeSensor = hmSensor.createSensor(hmSensor.id.TIME);

    this.buildTime();
    this.buildDate();
    this.buildSteps();
    this.buildBattery();
    this.buildSun();
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

  buildSteps() {
    const stepSensor = hmSensor.createSensor(hmSensor.id.STEP);
    const textWidget = hmUI.createWidget(hmUI.widget.TEXT, STEPS_TEXT_PROPS);
    let prevValue = 0;

    const update = () => {
      const { current = 0 } = stepSensor;

      if (prevValue === current) {
        return;
      }

      prevValue = current;

      const text = formatNumber(current, ' ');
      textWidget.setProperty(hmUI.prop.TEXT, text);
    };

    hmUI.createWidget(hmUI.widget.WIDGET_DELEGATE, {
      resume_call: () => {
        if (hmSetting.getScreenType() == hmSetting.screen_type.WATCHFACE) {
          stepSensor?.addEventListener?.(hmSensor.event.CHANGE, update);
          update();
        }
      },
      pause_call: () => {
        stepSensor?.removeEventListener?.(hmSensor.event.CHANGE, update);
      },
    });
  },

  buildBattery() {
    hmUI.createWidget(hmUI.widget.TEXT_FONT, BATTERY_TEXT_PROPS);
  },

  buildSun() {
    const timeSensor = this._timeSensor;
    const weatherSensor = hmSensor.createSensor(hmSensor.id.WEATHER);

    new SunWidget({
      timeSensor,
      weatherSensor,
    });
  },
});
