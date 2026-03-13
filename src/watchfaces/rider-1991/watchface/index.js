import {} from '../utils/constants';

import {
  BACKGROUND_IMAGE_PROPS,
  BATTERY_ARC_PROPS,
  DATE_TEXT_PROPS,
  STEPS_ARC_PROPS,
  TIME_POINTER_PROPS,
} from './index.r.layout';

WatchFace({
  onInit() {
    console.log('watchface init');
  },

  build() {
    console.log('watchface build');

    this.buildDate();
    this.buildSteps();
    this.buildBattery();

    this.buildBackground();
    this.buildTime();
  },

  onDestroy() {
    console.log('watchface destroy');
  },

  buildBackground() {
    hmUI.createWidget(hmUI.widget.IMG, BACKGROUND_IMAGE_PROPS);
  },

  buildTime() {
    hmUI.createWidget(hmUI.widget.TIME_POINTER, TIME_POINTER_PROPS);
  },

  buildDate() {
    const text = hmUI.createWidget(hmUI.widget.TEXT, DATE_TEXT_PROPS);
    const timeSensor = hmSensor.createSensor(hmSensor.id.TIME);

    const update = () => {
      const { day } = timeSensor;
      text.setProperty(hmUI.prop.TEXT, day.toString());
    };

    hmUI.createWidget(hmUI.widget.WIDGET_DELEGATE, {
      resume_call: () => {
        if (hmSetting.getScreenType() == hmSetting.screen_type.WATCHFACE) {
          timeSensor.addEventListener(timeSensor.event.MINUTEEND, update);
          update();
        }
      },
      pause_call: () => {
        timeSensor.removeEventListener(timeSensor.event.MINUTEEND, update);
      },
    });
  },

  buildSteps() {
    const arc = hmUI.createWidget(hmUI.widget.ARC_PROGRESS, STEPS_ARC_PROPS);
    const stepSensor = hmSensor.createSensor(hmSensor.id.STEP);

    const update = () => {
      const { current, target } = stepSensor;
      const level = (100 * current) / target;

      arc.setProperty(hmUI.prop.LEVEL, level);
    };

    hmUI.createWidget(hmUI.widget.WIDGET_DELEGATE, {
      resume_call: () => {
        if (hmSetting.getScreenType() == hmSetting.screen_type.WATCHFACE) {
          stepSensor.addEventListener(hmSensor.event.CHANGE, update);
          update();
        }
      },
      pause_call: () => {
        stepSensor.removeEventListener(hmSensor.event.CHANGE, update);
      },
    });
  },

  buildBattery() {
    const arc = hmUI.createWidget(hmUI.widget.ARC_PROGRESS, BATTERY_ARC_PROPS);
    const batterySensor = hmSensor.createSensor(hmSensor.id.BATTERY);

    const update = () => {
      const { current } = batterySensor;

      arc.setProperty(hmUI.prop.LEVEL, current);
    };

    hmUI.createWidget(hmUI.widget.WIDGET_DELEGATE, {
      resume_call: () => {
        if (hmSetting.getScreenType() == hmSetting.screen_type.WATCHFACE) {
          batterySensor.addEventListener(hmSensor.event.CHANGE, update);
          update();
        }
      },
      pause_call: () => {
        batterySensor.removeEventListener(hmSensor.event.CHANGE, update);
      },
    });
  },
});
