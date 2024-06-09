import { BATTERY, DATE, SLEEP, STEPS } from '../utils/constants';

import {
  BACKGROUND_IMAGE_PROPS,
  BATTERY_POINTER_PROPS,
  BATTERY_TEXT_PROPS,
  DATE_BACKGROUND_PROPS,
  DATE_TEXT_PROPS,
  DISCONNECT_PROPS,
  GLYPHS_IMAGE_AOD_PROPS,
  GLYPHS_IMAGE_PROPS,
  SLEEP_POINTER_PROPS,
  SLEEP_TEXT_PROPS,
  STEPS_POINTER_PROPS,
  STEPS_TEXT_PROPS,
  TIME_COLON_AOD_PROPS,
  TIME_COLON_PROPS,
  TIME_HOURS_AOD_PROPS,
  TIME_HOURS_PROPS,
  TIME_MINUTES_AOD_PROPS,
  TIME_MINUTES_PROPS,
} from './index.r.layout';

import { getSleepTime, getSleepTimeString } from '../utils/getSleepTime';

WatchFace({
  onInit() {
    console.log('index page.js on init invoke');
  },

  build() {
    console.log('index page.js on build invoke');

    this.buildBackground();
    this.buildTime();
    this.buildDate();
    this.buildDisconnectStatus();

    this.buildBattery();
    this.buildSleep();
    this.buildSteps();
  },

  onDestroy() {
    console.log('index page.js on destroy invoke');
  },

  buildBackground() {
    hmUI.createWidget(hmUI.widget.IMG, BACKGROUND_IMAGE_PROPS);
    hmUI.createWidget(hmUI.widget.IMG, GLYPHS_IMAGE_PROPS);
    hmUI.createWidget(hmUI.widget.IMG, GLYPHS_IMAGE_AOD_PROPS);
  },

  buildTime() {
    hmUI.createWidget(hmUI.widget.TEXT, TIME_COLON_PROPS);
    hmUI.createWidget(hmUI.widget.TEXT, TIME_COLON_AOD_PROPS);

    const hoursWidget = hmUI.createWidget(hmUI.widget.TEXT, TIME_HOURS_PROPS);
    const hoursAodWidget = hmUI.createWidget(
      hmUI.widget.TEXT,
      TIME_HOURS_AOD_PROPS,
    );

    const minsWidget = hmUI.createWidget(hmUI.widget.TEXT, TIME_MINUTES_PROPS);
    const minsAodWidget = hmUI.createWidget(
      hmUI.widget.TEXT,
      TIME_MINUTES_AOD_PROPS,
    );

    let prevMinute = null;

    const update = () => {
      const { hour, minute } = hmSensor.createSensor(hmSensor.id.TIME);

      if (prevMinute === minute) {
        return;
      }

      console.log('time rerendered');

      prevMinute = minute;
      const hoursText = hour.toString().padStart(2, '0');
      const minsText = minute.toString().padStart(2, '0');

      hoursWidget.setProperty(hmUI.prop.TEXT, hoursText);
      hoursAodWidget.setProperty(hmUI.prop.TEXT, hoursText);

      minsWidget.setProperty(hmUI.prop.TEXT, minsText);
      minsAodWidget.setProperty(hmUI.prop.TEXT, minsText);
    };

    hmUI.createWidget(hmUI.widget.WIDGET_DELEGATE, {
      resume_call: () => {
        console.log('ui resume');

        if (hmSetting.getScreenType() == hmSetting.screen_type.WATCHFACE) {
          this.updateTimeTimer = timer.createTimer(1000, 1000, update);
          update();
        } else if (hmSetting.getScreenType() == hmSetting.screen_type.AOD) {
          this.updateDateTimer = timer.createTimer(2000, 2000, update);
          update();
        }
      },
      pause_call: () => {
        console.log('ui pause');

        timer.stopTimer(this.updateTimeTimer);
      },
    });
  },

  buildDate() {
    hmUI.createWidget(hmUI.widget.IMG, DATE_BACKGROUND_PROPS);

    const dateWidget = hmUI.createWidget(hmUI.widget.TEXT, DATE_TEXT_PROPS);
    let prevDay = null;

    const update = () => {
      const { day, week } = hmSensor.createSensor(hmSensor.id.TIME);

      if (prevDay === day) {
        return;
      }

      console.log('date rerendered');
      prevDay = day;

      dateWidget.setProperty(
        hmUI.prop.TEXT,
        `${DATE.weekDays[week - 1]} ${day}`,
      );
    };

    hmUI.createWidget(hmUI.widget.WIDGET_DELEGATE, {
      resume_call: () => {
        console.log('ui resume');

        if (hmSetting.getScreenType() == hmSetting.screen_type.WATCHFACE) {
          this.updateDateTimer = timer.createTimer(1000, 1000, update);
          update();
        }
      },
      pause_call: () => {
        console.log('ui pause');

        timer.stopTimer(this.updateDateTimer);
      },
    });
  },

  buildDisconnectStatus() {
    hmUI.createWidget(hmUI.widget.IMG_STATUS, DISCONNECT_PROPS);
  },

  buildBattery() {
    const textWidget = hmUI.createWidget(hmUI.widget.TEXT, null);
    const pointerWidget = hmUI.createWidget(hmUI.widget.IMG, null);
    const { angleEnd, angleStart } = BATTERY.poiner;

    hmUI.createWidget(hmUI.widget.WIDGET_DELEGATE, {
      resume_call: () => {
        console.log('ui resume');

        if (hmSetting.getScreenType() == hmSetting.screen_type.WATCHFACE) {
          const { current } = hmSensor.createSensor(hmSensor.id.BATTERY);

          textWidget.setProperty(hmUI.widget.MORE, {
            ...BATTERY_TEXT_PROPS,
            text: `${current}%`,
          });

          pointerWidget.setProperty(hmUI.widget.MORE, {
            ...BATTERY_POINTER_PROPS,
            angle: (current / 100) * (angleEnd - angleStart) + angleStart,
          });
        }
      },
    });
  },

  buildSleep() {
    const textWidget = hmUI.createWidget(hmUI.widget.TEXT, null);
    const sleepSensor = hmSensor.createSensor(hmSensor.id.SLEEP);
    const pointerWidget = hmUI.createWidget(hmUI.widget.IMG, null);
    const { angleEnd, angleStart } = SLEEP.poiner;

    hmUI.createWidget(hmUI.widget.WIDGET_DELEGATE, {
      resume_call: () => {
        console.log('ui resume');

        if (hmSetting.getScreenType() == hmSetting.screen_type.WATCHFACE) {
          const sleepTimeString = getSleepTimeString(sleepSensor);
          const sleepTime = getSleepTime(sleepSensor);
          const sleepTimeRatio = Math.min((sleepTime || 0) / 60 / 8, 1);

          if (sleepTimeString) {
            textWidget.setProperty(hmUI.widget.MORE, {
              ...SLEEP_TEXT_PROPS,
              text: sleepTimeString,
            });

            pointerWidget.setProperty(hmUI.widget.MORE, {
              ...SLEEP_POINTER_PROPS,
              angle: sleepTimeRatio * (angleEnd - angleStart) + angleStart,
            });
          } else {
            textWidget.setProperty(hmUI.widget.MORE, {
              ...SLEEP_TEXT_PROPS,
              text: '',
            });

            pointerWidget.setProperty(hmUI.widget.MORE, {});
          }
        }
      },
    });
  },

  buildSteps() {
    const textWidget = hmUI.createWidget(hmUI.widget.TEXT, null);
    const pointerWidget = hmUI.createWidget(hmUI.widget.IMG, null);
    const { yStart, yEnd } = STEPS.poiner;

    hmUI.createWidget(hmUI.widget.WIDGET_DELEGATE, {
      resume_call: () => {
        console.log('ui resume');

        if (hmSetting.getScreenType() == hmSetting.screen_type.WATCHFACE) {
          const { current, target } = hmSensor.createSensor(hmSensor.id.STEP);
          const ratio = Math.min(current / target, 1);

          textWidget.setProperty(hmUI.widget.MORE, {
            ...STEPS_TEXT_PROPS,
            text: current,
          });

          pointerWidget.setProperty(hmUI.widget.MORE, {
            ...STEPS_POINTER_PROPS,
            y: yStart - ratio * (yStart - yEnd),
          });
        }
      },
    });
  },
});
