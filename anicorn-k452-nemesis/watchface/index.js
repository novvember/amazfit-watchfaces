import { WEEKDAYS } from '../utils/constants';
import { createCircleTextWidget } from '../utils/createCircleTextWidget';
import { getSleepTimeString } from '../utils/getSleepTime';
import {
  BATTERY_CIRCLE_TEXT_PROPS,
  BEZEL_BACKGROUND_PROPS,
  BEZEL_CIRCLE_TEXT_PROPS,
  DATE_CIRCLE_TEXT_PROPS,
  HOUR_POINTER_PROPS,
  MINUTE_BACKGROUND_PROPS,
  MINUTE_POINTER_PROPS,
  SECOND_BACKGROUND_PROPS,
  SECOND_POINTER_PROPS,
  SLEEP_CIRCLE_TEXT_PROPS,
  STEPS_CIRCLE_TEXT_PROPS,
} from './index.r.layout';

WatchFace({
  onInit() {
    console.log('index page.js on init invoke');
  },

  build() {
    console.log('index page.js on build invoke');

    this.buildHours();
    this.buildMinutes();
    this.buildSeconds();

    this.buildBezel();
    this.buildDate();
    this.buildSteps();
    this.buildBattery();
    this.buildSleepTime();
  },

  onDestroy() {
    console.log('index page.js on destroy invoke');
  },

  buildHours() {
    hmUI.createWidget(hmUI.widget.TIME_POINTER, HOUR_POINTER_PROPS);
  },

  buildMinutes() {
    hmUI.createWidget(hmUI.widget.IMG, MINUTE_BACKGROUND_PROPS);
    hmUI.createWidget(hmUI.widget.TIME_POINTER, MINUTE_POINTER_PROPS);
  },

  buildSeconds() {
    hmUI.createWidget(hmUI.widget.IMG, SECOND_BACKGROUND_PROPS);
    hmUI.createWidget(hmUI.widget.TIME_POINTER, SECOND_POINTER_PROPS);
  },

  buildBezel() {
    createCircleTextWidget(BEZEL_CIRCLE_TEXT_PROPS);
    hmUI.createWidget(hmUI.widget.IMG, BEZEL_BACKGROUND_PROPS);
  },

  buildDate() {
    const { updateText } = createCircleTextWidget(DATE_CIRCLE_TEXT_PROPS);

    let updateTimer = undefined;
    let prevValue = '';

    const update = () => {
      const { day, week } = hmSensor.createSensor(hmSensor.id.TIME);
      const dateText = day.toString().padStart(2, '0');
      const weekdayText = WEEKDAYS[week - 1];
      const text = `${dateText} ${weekdayText}`;

      if (prevValue === text) {
        return;
      }

      console.log('date rerendered');
      prevValue = text;

      updateText(text);
    };

    hmUI.createWidget(hmUI.widget.WIDGET_DELEGATE, {
      resume_call: () => {
        console.log('ui resume');

        if (hmSetting.getScreenType() == hmSetting.screen_type.WATCHFACE) {
          updateTimer = timer.createTimer(5000, 5000, update);
          update();
        } else if (hmSetting.getScreenType() == hmSetting.screen_type.AOD) {
          updateTimer = timer.createTimer(10000, 10000, update);
          update();
        }
      },
      pause_call: () => {
        console.log('ui pause');

        timer.stopTimer(updateTimer);
      },
    });
  },

  buildSteps() {
    const { updateText } = createCircleTextWidget(STEPS_CIRCLE_TEXT_PROPS);

    const update = () => {
      const { current } = hmSensor.createSensor(hmSensor.id.STEP);
      updateText(`STEPS ${current || 0}`);
    };

    hmUI.createWidget(hmUI.widget.WIDGET_DELEGATE, {
      resume_call: () => {
        console.log('ui resume');

        if (hmSetting.getScreenType() == hmSetting.screen_type.WATCHFACE) {
          update();
        }
      },
    });
  },

  buildBattery() {
    const { updateText } = createCircleTextWidget(BATTERY_CIRCLE_TEXT_PROPS);

    const update = () => {
      const { current } = hmSensor.createSensor(hmSensor.id.BATTERY);
      updateText(`BATTERY ${current}%`);
    };

    hmUI.createWidget(hmUI.widget.WIDGET_DELEGATE, {
      resume_call: () => {
        console.log('ui resume');

        if (hmSetting.getScreenType() == hmSetting.screen_type.WATCHFACE) {
          update();
        }
      },
    });
  },

  buildSleepTime() {
    const { updateText } = createCircleTextWidget(SLEEP_CIRCLE_TEXT_PROPS);
    const sleepSensor = hmSensor.createSensor(hmSensor.id.SLEEP);

    const update = () => {
      const sleepTimeString = getSleepTimeString(sleepSensor);

      if (sleepTimeString) {
        updateText(`SLEEP ${sleepTimeString}`);
      } else {
        updateText('');
      }
    };

    hmUI.createWidget(hmUI.widget.WIDGET_DELEGATE, {
      resume_call: () => {
        console.log('ui resume');

        if (hmSetting.getScreenType() == hmSetting.screen_type.WATCHFACE) {
          update();
        }
      },
    });
  },
});
