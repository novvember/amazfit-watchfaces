import { getSleepTimeString } from '../utils/getSleepTime';
import {
  BATTERY,
  DATE_TEXT,
  PULSE,
  SLEEP,
  STEPS,
  SUN,
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
  PULSE_CURRENT_POINTER_PROPS,
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
  PULSE_PREV_POINTER_PROPS,
  SLEEP_NO_DATA_IMAGE_PROPS,
} from './index.r.layout';
import { decline } from '../utils/decline';
import { formatNumber } from '../utils/formatNumber';
import { getIndicatorAngle } from '../utils/getIndicatorAngle';
import { getSleepArcData } from '../utils/getSleepArcData';
import { getClosestSunriseSunsetTime } from '../utils/getClosestSunriseSunsetTime';

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
    const noDataWidget = hmUI.createWidget(hmUI.widget.IMG, SLEEP_NO_DATA_IMAGE_PROPS);
    const arcWidget = hmUI.createWidget(hmUI.widget.ARC_PROGRESS, null);
    const textWidget = hmUI.createWidget(hmUI.widget.TEXT, SLEEP_TEXT_PROPS);
    const sleepSensor = hmSensor.createSensor(hmSensor.id.SLEEP);
    const timeSensor = hmSensor.createSensor(hmSensor.id.TIME);
    const weatherSensor = hmSensor.createSensor(hmSensor.id.WEATHER);

    hmUI.createWidget(hmUI.widget.WIDGET_DELEGATE, {
      resume_call: () => {
        console.log('ui resume');

        const showSleepTime = sleepTime => {
          const sleepString = `${sleepTime}\n${SLEEP.postfix}`;
          const [angleStart, angleEnd] = getSleepArcData(sleepSensor);
  
          noDataWidget.setProperty(hmUI.prop.ALPHA, 0);
          textWidget.setProperty(hmUI.prop.TEXT, sleepString);
          arcWidget.setProperty(hmUI.prop.MORE, {
            ...SLEEP_ARC_PROPS,
            start_angle: angleStart,
            end_angle: angleEnd,
          });
        };

        const showSunriseSunset = () => {
          let sunString = '';
          const sunObj = getClosestSunriseSunsetTime(timeSensor, weatherSensor);
  
          if (sunObj) {
            const { type, hour, minute } = sunObj;
            const is12HourFormat = hmSetting.getTimeFormat() === 0;
            const sunTime = getTimeString(hour, minute, is12HourFormat);
            sunString = `${sunTime}\n${SUN[type]}`;
          }
  
          noDataWidget.setProperty(hmUI.prop.ALPHA, 255);
          textWidget.setProperty(hmUI.prop.TEXT, sunString);
          arcWidget.setProperty(hmUI.prop.MORE, {
            ...SLEEP_ARC_PROPS,
            start_angle: 0,
            end_angle: 0,
          });
        };

        if (hmSetting.getScreenType() == hmSetting.screen_type.WATCHFACE) {
          const sleepTime = getSleepTimeString(sleepSensor);

          if (sleepTime) {
            showSleepTime(sleepTime);
          } else {
            showSunriseSunset();
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
      const { hour, minute } = timeSensor;
      const timeString = getTimeString(hour, minute, is12HourFormat);

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
    const currentPointerWidget = hmUI.createWidget(
      hmUI.widget.IMG,
      PULSE_CURRENT_POINTER_PROPS,
    );
    const prevPointerWidgets = [];
    const { angleStart, angleEnd, pointer: { minValue, maxValue } } = PULSE;

    const getAngle = pulseValue => getIndicatorAngle(pulseValue, minValue, maxValue, angleStart, angleEnd);

    const update = () => {
      const { last, today } = hmSensor.createSensor(hmSensor.id.HEART);

      textWidget.setProperty(hmUI.prop.TEXT, last.toString());
      currentPointerWidget.setProperty(hmUI.prop.ANGLE, getAngle(last));

      if (today.length < prevPointerWidgets.length) {
        prevPointerWidgets.forEach(widget => hmUI.deleteWidget(widget));
      }

      today.forEach((value, index) => {
        if (prevPointerWidgets[index]) {
          return;
        }

        const widget = hmUI.createWidget(
          hmUI.widget.IMG,
          {
            ...PULSE_PREV_POINTER_PROPS,
            angle: getAngle(value),
          },
        );

        prevPointerWidgets.push(widget);
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
