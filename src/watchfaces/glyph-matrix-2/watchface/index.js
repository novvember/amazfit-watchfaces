import { getCurrentTimePosition } from '../../../adapters/getCurrentTimePosition';
import { DateWidget } from './DateWidget';
import { DigitsWidget } from './DigitsWidget';
import { BACKGROUND_IMAGE_PROPS } from './index.r.layout';
import { ProgressWidget } from './ProgressWidget';
import { SunWidget } from './SunWidget';
import { TimeWidget } from './TimeWidget';

WatchFace({
  onInit() {
    console.log('watchface initing');
  },

  build() {
    console.log('watchface building');

    this.buildBackground();

    this.buildTop();

    this.buildTime();

    this.buildStepsProgress();
    // this.buildStepsDigits();
  },

  onDestroy() {
    console.log('watchface destroying');
  },

  buildBackground() {
    hmUI.createWidget(hmUI.widget.IMG, BACKGROUND_IMAGE_PROPS);
  },

  buildTime() {
    new TimeWidget();
  },

  buildTop() {
    const timeSensor = hmSensor.createSensor(hmSensor.id.TIME);
    const weatherSensor = hmSensor.createSensor(hmSensor.id.WEATHER);

    const sunWidget = new SunWidget({
      timeSensor,
      weatherSensor,
    });

    const dateWidget = new DateWidget();

    const update = () => {
      const { isDay, ratio } = getCurrentTimePosition(
        timeSensor,
        weatherSensor,
      );

      sunWidget.update(isDay, ratio);

      if (!isDay) {
        dateWidget.setPosition(0);
      } else if (ratio <= 0.29) {
        dateWidget.setPosition(0);
      } else if (ratio <= 0.39) {
        dateWidget.setPosition(1);
      } else if (ratio <= 0.5) {
        dateWidget.setPosition(2);
      } else if (ratio <= 0.6) {
        dateWidget.setPosition(-2);
      } else if (ratio <= 0.7) {
        dateWidget.setPosition(-1);
      } else {
        dateWidget.setPosition(0);
      }
    };

    hmUI.createWidget(hmUI.widget.WIDGET_DELEGATE, {
      resume_call: () => {
        if (hmSetting.getScreenType() == hmSetting.screen_type.WATCHFACE) {
          update();
        }
      },
    });
  },

  buildStepsProgress() {
    const stepSensor = hmSensor.createSensor(hmSensor.id.STEP);

    const progressWidget = new ProgressWidget();

    const update = () => {
      const { current = 0, target = 10000 } = stepSensor;
      progressWidget.setLevel(current / target);
    };

    hmUI.createWidget(hmUI.widget.WIDGET_DELEGATE, {
      resume_call: () => {
        if (hmSetting.getScreenType() == hmSetting.screen_type.WATCHFACE) {
          stepSensor.addEventListener?.(hmSensor.event.CHANGE, update);
          update();
        }
      },
      pause_call: () => {
        stepSensor.removeEventListener?.(hmSensor.event.CHANGE, update);
      },
    });
  },

  buildStepsDigits() {
    new DigitsWidget({
      type: hmUI.data_type.STEP,
    });
  },
});
