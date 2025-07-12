import { getSleepTimeHours, getSleepTimeString } from '../utils/getSleepTime';

import {
  DIGITS,
  SCREEN,
  SECONDS_PROGRESS_BAR,
  WEATHER,
} from './index.constants';

import { CALENDAR, GRID } from './calendarGrid.constants';

import {
  SECONDS_IMAGE_TIME_PROPS,
  SECONDS_PROGRESS_BAR_PROPS,
  STEPS_TEXT_IMAGE_PROPS,
  BATTERY_TEXT_IMAGE_PROPS,
  SLEEP_TEXT_PROPS,
  CONNECT_IMAGE_PROPS,
  DISCONNECT_IMAGE_PROPS,
  ALARM_OFF_IMAGE_PROPS,
  ALARM_ON_IMAGE_PROPS,
  SLEEP_PROGRESS_PROPS,
  BATTERY_PROGRESS_PROPS,
  STEPS_PROGRESS_PROPS,
  PULSE_TEXT_IMAGE_PROPS,
  PULSE_MIN_TEXT_PROPS,
  PULSE_MAX_TEXT_PROPS,
  SLEEP_ICON_IMAGE_PROPS,
  PULSE_ICON_IMAGE_PROPS,
  PULSE_BACKGROUND_ARC_PROPS,
  PULSE_TODAY_ARC_PROPS,
  PULSE_LAST_ARC_PROPS,
  STEPS_ICON_IMAGE_PROPS,
  BATTERY_ICON_IMAGE_PROPS,
  WEATHER_SUNRISE_TEXT_PROPS,
  WEATHER_SUNSET_TEXT_PROPS,
  WEATHER_TEXT_IMAGE_PROPS,
  WEATHER_PHASE_IMAGE_PROPS,
  WEATHER_DOT_IMAGE_PROPS,
} from './index.r.layout';
import { clamp } from '../utils/clamp';
import { getSunriseSunsetTimeStrings } from '../utils/getSunriseSunsetTimeStrings';
import { getSunDayDuration, getSunPosition } from '../utils/getSunParams';
import { CalendarGrid } from './calendarGrid';

WatchFace({
  onInit() {
    console.log('watchface initing');
  },

  build() {
    console.log('watchface building');

    this.buildCalendarGrid();

    this.buildSeconds();

    this.buildSteps();
    this.buildPulse();
    this.buildBattery();
    this.buildSleepTime();
    this.buildWeather();

    this.buildDisconnectionStatus();
    this.buildAlarmStatus();
  },

  onDestroy() {
    console.log('watchface destroying');
  },

  buildCalendarGrid() {
    this.calendarGrid = new CalendarGrid();
  },

  buildSeconds() {
    const { y } = this.calendarGrid.grid[GRID.size.rows - 1][0];
    const progressBarY = y + CALENDAR.date.height + SECONDS_PROGRESS_BAR.gapTop;
    const progressBarX = SCREEN.centerX - SECONDS_PROGRESS_BAR.width / 2;

    hmUI.createWidget(hmUI.widget.IMG_TIME, {
      ...SECONDS_IMAGE_TIME_PROPS,
      second_startX: SCREEN.centerX - DIGITS.width,
      second_startY:
        y +
        CALENDAR.date.height * 1.5 -
        DIGITS.height / 2 +
        SECONDS_PROGRESS_BAR.gapTop,
    });

    const progressBar = hmUI.createWidget(hmUI.widget.IMG, {});

    const timeSensor = hmSensor.createSensor(hmSensor.id.TIME);

    let prevSecondRound = null;
    let updateTimer = undefined;

    const update = () => {
      const { second } = timeSensor;
      const secondRound = Math.round(second / 10) * 10;
      const level = secondRound / 10;

      if (prevSecondRound === secondRound) {
        return;
      }

      prevSecondRound = secondRound;

      progressBar.setProperty(hmUI.prop.MORE, {
        ...SECONDS_PROGRESS_BAR_PROPS,
        x: progressBarX,
        y: progressBarY,
        src: `seconds_progress_bar/${level}.png`,
      });
    };

    hmUI.createWidget(hmUI.widget.WIDGET_DELEGATE, {
      resume_call: () => {
        if (hmSetting.getScreenType() == hmSetting.screen_type.WATCHFACE) {
          timeSensor.addEventListener?.(timeSensor.event.MINUTEEND, update);
          updateTimer = timer.createTimer(1000, 1000, update);
          update();
        }
      },
      pause_call: () => {
        timeSensor.removeEventListener?.(timeSensor.event.MINUTEEND, update);
        timer.stopTimer(updateTimer);
      },
    });
  },

  buildSteps() {
    hmUI.createWidget(hmUI.widget.TEXT_IMG, STEPS_TEXT_IMAGE_PROPS);
    hmUI.createWidget(hmUI.widget.IMG, STEPS_ICON_IMAGE_PROPS);
    const progressWidget = hmUI.createWidget(
      hmUI.widget.IMG,
      STEPS_PROGRESS_PROPS,
    );

    const stepSensor = hmSensor.createSensor(hmSensor.id.STEP);

    const update = () => {
      const { current, target } = stepSensor;
      const ratio = (current || 0) / (target || 10000);
      const level = clamp(0, Math.floor(10 * ratio), 10);
      const imageSrc = `steps/${level}.png`;
      progressWidget.setProperty(hmUI.prop.SRC, imageSrc);
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

  buildPulse() {
    hmUI.createWidget(hmUI.widget.TEXT_IMG, PULSE_TEXT_IMAGE_PROPS);
    hmUI.createWidget(hmUI.widget.IMG, PULSE_ICON_IMAGE_PROPS);

    const minTextWidget = hmUI.createWidget(
      hmUI.widget.TEXT,
      PULSE_MIN_TEXT_PROPS,
    );
    const maxTextWidget = hmUI.createWidget(
      hmUI.widget.TEXT,
      PULSE_MAX_TEXT_PROPS,
    );

    hmUI.createWidget(hmUI.widget.ARC_PROGRESS, PULSE_BACKGROUND_ARC_PROPS);
    const todayArc = hmUI.createWidget(
      hmUI.widget.ARC_PROGRESS,
      PULSE_TODAY_ARC_PROPS,
    );
    const lastArc = hmUI.createWidget(
      hmUI.widget.ARC_PROGRESS,
      PULSE_LAST_ARC_PROPS,
    );

    const heartSensor = hmSensor.createSensor(hmSensor.id.HEART);

    const getAnglePosition = (heartRate) => {
      if (!heartRate) {
        return;
      }

      const MIN_VALUE = 40;
      const MAX_VALUE = 140;

      const ratio = (heartRate - MIN_VALUE) / (MAX_VALUE - MIN_VALUE);
      const ratioClamped = clamp(0, ratio, 1);

      const { start_angle, end_angle } = PULSE_BACKGROUND_ARC_PROPS;
      const angle = ratioClamped * (end_angle - start_angle) + start_angle;

      return angle;
    };

    const update = () => {
      const { last, today } = heartSensor;
      let min = today.length ? Math.min(...today) : 0;
      let max = today.length ? Math.max(...today) : 0;

      if (min === max) {
        min = 0;
        max = 0;
      }

      const lastAngle = getAnglePosition(last);
      const minAngle = getAnglePosition(min);
      const maxAngle = getAnglePosition(max);

      todayArc.setProperty(hmUI.prop.MORE, {
        ...PULSE_TODAY_ARC_PROPS,
        start_angle: maxAngle,
        end_angle: minAngle,
      });

      lastArc.setProperty(hmUI.prop.MORE, {
        ...PULSE_LAST_ARC_PROPS,
        start_angle: lastAngle ? lastAngle + 1 : undefined,
        end_angle: lastAngle ? lastAngle - 1 : undefined,
      });

      minTextWidget.setProperty(hmUI.prop.TEXT, min > 0 ? min.toString() : '');
      maxTextWidget.setProperty(hmUI.prop.TEXT, max > 0 ? max.toString() : '');
    };

    hmUI.createWidget(hmUI.widget.WIDGET_DELEGATE, {
      resume_call: () => {
        if (hmSetting.getScreenType() == hmSetting.screen_type.WATCHFACE) {
          heartSensor.addEventListener?.(hmSensor.event.LAST, update);
          update();
        }
      },
      pause_call: () => {
        heartSensor.removeEventListener?.(hmSensor.event.LAST, update);
      },
    });
  },

  buildBattery() {
    hmUI.createWidget(hmUI.widget.TEXT_IMG, BATTERY_TEXT_IMAGE_PROPS);
    hmUI.createWidget(hmUI.widget.IMG, BATTERY_ICON_IMAGE_PROPS);
    const progressWidget = hmUI.createWidget(
      hmUI.widget.IMG,
      BATTERY_PROGRESS_PROPS,
    );

    const batterySensor = hmSensor.createSensor(hmSensor.id.BATTERY);

    const update = () => {
      const { current } = batterySensor;
      const level = clamp(0, Math.round((current || 0) / 10), 10);
      const imageSrc = `battery/${level}.png`;
      progressWidget.setProperty(hmUI.prop.SRC, imageSrc);
    };

    hmUI.createWidget(hmUI.widget.WIDGET_DELEGATE, {
      resume_call: () => {
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

  buildSleepTime() {
    const progressWidget = hmUI.createWidget(
      hmUI.widget.IMG,
      SLEEP_PROGRESS_PROPS,
    );
    const textWidget = hmUI.createWidget(hmUI.widget.TEXT, SLEEP_TEXT_PROPS);
    const iconWidget = hmUI.createWidget(
      hmUI.widget.IMG,
      SLEEP_ICON_IMAGE_PROPS,
    );

    const sleepSensor = hmSensor.createSensor(hmSensor.id.SLEEP);

    const update = () => {
      sleepSensor.updateInfo();
      const sleepTime = getSleepTimeString(sleepSensor);

      if (sleepTime) {
        const level = clamp(0, getSleepTimeHours(sleepSensor), 8);

        textWidget.setProperty(hmUI.prop.TEXT, sleepTime);
        iconWidget.setProperty(hmUI.prop.ALPHA, 255);
        progressWidget.setProperty(hmUI.prop.SRC, `sleep/${level}.png`);
      } else {
        textWidget.setProperty(hmUI.prop.TEXT, '');
        iconWidget.setProperty(hmUI.prop.ALPHA, 0);
        progressWidget.setProperty(hmUI.prop.MORE, SLEEP_PROGRESS_PROPS);
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

  buildDisconnectionStatus() {
    hmUI.createWidget(hmUI.widget.IMG, CONNECT_IMAGE_PROPS);
    hmUI.createWidget(hmUI.widget.IMG_STATUS, DISCONNECT_IMAGE_PROPS);
  },

  buildAlarmStatus() {
    hmUI.createWidget(hmUI.widget.IMG, ALARM_OFF_IMAGE_PROPS);
    hmUI.createWidget(hmUI.widget.IMG_STATUS, ALARM_ON_IMAGE_PROPS);
  },

  buildWeather() {
    const phaseImage = hmUI.createWidget(
      hmUI.widget.IMG,
      WEATHER_PHASE_IMAGE_PROPS,
    );
    const sunriseText = hmUI.createWidget(
      hmUI.widget.TEXT,
      WEATHER_SUNRISE_TEXT_PROPS,
    );
    const sunsetText = hmUI.createWidget(
      hmUI.widget.TEXT,
      WEATHER_SUNSET_TEXT_PROPS,
    );
    hmUI.createWidget(hmUI.widget.TEXT_IMG, WEATHER_TEXT_IMAGE_PROPS);

    const dotImage = hmUI.createWidget(
      hmUI.widget.IMG,
      WEATHER_DOT_IMAGE_PROPS,
    );

    const weatherSensor = hmSensor.createSensor(hmSensor.id.WEATHER);
    const timeSensor = hmSensor.createSensor(hmSensor.id.TIME);
    const is12HourFormat = hmSetting.getTimeFormat() === 0;

    const calculatePhase = () => {
      const sunDayDuration = getSunDayDuration(weatherSensor);
      const ratio = (100 * sunDayDuration) / (24 * 60);
      return Math.round(ratio / 5) * 5;
    };

    const calculateDotPosition = () => {
      const ratio = getSunPosition(weatherSensor, timeSensor);
      const { x, y, width, height } = WEATHER.sineWave;

      const yDot =
        height * (0.5 * Math.sin(ratio / (Math.PI / 20) - Math.PI / 2) + 0.5);
      const xDot = ratio * width;

      return {
        x: Math.round(x + xDot - WEATHER.dot.width / 2),
        y: Math.round(y + height - Math.round(yDot) - WEATHER.dot.height / 2),
      };
    };

    const update = () => {
      console.log('weather data updated');

      const [sunrise, sunset] = getSunriseSunsetTimeStrings(
        weatherSensor,
        is12HourFormat,
      );

      sunriseText.setProperty(hmUI.prop.TEXT, sunrise);
      sunsetText.setProperty(hmUI.prop.TEXT, sunset);

      phaseImage.setProperty(
        hmUI.prop.SRC,
        WEATHER.phaseImage.src.replace('%s', calculatePhase()),
      );

      const { x, y } = calculateDotPosition();
      dotImage.setProperty(hmUI.prop.MORE, {
        ...WEATHER_DOT_IMAGE_PROPS,
        x,
        y,
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
});
