import {
  MINUTE,
  SCREEN,
  SECOND,
  MIN_ANGLE_TO_UPDATE_WHEEL,
  WEEKDAYS,
  DATA,
  TIME_TEXTS,
} from '../utils/constants';
import { createCircleTextWidget } from '../utils/createCircleTextWidget';
import {
  getAngleFromMinutes,
  getAngleFromSeconds,
} from '../utils/getAngleFromTime';
import { getClosestSunriseSunsetTime } from '../utils/getClosestSunriseSunsetTime';
import { getCoordsFromAngle } from '../utils/getCoordsFromAngle';
import { getSleepTimeString } from '../utils/getSleepTime';
import { getTimeString } from '../utils/getTimeString';
import {
  BATTERY_BACKGROUND_ARC_PROPS,
  BATTERY_CIRCLE_TEXT_PROPS,
  BATTERY_CURRENT_ARC_PROPS,
  CURRENT_HOUR_AOD_TEXT_PROPS,
  CURRENT_HOUR_TEXT_PROPS,
  CURRENT_MINUTE_AOD_TEXT_PROPS,
  CURRENT_MINUTE_TEXT_PROPS,
  DATE_DAY_TEXT_PROPS,
  DATE_WEEK_TEXT_PROPS,
  DISCONNECT_ICON_PROPS,
  FRAME_IMAGE_AOD_PROPS,
  FRAME_IMAGE_PROPS,
  HEART_BACKGROUND_ARC_PROPS,
  HEART_CIRCLE_TEXT_PROPS,
  HEART_CURRENT_ARC_PROPS,
  HEART_DOT_PROPS,
  MINUTE_IMAGE_AOD_PROPS,
  MINUTE_IMAGE_PROPS,
  MINUTE_TEXT_PROPS,
  SECOND_IMAGE_AOD_PROPS,
  SECOND_IMAGE_PROPS,
  SECOND_TEXT_PROPS,
  SLEEP_CIRCLE_TEXT_PROPS,
  STEPS_BACKGROUND_ARC_PROPS,
  STEPS_CIRCLE_TEXT_PROPS,
  STEPS_CURRENT_ARC_PROPS,
} from './index.r.layout';

WatchFace({
  onInit() {
    console.log('index page.js on init invoke');
  },

  build() {
    console.log('index page.js on build invoke');

    this.buildBackgroundAod();

    this.buildTime();
    this.buildDate();
    this.buildBattery();
    this.buildHeartRate();
    this.buildSteps();
    this.buildSleepTime();
    this.buildDisconnectStatus();
  },

  onDestroy() {
    console.log('index page.js on destroy invoke');
  },

  buildBackgroundAod() {
    hmUI.createWidget(hmUI.widget.IMG, SECOND_IMAGE_AOD_PROPS);
    hmUI.createWidget(hmUI.widget.IMG, MINUTE_IMAGE_AOD_PROPS);
    hmUI.createWidget(hmUI.widget.IMG, FRAME_IMAGE_AOD_PROPS);
  },

  buildTime() {
    const secondImage = hmUI.createWidget(hmUI.widget.IMG, SECOND_IMAGE_PROPS);
    const secondTexts = new Array(12).fill(null).map((_, i) =>
      hmUI.createWidget(hmUI.widget.TEXT, {
        ...SECOND_TEXT_PROPS,
        text: TIME_TEXTS[i],
      }),
    );

    const minuteImage = hmUI.createWidget(hmUI.widget.IMG, MINUTE_IMAGE_PROPS);
    const minuteTexts = new Array(12).fill(null).map((_, i) =>
      hmUI.createWidget(hmUI.widget.TEXT, {
        ...MINUTE_TEXT_PROPS,
        text: TIME_TEXTS[i],
      }),
    );

    hmUI.createWidget(hmUI.widget.IMG, FRAME_IMAGE_PROPS);
    const currentHourText = hmUI.createWidget(
      hmUI.widget.TEXT,
      CURRENT_HOUR_TEXT_PROPS,
    );
    const currentMinuteText = hmUI.createWidget(
      hmUI.widget.TEXT,
      CURRENT_MINUTE_TEXT_PROPS,
    );

    const currentHourAodText = hmUI.createWidget(
      hmUI.widget.TEXT,
      CURRENT_HOUR_AOD_TEXT_PROPS,
    );
    const currentMinuteAodText = hmUI.createWidget(
      hmUI.widget.TEXT,
      CURRENT_MINUTE_AOD_TEXT_PROPS,
    );

    let updateTimer = undefined;
    let prevMinuteAngle = Infinity;
    let prevCurrentHour = Infinity;
    let prevCurrentMinute = Infinity;

    const timeSensor = hmSensor.createSensor(hmSensor.id.TIME);

    const updateWheel = (
      angle,
      imageWidget,
      textWidgets,
      textWidgetProps,
      textWidgetRadius,
    ) => {
      imageWidget.setProperty(hmUI.prop.ANGLE, angle);

      textWidgets.forEach((textWidget, i) => {
        const textAngle = (angle - (i * 360) / 12) % 360;
        const { x, y } = getCoordsFromAngle(
          textAngle,
          textWidgetRadius,
          textWidgetProps.h,
          textWidgetProps.w,
          SCREEN,
        );

        textWidget.setProperty(hmUI.prop.X, x);
        textWidget.setProperty(hmUI.prop.Y, y);
      });
    };

    const updateSecond = (timeSensor) => {
      const { utc } = timeSensor;
      const date = new Date(utc);
      const second = date.getSeconds() + date.getMilliseconds() / 1000;
      const angle = (90 + getAngleFromSeconds(second)) % 360;

      updateWheel(
        angle,
        secondImage,
        secondTexts,
        SECOND_TEXT_PROPS,
        SECOND.text.radius,
      );
    };

    const updateMinute = (timeSensor) => {
      const { minute, second } = timeSensor;
      const angle = (90 + getAngleFromMinutes(minute, second)) % 360;
      const shouldUpdate =
        Math.abs(angle - prevMinuteAngle) >= MIN_ANGLE_TO_UPDATE_WHEEL &&
        Math.abs(360 - angle + prevMinuteAngle) >= MIN_ANGLE_TO_UPDATE_WHEEL;

      if (!shouldUpdate) {
        return;
      }

      prevMinuteAngle = angle;

      updateWheel(
        angle,
        minuteImage,
        minuteTexts,
        MINUTE_TEXT_PROPS,
        MINUTE.text.radius,
      );
    };

    const updateCurrentTime = (timeSensor) => {
      const { hour, minute } = timeSensor;
      const shouldUpdate =
        hour !== prevCurrentHour || minute !== prevCurrentMinute;

      if (!shouldUpdate) {
        return;
      }

      prevCurrentHour = hour;
      prevCurrentMinute = minute;

      const is12HourFormat = hmSetting.getTimeFormat() === 0;
      const hourValue = is12HourFormat ? hour % 12 || 12 : hour;
      const hourText = hourValue.toString();

      const minuteText = minute.toString().padStart(2, '0');

      currentHourText.setProperty(hmUI.prop.TEXT, hourText);
      currentMinuteText.setProperty(hmUI.prop.TEXT, minuteText);

      currentHourAodText.setProperty(hmUI.prop.TEXT, hourText);
      currentMinuteAodText.setProperty(hmUI.prop.TEXT, minuteText);
    };

    const update = () => {
      updateSecond(timeSensor);
      updateMinute(timeSensor);
      updateCurrentTime(timeSensor);
    };

    const updateAod = () => {
      updateCurrentTime(timeSensor);
    };

    hmUI.createWidget(hmUI.widget.WIDGET_DELEGATE, {
      resume_call: () => {
        console.log('ui resume');

        if (hmSetting.getScreenType() == hmSetting.screen_type.WATCHFACE) {
          timer.stopTimer(updateTimer);
          updateTimer = timer.createTimer(330, 330, update);
          update();
        } else if (hmSetting.getScreenType() == hmSetting.screen_type.AOD) {
          timer.stopTimer(updateTimer);
          updateTimer = timer.createTimer(5000, 5000, updateAod);
          updateAod();
        }
      },
      pause_call: () => {
        console.log('ui pause');

        timer.stopTimer(updateTimer);
      },
    });
  },

  buildDate() {
    const dateText = hmUI.createWidget(hmUI.widget.TEXT, DATE_DAY_TEXT_PROPS);
    const weekText = hmUI.createWidget(hmUI.widget.TEXT, DATE_WEEK_TEXT_PROPS);

    const update = () => {
      const { day, week } = hmSensor.createSensor(hmSensor.id.TIME);
      dateText.setProperty(hmUI.prop.TEXT, day.toString());
      weekText.setProperty(hmUI.prop.TEXT, WEEKDAYS[week - 1]);
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
    hmUI.createWidget(hmUI.widget.ARC_PROGRESS, BATTERY_BACKGROUND_ARC_PROPS);
    const arc = hmUI.createWidget(
      hmUI.widget.ARC_PROGRESS,
      BATTERY_CURRENT_ARC_PROPS,
    );

    const update = () => {
      const { current } = hmSensor.createSensor(hmSensor.id.BATTERY);

      updateText(`${current}%`);
      arc.setProperty(hmUI.prop.LEVEL, current);
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

  buildHeartRate() {
    const { updateText } = createCircleTextWidget(HEART_CIRCLE_TEXT_PROPS);
    hmUI.createWidget(hmUI.widget.ARC_PROGRESS, HEART_BACKGROUND_ARC_PROPS);
    const currentArc = hmUI.createWidget(
      hmUI.widget.ARC_PROGRESS,
      HEART_CURRENT_ARC_PROPS,
    );
    const dotImage = hmUI.createWidget(hmUI.widget.IMG, HEART_DOT_PROPS);

    const getAnglePosition = (heartRate) => {
      const MIN_VALUE = 40;
      const MAX_VALUE = 140;

      let level = (heartRate - MIN_VALUE) / (MAX_VALUE - MIN_VALUE);
      level = Math.min(level, 1);
      level = Math.max(level, 0);

      const { start_angle, end_angle } = HEART_BACKGROUND_ARC_PROPS;
      const angle = level * (end_angle - start_angle) + start_angle;

      return angle;
    };

    const update = () => {
      const { last, today = [] } = hmSensor.createSensor(hmSensor.id.HEART);

      const dotAngle = getAnglePosition(last);
      const { x, y } = getCoordsFromAngle(
        dotAngle,
        DATA.radius,
        HEART_DOT_PROPS.h,
        HEART_DOT_PROPS.w,
        SCREEN,
      );

      const minValue = Math.min(...today);
      const maxValue = Math.max(...today);
      const minAngle = getAnglePosition(minValue);
      const maxAngle = getAnglePosition(maxValue);

      updateText(`${last}❤`);
      currentArc.setProperty(hmUI.prop.MORE, {
        ...HEART_CURRENT_ARC_PROPS,
        start_angle: minAngle,
        end_angle: maxAngle,
      });
      dotImage.setProperty(hmUI.prop.MORE, {
        ...HEART_DOT_PROPS,
        x,
        y,
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
    const { updateText } = createCircleTextWidget(STEPS_CIRCLE_TEXT_PROPS);
    hmUI.createWidget(hmUI.widget.ARC_PROGRESS, STEPS_BACKGROUND_ARC_PROPS);
    const arc = hmUI.createWidget(
      hmUI.widget.ARC_PROGRESS,
      STEPS_CURRENT_ARC_PROPS,
    );

    const update = () => {
      const { current, target } = hmSensor.createSensor(hmSensor.id.STEP);
      const level = Math.min(Math.round((100 * current) / target), 100);

      updateText(`${current}▲`);
      arc.setProperty(hmUI.prop.LEVEL, level);
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

    const showSleepTime = (sleepTimeString) => {
      updateText(`${sleepTimeString}✱`);
    };

    const showSunriseSunset = () => {
      const timeSensor = hmSensor.createSensor(hmSensor.id.TIME);
      const weatherSensor = hmSensor.createSensor(hmSensor.id.WEATHER);
      const sunObj = getClosestSunriseSunsetTime(timeSensor, weatherSensor);

      if (!sunObj) {
        update('');
      }

      const { type, hour, minute } = sunObj;
      const is12HourFormat = hmSetting.getTimeFormat() === 0;
      const sunTime = getTimeString(hour, minute, is12HourFormat);
      const icon = type === 'sunrise' ? '☀' : '☼';
      updateText(`${sunTime}${icon}`);
    };

    const update = () => {
      const sleepSensor = hmSensor.createSensor(hmSensor.id.SLEEP);
      const sleepTimeString = getSleepTimeString(sleepSensor);

      if (sleepTimeString) {
        showSleepTime(sleepTimeString);
      } else {
        showSunriseSunset();
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

  buildDisconnectStatus() {
    hmUI.createWidget(hmUI.widget.IMG_STATUS, DISCONNECT_ICON_PROPS);
  },
});
