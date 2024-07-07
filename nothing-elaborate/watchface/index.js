import { getSleepTimeString, getSleepTimeTotal } from '../utils/getSleepTime';
import {
  BATTERY,
  COLORS,
  DATE_TEXT,
  PULSE,
  SLEEP,
  STEPS,
} from '../utils/constants';
import { getTimeString } from '../utils/getTimeString';
import { isNight } from '../utils/isNight';
import { WEATHER_ICONS, updateWeatherIcons } from '../utils/weatherIcons';
import {
  BATTERY_PROGRESS_PROPS,
  BATTERY_TEXT_PROPS,
  DATE_TEXT_PROPS,
  DATE_WEEK_PROPS,
  DISCONNECT_PROPS,
  PULSE_ARC_PROPS,
  PULSE_ICON_PROPS,
  PULSE_POINTER_PROPS,
  PULSE_TEXT_PROPS,
  SECONDS_BACKGROUND_PROPS,
  SECONDS_POINTER_PROPS,
  SLEEP_ARC_PROPS,
  SLEEP_TEXT_PROPS,
  STEPS_ARC_PROPS,
  STEPS_BACKGROUND_PROPS,
  STEPS_TEXT_PROPS,
  TIME_BACKGROUND_PROPS,
  TIME_TEXT_PROPS,
  WEATHER_BACKGROUND_PROPS,
  WEATHER_ICON_PROPS,
  WEATHER_TEXT_PROPS,
} from './index.r.layout';
import { decline } from '../utils/decline';
import { getAngleFromTime } from '../utils/getAngleFromTime';
import { formatNumber } from '../utils/formatNumber';

WatchFace({
  onInit() {
    console.log('index page.js on init invoke');
  },

  build() {
    console.log('index page.js on build invoke');

    this.buildSleep();
    this.buildDate();
    this.buildSeconds();

    this.buildTime();
    this.buildWeather();

    this.buildSteps();
    this.buildPulse();
    this.buildBattery();

    this.buildDisconnectStatus();
  },

  onDestroy() {
    console.log('index page.js on destroy invoke');
  },

  buildSleep() {
    const arcWidget = hmUI.createWidget(hmUI.widget.ARC_PROGRESS, null);
    const textWidget = hmUI.createWidget(hmUI.widget.TEXT, SLEEP_TEXT_PROPS);
    const sleepSensor = hmSensor.createSensor(hmSensor.id.SLEEP);

    hmUI.createWidget(hmUI.widget.WIDGET_DELEGATE, {
      resume_call: () => {
        console.log('ui resume');

        if (hmSetting.getScreenType() == hmSetting.screen_type.WATCHFACE) {
          const sleepTime = getSleepTimeString(sleepSensor);
          const sleepString = `${sleepTime}\n${SLEEP.postfix}`;
          const totalSleepTimeHours = getSleepTimeTotal(sleepSensor) / 60;
          let { startTime, endTime } = sleepSensor.getBasicInfo();

          let angleStart = getAngleFromTime(startTime);
          let angleEnd = getAngleFromTime(endTime);

          if (angleEnd < angleStart) {
            angleEnd += 360;
          }

          if (totalSleepTimeHours >= 12) {
            angleEnd += 360;
          }

          if (sleepTime) {
            textWidget.setProperty(hmUI.prop.TEXT, sleepString);
            arcWidget.setProperty(hmUI.prop.MORE, {
              ...SLEEP_ARC_PROPS,
              start_angle: angleStart,
              end_angle: angleEnd,
            });
          } else {
            textWidget.setProperty(hmUI.prop.TEXT, '');
            arcWidget.setProperty(hmUI.prop.MORE, {
              ...SLEEP_ARC_PROPS,
              color: COLORS.bgTertiary,
            });
          }
        }
      },
    });
  },

  buildDate() {
    hmUI.createWidget(hmUI.widget.IMG_WEEK, DATE_WEEK_PROPS);
    const textWidget = hmUI.createWidget(hmUI.widget.TEXT, DATE_TEXT_PROPS);

    let prevDay = '';
    let updateTimer = undefined;

    const update = () => {
      const { month, day } = hmSensor.createSensor(hmSensor.id.TIME);

      if (prevDay === day) {
        return;
      }

      console.log('date rerendered');
      prevDay = day;

      const monthString = DATE_TEXT.months[month - 1];
      textWidget.setProperty(hmUI.prop.TEXT, `${monthString}\n${day}`);
    };

    hmUI.createWidget(hmUI.widget.WIDGET_DELEGATE, {
      resume_call: () => {
        console.log('ui resume');

        if (hmSetting.getScreenType() == hmSetting.screen_type.WATCHFACE) {
          updateTimer = timer.createTimer(1000, 1000, update);
          update();
        }
      },
      pause_call: () => {
        console.log('ui pause');

        timer.stopTimer(updateTimer);
      },
    });
  },

  buildSeconds() {
    hmUI.createWidget(hmUI.widget.IMG, SECONDS_BACKGROUND_PROPS);
    hmUI.createWidget(hmUI.widget.TIME_POINTER, SECONDS_POINTER_PROPS);
  },

  buildTime() {
    hmUI.createWidget(hmUI.widget.FILL_RECT, TIME_BACKGROUND_PROPS);
    const textWidget = hmUI.createWidget(hmUI.widget.TEXT, TIME_TEXT_PROPS);
    const is12HourFormat = hmSetting.getTimeFormat() === 0;

    let prevTime = '';
    let updateTimer = undefined;

    const update = () => {
      const timeSensor = hmSensor.createSensor(hmSensor.id.TIME);
      const timeString = getTimeString(timeSensor, is12HourFormat);

      if (prevTime === timeString) {
        return;
      }

      console.log('time rerendered');
      prevTime = timeString;

      textWidget.setProperty(hmUI.prop.TEXT, timeString);
    };

    hmUI.createWidget(hmUI.widget.WIDGET_DELEGATE, {
      resume_call: () => {
        console.log('ui resume');

        if (hmSetting.getScreenType() == hmSetting.screen_type.WATCHFACE) {
          updateTimer = timer.createTimer(1000, 1000, update);
          update();
        }
      },
      pause_call: () => {
        console.log('ui pause');

        timer.stopTimer(updateTimer);
      },
    });
  },

  buildWeather() {
    hmUI.createWidget(hmUI.widget.FILL_RECT, WEATHER_BACKGROUND_PROPS);
    hmUI.createWidget(hmUI.widget.TEXT_FONT, WEATHER_TEXT_PROPS);

    const iconWidget = hmUI.createWidget(hmUI.widget.IMG, null);

    const update = () => {
      const weatherSensor = hmSensor.createSensor(hmSensor.id.WEATHER);
      const timeSensor = hmSensor.createSensor(hmSensor.id.TIME);
      const iconIndex = weatherSensor.curAirIconIndex;

      updateWeatherIcons(isNight(timeSensor));

      const icon =
        iconIndex && iconIndex !== 'undefined'
          ? WEATHER_ICONS[iconIndex]
          : WEATHER_ICONS[25];

      iconWidget.setProperty(hmUI.prop.MORE, {
        ...WEATHER_ICON_PROPS,
        src: icon,
      });
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

  buildSteps() {
    hmUI.createWidget(hmUI.widget.CIRCLE, STEPS_BACKGROUND_PROPS);
    const arcWidget = hmUI.createWidget(
      hmUI.widget.ARC_PROGRESS,
      STEPS_ARC_PROPS,
    );
    const textWidget = hmUI.createWidget(hmUI.widget.TEXT, STEPS_TEXT_PROPS);

    let updateTimer = undefined;

    const update = () => {
      const { current, target } = hmSensor.createSensor(hmSensor.id.STEP);
      const angleEnd = (360 * current) / target;

      textWidget.setProperty(
        hmUI.prop.TEXT,
        `${formatNumber(current)}\n${decline(current, STEPS.postfix)}`,
      );

      arcWidget.setProperty(hmUI.prop.MORE, {
        ...STEPS_ARC_PROPS,
        end_angle: angleEnd,
      });
    };

    hmUI.createWidget(hmUI.widget.WIDGET_DELEGATE, {
      resume_call: () => {
        console.log('ui resume');

        if (hmSetting.getScreenType() == hmSetting.screen_type.WATCHFACE) {
          updateTimer = timer.createTimer(1000, 1000, update);
          update();
        }
      },
      pause_call: () => {
        console.log('ui pause');

        timer.stopTimer(updateTimer);
      },
    });
  },

  buildPulse() {
    hmUI.createWidget(hmUI.widget.ARC_PROGRESS, PULSE_ARC_PROPS);
    hmUI.createWidget(hmUI.widget.IMG, PULSE_ICON_PROPS);
    const textWidget = hmUI.createWidget(hmUI.widget.TEXT, PULSE_TEXT_PROPS);
    const pointerWidget = hmUI.createWidget(
      hmUI.widget.IMG,
      PULSE_POINTER_PROPS,
    );

    const update = () => {
      const { last } = hmSensor.createSensor(hmSensor.id.HEART);
      const {
        angleStart,
        angleEnd,
        pointer: { minValue, maxValue },
      } = PULSE;

      let angle =
        ((last - minValue) / (maxValue - minValue)) * (angleEnd - angleStart) +
        angleStart;

      angle = Math.min(angle, angleEnd);
      angle = Math.max(angle, angleStart);

      textWidget.setProperty(hmUI.prop.TEXT, last.toString());
      pointerWidget.setProperty(hmUI.prop.ANGLE, angle);
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
    const textWidget = hmUI.createWidget(hmUI.widget.TEXT, BATTERY_TEXT_PROPS);
    const progressWidget = hmUI.createWidget(
      hmUI.widget.IMG,
      BATTERY_PROGRESS_PROPS,
    );

    const update = () => {
      const { current } = hmSensor.createSensor(hmSensor.id.BATTERY);
      const level = Math.round(current * 24 / 100);
      const imageSrc = `battery/${level}.png`;

      textWidget.setProperty(hmUI.prop.TEXT, `${current}%\n${BATTERY.postfix}`);
      progressWidget.setProperty(hmUI.prop.SRC, imageSrc);
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
    hmUI.createWidget(hmUI.widget.IMG_STATUS, DISCONNECT_PROPS);
  },
});
