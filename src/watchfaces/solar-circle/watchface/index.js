import { LUNAR_SIZE, SOLAR_SIZE, WEEKDAYS } from '../utils/constants';
import { getCurrentTimePosition } from '../utils/getCurrentTimePosition';
import { getSleepTime, getSleepTimeString } from '../utils/getSleepTime';
import { getTime } from '../utils/getTime';
import {
  BATTERY_ARC_PROPS,
  BATTERY_TEXT_PROPS,
  DATE_TEXT_PROPS,
  DISCONNECT_STATUS_PROPS,
  HOURS_TEXT_PROPS,
  LUNAR_IMAGE_PROPS,
  MINS_TEXT_PROPS,
  SLEEP_ARC_PROPS,
  SLEEP_TEXT_PROPS,
  SOLAR_IMAGE_PROPS,
  STEPS_ARC_PROPS,
  STEPS_TEXT_PROPS,
  TIME_POSTFIX_TEXT_PROPS,
  WEEKDAY_TEXT_PROPS,
} from './index.r.layout';

WatchFace({
  onInit() {
    console.log('index page.js on init invoke');
  },

  build() {
    console.log('index page.js on build invoke');

    this.setBackground();

    this.buildTime();
    this.buildDate();

    this.buildSteps();
    this.buildSleepTime();
    this.buildBattery();
    this.buildDisconnectStatus();
  },

  onDestroy() {
    console.log('index page.js on destroy invoke');
  },

  setBackground() {
    const solarWidget = hmUI.createWidget(hmUI.widget.IMG, SOLAR_IMAGE_PROPS);
    const lunarWidget = hmUI.createWidget(hmUI.widget.IMG, LUNAR_IMAGE_PROPS);

    const update = () => {
      const timeSensor = hmSensor.createSensor(hmSensor.id.TIME);
      const weatherSensor = hmSensor.createSensor(hmSensor.id.WEATHER);
      const { isDay, ratio } = getCurrentTimePosition(
        timeSensor,
        weatherSensor,
      );

      if (isDay) {
        const ballLength =
          px(480) - SOLAR_SIZE.paddingTop - SOLAR_SIZE.paddingBottom;
        const trailLength = px(480) + ballLength;
        const y = px(480) - ratio * trailLength - SOLAR_SIZE.paddingTop;

        solarWidget.setProperty(hmUI.prop.Y, y);
        lunarWidget.setProperty(hmUI.prop.Y, px(480));
      } else {
        const ballLength =
          px(480) - LUNAR_SIZE.paddingTop - LUNAR_SIZE.paddingBottom;
        const trailLength = px(480) + ballLength;
        const y = px(480) - ratio * trailLength - LUNAR_SIZE.paddingTop;

        lunarWidget.setProperty(hmUI.prop.Y, y);
        solarWidget.setProperty(hmUI.prop.Y, px(480));
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

  buildTime() {
    const hoursWidget = hmUI.createWidget(hmUI.widget.TEXT, HOURS_TEXT_PROPS);
    const minsWidget = hmUI.createWidget(hmUI.widget.TEXT, MINS_TEXT_PROPS);
    const postfixWidget = hmUI.createWidget(
      hmUI.widget.TEXT,
      TIME_POSTFIX_TEXT_PROPS,
    );

    let updateTimer = undefined;
    let prevValue = '';

    const update = () => {
      const timeSensor = hmSensor.createSensor(hmSensor.id.TIME);
      const is12HourFormat = hmSetting.getTimeFormat() === 0;

      const { hoursText, minsText, postfixText } = getTime(
        timeSensor,
        is12HourFormat,
      );

      if (prevValue === minsText) {
        return;
      }

      console.log('time rerendered');
      prevValue = minsText;

      hoursWidget.setProperty(hmUI.prop.TEXT, hoursText);
      minsWidget.setProperty(hmUI.prop.TEXT, minsText);
      postfixWidget.setProperty(hmUI.prop.TEXT, postfixText);
    };

    hmUI.createWidget(hmUI.widget.WIDGET_DELEGATE, {
      resume_call: () => {
        console.log('ui resume');

        if (hmSetting.getScreenType() == hmSetting.screen_type.WATCHFACE) {
          updateTimer = timer.createTimer(1000, 1000, update);
          update();
        } else if (hmSetting.getScreenType() == hmSetting.screen_type.AOD) {
          updateTimer = timer.createTimer(5000, 5000, update);
          update();
        }
      },
      pause_call: () => {
        console.log('ui pause');

        timer.stopTimer(updateTimer);
      },
    });
  },

  buildDate() {
    const weekdayWidget = hmUI.createWidget(
      hmUI.widget.TEXT,
      WEEKDAY_TEXT_PROPS,
    );
    const dateWidget = hmUI.createWidget(hmUI.widget.TEXT, DATE_TEXT_PROPS);

    let updateTimer = undefined;
    let prevValue = '';

    const update = () => {
      const { day, week } = hmSensor.createSensor(hmSensor.id.TIME);
      const weekdayText = WEEKDAYS[week - 1];
      const dateText = day.toString().padStart(2, '0');

      if (prevValue === dateText) {
        return;
      }

      console.log('date rerendered');
      prevValue = dateText;

      weekdayWidget.setProperty(hmUI.prop.TEXT, weekdayText);
      dateWidget.setProperty(hmUI.prop.TEXT, dateText);
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
    const arcWidget = hmUI.createWidget(
      hmUI.widget.ARC_PROGRESS,
      STEPS_ARC_PROPS,
    );
    const textWidget = hmUI.createWidget(hmUI.widget.TEXT, STEPS_TEXT_PROPS);

    const update = () => {
      const { current, target } = hmSensor.createSensor(hmSensor.id.STEP);
      const level = Math.min(100, (100 * current) / target);

      arcWidget.setProperty(hmUI.prop.LEVEL, level);
      textWidget.setProperty(hmUI.prop.TEXT, current.toString());
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
    const arcWidget = hmUI.createWidget(
      hmUI.widget.ARC_PROGRESS,
      SLEEP_ARC_PROPS,
    );
    const textWidget = hmUI.createWidget(hmUI.widget.TEXT, SLEEP_TEXT_PROPS);
    const sleepSensor = hmSensor.createSensor(hmSensor.id.SLEEP);

    const update = () => {
      const sleepTime = getSleepTime(sleepSensor);

      if (sleepTime) {
        const sleepTimeString = getSleepTimeString(sleepSensor);
        const level = Math.min(100, (100 * sleepTime) / (8 * 60));

        arcWidget.setProperty(hmUI.prop.LEVEL, level);
        textWidget.setProperty(hmUI.prop.TEXT, sleepTimeString);
      } else {
        arcWidget.setProperty(hmUI.prop.LEVEL, 0);
        textWidget.setProperty(hmUI.prop.TEXT, '');
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

  buildBattery() {
    const arcWidget = hmUI.createWidget(
      hmUI.widget.ARC_PROGRESS,
      BATTERY_ARC_PROPS,
    );
    const textWidget = hmUI.createWidget(hmUI.widget.TEXT, BATTERY_TEXT_PROPS);

    const update = () => {
      const { current } = hmSensor.createSensor(hmSensor.id.BATTERY);
      arcWidget.setProperty(hmUI.prop.LEVEL, current);
      textWidget.setProperty(hmUI.prop.TEXT, `${current}%`);
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

  buildDisconnectStatus() {
    hmUI.createWidget(hmUI.widget.IMG_STATUS, DISCONNECT_STATUS_PROPS);
  },
});
