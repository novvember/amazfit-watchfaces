import { CircleTextWidget } from '../utils/CircleTextWidget/CircleTextWidget';
import {
  HEART_TEXT,
  SLEEP_TEXT,
  STEPS_POSTFIX,
  WEEKDAYS,
} from '../utils/constants';
import { decline } from '../utils/decline';
import { getSleepTimeString } from '../utils/getSleepTime';
import {
  TIME_BACKGROUND_IMAGE_PROPS,
  TIME_HOUR_BACKGROUND_IMAGE_PROPS,
  TIME_HOUR_POINTER_PROPS,
  TIME_MINUTE_POINTER_PROPS,
  TIME_SECOND_BACKGROUND_IMAGE_PROPS,
  TIME_SECOND_POINTER_PROPS,
  WEATHER_TEXT_IMAGE_PROPS,
} from './index.r.layout';

WatchFace({
  onInit() {
    console.log('index page.js on init invoke');
  },

  build() {
    console.log('index page.js on build invoke');

    this.buildTime();
    this.buildDate();
    this.buildHeart();
    this.buildSleep();
    this.buildBattery();
    this.buildSteps();
    this.buildWeather();
  },

  onDestroy() {
    console.log('index page.js on destroy invoke');
  },

  buildTime() {
    hmUI.createWidget(hmUI.widget.IMG, TIME_BACKGROUND_IMAGE_PROPS);
    hmUI.createWidget(hmUI.widget.IMG, TIME_HOUR_BACKGROUND_IMAGE_PROPS);
    hmUI.createWidget(hmUI.widget.TIME_POINTER, TIME_HOUR_POINTER_PROPS);

    hmUI.createWidget(hmUI.widget.TIME_POINTER, TIME_MINUTE_POINTER_PROPS);

    hmUI.createWidget(hmUI.widget.IMG, TIME_SECOND_BACKGROUND_IMAGE_PROPS);
    hmUI.createWidget(hmUI.widget.TIME_POINTER, TIME_SECOND_POINTER_PROPS);
  },

  buildDate() {
    const textWidget = new CircleTextWidget({
      text: '00 XXX',
      maxLength: 6,
      angleStart: 12,
      radius: px(204),
      gap: px(-3),
      isTextReversed: false,
    });
    const timeSensor = hmSensor.createSensor(hmSensor.id.TIME);

    const update = () => {
      const { day, week } = timeSensor;
      const text = `${day} ${WEEKDAYS[week - 1]}`;
      textWidget.updateText(text);
    };

    hmUI.createWidget(hmUI.widget.WIDGET_DELEGATE, {
      resume_call: () => {
        console.log('ui resume (widget delegate)');

        if (hmSetting.getScreenType() == hmSetting.screen_type.WATCHFACE) {
          timeSensor.addEventListener(timeSensor.event.MINUTEEND, update);
          update();
        }
      },
      pause_call: () => {
        console.log('ui pause (widget delegate)');

        timeSensor.removeEventListener(timeSensor.event.MINUTEEND, update);
      },
    });
  },

  buildHeart() {
    const textWidget = new CircleTextWidget({
      text: '000 BPM',
      maxLength: 7,
      angleStart: 62,
      radius: px(204),
      gap: px(-3),
      isTextReversed: false,
    });
    const heartSensor = hmSensor.createSensor(hmSensor.id.HEART);

    const update = () => {
      const { last } = heartSensor;
      const text = HEART_TEXT.replace('%s', last || '--');
      textWidget.updateText(text);
    };

    hmUI.createWidget(hmUI.widget.WIDGET_DELEGATE, {
      resume_call: () => {
        console.log('ui resume');

        if (hmSetting.getScreenType() == hmSetting.screen_type.WATCHFACE) {
          heartSensor.addEventListener(hmSensor.event.LAST, update);
          update();
        }
      },
      pause_call: () => {
        heartSensor.removeEventListener(hmSensor.event.LAST, update);
      },
    });
  },

  buildSleep() {
    const textWidget = new CircleTextWidget({
      text: '00:00 SLEEP',
      maxLength: 11,
      angleStart: 189,
      radius: px(204),
      gap: px(-3),
      isTextReversed: true,
    });
    const sleepSensor = hmSensor.createSensor(hmSensor.id.SLEEP);

    const update = () => {
      sleepSensor.updateInfo();
      const sleepTime = getSleepTimeString(sleepSensor);
      const text = SLEEP_TEXT.replace('%s', sleepTime || '---');
      textWidget.updateText(text);
    };

    hmUI.createWidget(hmUI.widget.WIDGET_DELEGATE, {
      resume_call: () => {
        console.log('ui resume (widget delegate)');

        if (hmSetting.getScreenType() == hmSetting.screen_type.WATCHFACE) {
          update();
        }
      },
    });
  },

  buildBattery() {
    const textWidget = new CircleTextWidget({
      text: '000%',
      maxLength: 4,
      angleStart: 227,
      radius: px(204),
      gap: px(-3),
      isTextReversed: true,
    });
    const batterySensor = hmSensor.createSensor(hmSensor.id.BATTERY);

    const update = () => {
      const { current } = batterySensor;
      const text = `${current}%`;
      textWidget.updateText(text);
    };

    hmUI.createWidget(hmUI.widget.WIDGET_DELEGATE, {
      resume_call: () => {
        console.log('ui resume');

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

  buildSteps() {
    const textWidget = new CircleTextWidget({
      text: '00000 STEPS',
      maxLength: 11,
      angleStart: 245,
      radius: px(204),
      gap: px(-3),
      isTextReversed: false,
    });
    const stepSensor = hmSensor.createSensor(hmSensor.id.STEP);

    const update = () => {
      const { current } = stepSensor;
      const text = `${current} ${decline(current, STEPS_POSTFIX)}`;
      textWidget.updateText(text);
    };

    hmUI.createWidget(hmUI.widget.WIDGET_DELEGATE, {
      resume_call: () => {
        console.log('ui resume');

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

  buildWeather() {
    hmUI.createWidget(hmUI.widget.TEXT_IMG, WEATHER_TEXT_IMAGE_PROPS);
  },
});
