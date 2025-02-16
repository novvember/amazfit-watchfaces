import { getSleepTimeString, getWakeStages } from '../utils/getSleepTime';
import {
  BATTERY_TEXT,
  hasCustomFontSupport,
  MONTH_TEXTS,
  PULSE,
  SLEEP_TEXT,
  STEPS_POSTFIX,
  SUN,
} from '../utils/constants';
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
  SLEEP_WAKE_STAGE_ARC_PROPS,
  WEATHER_NO_ICON_TEXT_PROPS,
  PULSE_PREV_POINTER_GROUP_PROPS,
  BACKGROUND_AOD_IMAGE_PROPS,
  TIME_AOD_TEXT_PROPS,
} from './index.r.layout';
import { decline } from '../utils/decline';
import { formatNumber } from '../utils/formatNumber';
import { getSleepArcData } from '../utils/getSleepArcData';
import { getClosestSunriseSunsetTime } from '../utils/getClosestSunriseSunsetTime';
import { getAngleFromTime } from '../utils/getAngleFromTime';
import { formatTime } from '../utils/formatTime';
import { getAnglePosition } from '../utils/getAnglePosition';

WatchFace({
  onInit() {
    console.log('index page.js on init invoke');
  },

  build() {
    console.log('index page.js on build invoke');

    this.buildBackground();

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

  buildBackground() {
    hmUI.createWidget(hmUI.widget.IMG, BACKGROUND_AOD_IMAGE_PROPS);
  },

  buildSleep() {
    const sunImageWidget = hmUI.createWidget(
      hmUI.widget.IMG,
      SLEEP_NO_DATA_IMAGE_PROPS,
    );

    const sleepArcWidget = hmUI.createWidget(hmUI.widget.ARC_PROGRESS, null);
    let sleepWakeArcWidgets = [];
    let prevSleepTime = '';

    const textWidget = hmUI.createWidget(hmUI.widget.TEXT, SLEEP_TEXT_PROPS);

    const sleepSensor = hmSensor.createSensor(hmSensor.id.SLEEP);
    const timeSensor = hmSensor.createSensor(hmSensor.id.TIME);
    const weatherSensor = hmSensor.createSensor(hmSensor.id.WEATHER);

    const hideSunInfo = () => {
      sunImageWidget.setProperty(hmUI.prop.ALPHA, 0);
    };

    const hideSleepInfo = () => {
      sleepArcWidget.setProperty(hmUI.prop.MORE, {
        ...SLEEP_ARC_PROPS,
        start_angle: 0,
        end_angle: 0,
      });

      sleepWakeArcWidgets.forEach((widget) => hmUI.deleteWidget(widget));
      sleepWakeArcWidgets = [];

      prevSleepTime = '';
    };

    const showSleepTime = (sleepTime) => {
      const sleepString = SLEEP_TEXT.replace('%s', sleepTime);
      textWidget.setProperty(hmUI.prop.TEXT, sleepString);

      const [angleStart, angleEnd] = getSleepArcData(sleepSensor);

      sleepArcWidget.setProperty(hmUI.prop.MORE, {
        ...SLEEP_ARC_PROPS,
        start_angle: angleStart,
        end_angle: angleEnd,
      });

      if (prevSleepTime === sleepTime) {
        return;
      }

      prevSleepTime = sleepTime;

      getWakeStages(sleepSensor).forEach((stage) => {
        const MIN_ARC_LENGTH = 10;
        let startAngle = getAngleFromTime(stage.start);
        let endAngle = getAngleFromTime(stage.stop);

        if (Math.abs(endAngle - startAngle) <= MIN_ARC_LENGTH) {
          const center = startAngle + (endAngle - startAngle) / 2;
          startAngle = center - MIN_ARC_LENGTH / 2;
          endAngle = center + MIN_ARC_LENGTH / 2;
        }

        sleepWakeArcWidgets.push(
          hmUI.createWidget(hmUI.widget.ARC_PROGRESS, {
            ...SLEEP_WAKE_STAGE_ARC_PROPS,
            start_angle: startAngle,
            end_angle: endAngle,
          }),
        );
      });
    };

    const showSunriseSunset = () => {
      let sunString = '';
      const sunObj = getClosestSunriseSunsetTime(timeSensor, weatherSensor);

      if (sunObj) {
        const { type, hour, minute } = sunObj;
        const is12HourFormat = hmSetting.getTimeFormat() === 0;
        const sunTime = formatTime(hour, minute, is12HourFormat, true, true);
        sunString = `${sunTime}\n${SUN[type]}`;
      }

      sunImageWidget.setProperty(hmUI.prop.ALPHA, 255);
      textWidget.setProperty(hmUI.prop.TEXT, sunString);
    };

    const update = () => {
      sleepSensor.updateInfo?.();
      const sleepTime = getSleepTimeString(sleepSensor);

      if (sleepTime) {
        showSleepTime(sleepTime);
        hideSunInfo();
      } else {
        showSunriseSunset();
        hideSleepInfo();
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

  buildDate() {
    hmUI.createWidget(hmUI.widget.IMG_WEEK, DATE_WEEK_PROPS);
    const textWidget = hmUI.createWidget(hmUI.widget.TEXT, DATE_TEXT_PROPS);
    const timeSensor = hmSensor.createSensor(hmSensor.id.TIME);

    const update = () => {
      const { month, day } = timeSensor;
      const monthString = MONTH_TEXTS[month - 1];
      textWidget.setProperty(hmUI.prop.TEXT, `${monthString}\n${day}`);
    };

    hmUI.createWidget(hmUI.widget.WIDGET_DELEGATE, {
      resume_call: () => {
        console.log('ui resume (widget delegate)');

        if (hmSetting.getScreenType() == hmSetting.screen_type.WATCHFACE) {
          timeSensor.addEventListener?.(timeSensor.event.MINUTEEND, update);
          update();
        }
      },
      pause_call: () => {
        console.log('ui pause (widget delegate)');

        timeSensor.removeEventListener?.(timeSensor.event.MINUTEEND, update);
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
    const textAodWidget = hmUI.createWidget(
      hmUI.widget.TEXT,
      TIME_AOD_TEXT_PROPS,
    );

    const timeSensor = hmSensor.createSensor(hmSensor.id.TIME);
    let updateTimer = undefined;

    const update = () => {
      const is12HourFormat = hmSetting.getTimeFormat() === 0;
      const { hour, minute } = timeSensor;
      const timeString = formatTime(
        hour,
        minute,
        is12HourFormat,
        true,
        true,
      ).toUpperCase();
      textWidget.setProperty(hmUI.prop.TEXT, timeString);
      textAodWidget.setProperty(hmUI.prop.TEXT, timeString);
    };

    hmUI.createWidget(hmUI.widget.WIDGET_DELEGATE, {
      resume_call: () => {
        console.log('ui resume (buildTime)');

        if (
          hmSetting.getScreenType() == hmSetting.screen_type.WATCHFACE ||
          hmSetting.getScreenType() == hmSetting.screen_type.AOD
        ) {
          if (hasCustomFontSupport) {
            timeSensor.addEventListener?.(timeSensor.event.MINUTEEND, update);
          } else {
            updateTimer = timer.createTimer(3000, 3000, update);
          }

          update();
        }
      },
      pause_call: () => {
        console.log('ui pause (buildTime)');

        timeSensor.removeEventListener?.(timeSensor.event.MINUTEEND, update);
        timer.stopTimer(updateTimer);
      },
    });
  },

  buildWeather() {
    hmUI.createWidget(hmUI.widget.FILL_RECT, WEATHER_BACKGROUND_PROPS);
    const textWidget = hmUI.createWidget(
      hmUI.widget.TEXT_FONT,
      WEATHER_TEXT_PROPS,
    );
    const iconWidget = hmUI.createWidget(hmUI.widget.IMG, null);

    const weatherSensor = hmSensor.createSensor(hmSensor.id.WEATHER);
    const timeSensor = hmSensor.createSensor(hmSensor.id.TIME);

    const update = () => {
      const iconIndex = weatherSensor.curAirIconIndex;

      updateWeatherIcons(isNight(timeSensor));

      const hasIcon = !isNaN(iconIndex) && iconIndex !== 25;

      iconWidget.setProperty(hmUI.prop.MORE, {
        ...WEATHER_ICON_PROPS,
        src: hasIcon ? WEATHER_ICONS[iconIndex] : '',
      });

      textWidget.setProperty(
        hmUI.prop.MORE,
        hasIcon ? WEATHER_TEXT_PROPS : WEATHER_NO_ICON_TEXT_PROPS,
      );
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
    const stepSensor = hmSensor.createSensor(hmSensor.id.STEP);

    const update = () => {
      const { current, target } = stepSensor;
      const angleEnd = (360 * current) / target;

      textWidget.setProperty(
        hmUI.prop.TEXT,
        `${formatNumber(current)}\n${decline(current, STEPS_POSTFIX)}`,
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
          stepSensor.addEventListener?.(hmSensor.event.CHANGE, update);
          update();
        }
      },
      pause_call: () => {
        stepSensor.removeEventListener?.(hmSensor.event.CHANGE, update);
      },
    });
  },

  buildPulse() {
    hmUI.createWidget(hmUI.widget.ARC_PROGRESS, PULSE_ARC_PROPS);
    hmUI.createWidget(hmUI.widget.IMG, PULSE_ICON_PROPS);
    const textWidget = hmUI.createWidget(hmUI.widget.TEXT, PULSE_TEXT_PROPS);
    let prevPointerWidgets = [];
    let prevDay = 0;
    const prevPointerGroup = hmUI.createWidget(
      hmUI.widget.GROUP,
      PULSE_PREV_POINTER_GROUP_PROPS,
    );
    const currentPointerWidget = hmUI.createWidget(
      hmUI.widget.IMG,
      PULSE_CURRENT_POINTER_PROPS,
    );
    const {
      angleStart,
      angleEnd,
      pointer: { minValue, maxValue },
    } = PULSE;

    const heartSensor = hmSensor.createSensor(hmSensor.id.HEART);
    const timeSensor = hmSensor.createSensor(hmSensor.id.TIME);

    const getAngle = (value) =>
      getAnglePosition({
        value,
        minValue,
        maxValue,
        minAngle: angleStart,
        maxAngle: angleEnd,
      });

    const update = () => {
      const { last = 0, today = [] } = heartSensor;
      const { day } = timeSensor;

      textWidget.setProperty(hmUI.prop.TEXT, (last || '--').toString());
      currentPointerWidget.setProperty(hmUI.prop.ANGLE, getAngle(last));

      if (today.length < prevPointerWidgets.length || prevDay !== day) {
        prevPointerWidgets.forEach((widget) => hmUI.deleteWidget(widget));
        prevPointerWidgets = [];
      }

      prevDay = day;

      today.forEach((value, index) => {
        if (prevPointerWidgets[index]) {
          return;
        }

        prevPointerWidgets.push(
          prevPointerGroup.createWidget(hmUI.widget.IMG, {
            ...PULSE_PREV_POINTER_PROPS,
            angle: getAngle(value),
          }),
        );
      });
    };

    hmUI.createWidget(hmUI.widget.WIDGET_DELEGATE, {
      resume_call: () => {
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
    const batterySensor = hmSensor.createSensor(hmSensor.id.BATTERY);

    const update = () => {
      const { current } = batterySensor;
      const level = Math.round((current * 24) / 100);
      const imageSrc = `battery/${level}.png`;
      const text = BATTERY_TEXT.replace('%s', current);

      textWidget.setProperty(hmUI.prop.TEXT, text);
      progressWidget.setProperty(hmUI.prop.SRC, imageSrc);
    };

    hmUI.createWidget(hmUI.widget.WIDGET_DELEGATE, {
      resume_call: () => {
        console.log('ui resume');

        if (hmSetting.getScreenType() == hmSetting.screen_type.WATCHFACE) {
          batterySensor.addEventListener?.(hmSensor.event.CHANGE, update);
          update();
        }
      },
      pause_call: () => {
        batterySensor.removeEventListener?.(hmSensor.event.CHANGE, update);
      },
    });
  },

  buildDisconnectStatus() {
    hmUI.createWidget(hmUI.widget.IMG_STATUS, DISCONNECT_PROPS);
  },
});
